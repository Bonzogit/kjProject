/* Set the business WhatsApp number here in international digits only, e.g. 14155552671. */
const WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });
}

const query = new URLSearchParams(window.location.search);
const interest = query.get("interest");
const product = query.get("product");
const select = document.querySelector("select[name='interest']");
const message = document.querySelector("textarea[name='message']");
if (select && interest) {
  const match = [...select.options].find((option) => option.value === interest);
  if (match) select.value = interest;
}
if (message && product) {
  message.value = `I would like to learn more about ${product}.\n\n`;
  message.focus();
}

document.querySelectorAll("[data-whatsapp-message]").forEach((link) => {
  const text = encodeURIComponent(link.dataset.whatsappMessage || "Hello, I would like to enquire about RoadVault.");
  if (WHATSAPP_NUMBER === "YOUR_WHATSAPP_NUMBER") {
    link.href = `https://wa.me/?text=${text}`;
    link.title = "Opens WhatsApp. Add your business number in script.js for direct chat.";
  } else {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else { revealItems.forEach((item) => item.classList.add("is-visible")); }

const selectedLanguage = new URLSearchParams(window.location.search).get("lang") || localStorage.getItem("roadvault-language") || "en";
const languageSuffix = ["en", "es", "fr", "de", "pt", "ar"].includes(selectedLanguage) ? `?lang=${selectedLanguage}` : "";
const currentYear = new Date().getFullYear();

document.querySelectorAll(".site-footer").forEach((footer) => {
  footer.innerHTML = `
    <div class="footer-brand-block"><a class="brand" href="index.html${languageSuffix}" aria-label="RoadVault home">ROAD<span>VAULT</span><i></i></a><p>Vehicle security, considered for the journeys that matter.</p><span class="footer-note">Discreet protection. Clear purpose.</span></div>
    <div class="footer-column"><p>Collection</p><a href="contact.html?product=RV-S1&amp;lang=${selectedLanguage}">Chrono / RV–S1</a><a href="contact.html?product=RV-S2&amp;lang=${selectedLanguage}">Sentinel / RV–S2</a><a href="contact.html?product=RV-S3&amp;lang=${selectedLanguage}">Axis / RV–S3</a></div>
    <div class="footer-column"><p>Explore</p><a href="services.html${languageSuffix}">Services</a><a href="about.html${languageSuffix}">Our approach</a><a href="contact.html${languageSuffix}">Start an inquiry</a></div>
    <div class="footer-column footer-contact"><p>Conversation</p><a href="contact.html${languageSuffix}">Product &amp; vehicle fit</a><a href="contact.html?interest=Trade%20and%20distribution&amp;lang=${selectedLanguage}">Trade &amp; distribution</a><a href="https://wa.me/?text=Hello%2C%20I%20would%20like%20to%20learn%20more%20about%20RoadVault." target="_blank" rel="noreferrer">WhatsApp ↗</a></div>
    <div class="footer-bottom"><small>© ${currentYear} RoadVault. All rights reserved.</small><span>English · Español · Français · Deutsch · Português · العربية</span></div>`;
});

document.querySelectorAll(".brand").forEach((brand) => {
  if (brand.querySelector(".brand-mark")) return;
  brand.insertAdjacentHTML("afterbegin", '<svg class="brand-mark" viewBox="0 0 26 26" aria-hidden="true"><path d="M13 2.5 22 7.7v10.6L13 23.5 4 18.3V7.7L13 2.5Z"/><path d="m8.6 8.5 4.4 2.6 4.4-2.6M13 11.1v5.8"/></svg>');
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const count = carousel.querySelector("[data-carousel-count]");
  let active = 0;
  const show = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === active));
    if (count) count.textContent = `${String(active + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  };
  carousel.querySelector("[data-carousel-prev]")?.addEventListener("click", () => show(active - 1));
  carousel.querySelector("[data-carousel-next]")?.addEventListener("click", () => show(active + 1));
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(() => show(active + 1), 6200);
});

