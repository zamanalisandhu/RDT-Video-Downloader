<!-- RDT Downloader Tool Component (100% Original Tailwind Visuals) -->
<div class="w-full max-w-3xl mx-auto space-y-4">
    <!-- Input Box Form -->
    <form id="rdt-form" class="relative w-full max-w-2xl mx-auto group">
        <!-- Premium glow backdrop -->
        <div class="absolute -inset-1.5 bg-gradient-to-r from-[#FF4500]/12 via-orange-400/5 to-[#0079D3]/12 rounded-[24px] blur-xl opacity-30 group-hover:opacity-45 transition duration-500 pointer-events-none" aria-hidden="true"></div>
        
        <!-- Unified clean input container -->
        <div class="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white rounded-[20px] p-2 border border-slate-200/90 focus-within:border-[#FF4500]/50 focus-within:ring-4 focus-within:ring-[#FF4500]/8 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.03)]">
            
            <!-- Left Side: Icon & Input Field -->
            <div class="flex items-center flex-1 gap-2.5 px-3 py-1 sm:py-0">
                <svg class="text-[#0079D3] shrink-0 opacity-85 w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                
                <input
                    id="rdt-url-input"
                    type="url"
                    placeholder="Paste Reddit link here..."
                    aria-label="Paste Reddit URL here"
                    class="flex-1 min-w-0 text-sm sm:text-base text-slate-800 bg-transparent outline-none placeholder:text-slate-400/80 disabled:opacity-50 font-medium"
                />

                <!-- Quick Actions (Clear or Paste) -->
                <div class="flex items-center gap-1.5 shrink-0">
                    <button
                        type="button"
                        id="rdt-clear-btn"
                        style="display: none;"
                        aria-label="Clear input URL"
                        class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                    
                    <button
                        type="button"
                        id="rdt-paste-btn"
                        class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-[#FF4500]/5 text-slate-500 hover:text-[#FF4500] rounded-lg text-xs font-bold transition-all border border-slate-200/60 hover:border-[#FF4500]/20"
                        aria-label="Paste URL from clipboard"
                    >
                        <svg class="w-[12px] h-[12px]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                        <span>Paste</span>
                    </button>
                </div>
            </div>

            <!-- CTA Submit Button -->
            <button
                type="submit"
                id="rdt-fetch-btn"
                class="relative overflow-hidden group/btn px-7 py-3.5 sm:py-3.5 bg-gradient-to-r from-[#FF4500] to-[#ff6b35] hover:from-[#ff5714] hover:to-[#ff8152] text-white font-extrabold rounded-xl transition-all active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 shadow-md shadow-[#FF4500]/15 hover:shadow-[#FF4500]/25 flex items-center justify-center gap-2 shrink-0 sm:min-w-[130px]"
            >
                <svg class="w-[15px] h-[15px] text-white/95 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L13 21l-2.286-6.857L5 12l5.714-2.286L13 3z"/></svg>
                <span class="text-sm font-bold">Get Video</span>
            </button>
        </div>
    </form>

    <!-- Steps Progress Bar Component (100% Original Tailwind UI) -->
    <div id="rdt-steps-container" style="display: none;" class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_4px_16px_rgb(0,0,0,0.01)] space-y-4 max-w-2xl mx-auto">
        <div class="flex items-center gap-2 text-sm font-extrabold text-slate-900 border-b border-slate-50 pb-2.5">
            <svg class="animate-spin text-brand-orange shrink-0 w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <span>Download Progress</span>
        </div>
        
        <div class="space-y-4">
            <!-- Step 1 -->
            <div class="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span class="text-slate-500">1. Fetching Reddit Metadata</span>
                <span>
                    <span class="text-emerald-500 flex items-center gap-1 font-bold">
                        <svg class="w-3.5 h-3.5 fill-emerald-50" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> 
                        Done
                    </span>
                </span>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between text-xs sm:text-sm font-semibold">
                    <span id="rdt-step-2-text" class="text-slate-900 font-bold">2. Extracting Video & Audio Streams</span>
                    <span id="rdt-step-2-status">
                        <span class="text-brand-orange animate-pulse flex items-center gap-1">
                            <svg class="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
                            In Progress...
                        </span>
                    </span>
                </div>
                <div id="rdt-progress-bar" style="display: none;" class="bg-slate-100 rounded-full h-1.5 overflow-hidden w-full">
                    <div id="rdt-progress-fill" class="h-full bg-brand-orange transition-all duration-100 rounded-full" style="width: 0%;"></div>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span class="text-slate-400 font-medium">3. Muxing streams into HD MP4</span>
                <span>
                    <span class="text-slate-400 font-medium">Waiting...</span>
                </span>
            </div>
        </div>
    </div>

    <!-- Analyzing Spinner -->
    <div id="rdt-loader" style="display: none;" class="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-[0_4px_16px_rgb(0,0,0,0.01)] text-center max-w-2xl mx-auto">
        <svg class="animate-spin text-brand-orange shrink-0 w-8 h-8 mx-auto mb-3" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <p class="text-sm font-semibold text-slate-600">Analyzing Reddit link...</p>
    </div>

    <!-- Error Alert Box -->
    <div id="rdt-error" style="display: none;" class="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 max-w-2xl mx-auto text-sm font-semibold">
        <svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        <span id="rdt-error-msg">Please enter a valid Reddit URL</span>
    </div>

    <!-- Dynamic Download Result Output -->
    <div id="rdt-result" style="display: none;"></div>
</div>
