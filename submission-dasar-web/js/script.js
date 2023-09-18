const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

const sentences = [
  "I'm Deni Irawan",
  "I'm Machine Learning Dev",
  "I'm Student",
];

const typingSpeed = 100;
const typingTextElement = document.getElementById("typing-text");

let sentenceIndex = 0;
let charIndex = 0;

function typeText() {
  if (sentenceIndex < sentences.length) {
    const currentSentence = sentences[sentenceIndex];

    if (charIndex < currentSentence.length) {
      typingTextElement.textContent = currentSentence.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeText, typingSpeed);
    } else {
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
      charIndex = 0;
      setTimeout(typeText, 1000);
    }
  }
}

typeText();

// Dapatkan elemen tombol dropdown
const dropdownButton = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownButton.addEventListener("click", function () {
  dropdownContent.classList.toggle("show");
});

dropdownContent.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    dropdownButton.textContent = e.target.textContent;
    dropdownContent.classList.remove("show");
  }
});

window.addEventListener("click", function (e) {
  if (!dropdownButton.contains(e.target)) {
    dropdownContent.classList.remove("show");
  }
});

const cardData = [
  {
    title: "Web Development",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "UI/UX",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "ML Modeling",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "Data Preprocesing",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

const cardContainer = document.getElementById("card-container");

cardData.forEach((data) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = data.title;

  const content = document.createElement("p");
  content.textContent = data.content;

  card.appendChild(title);
  card.appendChild(content);

  cardContainer.appendChild(card);
});

// Mendapatkan elemen-elemen popup
const form = document.getElementById("contact-form");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-btn");

// Fungsi untuk menampilkan popup
function showPopup() {
  popup.style.display = "flex";
}

function hidePopup() {
  popup.style.display = "none";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  showPopup();
});

closeBtn.addEventListener("click", function () {
  hidePopup();
});

// smoth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toTopBtn = document.getElementById("toTopBtn");

  // Tampilkan tombol "To Top" ketika scroll ke bawah lebih dari 300 piksel
  window.addEventListener("scroll", function () {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      toTopBtn.style.display = "block";
    } else {
      toTopBtn.style.display = "none";
    }
  });

  // Menggulir halaman ke atas ketika tombol "To Top" diklik
  toTopBtn.addEventListener("click", function () {
    document.body.scrollTop = 0; // Untuk Safari
    document.documentElement.scrollTop = 0; // Untuk Chrome, Firefox, IE, dan Opera
  });
});
