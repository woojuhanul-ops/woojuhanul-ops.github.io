/* 넥서스 대국실 — 한국 장기 엔진 (순수 로직, 브라우저/Node 겸용)
   좌표: x=0..8 (초 진영에서 본 왼쪽→오른쪽), y=0 한 뒷줄, y=9 초 뒷줄.
   기물: K 궁, R 차, P 포, N 마, E 상, A 사, S 병/졸. 진영: 'C' 초(선공), 'H' 한.
   규칙: 정식 행마. 빅장이 되면 즉시 남은 기물 점수로 판정한다 (한은 후공 보너스 1.5점).
   점수: 차 13, 포 7, 마 5, 상 3, 사 3, 병/졸 2. 300수를 넘기면 점수 판정.
   둘 곳이 없고 외통이 아니면 한 수 쉼(패스)이 가능하다. */
(function (g) {
  'use strict';
  function I(x, y) { return y * 9 + x; }
  function inB(x, y) { return x >= 0 && x < 9 && y >= 0 && y < 10; }
  var SCORE = { R: 13, P: 7, N: 5, E: 3, A: 3, S: 2, K: 0 };
  var EVAL = { R: 1300, P: 700, N: 500, E: 300, A: 300, S: 200, K: 0 };
  // 궁성 대각선 간선
  var DIAG = {};
  function addEdge(ax, ay, bx, by) {
    var k1 = ax + ',' + ay, k2 = bx + ',' + by;
    (DIAG[k1] = DIAG[k1] || []).push([bx, by]);
    (DIAG[k2] = DIAG[k2] || []).push([ax, ay]);
  }
  addEdge(3, 0, 4, 1); addEdge(4, 1, 5, 2); addEdge(5, 0, 4, 1); addEdge(4, 1, 3, 2);
  addEdge(3, 7, 4, 8); addEdge(4, 8, 5, 9); addEdge(5, 7, 4, 8); addEdge(4, 8, 3, 9);
  var DIAGLINES = [
    [[3, 0], [4, 1], [5, 2]], [[5, 0], [4, 1], [3, 2]],
    [[3, 7], [4, 8], [5, 9]], [[5, 7], [4, 8], [3, 9]]
  ];
  function diagLineAt(x, y) {
    var out = [];
    for (var i = 0; i < DIAGLINES.length; i++) {
      var L = DIAGLINES[i];
      for (var j = 0; j < 3; j++) if (L[j][0] === x && L[j][1] === y) { out.push(L); break; }
    }
    return out;
  }
  function inPalace(side, x, y) {
    if (x < 3 || x > 5) return false;
    return side === 'C' ? (y >= 7 && y <= 9) : (y >= 0 && y <= 2);
  }
  function opp(s) { return s === 'C' ? 'H' : 'C'; }
  function setupBoard(setupC, setupH) {
    var b = new Array(90).fill(null);
    function place(side, setup) {
      // side 로컬 좌표: lf 0..8 (그 진영의 왼쪽 기준), 뒷줄/포줄/병졸줄
      var backY = side === 'C' ? 9 : 0, poY = side === 'C' ? 7 : 2, solY = side === 'C' ? 6 : 3, kingY = side === 'C' ? 8 : 1;
      function X(lf) { return side === 'C' ? lf : 8 - lf; }
      function put(lf, y, t) { b[I(X(lf), y)] = { t: t, c: side }; }
      put(0, backY, 'R'); put(8, backY, 'R');
      put(3, backY, 'A'); put(5, backY, 'A');
      put(4, kingY, 'K');
      // 날개: L/R 값은 바깥쪽 기물 ('N'이면 바깥 마, 안쪽 상)
      var lOut = setup.L, lIn = lOut === 'N' ? 'E' : 'N';
      var rOut = setup.R, rIn = rOut === 'N' ? 'E' : 'N';
      put(1, backY, lOut); put(2, backY, lIn);
      put(7, backY, rOut); put(6, backY, rIn);
      put(1, poY, 'P'); put(7, poY, 'P');
      [0, 2, 4, 6, 8].forEach(function (lf) { put(lf, solY, 'S'); });
    }
    place('C', setupC); place('H', setupH);
    return b;
  }
  function create(setupC, setupH) {
    setupC = setupC || { L: 'N', R: 'E' };
    setupH = setupH || { L: 'N', R: 'E' };
    return { b: setupBoard(setupC, setupH), turn: 'C', moves: [], result: null, setupC: setupC, setupH: setupH };
  }
  function kingPos(b, side) { for (var i = 0; i < 90; i++) { var p = b[i]; if (p && p.t === 'K' && p.c === side) return { x: i % 9, y: Math.floor(i / 9) }; } return null; }
  function pseudo(st, side) {
    var b = st.b, out = [];
    function push(fx, fy, tx, ty) { out.push({ fx: fx, fy: fy, tx: tx, ty: ty }); }
    function targetOk(x, y, side2) { var q = b[I(x, y)]; return !q || q.c !== side2; }
    var ORTH = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (var y = 0; y < 10; y++) for (var x = 0; x < 9; x++) {
      var p = b[I(x, y)]; if (!p || p.c !== side) continue;
      var i, nx, ny, q;
      if (p.t === 'K' || p.t === 'A') {
        for (i = 0; i < 4; i++) { nx = x + ORTH[i][0]; ny = y + ORTH[i][1]; if (inB(nx, ny) && inPalace(side, nx, ny) && targetOk(nx, ny, side)) push(x, y, nx, ny); }
        var dn = DIAG[x + ',' + y] || [];
        for (i = 0; i < dn.length; i++) { nx = dn[i][0]; ny = dn[i][1]; if (inPalace(side, nx, ny) && targetOk(nx, ny, side)) push(x, y, nx, ny); }
      } else if (p.t === 'R') {
        for (i = 0; i < 4; i++) {
          nx = x; ny = y;
          for (;;) { nx += ORTH[i][0]; ny += ORTH[i][1]; if (!inB(nx, ny)) break; q = b[I(nx, ny)]; if (!q) push(x, y, nx, ny); else { if (q.c !== side) push(x, y, nx, ny); break; } }
        }
        var lines = diagLineAt(x, y);
        for (i = 0; i < lines.length; i++) {
          var L = lines[i], pos = -1;
          for (var j = 0; j < 3; j++) if (L[j][0] === x && L[j][1] === y) pos = j;
          [1, -1].forEach(function (d) {
            var k = pos + d;
            while (k >= 0 && k < 3) {
              var sx = L[k][0], sy = L[k][1]; q = b[I(sx, sy)];
              if (!q) push(x, y, sx, sy);
              else { if (q.c !== side) push(x, y, sx, sy); break; }
              k += d;
            }
          });
        }
      } else if (p.t === 'P') {
        for (i = 0; i < 4; i++) {
          nx = x; ny = y; var screen = false;
          for (;;) {
            nx += ORTH[i][0]; ny += ORTH[i][1]; if (!inB(nx, ny)) break;
            q = b[I(nx, ny)];
            if (!screen) { if (q) { if (q.t === 'P') break; screen = true; } }
            else { if (!q) push(x, y, nx, ny); else { if (q.c !== side && q.t !== 'P') push(x, y, nx, ny); break; } }
          }
        }
        var lines2 = diagLineAt(x, y);
        for (i = 0; i < lines2.length; i++) {
          var L2 = lines2[i], pos2 = -1;
          for (var j2 = 0; j2 < 3; j2++) if (L2[j2][0] === x && L2[j2][1] === y) pos2 = j2;
          [1, -1].forEach(function (d) {
            var k = pos2 + d, screen = false;
            while (k >= 0 && k < 3) {
              var sx = L2[k][0], sy = L2[k][1]; q = b[I(sx, sy)];
              if (!screen) { if (q) { if (q.t === 'P') return; screen = true; } }
              else { if (!q) push(x, y, sx, sy); else { if (q.c !== side && q.t !== 'P') push(x, y, sx, sy); return; } }
              k += d;
            }
          });
        }
      } else if (p.t === 'N') {
        var steps = [
          { mx: 1, my: 0, tx: 2, ty: 1 }, { mx: 1, my: 0, tx: 2, ty: -1 },
          { mx: -1, my: 0, tx: -2, ty: 1 }, { mx: -1, my: 0, tx: -2, ty: -1 },
          { mx: 0, my: 1, tx: 1, ty: 2 }, { mx: 0, my: 1, tx: -1, ty: 2 },
          { mx: 0, my: -1, tx: 1, ty: -2 }, { mx: 0, my: -1, tx: -1, ty: -2 }
        ];
        for (i = 0; i < 8; i++) {
          var s = steps[i], mx = x + s.mx, my = y + s.my, tx = x + s.tx, ty = y + s.ty;
          if (!inB(tx, ty)) continue;
          if (b[I(mx, my)]) continue;
          if (targetOk(tx, ty, side)) push(x, y, tx, ty);
        }
      } else if (p.t === 'E') {
        var stepsE = [
          { mx: 1, my: 0, d1x: 2, d1y: 1, tx: 3, ty: 2 }, { mx: 1, my: 0, d1x: 2, d1y: -1, tx: 3, ty: -2 },
          { mx: -1, my: 0, d1x: -2, d1y: 1, tx: -3, ty: 2 }, { mx: -1, my: 0, d1x: -2, d1y: -1, tx: -3, ty: -2 },
          { mx: 0, my: 1, d1x: 1, d1y: 2, tx: 2, ty: 3 }, { mx: 0, my: 1, d1x: -1, d1y: 2, tx: -2, ty: 3 },
          { mx: 0, my: -1, d1x: 1, d1y: -2, tx: 2, ty: -3 }, { mx: 0, my: -1, d1x: -1, d1y: -2, tx: -2, ty: -3 }
        ];
        for (i = 0; i < 8; i++) {
          var e = stepsE[i], ex = x + e.mx, ey = y + e.my, gx = x + e.d1x, gy = y + e.d1y, hx = x + e.tx, hy = y + e.ty;
          if (!inB(hx, hy)) continue;
          if (b[I(ex, ey)]) continue;
          if (b[I(gx, gy)]) continue;
          if (targetOk(hx, hy, side)) push(x, y, hx, hy);
        }
      } else if (p.t === 'S') {
        var fwd = side === 'C' ? -1 : 1;
        var cand = [[0, fwd], [1, 0], [-1, 0]];
        for (i = 0; i < 3; i++) { nx = x + cand[i][0]; ny = y + cand[i][1]; if (inB(nx, ny) && targetOk(nx, ny, side)) push(x, y, nx, ny); }
        var dn2 = DIAG[x + ',' + y] || [];
        for (i = 0; i < dn2.length; i++) { nx = dn2[i][0]; ny = dn2[i][1]; if (ny - y === fwd && targetOk(nx, ny, side)) push(x, y, nx, ny); }
      }
    }
    return out;
  }
  function attacked(st, x, y, by) {
    var list = pseudo(st, by);
    for (var i = 0; i < list.length; i++) if (list[i].tx === x && list[i].ty === y) return true;
    return false;
  }
  function inCheck(st, side) { var k = kingPos(st.b, side); return k && attacked(st, k.x, k.y, opp(side)); }
  function doMove(st, mv) {
    var b = st.b.slice();
    if (!mv.pass) {
      b[I(mv.tx, mv.ty)] = b[I(mv.fx, mv.fy)];
      b[I(mv.fx, mv.fy)] = null;
    }
    return { b: b, turn: opp(st.turn), moves: st.moves.concat([mv]), result: null, setupC: st.setupC, setupH: st.setupH };
  }
  function legalMoves(st, side) {
    side = side || st.turn;
    var list = pseudo(st, side), out = [];
    for (var i = 0; i < list.length; i++) {
      var ns = doMove(Object.assign({}, st, { turn: side }), list[i]);
      if (!inCheck(ns, side)) out.push(list[i]);
    }
    if (!out.length && !inCheck(st, side)) out.push({ pass: true });
    return out;
  }
  function scoreOf(st) {
    var c = 0, h = 0;
    for (var i = 0; i < 90; i++) { var p = st.b[i]; if (!p) continue; if (p.c === 'C') c += SCORE[p.t]; else h += SCORE[p.t]; }
    return { C: c, H: h + 1.5 };
  }
  function scoreResult(st, reason) {
    var s = scoreOf(st);
    return { winner: s.C > s.H ? 'C' : 'H', reason: reason, scoreC: s.C, scoreH: s.H };
  }
  function kingsFace(st) {
    var kc = kingPos(st.b, 'C'), kh = kingPos(st.b, 'H');
    if (!kc || !kh || kc.x !== kh.x) return false;
    var y1 = Math.min(kc.y, kh.y), y2 = Math.max(kc.y, kh.y);
    for (var y = y1 + 1; y < y2; y++) if (st.b[I(kc.x, y)]) return false;
    return true;
  }
  function apply(st, mv) {
    if (st.result) return null;
    var legal = legalMoves(st);
    var found = null;
    for (var i = 0; i < legal.length; i++) {
      var m = legal[i];
      if (mv.pass && m.pass) { found = m; break; }
      if (!mv.pass && !m.pass && m.fx === mv.fx && m.fy === mv.fy && m.tx === mv.tx && m.ty === mv.ty) { found = m; break; }
    }
    if (!found) return null;
    var ns = doMove(st, found);
    if (!found.pass && kingsFace(ns)) { ns.result = scoreResult(ns, 'bigjang'); return ns; }
    if (ns.moves.length >= 300) { ns.result = scoreResult(ns, 'scorelimit'); return ns; }
    var next = ns.turn;
    if (legalMoves(ns, next).length === 0) {
      // 장군 상태에서 둘 곳이 없으면 외통. (장군이 아니면 legalMoves가 패스를 돌려준다)
      ns.result = { winner: st.turn, reason: 'checkmate' };
    }
    return ns;
  }
  function fromMoves(moves, setupC, setupH) {
    var st = create(setupC, setupH);
    for (var i = 0; i < moves.length; i++) { var ns = apply(st, moves[i]); if (!ns) return st; st = ns; }
    return st;
  }
  function evaluate(st) {
    var s = 0;
    for (var i = 0; i < 90; i++) {
      var p = st.b[i]; if (!p) continue;
      var v = EVAL[p.t];
      if (p.t === 'S') { var adv = p.c === 'C' ? (6 - Math.floor(i / 9)) : (Math.floor(i / 9) - 3); v += Math.max(0, adv) * 18; }
      s += p.c === st.turn ? v : -v;
    }
    return s;
  }
  var nodes = 0, nodeCap = 40000;
  function search(st, depth, alpha, beta, ply) {
    if (nodes++ > nodeCap) return evaluate(st);
    if (st.moves.length >= 300) { var sr = scoreOf(st); return (sr[st.turn] - sr[opp(st.turn)]) * 100; }
    var moves = legalMoves(st);
    var real = moves.filter(function (m) { return !m.pass; });
    if (!real.length) {
      if (inCheck(st, st.turn)) return -100000 + ply;
      moves = moves; // 패스만 가능
    }
    if (depth === 0) return evaluate(st);
    moves.sort(function (a, b2) {
      function sc(m) { if (m.pass) return -1; var v = st.b[I(m.tx, m.ty)]; return v ? EVAL[v.t] : 0; }
      return sc(b2) - sc(a);
    });
    var best = -Infinity;
    for (var i = 0; i < moves.length; i++) {
      var ns = doMove(st, moves[i]);
      var sc;
      if (!moves[i].pass && kingsFace(ns)) { var s2 = scoreOf(ns); sc = (s2[st.turn] - s2[opp(st.turn)]) * 100; }
      else sc = -search(ns, depth - 1, -beta, -alpha, ply + 1);
      if (sc > best) best = sc;
      if (best > alpha) alpha = best;
      if (alpha >= beta) break;
    }
    return best;
  }
  function aiMove(st, level) {
    var depth = level === 1 ? 1 : level === 2 ? 2 : 3;
    nodes = 0;
    var moves = legalMoves(st).filter(function (m) { return !m.pass; });
    if (!moves.length) return { pass: true };
    moves.sort(function (a, b2) {
      function sc(m) { var v = st.b[I(m.tx, m.ty)]; return v ? EVAL[v.t] : 0; }
      return sc(b2) - sc(a);
    });
    var best = -Infinity, chosen = [];
    for (var i = 0; i < moves.length; i++) {
      var ns = doMove(st, moves[i]);
      var sc;
      if (kingsFace(ns)) { var s2 = scoreOf(ns); sc = (s2[st.turn] - s2[opp(st.turn)]) * 100; }
      else sc = -search(ns, depth - 1, -Infinity, Infinity, 1);
      if (sc > best + 0.001) { best = sc; chosen = [moves[i]]; }
      else if (Math.abs(sc - best) <= 0.001) chosen.push(moves[i]);
    }
    if (level === 1 && chosen.length > 1) return chosen[Math.floor(Math.random() * chosen.length)];
    return chosen[0];
  }
  var API = { create: create, apply: apply, fromMoves: fromMoves, legalMoves: legalMoves, inCheck: inCheck, aiMove: aiMove, scoreOf: scoreOf, kingsFace: kingsFace };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  g.NexusJanggi = API;
})(typeof window !== 'undefined' ? window : globalThis);
