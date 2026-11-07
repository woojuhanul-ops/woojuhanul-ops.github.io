/* ============================================================
   NEXUS 디자인 시스템 — 공통 부품 JS
   nexus-press.js · v1.0 · 2026-11-03
   근거: 건강앱_격차분석_디자인융합안_2026-11-03.md §5-2 · §6-2

   제공하는 것:
   1) 눌림 햅틱 — Android Chrome 에서만 navigator.vibrate(10).
      iOS Safari 에는 애초에 vibrate API 가 없어 자연 강등되고,
      데스크톱·기타 브라우저에서도 울리지 않는다. 기기 차이를 속이지 않는다.
   2) NexusFX.complete(el) — 완료의 빛 1회 + 반복 억제 규칙.
   3) NexusFX.setProgress / setAttention — 상태 아이콘 문법.
   의존성 없음. <script src="nexus-press.js" defer> 한 줄로 쓴다.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1) 눌림 햅틱 (Android Chrome 한정) ---------- */
  var ua = navigator.userAgent || "";
  var isAndroidChrome =
    /Android/.test(ua) && /Chrome\/[.0-9]*/.test(ua) && !/EdgA|OPR|SamsungBrowser/.test(ua) &&
    typeof navigator.vibrate === "function";

  function buzz() {
    if (!isAndroidChrome) return;
    try { navigator.vibrate(10); } catch (e) { /* 권한·정책으로 막히면 조용히 넘어간다 */ }
  }

  /* .nx-press 요소의 pointerdown 을 한 곳에서 받는다 (동적 생성 요소도 포함) */
  document.addEventListener("pointerdown", function (ev) {
    var t = ev.target && ev.target.closest ? ev.target.closest(".nx-press") : null;
    if (t) buzz();
  }, { passive: true });

  /* ---------- 2) 완료의 빛 + 반복 억제 규칙 ---------- */
  /* 규칙 (보고서 §5-2 "반복 동작에서는 끈다"의 코드화):
     - 같은 요소에서 1.2초 안에 다시 완료가 오면 빛을 생략한다.
     - 2초 안에 서로 다른 완료가 3회를 넘으면 '연속 입력 중'으로 보고
       2초간 조용해진 뒤에야 다시 켠다. (단위 변환의 실시간 계산 같은 자리)
     - data-nx-glow="off" 인 요소는 무조건 끈다.
     - 실시간 계산(입력할 때마다 바뀌는 결과)에서는 complete() 를
       애초에 부르지 않는 것이 원칙 — 이 억제는 안전망이다. */
  var lastRun = new WeakMap();
  var burstTimes = [];
  var QUIET_MS = 1200, BURST_WINDOW = 2000, BURST_MAX = 3;

  function complete(el, opts) {
    if (!el || !el.classList) return false;
    if (el.getAttribute("data-nx-glow") === "off") return false;
    var now = performance.now();

    burstTimes = burstTimes.filter(function (t) { return now - t < BURST_WINDOW; });
    if (burstTimes.length >= BURST_MAX) return false;              /* 연속 입력 중 — 끈다 */
    var last = lastRun.get(el) || -Infinity;
    if (now - last < QUIET_MS && !(opts && opts.force)) return false;

    burstTimes.push(now);
    lastRun.set(el, now);

    el.classList.remove("nx-glow-run");
    void el.offsetWidth;                                            /* 재시작 보장 */
    el.classList.add("nx-glow-run");
    var dur = 700;
    setTimeout(function () { el.classList.remove("nx-glow-run"); }, dur);
    return true;
  }

  /* ---------- 3) 상태 아이콘 ---------- */
  function setProgress(el, ratio) {
    if (!el) return;
    var r = Math.max(0, Math.min(1, Number(ratio) || 0));
    el.style.setProperty("--nx-prog", String(r));
    el.setAttribute("data-has-record", r > 0 ? "1" : "0");
  }
  function setAttention(el, on) {
    if (!el) return;
    el.setAttribute("data-attention", on ? "1" : "0");
  }

  /* ---------- 4) 성능 자기 점검 (심사관·데모 공용) ---------- */
  /* pointerdown 부터 다음 프레임에 실제로 그려지기까지의 시간을 잰다.
     기준: 탭 → 시각 반응 100ms 이내 (보고서 §5-2). */
  function measurePress(el) {
    return new Promise(function (resolve) {
      if (!el) { resolve(null); return; }
      var t0 = 0;
      function onDown() {
        t0 = performance.now();
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            el.removeEventListener("pointerdown", onDown);
            resolve(Math.round((performance.now() - t0) * 10) / 10);
          });
        });
      }
      el.addEventListener("pointerdown", onDown);
    });
  }

  window.NexusFX = {
    complete: complete,
    setProgress: setProgress,
    setAttention: setAttention,
    measurePress: measurePress,
    hapticsEnabled: isAndroidChrome,
    version: "1.0.0"
  };
})();
