// ===== header-template.js =====

document.addEventListener('DOMContentLoaded', function () {

  const path     = window.location.pathname.split('/').pop() || 'index.html';
  const isActive = (page) => path === page ? 'class="active"' : '';
  const loggedIn = isLoggedIn();
  const nama     = getNamaLengkap();
  const kelas    = getKelas();
  const role     = getRole(); // 'guru' atau 'siswa'
  const isGuru   = role === 'guru';

  const authBtn = loggedIn ? `
    <li style="position:relative;">
      <button id="profile-btn" onclick="toggleDropdown(event)" style="
        display:inline-flex; align-items:center; gap:7px;
        padding:6px 16px; border-radius:20px; font-size:13px;
        font-weight:600; cursor:pointer;
        border:1.5px solid rgba(255,255,255,0.45);
        background:rgba(255,255,255,0.15); color:white;
        transition:background 0.2s; font-family:inherit;
      "
      onmouseover="this.style.background='rgba(255,255,255,0.28)'"
      onmouseout="this.style.background='rgba(255,255,255,0.15)'"
      >
        <span style="font-size:15px;">${isGuru ? '👨‍🏫' : '👨‍🎓'}</span>
        ${nama}
        <span style="font-size:10px;opacity:0.8;">▼</span>
      </button>

      <div id="profile-dropdown" style="
        display:none; position:absolute; right:0;
        top:calc(100% + 10px); background:white;
        border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,0.15);
        min-width:220px; z-index:9999; overflow:hidden;
        border:1px solid #eee;
      ">
        <!-- Info profil -->
        <div style="padding:16px 18px 12px; border-bottom:1px solid #f0f0f0; background:#fffbf0;">
          <div style="font-size:11px;color:#999;margin-bottom:4px;">Profil Saya</div>
          <div style="font-weight:700;color:#333;font-size:15px;margin-bottom:2px;">
            ${isGuru ? '👨‍🏫' : '👨‍🎓'} ${nama}
          </div>
          <div style="font-size:12px;color:#666;margin-bottom:6px;">
            📧 ${getCurrentEmail() || '-'}
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <span style="
              display:inline-block; padding:2px 10px; border-radius:20px;
              font-size:11px; font-weight:600;
              background:${isGuru ? '#fff3cd' : '#d1f0e0'};
              color:${isGuru ? '#7a5e00' : '#1a6e3c'};
            ">${isGuru ? 'Guru / Pengajar' : 'Siswa'}</span>
            <span style="
              display:inline-block; padding:2px 10px; border-radius:20px;
              font-size:11px; font-weight:600;
              background:#e8f0fe; color:#1a56db;
            ">🏫 ${kelas}</span>
          </div>
        </div>

        <!-- Logout -->
        <button onclick="confirmLogout()" style="
          display:flex; align-items:center; gap:10px;
          width:100%; padding:13px 18px;
          border:none; background:white; cursor:pointer;
          font-size:14px; color:#e74c3c; font-weight:500;
          font-family:inherit; transition:background 0.15s; text-align:left;
        "
        onmouseover="this.style.background='#fff5f5'"
        onmouseout="this.style.background='white'"
        >
          <span style="font-size:18px;">🚪</span> Keluar
        </button>
      </div>
    </li>
  ` : `
    <li>
      <a href="login.html" style="
        display:inline-flex; align-items:center; gap:6px;
        padding:6px 16px; border-radius:20px; font-size:13px;
        font-weight:600; text-decoration:none;
        border:1.5px solid rgba(255,255,255,0.45);
        background:rgba(255,255,255,0.15); color:white;
        transition:background 0.2s;
      "
      onmouseover="this.style.background='rgba(255,255,255,0.28)'"
      onmouseout="this.style.background='rgba(255,255,255,0.15)'"
      >
        <span style="font-size:14px;">🔑</span> Login
      </a>
    </li>
  `;

  const headerEl = document.querySelector('header');
  if (headerEl) {
    headerEl.innerHTML = `
      <div class="container header-content">
        <div class="logo">
          <img src="images/LOGO-SMK.png" alt="TAV SMKN 3 Surabaya Logo"/>
          <span>TAV SMKN 3 Surabaya</span>
        </div>
        <nav>
          <ul>
            <li><a href="index.html"         ${isActive('index.html')}>Beranda</a></li>
            <li><a href="pembelajaran.html"   ${isActive('pembelajaran.html')}>Pembelajaran</a></li>
            <li><a href="diskusi.html"        ${isActive('diskusi.html')}>Diskusi</a></li>
            ${authBtn}
          </ul>
        </nav>
      </div>
    `;
  }

  document.addEventListener('click', function (e) {
    const dd  = document.getElementById('profile-dropdown');
    const btn = document.getElementById('profile-btn');
    if (dd && btn && !btn.contains(e.target) && !dd.contains(e.target)) {
      dd.style.display = 'none';
    }
  });
});

function toggleDropdown(e) {
  e.stopPropagation();
  const dd = document.getElementById('profile-dropdown');
  if (dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}

function confirmLogout() {
  const dd = document.getElementById('profile-dropdown');
  if (dd) dd.style.display = 'none';

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:99999;
    background:rgba(0,0,0,0.45);
    display:flex;align-items:center;justify-content:center;
  `;
  overlay.innerHTML = `
    <div style="background:white;border-radius:16px;padding:36px 32px;
      max-width:360px;width:90%;text-align:center;
      box-shadow:0 16px 48px rgba(0,0,0,0.2);">
      <div style="font-size:48px;margin-bottom:12px;">🚪</div>
      <h3 style="margin:0 0 8px;color:#222;font-size:18px;">Keluar dari Akun?</h3>
      <p style="color:#666;font-size:14px;margin:0 0 28px;line-height:1.6;">
        Anda yakin ingin keluar? Login kembali untuk mengakses diskusi dan asesmen.
      </p>
      <div style="display:flex;gap:12px;justify-content:center;">
        <button id="cancel-logout" style="padding:10px 24px;border-radius:20px;
          border:1.5px solid #ddd;background:white;color:#555;
          font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">
          Batal
        </button>
        <button id="confirm-logout" style="padding:10px 24px;border-radius:20px;
          border:none;background:#e74c3c;color:white;
          font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;">
          Ya, Keluar
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('cancel-logout').onclick  = () => overlay.remove();
  document.getElementById('confirm-logout').onclick = () => { overlay.remove(); logoutUser(); };
}