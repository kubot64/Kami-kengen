(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var PRAY_KEY = "kami-kengen-prayers";

  function initFigure() {
    var photo = document.querySelector(".hato-photo");
    if (!photo) return;

    function show() {
      if (photo.naturalWidth > 0) root.classList.add("has-photo");
    }

    if (photo.complete) {
      show();
      return;
    }
    photo.addEventListener("load", show, { once: true });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  function readPrayers() {
    try {
      var n = Number(localStorage.getItem(PRAY_KEY));
      if (Number.isFinite(n) && n > 0) return Math.floor(n);
    } catch (err) {
      return readPrayers.memory || 0;
    }
    return readPrayers.memory || 0;
  }

  function writePrayers(n) {
    readPrayers.memory = n;
    try {
      localStorage.setItem(PRAY_KEY, String(n));
    } catch (err) {
      /* プライベートモードなどでは、このページを開いているあいだだけ数を持つ */
    }
  }

  function formatCount(n) {
    return new Intl.NumberFormat("ja-JP").format(n);
  }

  function burstFrom(button) {
    if (reduce) return;
    var layer = document.getElementById("burst");
    if (!layer) return;
    var rect = button.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;
    var count = 16;
    for (var i = 0; i < count; i += 1) {
      var spark = document.createElement("span");
      spark.className = "spark";
      var angle = (Math.PI * 2 * i) / count + Math.random() * 0.25;
      var dist = 64 + Math.random() * 56;
      spark.style.left = x + "px";
      spark.style.top = y + "px";
      spark.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      spark.style.setProperty("--dy", Math.sin(angle) * dist + "px");
      spark.style.animationDelay = (Math.random() * 40) + "ms";
      layer.appendChild(spark);
      spark.addEventListener("animationend", function () {
        spark.remove();
      });
    }
  }

  function initPray() {
    var button = document.getElementById("pray");
    var countEl = document.getElementById("pray-count");
    var live = document.getElementById("pray-live");
    var slot = document.querySelector(".figure-slot");
    if (!button || !countEl) return;

    function render(n) {
      countEl.textContent = formatCount(n);
      button.setAttribute("aria-label", "祈る。この端末の祈りは" + formatCount(n) + "回");
    }

    render(readPrayers());

    button.addEventListener("click", function () {
      var next = readPrayers() + 1;
      writePrayers(next);
      render(next);
      if (live) live.textContent = formatCount(next) + "回、祈りました。";
      burstFrom(button);
      if (slot && !reduce) {
        slot.classList.remove("is-blessed");
        void slot.offsetWidth;
        slot.classList.add("is-blessed");
      }
    });
  }

  function initShare() {
    var share = document.getElementById("share");
    if (share && share.dataset.text) {
      var intent = new URL("https://x.com/intent/post");
      intent.searchParams.set("text", share.dataset.text);
      intent.searchParams.set("hashtags", share.dataset.hashtags || "神顕現計画");
      if (location.protocol === "http:" || location.protocol === "https:") {
        intent.searchParams.set("url", location.href.split("#")[0]);
      }
      share.href = intent.toString();
    }

    var copyBtn = document.getElementById("copy-tag");
    var status = document.getElementById("copy-status");
    if (!copyBtn || !status) return;
    copyBtn.addEventListener("click", function () {
      var tag = "#神顕現計画";
      function ok() {
        status.textContent = "ハッシュタグを写しました。";
      }
      function fail() {
        status.textContent = "写し取れませんでした。選んでコピーしてください。" + tag;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tag).then(ok).catch(fail);
      } else {
        fail();
      }
    });
  }

  initFigure();
  initReveal();
  initPray();
  initShare();
})();
