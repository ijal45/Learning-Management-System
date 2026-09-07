// ================================================
// script.js
// ================================================

// ── Toggle topic (untuk accordion) ──
function toggleTopic(element) {
  const content = element.nextElementSibling;
  const arrow   = element.querySelector("span:last-child");
  if (content.classList.contains("active")) {
    content.classList.remove("active");
    content.style.display = "none";
    arrow.textContent = "▼";
  } else {
    content.classList.add("active");
    content.style.display = "block";
    arrow.textContent = "▲";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const firstTopic = document.querySelector(".topic-item .topic-header");
  if (firstTopic) toggleTopic(firstTopic);

  // Cek hash URL saat refresh
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    if (subMateriData[hash]) {
      const parentId = hash.split('-sub')[0];
      showSubMateriList(parentId, false);
      showMateri(hash);
    } else if (materiData[hash]) {
      if (materiData[hash].subMateri) {
        showSubMateriList(hash, false);
      } else {
        showMateri(hash);
      }
    }
  }
});

// ================================================
// DATA MATERI UTAMA
// ================================================
const materiData = {
  'materi-1': {
    title: "Gambar Teknik Elektronika & Penggunaan Perkakas Tangan",
    subMateri: true,
    thumbnail: "images/Materi-1.png"
  },
  'materi-2': {
    title: "Alat Ukur Listrik, Elektronika dan Instrumentasi",
    src: "https://docs.google.com/document/d/1rWR5nNWuSo8qPFZlaZJDBpVIBwaONPrqCek-qxdiHew/preview"
  },
  'materi-3': {
    title: "Komponen Elektronika Aktif dan Pasif",
    src: "https://docs.google.com/document/d/1TVfoYq1V1ITvjoHG3Ez6T-SaVmeWSKhzGBvFK-D5UtU/preview"
  },
  'materi-4': {
    title: "Konsep Dasar Elektronika dan Rangkaian Elektronika",
    src: "https://docs.google.com/document/d/1fqtX5He8rAwcZEpSlNlLu8-4l-nV5oh6JtWJp5JplMg/preview"
  },
  'materi-5': {
    title: "K3 (Kesehatan dan Keselamatan Kerja)",
    src: "https://docs.google.com/document/d/1bV1-TWq06qOsOeCAHI69vKq6MdrzFD22O_yWVsr9dvs/preview"
  },
  'materi-6': {
    title: "Manufaktur",
    src: "https://docs.google.com/document/d/17MOIFNh4MWBXExzEnqjVcU_-k3lUoCfnvkw4C2GvQDs/preview"
  },
  'materi-7': {
    title: "Technopreneur",
    src: "https://docs.google.com/document/d/1_vs6ofeKeIoEPhwb9S5R8xUUDpNJq8adtn855Elu7gk/preview"
  }
};

// ================================================
// DATA SUB-MATERI (khusus materi-1)
// ================================================
const subMateriData = {
  'materi-1-sub1': {
    parentId : 'materi-1',
    title    : "Peralatan Gambar Teknik Elektronika",
    icon     : "📐",
    image    : "images/sub-materi/sub1-peralatan.png",     // GANTI DENGAN GAMBAR ANDA
    desc     : "Pengenalan macam-macam peralatan gambar teknik yang digunakan dalam elektronika.",
    src      : "https://docs.google.com/document/d/1gsuRTUsdcDvWq-oHEVAPGyEBYwSiLCh93_K23hZQWIQ/preview"
  },
  'materi-1-sub2': {
    parentId : 'materi-1',
    title    : "Gambar Teknik Elektronika, Simbol Komponen dan Rangkaian Elektronika",
    icon     : "🔌",
    image    : "images/sub-materi/sub2-simbol.png",        // GANTI DENGAN GAMBAR ANDA
    desc     : "Simbol-simbol komponen elektronika dan cara membaca rangkaian.",
    src      : "https://docs.google.com/document/d/1vc28875H6pqI0EUzMOLr2BlVQ8fVkDKYdZRdf_bPbdc/preview"
  },
  'materi-1-sub3': {
    parentId : 'materi-1',
    title    : "Alat dan Gambar Instrumentasi",
    icon     : "🎛️",
    image    : "images/sub-materi/sub3-instrumentasi.png", // GANTI DENGAN GAMBAR ANDA
    desc     : "Pengenalan alat-alat instrumentasi dan cara menggambarkannya secara teknik.",
    src      : "https://docs.google.com/document/d/1L_Hy0sICYC95JevM_aKsh5DH4r-4_8JktawAV50fZfo/preview"
  }
};

