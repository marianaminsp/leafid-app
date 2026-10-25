# Editing the site

Plain HTML, CSS and a little JavaScript. No framework, no build step: edit, commit, push, and GitHub Pages updates in about a minute.

| File | What it is |
|---|---|
| `index.html` | The app's short public page (also the App Store marketing URL). |
| `case.html` | Case study: the bet, Botanical Card, key elements, journey, status, contact. |
| `privacy.html` | Privacy Policy. The App Store links to this exact address: don't rename or move it. |
| `styles.css` | Shared styles, light and dark mode (follows the visitor's system setting). |
| `main.js` | Fills each page from its copy block. You shouldn't need to touch it. |
| `assets/glyphs.js` | The 11 LeafID glyphs, exported from the app's Swift code. Don't edit by hand. |
| `assets/screens/` | App screenshots for the journey in the case study. |
| `assets/photos/` | Your own plant photos for the Botanical Card. |

## Change the text
1. Open the page (`index.html` or `case.html`) and find the block that starts with `EDIT THE COPY HERE`.
2. Change the words between the quotes. Keep the quotes and the commas at the end of lines.
3. Anything written as `[TO FILL: …]` shows up highlighted on the page until you replace it.

## Add a screenshot
1. Take it on the iPhone (portrait), save it as JPG in `assets/screens/`, e.g. `assets/screens/home.jpg`.
2. In `case.html`, under `screens`, set that screen's `image: "assets/screens/home.jpg"` and write an `alt` that describes what's on the screen.
3. Keep each file under ~300 KB (on a Mac: `sips -s format jpeg -s formatOptions 82 -Z 1000 in.png --out out.jpg`) so the page stays fast.

## Use your own photo on the Botanical Card
1. Put the photo in `assets/photos/`, e.g. `assets/photos/sycamore.jpg` (portrait, under ~300 KB).
2. In `case.html`, under `card` → `species`, set `photo: "assets/photos/sycamore.jpg"` and a `photoAlt`.
3. Remove the sentence about the illustration from `card` → `note`.

## Add App Store or TestFlight links
In `case.html`, under `status`, fill in `appStore` or `testFlight` with a `label` and `href`. Empty ones are hidden. On `index.html`, change `hero` → `status` from "Coming soon to the App Store".

## GitHub Pages
Pages is free for public repositories and is already on for this repo: Settings → Pages → Deploy from a branch → **main**, folder **/ (root)**.

Keep the site files at the repository root. Moving them (for example into `/docs`) would change the Privacy Policy address the app and App Store use.

To check a change before pushing, open the page in a browser; it works straight from the file.
