/* 넥서스 대국실 — 체스 엔진 (순수 로직, 브라우저/Node 겸용)
   정식 규칙: 캐슬링, 앙파상, 프로모션, 체크메이트/스테일메이트,
   50수 무승부, 삼중 반복 무승부, 기물 부족 무승부.
   좌표: x=파일 a..h (0..7), y=0이 8랭크(흑 진영), y=7이 1랭크(백 진영). */
(function (g) {
  'use strict';
  function I(x, y) { return y * 8 + x; }
  function inB(x, y) { return x >= 0 && x < 8 && y >= 0 && y < 8; }
  var VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
  var PST = {
    p: [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0],
    n: [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50],
    b: [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20],
    r: [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0],
    q: [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20],
    k: [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20]
  };
  function create() {
    var b = new Array(64).fill(null);
    var back = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    for (var x = 0; x < 8; x++) {
      b[I(x, 0)] = { t: back[x], c: 'b' }; b[I(x, 1)] = { t: 'p', c: 'b' };
      b[I(x, 6)] = { t: 'p', c: 'w' }; b[I(x, 7)] = { t: back[x], c: 'w' };
    }
    var st = { b: b, turn: 'w', castling: { K: 1, Q: 1, k: 1, q: 1 }, ep: null, half: 0, moves: [], rep: {}, result: null };
    st.rep[posKey(st)] = 1;
    return st;
  }
  function posKey(st) {
    var s = '';
    for (var i = 0; i < 64; i++) { var p = st.b[i]; s += p ? (p.c === 'w' ? p.t.toUpperCase() : p.t) : '.'; }
    return s + st.turn + (st.castling.K ? 'K' : '') + (st.castling.Q ? 'Q' : '') + (st.castling.k ? 'k' : '') + (st.castling.q ? 'q' : '') + (st.ep ? I(st.ep.x, st.ep.y) : '-');
  }
  function opp(c) { return c === 'w' ? 'b' : 'w'; }
  function kingPos(b, c) { for (var i = 0; i < 64; i++) { var p = b[i]; if (p && p.t === 'k' && p.c === c) return { x: i % 8, y: Math.floor(i / 8) }; } return null; }
  function attacked(b, x, y, by) {
    var dx, dy, nx, ny, p;
    // 폰 (by색 폰은 백이면 아래(y+1)에서 위를 공격)
    var py = by === 'w' ? y + 1 : y - 1;
    for (dx = -1; dx <= 1; dx += 2) { nx = x + dx; if (inB(nx, py)) { p = b[I(nx, py)]; if (p && p.t === 'p' && p.c === by) return true; } }
    var KN = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];
    for (var i = 0; i < 8; i++) { nx = x + KN[i][0]; ny = y + KN[i][1]; if (inB(nx, ny)) { p = b[I(nx, ny)]; if (p && p.t === 'n' && p.c === by) return true; } }
    for (dy = -1; dy <= 1; dy++) for (dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; nx = x + dx; ny = y + dy; if (inB(nx, ny)) { p = b[I(nx, ny)]; if (p && p.t === 'k' && p.c === by) return true; } }
    var ORTH = [[1, 0], [-1, 0], [0, 1], [0, -1]], DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (i = 0; i < 4; i++) {
      nx = x; ny = y;
      for (;;) { nx += ORTH[i][0]; ny += ORTH[i][1]; if (!inB(nx, ny)) break; p = b[I(nx, ny)]; if (p) { if (p.c === by && (p.t === 'r' || p.t === 'q')) return true; break; } }
      nx = x; ny = y;
      for (;;) { nx += DIAG[i][0]; ny += DIAG[i][1]; if (!inB(nx, ny)) break; p = b[I(nx, ny)]; if (p) { if (p.c === by && (p.t === 'b' || p.t === 'q')) return true; break; } }
    }
    return false;
  }
  function inCheck(st, c) { var k = kingPos(st.b, c); return k && attacked(st.b, k.x, k.y, opp(c)); }
  function pseudo(st, side) {
    var b = st.b, out = [], x, y, p;
    function push(fx, fy, tx, ty, promo) { out.push({ fx: fx, fy: fy, tx: tx, ty: ty, promo: promo || null }); }
    function slide(x0, y0, dirs) {
      for (var i = 0; i < dirs.length; i++) {
        var nx = x0, ny = y0;
        for (;;) {
          nx += dirs[i][0]; ny += dirs[i][1];
          if (!inB(nx, ny)) break;
          var q = b[I(nx, ny)];
          if (!q) push(x0, y0, nx, ny);
          else { if (q.c !== side) push(x0, y0, nx, ny); break; }
        }
      }
    }
    var ORTH = [[1, 0], [-1, 0], [0, 1], [0, -1]], DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    var KN = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];
    for (y = 0; y < 8; y++) for (x = 0; x < 8; x++) {
      p = b[I(x, y)]; if (!p || p.c !== side) continue;
      var i, nx, ny, q;
      if (p.t === 'p') {
        var dir = side === 'w' ? -1 : 1, startY = side === 'w' ? 6 : 1, lastY = side === 'w' ? 0 : 7;
        ny = y + dir;
        if (inB(x, ny) && !b[I(x, ny)]) {
          if (ny === lastY) { ['q', 'r', 'b', 'n'].forEach(function (pr) { push(x, y, x, ny, pr); }); }
          else push(x, y, x, ny);
          if (y === startY && !b[I(x, y + 2 * dir)]) push(x, y, x, y + 2 * dir);
        }
        for (i = -1; i <= 1; i += 2) {
          nx = x + i; ny = y + dir;
          if (!inB(nx, ny)) continue;
          q = b[I(nx, ny)];
          if (q && q.c !== side) {
            if (ny === lastY) { ['q', 'r', 'b', 'n'].forEach(function (pr) { push(x, y, nx, ny, pr); }); }
            else push(x, y, nx, ny);
          } else if (!q && st.ep && st.ep.x === nx && st.ep.y === ny) push(x, y, nx, ny);
        }
      } else if (p.t === 'n') {
        for (i = 0; i < 8; i++) { nx = x + KN[i][0]; ny = y + KN[i][1]; if (inB(nx, ny)) { q = b[I(nx, ny)]; if (!q || q.c !== side) push(x, y, nx, ny); } }
      } else if (p.t === 'k') {
        for (var dy = -1; dy <= 1; dy++) for (var dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; nx = x + dx; ny = y + dy; if (inB(nx, ny)) { q = b[I(nx, ny)]; if (!q || q.c !== side) push(x, y, nx, ny); } }
        // 캐슬링
        var homeY = side === 'w' ? 7 : 0;
        if (x === 4 && y === homeY) {
          var enemy = opp(side), rights = side === 'w' ? ['K', 'Q'] : ['k', 'q'];
          if (st.castling[rights[0]] && !b[I(5, homeY)] && !b[I(6, homeY)] && b[I(7, homeY)] && b[I(7, homeY)].t === 'r' && b[I(7, homeY)].c === side
            && !attacked(b, 4, homeY, enemy) && !attacked(b, 5, homeY, enemy) && !attacked(b, 6, homeY, enemy)) push(4, homeY, 6, homeY);
          if (st.castling[rights[1]] && !b[I(3, homeY)] && !b[I(2, homeY)] && !b[I(1, homeY)] && b[I(0, homeY)] && b[I(0, homeY)].t === 'r' && b[I(0, homeY)].c === side
            && !attacked(b, 4, homeY, enemy) && !attacked(b, 3, homeY, enemy) && !attacked(b, 2, homeY, enemy)) push(4, homeY, 2, homeY);
        }
      } else if (p.t === 'r') slide(x, y, ORTH);
      else if (p.t === 'b') slide(x, y, DIAG);
      else if (p.t === 'q') slide(x, y, ORTH.concat(DIAG));
    }
    return out;
  }
  function doMove(st, mv) {
    var b = st.b.slice();
    var piece = b[I(mv.fx, mv.fy)];
    var captured = b[I(mv.tx, mv.ty)];
    var isEP = piece.t === 'p' && st.ep && mv.tx === st.ep.x && mv.ty === st.ep.y && mv.fx !== mv.tx && !captured;
    if (isEP) b[I(mv.tx, mv.fy)] = null;
    b[I(mv.tx, mv.ty)] = piece; b[I(mv.fx, mv.fy)] = null;
    if (mv.promo) b[I(mv.tx, mv.ty)] = { t: mv.promo, c: piece.c };
    if (piece.t === 'k' && Math.abs(mv.tx - mv.fx) === 2) {
      var y = mv.fy;
      if (mv.tx === 6) { b[I(5, y)] = b[I(7, y)]; b[I(7, y)] = null; }
      else { b[I(3, y)] = b[I(0, y)]; b[I(0, y)] = null; }
    }
    var castling = { K: st.castling.K, Q: st.castling.Q, k: st.castling.k, q: st.castling.q };
    if (piece.t === 'k') { if (piece.c === 'w') { castling.K = 0; castling.Q = 0; } else { castling.k = 0; castling.q = 0; } }
    function rookGone(x, y, c, key) { if (mv.fx === x && mv.fy === y && piece.t === 'r' && piece.c === c) castling[key] = 0; if (mv.tx === x && mv.ty === y && captured && captured.t === 'r' && captured.c === c) castling[key] = 0; }
    rookGone(7, 7, 'w', 'K'); rookGone(0, 7, 'w', 'Q'); rookGone(7, 0, 'b', 'k'); rookGone(0, 0, 'b', 'q');
    var ep = (piece.t === 'p' && Math.abs(mv.ty - mv.fy) === 2) ? { x: mv.fx, y: (mv.fy + mv.ty) / 2 } : null;
    var half = (piece.t === 'p' || captured || isEP) ? 0 : st.half + 1;
    var ns = { b: b, turn: opp(st.turn), castling: castling, ep: ep, half: half, moves: st.moves.concat([mv]), rep: {}, result: null };
    for (var k in st.rep) ns.rep[k] = st.rep[k];
    var key = posKey(ns); ns.rep[key] = (ns.rep[key] || 0) + 1;
    return ns;
  }
  function legalMoves(st, side) {
    side = side || st.turn;
    var list = pseudo(st, side), out = [];
    for (var i = 0; i < list.length; i++) {
      var ns = doMove(st, list[i]);
      if (!inCheck(ns, side)) out.push(list[i]);
    }
    return out;
  }
  function insufficient(b) {
    var minors = [], i, p;
    for (i = 0; i < 64; i++) {
      p = b[i]; if (!p || p.t === 'k') continue;
      if (p.t === 'p' || p.t === 'r' || p.t === 'q') return false;
      minors.push({ t: p.t, sqColor: (i % 8 + Math.floor(i / 8)) % 2 });
    }
    if (minors.length <= 1) return true;
    if (minors.every(function (m) { return m.t === 'b'; }) && minors.every(function (m) { return m.sqColor === minors[0].sqColor; })) return true;
    return false;
  }
  function apply(st, mv) {
    if (st.result) return null;
    var legal = legalMoves(st);
    var found = null;
    for (var i = 0; i < legal.length; i++) {
      var m = legal[i];
      if (m.fx === mv.fx && m.fy === mv.fy && m.tx === mv.tx && m.ty === mv.ty && (m.promo || 'q') === (mv.promo || 'q')) { found = m; break; }
    }
    if (!found) return null;
    var ns = doMove(st, found);
    var sideToMove = ns.turn;
    var replies = legalMoves(ns, sideToMove);
    if (replies.length === 0) {
      if (inCheck(ns, sideToMove)) ns.result = { winner: st.turn, reason: 'checkmate' };
      else ns.result = { winner: 0, reason: 'stalemate' };
    } else if (ns.half >= 100) ns.result = { winner: 0, reason: 'fifty' };
    else if ((ns.rep[posKey(ns)] || 0) >= 3) ns.result = { winner: 0, reason: 'threefold' };
    else if (insufficient(ns.b)) ns.result = { winner: 0, reason: 'material' };
    return ns;
  }
  function fromMoves(moves) {
    var st = create();
    for (var i = 0; i < moves.length; i++) { var ns = apply(st, moves[i]); if (!ns) return st; st = ns; }
    return st;
  }
  function evaluate(st) {
    // 차례인 쪽 관점 점수
    var s = 0, i, p;
    for (i = 0; i < 64; i++) {
      p = st.b[i]; if (!p) continue;
      var x = i % 8, y = Math.floor(i / 8);
      var pst = p.c === 'w' ? PST[p.t][I(x, y)] : PST[p.t][I(x, 7 - y)];
      var v = VAL[p.t] + pst;
      s += p.c === st.turn ? v : -v;
    }
    return s;
  }
  var nodes = 0, nodeCap = 150000;
  function search(st, depth, alpha, beta) {
    if (nodes++ > nodeCap) return evaluate(st);
    if (st.half >= 100 || insufficient(st.b)) return 0;
    var moves = legalMoves(st);
    if (moves.length === 0) return inCheck(st, st.turn) ? -100000 - depth : 0;
    if (depth === 0) return evaluate(st);
    moves.sort(function (a, b2) {
      function sc(m) { var v = st.b[I(m.tx, m.ty)]; return (v ? VAL[v.t] * 10 - VAL[st.b[I(m.fx, m.fy)].t] : 0) + (m.promo ? 900 : 0); }
      return sc(b2) - sc(a);
    });
    var best = -Infinity;
    for (var i = 0; i < moves.length; i++) {
      var ns = doMove(st, moves[i]);
      var sc = -search(ns, depth - 1, -beta, -alpha);
      if (sc > best) best = sc;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }
    return best;
  }
  function aiMove(st, level) {
    var depth = level === 1 ? 1 : level === 2 ? 2 : 3;
    nodes = 0;
    var moves = legalMoves(st);
    if (!moves.length) return null;
    moves.sort(function (a, b2) {
      function sc(m) { var v = st.b[I(m.tx, m.ty)]; return (v ? VAL[v.t] * 10 - VAL[st.b[I(m.fx, m.fy)].t] : 0) + (m.promo ? 900 : 0); }
      return sc(b2) - sc(a);
    });
    var best = -Infinity, chosen = [];
    for (var i = 0; i < moves.length; i++) {
      var ns = doMove(st, moves[i]);
      var sc = -search(ns, depth - 1, -Infinity, Infinity);
      if (sc > best + 0.001) { best = sc; chosen = [moves[i]]; }
      else if (Math.abs(sc - best) <= 0.001) chosen.push(moves[i]);
    }
    if (level === 1 && chosen.length > 1) return chosen[Math.floor(Math.random() * chosen.length)];
    return chosen[0];
  }
  var API = { create: create, apply: apply, fromMoves: fromMoves, legalMoves: legalMoves, inCheck: inCheck, aiMove: aiMove, attacked: attacked };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  g.NexusChess = API;
})(typeof window !== 'undefined' ? window : globalThis);
