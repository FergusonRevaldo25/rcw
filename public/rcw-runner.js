/**
 * RCW Runner — embeddable "running mascot" banner ad.
 *
 * Usage (on ANY website, including this one):
 *   <script
 *     src="https://YOUR-DOMAIN/rcw-runner.js"
 *     data-href="https://YOUR-DOMAIN"
 *     async
 *   ></script>
 *
 * That's the only thing another site needs to add — this script builds
 * its own HTML/CSS and injects itself. No jQuery, no build step, no
 * dependency on the host page's framework (or lack of one).
 *
 * Optional data-attributes on the <script> tag:
 *   data-href       Where clicking the runner sends people. Defaults to
 *                    the value below if omitted.
 *   data-position    "bottom" (default) or "top" of the viewport.
 *   data-duration    Seconds per lap across the screen. Default 12.
 *   data-dismissible "false" to remove the little close (×) button.
 *                    Defaults to dismissible — best practice for anything
 *                    that runs on someone else's site.
 */
(function () {
  "use strict";

  // Find *this* <script> tag so we can read its own src (for building
  // absolute image URLs) and its data-* config, without needing a
  // global variable or a second script tag.
  var currentScript =
    document.currentScript ||
    (function () {
      var scripts = document.getElementsByTagName("script");
      return scripts[scripts.length - 1];
    })();

  var scriptUrl = new URL(currentScript.src, window.location.href);
  var origin = scriptUrl.origin;

  var config = {
    href: currentScript.getAttribute("data-href") || origin,
    position: currentScript.getAttribute("data-position") || "bottom",
    duration: parseFloat(currentScript.getAttribute("data-duration")) || 12,
    dismissible: currentScript.getAttribute("data-dismissible") !== "false",
  };

  // Don't stack multiple runners if this script somehow loads twice.
  if (window.__rcwRunnerLoaded) return;
  window.__rcwRunnerLoaded = true;

  var FRAME_1 = origin + "/runner-1.png";
  var FRAME_2 = origin + "/runner-2.png";
  var FRAME_SWAP_MS = 160; // how fast the legs alternate — tune to taste

  var storageKey = "rcw-runner-dismissed";
  if (config.dismissible && sessionStorage.getItem(storageKey) === "1") {
    return; // visitor already closed it this session — stay gone
  }

  var style = document.createElement("style");
  style.textContent =
    "@keyframes rcw-runner-lap {" +
    "  0%   { transform: translateX(-160px); }" +
    "  100% { transform: translateX(calc(100vw + 20px)); }" +
    "}" +
    ".rcw-runner-track {" +
    "  position: fixed;" +
    "  left: 0; right: 0;" +
    "  height: 0;" +
    "  z-index: 2147483000;" + // stays above almost anything without a fight
    "  pointer-events: none;" +
    (config.position === "top" ? "  top: 8px;" : "  bottom: 8px;") +
    "}" +
    ".rcw-runner-link {" +
    "  position: absolute;" +
    "  bottom: 0;" +
    "  display: block;" +
    "  pointer-events: auto;" +
    "  animation: rcw-runner-lap linear infinite;" +
    "  animation-duration: " +
    config.duration +
    "s;" +
    "  filter: drop-shadow(0 4px 8px rgba(0,0,0,.25));" +
    "}" +
    ".rcw-runner-img {" +
    "  display: block;" +
    "  height: 90px;" +
    "  width: auto;" +
    "  user-select: none;" +
    "}" +
    ".rcw-runner-close {" +
    "  position: absolute;" +
    "  top: -6px; right: -6px;" +
    "  width: 18px; height: 18px;" +
    "  border-radius: 999px;" +
    "  background: #fff;" +
    "  border: 1px solid rgba(0,0,0,.15);" +
    "  color: #333;" +
    "  font: 11px/16px sans-serif;" +
    "  text-align: center;" +
    "  cursor: pointer;" +
    "  pointer-events: auto;" +
    "}" +
    "@media (prefers-reduced-motion: reduce) {" +
    "  .rcw-runner-link { animation: none; left: -9999px; }" +
    "}";
  document.head.appendChild(style);

  var track = document.createElement("div");
  track.className = "rcw-runner-track";

  var link = document.createElement("a");
  link.className = "rcw-runner-link";
  link.href = config.href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", "Visit " + config.href);

  var img = document.createElement("img");
  img.className = "rcw-runner-img";
  img.src = FRAME_1;
  img.alt = "";
  img.setAttribute("aria-hidden", "true");
  link.appendChild(img);

  if (config.dismissible) {
    var closeBtn = document.createElement("span");
    closeBtn.className = "rcw-runner-close";
    closeBtn.textContent = "×";
    closeBtn.setAttribute("role", "button");
    closeBtn.setAttribute("aria-label", "Hide");
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      track.remove();
      sessionStorage.setItem(storageKey, "1");
    });
    link.appendChild(closeBtn);
  }

  track.appendChild(link);
  document.body.appendChild(track);

  // Two-frame run cycle — swap the image src on an interval rather than
  // using a sprite sheet, since it's simpler and these are already two
  // separate small files.
  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (!reducedMotion) {
    var showingFrame1 = true;
    setInterval(function () {
      img.src = showingFrame1 ? FRAME_2 : FRAME_1;
      showingFrame1 = !showingFrame1;
    }, FRAME_SWAP_MS);
  }
})();