// ── Daftar sub-materi per parent ──
const subMateriList = {
  'materi-1': ['materi-1-sub1', 'materi-1-sub2', 'materi-1-sub3']
};

// ================================================
// FUNGSI TAMPIL SUB-MATERI LIST
// ================================================
function showSubMateriList(parentId, updateHash = true) {
  if (updateHash) window.location.hash = parentId;

  const parent = materiData[parentId];
  const subs   = subMateriList[parentId] || [];

  document.getElementById('materi-list').style.display   = 'none';
  document.getElementById('materi-detail').style.display = 'block';

  const body = document.getElementById('materi-content-body');

  const subCards = subs.map(subId => {
    const sub = subMateriData[subId];
    
    const thumbnailHTML = sub.image 
      ? `<img src="${sub.image}" alt="${sub.title}" style="width:100%; height:100%; object-fit:cover;">`
      : `<div style="font-size: 3.5rem;">${sub.icon}</div>`;

    return `
      <div class="materi-card" style="cursor:pointer;" onclick="showMateri('${subId}')">
        <div class="materi-thumbnail" style="height: 140px; background: #f8f9fa; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          ${thumbnailHTML}
        </div>
        <div class="materi-info">
          <h3>${sub.title}</h3>
          <p>${sub.desc}</p>
          <br/>
          <button class="btn" onclick="event.stopPropagation(); showMateri('${subId}')">
            Lihat Materi
          </button>
        </div>
      </div>
    `;
  }).join('');

  body.innerHTML = `
    <div style="margin-bottom: 24px;">
      <h3 style="text-align:center; color:#2c3e50; margin-bottom: 8px;">
        📚 ${parent.title}
      </h3>
      <p style="text-align:center; color:#777; font-size:14px;">
        Pilih topik yang ingin dipelajari
      </p>
    </div>

    ${parentId === 'materi-1' ? `
      <div style="background:#eef6ff; border-left:4px solid #fdc90d; border-radius:8px; padding:14px 18px; margin-bottom:24px; text-align:left;">
        <p style="margin:0 0 4px 0; font-weight:600; color:#0d6efd; font-size:13px; letter-spacing:0.03em;">
          CAPAIAN PEMBELAJARAN (CP)
        </p>
        <p style="margin:0; color:#333; font-size:14px; line-height:1.6;">
          Pada akhir fase E peserta didik mampu menggambar teknik listrik, elektronika, dan instrumentasi termasuk pengenalan macam-macam peralatan gambar, simbol komponen dan rangkaian listrik, elektronika, dan instrumentasi.
        </p>
      </div>
    ` : ''}

    <div class="materi-container" style="margin-bottom: 20px;">
      ${subCards}
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================================================
// FUNGSI TAMPIL DOKUMEN MATERI / SUB-MATERI
// ================================================
function showMateri(id) {
  const subData = subMateriData[id];
  if (subData) {
    window.location.hash = id;
    _tampilDokumen(subData.title, subData.src, subData.parentId);
    return;
  }

  const data = materiData[id];
  if (!data) return;

  if (data.subMateri) {
    showSubMateriList(id);
    return;
  }

  window.location.hash = id;
  _tampilDokumen(data.title, data.src, null);
}

// ── Internal: render iframe dokumen ──
function _tampilDokumen(title, src, parentId) {
  document.getElementById('materi-list').style.display   = 'none';
  document.getElementById('materi-detail').style.display = 'block';

  const backBtn = document.getElementById('back-btn-container');
  if (backBtn) {
    if (parentId) {
      backBtn.innerHTML = `
        <button class="btn" onclick="showSubMateriList('${parentId}')"
          style="background:var(--secondary); margin-right:8px;">
          ← Kembali ke Topik
        </button>
        <button class="btn" onclick="backToList()"
          style="background:#888;">
          ⌂ Semua Materi
        </button>
      `;
    } else {
      backBtn.innerHTML = `
        <button class="btn" onclick="backToList()"
          style="background:var(--secondary);">
          ← Kembali ke Daftar Materi
        </button>
      `;
    }
  }

  const body = document.getElementById('materi-content-body');
  body.innerHTML = `
    <h3 style="text-align:center; margin-bottom:20px; color:#2c3e50;">
      ${title}
    </h3>
    <div class="gdocs-wrapper">
      <iframe
        src="${src}"
        allowfullscreen
        loading="lazy">
      </iframe>
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ================================================
// KEMBALI KE DAFTAR UTAMA
// ================================================
function backToList() {
  history.pushState("", document.title, window.location.pathname);
  document.getElementById('materi-detail').style.display = 'none';
  document.getElementById('materi-list').style.display   = 'block';
  document.getElementById('materi-content-body').innerHTML = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}