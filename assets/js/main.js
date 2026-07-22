/**
 * RDT Video Downloader - General Page Initializations (Vanilla JS)
 * Handles FAQ accordion toggles and live downloading counters.
 */

(function() {
    document.addEventListener("DOMContentLoaded", () => {
        // 1. Live downloading session counter
        const sessionCountEl = document.getElementById("sessions-counter");
        if (sessionCountEl) {
            let count = 42;
            setInterval(() => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                count = Math.max(38, Math.min(64, count + change));
                
                // Fade out/in transition effect
                sessionCountEl.style.opacity = "0";
                sessionCountEl.style.transform = "translateY(5px)";
                sessionCountEl.style.transition = "all 0.2s ease";
                
                setTimeout(() => {
                    sessionCountEl.textContent = count;
                    sessionCountEl.style.opacity = "1";
                    sessionCountEl.style.transform = "translateY(0)";
                }, 200);
            }, 3000);
        }

        // 2. Setup FAQ accordions
        const faqBtns = document.querySelectorAll(".faq-btn");
        faqBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const item = btn.closest(".faq-item") || btn.parentElement;
                const panel = item ? item.querySelector(".faq-panel") : btn.nextElementSibling;
                const icon = btn.querySelector(".faq-icon");
                
                if (!panel) return;

                const isOpen = panel.style.maxHeight && panel.style.maxHeight !== "0px";

                // Close all other open panels first
                document.querySelectorAll(".faq-panel").forEach(otherPanel => {
                    if (otherPanel !== panel) {
                        otherPanel.style.maxHeight = "0px";
                        otherPanel.style.opacity = "0";
                        const otherItem = otherPanel.closest(".faq-item") || otherPanel.parentElement;
                        if (otherItem) {
                            otherItem.classList.remove("border-brand-orange", "shadow-md", "shadow-brand-orange/5");
                            otherItem.classList.add("border-slate-200");
                        }
                        const otherIcon = otherItem ? otherItem.querySelector(".faq-icon") : null;
                        if (otherIcon) {
                            otherIcon.textContent = "+";
                        }
                    }
                });

                if (isOpen) {
                    // Close
                    panel.style.maxHeight = "0px";
                    panel.style.opacity = "0";
                    if (item) {
                        item.classList.remove("border-brand-orange", "shadow-md", "shadow-brand-orange/5");
                        item.classList.add("border-slate-200");
                    }
                    if (icon) {
                        icon.textContent = "+";
                    }
                } else {
                    // Open
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    panel.style.opacity = "1";
                    if (item) {
                        item.classList.add("border-brand-orange", "shadow-md", "shadow-brand-orange/5");
                        item.classList.remove("border-slate-200");
                    }
                    if (icon) {
                        icon.textContent = "-";
                    }
                }
            });
        });

        // 3. Scroll to Top Button behavior
        const scrollToTopBtn = document.getElementById("scroll-to-top");
        if (scrollToTopBtn) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.remove("opacity-0", "pointer-events-none", "translate-y-3");
                    scrollToTopBtn.classList.add("opacity-100", "translate-y-0");
                } else {
                    scrollToTopBtn.classList.remove("opacity-100", "translate-y-0");
                    scrollToTopBtn.classList.add("opacity-0", "pointer-events-none", "translate-y-3");
                }
            });

            scrollToTopBtn.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });
        }
    });
})();
