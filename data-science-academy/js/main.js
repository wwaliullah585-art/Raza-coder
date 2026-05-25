// ===== NAVIGATION =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.slide-up, .slide-left, .slide-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
}

// Trigger counter when hero is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
    heroObserver.observe(heroSection);
}

// ===== PARTICLES =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? '#00f5ff' : '#ff00e5'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: particle-float ${Math.random() * 10 + 5}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// ===== CONTACT FORM (Formspree + mailto fallback) =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject') || 'New Contact Form Message';
        const message = formData.get('message');
        
        // Try Formspree (free tier)
        try {
            const response = await fetch('https://formspree.io/f/wwaliullah585@gmail.com', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });
            
            if (response.ok) {
                showAlert('success', 'Message sent successfully! We will get back to you within 24 hours.');
                contactForm.reset();
            } else {
                // Fallback to mailto
                window.location.href = `mailto:wwaliullah585@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
                showAlert('success', 'Opening your email client to send the message.');
            }
        } catch (error) {
            // Fallback to mailto
            window.location.href = `mailto:wwaliullah585@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
            showAlert('success', 'Opening your email client to send the message.');
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

function showAlert(type, message) {
    const alertEl = document.getElementById('formAlert');
    if (alertEl) {
        alertEl.className = `alert alert-${type}`;
        alertEl.textContent = message;
        alertEl.style.display = 'block';
        setTimeout(() => {
            alertEl.style.display = 'none';
        }, 5000);
    }
}

// ===== TUTORIALS =====
let tutorials = JSON.parse(localStorage.getItem('tutorials') || '[]');

function renderTutorials() {
    const grid = document.getElementById('tutorialsGrid');
    if (!grid) return;
    
    if (tutorials.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-book-open" style="font-size: 3rem; margin-bottom: 1rem; display: block; color: var(--primary);"></i>
                <p>No tutorials uploaded yet. Use the upload form above to add tutorials.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = tutorials.map((tutorial, index) => `
        <div class="tutorial-card slide-up visible" style="animation-delay: ${index * 0.1}s">
            <div class="tutorial-thumb">
                <i class="fas ${getTutorialIcon(tutorial.category)}"></i>
            </div>
            <div class="tutorial-info">
                <h3>${tutorial.title}</h3>
                <p>${tutorial.description}</p>
                <div class="tutorial-meta">
                    <span><i class="fas fa-tag"></i> ${tutorial.category}</span>
                    <span><i class="fas fa-calendar"></i> ${tutorial.date}</span>
                </div>
                ${tutorial.fileUrl ? `<a href="${tutorial.fileUrl}" target="_blank" class="btn btn-primary" style="margin-top: 1rem; display: inline-block; font-size: 0.9rem; padding: 8px 16px;">View Tutorial</a>` : ''}
                <button onclick="deleteTutorial(${index})" class="btn btn-danger" style="margin-top: 0.5rem; display: inline-block; font-size: 0.9rem; padding: 8px 16px;">Delete</button>
            </div>
        </div>
    `).join('');
}

function getTutorialIcon(category) {
    const icons = {
        'Python': 'fa-python fab',
        'JavaScript': 'fa-js fab',
        'Data Science': 'fa-chart-bar',
        'Machine Learning': 'fa-robot',
        'Web Development': 'fa-code',
        'Database': 'fa-database',
        'Other': 'fa-book'
    };
    return icons[category] || 'fa-book';
}

function deleteTutorial(index) {
    if (confirm('Are you sure you want to delete this tutorial?')) {
        tutorials.splice(index, 1);
        localStorage.setItem('tutorials', JSON.stringify(tutorials));
        renderTutorials();
    }
}

const tutorialForm = document.getElementById('tutorialForm');
if (tutorialForm) {
    tutorialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('tutTitle').value;
        const description = document.getElementById('tutDesc').value;
        const category = document.getElementById('tutCategory').value;
        const fileInput = document.getElementById('tutFile');
        
        let fileUrl = '';
        if (fileInput.files[0]) {
            fileUrl = URL.createObjectURL(fileInput.files[0]);
        }
        
        const tutorial = {
            title,
            description,
            category,
            fileUrl,
            date: new Date().toLocaleDateString()
        };
        
        tutorials.push(tutorial);
        localStorage.setItem('tutorials', JSON.stringify(tutorials));
        renderTutorials();
        tutorialForm.reset();
        showTutorialAlert('Tutorial uploaded successfully!');
    });
}

function showTutorialAlert(message) {
    const alert = document.getElementById('tutorialAlert');
    if (alert) {
        alert.textContent = message;
        alert.style.display = 'block';
        setTimeout(() => { alert.style.display = 'none'; }, 3000);
    }
}

// Initialize tutorials on page load
document.addEventListener('DOMContentLoaded', () => {
    renderTutorials();
});

// ===== RESUME BUILDER =====
let experienceCount = 0;
let educationCount = 0;

function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    if (!container) return;
    
    const entry = document.createElement('div');
    entry.className = 'experience-entry';
    entry.id = `exp-${experienceCount}`;
    entry.innerHTML = `
        <div class="entry-row">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="exp-title" placeholder="Software Engineer" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="exp-company" placeholder="Google" oninput="updatePreview()">
            </div>
        </div>
        <div class="entry-row">
            <div class="form-group">
                <label>Start Date</label>
                <input type="text" class="exp-start" placeholder="Jan 2020" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="text" class="exp-end" placeholder="Present" oninput="updatePreview()">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="exp-desc" placeholder="Describe your responsibilities..." oninput="updatePreview()"></textarea>
        </div>
        <button type="button" class="btn btn-danger" onclick="removeEntry('exp-${experienceCount}')" style="font-size: 0.85rem; padding: 6px 12px;">Remove</button>
    `;
    container.appendChild(entry);
}

