// Always start at the top
window.scrollTo(0, 0);

// Easy timing controls (ms) – adjust these to taste
const TIMING = {
  bgInDelay:       800,  // image slide
  nameLockDelay:  2000,  // title slides to header
  navDelay:       3000,  // nav fades in
  contentDelay:   4300,  // hero text fades in
  landingOutDelay:5500   // landing overlay fully fades
};

window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  const skipIntro = params.get("skipIntro") === "1";

  // ---------- SKIP INTRO PATH (coming from images, etc.) ----------
  if (skipIntro) {
    // 1) Turn off transitions briefly so nothing "moves" into place
    document.body.classList.add("skip-transitions");

    // 2) Immediately set final state for bg, title, nav, landing overlay
    document.body.classList.add(
      "bg-in",      // background image in place
      "name-lock",  // Estrange Studio already in header
      "nav-in",     // nav visible
      "landing-out" // landing overlay gone
      // NOTE: content-in comes a bit later so it can fade
    );

    // Force layout flush
    void document.body.offsetHeight;

    // 3) Re-enable transitions for the hero content fade
    document.body.classList.remove("skip-transitions");

    // 4) Apply content-in **with no delay**
    document.body.classList.add("content-in");

    // 4) Fade in hero content, but sooner: half the original delay
    //setTimeout(() => {
    //  document.body.classList.add("content-in");
    //}, TIMING.contentDelay / 2);

    // 5) Clean up the URL so future refreshes are "fresh" loads
    const url = new URL(window.location.href);
    url.searchParams.delete("skipIntro");
    window.history.replaceState({}, "", url.toString());

    window.scrollTo(0, 0);

    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    return; // do NOT run the full intro below
  }

  // ---------- NORMAL ANIMATED INTRO ----------

  // STEP 1 – Hero background slides up
  setTimeout(() => {
    document.body.classList.add("bg-in");
    window.scrollTo(0, 0);
  }, TIMING.bgInDelay);

  // STEP 2 – Title glides from centre to header position
  setTimeout(() => {
    document.body.classList.add("name-lock");
  }, TIMING.nameLockDelay);

  // STEP 3 – Nav fades in
  setTimeout(() => {
    document.body.classList.add("nav-in");
  }, TIMING.navDelay);

  // STEP 4 – Hero text fades in later
  setTimeout(() => {
    document.body.classList.add("content-in");
  }, TIMING.contentDelay);

  // STEP 5 – Landing overlay (subtitle + “preparing”) fades away
  setTimeout(() => {
    document.body.classList.add("landing-out");
  }, TIMING.landingOutDelay);

  // Footer year (safe even if you removed the footer)
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/* =========================================
   Roman Clock - Local Time → Roman Numbers
   ========================================= */

function toRoman(num) {
  const roman = [
    ["M",1000],["CM",900],["D",500],["CD",400],
    ["C",100],["XC",90],["L",50],["XL",40],
    ["X",10],["IX",9],["V",5],["IV",4],["I",1]
  ];
  let result = "";
  for (const [r, v] of roman) {
    while (num >= v) {
      result += r;
      num -= v;
    }
  }
  return result || "N"; // For zero → use "N" (nulla, medieval roman zero)
}

function updateRomanClock() {
  const el = document.getElementById("roman-clock");
  if (!el) return;

  const now = new Date();

  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  el.textContent =
    `${toRoman(h)}:${toRoman(m)}:${toRoman(s)}`;
}

// Update immediately + every second
updateRomanClock();
setInterval(updateRomanClock, 1000);
