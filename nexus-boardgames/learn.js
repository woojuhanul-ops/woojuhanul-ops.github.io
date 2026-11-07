/* 넥서스 대국실 — 배우기(튜토리얼)
   각 게임의 작은 판에서 눌러 보며 익히는 입문 과정. 규칙 판정은 기존 엔진을 그대로 쓴다. */
(function (global) {
  'use strict';
  var B = global.NexusBaduk, O = global.NexusOmok, J = global.NexusJanggi, C = global.NexusChess;

  function L() { return global.LANG === 'en' ? 'en' : 'ko'; }
  function tx(o) { return o[L()] || o.ko; }
  function el(id) { return document.getElementById(id); }

  /* ---------- 바둑 판 그리기 (대국 화면과 같은 부품) ---------- */
  function drawGo(box, st, onTap, marks) {
    var N = st.size, step = 100 / N;
    box.innerHTML = '';
    var field = document.createElement('div'); field.className = 'gofield';
    var svg = '<svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none">';
    for (var i = 0; i < N; i++) {
      var pos = (i + 0.5) * step;
      svg += '<line x1="' + pos + '" y1="' + (step / 2) + '" x2="' + pos + '" y2="' + (100 - step / 2) + '" stroke="rgba(40,22,4,.85)" stroke-width="0.35"/>';
      svg += '<line x1="' + (step / 2) + '" y1="' + pos + '" x2="' + (100 - step / 2) + '" y2="' + pos + '" stroke="rgba(40,22,4,.85)" stroke-width="0.35"/>';
    }
    B.handicapPoints(N, N === 9 ? 5 : 9).forEach(function (h) { svg += '<circle cx="' + ((h.x + 0.5) * step) + '" cy="' + ((h.y + 0.5) * step) + '" r="0.8" fill="rgba(40,22,4,.85)"/>'; });
    svg += '</svg>';
    field.innerHTML = svg;
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      (function (x, y) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'gpt';
        b.style.left = ((x + 0.5) * step) + '%'; b.style.top = ((y + 0.5) * step) + '%'; b.style.width = step + '%';
        var v = st.b[y * N + x], html = '';
        if (v) html += '<span class="gst ' + (v === 1 ? 'b' : 'w') + '"></span>';
        if (marks && marks[y * N + x]) html += '<span class="capdot"></span>';
        b.innerHTML = html;
        b.addEventListener('click', function () { onTap && onTap(x, y); });
        field.appendChild(b);
      })(x, y);
    }
    box.appendChild(field);
  }
  function P(st, x, y, v) { st.b[y * st.size + x] = v; }
  function goState(setup) {
    var st = B.create(9, {});
    setup(st);
    st.moves = []; st.passes = 0; st.phase = 'play'; st.dead = {}; st.result = null;
    return st;
  }

  /* ---------- 오목 판 ---------- */
  function drawOmok(box, st, onTap) {
    box.innerHTML = '';
    var wrap = document.createElement('div'); wrap.className = 'omokWrap';
    var field = document.createElement('div'); field.className = 'omokGrid';
    for (var y = 0; y < 15; y++) for (var x = 0; x < 15; x++) {
      (function (x, y) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'ocell';
        var v = st.b[y * 15 + x];
        var s = document.createElement('span'); s.className = 'st' + (v === 1 ? ' b' : v === 2 ? ' w' : '');
        b.appendChild(s);
        b.addEventListener('click', function () { onTap && onTap(x, y); });
        field.appendChild(b);
      })(x, y);
    }
    wrap.appendChild(field);
    box.appendChild(wrap);
  }

  /* ---------- 체스·장기 판 (눌러서 이동 칸 보기) ---------- */
  var GLYPH = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };
  function drawChess(box, st, sel, targets, onTap) {
    box.innerHTML = '';
    var field = document.createElement('div'); field.className = 'cfield';
    for (var y = 0; y < 8; y++) for (var x = 0; x < 8; x++) {
      (function (x, y) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'csq ' + ((x + y) % 2 === 0 ? 'lt' : 'dk');
        if (sel && sel.x === x && sel.y === y) b.classList.add('sel');
        if (targets && targets[x + ',' + y]) b.classList.add('tgt');
        var pc = st.b[y * 8 + x];
        if (pc) { var s = document.createElement('span'); s.className = 'pc ' + (pc === pc.toUpperCase() ? 'w' : 'b'); s.textContent = GLYPH[pc.toUpperCase()]; b.appendChild(s); }
        b.addEventListener('click', function () { onTap && onTap(x, y); });
        field.appendChild(b);
      })(x, y);
    }
    box.appendChild(field);
  }
  var JNAME = { ko: { K: '宮', R: '車', P: '包', N: '馬', E: '象', A: '士' }, en: { K: 'K', R: 'R', P: 'C', N: 'N', E: 'E', A: 'A' } };
  function drawJanggi(box, st, sel, targets, onTap) {
    box.innerHTML = '';
    var field = document.createElement('div'); field.className = 'jfield';
    var lines = '<svg class="lines" viewBox="0 0 800 900" preserveAspectRatio="none">';
    for (var i = 0; i <= 8; i++) lines += '<line x1="' + i * 100 + '" y1="0" x2="' + i * 100 + '" y2="900" stroke="rgba(90,55,10,.6)" stroke-width="2"/>';
    for (var j = 0; j <= 9; j++) lines += '<line x1="0" y1="' + j * 100 + '" x2="800" y2="' + j * 100 + '" stroke="rgba(90,55,10,.6)" stroke-width="2"/>';
    lines += '<path d="M300 0 L400 100 L500 200 M500 0 L400 100 L300 200 M300 700 L400 800 L500 900 M500 700 L400 800 L300 900" stroke="rgba(90,55,10,.6)" stroke-width="2" fill="none"/>';
    lines += '</svg>';
    field.innerHTML = lines;
    for (var y = 0; y < 10; y++) for (var x = 0; x < 9; x++) {
      (function (x, y) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'jpt';
        b.style.left = (x / 8 * 100) + '%'; b.style.top = (y / 9 * 100) + '%';
        var pc0 = st.b[y * 9 + x];
        if (pc0) {
          var pc = document.createElement('span');
          pc.className = 'pc ' + (pc0.c === 'C' ? 'cho' : 'han');
          var g1 = document.createElement('span'); g1.className = 'han1';
          g1.textContent = pc0.t === 'S' ? (pc0.c === 'C' ? '兵' : '卒') : JNAME[L()][pc0.t];
          pc.appendChild(g1); b.appendChild(pc);
          if (sel && sel.x === x && sel.y === y) b.classList.add('sel');
        }
        if (targets && targets[x + ',' + y]) {
          var mark = document.createElement('span');
          mark.className = pc0 ? 'ring' : 'dot';
          b.appendChild(mark);
        }
        b.addEventListener('click', function () { onTap && onTap(x, y); });
        field.appendChild(b);
      })(x, y);
    }
    box.appendChild(field);
  }
  function targetsOf(st, engine, x, y) {
    var map = {};
    engine.legalMoves(st).forEach(function (m) { if (m.fx === x && m.fy === y) map[m.tx + ',' + m.ty] = true; });
    return map;
  }

  /* ---------- 과정 정의 ---------- */
  function badukLessons() {
    return [
      {
        title: { ko: '돌 놓기와 활로', en: 'Placing stones and liberties' },
        steps: [
          {
            text: { ko: '바둑돌은 칸 안이 아니라 선이 만나는 교차점에 둡니다. 빈 교차점을 눌러 흑돌을 하나 놓아 보세요.', en: 'Go stones go on the intersections, not inside the squares. Tap an empty intersection to place a black stone.' },
            setup: function () { return goState(function () {}); },
            goal: function (st, x, y) { return !st.b[y * st.size + x]; },
            apply: function (st, x, y) { return B.apply(st, { x: x, y: y }); }
          },
          {
            text: { ko: '돌의 상하좌우 빈 교차점이 활로입니다. 지금 흑돌의 활로는 3개입니다. 활로가 모두 막히면 그 돌은 잡힙니다. 다음 과정으로 넘어가 보세요.', en: 'The empty points directly around a stone are its liberties. This black stone has 3 liberties. A stone with no liberties is captured. Continue to the next step.' },
            setup: function () {
              return goState(function (st) { P(st, 4, 4, 1); P(st, 5, 4, 2); st.turn = 1; });
            },
            goal: null
          }
        ]
      },
      {
        title: { ko: '단수와 잡기', en: 'Atari and capturing' },
        steps: [
          {
            text: { ko: '가운데 백돌은 활로가 아래쪽 하나만 남았습니다. 활로가 하나만 남은 상태를 단수라고 합니다. 남은 활로를 눌러 백돌을 잡아 보세요.', en: 'The white stone in the middle has only one liberty left, below it — that is atari. Tap the last liberty to capture it.' },
            setup: function () {
              return goState(function (st) {
                P(st, 4, 4, 2); P(st, 3, 4, 1); P(st, 5, 4, 1); P(st, 4, 3, 1); st.turn = 1;
              });
            },
            goal: function (st, x, y) { return x === 4 && y === 5; },
            apply: function (st, x, y) { return B.apply(st, { x: x, y: y }); },
            doneText: { ko: '백돌을 잡았습니다. 잡은 돌은 판에서 들어내며, 종국에 집과 함께 셉니다.', en: 'Captured. Captured stones leave the board and are counted with territory at the end.' }
          }
        ]
      },
      {
        title: { ko: '연결하기', en: 'Connecting stones' },
        steps: [
          {
            text: { ko: '흑돌 두 개가 대각선으로 떨어져 있고, 백이 사이를 끊으려 합니다. 두 돌이 이어지는 교차점을 눌러 연결해 보세요.', en: 'Two black stones sit diagonally apart and White threatens to cut between them. Tap the intersection that connects them.' },
            setup: function () {
              return goState(function (st) {
                P(st, 3, 3, 1); P(st, 4, 4, 1); P(st, 4, 3, 2); st.turn = 1;
              });
            },
            goal: function (st, x, y) { return x === 3 && y === 4; },
            apply: function (st, x, y) { return B.apply(st, { x: x, y: y }); },
            doneText: { ko: '두 돌이 한 몸으로 이어졌습니다. 이어진 돌은 활로를 함께 쓰므로 잘 잡히지 않습니다.', en: 'Connected into one group. Connected stones share liberties and are much harder to capture.' }
          }
        ]
      },
      {
        title: { ko: '집 만들기와 계가', en: 'Territory and counting' },
        steps: [
          {
            text: { ko: '모서리의 빈 교차점 하나를 흑이 두면 둘러싼 빈 곳이 흑의 집이 됩니다. 마지막 빈 교차점을 눌러 보세요.', en: 'One empty corner point remains. Play there to finish surrounding the empty area — it becomes Black territory.' },
            setup: function () {
              return goState(function (st) {
                P(st, 2, 0, 1); P(st, 2, 1, 1); P(st, 0, 2, 1); P(st, 1, 2, 1); st.turn = 1;
              });
            },
            goal: function (st, x, y) { return x === 2 && y === 2; },
            apply: function (st, x, y) { return B.apply(st, { x: x, y: y }); },
            doneText: { ko: '왼쪽 위 모서리의 빈 4점이 흑의 집입니다. 대국이 끝나면 양쪽의 집과 잡은 돌을 세고, 백은 덤 6.5집을 더해 승패를 정합니다.', en: 'The four empty points in the corner are Black territory. At the end, territory plus captures are counted, and White receives 6.5 points of komi.' }
          }
        ]
      }
    ];
  }

  function omokLessons() {
    function seqSt(pairs) {
      var moves = pairs.map(function (p) { return { x: p[0], y: p[1] }; });
      return O.fromMoves(moves);
    }
    return [
      {
        title: { ko: '다섯 잇기 완성', en: 'Completing five' },
        steps: [
          {
            text: { ko: '흑돌 네 개가 가로로 이어져 있습니다. 다섯 개가 되도록 빈 끝점을 눌러 보세요. 양쪽 끝 어느 쪽이든 됩니다.', en: 'Four black stones stand in a row. Tap an open end to make five.' },
            setup: function () { return seqSt([[7, 7], [0, 0], [8, 7], [0, 1], [9, 7], [0, 2], [10, 7], [0, 3]]); },
            goal: function (st, x, y) { return y === 7 && (x === 6 || x === 11); },
            apply: function (st, x, y) { return O.apply(st, { x: x, y: y }); },
            doneText: { ko: '다섯 개가 이어져 흑이 이겼습니다. 단, 대국실의 오목은 정확히 다섯 개만 승리로 셉니다 — 여섯 개를 잇는 과목은 이기지 못합니다.', en: 'Five in a row. Note: in this room only exactly five wins — six or more in a row does not count.' }
          }
        ]
      },
      {
        title: { ko: '열린 셋 막기', en: 'Blocking an open three' },
        steps: [
          {
            text: { ko: '백돌 세 개가 양쪽이 열린 채 이어져 있습니다. 이대로 두면 백이 넷을 만들어 막기 어려워집니다. 한쪽 끝을 눌러 막아 보세요.', en: 'Three white stones stand open on both ends. Block one end now, before it becomes four.' },
            setup: function () { return seqSt([[0, 0], [7, 7], [0, 1], [8, 7], [0, 2], [9, 7]]); },
            goal: function (st, x, y) { return y === 7 && (x === 6 || x === 10); },
            apply: function (st, x, y) { return O.apply(st, { x: x, y: y }); },
            doneText: { ko: '한쪽을 막았습니다. 열린 셋은 미리 막는 것이 오목 수비의 기본입니다.', en: 'Blocked. Stopping an open three early is the basis of Omok defence.' }
          }
        ]
      }
    ];
  }

  function chessLessons() {
    function emptyChess() {
      var b = []; for (var i = 0; i < 64; i++) b.push(null);
      return { b: b, turn: 'w', castling: 0, ep: -1, half: 0, moves: [], rep: {}, result: null };
    }
    var pieceSteps = [
      { p: 'N', x: 3, y: 4, ko: '나이트는 L자 — 두 칸 가고 한 칸 꺾습니다. 다른 기물을 뛰어넘을 수 있는 유일한 기물입니다.', en: 'The knight moves in an L: two squares, then one to the side. It is the only piece that can jump over others.' },
      { p: 'B', x: 3, y: 4, ko: '비숍은 대각선으로 원하는 만큼 움직입니다. 처음 선 대각선의 색에서 벗어나지 않습니다.', en: 'The bishop moves any distance diagonally, staying on its starting colour forever.' },
      { p: 'R', x: 3, y: 4, ko: '룩은 가로와 세로로 원하는 만큼 움직입니다.', en: 'The rook moves any distance along ranks and files.' },
      { p: 'Q', x: 3, y: 4, ko: '퀸은 룩과 비숍을 합친 움직임 — 가로·세로·대각선 모두 원하는 만큼 움직이는 가장 강한 기물입니다.', en: 'The queen combines rook and bishop moves — the strongest piece.' },
      { p: 'K', x: 3, y: 4, ko: '킹은 어느 방향으로든 한 칸만 움직입니다. 킹이 잡히면 지는 것이 아니라, 갈 곳이 없을 때 체크메이트로 집니다.', en: 'The king moves one square in any direction. The game is lost by checkmate, not by the king being taken.' },
      { p: 'P', x: 3, y: 6, ko: '폰은 앞으로 한 칸, 처음 자리에서는 두 칸까지 갈 수 있고, 잡을 때만 대각선 앞으로 움직입니다.', en: 'A pawn moves one square forward (two from its start) and captures diagonally forward.' }
    ];
    return [
      {
        title: { ko: '기물의 움직임 보기', en: 'How the pieces move' },
        steps: pieceSteps.map(function (ps) {
          return {
            text: { ko: ps.ko, en: ps.en },
            setup: function () {
              var st = emptyChess();
              st.b[ps.y * 8 + ps.x] = ps.p;
              st.b[0] = 'k';
              if (ps.p !== 'K') st.b[7 * 8 + 7] = 'K';
              return st;
            },
            view: { piece: { x: ps.x, y: ps.y } },
            goal: null
          };
        })
      },
      {
        title: { ko: '한 수 체크메이트', en: 'Checkmate in one' },
        steps: [
          {
            text: { ko: '백 룩을 눌러 선택한 뒤, 흑 킹의 줄 끝까지 올려 체크메이트를 만들어 보세요. 흑 킹은 자기 폰들에 막혀 피할 곳이 없습니다.', en: 'Tap the white rook, then send it to the far end of the black king\'s rank. The king is trapped behind its own pawns.' },
            setup: function () {
              var st = emptyChess();
              st.b[7 * 8 + 0] = 'R'; st.b[7 * 8 + 6] = 'K';
              st.b[0 * 8 + 6] = 'k';
              st.b[1 * 8 + 5] = 'p'; st.b[1 * 8 + 6] = 'p'; st.b[1 * 8 + 7] = 'p';
              return st;
            },
            goal: { fx: 0, fy: 7, tx: 0, ty: 0 },
            doneText: { ko: '체크메이트입니다. 룩이 8번째 줄 전체를 지키고, 흑 킹은 폰에 막혀 도망칠 수 없습니다.', en: 'Checkmate. The rook covers the whole back rank and the king cannot escape through its own pawns.' }
          }
        ]
      }
    ];
  }

  function janggiLessons() {
    function emptyJanggi() {
      var b = []; for (var i = 0; i < 90; i++) b.push(null);
      return { b: b, turn: 'C', moves: [], result: null, setupC: { L: 'N', R: 'E' }, setupH: { L: 'N', R: 'E' } };
    }
    function kings(st) {
      st.b[1 * 9 + 4] = { t: 'K', c: 'H' };
      st.b[8 * 9 + 4] = { t: 'K', c: 'C' };
      return st;
    }
    return [
      {
        title: { ko: '마·상의 움직임과 멱', en: 'Horse, elephant and the block (myeok)' },
        steps: [
          {
            text: { ko: '마는 한 칸 직진한 뒤 대각선으로 한 칸 더 갑니다. 가운데 마를 눌러 갈 수 있는 칸을 확인해 보세요.', en: 'The horse moves one point straight, then one point diagonally outward. Tap the horse in the centre to see its moves.' },
            setup: function () {
              var st = kings(emptyJanggi());
              st.b[4 * 9 + 4] = { t: 'N', c: 'C' };
              return st;
            },
            view: { piece: { x: 4, y: 4 } }, goal: null
          },
          {
            text: { ko: '마의 첫걸음 자리에 졸이 서 있으면 그 방향으로는 갈 수 없습니다. 이를 멱이 걸렸다고 합니다. 눌러서 막힌 쪽과 열린 쪽을 비교해 보세요.', en: 'If a pawn stands on the horse\'s first step, that whole direction is blocked — this is called myeok. Tap the horse and compare the blocked and open sides.' },
            setup: function () {
              var st = kings(emptyJanggi());
              st.b[4 * 9 + 4] = { t: 'N', c: 'C' };
              st.b[4 * 9 + 5] = { t: 'S', c: 'H' };
              return st;
            },
            view: { piece: { x: 4, y: 4 } }, goal: null
          },
          {
            text: { ko: '상은 마보다 한 칸 더 — 직진 한 칸, 대각선 두 칸을 갑니다. 멱이 두 곳에서 걸릴 수 있어 마보다 더 자주 막힙니다.', en: 'The elephant goes one step further than the horse: one straight, then two diagonally. It can be blocked at two points, so it is stopped more often.' },
            setup: function () {
              var st = kings(emptyJanggi());
              st.b[4 * 9 + 4] = { t: 'E', c: 'C' };
              return st;
            },
            view: { piece: { x: 4, y: 4 } }, goal: null
          }
        ]
      },
      {
        title: { ko: '차와 포로 잡기', en: 'Capturing with chariot and cannon' },
        steps: [
          {
            text: { ko: '차는 가로·세로로 원하는 만큼 가며 상대 기물을 잡습니다. 차를 눌러 선택한 뒤, 같은 줄에 있는 한의 졸을 잡아 보세요.', en: 'The chariot moves any distance along ranks and files and captures. Select the chariot, then capture the Han pawn on its file.' },
            setup: function () {
              var st = kings(emptyJanggi());
              st.b[6 * 9 + 4] = { t: 'R', c: 'C' };
              st.b[3 * 9 + 4] = { t: 'S', c: 'H' };
              return st;
            },
            goal: { fx: 4, fy: 6, tx: 4, ty: 3 },
            doneText: { ko: '졸을 잡았습니다. 차는 장기에서 가장 강한 기물(13점)입니다.', en: 'Captured. The chariot is the strongest piece in Janggi (13 points).' }
          },
          {
            text: { ko: '포는 반드시 다른 기물 하나를 넘어야만 움직이고 잡을 수 있습니다. 가운데 병이 다리가 됩니다. 포를 눌러 선택한 뒤, 병 너머의 한의 마를 잡아 보세요.', en: 'The cannon can only move or capture by jumping exactly one piece. The pawn in the middle is its screen. Select the cannon and capture the Han horse beyond the pawn.' },
            setup: function () {
              var st = kings(emptyJanggi());
              st.b[7 * 9 + 4] = { t: 'P', c: 'C' };
              st.b[5 * 9 + 4] = { t: 'S', c: 'C' };
              st.b[2 * 9 + 4] = { t: 'N', c: 'H' };
              return st;
            },
            goal: { fx: 4, fy: 7, tx: 4, ty: 2 },
            doneText: { ko: '포로 마를 잡았습니다. 포는 다리가 없으면 한 칸도 움직일 수 없다는 점이 차와 다릅니다.', en: 'The cannon took the horse. Unlike the chariot, a cannon cannot move at all without a screen to jump.' }
          }
        ]
      }
    ];
  }

  var LESSONS = { baduk: badukLessons, omok: omokLessons, chess: chessLessons, janggi: janggiLessons };
  var ENG = { baduk: B, omok: O, chess: C, janggi: J };
  var CUR = { game: null, lessons: [], li: 0, si: 0, st: null, sel: null, done: false };

  function step() { return CUR.lessons[CUR.li].steps[CUR.si]; }

  function renderStep() {
    var ls = CUR.lessons[CUR.li], s = step();
    el('lessonTitle').textContent = tx(ls.title) + ' · ' + (CUR.si + 1) + '/' + ls.steps.length;
    el('lessonText').textContent = tx(s.text);
    el('learnStatus').textContent = '';
    CUR.st = s.setup();
    CUR.sel = s.view && s.view.piece ? { x: s.view.piece.x, y: s.view.piece.y } : null;
    CUR.done = !s.goal;
    drawBoard();
    el('btnLessonPrev').disabled = CUR.li === 0 && CUR.si === 0;
    el('btnLessonNext').textContent = (CUR.li === CUR.lessons.length - 1 && CUR.si === ls.steps.length - 1)
      ? (L() === 'en' ? 'Finish' : '마치기')
      : global.T('lessonNext');
  }
  function drawBoard() {
    var box = el('learnBoard'), s = step();
    if (CUR.game === 'baduk') {
      var atari = B.atariStones(CUR.st);
      drawGo(box, CUR.st, onTap, atari);
    } else if (CUR.game === 'omok') {
      drawOmok(box, CUR.st, onTap);
    } else if (CUR.game === 'chess') {
      drawChess(box, CUR.st, CUR.sel, CUR.sel ? targetsOf(CUR.st, C, CUR.sel.x, CUR.sel.y) : null, onTap);
    } else if (CUR.game === 'janggi') {
      drawJanggi(box, CUR.st, CUR.sel, CUR.sel ? targetsOf(CUR.st, J, CUR.sel.x, CUR.sel.y) : null, onTap);
    }
  }
  function succeed() {
    CUR.done = true;
    var s = step();
    el('learnStatus').textContent = s.doneText ? tx(s.doneText) : '✓';
    drawBoard();
    setTimeout(function () { next(); }, s.doneText ? 2600 : 900);
  }
  function onTap(x, y) {
    if (CUR.done && step().goal) return;
    var s = step(), E = ENG[CUR.game];
    if (CUR.game === 'baduk' || CUR.game === 'omok') {
      if (!s.goal) return;
      if (s.goal(CUR.st, x, y)) {
        var ns = s.apply(CUR.st, x, y);
        if (ns) { CUR.st = ns; succeed(); }
      } else {
        el('learnStatus').textContent = L() === 'en' ? 'Not that point — try another.' : '그 자리가 아닙니다. 다른 곳을 눌러 보세요.';
      }
      return;
    }
    // 체스·장기: 선택 → 이동
    var st = CUR.st;
    var pc = CUR.game === 'chess' ? st.b[y * 8 + x] : st.b[y * 9 + x];
    if (CUR.sel) {
      var mv = null;
      E.legalMoves(st).forEach(function (m) {
        if (m.fx === CUR.sel.x && m.fy === CUR.sel.y && m.tx === x && m.ty === y) mv = m;
      });
      if (mv) {
        if (s.goal) {
          if (mv.fx === s.goal.fx && mv.fy === s.goal.fy && mv.tx === s.goal.tx && mv.ty === s.goal.ty) {
            var ns2 = E.apply(st, mv);
            if (ns2) { CUR.st = ns2; CUR.sel = null; succeed(); }
          } else {
            el('learnStatus').textContent = L() === 'en' ? 'A legal move, but not the one this lesson asks for.' : '둘 수 있는 수이지만, 이 과정에서 찾는 수는 아닙니다.';
            CUR.sel = null; drawBoard();
          }
        }
        return;
      }
    }
    var mine = pc && (CUR.game === 'chess' ? (st.turn === 'w') === (pc === pc.toUpperCase()) : pc.c === st.turn);
    CUR.sel = mine ? { x: x, y: y } : null;
    drawBoard();
  }
  function next() {
    var ls = CUR.lessons[CUR.li];
    if (CUR.si < ls.steps.length - 1) { CUR.si++; renderStep(); return; }
    if (CUR.li < CUR.lessons.length - 1) { CUR.li++; CUR.si = 0; markChips(); renderStep(); return; }
    el('learnStatus').textContent = global.T('learnDone');
  }
  function prev() {
    if (CUR.si > 0) { CUR.si--; renderStep(); return; }
    if (CUR.li > 0) { CUR.li--; CUR.si = CUR.lessons[CUR.li].steps.length - 1; markChips(); renderStep(); }
  }
  function markChips() {
    var chips = el('lessonChips').children;
    for (var i = 0; i < chips.length; i++) chips[i].classList.toggle('on', i === CUR.li);
  }

  var Learn = {
    open: function (game) {
      CUR.game = game;
      CUR.lessons = LESSONS[game]();
      CUR.li = 0; CUR.si = 0;
      el('learnTitle').textContent = global.T('learn') + ' — ' + global.T({ omok: 'gOmok', janggi: 'gJanggi', chess: 'gChess', baduk: 'gBaduk' }[game]);
      el('learnSub').textContent = L() === 'en' ? 'Short hands-on lessons on a small board. Tap the pieces and points as each step asks.' : '작은 판에서 직접 눌러 보며 익히는 짧은 입문 과정입니다. 과정마다 안내하는 대로 눌러 보세요.';
      var chips = el('lessonChips');
      chips.innerHTML = '';
      CUR.lessons.forEach(function (ls, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'chipbtn' + (i === 0 ? ' on' : '');
        b.textContent = tx(ls.title);
        b.addEventListener('click', function () { CUR.li = i; CUR.si = 0; markChips(); renderStep(); });
        chips.appendChild(b);
      });
      renderStep();
      global.show('viewLearn');
    }
  };
  el('btnLessonNext').addEventListener('click', function () { if (CUR.done) next(); else el('learnStatus').textContent = L() === 'en' ? 'Try the move this step asks for first.' : '먼저 이 과정에서 안내하는 수를 두어 보세요.'; });
  el('btnLessonPrev').addEventListener('click', prev);
  global.NexusLearn = Learn;
})(window);
