/* 넥서스 대국실 — 오목 엔진 (순수 로직, 브라우저/Node 겸용)
   규칙: 15x15. 흑 선공. 한 방향이라도 정확히 5개가 이어지면 승리.
   6개 이상만 이어진 경우(과목)는 승리로 인정하지 않는다. 금수 없음. */
(function (g) {
  'use strict';
  var N = 15;
  function idx(x, y) { return y * N + x; }
  function inB(x, y) { return x >= 0 && x < N && y >= 0 && y < N; }
  var DIRS = [[1, 0], [0, 1], [1, 1], [1, -1]];

  function create() {
    return { b: new Array(N * N).fill(0), turn: 1, moves: [], result: null, last: null };
  }
  function clone(st) {
    return { b: st.b.slice(), turn: st.turn, moves: st.moves.slice(), result: st.result, last: st.last };
  }
  // (x,y)에 색 c 돌이 있다고 가정하고 방향 (dx,dy)의 연속 수와 열린 끝 수를 센다
  function runInfo(b, x, y, dx, dy, c) {
    var n = 1, open = 0, i, nx, ny, v;
    i = 1;
    for (;;) { nx = x + dx * i; ny = y + dy * i; if (!inB(nx, ny)) break; v = b[idx(nx, ny)]; if (v === c) { n++; i++; } else { if (v === 0) open++; break; } }
    i = 1;
    for (;;) { nx = x - dx * i; ny = y - dy * i; if (!inB(nx, ny)) break; v = b[idx(nx, ny)]; if (v === c) { n++; i++; } else { if (v === 0) open++; break; } }
    return { n: n, open: open };
  }
  function isWinAt(b, x, y, c) {
    for (var d = 0; d < 4; d++) {
      if (runInfo(b, x, y, DIRS[d][0], DIRS[d][1], c).n === 5) return true;
    }
    return false;
  }
  function apply(st, mv) {
    if (st.result) return null;
    var x = mv.x, y = mv.y;
    if (!inB(x, y) || st.b[idx(x, y)] !== 0) return null;
    var ns = clone(st);
    ns.b[idx(x, y)] = st.turn;
    ns.moves.push({ x: x, y: y, c: st.turn });
    ns.last = { x: x, y: y };
    if (isWinAt(ns.b, x, y, st.turn)) {
      ns.result = { winner: st.turn, reason: 'five' };
    } else if (ns.moves.length >= N * N) {
      ns.result = { winner: 0, reason: 'full' };
    }
    ns.turn = st.turn === 1 ? 2 : 1;
    return ns;
  }
  function fromMoves(moves) {
    var st = create();
    for (var i = 0; i < moves.length; i++) {
      var ns = apply(st, moves[i]);
      if (!ns) return st;
      st = ns;
    }
    return st;
  }
  // 빈 칸에 색 c가 두면 얻는 패턴 점수 (방향 합산)
  function cellScore(b, x, y, c) {
    var total = 0;
    for (var d = 0; d < 4; d++) {
      var info = runInfo(b, x, y, DIRS[d][0], DIRS[d][1], c);
      var n = info.n, open = info.open, s;
      if (n >= 5) s = 10000000;
      else if (n === 4) s = open === 2 ? 1000000 : 100000;
      else if (n === 3) s = open === 2 ? 12000 : 1000;
      else if (n === 2) s = open === 2 ? 600 : 60;
      else s = open === 2 ? 8 : 1;
      total += s;
    }
    // 중심 가산점 (초반 자리 다툼)
    var cd = Math.abs(x - 7) + Math.abs(y - 7);
    return total + (14 - cd);
  }
  function candidates(b) {
    var seen = {}, out = [], x, y, dx, dy;
    var any = false;
    for (y = 0; y < N; y++) for (x = 0; x < N; x++) if (b[idx(x, y)] !== 0) {
      any = true;
      for (dy = -2; dy <= 2; dy++) for (dx = -2; dx <= 2; dx++) {
        var nx = x + dx, ny = y + dy;
        if (inB(nx, ny) && b[idx(nx, ny)] === 0) seen[idx(nx, ny)] = 1;
      }
    }
    if (!any) return [{ x: 7, y: 7 }];
    for (var k in seen) { var i = +k; out.push({ x: i % N, y: Math.floor(i / N) }); }
    return out;
  }
  function moveScore(b, x, y, me) {
    var opp = me === 1 ? 2 : 1;
    return cellScore(b, x, y, me) + cellScore(b, x, y, opp) * 0.92;
  }
  function bestGreedy(b, me) {
    var cs = candidates(b), best = null, bs = -Infinity;
    for (var i = 0; i < cs.length; i++) {
      var s = moveScore(b, cs[i].x, cs[i].y, me);
      if (s > bs) { bs = s; best = cs[i]; }
    }
    return { mv: best, score: bs };
  }
  function aiMove(st, level) {
    var me = st.turn;
    var cs = candidates(st.b);
    if (cs.length === 1) return cs[0];
    if (level === 1) {
      // 쉬움: 상위 후보 중 무작위성, 단 눈앞의 승리는 잡고 5목은 막는다
      var scored = cs.map(function (m) { return { mv: m, s: moveScore(st.b, m.x, m.y, me) }; });
      scored.sort(function (a, b2) { return b2.s - a.s; });
      for (var i = 0; i < scored.length; i++) if (scored[i].s >= 10000000) return scored[i].mv;
      var opp = me === 1 ? 2 : 1;
      for (var j = 0; j < cs.length; j++) if (cellScore(st.b, cs[j].x, cs[j].y, opp) >= 10000000) return cs[j];
      var top = scored.slice(0, Math.min(5, scored.length));
      return top[Math.floor(Math.random() * top.length)].mv;
    }
    if (level === 2) return bestGreedy(st.b, me).mv;
    // 어려움: 2플라이 — 내 수 이후 상대의 최선 응수까지 본다
    var ranked = cs.map(function (m) { return { mv: m, s: moveScore(st.b, m.x, m.y, me) }; });
    ranked.sort(function (a, b2) { return b2.s - a.s; });
    var topN = ranked.slice(0, 8), best = topN[0].mv, bv = -Infinity;
    for (var a = 0; a < topN.length; a++) {
      var m = topN[a].mv;
      var ns = apply(st, m);
      if (!ns) continue;
      if (ns.result && ns.result.winner === me) return m;
      var reply = bestGreedy(ns.b, ns.turn);
      var v = topN[a].s - reply.score * 0.95;
      if (v > bv) { bv = v; best = m; }
    }
    return best;
  }
  var API = { N: N, create: create, apply: apply, fromMoves: fromMoves, isWinAt: isWinAt, aiMove: aiMove, cellScore: cellScore };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  g.NexusOmok = API;
})(typeof window !== 'undefined' ? window : globalThis);
