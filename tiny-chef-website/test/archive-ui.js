// archive-ui.js

// TO-DO:
/* Opens/closes archive modal (x button & click outside box)
  - ensure auto-opens if URL has #archive
  - populate dish grid from archive-data.js */

(function () {
  const HASH = "#archive";

  const $ = (sel) => document.querySelector(sel);

  function escapeHTML(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function descToHTML(text) {
    return escapeHTML(text).replaceAll("\n\n", "<br><br>").replaceAll("\n", "<br>");
  }

  function openArchive({ setHash = true } = {}) {
    const modal = $("#archiveModal");
    const overlay = $("#archiveOverlay");
    const preview = $("#folder-preview");

    modal.classList.add("is-open");
    overlay.hidden = false;
    document.body.classList.add("lock-scroll");
    document.body.classList.add("archive-open");

    // Hide the folder-tab-preview once opened
    if (preview) preview.classList.add("is-hidden");

    if (setHash && window.location.hash !== HASH) {
      history.replaceState(null, "", `${window.location.pathname}${HASH}`);
    }
  }

  function closeArchive({ clearHash = true } = {}) {
    const modal = $("#archiveModal");
    const overlay = $("#archiveOverlay");
    const preview = $("#folder-preview");

    modal.classList.remove("is-open");
    document.body.classList.remove("lock-scroll");
    document.body.classList.remove("archive-open");

    // shows folder tab if modal closes again
    if (preview) preview.classList.remove("is-hidden");

    // swipe animation on close -> hides overlay
    window.setTimeout(() => {
      overlay.hidden = true;
    }, 320);

    if (clearHash && window.location.hash === HASH) {
      history.replaceState(null, "", window.location.pathname);
    }
  }

  function renderGrid() {
    const data = window.TINY_CHEF_ARCHIVE;
    if (!data || !Array.isArray(data.dishes)) return;

    const grid = $("#archiveGrid");
    if (!grid) return;

    grid.innerHTML = "";

    data.dishes.forEach((dish) => {
      const card = document.createElement("article");
      card.className = "archive-card";

      const imgSrc = dish.image || data.placeholderImage;

      function renderAllergenBadge(allergen) {
        // draws allergen symbols
        const key = String(allergen || "").trim().toLowerCase();

        if (key === "vegan") return `<span class="vegan archive-allergen">*</span>`;
        if (key === "gf") return `<span class="gf archive-allergen">**</span>`;
        if (key === "vegan-gf" || key === "veg-gf" || key === "vegangf")
          return `<span class="vegan-gf archive-allergen">+</span>`;

        return "";
      }

      const badgeHTML = renderAllergenBadge(dish.allergen);

      card.innerHTML = `
        <div class="archive-img-wrap">
          <img
            src="${escapeHTML(imgSrc)}"
            alt="${escapeHTML(dish.name)}"
            onerror="this.onerror=null;this.src='${escapeHTML(data.placeholderImage)}';"
          />
        </div>

        <details class="archive-details">
          <summary class="archive-summary">
            <span class="archive-summary__name">
              ${escapeHTML(dish.name)} ${badgeHTML}
            </span>
          </summary>
          <div class="archive-desc">
            ${descToHTML(dish.description)}
          </div>
        </details>
      `;

      grid.appendChild(card);
    });
  }

  function wireEvents() {
    const openLinks = document.querySelectorAll('a[href$="menu.html#archive"], a[href$="#archive"]');
    const overlay = $("#archiveOverlay");
    const closeBtn = $("#archiveClose");

    // if someone clicks the folder preview area, opens without refreshing
    openLinks.forEach((a) => {
      a.addEventListener("click", (e) => {
        // if already on menu, prevent jump/ opens modal
        if (window.location.pathname.includes("menu.html")) {
          e.preventDefault();
          openArchive({ setHash: true });
        }
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", () => closeArchive({ clearHash: true }));
    if (overlay) overlay.addEventListener("click", () => closeArchive({ clearHash: true }));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeArchive({ clearHash: true });
    });

    // auto-open from deep link
    if (window.location.hash === HASH) openArchive({ setHash: false });
  }

  window.addEventListener("DOMContentLoaded", () => {
    renderGrid();
    wireEvents();
  });

  //can manually edits hash while staying on page
  window.addEventListener("hashchange", () => {
    if (window.location.hash === HASH) openArchive({ setHash: false });
  });
})();
