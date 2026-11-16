/**
 * ============================================================================
 * CONFIGURARE INVITAȚIE DE NUNTĂ — STIL ITALY (CREAM, PEARL & TRADITIONAL LACE)
 * ============================================================================
 */
const WEDDING_CONFIG = {
  brideName: "Adriana",
  groomName: "Marin",
  monogram: "A & M",

  // Data nunții în format ISO (An-Lună-ZiTora:minut:00)
  weddingDateISO: "2027-06-12T14:00:00",
  displayDayName: "Sâmbătă",
  displayDate: "12 Iunie 2027",
  displayCity: "Mayoral, Doroțcaia",
  rsvpDeadline: "1 Iunie 2027",

  // Familie & Nași (Puteți modifica numele părinților și nașilor aici)
  brideParents: "Părinții Adrianei",
  groomParents: "Părinții lui Marin",
  godparents: "Nașii Noștri Dragii",

  // Locații & Timing
  events: {
    civil: {
      time: "14:00",
      venue: "Oficiul Stării Civile / Terasa Mayoral",
      address: "Doroțcaia",
      mapUrl: "https://maps.google.com/?q=Mayoral+Dorotcaia"
    },
    church: {
      time: "16:00",
      venue: "Cununia Religioasă",
      address: "Doroțcaia",
      mapUrl: "https://maps.google.com/?q=Dorotcaia"
    },
    party: {
      time: "18:00",
      venue: "Restaurantul Mayoral, Doroțcaia",
      address: "s. Doroțcaia, r-nul Dubăsari",
      mapUrl: "https://maps.google.com/?q=Mayoral+Dorotcaia"
    }
  },

  // Contact & WhatsApp pentru RSVP
  whatsappNumber: "37360000000",
  groomPhoneDisplay: "Marin",
  groomPhoneTel: "+37360000000",
  bridePhoneDisplay: "Adriana",
  bridePhoneTel: "+37360000001"
};

const ROMANIAN_MONTHS = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
];

const ROMANIAN_MONTHS_SHORT = [
  "IANUARIE", "FEBRUARIE", "MARTIE", "APRILIE", "MAI", "IUNIE",
  "IULIE", "AUGUST", "SEPTEMBRIE", "OCTOMBRIE", "NOIEMBRIE", "DECEMBRIE"
];

/**
 * ============================================================================
 * 1. POPULARE DATE DIN CONFIGURARE + CALENDARUL LUNII
 * ============================================================================
 */
function applyWeddingConfig() {
  const c = WEDDING_CONFIG;
  const fullNames = `${c.brideName} & ${c.groomName}`;
  const wDate = new Date(c.weddingDateISO);

  document.title = `Invitație de Nuntă — ${fullNames}`;
  setText("envelope-names", fullNames);
  setText(
    "envelope-date",
    `${String(wDate.getDate()).padStart(2, "0")} . ${String(wDate.getMonth() + 1).padStart(2, "0")} . ${wDate.getFullYear()}`
  );
  setText("wax-monogram", c.monogram);
  setText("groom-name", c.groomName);
  setText("bride-name", c.brideName);
  setText("hero-day-name", c.displayDayName);
  setText("hero-full-date", c.displayDate);
  setText("hero-city", c.displayCity);

  setText("hero-day-num", String(wDate.getDate()).padStart(2, "0"));
  setText("hero-month-short", ROMANIAN_MONTHS_SHORT[wDate.getMonth()]);
  setText("hero-year-num", String(wDate.getFullYear()));

  setText("bride-parents", c.brideParents);
  setText("groom-parents", c.groomParents);
  setText("godparents", c.godparents);

  setText("civil-time", c.events.civil.time);
  setText("civil-venue", c.events.civil.venue);
  setText("civil-address", c.events.civil.address);
  setHref("civil-map-link", c.events.civil.mapUrl);

  setText("church-time", c.events.church.time);
  setText("church-venue", c.events.church.venue);
  setText("church-address", c.events.church.address);
  setHref("church-map-link", c.events.church.mapUrl);

  setText("party-time", c.events.party.time);
  setText("party-venue", c.events.party.venue);
  setText("party-venue-card", c.events.party.venue);
  setText("party-address", c.events.party.address);
  setHref("party-map-link", c.events.party.mapUrl);
  setHref("party-map-btn-card", c.events.party.mapUrl);

  setText("rsvp-deadline", c.rsvpDeadline);
  setText("groom-phone-link", c.groomPhoneDisplay);
  setHref("groom-phone-link", `tel:${c.groomPhoneTel}`);
  setText("bride-phone-link", c.bridePhoneDisplay);
  setHref("bride-phone-link", `tel:${c.bridePhoneTel}`);

  setText("footer-monogram", c.monogram);
  setText("footer-names", fullNames);
  setText("footer-date", `${c.displayDate} • Vă așteptăm cu dragoste!`);

  renderWeddingMonthCalendar(wDate);
}

