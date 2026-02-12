// --------- HOURS POP UP ---------
document.addEventListener("DOMContentLoaded", () => {
    const clockBtn = document.getElementById("clock-container");
    const popover = document.getElementById("hoursOverlay");
    const closeBtn = popover?.querySelector(".hours-close");

    if (!clockBtn || !popover || !closeBtn) return;

    function placePopover() {
        const stage = clockBtn.closest(".immersive-view");
        const stageRect = stage.getBoundingClientRect();
        const btnRect = clockBtn.getBoundingClientRect();

        // position: below + slightly right of the button
        const left = (btnRect.left - stageRect.left) + btnRect.width * 0.65;
        const top  = (btnRect.bottom - stageRect.top) + 10;

        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;

        // keep inside the stage bounds
        const popRect = popover.getBoundingClientRect();
        const maxLeft = stage.clientWidth - popover.offsetWidth - 12;

        if (left > maxLeft) popover.style.left = `${maxLeft}px`;
        if (top + popover.offsetHeight > stage.clientHeight) {
            // if it would go off bottom, flip above the clock
            const aboveTop = (btnRect.top - stageRect.top) - popover.offsetHeight - 10;
            popover.style.top = `${Math.max(12, aboveTop)}px`;
            }
        }

    function openPopover() {
        placePopover();
        popover.classList.add("is-open");
        popover.setAttribute("aria-hidden", "false");
        clockBtn.setAttribute("aria-expanded", "true");
    }

    function closePopover() {
        popover.classList.remove("is-open");
        popover.setAttribute("aria-hidden", "true");
        clockBtn.setAttribute("aria-expanded", "false");
    }

    clockBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = popover.classList.contains("is-open");
        isOpen ? closePopover() : openPopover();
    });

    closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closePopover();
    });

    // close when clicking anywhere outside the popover + clock
    document.addEventListener("click", (e) => {
        if (!popover.classList.contains("is-open")) return;
        if (popover.contains(e.target) || clockBtn.contains(e.target)) return;
            closePopover();
    });

    // close on escape
     window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closePopover();
    });

    // reposition on resize
    window.addEventListener("resize", () => {
        if (popover.classList.contains("is-open")) placePopover();
        });
});
// --------- jukebox sound --------
  document.addEventListener("DOMContentLoaded", () => {
    const jukeboxBtn = document.getElementById("jukebox-container");
    const audio = document.getElementById("jukebox-audio");

    if (!jukeboxBtn || !audio) return;

    jukeboxBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        jukeboxBtn.classList.add("is-playing");
        jukeboxBtn.setAttribute("aria-pressed", "true");
      } else {
        audio.pause();
        jukeboxBtn.classList.remove("is-playing");
        jukeboxBtn.setAttribute("aria-pressed", "false");
      }
    });
  });

// --------- scroll text effect --------
document.addEventListener("DOMContentLoaded", () => {
    const scrollText = document.querySelector(".scroll-text");
    if (!scrollText) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollText.classList.add("is-playing");
          obs.unobserve(scrollText); // start once,inifinte scroll
        }
      });
        threshold: 0.3  // start when ~30% visible
      }
    );

    observer.observe(scrollText);
  });