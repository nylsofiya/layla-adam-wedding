// Layla & Adam wedding invitation interactions
// Set the RSVP_EMAIL below to the email address that should receive guest replies.
// This static-site fallback opens the guest's email app. For automatic form collection,
// replace handleRsvp() with a Formspree / Getform / Google Forms integration.

const RSVP_EMAIL = "nyl.sofiya@gmail.com"; // TODO: replace with the couple's RSVP email
const WEDDING_DATE = new Date("2026-12-26T11:00:00+08:00");

const envelopeScreen = document.getElementById("envelopeScreen");
const invitation = document.getElementById("invitation");
const openButton = document.getElementById("openInvitation");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const rsvpForm = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");

let musicPlaying = false;

openButton.addEventListener("click", async () => {
  if (openButton.classList.contains("opened")) return;
  openButton.classList.add("opened");
  openButton.setAttribute("aria-expanded", "true");

  window.setTimeout(() => {
    envelopeScreen.classList.add("hidden");
    invitation.classList.remove("hidden");
    musicToggle.hidden = false;
    invitation.setAttribute("tabindex", "-1");
    invitation.focus({ preventScroll: true });
    document.body.style.background = "#f8f6ef";
  }, 850);

  // Audio begins only after this user interaction, subject to browser settings.
  try {
    await music.play();
    setMusicState(true);
  } catch (error) {
    setMusicState(false);
    musicLabel.textContent = "Music ready";
  }
});

musicToggle.addEventListener("click", async () => {
  if (musicPlaying) {
    music.pause();
    setMusicState(false);
    return;
  }
  try {
    await music.play();
    setMusicState(true);
  } catch (error) {
    setMusicState(false);
    musicLabel.textContent = "Add music.mp3";
  }
});

function setMusicState(isPlaying) {
  musicPlaying = isPlaying;
  musicToggle.classList.toggle("playing", isPlaying);
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicLabel.textContent = isPlaying ? "Music on" : "Music off";
}

function updateCountdown() {
  const now = new Date();
  const remaining = WEDDING_DATE.getTime() - now.getTime();
  const values = {
    days: Math.max(0, Math.floor(remaining / 86400000)),
    hours: Math.max(0, Math.floor((remaining % 86400000) / 3600000)),
    minutes: Math.max(0, Math.floor((remaining % 3600000) / 60000)),
    seconds: Math.max(0, Math.floor((remaining % 60000) / 1000))
  };
  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = String(value).padStart(2, "0");
  });
  const caption = document.getElementById("countdownCaption");
  if (caption && remaining <= 0) caption.textContent = "Today is the day — let’s celebrate!";
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(rsvpForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const attendance = String(data.get("attendance") || "");
  const guests = String(data.get("guests") || "1");
  const note = String(data.get("note") || "").trim();

  if (!name || !attendance) {
    formMessage.textContent = "Please enter your name and attendance response.";
    return;
  }

  if (RSVP_EMAIL === "nyl.sofiya@gmail.com") {
    formMessage.textContent = "Before using RSVP, the couple needs to add their email address in script.js. Your response has not been sent yet.";
    return;
  }

  const subject = encodeURIComponent(`Wedding RSVP — ${name}`);
  const body = encodeURIComponent(
    `Layla & Adam Wedding RSVP\n\nName: ${name}\nEmail: ${email || "Not provided"}\nAttendance: ${attendance}\nNumber of guests: ${guests}\nNote / dietary requirements: ${note || "None"}\n\nWedding date: 26 December 2026, 11 AM–4 PM\nVenue: Villa Agam`
  );
  formMessage.textContent = "Your email app should open with your RSVP. Please press Send in that app to complete your reply.";
  window.location.href = `mailto:${RSVP_EMAIL}?subject=${subject}&body=${body}`;
});