function renderWeddingMonthCalendar(weddingDate) {
  const grid = document.getElementById("calendar-days-grid");
  const titleEl = document.getElementById("cal-month-title");
  if (!grid) return;

  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const targetDay = weddingDate.getDate();

  if (titleEl) {
    titleEl.textContent = `${ROMANIAN_MONTHS[month]} ${year}`;
  }

  const firstDayJS = new Date(year, month, 1).getDay();
  const startOffset = (firstDayJS + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  grid.innerHTML = "";

  for (let i = 0; i < startOffset; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "cal-day empty";
    grid.appendChild(emptyCell);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayCell = document.createElement("div");
    dayCell.className = d === targetDay ? "cal-day wedding-day" : "cal-day";
    dayCell.textContent = d;
    grid.appendChild(dayCell);
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHref(id, url) {
  const el = document.getElementById(id);
  if (el) el.href = url;
}

/**
 * ============================================================================
 * 2. DESCHIDERE LENTĂ & CINEMATICĂ A PLICULUI (FOAIA DIN PLIC ESTE ÎNSĂȘI PAGINA)
 * ============================================================================
 */
class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.step = 0;
    this.chords = [
      [293.66, 369.99, 440.00, 587.33],
      [220.00, 329.63, 440.00, 554.37],
      [246.94, 369.99, 493.88, 587.33],
      [196.00, 293.66, 392.00, 493.88],
      [293.66, 369.99, 440.00, 659.25],
      [220.00, 329.63, 392.00, 554.37]
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playNote(freq, duration = 2.6, delay = 0, volume = 0.04) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc2.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration);
    osc2.stop(now + duration);
  }

  playChime() {
    this.initContext();
    const chimeNotes = [587.33, 739.99, 880.0, 1174.66];
    chimeNotes.forEach((f, idx) => {
      this.playNote(f, 2.5, idx * 0.14, 0.052);
    });
  }

  startAmbient() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    const btn = document.getElementById("music-toggle");
    if (btn) btn.classList.add("playing");

    const playArpeggio = () => {
      if (!this.isPlaying) return;
      const chord = this.chords[this.step % this.chords.length];
      chord.forEach((freq, i) => {
        this.playNote(freq, 2.8, i * 0.42, 0.03);
      });
      this.step++;
    };

    playArpeggio();
    this.intervalId = setInterval(playArpeggio, 2200);
  }

  stopAmbient() {
    this.isPlaying = false;
    const btn = document.getElementById("music-toggle");
    if (btn) btn.classList.remove("playing");
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
  }
}

const audioEngine = new RomanticAudioEngine();

