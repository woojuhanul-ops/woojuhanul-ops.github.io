/* 넥서스 대국실 — 앱 컨트롤러 */
'use strict';
var I18N = {
  ko: {
    brandSub: '넥서스 대국실', testBadge: '테스트 중', homeBtn: '홈으로', title: '넥서스 대국실',
    subtitle: '오목, 장기, 체스와 바둑을 두는 곳입니다. AI와도, 한 기기에서 둘이도, 떨어진 곳의 상대와도 둘 수 있습니다.',
    gOmok: '오목', gOmokD: '다섯 개를 먼저 잇는 대국입니다', gJanggi: '장기', gJanggiD: '차포마상의 정식 규칙 대국입니다',
    gChess: '체스', gChessD: '캐슬링과 앙파상까지 갖춘 정식 규칙입니다', gBaduk: '바둑', gBadukD: '19줄 정식판과 9줄 입문판을 두는 곳입니다', records: '대국 기록', recordsD: '이 기기에 저장된 기보를 다시 봅니다',
    sizeLabel: '판 크기', hcLabel: '접바둑 (흑이 미리 두는 돌, 백이 먼저 둡니다)', hcEven: '호선',
    clockLabel: '초읽기 (한 수마다 주어지는 시간)', clockNone: '없음',
    confirmLabel: '착수 확인 (한 번 누르면 미리 보고, 다시 누르면 둡니다)', confirmOff: '끄기', confirmOn: '켜기',
    learn: '배우기', lessonPrev: '이전 과정', lessonNext: '다음 과정',
    scoreTitle: '계가', deadHint: '죽은 돌이라고 생각되는 돌을 누르면 표시가 바뀝니다. 양쪽이 합의한 표시로 집을 셉니다.',
    scoreGo: '이대로 계가 확정', scoreResume: '아직 끝나지 않았습니다 — 대국 계속',
    sgfOut: '기보 SGF로 저장', sgfIn: '바둑 SGF 불러오기',
    capNow: '잡은 돌', scoreLine: '흑 {b} : 백 {w}', scoreDiff: '{d}집 차이',
    scoreProposeSent: '상대에게 계가 동의를 요청했습니다.', scoreAsk: '상대가 아래 표시로 계가하자고 합니다. 동의할까요?',
    scoreDeclined: '상대가 계가 표시에 동의하지 않았습니다. 표시를 고쳐 다시 확정하거나 대국을 계속해 주세요.',
    resumeAsk: '상대가 대국을 계속하자고 합니다. 계가를 멈추고 이어서 둘까요?',
    reasonTime: '시간패입니다', reasonScoreGo: '계가로 판정했습니다',
    clockLeft: '초읽기', aiBadukWait: '워크스테이션의 바둑 엔진에 연결하고 있습니다…',
    aiBadukOff: '바둑 AI 상대는 준비 중입니다. 워크스테이션 엔진이 켜지면 대국할 수 있습니다.',
    aiBadukNote: '워크스테이션에서 도는 KataGo 엔진 상대입니다. 강함은 탐색량으로 조절하며, 입문자는 접바둑을 함께 쓰면 좋습니다.',
    passWord: '패스', learnDone: '과정을 마쳤습니다. 잘하셨습니다.',
    howTitle: '대국실 안내',
    howBody: 'AI 대국은 상대의 강함을 세 단계로 고를 수 있습니다. 즐기는 정도의 강함입니다. 원격 대국은 방을 만든 사람이 알려 주는 여섯 자리 코드로 상대가 들어옵니다. 방 코드가 곧 열쇠이니, 대국할 상대에게만 알려 주시기 바랍니다. 기보는 이 기기에만 저장되고, 밖으로 나가지 않습니다.',
    back: '← 돌아가기', recordsSub: '이 기기에 저장된 기보입니다.', recClear: '기록 모두 지우기', recNone: '아직 저장된 기록이 없습니다.',
    setupTitle: '대국 준비', modeLabel: '상대', modeAi: 'AI와 대국', modeLocal: '둘이 대국 (한 기기)', modeRemote: '원격 대국',
    levelLabel: 'AI 강함 (즐기는 정도입니다)', lv1: '쉬움', lv2: '보통', lv3: '어려움', sideLabel: '내 기물',
    jgSetupLabel: '내 진영 마·상 배치 (바깥쪽 기물 기준)', jgL: '왼쪽 날개', jgR: '오른쪽 날개', jgN: '마가 바깥', jgE: '상가 바깥',
    jgOppLabel: '상대(한) 진영 마·상 배치', remoteLabel: '원격 대국', createRoom: '방 만들기', joinRoom: '코드로 들어가기',
    codePh: '방 코드 6자리', joinGo: '들어가기',
    inviteHint: '상대에게 이 코드를 알려 주세요. 상대가 대국실에서 같은 게임의 원격 대국으로 들어오면 대국이 시작됩니다.',
    copyLink: '초대 링크 복사', shareLink: '공유하기', start: '대국 시작', rulesTitle: '규칙', foot: '대국실의 기보는 이 기기에만 저장됩니다',
    sideBlack: '흑 (선공)', sideWhite: '백', sideW: '백 (선공)', sideB: '흑', sideCho: '초 (선공)', sideHan: '한',
    undo: '무르기', restart: '재대국', resign: '기권', pass: '한 수 쉼',
    turnBlack: '흑의 차례입니다', turnWhite: '백의 차례입니다', turnCho: '초의 차례입니다', turnHan: '한의 차례입니다',
    turnMine: '내 차례입니다', turnOpp: '상대 차례입니다', turnAi: 'AI가 생각하고 있습니다',
    check: '장군!', winBlack: '흑이 이겼습니다', winWhite: '백이 이겼습니다', winCho: '초가 이겼습니다', winHan: '한이 이겼습니다',
    draw: '무승부입니다', iWin: '이겼습니다', iLose: '상대가 이겼습니다',
    reasonFive: '5목을 완성했습니다', reasonMate: '외통입니다', reasonCheckmate: '체크메이트입니다', reasonStale: '스테일메이트 무승부입니다',
    reasonFifty: '50수 규칙 무승부입니다', reasonThree: '삼중 반복 무승부입니다', reasonMaterial: '기물 부족 무승부입니다',
    reasonFull: '판이 가득 차 무승부입니다', reasonResign: '기권으로 끝났습니다', reasonBigjang: '빅장이 되어 점수로 판정했습니다', reasonScore: '점수 판정입니다',
    waitPeer: '상대를 기다리고 있습니다. 코드나 링크로 상대를 초대해 주세요.', connecting: '중계 서버에 연결하고 있습니다…',
    connFail: '중계 서버에 연결하지 못했습니다. 잠시 뒤 다시 시도해 주세요.', peerIn: '상대가 들어왔습니다. 대국을 시작합니다.',
    peerOut: '상대가 나갔습니다. 같은 코드로 다시 들어오면 이어서 둘 수 있습니다.', roomErr: '방을 찾을 수 없습니다. 코드를 확인해 주세요.',
    roomFull: '이미 두 명이 대국 중인 방입니다.', copied: '초대 링크를 복사했습니다.',
    undoAsk: '상대가 무르기를 요청했습니다. 마지막 한 수를 되돌릴까요?', restartAsk: '상대가 재대국을 요청했습니다. 새로 시작할까요?',
    undoSent: '무르기를 요청했습니다.', restartSent: '재대국을 요청했습니다.', declined: '상대가 요청을 거절했습니다.',
    scoreNow: '현재 점수', hanBonus: '한 후공 보너스 1.5 포함', replay: '기보 재생', recEnd: '기록을 지웠습니다.',
    modes: { ai: 'AI 대국', local: '2인 대국', remote: '원격 대국' }, promoQ: '퀸', promoR: '룩', promoB: '비숍', promoN: '나이트', promoTitle: '승격할 기물',
    rulesOmok: '15×15 판에 번갈아 돌을 둡니다. 가로, 세로, 대각선 중 한 방향으로 정확히 다섯 개가 이어지면 이깁니다. 여섯 개 이상이 이어진 경우(과목)는 승리로 인정하지 않습니다. 흑이 먼저 둡니다.',
    rulesJanggi: '한국 장기의 정식 규칙입니다. 포는 기물 하나를 넘어야 움직이고, 포를 넘거나 포를 잡을 수 없습니다. 마와 상은 멱이 막히면 나가지 못합니다. 빅장이 되면 그 자리에서 남은 기물 점수로 판정합니다 — 차 13, 포 7, 마 5, 상 3, 사 3, 병·졸 2점이며, 한은 후공 보너스 1.5점을 더합니다. 300수를 넘겨도 점수로 판정합니다. 둘 곳이 없고 외통이 아니면 한 수 쉴 수 있습니다.',
    rulesChess: '체스의 정식 규칙입니다. 캐슬링, 앙파상, 프로모션을 모두 적용합니다. 체크메이트와 스테일메이트, 50수 규칙, 삼중 반복, 기물 부족 무승부를 판정합니다.',
    rulesBaduk: '한국 룰 바둑입니다. 덤은 6.5집입니다. 돌은 교차점에 두며, 활로가 모두 막힌 돌은 잡힙니다. 같은 판형이 다시 되는 수(패)는 둘 수 없습니다. 양쪽이 잇달아 패스하면 계가로 넘어갑니다 — 죽은 돌을 양쪽이 합의해 표시하면, 집과 잡은 돌을 세어 승패를 정합니다. 19줄 정식판 외에 13줄, 9줄 판도 고를 수 있습니다.'
  },
  en: {
    brandSub: 'Nexus Board Games', testBadge: 'In testing', homeBtn: 'Home', title: 'Nexus Board Games',
    subtitle: 'A place to play Omok, Janggi, Chess and Go — against the AI, two players on one device, or remotely with someone far away.',
    gOmok: 'Omok', gOmokD: 'Connect five stones first', gJanggi: 'Janggi', gJanggiD: 'Korean chess with full official rules',
    gChess: 'Chess', gChessD: 'Full rules including castling and en passant', gBaduk: 'Go (Baduk)', gBadukD: 'Full 19×19 board and a 9×9 board for beginners', records: 'Game records', recordsD: 'Review game records stored on this device',
    sizeLabel: 'Board size', hcLabel: 'Handicap (Black places stones first, White moves first)', hcEven: 'Even game',
    clockLabel: 'Byoyomi (time per move)', clockNone: 'None',
    confirmLabel: 'Confirm move (tap once to preview, again to play)', confirmOff: 'Off', confirmOn: 'On',
    learn: 'Learn', lessonPrev: 'Previous lesson', lessonNext: 'Next lesson',
    scoreTitle: 'Scoring', deadHint: 'Tap stones you believe are dead to mark them. Both players must agree on the marks before counting.',
    scoreGo: 'Count with these marks', scoreResume: 'Not finished yet — keep playing',
    sgfOut: 'Save record as SGF', sgfIn: 'Load a Go SGF file',
    capNow: 'Captured', scoreLine: 'Black {b} : White {w}', scoreDiff: '{d} points',
    scoreProposeSent: 'Asked your opponent to agree to this count.',
    scoreAsk: 'Your opponent proposes counting with the marks shown. Do you agree?',
    scoreDeclined: 'Your opponent did not agree to the marks. Adjust them and count again, or keep playing.',
    resumeAsk: 'Your opponent wants to keep playing. Stop scoring and continue the game?',
    reasonTime: 'Loss on time', reasonScoreGo: 'Decided by counting',
    clockLeft: 'Byoyomi', aiBadukWait: 'Connecting to the workstation Go engine…',
    aiBadukOff: 'The Go AI opponent is in preparation. It becomes available when the workstation engine is running.',
    aiBadukNote: 'This opponent is the KataGo engine running on the workstation. Strength is set by search amount; beginners may want a handicap as well.',
    passWord: 'Pass', learnDone: 'Lesson complete. Well done.',
    howTitle: 'About this room',
    howBody: 'Against the AI you can pick one of three strengths — a level made for enjoyment. For a remote game, your partner enters with the six-letter room code. The code is the key, so share it only with your opponent. Game records stay on this device and never leave it.',
    back: '← Back', recordsSub: 'Game records stored on this device.', recClear: 'Delete all records', recNone: 'No saved records yet.',
    setupTitle: 'Game setup', modeLabel: 'Opponent', modeAi: 'Play the AI', modeLocal: 'Two players (one device)', modeRemote: 'Remote game',
    levelLabel: 'AI strength (made for enjoyment)', lv1: 'Easy', lv2: 'Normal', lv3: 'Hard', sideLabel: 'Your pieces',
    jgSetupLabel: 'Your horse/elephant setup (outer piece)', jgL: 'Left wing', jgR: 'Right wing', jgN: 'Horse outside', jgE: 'Elephant outside',
    jgOppLabel: 'Opponent (Han) horse/elephant setup', remoteLabel: 'Remote game', createRoom: 'Create a room', joinRoom: 'Enter with a code',
    codePh: '6-letter room code', joinGo: 'Enter',
    inviteHint: 'Tell your partner this code. The game begins when they enter this game in remote mode on their device.',
    copyLink: 'Copy invite link', shareLink: 'Share', start: 'Start game', rulesTitle: 'Rules', foot: 'Game records are stored only on this device',
    sideBlack: 'Black (first)', sideWhite: 'White', sideW: 'White (first)', sideB: 'Black', sideCho: 'Cho (first)', sideHan: 'Han',
    undo: 'Undo', restart: 'Rematch', resign: 'Resign', pass: 'Pass',
    turnBlack: "Black's turn", turnWhite: "White's turn", turnCho: "Cho's turn", turnHan: "Han's turn",
    turnMine: 'Your turn', turnOpp: "Opponent's turn", turnAi: 'The AI is thinking',
    check: 'Check!', winBlack: 'Black wins', winWhite: 'White wins', winCho: 'Cho wins', winHan: 'Han wins',
    draw: 'The game is a draw', iWin: 'You win', iLose: 'Your opponent wins',
    reasonFive: 'Five in a row completed', reasonMate: 'Checkmate (oetong)', reasonCheckmate: 'Checkmate', reasonStale: 'Draw by stalemate',
    reasonFifty: 'Draw by the fifty-move rule', reasonThree: 'Draw by threefold repetition', reasonMaterial: 'Draw by insufficient material',
    reasonFull: 'The board is full — a draw', reasonResign: 'Ended by resignation', reasonBigjang: 'Bikjang — decided by score', reasonScore: 'Decided by score',
    waitPeer: 'Waiting for your opponent. Invite them with the code or the link.', connecting: 'Connecting to the relay server…',
    connFail: 'Could not reach the relay server. Please try again in a moment.', peerIn: 'Your opponent has arrived. The game begins.',
    peerOut: 'Your opponent left. They can rejoin with the same code to continue.', roomErr: 'Room not found. Please check the code.',
    roomFull: 'This room already has two players.', copied: 'Invite link copied.',
    undoAsk: 'Your opponent asks to undo. Take back the last move?', restartAsk: 'Your opponent asks for a rematch. Start a new game?',
    undoSent: 'Undo requested.', restartSent: 'Rematch requested.', declined: 'Your opponent declined.',
    scoreNow: 'Score now', hanBonus: 'Han includes the 1.5 second-move bonus', replay: 'Replay', recEnd: 'Records deleted.',
    modes: { ai: 'vs AI', local: '2 players', remote: 'Remote' }, promoQ: 'Queen', promoR: 'Rook', promoB: 'Bishop', promoN: 'Knight', promoTitle: 'Promote to',
    rulesOmok: 'Players alternate placing stones on a 15×15 board. Exactly five in a row — across, down or diagonally — wins. Six or more in a row (an overline) does not count as a win. Black moves first.',
    rulesJanggi: 'Full Korean janggi rules. A cannon must jump exactly one piece to move; it can neither jump nor capture another cannon. Horses and elephants are blocked when their stepping square is occupied. If the two kings come to face each other (bikjang), the game is decided at once by remaining material — chariot 13, cannon 7, horse 5, elephant 3, guard 3, soldier 2 — with Han adding a 1.5 second-move bonus. Passing 300 moves also goes to score. If you have no legal move and are not in check, you may pass.',
    rulesChess: 'Full chess rules, including castling, en passant and promotion. Checkmate, stalemate, the fifty-move rule, threefold repetition and insufficient material are all adjudicated.',
    rulesBaduk: 'Go under Korean rules, with 6.5 points komi. Stones are played on intersections; a group with no liberties is captured. Repeating an earlier board position (ko) is not allowed. When both players pass in a row, the game moves to counting — both players agree on the dead stones, then territory and captures are counted. Besides the full 19×19 board, 13×13 and 9×9 boards are available.'
  }
};
var LANG = localStorage.getItem('nxbg_lang') || 'ko';
function T(k) { return (I18N[LANG] && I18N[LANG][k]) || I18N.ko[k] || k; }
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = T(el.getAttribute('data-i18n')); });
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.placeholder = T(el.getAttribute('data-i18n-ph')); });
  document.getElementById('langBtn').textContent = LANG === 'ko' ? 'EN' : '한국어';
  document.documentElement.lang = LANG === 'ko' ? 'ko' : 'en';
}
document.getElementById('langBtn').addEventListener('click', function () {
  LANG = LANG === 'ko' ? 'en' : 'ko';
  localStorage.setItem('nxbg_lang', LANG);
  applyI18n(); refreshSetupTexts(); if (S.st) render();
});

