<!-- Scoped Downloader Block Container -->
<div class="rdt-block-container">
    <!-- Input Bar Row -->
    <div class="rdt-input-row">
        <!-- Blue Link Icon -->
        <div class="rdt-link-icon-container">
            <svg style="width: 15px; height: 15px; display: block;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
        </div>
        
        <!-- Input Text Field -->
        <input type="url" id="reddit-url" 
               placeholder="Paste Reddit post link here..." 
               class="rdt-input-element">
        
        <!-- Inline Actions -->
        <div class="rdt-action-wrapper">
            <!-- Clear Button -->
            <button type="button" id="clear-btn" style="display: none;" class="rdt-clear-cross-btn" title="Clear input">
                <svg style="width: 14px; height: 14px; display: block;" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            
            <!-- Paste Button -->
            <button type="button" id="paste-btn" class="rdt-paste-btn" title="Paste from clipboard">
                <svg style="width: 12px; height: 12px; display: block;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                <span>Paste</span>
            </button>
        </div>
        
        <!-- Get Video Button -->
        <button type="button" id="fetch-btn" class="rdt-get-btn">
            <svg style="width: 15px; height: 15px; display: block;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813zM19.071 4.929l-.354 2.217-.353-2.217L16.146 4.5l2.218-.354.354-2.217.353 2.217L21.282 4.5l-2.211.429z"/>
            </svg>
            <span>Get Video</span>
        </button>
    </div>

    <!-- Error Card -->
    <div id="error-card" style="display: none;" class="rdt-error-card">
        <div class="rdt-error-icon-box">
            <svg style="width: 20px; height: 20px; display: block;" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        </div>
        <div class="rdt-error-info">
            <span class="rdt-error-title">Unable to Fetch Details</span>
            <span id="error-text" class="rdt-error-desc">Failed to fetch video details. Please verify the URL.</span>
        </div>
    </div>

    <!-- Loader -->
    <div id="loader" style="display: none;" class="rdt-loader">
        <div class="rdt-loader-spinner-box">
            <div class="rdt-loader-spin"></div>
            <div class="rdt-loader-dot"></div>
        </div>
        <p class="rdt-loader-text">Extracting media info...</p>
    </div>

    <!-- Result Box Card (Clean Web3 Style) -->
    <div id="result-box" class="rdt-result-card">
        <!-- Top Progress Loading Bar -->
        <div id="download-progress-bar" style="display: none;" class="rdt-progress-bar-container">
            <div id="download-progress-fill" class="rdt-progress-bar-fill"></div>
        </div>
        <!-- Media Ready Success Badge -->
        <div class="rdt-success-badge">
            <svg style="width: 14px; height: 14px; display: block;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Media ready to download</span>
        </div>

        <!-- Media Details Row -->
        <div class="rdt-preview-row">
            <!-- Thumbnail Box -->
            <div class="rdt-preview-thumb-box">
                <img id="media-thumb" src="" alt="Thumbnail" class="rdt-preview-thumb-img">
                <span id="duration-badge" style="display: none;" class="rdt-preview-duration">0:00</span>
            </div>
            
            <!-- Metadata Info -->
            <div class="rdt-preview-info">
                <h3 id="media-title" class="rdt-preview-title">Video Title</h3>
                <div class="rdt-preview-meta">
                    <span id="media-meta">u/author</span>
                    <span>·</span>
                    <span id="media-subreddit" class="rdt-preview-sub">r/subreddit</span>
                </div>
            </div>
        </div>

        <!-- Qualities Section -->
        <div id="qualities-block" class="rdt-qualities-section">
            <h4 class="rdt-qualities-title">Select Quality format</h4>
            <div id="qualities-grid" class="rdt-qualities-grid">
                <!-- Dynamic quality option buttons -->
            </div>
        </div>

        <!-- Single Media Section (images/gifs) -->
        <div id="single-media-block" class="rdt-single-media-section" style="display: none;">
            <a id="single-media-link" href="" target="_blank" rel="noopener" download class="rdt-single-media-link">
                <span>Download Media File</span>
                <svg style="width: 18px; height: 18px; display: block;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </a>
        </div>

        <!-- Action Buttons Row -->
        <div class="rdt-action-grid">
            <!-- Download Best Quality -->
            <button type="button" id="best-dl-btn" class="rdt-dl-best-btn">
                <svg style="width: 18px; height: 18px; display: block;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                <span>Download Best Quality</span>
            </button>
            
            <!-- Download Another -->
            <button type="button" id="reset-btn" class="rdt-dl-another-btn">
                <svg style="width: 18px; height: 18px; display: block;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5"/>
                </svg>
                <span>Download Another</span>
            </button>
        </div>
    </div>
</div>

<!-- Scoped Toast Notification -->
<div id="toast" class="rdt-toast">
    Notification message
</div>
