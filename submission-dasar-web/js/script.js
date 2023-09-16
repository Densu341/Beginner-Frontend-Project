const sentences = ["I'am Deni Irawan", "I'am Student", "I'am Web Developer"];

const typingSpeed = 200; // Kecepatan pengetikan (ms per karakter)
const typingTextElement = document.getElementById("typing-text");

let sentenceIndex = 0;
let charIndex = 0;

function typeText() {
  if (sentenceIndex < sentences.length) {
    const currentSentence = sentences[sentenceIndex];

    if (charIndex < currentSentence.length) {
      typingTextElement.textContent = currentSentence.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeText, typingSpeed); // Panggil kembali fungsi setelah jeda
    } else {
      // Kalimat saat ini telah selesai diketikkan, lanjutkan ke kalimat berikutnya
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
      charIndex = 0;
      setTimeout(typeText, 1000); // Jeda sebelum lanjut ke kalimat berikutnya (1 detik)
    }
  }
}

typeText(); // Mulai animasi pengetikan

// Dapatkan elemen tombol dropdown
const dropdownButton = document.querySelector(".dropbtn");

// Dapatkan elemen dropdown content
const dropdownContent = document.querySelector(".dropdown-content");

// Saat tombol dropdown diklik
dropdownButton.addEventListener("click", function () {
  // Toggle tampilan dropdown content
  dropdownContent.classList.toggle("show");
});

// Saat item dalam dropdown content diklik
dropdownContent.addEventListener("click", function (e) {
  // Cek apakah yang diklik adalah elemen anchor (item dropdown)
  if (e.target.tagName === "A") {
    // Set teks tombol dropdown dengan teks item yang dipilih
    dropdownButton.textContent = e.target.textContent;

    // Sembunyikan dropdown content
    dropdownContent.classList.remove("show");
  }
});

// Saat klik di luar dropdown, sembunyikan dropdown content
window.addEventListener("click", function (e) {
  if (!dropdownButton.contains(e.target)) {
    dropdownContent.classList.remove("show");
  }
});
