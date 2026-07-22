/**
 * RDT Video Downloader - Theme & Interface Script
 * Handles mobile drawer and interface responsiveness toggles.
 */

(function() {
    document.addEventListener("DOMContentLoaded", () => {
        const toggle = document.getElementById("mobile-menu-toggle");
        const openIcon = document.getElementById("menu-open-icon");
        const closeIcon = document.getElementById("menu-close-icon");
        const drawer = document.getElementById("mobile-drawer");
        const drawerContent = document.getElementById("mobile-drawer-content");

        if (toggle && drawer && drawerContent) {
            function openDrawer() {
                drawer.classList.remove("hidden");
                // Allow browser to register removal of hidden class first
                setTimeout(() => {
                    drawer.style.opacity = "1";
                    drawerContent.style.transform = "translateX(0)";
                }, 10);
                if (openIcon) openIcon.classList.add("hidden");
                if (closeIcon) closeIcon.classList.remove("hidden");
                document.body.style.overflow = "hidden";
            }

            function closeDrawer() {
                drawerContent.style.transform = "translateX(100%)";
                drawer.style.opacity = "0";
                setTimeout(() => {
                    drawer.classList.add("hidden");
                }, 300);
                if (openIcon) openIcon.classList.remove("hidden");
                if (closeIcon) closeIcon.classList.add("hidden");
                document.body.style.overflow = "unset";
            }

            toggle.addEventListener("click", () => {
                const isOpen = !drawer.classList.contains("hidden");
                if (isOpen) {
                    closeDrawer();
                } else {
                    openDrawer();
                }
            });

            drawer.addEventListener("click", (e) => {
                if (e.target === drawer) {
                    closeDrawer();
                }
            });
        }
    });
})();
