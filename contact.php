<?php
/**
 * RDT Video Downloader - Contact Page
 */

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';

$page_title = "Contact RDT Video Downloader — Support & Feedback";
$page_desc = "Get in touch with the RDT Video Downloader team for support, feature requests, partnerships, or press inquiries. We typically respond within 24 hours.";
$page_path = "/contact";

require_once __DIR__ . '/includes/header.php';
?>

<main class="min-h-screen flex flex-col flex-grow bg-white">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
            <p class="text-xl text-slate-500">
                Have a question or feedback? We&apos;d love to hear from you.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <ul class="space-y-8 list-none pl-0 m-0">
                <li class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0" aria-hidden="true">
                        <svg class="text-brand-orange w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-900 mb-1">Email Us</h3>
                        <p class="text-slate-600">support@rdtvideodownloader.com</p>
                    </div>
                </li>

                <li class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0" aria-hidden="true">
                        <svg class="text-brand-orange w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-900 mb-1">Response Time</h3>
                        <p class="text-slate-600">We typically respond within 24-48 hours.</p>
                    </div>
                </li>

                <li class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center shrink-0" aria-hidden="true">
                        <svg class="text-brand-orange w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-900 mb-1">Feedback</h3>
                        <p class="text-slate-600">Your feedback helps us make RDT Video Downloader better for everyone.</p>
                    </div>
                </li>
            </ul>

            <div class="bg-slate-50 border border-slate-200 rounded-3xl p-8">
                <!-- Success State -->
                <div id="contact-success" style="display: none;" class="text-center py-8">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="text-green-600 w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p class="text-slate-600 mb-8">
                        Thank you for reaching out. We&apos;ve received your message and will get back to you shortly.
                    </p>
                    <button type="button" id="contact-reset-btn" class="px-6 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                        Send Another
                    </button>
                </div>

                <!-- Form -->
                <form id="contact-form" action="https://formspree.io/f/mqenzvyo" method="POST" class="space-y-6">
                    <div>
                        <label htmlFor="name" class="block text-sm font-bold text-slate-900 mb-2">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            required
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-brand-orange transition-colors"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" class="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            required
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-brand-orange transition-colors"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" class="block text-sm font-bold text-slate-900 mb-2">Message</label>
                        <textarea 
                            id="message" 
                            name="message"
                            rows="4"
                            required
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-brand-orange transition-colors resize-none"
                            placeholder="How can we help?"
                        ></textarea>
                    </div>
                    
                    <div id="contact-error" style="display: none;" class="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-xl"></div>

                    <button 
                        type="submit"
                        id="contact-submit-btn"
                        class="w-full py-4 bg-brand-orange text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <span>Send Message</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</main>

<script>
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const successDiv = document.getElementById("contact-success");
    const errorDiv = document.getElementById("contact-error");
    const submitBtn = document.getElementById("contact-submit-btn");
    const resetBtn = document.getElementById("contact-reset-btn");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Sending...</span>
            `;
            errorDiv.style.display = "none";

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {
                    form.style.display = "none";
                    successDiv.style.display = "block";
                    form.reset();
                } else {
                    const resData = await response.json();
                    errorDiv.textContent = resData.error || "Submission failed. Please try again.";
                    errorDiv.style.display = "block";
                }
            } catch (err) {
                errorDiv.textContent = "Network error. Please try again.";
                errorDiv.style.display = "block";
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = "<span>Send Message</span>";
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            successDiv.style.display = "none";
            form.style.display = "block";
        });
    }
});
</script>

<?php
require_once __DIR__ . '/includes/footer.php';
?>