function setupEnvelopeIntro() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  const frontShell = document.getElementById("envelope-front-shell");
  const waxBtn = document.getElementById("wax-seal-btn");
  const ctaBtn = document.getElementById("open-invite-text-btn");
  const musicBtn = document.getElementById("music-toggle");

  let opened = false;

  const openEnvelope = (e) => {
    if (e) e.preventDefault();
    if (opened) return;
    opened = true;

    window.scrollTo(0, 0);

    // Faza 1 (0s - 2.35s): Se desface lent funda de dantelă și clapeta de sus se deschide foarte încet în 3D (2.5s),
    // lăsând să se vadă clar începutul paginii reale (#acasa) în interiorul plicului!
    document.body.classList.remove("envelope-closed");
    document.body.classList.add("envelope-opening-flap");
    audioEngine.playChime();

    // Faza 2 (2.35s - 5.55s): După ce clapeta cu ștampila s-a ridicat în sus, plicul devine 100% transparent
    // în timp ce pagina din plic face zoom lin până la 100% chiar în partea de sus a paginii!
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.classList.remove("envelope-opening-flap");
      document.body.classList.add("envelope-extracting-sheet");
    }, 2350);

    // Faza 3 (5.55s): Plicul a dispărut complet, iar utilizatorul se află exact sus, la începutul invitației!
    setTimeout(() => {
      document.body.classList.remove("envelope-extracting-sheet");
      document.body.classList.add("envelope-opened");
      window.scrollTo(0, 0);
      audioEngine.startAmbient();
    }, 5550);
  };

  if (frontShell) frontShell.addEventListener("click", openEnvelope);
  if (waxBtn) waxBtn.addEventListener("click", openEnvelope);
  if (ctaBtn) ctaBtn.addEventListener("click", openEnvelope);

  if (musicBtn) {
    musicBtn.addEventListener("click", () => audioEngine.toggle());
  }
}

/**
 * ============================================================================
 * 3. NUMĂRĂTOARE INVERSĂ / COOLDOWN PÂNĂ LA NUNTĂ
 * ============================================================================
 */