var ENG = { omok: window.NexusOmok, janggi: window.NexusJanggi, chess: window.NexusChess, baduk: window.NexusBaduk };
var GTITLE = { omok: 'gOmok', janggi: 'gJanggi', chess: 'gChess', baduk: 'gBaduk' };
var GRULES = { omok: 'rulesOmok', janggi: 'rulesJanggi', chess: 'rulesChess', baduk: 'rulesBaduk' };
function firstSide() { return S.game === 'omok' || S.game === 'baduk' ? 1 : S.game === 'chess' ? 'w' : 'C'; }
var S = {
  game: 'omok', mode: 'ai', level: 2, mySide: 1,
  jgMine: { L: 'N', R: 'E' }, jgOpp: { L: 'N', R: 'E' },
  st: null, sel: null, over: false, resultInfo: null, saved: false,
  remote: null, replay: null, aiBusy: false,
  badukSize: 19, badukHc: 0, badukClock: 'none', badukConfirm: false,
  pendingPt: null, clock: null, clockTimer: null, badukAiOk: null, scoreProposed: false
};
function $(id) { return document.getElementById(id); }
function show(view) {
  ['viewHome', 'viewRecords', 'viewGame', 'viewLearn'].forEach(function (v) { $(v).classList.toggle('hidden', v !== view); });
  window.scrollTo(0, 0);
}
document.querySelectorAll('[data-back]').forEach(function (b) { b.addEventListener('click', function () { leaveGame(); show('viewHome'); }); });
document.querySelectorAll('[data-game]').forEach(function (b) { b.addEventListener('click', function () { openGame(b.getAttribute('data-game')); }); });
$('recordsCard').addEventListener('click', function () { renderRecords(); show('viewRecords'); });

