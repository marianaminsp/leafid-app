<p align="center"><img src="icon.png" width="96" height="96" alt="LeafID app icon"></p>

<h1 align="center">LeafID</h1>
<p align="center"><b>A pocket botanist for every walk.</b><br>
An iPhone app that names the plant in front of you, tells you its story, and keeps every find in your Herbarium.</p>

<p align="center"><a href="https://marianaminsp.github.io/leafid-app/"><b>Visit the site →</b></a></p>

---

LeafID is designed and built by **Mariana Minafro Spinelli**: product decisions, design and the SwiftUI build, with Claude Code. The app's source is private. This repository holds its public website.

## Pages

| Page | What you'll find |
|---|---|
| **[LeafID](https://marianaminsp.github.io/leafid-app/)** | The app's page: what it does, in its own voice. |
| **[Case study](https://marianaminsp.github.io/leafid-app/case.html)** | The bet, the Botanical Card and key elements, five strategic calls, craft, what I'd do differently, status. |
| **[How it's built](https://marianaminsp.github.io/leafid-app/build.html)** | How I work and how I use Claude Code. |
| ↳ [Design system](https://marianaminsp.github.io/leafid-app/build.html#design-system) | Colours, type, radius, spacing, buttons and glyphs, taken from the app's Swift code. |
| **[Privacy Policy](https://marianaminsp.github.io/leafid-app/privacy.html)** | What the app collects and why. Linked from the app and the App Store. |

**Contact:** [mariana.minafro@gmail.com](mailto:mariana.minafro@gmail.com) · [LinkedIn](https://www.linkedin.com/in/marianaminafrosp/)

---

## Editing the site

Plain HTML, CSS and a little JavaScript. No framework, no build step: edit, commit, push, and GitHub Pages updates in about a minute.

| File | What it is |
|---|---|
| `index.html` | The app's short public page (also the App Store marketing URL). **All its text is in the `EDIT THE COPY HERE` block at the top.** |
| `case.html` | Case study. Same kind of copy block. |
| `build.html` | How it's built. Same kind of copy block, plus the design tokens. |
| `privacy.html` | Privacy Policy. The App Store links to this exact address: don't rename or move it. |
| `styles.css` | Shared styles, light and dark mode (follows the visitor's system setting). |
| `main.js` | Fills each page from its copy block. You shouldn't need to touch it. |
| `assets/glyphs.js` | The 11 LeafID glyphs, exported from the app's Swift code. Don't edit by hand. |
| `assets/screens/` | App screenshots for the Overview page. |

### Change the text
1. Open `index.html` (or `build.html`) and find the block that starts with `EDIT THE COPY HERE`.
2. Change the words between the quotes. Keep the quotes and the commas at the end of lines.
3. Anything written as `[TO FILL: …]` shows up highlighted on the page until you replace it.

### Add a screenshot
1. Export it from the iPhone as PNG (portrait, any recent iPhone size) and put it in `assets/screens/`, e.g. `assets/screens/home.png`.
2. In `index.html`, under `screens`, set that screen's `image: "assets/screens/home.png"` and write an `alt` that describes what's on the screen.
3. Keep each file under ~300 KB (export as PNG, then run it through a compressor like TinyPNG) so the page stays fast.

### Add App Store or TestFlight links
In `index.html`, under `status`, fill in `appStore` or `testFlight` with a `label` and `href`. Empty ones are hidden.

### If the app's design system changes
The tokens in `build.html` mirror `LeafID-native/Theme/Theme.swift` and its generated spec `docs/DESIGN_SYSTEM.md`. Update the `tokens` block to match.

## GitHub Pages

Pages is free for public repositories and is **already on** for this repo:

- Settings → Pages → *Build and deployment* → Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)**.
- Address: https://marianaminsp.github.io/leafid-app/

Keep the site files at the repository root. Moving them (for example into `/docs`) would change the Privacy Policy address the app and App Store use.

To check a change before pushing, open `index.html` in a browser; it works straight from the file.
