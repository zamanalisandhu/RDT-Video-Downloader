# RDTVideoDownloader - Reddit Video Downloader

<a href="https://fazier.com/launches/rdtvideodownloader.com" target="_blank"><img src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=neutral" width=120 alt="Fazier badge" /></a>

RDTVideoDownloader is a high-performance, single-page Reddit Video Downloader that replicates the clean, professional design of RedVid.io. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **All-in-One Tool**: Download Videos, Audio, GIFs, and Images/Galleries.
- **High Quality**: Supports up to 1080p (highest available on Reddit).
- **Audio Merging**: Automatically merges video and audio tracks for a complete MP4 file.
- **Fast & Private**: Real-time processing with no logs and no watermarks.
- **SEO Optimized**: Complete metadata, Open Graph tags, and Schema.org markup.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Node.js with Axios and FFmpeg

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure FFmpeg is installed on your system.
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is optimized for deployment on **Vercel**. 

Note: Server-side FFmpeg merging requires a server environment where FFmpeg is available. For serverless deployments, you may need a custom Vercel Layer or a dedicated media processing API.

## Domain

Official Domain: [https://rdtvideodownloader.com/](https://rdtvideodownloader.com/)

---
RDTVideoDownloader is not affiliated with Reddit Inc. All trademarks belong to their respective owners.