/* ---------- 준비 패널 ---------- */
function sideOptions() {
  if (S.game === 'omok' || S.game === 'baduk') return [{ v: 1, t: T('sideBlack') }, { v: 2, t: T('sideWhite') }];
  if (S.game === 'chess') return [{ v: 'w', t: T('sideW') }, { v: 'b', t: T('sideB') }];
  return [{ v: 'C', t: T('sideCho') }, { v: 'H', t: T('sideHan') }];
}
function defaultSide() { return firstSide(); }
function openGame(game, roomCode) {
  S.game = game; S.st = null; S.over = false; S.resultInfo = null; S.replay = null; S.remote = null;
  S.mySide = defaultSide(); S.pendingPt = null; stopClock();
  $('gameTitle').textContent = T(GTITLE[game]);
  $('rulesBody').textContent = T(GRULES[game]);
  $('setupPanel').classList.remove('hidden'); $('playArea').classList.add('hidden');
  $('scorePanel').classList.add('hidden');
  setMode('ai'); buildSideChips(); refreshSetupTexts(); refreshGameFields();
  if (game === 'baduk') BadukAi.probe();
  if (roomCode) {
    setMode('remote');
    $('joinField').classList.remove('hidden');
    $('roomCodeInput').value = roomCode;
  }
  show('viewGame');
}
function refreshGameFields() {
  var bk = S.game === 'baduk';
  $('badukSizeField').classList.toggle('hidden', !bk);
  $('badukHandicapField').classList.toggle('hidden', !bk || S.mode === 'remote');
  $('badukClockField').classList.toggle('hidden', !bk);
  $('badukConfirmField').classList.toggle('hidden', !bk);
  $('sgfRow').classList.toggle('hidden', !bk);
  var lf = $('levelField').querySelector('label');
  if (lf) lf.textContent = bk ? T('levelLabel') + ' — ' + T('aiBadukNote') : T('levelLabel');
}
function buildSideChips() {
  var box = $('sideChips'); box.innerHTML = '';
  sideOptions().forEach(function (o) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'chipbtn' + (String(S.mySide) === String(o.v) ? ' on' : '');
    b.textContent = o.t;
    b.addEventListener('click', function () { S.mySide = o.v; buildSideChips(); });
    box.appendChild(b);
  });
}
function refreshSetupTexts() {
  // 언어 전환 시 동적으로 바뀐 라벨들
  var jf = $('janggiSetupField');
  if (S.game === 'janggi') { jf.classList.remove('hidden'); } else { jf.classList.add('hidden'); }
}
function setMode(mode) {
  S.mode = mode;
  document.querySelectorAll('#modeChips .chipbtn').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-mode') === mode); });
  $('levelField').classList.toggle('hidden', mode !== 'ai');
  $('sideField').classList.toggle('hidden', mode === 'remote');
  $('remoteField').classList.toggle('hidden', mode !== 'remote');
  $('btnStart').classList.toggle('hidden', mode === 'remote');
  $('janggiSetupField').classList.toggle('hidden', S.game !== 'janggi');
  refreshGameFields();
  setStatus('setupStatus', '');
}
document.querySelectorAll('#modeChips .chipbtn').forEach(function (b) { b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); }); });
document.querySelectorAll('#levelChips .chipbtn').forEach(function (b) {
  b.addEventListener('click', function () {
    S.level = +b.getAttribute('data-level');
    document.querySelectorAll('#levelChips .chipbtn').forEach(function (x) { x.classList.toggle('on', x === b); });
  });
});
document.querySelectorAll('#jgLChips .chipbtn').forEach(function (b) {
  b.addEventListener('click', function () { S.jgMine.L = b.getAttribute('data-jgl'); document.querySelectorAll('#jgLChips .chipbtn').forEach(function (x) { x.classList.toggle('on', x === b); }); });
});
document.querySelectorAll('#jgRChips .chipbtn').forEach(function (b) {
  b.addEventListener('click', function () { S.jgMine.R = b.getAttribute('data-jgr'); document.querySelectorAll('#jgRChips .chipbtn').forEach(function (x) { x.classList.toggle('on', x === b); }); });
});
function chipGroup(sel, fn) {
  document.querySelectorAll(sel + ' .chipbtn').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll(sel + ' .chipbtn').forEach(function (x) { x.classList.toggle('on', x === b); });
      fn(b);
    });
  });
}
chipGroup('#bsizeChips', function (b) { S.badukSize = +b.getAttribute('data-bsize'); });
chipGroup('#hcChips', function (b) { S.badukHc = +b.getAttribute('data-hc'); });
chipGroup('#clockChips', function (b) { S.badukClock = b.getAttribute('data-clock'); });
chipGroup('#confirmChips', function (b) { S.badukConfirm = b.getAttribute('data-confirm') === '1'; });
function syncBadukChips() {
  function mark(sel, attr, val) {
    document.querySelectorAll(sel + ' .chipbtn').forEach(function (x) { x.classList.toggle('on', String(x.getAttribute(attr)) === String(val)); });
  }
  mark('#bsizeChips', 'data-bsize', S.badukSize);
  mark('#hcChips', 'data-hc', S.badukHc);
  mark('#clockChips', 'data-clock', S.badukClock);
  mark('#confirmChips', 'data-confirm', S.badukConfirm ? '1' : '0');
}
function setStatus(id, msg, warn) {
  var el = $(id); el.textContent = msg || ''; el.classList.toggle('warn', !!warn);
}

