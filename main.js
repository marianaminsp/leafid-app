// LeafID site: fills each page from its COPY block (top of index.html / build.html).
// No framework, no build step. Copy is written by the site owner, so inline <a>/<em> in it is allowed.
(function () {
  "use strict";

  var COPY = window.COPY || {};
  var GLYPHS = window.LEAFID_GLYPHS || {};

  // "[TO FILL: …]" in the copy is highlighted so missing facts can't slip through unnoticed.
  function rich(text) {
    return String(text == null ? "" : text).replace(/\[TO FILL[^\]]*\]/g, function (m) {
      return '<span class="todo">' + m + "</span>";
    });
  }

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, COPY);
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function glyph(name, label) {
    var g = GLYPHS[name];
    if (!g) return "";
    var a11y = label ? 'role="img" aria-label="' + label + '"' : 'aria-hidden="true"';
    return '<svg viewBox="' + g.viewBox + '" fill="currentColor" ' + a11y + ">" + g.body + "</svg>";
  }

  // Plain text slots: <h1 data-copy="hero.title"></h1>
  document.querySelectorAll("[data-copy]").forEach(function (n) {
    var v = get(n.getAttribute("data-copy"));
    if (v != null) n.innerHTML = rich(v);
  });

  // Links: <a data-link="hero.primary"> with { label, href }
  document.querySelectorAll("[data-link]").forEach(function (n) {
    var v = get(n.getAttribute("data-link"));
    if (!v || !v.href) { n.remove(); return; }
    n.innerHTML = rich(v.label);
    n.setAttribute("href", v.href);
    if (/^https?:/.test(v.href)) n.setAttribute("rel", "noopener");
  });

  // A species "photo": the user's photo if given, otherwise its colour signature with its glyph.
  function art(sp, cls) {
    var c = sp.colors || ["#2E5E2E", "#5A7A2E", "#1C2116"];
    var bg = "background:radial-gradient(120% 90% at 30% 20%, " + c[1] + " 0%, transparent 55%)," +
      "radial-gradient(100% 80% at 80% 90%, " + c[2] + " 0%, transparent 60%)," + c[0];
    var inner = sp.photo ? '<img src="' + sp.photo + '" alt="' + (sp.photoAlt || "") + '" loading="lazy" decoding="async">' : glyph(sp.glyph);
    return '<div class="' + (cls || "specimen-art") + '" style="' + bg + '">' + inner + "</div>";
  }

  var renderers = {
    plate: function (root, items) {
      var grid = el("div", { class: "plate-grid" });
      items.forEach(function (name, i) {
        grid.appendChild(el("div", { class: "plate-cell" + (i === 0 ? " big" : "") }, glyph(name)));
      });
      root.appendChild(grid);
    },

    features: function (root, items) {
      var ul = el("ul", { class: "features" });
      items.forEach(function (f, i) {
        ul.appendChild(el("li", null,
          '<span class="kicker">0' + (i + 1) + (f.kicker ? " · " + rich(f.kicker) : "") + "</span><h3>" + rich(f.title) + "</h3><p>" + rich(f.text) + "</p>"));
      });
      root.appendChild(ul);
    },

    screens: function (root, items) {
      var ul = el("ul", { class: root.hasAttribute("data-strip") ? "strip" : "screens" });
      items.forEach(function (s) {
        var li = el("li");
        var fig = el("figure", { class: "screen" });
        var frame;
        if (s.image) {
          frame = el("div", { class: "phone" });
          var img = el("img", { src: s.image, alt: s.alt || s.title, loading: "lazy", decoding: "async", width: "1125", height: "2436" });
          frame.appendChild(img);
        } else {
          frame = el("div", { class: "phone placeholder", role: "img", "aria-label": "Screenshot of " + s.title + " coming soon" },
            glyph("simpleLeaf") + "<span>Screenshot coming</span>");
        }
        fig.appendChild(frame);
        fig.appendChild(el("figcaption", null, "<b>" + rich(s.title) + "</b><span>" + rich(s.why) + "</span>"));
        li.appendChild(fig);
        ul.appendChild(li);
      });
      root.appendChild(ul);
    },

    facts: function (root, items) {
      var wrap = el("div", { class: "facts" });
      items.forEach(function (f) {
        var body = Array.isArray(f.text)
          ? "<ul>" + f.text.map(function (t) { return "<li>" + rich(t) + "</li>"; }).join("") + "</ul>"
          : "<p>" + rich(f.text) + "</p>";
        wrap.appendChild(el("div", { class: "fact" }, "<h3>" + rich(f.title) + "</h3>" + body));
      });
      root.appendChild(wrap);
    },

    decisions: function (root, items) {
      var ol = el("ol", { class: "decisions" });
      items.forEach(function (d) {
        ol.appendChild(el("li", { class: "decision" },
          "<h3>" + rich(d.title) + "</h3><p>" + rich(d.decision) + "</p>" +
          "<dl><div><dt>Why</dt><dd>" + rich(d.why) + "</dd></div>" +
          "<div><dt>Trade-off</dt><dd>" + rich(d.tradeoff) + "</dd></div></dl>" +
          (d.evidence ? '<p class="evidence">' + rich(d.evidence) + "</p>" : "")));
      });
      root.appendChild(ol);
    },

    steps: function (root, items) {
      var ol = el("ol", { class: "steps" });
      items.forEach(function (s) {
        ol.appendChild(el("li", null, "<b>" + rich(s.title) + "</b><span>" + rich(s.text) + "</span>"));
      });
      root.appendChild(ol);
    },

    craft: function (root, items) {
      var ul = el("ul", { class: "craft" });
      items.forEach(function (c) {
        ul.appendChild(el("li", null,
          '<span class="k">' + rich(c.label) + "</span><h3>" + rich(c.title) + "</h3><ul>" +
          c.points.map(function (p) { return "<li>" + rich(p) + "</li>"; }).join("") + "</ul>"));
      });
      root.appendChild(ul);
    },

    metrics: function (root, items) {
      var ol = el("ol", { class: "funnel" });
      items.forEach(function (m) {
        ol.appendChild(el("li", null, "<b>" + rich(m.moment) + "</b><code>" + m.event + "</code><span>" + rich(m.question) + "</span>"));
      });
      root.appendChild(ol);
    },

    // ----- showcase -----
    card: function (root, sp) {
      var swatches = (sp.colors || []).map(function (h) { return '<span><i style="background:' + h + '"></i>' + h + "</span>"; }).join("");
      var panels = (sp.panels || []).map(function (p, i) {
        return '<div class="panel' + (i === 0 ? " quote" : "") + '"><h4>' + rich(p.title) + "</h4><p>" + rich(p.text) + "</p></div>";
      }).join("");
      var btn = el("button", { class: "flip", type: "button", "aria-pressed": "false", "aria-label": "Botanical Card for " + sp.common + ". Flip the card." });
      btn.innerHTML =
        '<div class="flip-inner">' +
          '<div class="face front">' + art(sp) +
            '<span class="rarity">' + rich(sp.rarity) + '</span><span class="flip-hint" aria-hidden="true">↻</span>' +
            '<div class="front-text"><span class="common">' + rich(sp.common) + '</span><span class="sci">' + rich(sp.scientific) +
            '</span><span class="where">' + rich(sp.found) + "</span></div></div>" +
          '<div class="face back app" aria-hidden="true"><div class="back-body">' +
            '<div class="back-head">' + art(sp, "thumb") + "<div><b>" + rich(sp.scientific) + "</b><small>" + rich(sp.common).toUpperCase() +
            "</small>" + (sp.known ? '<span class="known">Known as “' + rich(sp.known) + "”</span>" : "") + "</div></div>" +
            panels +
            '<div class="panel"><h4>Colour Signature</h4><div class="swatches-row">' + swatches + "</div></div>" +
          "</div></div>" +
        "</div>";
      var front = btn.querySelector(".front"), back = btn.querySelector(".back");
      function flip() {
        var on = btn.getAttribute("aria-pressed") !== "true";
        btn.setAttribute("aria-pressed", String(on));
        front.setAttribute("aria-hidden", String(on));
        back.setAttribute("aria-hidden", String(!on));
      }
      btn.addEventListener("click", flip);
      root.appendChild(btn);
    },

    rows: function (root, items) {
      var box = el("div", { class: "rows" });
      items.forEach(function (sp) {
        box.appendChild(el("div", { class: "hrow" }, art(sp, "thumb") +
          "<div><b>" + rich(sp.common) + "</b><span><em>" + rich(sp.when) + "</em></span><span>" + rich(sp.where) + "</span></div>"));
      });
      root.appendChild(box);
    },

    ladder: function (root, items) {
      var ul = el("ul", { class: "ladder" });
      items.forEach(function (r) {
        ul.appendChild(el("li", r.on ? { class: "on" } : null,
          '<span class="medal">' + glyph(r.glyph) + "</span><div><b>" + rich(r.name) + "</b><span>" + rich(r.range) + "</span></div>"));
      });
      root.appendChild(ul);
    },

    achievements: function (root, items) {
      var box = el("div", { class: "ach" });
      items.forEach(function (a) {
        box.appendChild(el("div", null, "<i>" + glyph(a.glyph) + "</i><div><b>" + rich(a.title) + "</b><span>" + rich(a.text) + "</span></div>"));
      });
      root.appendChild(box);
    },

    glyph: function (root, name) { root.innerHTML = glyph(name); },

    callouts: function (root, items) {
      var ol = el("ol", { class: "callouts" });
      items.forEach(function (c) { ol.appendChild(el("li", null, "<b>" + rich(c.title) + "</b><span>" + rich(c.text) + "</span>")); });
      root.appendChild(ol);
    },

    timeline: function (root, items) {
      var ul = el("ul", { class: "timeline" });
      items.forEach(function (t) { ul.appendChild(el("li", t.done ? { class: "done" } : null, "<span>" + rich(t.text) + "</span>")); });
      root.appendChild(ul);
    },

    // ----- build page -----
    colors: function (root, items) {
      var ul = el("ul", { class: "swatches" });
      items.forEach(function (c) {
        ul.appendChild(el("li", { class: "swatch" },
          '<div class="chip" style="background:' + c.hex + ";color:" + (c.dark ? "#F2F5E7" : "#121212") + '">' + (c.ratio || "") + "</div>" +
          '<div class="meta"><code>' + c.role + '</code><span class="hex">' + c.hex + "</span><p>" + rich(c.use) + "</p></div>"));
      });
      root.appendChild(ul);
    },

    type: function (root, items) {
      var box = el("div", { class: "app-surface typespec" });
      items.forEach(function (t) {
        var style = "font-family:" + (t.family === "Manrope" ? "var(--font-text)" : "var(--font-display)") +
          ";font-size:" + t.size + "px;font-weight:" + t.weight + ";letter-spacing:" + (t.tracking || 0) + "px;color:" + t.color;
        box.appendChild(el("div", { class: "row" },
          '<div style="' + style + '">' + rich(t.sample) + '</div><div class="spec"><code>' + t.name + "</code> · " +
          t.family + " " + t.size + " · " + t.weightName + (t.tracking ? " · tracking " + t.tracking : "") + "</div>"));
      });
      root.appendChild(box);
    },

    spacing: function (root, items) {
      var box = el("div", { class: "scale" });
      items.forEach(function (s) {
        box.appendChild(el("div", { class: "row" },
          "<code>" + s.name + " · " + s.pt + "</code>" + '<div class="bar" style="width:' + s.pt * 4 + 'px;max-width:100%"></div>'));
      });
      root.appendChild(box);
    },

    radius: function (root, items) {
      var box = el("div", { class: "radii" });
      items.forEach(function (r) {
        box.appendChild(el("div", { class: "radius" },
          '<div class="box" style="border-top-left-radius:' + r.pt + 'px"></div><code>' + r.name + " · " + r.pt + "</code><span>" + rich(r.use) + "</span>"));
      });
      root.appendChild(box);
    },

    glyphs: function (root, items) {
      var ul = el("ul", { class: "glyphs" });
      items.forEach(function (name) { ul.appendChild(el("li", null, glyph(name, name) + "<code>" + name + "</code>")); });
      root.appendChild(ul);
    },

    adr: function (root, items) {
      var ul = el("ul", { class: "adr" });
      items.forEach(function (a) {
        ul.appendChild(el("li", null, "<code>" + a.id + "</code><b>" + rich(a.title) + "</b><span>" + rich(a.text) + "</span>"));
      });
      root.appendChild(ul);
    }
  };

  // Lists: <div data-render="features" data-from="features"></div>
  document.querySelectorAll("[data-render]").forEach(function (n) {
    var fn = renderers[n.getAttribute("data-render")];
    var data = get(n.getAttribute("data-from") || n.getAttribute("data-render"));
    if (fn && data) fn(n, data);
  });

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
