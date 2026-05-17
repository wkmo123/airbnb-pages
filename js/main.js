/**
 * Cambia esta URL por el enlace de tu anuncio en Airbnb
 * Ejemplo: https://www.airbnb.es/rooms/1234567890
 */
const AIRBNB_URL =
  "https://www.airbnb.es/s/Madrid--Comunidad-de-Madrid--Espa%C3%B1a/homes?query=loft%20centro%20Madrid";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&q=85",
    alt: "Salón luminoso",
  },
  {
    src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=900&h=700&fit=crop&q=85",
    alt: "Cocina equipada",
  },
  {
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=900&h=700&fit=crop&q=85",
    alt: "Dormitorio",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=700&fit=crop&q=85",
    alt: "Zona de estar",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6162a9a0c8?w=900&h=700&fit=crop&q=85",
    alt: "Terraza",
  },
  {
    src: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&h=700&fit=crop&q=85",
    alt: "Baño",
  },
];

const LOCATION_IMAGE =
  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=500&fit=crop&q=85";

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

let currentIndex = 0;

function goToAirbnb(e) {
  e?.preventDefault();
  window.open(AIRBNB_URL, "_blank", "noopener,noreferrer");
}

function initAirbnbLinks() {
  $$("[data-airbnb]").forEach((link) => {
    link.href = AIRBNB_URL;
    link.addEventListener("click", goToAirbnb);
  });
}

function initHero() {
  const hero = $("#heroBg");
  if (hero && PHOTOS[0]) {
    hero.style.backgroundImage = `url('${PHOTOS[0].src}')`;
  }
}

function initAboutAndLocation() {
  const aboutImg = $("#aboutImage");
  const locImg = $("#locationImage");

  if (aboutImg && PHOTOS[3]) {
    aboutImg.src = PHOTOS[3].src;
    aboutImg.alt = PHOTOS[3].alt;
  }
  if (locImg) {
    locImg.src = LOCATION_IMAGE;
    locImg.alt = "Centro de Madrid";
  }
}

function initGallery() {
  const grid = $("#photoGrid");
  const lightbox = $("#lightbox");
  const lbImg = $("#lightboxImg");
  const lbCaption = $("#lightboxCaption");

  PHOTOS.forEach((photo, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "photo-card";
    btn.dataset.label = photo.alt;
    btn.setAttribute("aria-label", `Ver ${photo.alt}`);

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = i < 3 ? "eager" : "lazy";
    btn.appendChild(img);

    btn.addEventListener("click", () => openLightbox(i));
    grid.appendChild(btn);
  });

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.showModal();
  }

  function updateLightbox() {
    const photo = PHOTOS[currentIndex];
    lbImg.src = photo.src;
    lbImg.alt = photo.alt;
    lbCaption.textContent = `${photo.alt} (${currentIndex + 1} / ${PHOTOS.length})`;
  }

  function step(dir) {
    currentIndex = (currentIndex + dir + PHOTOS.length) % PHOTOS.length;
    updateLightbox();
  }

  $("#lightboxClose")?.addEventListener("click", () => lightbox.close());
  $("#lightboxPrev")?.addEventListener("click", () => step(-1));
  $("#lightboxNext")?.addEventListener("click", () => step(1));

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox?.open) return;
    if (e.key === "Escape") lightbox.close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

function initHeader() {
  const header = $(".site-header");
  const toggle = $("#menuToggle");

  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
  });

  toggle?.addEventListener("click", () => {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  $$(".site-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header?.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHero();
  initAboutAndLocation();
  initGallery();
  initAirbnbLinks();
  initHeader();
});