/* ---------- 대국 진행 ---------- */
function engine() { return ENG[S.game]; }
function secondSide() { return S.game === 'omok' || S.game === 'baduk' ? 2 : S.game === 'chess' ? 'b' : 'H'; }
function isFlip() {
  if (S.replay) return false;
  if (S.mode === 'local') return false;
  return String(S.mySide) === String(secondSide());
}
function boardN() { return S.game === 'baduk' ? (S.st ? S.st.size : S.badukSize) : S.game === 'omok' ? 15 : S.game === 'chess' ? 8 : 9; }
function DX(x) { if (!isFlip()) return x; return boardN() - 1 - x; }
function DY(y) { if (!isFlip()) return y; return (S.game === 'janggi' ? 9 : boardN() - 1) - y; }
function setupFor(side) {
  // 장기 진영별 마·상 배치
  if (S.mode === 'remote' && S.remote) {
    var myRoleSide = S.remote.role === 'guest' ? 'H' : 'C';
    if (side === myRoleSide) return S.jgMine;
    var peerCfg = S.remote.setups[S.remote.role === 'guest' ? 'host' : 'guest'];
    return peerCfg || { L: 'N', R: 'E' };
  }
  if (side === S.mySide) return S.jgMine;
  return { L: 'N', R: 'E' };
}
function buildState(moves) {
  var E = engine();
  if (S.game === 'janggi') return E.fromMoves(moves || [], setupFor('C'), setupFor('H'));
  if (S.game === 'baduk') return E.fromMoves(moves || [], badukSizeOf(), { handicap: badukHcOf(), komi: 6.5 });
  return E.fromMoves(moves || []);
}
function badukSizeOf() {
  if (S.replay && S.replay.rec.size) return S.replay.rec.size;
  if (S.mode === 'remote' && S.remote && S.remote.badukCfg) return S.remote.badukCfg.size;
  return S.badukSize;
}
function badukHcOf() {
  if (S.replay && S.replay.rec.hc) return S.replay.rec.hc;
  if (S.mode === 'remote' && S.remote && S.remote.badukCfg) return S.remote.badukCfg.hc;
  return S.badukHc;
}
function startGame() {
  if (S.game === 'baduk' && S.mode === 'ai' && S.badukAiOk === false) {
    setStatus('setupStatus', T('aiBadukOff'), true);
    return;
  }
  S.st = buildState([]);
  S.sel = null; S.over = false; S.resultInfo = null; S.saved = false; S.aiBusy = false; S.pendingPt = null;
  $('setupPanel').classList.add('hidden'); $('playArea').classList.remove('hidden');
  $('scorePanel').classList.add('hidden');
  initClock();
  render();
  maybeAi();
}
function currentTurnSide() { return S.st ? S.st.turn : null; }
function canControl(side) {
  if (S.over || S.replay) return false;
  if (S.mode === 'local') return true;
  if (S.mode === 'ai') return String(side) === String(S.mySide) && !S.aiBusy;
  return String(side) === String(S.mySide) && S.remote && S.remote.started;
}
function doMove(mv, external) {
  var ns = engine().apply(S.st, mv);
  if (!ns) return false;
  S.st = ns; S.sel = null;
  if (S.mode === 'remote' && !external && window.Net) Net.send({ t: 'move', mv: mv });
  afterChange();
  return true;
}
function afterChange() {
  S.pendingPt = null;
  if (S.st.result) { stopClock(); finish(S.st.result); render(); return; }
  resetTurnClock();
  render();
  if (S.game === 'baduk' && S.st.phase === 'score' && S.mode === 'ai' && !S.over) {
    var key = S.st.moves.length;
    if (S._deadKey !== key) {
      S._deadKey = key;
      var stRef = S.st;
      BadukAi.deadStones(stRef, function (dead) {
        if (dead && S.st === stRef && S.st.phase === 'score') {
          var nd = {};
          dead.forEach(function (k) { nd[k] = true; });
          S.st.dead = nd;
          render();
        }
      });
    }
  }
  maybeAi();
}
function maybeAi() {
  if (S.mode !== 'ai' || S.over || !S.st || S.st.result) return;
  if (String(S.st.turn) === String(S.mySide)) return;
  if (S.game === 'baduk') {
    if (S.st.phase !== 'play') return;
    S.aiBusy = true; render();
    BadukAi.requestMove(S.st, S.level, function (mv) {
      S.aiBusy = false;
      if (!S.st || S.over || S.mode !== 'ai') { render(); return; }
      if (String(S.st.turn) === String(S.mySide)) { render(); return; }
      if (mv && mv.resign) { finish({ winner: S.mySide, reason: 'resign' }); render(); return; }
      if (mv) doMove(mv, true);
      else { setStatus('playStatus', T('aiBadukOff'), true); render(); }
    });
    return;
  }
  S.aiBusy = true; render();
  setTimeout(function () {
    S.aiBusy = false;
    if (!S.st || S.over) return;
    if (String(S.st.turn) === String(S.mySide)) { render(); return; } // 그 사이 무르기 등으로 차례가 바뀐 경우
    var mv = engine().aiMove(S.st, S.level);
    if (mv) doMove(mv, true);
  }, 350);
}
function reasonText(r) {
  if (S.game === 'baduk' && r === 'score') return T('reasonScoreGo');
  var map = { five: 'reasonFive', checkmate: S.game === 'janggi' ? 'reasonMate' : 'reasonCheckmate', stalemate: 'reasonStale', fifty: 'reasonFifty', threefold: 'reasonThree', material: 'reasonMaterial', full: 'reasonFull', resign: 'reasonResign', bigjang: 'reasonBigjang', scorelimit: 'reasonScore', time: 'reasonTime' };
  return T(map[r] || 'reasonScore');
}
function winnerText(w) {
  if (S.game === 'omok' || S.game === 'baduk') return T(w === 1 ? 'winBlack' : 'winWhite');
  if (S.game === 'chess') return T(w === 'w' ? 'winWhite' : 'winBlack');
  return T(w === 'C' ? 'winCho' : 'winHan');
}
function finish(result) {
  S.over = true; S.resultInfo = result;
  if (!S.saved) { S.saved = true; saveRecord(result); }
}
function resultMessage() {
  var r = S.resultInfo; if (!r) return '';
  if (r.winner === 0) return T('draw') + ' — ' + reasonText(r.reason);
  var base = winnerText(r.winner);
  if (S.mode !== 'local') base = String(r.winner) === String(S.mySide) ? T('iWin') : T('iLose');
  var extra = '';
  if ((r.reason === 'bigjang' || r.reason === 'scorelimit') && r.scoreC !== undefined) extra = ' (' + T('scoreNow') + ' 초 ' + r.scoreC + ' : 한 ' + r.scoreH + ')';
  if (S.game === 'baduk' && r.reason === 'score' && r.scoreB !== undefined) {
    extra = ' (' + T('scoreLine').replace('{b}', r.scoreB).replace('{w}', r.scoreW) + ', ' + T('scoreDiff').replace('{d}', Math.abs(r.diff)) + ')';
  }
  return base + ' — ' + reasonText(r.reason) + extra;
}
/* ---------- 기록 ---------- */
function loadRecords() { try { return JSON.parse(localStorage.getItem('nxbg_records') || '[]'); } catch (e) { return []; } }
function saveRecord(result) {
  var recs = loadRecords();
  recs.unshift({
    id: Date.now(), game: S.game, mode: S.mode, level: S.level, mySide: S.mySide,
    date: new Date().toISOString(), winner: result.winner, reason: result.reason,
    moves: S.st.moves, setupC: S.game === 'janggi' ? setupFor('C') : null, setupH: S.game === 'janggi' ? setupFor('H') : null,
    size: S.game === 'baduk' ? S.st.size : null, hc: S.game === 'baduk' ? S.st.handicap : null
  });
  localStorage.setItem('nxbg_records', JSON.stringify(recs.slice(0, 60)));
}
function renderRecords() {
  var recs = loadRecords(), box = $('recList'); box.innerHTML = '';
  if (!recs.length) { box.innerHTML = '<p class="hint">' + T('recNone') + '</p>'; return; }
  recs.forEach(function (rec) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'recItem';
    var gname = T(GTITLE[rec.game]);
    var wtxt = rec.winner === 0 ? T('draw') : winnerText(rec.winner);
    b.innerHTML = '<b></b><span></span>';
    b.querySelector('b').textContent = gname + ' · ' + T('modes')[rec.mode] + ' · ' + rec.moves.length + (LANG === 'ko' ? '수' : ' moves');
    b.querySelector('span').textContent = new Date(rec.date).toLocaleString() + ' · ' + wtxt + ' · ' + reasonText(rec.reason);
    b.addEventListener('click', function () { openReplay(rec); });
    box.appendChild(b);
  });
}
$('recClear').addEventListener('click', function () {
  localStorage.removeItem('nxbg_records'); renderRecords(); setStatus('setupStatus', '');
});
function openReplay(rec) {
  S.game = rec.game; S.mode = rec.mode; S.mySide = rec.mySide;
  S.replay = { rec: rec, idx: rec.moves.length };
  S.over = true; S.resultInfo = { winner: rec.winner, reason: rec.reason };
  $('gameTitle').textContent = T(GTITLE[rec.game]) + ' · ' + T('replay');
  $('setupPanel').classList.add('hidden'); $('playArea').classList.remove('hidden');
  $('scorePanel').classList.add('hidden'); stopClock();
  show('viewGame'); renderReplay();
}
function renderReplay() {
  var rec = S.replay.rec;
  var part = rec.moves.slice(0, S.replay.idx);
  if (S.game === 'janggi') S.st = window.NexusJanggi.fromMoves(part, rec.setupC || { L: 'N', R: 'E' }, rec.setupH || { L: 'N', R: 'E' });
  else if (S.game === 'baduk') S.st = window.NexusBaduk.fromMoves(part, rec.size || 19, { handicap: rec.hc || 0, komi: 6.5 });
  else S.st = engine().fromMoves(part);
  render();
  setStatus('playStatus', T('replay') + ' — ' + S.replay.idx + ' / ' + rec.moves.length);
}
/* ---------- 렌더링 공통 ---------- */
function legalTargets() {
  if (!S.sel || !S.st) return [];
  var E = engine();
  if (S.game === 'omok') return [];
  return E.legalMoves(S.st).filter(function (m) { return m.fx === S.sel.x && m.fy === S.sel.y; });
}
function render() {
  if (!S.st) return;
  if (S.game === 'omok') renderOmok();
  else if (S.game === 'janggi') renderJanggi();
  else if (S.game === 'baduk') renderBaduk();
  else renderChess();
  renderInfo();
}
function renderInfo() {
  var st = S.st, turn = st.turn;
  var dot = $('turnDot');
  var colors = { omok: { 1: '#111', 2: '#FAFAF9' }, baduk: { 1: '#111', 2: '#FAFAF9' }, chess: { w: '#FAFAF9', b: '#111' }, janggi: { C: '#22C55E', H: '#EF4444' } };
  dot.style.background = colors[S.game][turn]; dot.style.border = '1px solid rgba(255,255,255,.4)';
  var tt = $('turnText');
  if (S.over && S.resultInfo) tt.textContent = resultMessage();
  else if (S.mode === 'ai' && String(turn) !== String(S.mySide)) tt.textContent = T('turnAi');
  else if (S.mode === 'remote') tt.textContent = String(turn) === String(S.mySide) ? T('turnMine') : T('turnOpp');
  else tt.textContent = T(S.game === 'omok' || S.game === 'baduk' ? (turn === 1 ? 'turnBlack' : 'turnWhite') : S.game === 'chess' ? (turn === 'w' ? 'turnWhite' : 'turnBlack') : (turn === 'C' ? 'turnCho' : 'turnHan'));
  var chk = '';
  if (!S.over && (S.game === 'chess' || S.game === 'janggi') && engine().inCheck(st, turn)) chk = T('check');
  $('checkText').textContent = chk;
  if (S.game === 'janggi') {
    var sc = window.NexusJanggi.scoreOf(st);
    $('scoreBar').textContent = T('scoreNow') + ' — 초 ' + sc.C + ' : 한 ' + sc.H + ' (' + T('hanBonus') + ')';
  } else if (S.game === 'baduk') {
    $('scoreBar').textContent = T('capNow') + ' — ● ' + st.captures[1] + ' : ○ ' + st.captures[2];
  } else $('scoreBar').textContent = '';
  var ol = $('movesList'); ol.innerHTML = '';
  st.moves.forEach(function (mv, i) {
    var li = document.createElement('li'); li.textContent = notation(mv, i); ol.appendChild(li);
  });
  ol.parentElement.scrollTop = ol.parentElement.scrollHeight;
  $('btnUndo').disabled = !st.moves.length || S.replay !== null;
  var passMv = (S.game === 'janggi') ? engine().legalMoves(st).some(function (m) { return m.pass; })
    : (S.game === 'baduk' && st.phase === 'play');
  $('btnPass').classList.toggle('hidden', !(passMv && canControl(turn) && !S.over));
  syncScorePanel();
  if (S.over && S.resultInfo && !S.replay) setStatus('playStatus', resultMessage());
  else if (!S.replay) setStatus('playStatus', S.mode === 'remote' && S.remote && !S.remote.started ? T('waitPeer') : '');
}
function notation(mv, i) {
  if (S.game === 'baduk') {
    if (mv.pass) return (mv.c === 1 ? '● ' : '○ ') + T('passWord');
    return (mv.c === 1 ? '● ' : '○ ') + window.NexusBaduk.coord(mv.x, mv.y, S.st ? S.st.size : 19);
  }
  if (S.game === 'omok') return (mv.c === 1 ? '● ' : '○ ') + String.fromCharCode(65 + mv.x) + (mv.y + 1);
  if (S.game === 'chess') {
    function sq(x, y) { return 'abcdefgh'[x] + (8 - y); }
    return sq(mv.fx, mv.fy) + ' → ' + sq(mv.tx, mv.ty) + (mv.promo ? '=' + mv.promo.toUpperCase() : '');
  }
  if (mv.pass) return LANG === 'ko' ? '한 수 쉼' : 'Pass';
  var names = { K: '궁', R: '차', P: '포', N: '마', E: '상', A: '사', S: '기타' };
  return '(' + (mv.fx + 1) + ',' + (10 - mv.fy) + ') → (' + (mv.tx + 1) + ',' + (10 - mv.ty) + ')';
}
/* ---------- 오목 렌더 ---------- */
function renderOmok() {
  var box = $('boardBox'); box.innerHTML = '';
  var wrap = document.createElement('div'); wrap.className = 'omokWrap';
  var grid = document.createElement('div'); grid.className = 'omokGrid';
  var st = S.st, winCells = {};
  if (st.result && st.result.reason === 'five' && st.last) {
    var dirs = [[1, 0], [0, 1], [1, 1], [1, -1]], c = st.b[st.last.y * 15 + st.last.x];
    dirs.forEach(function (d) {
      var cells = [{ x: st.last.x, y: st.last.y }];
      [1, -1].forEach(function (s) {
        var x = st.last.x, y = st.last.y;
        for (;;) { x += d[0] * s; y += d[1] * s; if (x < 0 || x > 14 || y < 0 || y > 14 || st.b[y * 15 + x] !== c) break; cells.push({ x: x, y: y }); }
      });
      if (cells.length === 5) cells.forEach(function (cc) { winCells[cc.y * 15 + cc.x] = 1; });
    });
  }
  for (var dy = 0; dy < 15; dy++) for (var dx = 0; dx < 15; dx++) {
    var lx = isFlip() ? 14 - dx : dx, ly = isFlip() ? 14 - dy : dy;
    var cell = document.createElement('button');
    cell.type = 'button'; cell.className = 'ocell';
    var v = st.b[ly * 15 + lx];
    var stone = document.createElement('span');
    stone.className = 'st' + (v === 1 ? ' b' : v === 2 ? ' w' : '');
    cell.appendChild(stone);
    if (st.last && st.last.x === lx && st.last.y === ly) cell.classList.add('last');
    if (winCells[ly * 15 + lx]) cell.classList.add('win');
    (function (x, y) {
      cell.addEventListener('click', function () {
        if (!canControl(S.st.turn)) return;
        if (S.st.b[y * 15 + x] === 0) doMove({ x: x, y: y });
      });
    })(lx, ly);
    grid.appendChild(cell);
  }
  wrap.appendChild(grid); box.appendChild(wrap);
}
/* ---------- 장기 렌더 ---------- */
var JG_GLYPH = { K: '宮', R: '車', P: '包', N: '馬', E: '象', A: '士' };
function renderJanggi() {
  var box = $('boardBox'); box.innerHTML = '';
  var field = document.createElement('div'); field.className = 'jfield';
  var lines = '<svg class="lines" viewBox="0 0 800 900" preserveAspectRatio="none">';
  for (var i = 0; i <= 8; i++) lines += '<line x1="' + i * 100 + '" y1="0" x2="' + i * 100 + '" y2="900" stroke="rgba(90,55,10,.6)" stroke-width="2"/>';
  for (var j = 0; j <= 9; j++) lines += '<line x1="0" y1="' + j * 100 + '" x2="800" y2="' + j * 100 + '" stroke="rgba(90,55,10,.6)" stroke-width="2"/>';
  lines += '<path d="M300 0 L400 100 L500 200 M500 0 L400 100 L300 200 M300 700 L400 800 L500 900 M500 700 L400 800 L300 900" stroke="rgba(90,55,10,.6)" stroke-width="2" fill="none"/>';
  lines += '</svg>';
  field.innerHTML = lines;
  var st = S.st, targets = legalTargets();
  for (var y = 0; y < 10; y++) for (var x = 0; x < 9; x++) {
    var pt = document.createElement('button');
    pt.type = 'button'; pt.className = 'jpt';
    pt.style.left = (DX(x) / 8 * 100) + '%'; pt.style.top = (DY(y) / 9 * 100) + '%';
    var p = st.b[y * 9 + x];
    if (p) {
      var pc = document.createElement('span');
      pc.className = 'pc ' + (p.c === 'C' ? 'cho' : 'han');
      var g1 = document.createElement('span'); g1.className = 'han1';
      g1.textContent = p.t === 'S' ? (p.c === 'C' ? '兵' : '卒') : JG_GLYPH[p.t];
      pc.appendChild(g1); pt.appendChild(pc);
      if (S.sel && S.sel.x === x && S.sel.y === y) pt.classList.add('sel');
      var last = st.moves[st.moves.length - 1];
      if (last && !last.pass && last.tx === x && last.ty === y) pt.classList.add('last');
    }
    var tg = null;
    for (var k = 0; k < targets.length; k++) if (targets[k].tx === x && targets[k].ty === y) tg = targets[k];
    if (tg) {
      var mark = document.createElement('span');
      mark.className = p ? 'ring' : 'dot';
      pt.appendChild(mark);
    }
    (function (cx, cy) {
      pt.addEventListener('click', function () { boardClick(cx, cy); });
    })(x, y);
    field.appendChild(pt);
  }
  box.appendChild(field);
}
/* ---------- 바둑 렌더·계가·시계·AI ---------- */
function renderBaduk() {
  var st = S.st, E = window.NexusBaduk, N = st.size;
  var last = st.moves.length ? st.moves[st.moves.length - 1] : null;
  var atari = (st.phase === 'play' && !st.result) ? E.atariStones(st) : {};
  var sc = null;
  if (st.phase === 'score') sc = E.score(st, deadObj());
  var box = $('boardBox'); box.innerHTML = '';
  var field = document.createElement('div'); field.className = 'gofield';
  var step = 100 / N;
  var svg = '<svg class="lines" viewBox="0 0 100 100" preserveAspectRatio="none">';
  for (var i = 0; i < N; i++) {
    var pos = (i + 0.5) * step;
    svg += '<line x1="' + pos + '" y1="' + (step / 2) + '" x2="' + pos + '" y2="' + (100 - step / 2) + '" stroke="rgba(40,22,4,.85)" stroke-width="0.35"/>';
    svg += '<line x1="' + (step / 2) + '" y1="' + pos + '" x2="' + (100 - step / 2) + '" y2="' + pos + '" stroke="rgba(40,22,4,.85)" stroke-width="0.35"/>';
  }
  E.handicapPoints(N, N === 9 ? 5 : 9).forEach(function (h) {
    svg += '<circle cx="' + ((h.x + 0.5) * step) + '" cy="' + ((h.y + 0.5) * step) + '" r="0.8" fill="rgba(40,22,4,.85)"/>';
  });
  svg += '</svg>';
  field.innerHTML = svg;
  for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
    (function (x, y) {
      var dx = DX(x), dy = DY(y);
      var ii = y * N + x;
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'gpt';
      b.style.left = ((dx + 0.5) * step) + '%';
      b.style.top = ((dy + 0.5) * step) + '%';
      b.style.width = step + '%';
      var v = st.b[ii];
      var dead = st.phase === 'score' && st.dead && st.dead[ii];
      var html = '';
      if (sc && sc.terrMap && !v && sc.terrMap[ii]) html += '<span class="terr ' + (sc.terrMap[ii] === 1 ? 'tb' : 'tw') + '"></span>';
      if (v) html += '<span class="gst ' + (v === 1 ? 'b' : 'w') + (dead ? ' dead' : '') + '"></span>';
      if (dead) html += '<span class="deadx">✕</span>';
      if (st.last && st.last.x === x && st.last.y === y && st.phase === 'play') b.classList.add('last');
      if (atari[ii] && st.phase === 'play') b.classList.add('atari');
      if (S.pendingPt && S.pendingPt.x === x && S.pendingPt.y === y) html += '<span class="gst ' + (st.turn === 1 ? 'ghostB' : 'ghostW') + '"></span>';
      b.innerHTML = html;
      b.setAttribute('aria-label', E.coord(x, y, N));
      b.addEventListener('click', function () { badukClick(x, y); });
      field.appendChild(b);
    })(x, y);
  }
  box.appendChild(field);
}
function deadObj() { return (S.st && S.st.dead) || {}; }
function deadList() {
  return Object.keys(deadObj()).filter(function (k) { return deadObj()[k]; }).map(Number);
}
function badukClick(x, y) {
  var st = S.st;
  if (S.replay || S.over || !st) return;
  if (st.phase === 'score') {
    var ii = y * st.size + x;
    if (!st.b[ii]) return;
    if (S.mode === 'remote' && S.scoreProposed) return;
    var nd = Object.assign({}, st.dead || {});
    if (nd[ii]) delete nd[ii]; else nd[ii] = 1;
    st.dead = nd;
    render();
    return;
  }
  if (!canControl(st.turn)) return;
  if (st.b[y * st.size + x]) return;
  if (!window.NexusBaduk.apply(st, { x: x, y: y })) return;
  if (S.badukConfirm) {
    if (!(S.pendingPt && S.pendingPt.x === x && S.pendingPt.y === y)) { S.pendingPt = { x: x, y: y }; render(); return; }
  }
  doMove({ x: x, y: y }, false);
}
function syncScorePanel() {
  var inScore = S.game === 'baduk' && S.st && S.st.phase === 'score' && !S.over && !S.replay;
  $('scorePanel').classList.toggle('hidden', !inScore);
  if (!inScore) return;
  var sc = window.NexusBaduk.score(S.st, deadObj());
  $('scoreText').textContent = T('scoreLine').replace('{b}', sc.scoreB).replace('{w}', sc.scoreW) + ' — ' +
    (sc.diff > 0 ? T('winBlack') : sc.diff < 0 ? T('winWhite') : T('draw')) + ' ' + T('scoreDiff').replace('{d}', Math.abs(sc.diff));
  $('btnScoreGo').disabled = S.mode === 'remote' && S.scoreProposed;
}
function finalizeScore(sc) {
  var res = { winner: sc.winner, reason: 'score', scoreB: sc.scoreB, scoreW: sc.scoreW, diff: sc.diff };
  S.st.result = res;
  finish(res); stopClock(); render();
}
$('btnScoreGo').addEventListener('click', function () {
  if (!S.st || S.st.phase !== 'score') return;
  var sc = window.NexusBaduk.score(S.st, deadObj());
  if (S.mode === 'remote') {
    S.scoreProposed = true;
    Net.send({ t: 'score_propose', dead: deadList() });
    setStatus('playStatus', T('scoreProposeSent'));
    render();
  } else {
    finalizeScore(sc);
  }
});
$('btnScoreResume').addEventListener('click', function () {
  if (!S.st || S.st.phase !== 'score') return;
  if (S.mode === 'remote') {
    Net.send({ t: 'resume_req' });
    setStatus('playStatus', T('sendLabel') + '…');
  } else {
    var ns = window.NexusBaduk.resumePlay(S.st);
    if (ns) { S.st = ns; S.scoreProposed = false; render(); }
  }
});
/* 초읽기 시계 */
function clockSpec() {
  if (S.game !== 'baduk') return null;
  var c = (S.mode === 'remote' && S.remote && S.remote.badukCfg) ? S.remote.badukCfg.clock : S.badukClock;
  if (!c || c === 'none') return null;
  var m = /^(\d+)x(\d+)$/.exec(c);
  return m ? { per: +m[1], periods: +m[2] } : null;
}
function initClock() {
  stopClock();
  S.clock = null;
  var sp = clockSpec();
  if (!sp || !S.st) { $('clockBar').textContent = ''; return; }
  S.clock = { per: sp.per, periods: sp.periods, left: { 1: sp.per, 2: sp.per }, used: { 1: 0, 2: 0 }, turn: S.st.turn };
  S.clockTimer = setInterval(tickClock, 250);
  renderClockBar();
}
function resetTurnClock() {
  if (!S.clock || !S.st) return;
  var prev = S.clock.turn, now = S.st.turn;
  if (String(prev) !== String(now)) {
    S.clock.left[prev] = S.clock.per;
    S.clock.turn = now;
  }
}
function stopClock() { if (S.clockTimer) clearInterval(S.clockTimer); S.clockTimer = null; }
function renderClockBar() {
  if (!S.clock) { $('clockBar').textContent = ''; return; }
  function fmt(side) {
    var t = Math.max(0, Math.ceil(S.clock.left[side]));
    var p = S.clock.periods - S.clock.used[side];
    return (side === 1 ? '●' : '○') + ' ' + t + 's · ' + T('clockLeft') + ' ' + p;
  }
  $('clockBar').textContent = fmt(1) + '  |  ' + fmt(2);
}
function tickClock() {
  if (!S.clock || !S.st || S.over || S.replay) return;
  if (S.mode === 'ai' && S.aiBusy) return;
  if (S.st.phase !== 'play') return;
  var turn = S.st.turn;
  var canTime = S.mode === 'local' || String(turn) === String(S.mySide);
  if (!canTime) return;
  S.clock.left[turn] -= 0.25;
  if (S.clock.left[turn] <= 0) {
    S.clock.used[turn]++;
    if (S.clock.used[turn] >= S.clock.periods) {
      var winner = turn === 1 ? 2 : 1;
      stopClock();
      if (S.mode === 'remote') Net.send({ t: 'timeout' });
      finish({ winner: winner, reason: 'time' }); render();
      return;
    }
    S.clock.left[turn] = S.clock.per;
  }
  renderClockBar();
}
/* KataGo 브리지 (워크스테이션) */
var BadukAi = {
  ws: null, pending: null,
  url: function () { return 'wss://ugaik-1.tail7a983b.ts.net/baduk-ai'; },
  probe: function () {
    S.badukAiOk = null;
    try {
      fetch('https://ugaik-1.tail7a983b.ts.net/baduk-ai/health').then(function (r) {
        S.badukAiOk = r.ok;
      }).catch(function () { S.badukAiOk = false; });
    } catch (e) { S.badukAiOk = false; }
  },
  connect: function (cb) {
    if (BadukAi.ws && BadukAi.ws.readyState === 1) { cb(true); return; }
    try {
      var ws = new WebSocket(BadukAi.url());
      var done = false;
      var to = setTimeout(function () { if (!done) { done = true; try { ws.close(); } catch (e) {} cb(false); } }, 15000);
      ws.onopen = function () { done = true; clearTimeout(to); BadukAi.ws = ws; cb(true); };
      ws.onerror = function () { if (!done) { done = true; clearTimeout(to); cb(false); } };
      ws.onmessage = function (ev) {
        var msg; try { msg = JSON.parse(ev.data); } catch (e) { return; }
        if (BadukAi.pending) { var p = BadukAi.pending; BadukAi.pending = null; p(msg); }
      };
      ws.onclose = function () { BadukAi.ws = null; };
    } catch (e) { cb(false); }
  },
  requestMove: function (st, level, cb) {
    setStatus('playStatus', T('aiBadukWait'));
    BadukAi.connect(function (ok) {
      if (!ok) { S.badukAiOk = false; cb(null); return; }
      S.badukAiOk = true;
      var moves = st.moves.map(function (m) { return m.pass ? { pass: true, c: m.c } : { x: m.x, y: m.y, c: m.c }; });
      BadukAi.pending = function (msg) {
        if (msg.t === 'error' || !msg.mv) { cb(null); return; }
        if (msg.mv.resign) { cb({ resign: true }); return; }
        if (msg.mv.pass) { cb({ pass: true }); return; }
        cb({ x: msg.mv.x, y: msg.mv.y });
      };
      try {
        BadukAi.ws.send(JSON.stringify({ t: 'genmove', size: st.size, komi: st.komi, handicap: st.handicap, moves: moves, level: level }));
      } catch (e) { BadukAi.pending = null; cb(null); }
    });
  },
  deadStones: function (st, cb) {
    BadukAi.connect(function (ok) {
      if (!ok) { cb(null); return; }
      var moves = st.moves.map(function (m) { return m.pass ? { pass: true, c: m.c } : { x: m.x, y: m.y, c: m.c }; });
      BadukAi.pending = function (msg) {
        if (msg.t !== 'dead' || !msg.dead) { cb(null); return; }
        cb(msg.dead.map(function (p) { return p[1] * st.size + p[0]; }));
      };
      try {
        BadukAi.ws.send(JSON.stringify({ t: 'dead', size: st.size, komi: st.komi, handicap: st.handicap, moves: moves }));
      } catch (e) { BadukAi.pending = null; cb(null); }
    });
  }
};

