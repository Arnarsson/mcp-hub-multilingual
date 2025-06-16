// ===================================
// MCP Hub - Premium JavaScript
// Enhanced Interactivity & Animations
// ===================================

// Removed @stagewise/toolbar import to fix module loading
// if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//   initToolbar({
//     plugins: [],
//   });
// }

class MCPHub {
    constructor() {
        this.currentLanguage = 'da';
        this.theme = localStorage.getItem('theme') || 'light';
        this.translations = {};
        this.demos = {
            filesystem: false,
            database: false,
            api: false,
            realtime: false
        };
        
        this.init();
    }
    
    async init() {
        this.setupTheme();
        this.setupNavigation();
        this.setupLanguageSelector();
        this.setupScrollEffects();
        this.setupDemos();
        this.setupAnimations();
        this.setupMobileMenu();
        // this.setupBlogCardNavigation(); // Removed to prevent interference with natural anchor navigation
        await this.loadTranslations();
        this.setupPerformanceOptimizations();
    }
    
    // Theme Management
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        html.setAttribute('data-theme', this.theme);
        
        themeToggle?.addEventListener('click', () => {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', this.theme);
            localStorage.setItem('theme', this.theme);
            this.animateThemeChange();
        });
    }
    
    animateThemeChange() {
        const body = document.body;
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    }
    
    // Navigation System
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Scroll effect with performance optimization
        let ticking = false;
        const updateNavbar = () => {
            if (window.scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
        
        // Smooth scrolling with enhanced easing
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    this.smoothScrollTo(target);
                    this.updateActiveNavLink(targetId);
                }
            });
        });
        
        // Update active nav link based on scroll position
        this.setupScrollSpy();
    }
    
    smoothScrollTo(element) {
        const targetPosition = element.offsetTop - 72; // Account for navbar height
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Enhanced easing function (easeInOutCubic)
            const ease = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = '#' + entry.target.id;
                    this.updateActiveNavLink(id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }
    
    updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    // Language Selector
    setupLanguageSelector() {
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');
        
        languageBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown?.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageBtn?.contains(e.target) && !languageDropdown?.contains(e.target)) {
                languageDropdown?.classList.remove('active');
            }
        });
    }
    
    switchLanguage(lang) {
        const langMap = {
            'da': { name: 'Dansk', flag: 'flag-da' },
            'en': { name: 'English', flag: 'flag-en' },
            'de': { name: 'Deutsch', flag: 'flag-de' },
            'es': { name: 'Español', flag: 'flag-es' }
        };
        
        if (!langMap[lang]) return;
        
        this.currentLanguage = lang;
        
        // Update UI
        const currentLang = document.getElementById('currentLang');
        const currentFlag = document.getElementById('currentFlag');
        
        if (currentLang) currentLang.textContent = langMap[lang].name;
        if (currentFlag) currentFlag.className = `flag-icon ${langMap[lang].flag}`;
        
        // Update active state
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
        });
        
        // Close dropdown
        document.getElementById('languageDropdown')?.classList.remove('active');
        
        // Apply translations
        this.applyTranslations(lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
    
    // Scroll Effects
    setupScrollEffects() {
        // Scroll progress bar
        const scrollProgress = document.getElementById('scrollProgress');
        
        let ticking = false;
        const updateScrollProgress = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            if (scrollProgress) {
                scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
            }
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        });
        
        // Reveal animations on scroll
        this.setupRevealAnimations();
    }
    
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll('.feature-card, .blog-card, .card');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(element);
        });
    }
    
    // Demo System
    setupDemos() {
        this.setupDemoModal();
        this.setupDemoRunners();
    }
    
    setupDemoRunners() {
        // Make demo functions globally available
        window.runFilesystemDemo = () => this.runFilesystemDemo();
        window.runDatabaseDemo = () => this.runDatabaseDemo();
        window.runApiDemo = () => this.runApiDemo();
        window.runRealtimeDemo = () => this.runRealtimeDemo();
        
        // Setup demo card switching
        this.setupDemoCardSwitching();
    }
    
    setupDemoCardSwitching() {
        const demoCards = document.querySelectorAll('.demo-card[data-demo]');
        const demoPanels = document.querySelectorAll('.demo-panel');
        
        demoCards.forEach(card => {
            card.addEventListener('click', () => {
                const demoType = card.getAttribute('data-demo');
                
                // Remove active class from all cards and panels
                demoCards.forEach(c => c.classList.remove('active'));
                demoPanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked card and corresponding panel
                card.classList.add('active');
                const targetPanel = document.getElementById(`${demoType}Demo`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    async runFilesystemDemo() {
        this.openDemoModal('📁 Filesystem Demo', `
            <div style="padding: 1rem;">
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 1.5rem;">
                    This demo simulates an AI assistant using MCP to interact with a project's file system. 
                    The protocol log shows the standardized requests and responses.
                </p>
                <div style="display: flex; gap: 2rem; min-height: 280px;">
                    <div style="flex: 1;">
                        <h4 style="color: white; margin-bottom: 1rem;">📁 File Explorer</h4>
                        <div id="modalFileTree" style="color: rgba(255,255,255,0.8); font-family: monospace; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 0.5rem;">
                            <div class="file-item">📁 project/</div>
                            <div class="file-item" style="margin-left: 1rem;">📄 package.json</div>
                            <div class="file-item" style="margin-left: 1rem;">📁 src/</div>
                            <div class="file-item" style="margin-left: 2rem;">📄 index.js</div>
                            <div class="file-item" style="margin-left: 2rem;">📄 config.json</div>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <h4 style="color: white; margin-bottom: 1rem;">🔄 MCP Protocol Log</h4>
                        <div id="modalProtocolLog" style="color: rgba(255,255,255,0.8); font-family: monospace; font-size: 0.875rem; background: rgba(0,0,0,0.3); border-radius: 0.5rem; padding: 1rem; height: 200px; overflow-y: auto;">
                            Click 'Run Simulation' to start...
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 1.5rem;">
                    <button class="btn btn-primary story-action-btn" id="runFsSimBtn">Run Simulation</button>
                </div>
            </div>
        `);

        // Defer script execution until modal content is in the DOM
        setTimeout(() => {
            const log = document.getElementById('modalProtocolLog');
            const button = document.getElementById('runFsSimBtn');

            if (!button || !log) return;

            button.addEventListener('click', async () => {
                if (this.demos.filesystem) return;
                this.demos.filesystem = true;
                button.disabled = true;
                button.innerHTML = '<span class="loading"></span> Running...';
                log.innerHTML = '';

                const messages = [
                    { delay: 100, text: '🔌 Establishing MCP connection...', type: 'info' },
                    { delay: 500, text: '📋 MCP → list_resources request', type: 'request' },
                    { delay: 500, text: '📄 MCP ← resources: [package.json, src/]', type: 'response' },
                    { delay: 500, text: '📖 MCP → read_resource: package.json', type: 'request' },
                    { delay: 500, text: '💾 MCP ← content: {"name": "mcp-demo"}', type: 'response' },
                    { delay: 500, text: '✅ Simulation complete!', type: 'success' }
                ];
        
                for (const message of messages) {
                    await this.addLogMessage(log, message.text, message.type, 0); // No extra delay, just sequence
                    await new Promise(r => setTimeout(r, message.delay));
                }

                button.disabled = false;
                button.innerHTML = 'Run Simulation';
                this.demos.filesystem = false;
            });
        }, 100);
    }
    
    async addLogMessage(log, text, type, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                const messageEl = document.createElement('div');
                messageEl.className = `log-message log-${type}`;
                messageEl.textContent = text;
                
                const typeColors = {
                    info: '#3b82f6',
                    request: '#f59e0b',
                    response: '#10b981',
                    success: '#22c55e',
                    error: '#ef4444'
                };
                
                messageEl.style.color = typeColors[type] || '#fff';
                messageEl.style.marginBottom = '8px';
                messageEl.style.fontFamily = 'monospace';
                messageEl.style.fontSize = '14px';
                messageEl.style.opacity = '0';
                messageEl.style.transform = 'translateX(-20px)';
                messageEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                log.appendChild(messageEl);
                log.scrollTop = log.scrollHeight;
                
                // Animate in
                requestAnimationFrame(() => {
                    messageEl.style.opacity = '1';
                    messageEl.style.transform = 'translateX(0)';
                });
                
                resolve();
            }, delay);
        });
    }
    
    runDatabaseDemo() {
        this.openDemoModal('🗄️ Database Integration Demo', `
            <div style=\"text-align: center; padding: 2rem;\">
                <h4 style=\"margin-bottom: 1rem;\">Database MCP Server Demo</h4>
                <p style=\"color: rgba(255,255,255,0.8); margin-bottom: 2rem;\">
                    This demo shows how MCP connects to databases, executes queries, 
                    and returns structured data to AI assistants.
                </p>
                <div style=\"background: rgba(0,0,0,0.3); border-radius: 1rem; padding: 1.5rem; margin: 1rem 0;\">
                    <code style=\"color: #10b981;\">
                        MCP → query: \"SELECT * FROM customers ORDER BY revenue DESC LIMIT 10\"<br>
                        MCP ← results: [customer_data...]
                    </code>
                </div>
                <p style=\"font-size: 0.9rem; color: rgba(255,255,255,0.6);\">
                    Full database demo coming soon with real-time query execution.
                </p>
            </div>
        `);
    }
    
    runApiDemo() {
        this.openDemoModal('🌐 API Integration Demo', `
            <div style=\"text-align: center; padding: 2rem;\">
                <h4 style=\"margin-bottom: 1rem;\">API MCP Server Demo</h4>
                <p style=\"color: rgba(255,255,255,0.8); margin-bottom: 2rem;\">
                    This demo demonstrates how MCP handles external API calls, 
                    data transformation, and response formatting.
                </p>
                <div style=\"background: rgba(0,0,0,0.3); border-radius: 1rem; padding: 1.5rem; margin: 1rem 0;\">
                    <code style=\"color: #f59e0b;\">
                        MCP → call_api: \"weather/current?city=Copenhagen\"<br>
                        MCP ← data: {\"temperature\": 18, \"condition\": \"partly_cloudy\"}
                    </code>
                </div>
                <p style=\"font-size: 0.9rem; color: rgba(255,255,255,0.6);\">
                    Full API integration demo coming soon with live endpoints.
                </p>
            </div>
        `);
    }
    
    runRealtimeDemo() {
        this.openDemoModal('⚡ Real-time Data Demo', `
            <div style=\"text-align: center; padding: 2rem;\">
                <h4 style=\"margin-bottom: 1rem;\">Real-time MCP Server Demo</h4>
                <p style=\"color: rgba(255,255,255,0.8); margin-bottom: 2rem;\">
                    This demo shows how MCP handles live data streams, 
                    WebSocket connections, and real-time updates.
                </p>
                <div style=\"background: rgba(0,0,0,0.3); border-radius: 1rem; padding: 1.5rem; margin: 1rem 0;\">
                    <code style=\"color: #8b5cf6;\">
                        MCP → subscribe: \"stock_prices/AAPL\"<br>
                        MCP ← stream: {\"price\": 150.25, \"change\": \"+1.2%\"}
                    </code>
                </div>
                <p style=\"font-size: 0.9rem; color: rgba(255,255,255,0.6);\">
                    Full real-time demo coming soon with live data feeds.
                </p>
            </div>
        `);
    }
    
    setupDemoModal() {
        this.openDemoModal = (title, content) => {
            const modal = document.getElementById('demoModal');
            const modalContent = document.getElementById('modalContent');
            
            if (modalContent) {
                modalContent.innerHTML = `<h3 style="margin-bottom: 1rem; color: white;">${title}</h3>${content}`;
            }
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };
        
        this.closeDemoModal = () => {
            const modal = document.getElementById('demoModal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        // Make functions globally available
        window.openDemoModal = this.openDemoModal;
        window.closeDemoModal = this.closeDemoModal;
        
        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDemoModal();
            }
        });
        
        // Close modal on backdrop click
        const modal = document.getElementById('demoModal');
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeDemoModal();
            }
        });
    }
    
    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        mobileMenuBtn?.addEventListener('click', () => {
            navMenu?.classList.toggle('active');
            
            // Animate hamburger icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (navMenu?.classList.contains('active')) {
                icon.style.transform = 'rotate(90deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Close mobile menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu?.classList.remove('active');
                const icon = mobileMenuBtn?.querySelector('svg');
                if (icon) icon.style.transform = 'rotate(0deg)';
            });
        });
    }
    
    // Animations
    setupAnimations() {
        // Stagger animations for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Blog card animations
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Add hover effects with enhanced performance
        this.setupHoverEffects();
    }
    
    setupHoverEffects() {
        const cards = document.querySelectorAll('.card, .feature-card, .blog-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Translations
    async loadTranslations() {
        try {
            // Check if translations.js exists and has been loaded
            if (typeof window.translations !== 'undefined') {
                // Use translations directly and let applyTranslations handle key conversion
                this.translations = window.translations;
            } else {
                // Enhanced fallback translations
                this.translations = {
                    da: {
                        site_title: 'MCP Hub',
                        nav_home: 'Hjem',
                        nav_features: 'Features',
                        nav_demos: 'Demos',
                        nav_blog: 'Blog',
                        nav_about: 'Om',
                        hero_title: 'Mester Model Context Protocol',
                        hero_subtitle: 'Lær MCP gennem omfattende guides og praktiske eksempler.',
                        hero_cta_demos: 'Udforsk Demos',
                        hero_cta_guides: 'Se Guides',
                        features_title: 'Hvorfor Vælge MCP?',
                        demos_title: 'Interaktive MCP Demos',
                        blog_title: 'MCP Learning Hub',
                        about_title: 'Om MCP Hub'
                    },
                    en: {
                        site_title: 'MCP Hub',
                        nav_home: 'Home',
                        nav_features: 'Features',
                        nav_demos: 'Demos',
                        nav_blog: 'Blog',
                        nav_about: 'About',
                        hero_title: 'Master Model Context Protocol',
                        hero_subtitle: 'Learn MCP through comprehensive guides and practical examples.',
                        hero_cta_demos: 'Explore Demos',
                        hero_cta_guides: 'View Guides',
                        features_title: 'Why Choose MCP?',
                        demos_title: 'Interactive MCP Demos',
                        blog_title: 'MCP Learning Hub',
                        about_title: 'About MCP Hub'
                    },
                    de: {
                        site_title: 'MCP Hub',
                        nav_home: 'Startseite',
                        nav_features: 'Features',
                        nav_demos: 'Demos',
                        nav_blog: 'Blog',
                        nav_about: 'Über',
                        hero_title: 'Model Context Protocol meistern',
                        hero_subtitle: 'Lernen Sie MCP durch umfassende Anleitungen und praktische Beispiele.',
                        hero_cta_demos: 'Demos erkunden',
                        hero_cta_guides: 'Anleitungen ansehen',
                        features_title: 'Warum MCP wählen?',
                        demos_title: 'Interaktive MCP Demos',
                        blog_title: 'MCP Learning Hub',
                        about_title: 'Über MCP Hub'
                    },
                    es: {
                        site_title: 'MCP Hub',
                        nav_home: 'Inicio',
                        nav_features: 'Características',
                        nav_demos: 'Demos',
                        nav_blog: 'Blog',
                        nav_about: 'Acerca de',
                        hero_title: 'Dominar Model Context Protocol',
                        hero_subtitle: 'Aprenda MCP a través de guías completas y ejemplos prácticos.',
                        hero_cta_demos: 'Explorar Demos',
                        hero_cta_guides: 'Ver Guías',
                        features_title: '¿Por qué elegir MCP?',
                        demos_title: 'Demos Interactivos de MCP',
                        blog_title: 'MCP Learning Hub',
                        about_title: 'Acerca de MCP Hub'
                    }
                };
            }
            
            this.applyTranslations(this.currentLanguage);
        } catch (error) {
            console.warn('Could not load translations:', error);
        }
    }
    
    applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        const translations = this.translations[lang] || this.translations['en'];
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            // Convert underscore notation to dot notation for translation lookup
            const dotKey = key.replace(/_/g, '.');
            
            let translationText = null;
            // Try both underscore key and dot key
            if (translations && translations[key]) {
                translationText = translations[key];
            } else if (translations && translations[dotKey]) {
                translationText = translations[dotKey];
            }
            
            if (translationText) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translationText;
                } else {
                    element.textContent = translationText;
                }
            }
        });
    }
    
    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Optimize animations for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableAnimations();
        }
    }
    
    disableAnimations() {
        document.body.classList.add('no-animations');
    }
    
    // Add navigation for entire blog card click
    setupBlogCardNavigation() {
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Check if click was on the card but not on an anchor
                const targetAnchor = e.target.closest('a');
                if (targetAnchor) {
                    // Let the anchor handle the navigation naturally
                    return;
                }
                
                // If clicked on the card itself (not on an anchor), find the link and navigate
                const link = card.querySelector('a.blog-card-link');
                if (link && link.href && link.href !== '#') {
                    window.location.href = link.href;
                }
            });
        });
    }
}

// Initialize the application
window.mcpHub = new MCPHub();

// Make functions globally accessible for onclick handlers
window.switchLanguage = function(lang) {
    if (window.mcpHub) {
        window.mcpHub.switchLanguage(lang);
    }
};

// Export for global access
window.MCPHub = MCPHub; 