// ===== auth.js =====
const firebaseConfig = {
  apiKey: "AIzaSyA8y7v11pmnqU6F6tn4d73_VZ5dfqEXL7k",
  authDomain: "lms-tav-smkn-3.firebaseapp.com",
  databaseURL: "https://lms-tav-smkn-3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lms-tav-smkn-3",
  storageBucket: "lms-tav-smkn-3.firebasestorage.app",
  messagingSenderId: "903625511952",
  appId: "1:903625511952:web:5eca441b56c1d366f8e695"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.database();

// ─── Register akun baru ───────────────────────────────────────
function registerUser(email, password, namaLengkap, kelas, role) {
  return auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const uid = cred.user.uid;
      // Simpan profil ke Realtime Database
      return db.ref('users/' + uid).set({
        namaLengkap : namaLengkap,
        kelas       : kelas,
        role        : role,   // 'guru' atau 'siswa'
        email       : email,
        createdAt   : Date.now()
      }).then(() => {
        // Kirim email verifikasi
        return cred.user.sendEmailVerification();
      });
    });
}

// ─── Login ───────────────────────────────────────────────────
function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
    .then(cred => {
      // Cek verifikasi email
      if (!cred.user.emailVerified) {
        auth.signOut();
        throw new Error('EMAIL_NOT_VERIFIED');
      }
      const uid = cred.user.uid;
      // Ambil profil dari database
      return db.ref('users/' + uid).once('value').then(snap => {
        const profil = snap.val() || {};
        const namaLengkap = profil.namaLengkap || email;
        const kelas       = profil.kelas       || '-';
        const role        = profil.role        || 'siswa';

        localStorage.setItem('tav_uid',          uid);
        localStorage.setItem('tav_user_email',   email);
        localStorage.setItem('tav_nama_lengkap', namaLengkap);
        localStorage.setItem('tav_kelas',        kelas);
        localStorage.setItem('tav_role',         role);

        return { namaLengkap, kelas, role };
      });
    });
}

// ─── Logout ──────────────────────────────────────────────────
function logoutUser() {
  return auth.signOut().then(() => {
    localStorage.removeItem('tav_uid');
    localStorage.removeItem('tav_user_email');
    localStorage.removeItem('tav_nama_lengkap');
    localStorage.removeItem('tav_kelas');
    localStorage.removeItem('tav_role');
    window.location.href = 'index.html';
  });
}

// ─── Helpers ─────────────────────────────────────────────────
function isLoggedIn()          { return !!localStorage.getItem('tav_uid'); }
function getCurrentUID()       { return localStorage.getItem('tav_uid'); }
function getCurrentEmail()     { return localStorage.getItem('tav_user_email'); }
function getNamaLengkap()      { return localStorage.getItem('tav_nama_lengkap') || '-'; }
function getKelas()            { return localStorage.getItem('tav_kelas') || '-'; }
function getRole()             { return localStorage.getItem('tav_role') || 'siswa'; }

// Untuk kompatibilitas dengan kode lama
function getCurrentDisplayName() { return getNamaLengkap(); }

// ─── Guard ───────────────────────────────────────────────────
function requireLogin(redirectUrl = 'login.html') {
  if (!isLoggedIn()) {
    alert('Anda harus login terlebih dahulu untuk mengakses halaman ini.');
    window.location.href = redirectUrl;
  }
}