/* ---------- 체스 렌더 ---------- */
var CH_GLYPH = { w: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' }, b: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' } };
var promoPending = null;
function renderChess() {
  var box = $('boardBox'); box.innerHTML = '';
  var grid = document.createElement('div'); grid.className = 'cgrid';
  var st = S.st, targets = legalTargets();
  for (var dy = 0; dy < 8; dy++) for (var dx = 0; dx < 8; dx++) {
    var lx = isFlip() ? 7 - dx : dx, ly = isFlip() ? 7 - dy : dy;
    var sq = document.createElement('button');
    sq.type = 'button'; sq.className = 'csq ' + ((lx + ly) % 2 === 0 ? 'l' : 'd');
    var p = st.b[ly * 8 + lx];
    if (p) {
      var g = document.createElement('span');
      g.className = 'gly ' + p.c; g.textContent = CH_GLYPH[p.c][p.t];
      sq.appendChild(g);
    }
    if (S.sel && S.sel.x === lx && S.sel.y === ly) sq.classList.add('sel');
    var last = st.moves[st.moves.length - 1];
    if (last && ((last.tx === lx && last.ty === ly) || (last.fx === lx && last.fy === ly))) sq.classList.add('last');
    var tg = null;
    for (var k = 0; k < targets.length; k++) if (targets[k].tx === lx && targets[k].ty === ly) tg = targets[k];
    if (tg) { var mark = document.createElement('span'); mark.className = p ? 'ring' : 'dot'; sq.appendChild(mark); }
    (function (cx, cy) { sq.addEventListener('click', function () { boardClick(cx, cy); }); })(lx, ly);
    grid.appendChild(sq);
  }
  box.appendChild(grid);
  if (promoPending) {
    var panel = document.createElement('div');
    panel.className = 'chips'; panel.style.justifyContent = 'center'; panel.style.marginTop = '12px';
    var label = document.createElement('span'); label.className = 'hint'; label.textContent = T('promoTitle');
    panel.appendChild(label);
    [['q', 'promoQ'], ['r', 'promoR'], ['b', 'promoB'], ['n', 'promoN']].forEach(function (pr) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chipbtn'; b.textContent = CH_GLYPH[S.st.turn][pr[0]] + ' ' + T(pr[1]);
      b.addEventListener('click', function () {
        var mv = promoPending; promoPending = null;
        mv.promo = pr[0]; doMove(mv);
      });
      panel.appendChild(b);
    });
    box.appendChild(panel);
  }
}
/* ---------- 보드 입력 (장기/체스 공용) ---------- */
function boardClick(x, y) {
  var st = S.st; if (!st || S.over) return;
  var turn = st.turn;
  if (!canControl(turn)) return;
  var E = engine();
  if (S.sel) {
    var targets = E.legalMoves(st).filter(function (m) { return m.fx === S.sel.x && m.fy === S.sel.y && m.tx === x && m.ty === y; });
    if (targets.length) {
      if (S.game === 'chess' && targets[0].promo) { promoPending = targets[0]; render(); return; }
      doMove(targets[0]); return;
    }
  }
  var p = S.game === 'chess' ? st.b[y * 8 + x] : st.b[y * 9 + x];
  if (p && p.c === turn) { S.sel = { x: x, y: y }; }
  else S.sel = null;
  render();
}
/* ---------- 버튼들 ---------- */
$('btnStart').addEventListener('click', function () { startGame(); });
$('btnPass').addEventListener('click', function () { if (canControl(S.st.turn)) doMove({ pass: true }); });
$('btnUndo').addEventListener('click', function () {
  if (!S.st || !S.st.moves.length || S.replay) return;
  if (S.mode === 'remote') { Net.send({ t: 'undo_req' }); setStatus('playStatus', T('undoSent')); return; }
  var n = S.mode === 'ai' ? (S.st.moves.length >= 2 ? 2 : 1) : 1;
  var keep = S.st.moves.slice(0, S.st.moves.length - n);
  S.st = buildState(keep); S.over = false; S.resultInfo = null; S.sel = null;
  render();
});
$('btnResign').addEventListener('click', function () {
  if (!S.st || S.over) return;
  var loser = S.mode === 'local' ? S.st.turn : S.mySide;
  var winner = String(loser) === String(firstSide()) ? secondSide() : firstSide();
  if (S.mode === 'remote') Net.send({ t: 'resign' });
  finish({ winner: winner, reason: 'resign' });
  stopClock();
  render();
});
$('btnRestart').addEventListener('click', function () {
  if (S.mode === 'remote') { Net.send({ t: 'restart_req' }); setStatus('playStatus', T('restartSent')); return; }
  if (S.replay) return;
  startGame();
});
function leaveGame() {
  if (window.Net) Net.close();
  S.remote = null; S.st = null; S.replay = null;
}

