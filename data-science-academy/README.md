# Data Science Academy - Website

A fully animated, responsive website for Data Science Academy - an online teaching platform.

## Details
- **Website Name:** Data Science Academy
- **CEO:** Raza Wazir
- **Location:** KPK, Bannu, Pakistan
- **Email:** wwaliullah585@gmail.com

## Pages Included
1. **Home Page** - Animated hero section with particles, stats counter, and feature highlights
2. **Programming Languages** - Showcase of 9 programming languages with animated cards
3. **Online Classes** - Course catalog with filtering (Beginner/Intermediate/Advanced)
4. **Tutorials** - Upload and manage tutorials with local storage
5. **Resume Builder** - Full resume builder with live preview and PDF download
6. **About** - Academy info, CEO profile, mission/vision
7. **Contact** - Working contact form linked to your email

## Features
- Dark cyberpunk/neon theme with cyan and pink accents
- Smooth scroll animations and hover effects
- Fully responsive (mobile, tablet, desktop)
- Particle effects on hero section
- Glitch text animation
- Counter animation for stats
- Course filtering system
- Resume builder with PDF export (using html2pdf.js)
- Tutorial upload system (uses localStorage)
- Contact form with email integration

## How to Deploy

### Option 1: Free Hosting with Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Drag and drop the entire `data-science-academy` folder onto the Netlify dashboard
3. Your site will be live instantly with a free URL!

### Option 2: Free Hosting with GitHub Pages
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository
3. Upload all files from this folder
4. Go to Settings > Pages > Select "main" branch
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 3: Free Hosting with Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Import your GitHub repository or drag and drop files
3. Your site will be live instantly

### Option 4: Run Locally
```bash
node server.js
```
Then open http://localhost:3000 in your browser.

## Contact Form Setup

The contact form uses a mailto: fallback to send emails to wwaliullah585@gmail.com. 

For a more professional setup (form submissions without opening email client):
1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email: wwaliullah585@gmail.com
3. You'll receive an Access Key
4. Replace `YOUR_WEB3FORMS_KEY` in `contact.html` with your actual key

## Tutorial Upload
- Tutorials are stored in the browser's localStorage
- Upload tutorials with title, description, category, and file
- Tutorials persist across page refreshes
- Admin can delete tutorials

## Resume Builder
- Fill in personal info, experience, education, and skills
- See live preview as you type
- Click "Download PDF Resume" to save as PDF
- Uses html2pdf.js library for PDF generation
