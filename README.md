# Layla & Adam — Wedding Invitation

A responsive, single-page wedding invitation designed for GitHub Pages.

## Included
- Animated opening envelope
- Sage-green garden wedding styling
- Countdown to 26 December 2026, 11:00 AM Malaysia time
- Google Maps search link for Villa Agam
- Google Calendar link
- RSVP form with an email-app fallback
- Continuous full-page botanical wallpaper with orchids and connected vines
- Optional background music

## Before publishing

### 1. Set the RSVP email
Open `script.js` and change:

```js
const RSVP_EMAIL = "YOUR_EMAIL@example.com";
```

to the email address where you want to receive guest RSVPs. With the default static-site setup, guests' email apps open with a pre-filled message; guests must press **Send**. The website itself does not store submissions.

For automatic online submissions, create a form at a service such as Formspree or Getform, then replace the mailto handler in `script.js` with that service's endpoint. Do not put private API keys in public GitHub files.

### 2. Add background music
Place a licensed MP3 file named `music.mp3` inside the `assets` folder:

`assets/music.mp3`

The player is already connected to that path. No audio file is included in this starter package. Use music you own or are licensed to use. If you do not add the file, the invitation still works and the music control will not play audio.

### 3. Check the venue map
The directions button opens a Google Maps search for “Villa Agam”. Before sharing the invitation, open the link and confirm it points to the exact venue. If it does not, replace the URL in `index.html` with a direct Google Maps place link.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new repository, for example `layla-adam-wedding`.
2. Choose **Public** if you want the simplest GitHub Pages setup on a free account. Do not put private guest details in this repository.
3. Upload `index.html`, `styles.css`, `script.js`, and `README.md` to the repository root. Upload the `assets` folder too if you added `music.mp3`.
   - You can use **Add file → Upload files** on GitHub.
   - Upload the actual files, not the ZIP archive itself.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Set the branch to **main** and the folder to **/(root)**, then click **Save**.
7. Wait a few minutes. The published address should look like:
   `https://YOUR-GITHUB-USERNAME.github.io/layla-adam-wedding/`
8. Open the URL on your phone and desktop to test the envelope, countdown, venue link, music, and RSVP flow.
9. If you edit files later, commit the changes; GitHub Pages will publish the update.

## Important notes
- The wedding countdown uses Malaysia time (UTC+8).
- GitHub Pages is static hosting. The included RSVP fallback opens an email draft; it does not silently submit or save a response.
- Google Fonts require an internet connection. System fonts will be used if they cannot load.
- The Google Maps link is a search, not a verified venue pin. Confirm the venue before sharing.