/* ---------- 기보 재생 바 ---------- */
var replayBar = document.createElement('div');
replayBar.className = 'btnrow start hidden'; replayBar.id = 'replayBar';
var rpPrev = document.createElement('button'); rpPrev.type = 'button'; rpPrev.className = 'ghost'; rpPrev.textContent = '◀';
var rpNext = document.createElement('button'); rpNext.type = 'button'; rpNext.className = 'ghost'; rpNext.textContent = '▶';
var rpHome = document.createElement('button'); rpHome.type = 'button'; rpHome.className = 'ghost'; rpHome.textContent = '처음';
rpPrev.addEventListener('click', function () { if (S.replay && S.replay.idx > 0) { S.replay.idx--; renderReplay(); } });
rpNext.addEventListener('click', function () { if (S.replay && S.replay.idx < S.replay.rec.moves.length) { S.replay.idx++; renderReplay(); } });
rpHome.addEventListener('click', function () { if (S.replay) { S.replay.idx = 0; renderReplay(); } });
replayBar.appendChild(rpHome); replayBar.appendChild(rpPrev); replayBar.appendChild(rpNext);
$('boardBox').parentElement.insertBefore(replayBar, $('boardBox').nextSibling);
var _renderInfo = renderInfo;
renderInfo = function () {
  _renderInfo();
  var rp = !!S.replay;
  replayBar.classList.toggle('hidden', !rp);
  rpHome.textContent = LANG === 'ko' ? '처음' : 'Start';
  $('btnUndo').classList.toggle('hidden', rp);
  $('btnResign').classList.toggle('hidden', rp);
  $('btnRestart').classList.toggle('hidden', rp);
  if (rp) $('btnPass').classList.add('hidden');
};

