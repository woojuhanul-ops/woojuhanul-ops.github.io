/* 넥서스 대국실 — 바둑 엔진 (순수 로직, 브라우저/Node 겸용)
   한국 룰. 덤 6.5집. 계가는 집+잡은 돌(territory 방식), 죽은 돌은 합의 지정 후 제거.
   패는 위치 반복 금지(위치적 수퍼코)로 판정한다. */
(function (g) {
  'use strict';
  var KOMI = 6.5;

  function idx(st, x, y) { return y * st.size + x; }
  function inB(st, x, y) { return x >= 0 && x < st.size && y >= 0 && y < st.size; }
  function hash(b) { return b.join(''); }

  function group(st, sx, sy) {
    var color = st.b[idx(st, sx, sy)];
    if (!color) return null;
    var stones = [], libs = {}, seen = {}, stack = [[sx, sy]];
    seen[idx(st, sx, sy)] = 1;
    while (stack.length) {
      var cur = stack.pop(), x = cur[0], y = cur[1];
      stones.push(idx(st, x, y));
      var nb = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
      for (var i = 0; i < 4; i++) {
        var nx = nb[i][0], ny = nb[i][1];
        if (!inB(st, nx, ny)) continue;
        var ni = idx(st, nx, ny), v = st.b[ni];
        if (v === 0) libs[ni] = 1;
        else if (v === color && !seen[ni]) { seen[ni] = 1; stack.push([nx, ny]); }
      }
    }
    return { color: color, stones: stones, liberties: Object.keys(libs).map(Number) };
  }

  var HOSHI = {
    19: { a: 3, c: 9, b: 15 },
    13: { a: 2, c: 6, b: 10 },
    9: { a: 2, c: 4, b: 6 }
  };
  function handicapPoints(size, n) {
    var h = HOSHI[size]; if (!h || n < 2) return [];
    var A = [h.a, h.a], B = [h.b, h.b], C = [h.b, h.a], D = [h.a, h.b];
    var E = [h.a, h.c], F = [h.b, h.c], G = [h.c, h.a], H = [h.c, h.b], T = [h.c, h.c];
    var table = {
      2: [C, D], 3: [C, D, A], 4: [C, D, A, B], 5: [C, D, A, B, T],
      6: [C, D, A, B, E, F], 7: [C, D, A, B, E, F, T],
      8: [C, D, A, B, E, F, G, H], 9: [C, D, A, B, E, F, G, H, T]
    };
    return (table[n] || []).map(function (p) { return { x: p[0], y: p[1] }; });
  }

  function create(size, opts) {
    opts = opts || {};
    size = [9, 13, 19].indexOf(size) >= 0 ? size : 19;
    var st = {
      size: size, komi: opts.komi !== undefined ? opts.komi : KOMI,
      b: new Array(size * size).fill(0),
      turn: 1, moves: [], captures: { 1: 0, 2: 0 },
      history: {}, phase: 'play', passes: 0, last: null,
      handicap: 0, setup: [], result: null, dead: {}
    };
    var hc = opts.handicap || 0;
    if (hc >= 2) {
      var pts = handicapPoints(size, hc);
      st.handicap = hc; st.setup = pts;
      pts.forEach(function (p) { st.b[idx(st, p.x, p.y)] = 1; });
      st.turn = 2; // 접바둑은 백이 먼저 둔다
    }
    st.history[hash(st.b)] = 1;
    return st;
  }
  function clone(st) {
    var ns = {
      size: st.size, komi: st.komi, b: st.b.slice(), turn: st.turn,
      moves: st.moves.slice(), captures: { 1: st.captures[1], 2: st.captures[2] },
      history: st.history, phase: st.phase, passes: st.passes, last: st.last,
      handicap: st.handicap, setup: st.setup, result: st.result, dead: st.dead
    };
    return ns;
  }

  function apply(st, mv) {
    if (st.result || st.phase !== 'play') return null;
    var ns = clone(st);
    if (mv.pass) {
      ns.moves.push({ pass: true, c: st.turn });
      ns.passes = st.passes + 1;
      ns.last = null;
      if (ns.passes >= 2) ns.phase = 'score';
      ns.turn = st.turn === 1 ? 2 : 1;
      return ns;
    }
    var x = mv.x, y = mv.y;
    if (!inB(st, x, y) || st.b[idx(st, x, y)] !== 0) return null;
    var me = st.turn, opp = me === 1 ? 2 : 1;
    ns.b[idx(ns, x, y)] = me;
    // 상대 돌 잡기
    var captured = 0, checked = {};
    var nb = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]];
    for (var i = 0; i < 4; i++) {
      var nx = nb[i][0], ny = nb[i][1];
      if (!inB(ns, nx, ny)) continue;
      var ni = idx(ns, nx, ny);
      if (ns.b[ni] === opp && !checked[ni]) {
        var gr = group(ns, nx, ny);
        gr.stones.forEach(function (s) { checked[s] = 1; });
        if (gr.liberties.length === 0) {
          gr.stones.forEach(function (s) { ns.b[s] = 0; captured++; });
        }
      }
    }
    // 자살수 금지 (잡은 돌이 없을 때 자기 활로가 0이면 불가)
    var my = group(ns, x, y);
    if (!my || my.liberties.length === 0) return null;
    // 수퍼코: 같은 판형 반복 금지
    var h = hash(ns.b);
    if (st.history[h]) return null;
    ns.history = Object.assign({}, st.history); ns.history[h] = 1;
    ns.captures[me] = st.captures[me] + captured;
    ns.moves.push({ x: x, y: y, c: me, cap: captured });
    ns.passes = 0;
    ns.last = { x: x, y: y };
    ns.turn = opp;
    return ns;
  }

  // 계가 국면에서 대국으로 돌아가기 (양쪽 합의 시)
  function resumePlay(st) {
    if (st.phase !== 'score' || st.result) return null;
    var ns = clone(st);
    ns.phase = 'play';
    ns.passes = 0;
    ns.dead = {};
    return ns;
  }

  function fromMoves(moves, size, opts) {
    var st = create(size, opts);
    for (var i = 0; i < (moves || []).length; i++) {
      var ns = apply(st, moves[i]);
      if (!ns) break;
      st = ns;
    }
    return st;
  }

  function legalMoves(st) {
    if (st.result || st.phase !== 'play') return [];
    var out = [{ pass: true }];
    for (var y = 0; y < st.size; y++) for (var x = 0; x < st.size; x++) {
      if (st.b[idx(st, x, y)] === 0 && apply(st, { x: x, y: y })) out.push({ x: x, y: y });
    }
    return out;
  }

  // 단수(활로 1개)인 돌들의 집합 — 표시용
  function atariStones(st) {
    var seen = {}, out = {};
    for (var y = 0; y < st.size; y++) for (var x = 0; x < st.size; x++) {
      var i = idx(st, x, y);
      if (st.b[i] && !seen[i]) {
        var gr = group(st, x, y);
        gr.stones.forEach(function (s) { seen[s] = 1; });
        if (gr.liberties.length === 1) gr.stones.forEach(function (s) { out[s] = 1; });
      }
    }
    return out;
  }

  // 계가: dead = {idx:1} 죽은 돌 지정. 한국식(집 + 잡은 돌, 백은 덤 추가)
  function score(st, dead) {
    dead = dead || {};
    var b = st.b.slice();
    var capB = st.captures[1], capW = st.captures[2];
    Object.keys(dead).forEach(function (k) {
      var i = +k;
      if (b[i] === 1) { capW++; b[i] = 0; }
      else if (b[i] === 2) { capB++; b[i] = 0; }
    });
    var tmp = { size: st.size, b: b };
    var terrB = 0, terrW = 0, terrMap = {};
    var seen = {};
    for (var y = 0; y < st.size; y++) for (var x = 0; x < st.size; x++) {
      var i2 = idx(tmp, x, y);
      if (b[i2] !== 0 || seen[i2]) continue;
      // 빈 영역 flood fill
      var region = [], borders = {}, stack = [[x, y]];
      seen[i2] = 1;
      while (stack.length) {
        var cur = stack.pop(), cx = cur[0], cy = cur[1];
        region.push(idx(tmp, cx, cy));
        var nb = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
        for (var j = 0; j < 4; j++) {
          var nx = nb[j][0], ny = nb[j][1];
          if (!inB(tmp, nx, ny)) continue;
          var ni = idx(tmp, nx, ny), v = b[ni];
          if (v !== 0) borders[v] = 1;
          else if (!seen[ni]) { seen[ni] = 1; stack.push([nx, ny]); }
        }
      }
      var cols = Object.keys(borders);
      if (cols.length === 1) {
        var owner = +cols[0];
        region.forEach(function (r) { terrMap[r] = owner; });
        if (owner === 1) terrB += region.length; else terrW += region.length;
      }
    }
    var scoreB = terrB + capB, scoreW = terrW + capW + st.komi;
    var diff = Math.round((scoreB - scoreW) * 10) / 10;
    return {
      scoreB: scoreB, scoreW: scoreW, diff: diff,
      winner: diff > 0 ? 1 : 2,
      terrB: terrB, terrW: terrW, capB: capB, capW: capW, terrMap: terrMap
    };
  }

  function coord(x, y, size) {
    var cols = 'ABCDEFGHJKLMNOPQRST'; // I를 건너뛴다
    return cols[x] + (size - y);
  }

  function toSGF(st) {
    var s = '(;GM[1]FF[4]CA[UTF-8]SZ[' + st.size + ']KM[' + st.komi + ']';
    if (st.handicap >= 2 && st.setup.length) {
      s += 'HA[' + st.handicap + ']AB';
      st.setup.forEach(function (p) { s += '[' + sgfPt(p.x, p.y) + ']'; });
    }
    st.moves.forEach(function (mv) {
      s += ';' + (mv.c === 1 ? 'B' : 'W') + '[' + (mv.pass ? 'tt' : sgfPt(mv.x, mv.y)) + ']';
    });
    return s + ')';
  }
  function sgfPt(x, y) { return String.fromCharCode(97 + x) + String.fromCharCode(97 + y); }

  // 본선(첫 갈래)만 읽는 간단한 SGF 해석 — 변화도는 무시한다
  function fromSGF(text) {
    if (!text) return null;
    var size = 19, komi = KOMI, handicap = 0, setup = [], moves = [];
    var m;
    if ((m = text.match(/SZ\[(\d+)\]/))) size = +m[1];
    if ((m = text.match(/KM\[([\d.]+)\]/))) komi = parseFloat(m[1]);
    if ((m = text.match(/HA\[(\d+)\]/))) handicap = +m[1];
    var ab = text.match(/AB((?:\[[a-z]{2}\])+)/);
    if (ab) {
      var pts = ab[1].match(/\[([a-z]{2})\]/g) || [];
      setup = pts.map(function (t) { return { x: t.charCodeAt(1) - 97, y: t.charCodeAt(2) - 97 }; });
      if (!handicap) handicap = setup.length;
    }
    var re = /;([BW])\[([a-z]{0,2})\]/g, mm;
    while ((mm = re.exec(text))) {
      var c = mm[1] === 'B' ? 1 : 2, pt = mm[2];
      if (!pt || pt === 'tt') moves.push({ pass: true, c: c });
      else moves.push({ x: pt.charCodeAt(0) - 97, y: pt.charCodeAt(1) - 97, c: c });
    }
    var st = create(size, { komi: komi, handicap: setup.length ? 0 : handicap });
    if (setup.length) {
      // AB 지정이 있으면 그 돌을 그대로 세팅
      st.b = new Array(size * size).fill(0);
      st.setup = setup; st.handicap = setup.length;
      setup.forEach(function (p) { st.b[p.y * size + p.x] = 1; });
      st.turn = 2; st.history = {}; st.history[hash(st.b)] = 1;
    }
    var cur = st;
    for (var i = 0; i < moves.length; i++) {
      var ns = apply(cur, moves[i]);
      if (!ns) break;
      cur = ns;
    }
    cur.allMoves = moves;
    return cur;
  }

  var API = {
    KOMI: KOMI, create: create, apply: apply, fromMoves: fromMoves,
    legalMoves: legalMoves, group: group, atariStones: atariStones, resumePlay: resumePlay,
    score: score, coord: coord, toSGF: toSGF, fromSGF: fromSGF,
    handicapPoints: handicapPoints
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  g.NexusBaduk = API;
})(typeof window !== 'undefined' ? window : globalThis);
