// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ==================== COLOR PICKER ====================
const colorPickerBtn = document.getElementById('colorPickerBtn');
const colorOptions = document.getElementById('colorOptions');
const colorOptionElements = document.querySelectorAll('.color-option');
const root = document.documentElement;

// Toggle color options dropdown
colorPickerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    colorOptions.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!colorOptions.contains(e.target) && e.target !== colorPickerBtn) {
        colorOptions.classList.remove('active');
    }
});

// Load saved color preference
const savedColor = localStorage.getItem('primaryColor') || '#6366f1';
root.style.setProperty('--primary-color', savedColor);

// Update active color option on load
colorOptionElements.forEach(option => {
    if (option.getAttribute('data-color') === savedColor) {
        option.classList.add('active');
    }
});

// Handle color option selection
colorOptionElements.forEach(option => {
    option.addEventListener('click', () => {
        const color = option.getAttribute('data-color');
        
        // Update CSS variable
        root.style.setProperty('--primary-color', color);
        
        // Update secondary color (slightly different shade)
        const secondaryColor = adjustColor(color, -20);
        root.style.setProperty('--secondary-color', secondaryColor);
        
        // Update accent color
        const accentColor = adjustColor(color, 20);
        root.style.setProperty('--accent-color', accentColor);
        
        // Update color dot in button
        document.querySelector('.color-dot').style.background = color;
        
        // Save preference
        localStorage.setItem('primaryColor', color);
        
        // Update active state
        colorOptionElements.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Close dropdown
        colorOptions.classList.remove('active');
    });
});

// Function to adjust color brightness
function adjustColor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// ==================== MOBILE MENU ====================
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.textContent = '☰';
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== HEADER SCROLL EFFECT ====================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px var(--shadow)';
    } else {
        header.style.boxShadow = '0 4px 20px var(--shadow-lg)';
    }
    
    lastScroll = currentScroll;
});