/* ---------- 원격 대국 (WebSocket 중계) ---------- */
var Net = {
  ws: null,
  urls: ['wss://ugaik-1.tail7a983b.ts.net/board-relay', 'wss://ugaik-1.tail7a983b.ts.net:8443/'],
  connecting: false,
  wantReconnect: false,
  connect: function (onOpen) {
    if (this.ws && this.ws.readyState === 1) { onOpen && onOpen(); return; }
    if (this.connecting) return;
    this.connecting = true;
    var self = this, idx = 0;
    function attempt() {
      if (idx >= self.urls.length) {
        self.connecting = false;
        setStatus('setupStatus', T('connFail'), true);
        setStatus('playStatus', T('connFail'), true);
        return;
      }
      var url = self.urls[idx++];
      var ws;
      try { ws = new WebSocket(url); } catch (e) { attempt(); return; }
      var opened = false;
      var timer = setTimeout(function () { if (!opened) { try { ws.close(); } catch (e) {} attempt(); } }, 6000);
      ws.onopen = function () {
        opened = true; clearTimeout(timer);
        self.ws = ws; self.connecting = false; self.wantReconnect = true;
        onOpen && onOpen();
      };
      ws.onmessage = function (ev) { try { onNetMessage(JSON.parse(ev.data)); } catch (e) {} };
      ws.onclose = function () {
        if (self.ws === ws) self.ws = null;
        if (self.wantReconnect && S.remote && S.remote.code && !S.replay) {
          setStatus('playStatus', T('connecting'));
          setTimeout(function () {
            Net.connect(function () { Net.send({ t: 'join', code: S.remote.code }); });
          }, 3000);
        }
      };
      ws.onerror = function () { try { ws.close(); } catch (e) {} };
    }
    attempt();
  },
  send: function (obj) { if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(obj)); },
  close: function () { this.wantReconnect = false; if (this.ws) { try { this.ws.close(); } catch (e) {} this.ws = null; } }
};
window.Net = Net;
function hostSideOf(game) { return game === 'omok' || game === 'baduk' ? 1 : game === 'chess' ? 'w' : 'C'; }
function guestSideOf(game) { return game === 'omok' || game === 'baduk' ? 2 : game === 'chess' ? 'b' : 'H'; }
function badukCfgOf() { return { size: S.badukSize, hc: S.badukHc, clock: S.badukClock }; }
function inviteLink() { return location.origin + '/?g=' + S.game + '&room=' + (S.remote ? S.remote.code : ''); }
function showInvite() {
  $('inviteBox').classList.remove('hidden');
  $('roomCodeText').textContent = S.remote.code;
  var link = inviteLink();
  try {
    var qr = qrcode(0, 'M'); qr.addData(link); qr.make();
    $('qrCanvas').innerHTML = qr.createSvgTag({ cellSize: 4, margin: 10, scalable: true });
  } catch (e) { $('qrCanvas').innerHTML = ''; }
}
function maybeStartRemote() {
  var R = S.remote; if (!R || R.started) return;
  if (!R.peer) return;
  if (S.game === 'janggi' && !(R.setups.host && R.setups.guest)) return;
  if (S.game === 'baduk' && !R.badukCfg) return;
  R.started = true;
  S.st = buildState(R.moves || []);
  S.sel = null; S.over = false; S.resultInfo = null; S.saved = false; S.scoreProposed = false;
  $('setupPanel').classList.add('hidden'); $('playArea').classList.remove('hidden');
  $('scorePanel').classList.add('hidden');
  initClock();
  setStatus('playStatus', T('peerIn'));
  render();
}
function localPop() {
  if (!S.st || !S.st.moves.length) return;
  var keep = S.st.moves.slice(0, S.st.moves.length - 1);
  S.st = buildState(keep);
  S.over = false; S.resultInfo = null; S.sel = null; S.scoreProposed = false;
  render();
}
function freshRemoteStart() {
  if (S.remote) S.remote.moves = [];
  S.st = buildState([]);
  S.sel = null; S.over = false; S.resultInfo = null; S.saved = false; S.scoreProposed = false;
  $('setupPanel').classList.add('hidden'); $('playArea').classList.remove('hidden');
  $('scorePanel').classList.add('hidden');
  initClock();
  render();
}
function onNetMessage(msg) {
  var R = S.remote;
  if (msg.t === 'created') {
    S.remote = { code: msg.code, role: 'host', started: false, peer: false, setups: {}, moves: [], badukCfg: S.game === 'baduk' ? badukCfgOf() : null };
    S.remote.setups.host = S.game === 'baduk' ? badukCfgOf() : S.jgMine;
    S.mySide = hostSideOf(S.game);
    showInvite();
    setStatus('setupStatus', T('waitPeer'));
    if (S.game === 'janggi') Net.send({ t: 'setup', cfg: S.jgMine });
    if (S.game === 'baduk') Net.send({ t: 'setup', cfg: badukCfgOf() });
    return;
  }
  if (msg.t === 'joined') {
    if (msg.game && msg.game !== S.game) {
      S.game = msg.game;
      $('gameTitle').textContent = T(GTITLE[S.game]);
      $('rulesBody').textContent = T(GRULES[S.game]);
      refreshGameFields();
    }
    var isReconnect = !!R;
    S.remote = { code: S.remote ? S.remote.code : ($('roomCodeInput').value || '').toUpperCase(), role: msg.role, started: false, peer: false, setups: msg.setups || {}, moves: msg.moves || [], badukCfg: null };
    S.remote.setups[msg.role] = S.jgMine;
    if (S.game === 'baduk' && msg.setups && msg.setups.host) S.remote.badukCfg = msg.setups.host;
    S.mySide = msg.role === 'host' ? hostSideOf(S.game) : guestSideOf(S.game);
    if (S.game === 'janggi') Net.send({ t: 'setup', cfg: S.jgMine });
    if (msg.role === 'guest') S.remote.peer = true; // 게스트로 배정됐다는 것은 호스트가 있다는 뜻
    if (msg.role === 'host' && msg.moves && msg.moves.length) S.remote.peer = true;
    maybeStartRemote();
    if (!S.remote.started && !isReconnect) setStatus('setupStatus', T('waitPeer'));
    return;
  }
  if (!R) return;
  if (msg.t === 'peer_joined') {
    R.peer = true;
    if (S.game === 'janggi') Net.send({ t: 'setup', cfg: S.jgMine });
    if (S.game === 'baduk') Net.send({ t: 'setup', cfg: R.badukCfg || badukCfgOf() });
    maybeStartRemote();
  } else if (msg.t === 'setup') {
    R.setups[msg.role] = msg.cfg;
    if (S.game === 'baduk' && msg.role === 'host') R.badukCfg = msg.cfg;
    maybeStartRemote();
  } else if (msg.t === 'move') {
    if (S.st) doMove(msg.mv, true);
    if (R.moves) R.moves.push(msg.mv);
  } else if (msg.t === 'undo_req') {
    if (window.confirm(T('undoAsk'))) { Net.send({ t: 'undo_ok' }); localPop(); if (R.moves) R.moves.pop(); }
    else Net.send({ t: 'undo_no' });
  } else if (msg.t === 'undo_ok') {
    localPop(); if (R.moves) R.moves.pop();
  } else if (msg.t === 'undo_no') {
    setStatus('playStatus', T('declined'));
  } else if (msg.t === 'resign') {
    finish({ winner: S.mySide, reason: 'resign' }); stopClock(); render();
  } else if (msg.t === 'score_propose') {
    if (S.st && S.st.phase === 'score') {
      var nd = {};
      (msg.dead || []).forEach(function (k) { nd[k] = true; });
      S.st.dead = nd;
      render();
      if (window.confirm(T('scoreAsk'))) {
        Net.send({ t: 'score_accept' });
        finalizeScore(window.NexusBaduk.score(S.st, deadObj()));
      } else {
        Net.send({ t: 'score_decline' });
      }
    }
  } else if (msg.t === 'score_accept') {
    if (S.st && S.st.phase === 'score') finalizeScore(window.NexusBaduk.score(S.st, deadObj()));
  } else if (msg.t === 'score_decline') {
    S.scoreProposed = false;
    setStatus('playStatus', T('scoreDeclined'), true);
    render();
  } else if (msg.t === 'resume_req') {
    if (window.confirm(T('resumeAsk'))) {
      Net.send({ t: 'resume_ok' });
      var ns2 = S.st && window.NexusBaduk.resumePlay(S.st);
      if (ns2) { S.st = ns2; S.scoreProposed = false; render(); }
    }
  } else if (msg.t === 'resume_ok') {
    var ns3 = S.st && window.NexusBaduk.resumePlay(S.st);
    if (ns3) { S.st = ns3; S.scoreProposed = false; render(); }
  } else if (msg.t === 'timeout') {
    finish({ winner: S.mySide, reason: 'time' }); stopClock(); render();
  } else if (msg.t === 'restart_req') {
    if (window.confirm(T('restartAsk'))) { Net.send({ t: 'restart_ok' }); freshRemoteStart(); }
  } else if (msg.t === 'restart_ok') {
    freshRemoteStart();
  } else if (msg.t === 'peer_left') {
    R.peer = false;
    if (R.started) setStatus('playStatus', T('peerOut'), true);
  } else if (msg.t === 'state') {
    R.moves = msg.moves || [];
    if (S.st) { S.st = buildState(R.moves); render(); }
  } else if (msg.t === 'error') {
    setStatus('setupStatus', T(msg.msg === 'room_full' ? 'roomFull' : 'roomErr'), true);
  }
}
$('btnCreateRoom').addEventListener('click', function () {
  setStatus('setupStatus', T('connecting'));
  Net.connect(function () { Net.send({ t: 'create', game: S.game }); });
});
$('btnJoinMode').addEventListener('click', function () { $('joinField').classList.remove('hidden'); });
$('btnJoin').addEventListener('click', function () {
  var code = ($('roomCodeInput').value || '').trim().toUpperCase();
  if (code.length !== 6) { setStatus('setupStatus', T('roomErr'), true); return; }
  S.remote = { code: code, role: null, started: false, peer: false, setups: {}, moves: [] };
  setStatus('setupStatus', T('connecting'));
  Net.connect(function () { Net.send({ t: 'join', code: code }); });
});
$('btnCopyLink').addEventListener('click', function () {
  var link = inviteLink();
  if (navigator.clipboard) navigator.clipboard.writeText(link).then(function () { setStatus('setupStatus', T('copied')); });
});
$('btnShareLink').addEventListener('click', function () {
  var link = inviteLink();
  if (navigator.share) navigator.share({ title: document.title, url: link }).catch(function () {});
  else if (navigator.clipboard) navigator.clipboard.writeText(link).then(function () { setStatus('setupStatus', T('copied')); });
});

