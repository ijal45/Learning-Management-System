// ================================================
// mobile-nav.js
// Hamburger menu untuk mode mobile
// Letakkan file ini di folder root project kamu,
// lalu tambahkan di setiap halaman HTML:
//   <script src="mobile-nav.js"></script>
// ================================================

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    injectMobileNav();
    initToggle();
    markActivePage();
    syncAuthButton();
  });

  // 1. Inject tombol hamburger & dropdown ke header
  function injectMobileNav() {
    var header = document.querySelector("header");
    if (!header) return;

    // Tambahkan tombol hamburger ke .header-content
    var headerContent = header.querySelector(".header-content");
    if (headerContent && !document.getElementById("hamburger-btn")) {
      var btn = document.createElement("button");
      btn.id = "hamburger-btn";
      btn.className = "hamburger";
      btn.setAttribute("aria-label", "Buka menu navigasi");
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = "<span></span><span></span><span></span>";
      headerContent.appendChild(btn);
    }

    // Tambahkan mobile-nav dropdown di dalam header
    if (!document.getElementById("mobile-nav")) {
      var nav = document.createElement("div");
      nav.id = "mobile-nav";
      nav.className = "mobile-nav";
      nav.setAttribute("role", "navigation");
      nav.setAttribute("aria-label", "Menu mobile");
      nav.innerHTML =
        '<a href="index.html" data-page="index">' +
          '<span class="mnav-icon">&#127968;</span> Beranda' +
        '</a>' +
        '<a href="pembelajaran.html" data-page="pembelajaran">' +
          '<span class="mnav-icon">&#128218;</span> Pembelajaran' +
        '</a>' +
        '<a href="diskusi.html" data-page="diskusi">' +
          '<span class="mnav-icon">&#128172;</span> Diskusi' +
        '</a>' +
        '<a href="#" id="mobile-auth-btn" class="mnav-login">' +
          '<span class="mnav-icon">&#128273;</span> Login' +
        '</a>';
      header.appendChild(nav);
    }
  }

  // 2. Logika buka / tutup
  function initToggle() {
    var btn  = document.getElementById("hamburger-btn");
    var menu = document.getElementById("mobile-nav");
    if (!btn || !menu) return;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = menu.classList.toggle("open");
      btn.classList.toggle("open", isOpen);
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    // Klik di luar menu → tutup
    document.addEventListener("click", function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        close();
      }
    });

    // Klik link di dalam menu → tutup setelah navigasi
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setTimeout(close, 120);
      });
    });

    function close() {
      menu.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  }

  // 3. Tandai halaman aktif
  function markActivePage() {
    var path    = window.location.pathname;
    var current = path.split("/").pop().replace(".html", "") || "index";
    var menu    = document.getElementById("mobile-nav");
    if (!menu) return;

    menu.querySelectorAll("a[data-page]").forEach(function (link) {
      var page = link.getAttribute("data-page");
      link.classList.toggle(
        "active",
        page === current || (current === "" && page === "index")
      );
    });
  }

  // 4. Sinkronisasi teks Login/Logout dengan tombol desktop
  function syncAuthButton() {
    var desktopAuth = document.getElementById("auth-btn");
    var mobileAuth  = document.getElementById("mobile-auth-btn");
    if (!desktopAuth || !mobileAuth) return;

    function syncText() {
      var txt = desktopAuth.textContent.trim();
      mobileAuth.innerHTML = '<span class="mnav-icon">&#128273;</span> ' + txt;
    }

    syncText();

    // Pantau kalau auth.js mengubah teks "Login" → "Logout"
    new MutationObserver(syncText).observe(desktopAuth, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Klik mobile auth = klik desktop auth
    mobileAuth.addEventListener("click", function (e) {
      e.preventDefault();
      desktopAuth.click();
    });
  }
})();