function addEducation() {
    educationCount++;
    const container = document.getElementById('educationContainer');
    if (!container) return;
    
    const entry = document.createElement('div');
    entry.className = 'education-entry';
    entry.id = `edu-${educationCount}`;
    entry.innerHTML = `
        <div class="entry-row">
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="edu-degree" placeholder="BS Computer Science" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="edu-school" placeholder="MIT" oninput="updatePreview()">
            </div>
        </div>
        <div class="entry-row">
            <div class="form-group">
                <label>Year</label>
                <input type="text" class="edu-year" placeholder="2016 - 2020" oninput="updatePreview()">
            </div>
            <div class="form-group">
                <label>GPA (optional)</label>
                <input type="text" class="edu-gpa" placeholder="3.8/4.0" oninput="updatePreview()">
            </div>
        </div>
        <button type="button" class="btn btn-danger" onclick="removeEntry('edu-${educationCount}')" style="font-size: 0.85rem; padding: 6px 12px;">Remove</button>
    `;
    container.appendChild(entry);
}

function removeEntry(id) {
    document.getElementById(id)?.remove();
    updatePreview();
}

function updatePreview() {
    const name = document.getElementById('resumeName')?.value || 'Your Name';
    const email = document.getElementById('resumeEmail')?.value || '';
    const phone = document.getElementById('resumePhone')?.value || '';
    const address = document.getElementById('resumeAddress')?.value || '';
    const summary = document.getElementById('resumeSummary')?.value || '';
    const skills = document.getElementById('resumeSkills')?.value || '';
    
    const preview = document.getElementById('resumePreviewContent');
    if (!preview) return;
    
    let html = `<h2 style="color: #1a1a3e; margin-bottom: 5px;">${name}</h2>`;
    
    const contactParts = [email, phone, address].filter(Boolean);
    if (contactParts.length) {
        html += `<p style="color: #666; font-size: 0.9rem; margin-bottom: 1rem;">${contactParts.join(' | ')}</p>`;
    }
    
    if (summary) {
        html += `<h3 style="color: #7b2ff7; border-bottom: 2px solid #7b2ff7; padding-bottom: 5px; margin-top: 1.5rem;">Professional Summary</h3>`;
        html += `<p style="color: #555;">${summary}</p>`;
    }
    
    // Experience
    const expEntries = document.querySelectorAll('.experience-entry');
    if (expEntries.length) {
        html += `<h3 style="color: #7b2ff7; border-bottom: 2px solid #7b2ff7; padding-bottom: 5px; margin-top: 1.5rem;">Experience</h3>`;
        expEntries.forEach(entry => {
            const title = entry.querySelector('.exp-title')?.value || '';
            const company = entry.querySelector('.exp-company')?.value || '';
            const start = entry.querySelector('.exp-start')?.value || '';
            const end = entry.querySelector('.exp-end')?.value || '';
            const desc = entry.querySelector('.exp-desc')?.value || '';
            
            if (title || company) {
                html += `<div style="margin-bottom: 1rem;">`;
                html += `<p style="color: #333; font-weight: bold;">${title}${company ? ' at ' + company : ''}</p>`;
                if (start || end) html += `<p style="color: #888; font-size: 0.85rem;">${start}${end ? ' - ' + end : ''}</p>`;
                if (desc) html += `<p style="color: #555; margin-top: 5px;">${desc}</p>`;
                html += `</div>`;
            }
        });
    }
    
    // Education
    const eduEntries = document.querySelectorAll('.education-entry');
    if (eduEntries.length) {
        html += `<h3 style="color: #7b2ff7; border-bottom: 2px solid #7b2ff7; padding-bottom: 5px; margin-top: 1.5rem;">Education</h3>`;
        eduEntries.forEach(entry => {
            const degree = entry.querySelector('.edu-degree')?.value || '';
            const school = entry.querySelector('.edu-school')?.value || '';
            const year = entry.querySelector('.edu-year')?.value || '';
            const gpa = entry.querySelector('.edu-gpa')?.value || '';
            
            if (degree || school) {
                html += `<div style="margin-bottom: 1rem;">`;
                html += `<p style="color: #333; font-weight: bold;">${degree}</p>`;
                if (school) html += `<p style="color: #555;">${school}</p>`;
                if (year) html += `<p style="color: #888; font-size: 0.85rem;">${year}</p>`;
                if (gpa) html += `<p style="color: #888; font-size: 0.85rem;">GPA: ${gpa}</p>`;
                html += `</div>`;
            }
        });
    }
    
    // Skills
    if (skills) {
        html += `<h3 style="color: #7b2ff7; border-bottom: 2px solid #7b2ff7; padding-bottom: 5px; margin-top: 1.5rem;">Skills</h3>`;
        html += `<p style="color: #555;">${skills}</p>`;
    }
    
    preview.innerHTML = html;
}

// Download Resume as PDF
function downloadResume() {
    const preview = document.getElementById('resumePreviewContent');
    if (!preview) return;
    
    const name = document.getElementById('resumeName')?.value || 'Resume';
    
    // Use html2pdf.js
    const opt = {
        margin: 0.5,
        filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(preview).save();
    } else {
        // Fallback: print
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head><title>${name} - Resume</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
                h2 { color: #1a1a3e; }
                h3 { color: #7b2ff7; border-bottom: 2px solid #7b2ff7; padding-bottom: 5px; margin-top: 1.5rem; }
                p { line-height: 1.6; }
            </style>
            </head>
            <body>${preview.innerHTML}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Initialize preview on load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('resumePreviewContent')) {
        updatePreview();
    }
});