function setupCountdown() {
  const targetDate = new Date(WEDDING_CONFIG.weddingDateISO).getTime();
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minutesEl = document.getElementById("cd-minutes");
  const secondsEl = document.getElementById("cd-seconds");

  function updateTimer() {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * ============================================================================
 * 4. SALVARE ÎN CALENDAR (.ICS DOWNLOAD)
 * ============================================================================
 */
function setupCalendarExport() {
  const btn = document.getElementById("add-calendar-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const c = WEDDING_CONFIG;
    const startDate = new Date(c.weddingDateISO);
    const endDate = new Date(startDate.getTime() + 12 * 60 * 60 * 1000);

    const formatICSDate = (date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Invitatie Nunta//RO",
      "BEGIN:VEVENT",
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:Nunta ${c.groomName} & ${c.brideName}`,
      `DESCRIPTION:Vă așteptăm cu drag la nunta noastră! Cununia Civilă (${c.events.civil.time}), Cununia Religioasă (${c.events.church.time}) și Petrecerea la ${c.events.party.venue} (${c.events.party.time}).`,
      `LOCATION:${c.events.party.venue}, ${c.events.party.address}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `nunta-${c.groomName.toLowerCase()}-${c.brideName.toLowerCase()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

/**
 * ============================================================================
 * 5. PERLE 3D PLUTITOARE PE ECRAN (CU LUCIU AKOYA & REFLEXIE DE BIJUTERIE)
 * ============================================================================
 */
function setupFloatingPearls() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const count = window.innerWidth < 640 ? 14 : 26;
  const pearls = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 4.6 + 2.8,
    vx: (Math.random() - 0.5) * 0.22,
    vy: Math.random() * 0.28 + 0.1,
    sway: Math.random() * Math.PI * 2
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    pearls.forEach((p) => {
      p.sway += 0.015;
      p.x += p.vx + Math.sin(p.sway) * 0.14;
      p.y -= p.vy;

      if (p.y < -15) p.y = height + 15;
      if (p.x < -15) p.x = width + 15;
      if (p.x > width + 15) p.x = -15;

      // Corpul perlei 3D cu nuanțe sidefate calde (alb-rozaliu -> șampanie -> sidef)
      const grad = ctx.createRadialGradient(
        p.x - p.r * 0.32,
        p.y - p.r * 0.32,
        p.r * 0.08,
        p.x,
        p.y,
        p.r
      );
      grad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      grad.addColorStop(0.35, "rgba(253, 245, 238, 0.92)");
      grad.addColorStop(0.75, "rgba(230, 213, 195, 0.78)");
      grad.addColorStop(1, "rgba(198, 175, 150, 0.6)");

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Punctul de luciu intens (Specular Jewelry Highlight)
      ctx.beginPath();
      ctx.arc(p.x - p.r * 0.34, p.y - p.r * 0.34, p.r * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/**
 * ============================================================================
 * 6. PLOAIE DE PERLE (LA DESCHIDEREA PLICULUI ȘI LA RSVP)
 * ============================================================================
 */
function launchPearlConfetti(particleCount = 70) {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: particleCount }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 180,
    y: canvas.height * 0.45,
    vx: (Math.random() - 0.5) * 12,
    vy: -(Math.random() * 12 + 4),
    r: Math.random() * 4.5 + 2.8,
    opacity: 1
  }));

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.26;
      if (frame > 55) p.opacity -= 0.018;

      if (p.opacity > 0 && p.y < canvas.height + 25) {
        active = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);

        const grad = ctx.createRadialGradient(
          p.x - p.r * 0.3,
          p.y - p.r * 0.3,
          p.r * 0.1,
          p.x,
          p.y,
          p.r
        );
        grad.addColorStop(0, "#FFFFFF");
        grad.addColorStop(0.55, "#F9F3E8");
        grad.addColorStop(1, "#CBB89D");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
    });

    frame++;
    if (active) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

/**
 * ============================================================================
 * 7. GALERIE FOTO CU LIGHTBOX & SWIPE PE TELEFON
 * ============================================================================
 */
function setupGalleryLightbox() {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!lightbox || items.length === 0) return;
  let currentIndex = 0;
  let touchStartX = 0;

  const showImage = (index) => {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const img = item.querySelector("img");
    const cap = item.querySelector(".gallery-caption");
    if (img) lightboxImg.src = img.src;
    if (cap) lightboxCaption.textContent = cap.textContent;
    lightbox.classList.remove("hidden");
  };

  items.forEach((item, index) => {
    item.addEventListener("click", () => showImage(index));
  });

  closeBtn.addEventListener("click", () => lightbox.classList.add("hidden"));
  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.add("hidden");
  });

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) showImage(currentIndex - 1);
      else showImage(currentIndex + 1);
    }
  }, { passive: true });

  window.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("hidden")) return;
    if (e.key === "Escape") lightbox.classList.add("hidden");
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });
}

/**
 * ============================================================================
 * 8. CHESTIONARUL OASPETELUI (FĂRĂ BĂUTURI + COOLDOWN LA TRIMITERE)
 * ============================================================================
 */
function setupRSVPForm() {
  const form = document.getElementById("rsvp-form");
  const submitBtn = document.getElementById("rsvp-submit-btn");
  const attendingFields = document.getElementById("attending-fields");
  const successBox = document.getElementById("rsvp-success");
  const whatsappLink = document.getElementById("whatsapp-confirm-link");
  const resetBtn = document.getElementById("reset-rsvp-btn");
  const radios = document.querySelectorAll('input[name="attendance"]');

  if (!form) return;
  let isCooldown = false;

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "nu" && radio.checked) {
        attendingFields.classList.add("hidden");
      } else {
        attendingFields.classList.remove("hidden");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isCooldown) return;

    const nameInput = document.getElementById("guest-name");
    const phoneInput = document.getElementById("guest-phone");

    if (!nameInput.value.trim()) {
      nameInput.focus();
      return;
    }

    isCooldown = true;
    if (submitBtn) submitBtn.disabled = true;
    setTimeout(() => {
      isCooldown = false;
      if (submitBtn) submitBtn.disabled = false;
    }, 2000);

    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const guests = document.getElementById("guest-count").value;
    const kids = document.getElementById("kids-count").value;
    const menu = document.getElementById("menu-pref").value;
    const song = document.getElementById("song-request").value.trim();
    const message = document.getElementById("guest-message").value.trim();

    let waText = "";
    if (attendance === "da") {
      waText =
        `Bună, ${WEDDING_CONFIG.brideName} & ${WEDDING_CONFIG.groomName}! 🤍✨\n\n` +
        `Confirmăm cu drag prezența la nunta voastră (${WEDDING_CONFIG.displayDate})!\n` +
        `• Nume: ${name}\n` +
        `• Telefon: ${phone || "-"}\n` +
        `• Adulți: ${guests}\n` +
        `• Copii: ${kids}\n` +
        `• Meniu: ${menu}\n` +
        (song ? `• Melodie pentru dans: ${song}\n` : "") +
        (message ? `• Mesaj: ${message}` : "");
    } else {
      waText =
        `Bună, ${WEDDING_CONFIG.brideName} & ${WEDDING_CONFIG.groomName}! 🤍\n\n` +
        `Din păcate nu putem ajunge la nuntă (${name}), dar vă dorim Casă de Piatră și multă fericire!` +
        (message ? `\n\nMesaj: ${message}` : "");
    }

    const encodedText = encodeURIComponent(waText);
    whatsappLink.href = `https://wa.me/${WEDDING_CONFIG.whatsappNumber}?text=${encodedText}`;

    form.style.display = "none";
    successBox.classList.remove("hidden");
    audioEngine.playChime();
    launchPearlConfetti(80);
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      successBox.classList.add("hidden");
      form.style.display = "block";
    });
  }
}

/**
 * ============================================================================
 * 9. LINIE ONDULATĂ PROGRESIVĂ LA SCROLL (TIMING & LOCAȚII)
 * ============================================================================
 */
function setupWavyTimelineScroll() {
  const container = document.getElementById("wavy-timeline-container");
  const drawPath = document.getElementById("wavy-draw-path");
  const travellingPearl = document.getElementById("wavy-travelling-pearl");
  const stations = Array.from(document.querySelectorAll(".wave-station"));

  if (!container || !drawPath) return;

  const totalLength = drawPath.getTotalLength();
  drawPath.style.strokeDasharray = `${totalLength}`;
  drawPath.style.strokeDashoffset = `${totalLength}`;

  let targetProgress = 0;
  let currentProgress = 0;

  function computeTargetProgress() {
    const rect = container.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    // Începe să se deseneze când secțiunea intră în jumătatea de jos a ecranului
    const startTrigger = viewHeight * 0.72;
    const endTrigger = viewHeight * 0.28;
    const scrolled = startTrigger - rect.top;
    const totalScrollable = rect.height - (startTrigger - endTrigger) * 0.35;

    targetProgress = Math.max(0, Math.min(1, scrolled / Math.max(1, totalScrollable)));

    // Activăm treptat fiecare card (.wave-station) pe măsură ce ajungem la el
    stations.forEach((station) => {
      const stRect = station.getBoundingClientRect();
      if (stRect.top < viewHeight * 0.80) {
        station.classList.add("station-active");
      }
    });
  }

  function animateWave() {
    // Interpolare lină (efect mătăsos, încet și treptat)
    currentProgress += (targetProgress - currentProgress) * 0.085;

    const drawnLength = totalLength * currentProgress;
    drawPath.style.strokeDashoffset = `${(totalLength - drawnLength).toFixed(2)}`;

    if (travellingPearl && totalLength > 0) {
      const pt = drawPath.getPointAtLength(Math.max(0, Math.min(totalLength, drawnLength)));
      travellingPearl.setAttribute("cx", pt.x.toFixed(2));
      travellingPearl.setAttribute("cy", pt.y.toFixed(2));
    }

    requestAnimationFrame(animateWave);
  }

  window.addEventListener("scroll", computeTargetProgress, { passive: true });
  window.addEventListener("resize", computeTargetProgress, { passive: true });
  computeTargetProgress();
  animateWave();
}

/**
 * ============================================================================
 * 10. SCROLL REVEAL & NAVIGAȚIE ACTIVĂ
 * ============================================================================
 */
function setupScrollAnimations() {
  const reveals = document.querySelectorAll(".reveal-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));

  const sections = document.querySelectorAll("section[id]");
  const navDots = document.querySelectorAll(".nav-dot");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + window.innerHeight * 0.38;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navDots.forEach((dot) => {
          dot.classList.toggle("active", dot.dataset.section === id);
        });
      }
    });
  }, { passive: true });
}

/**
 * ============================================================================
 * INIȚIALIZARE
 * ============================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  applyWeddingConfig();
  setupEnvelopeIntro();
  setupCountdown();
  setupCalendarExport();
  setupFloatingPearls();
  setupGalleryLightbox();
  setupRSVPForm();
  setupWavyTimelineScroll();
  setupScrollAnimations();
});