/* ---------- 배우기·SGF ---------- */
$('btnLearn').addEventListener('click', function () { if (window.NexusLearn) NexusLearn.open(S.game); });
$('btnLearnBack').addEventListener('click', function () { show('viewGame'); });
$('btnSgfOut').addEventListener('click', function () {
  if (S.game !== 'baduk') return;
  var st = S.st;
  if (S.replay && S.replay.rec) {
    st = window.NexusBaduk.fromMoves(S.replay.rec.moves, S.replay.rec.size || 19, { handicap: S.replay.rec.hc || 0, komi: 6.5 });
  }
  if (!st) return;
  var sgf = window.NexusBaduk.toSGF(st);
  var blob = new Blob([sgf], { type: 'application/x-go-sgf' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'nexus-baduk-' + new Date().toISOString().slice(0, 10) + '.sgf';
  document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
});
$('sgfFile').addEventListener('change', function () {
  var f = this.files && this.files[0];
  this.value = '';
  if (!f) return;
  f.text().then(function (txt) {
    var parsed = window.NexusBaduk.fromSGF(txt);
    if (!parsed) return;
    var rec = {
      id: Date.now(), game: 'baduk', mode: 'local', level: 2, mySide: 1,
      date: new Date().toISOString(), winner: null, reason: 'score',
      moves: parsed.allMoves || parsed.moves, size: parsed.size, hc: parsed.handicap, setupC: null, setupH: null
    };
    openReplay(rec);
  }).catch(function () {});
});

/* ---------- 부팅 ---------- */
applyI18n();
refreshSetupTexts();
(function () {
  var q = new URLSearchParams(location.search);
  var g = q.get('g'), room = q.get('room');
  if (g && ENG[g]) openGame(g, room ? room.toUpperCase() : null);
})();
