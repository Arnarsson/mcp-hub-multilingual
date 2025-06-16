/**
 * ELI5 Smart Complexity Control System
 * Adapts content complexity for different audiences
 */

class ELI5Manager {
    constructor() {
        this.currentLevel = 'expert'; // Default to expert level
        this.originalContent = null;
        this.contentCache = new Map(); // Cache different complexity levels
        this.floatingButton = null;
        this.panel = null;
        this.isActive = false;
        this.init();
    }

    init() {
        this.createFloatingButton();
        this.createControlPanel();
        this.attachEventListeners();
        this.applyCurrentLevel();
    }

    createFloatingButton() {
        this.floatingButton = document.createElement('button');
        this.floatingButton.className = 'eli5-floating-button';
        this.floatingButton.innerHTML = 'ELI5';
        this.floatingButton.title = 'Smart Complexity Control';
        document.body.appendChild(this.floatingButton);
    }

    createControlPanel() {
        this.panel = document.createElement('div');
        this.panel.className = 'eli5-panel';
        this.panel.innerHTML = `
            <div class="eli5-panel-header">
                <h3 class="eli5-panel-title">Content Complexity</h3>
                <p class="eli5-panel-subtitle">Choose your technical level</p>
            </div>
            
            <div class="complexity-levels">
                <div class="complexity-level" data-level="beginner">
                    <div class="complexity-icon beginner">🌱</div>
                    <div class="complexity-info">
                        <h4>Beginner</h4>
                        <p>Simple explanations with analogies</p>
                    </div>
                </div>
                
                <div class="complexity-level" data-level="intermediate">
                    <div class="complexity-icon intermediate">⚡</div>
                    <div class="complexity-info">
                        <h4>Intermediate</h4>
                        <p>Balanced technical detail</p>
                    </div>
                </div>
                
                <div class="complexity-level active" data-level="expert">
                    <div class="complexity-icon expert">🚀</div>
                    <div class="complexity-info">
                        <h4>Expert</h4>
                        <p>Full technical depth</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.panel);
    }

    attachEventListeners() {
        // Floating button toggle
        this.floatingButton.addEventListener('click', () => this.togglePanel());
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target) && !this.floatingButton.contains(e.target)) {
                this.closePanel();
            }
        });
        
        // Complexity level selection
        this.panel.querySelectorAll('.complexity-level').forEach(level => {
            level.addEventListener('click', () => {
                const selectedLevel = level.dataset.level;
                this.setComplexityLevel(selectedLevel);
            });
        });
    }

    togglePanel() {
        this.isActive = !this.isActive;
        this.panel.classList.toggle('active', this.isActive);
        this.floatingButton.classList.toggle('active', this.isActive);
    }

    closePanel() {
        this.isActive = false;
        this.panel.classList.remove('active');
        this.floatingButton.classList.remove('active');
    }

    setComplexityLevel(level) {
        this.currentLevel = level;
        
        // Update UI
        this.panel.querySelectorAll('.complexity-level').forEach(el => {
            el.classList.remove('active');
        });
        this.panel.querySelector(`[data-level="${level}"]`).classList.add('active');
        
        // Apply the complexity level
        this.applyCurrentLevel();
        this.closePanel();
    }

    applyCurrentLevel() {
        document.body.setAttribute('data-eli5-level', this.currentLevel);
        
        // If not expert level, adapt the content
        if (this.currentLevel !== 'expert') {
            this.adaptContent();
        } else {
            this.restoreOriginal();
        }
    }

    async adaptContent() {
        // Check cache first
        if (this.contentCache.has(this.currentLevel)) {
            this.displayAdaptedContent(this.contentCache.get(this.currentLevel));
            return;
        }

        // Store original article content if not done yet
        if (!this.originalContent) {
            const article = document.querySelector('article');
            if (article) {
                // CRITICAL FIX: Only store article content, not entire body
                this.originalContent = article.innerHTML;
            } else {
                console.error('No article element found for ELI5 adaptation');
                return;
            }
        }

        // Generate adapted content
        const adaptedContent = await this.generateAdaptedContent(this.currentLevel);
        this.contentCache.set(this.currentLevel, adaptedContent);
        this.displayAdaptedContent(adaptedContent);
    }

    async generateAdaptedContent(level) {
        // In a real implementation, this would call an AI API
        // For demo, we'll use intelligent content adaptation
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.adaptContentByLevel(level));
            }, 1000);
        });
    }

    adaptContentByLevel(level) {
        const title = document.querySelector('h1')?.textContent || '';
        
        if (level === 'beginner') {
            return this.generateBeginnerContent(title);
        } else if (level === 'intermediate') {
            return this.generateIntermediateContent(title);
        }
        
        return this.originalContent; // Default to expert level
    }

    generateBeginnerContent(title) {
        if (title.includes('Understanding MCP')) {
            return this.getSimplifiedMCPContent();
        } else if (title.includes('Use Cases')) {
            return this.getSimplifiedUseCasesContent();
        } else if (title.includes('Build Your First')) {
            return this.getSimplifiedTutorialContent();
        } else if (title.includes('Architecture')) {
            return this.getSimplifiedArchitectureContent();
        }
        
        return this.getGenericSimplifiedContent();
    }

    generateIntermediateContent(title) {
        // For intermediate level, we provide structured technical content
        // without the overly simplified analogies
        const currentContent = document.querySelector('article')?.innerHTML || '';
        
        // Wrap technical terms with explanations
        let adaptedContent = currentContent;
        
        // Add inline explanations for technical terms
        const technicalTerms = {
            'MCP': 'Model Context Protocol (a way for AI to connect to tools)',
            'API': 'Application Programming Interface (how different software talks)',
            'JSON-RPC': 'A messaging format (structured way to send requests)',
            'WebSocket': 'Real-time connection (like a phone line that stays open)',
            'HTTP': 'Web protocol (how web pages are sent)',
            'SDK': 'Software Development Kit (pre-built tools for developers)'
        };
        
        Object.entries(technicalTerms).forEach(([term, explanation]) => {
            const regex = new RegExp(`\\b${term}\\b`, 'g');
            adaptedContent = adaptedContent.replace(regex, 
                `<span class="technical-term" data-simple="${explanation}">${term}</span>`
            );
        });
        
        return adaptedContent;
    }

    displayAdaptedContent(content) {
        // CRITICAL FIX: Preserve navigation and article structure
        const article = document.querySelector('article');
        if (!article) return;

        // Store the original article header elements to preserve them
        const originalHeader = article.querySelector('h1');
        const originalMeta = article.querySelector('.article-meta');
        const backLink = document.querySelector('.back-link');
        
        if (this.currentLevel === 'beginner') {
            // For beginner mode, replace main content but preserve header
            article.innerHTML = content;
            
            // Re-add preserved elements at the beginning
            if (originalHeader) {
                const contentDiv = article.querySelector('.eli5-content');
                if (contentDiv) {
                    article.insertBefore(originalHeader.cloneNode(true), contentDiv);
                }
            }
            if (originalMeta) {
                const headerElement = article.querySelector('h1');
                if (headerElement) {
                    headerElement.insertAdjacentElement('afterend', originalMeta.cloneNode(true));
                }
            }
        } else if (this.currentLevel === 'intermediate') {
            // For intermediate, enhance existing content without complete replacement
            article.innerHTML = content;
        }
        
        // Ensure back link is preserved outside article
        if (backLink && backLink.parentNode !== article.parentNode) {
            article.parentNode.insertBefore(backLink.cloneNode(true), article);
        }
        
        // Add adaptation indicator
        this.showAdaptationIndicator();
    }

    showAdaptationIndicator() {
        // Remove existing indicators
        document.querySelectorAll('.adaptation-indicator').forEach(el => el.remove());
        
        if (this.currentLevel !== 'expert') {
            const indicator = document.createElement('div');
            indicator.className = 'adaptation-indicator';
            indicator.textContent = `${this.currentLevel.toUpperCase()} MODE`;
            
            const article = document.querySelector('article');
            if (article) {
                article.style.position = 'relative';
                article.appendChild(indicator);
            }
        }
    }

    restoreOriginal() {
        if (this.originalContent && this.currentLevel === 'expert') {
            const article = document.querySelector('article');
            if (article) {
                // CRITICAL FIX: Safely restore original content
                article.innerHTML = this.originalContent;
                
                // Ensure proper styling is maintained
                article.style.position = 'relative';
            }
        }
        
        // Remove adaptation indicators
        document.querySelectorAll('.adaptation-indicator').forEach(el => el.remove());
    }

    async callSimplificationAPI(content) {
        // In a real implementation, this would call an AI API
        // For demo purposes, we'll use a mock simplification
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.mockSimplification(content));
            }, 2000);
        });
    }

    mockSimplification(content) {
        // Mock simplified content based on the article type
        const title = document.querySelector('h1').textContent;
        
        if (title.includes('Understanding MCP')) {
            return this.getSimplifiedMCPContent();
        } else if (title.includes('Use Cases')) {
            return this.getSimplifiedUseCasesContent();
        } else if (title.includes('Build Your First')) {
            return this.getSimplifiedTutorialContent();
        } else if (title.includes('Architecture')) {
            return this.getSimplifiedArchitectureContent();
        }
        
        return this.getGenericSimplifiedContent();
    }

    getSimplifiedMCPContent() {
        return `
            <div class="eli5-content">
                <div class="eli5-header">
                    <h2>🎈 What is MCP? (Explained Simply!)</h2>
                    <p class="eli5-intro">Imagine you have a super smart robot friend (like an AI assistant) who wants to help you with everything!</p>
                </div>

                <div class="eli5-section">
                    <h3>🤖 The Problem</h3>
                    <p>Your robot friend is really smart, but it lives in its own little world. It can't:</p>
                    <ul>
                        <li>Read your files on your computer</li>
                        <li>Check your email</li>
                        <li>Look at your photos</li>
                        <li>Help with your work documents</li>
                    </ul>
                    <p>It's like having a brilliant friend who's stuck in a box!</p>
                </div>

                <div class="eli5-section">
                    <h3>✨ What MCP Does</h3>
                    <p>MCP is like a magical bridge that lets your AI friend safely connect to all your stuff:</p>
                    <ul>
                        <li><strong>🏠 Your Files:</strong> "Hey AI, can you read this document for me?"</li>
                        <li><strong>📊 Your Data:</strong> "Show me what's in my spreadsheet!"</li>
                        <li><strong>🔧 Your Tools:</strong> "Help me organize my photos!"</li>
                        <li><strong>🌐 The Internet:</strong> "Get me the latest news!"</li>
                    </ul>
                </div>

                <div class="eli5-section">
                    <h3>🛡️ Safety First!</h3>
                    <p>Don't worry - MCP is like a security guard. It makes sure:</p>
                    <ul>
                        <li>Your AI friend only touches what you say it can</li>
                        <li>Your private stuff stays private</li>
                        <li>Everything is safe and secure</li>
                    </ul>
                </div>

                <div class="eli5-section">
                    <h3>🎯 Why This is Awesome</h3>
                    <p>With MCP, your AI assistant becomes like a super helpful friend who can:</p>
                    <ul>
                        <li>Help you with work by reading and writing documents</li>
                        <li>Organize your photos and files</li>
                        <li>Answer questions about your data</li>
                        <li>Do boring tasks so you don't have to!</li>
                    </ul>
                </div>

                <div class="eli5-summary">
                    <h3>🎪 In Simple Words</h3>
                    <p><strong>MCP = A safe way for AI to help you with everything on your computer and beyond!</strong></p>
                    <p>Think of it like giving your AI assistant a special key that lets it help you with all your digital stuff, but only the things you want it to help with!</p>
                </div>
            </div>
        `;
    }

    getSimplifiedUseCasesContent() {
        return `
            <div class="eli5-content">
                <div class="eli5-header">
                    <h2>🎈 How People Use MCP (Fun Examples!)</h2>
                    <p class="eli5-intro">Let's see how different people use MCP to make their AI helpers super useful!</p>
                </div>

                <div class="eli5-section">
                    <h3>🏪 Sarah the Shop Owner</h3>
                    <p>Sarah owns a toy store. She uses MCP so her AI can:</p>
                    <ul>
                        <li>Count how many teddy bears are left</li>
                        <li>Tell her which toys are selling best</li>
                        <li>Help write fun descriptions for new toys</li>
                        <li>Answer customer questions automatically</li>
                    </ul>
                    <p><em>"It's like having a super smart helper who never gets tired!"</em></p>
                </div>

                <div class="eli5-section">
                    <h3>👨‍💻 Mike the Developer</h3>
                    <p>Mike builds websites. His AI helper can:</p>
                    <ul>
                        <li>Check his code for mistakes</li>
                        <li>Explain what his programs do</li>
                        <li>Help fix bugs (problems in code)</li>
                        <li>Write documentation so others understand his work</li>
                    </ul>
                    <p><em>"My AI buddy makes coding so much easier!"</em></p>
                </div>

                <div class="eli5-section">
                    <h3>🏥 Dr. Lisa the Doctor</h3>
                    <p>Dr. Lisa uses MCP to help her AI:</p>
                    <ul>
                        <li>Look up patient information quickly</li>
                        <li>Check medicine interactions safely</li>
                        <li>Write patient reports</li>
                        <li>Schedule appointments</li>
                    </ul>
                    <p><em>"I can spend more time with patients instead of paperwork!"</em></p>
                </div>

                <div class="eli5-section">
                    <h3>🎓 Teacher Tom</h3>
                    <p>Tom teaches kids. His AI assistant helps:</p>
                    <ul>
                        <li>Create fun lesson plans</li>
                        <li>Grade homework faster</li>
                        <li>Make learning games</li>
                        <li>Send updates to parents</li>
                    </ul>
                    <p><em>"More time for teaching, less time for boring tasks!"</em></p>
                </div>

                <div class="eli5-summary">
                    <h3>🌟 The Big Idea</h3>
                    <p><strong>MCP lets AI helpers work with all kinds of jobs and make life easier for everyone!</strong></p>
                    <p>Whether you're running a business, building things, helping people, or teaching - MCP can make your AI assistant super helpful in your specific work!</p>
                </div>
            </div>
        `;
    }

    getSimplifiedTutorialContent() {
        return `
            <div class="eli5-content">
                <div class="eli5-header">
                    <h2>🎈 Let's Build Something Cool! (Simple Version)</h2>
                    <p class="eli5-intro">Want to make your own AI helper? It's like building with digital LEGO blocks!</p>
                </div>

                <div class="eli5-section">
                    <h3>🎯 What We're Building</h3>
                    <p>We're going to make a special helper that can:</p>
                    <ul>
                        <li>📖 Read files on your computer</li>
                        <li>✏️ Write new files</li>
                        <li>📂 Look inside folders</li>
                        <li>🛡️ Keep everything safe</li>
                    </ul>
                    <p>Think of it like giving your AI a pair of hands to help with your files!</p>
                </div>

                <div class="eli5-section">
                    <h3>🧰 What You Need</h3>
                    <p>Just like building with real blocks, we need some tools:</p>
                    <ul>
                        <li><strong>Node.js:</strong> The foundation (like a LEGO baseplate)</li>
                        <li><strong>Code Editor:</strong> Your building workspace</li>
                        <li><strong>MCP SDK:</strong> Special building blocks for AI helpers</li>
                    </ul>
                    <p>Don't worry - we'll get everything set up step by step!</p>
                </div>

                <div class="eli5-section">
                    <h3>🏗️ Building Steps (Super Simple!)</h3>
                    <div class="eli5-steps">
                        <div class="eli5-step">
                            <strong>Step 1:</strong> 📦 Set up our workspace
                            <p>Like clearing your desk before starting a project</p>
                        </div>
                        <div class="eli5-step">
                            <strong>Step 2:</strong> 🧱 Add the building blocks
                            <p>Install all the special pieces we need</p>
                        </div>
                        <div class="eli5-step">
                            <strong>Step 3:</strong> 🤖 Create our AI helper
                            <p>Write the instructions for what it can do</p>
                        </div>
                        <div class="eli5-step">
                            <strong>Step 4:</strong> 🧪 Test everything works
                            <p>Make sure our helper can actually help!</p>
                        </div>
                        <div class="eli5-step">
                            <strong>Step 5:</strong> 🚀 Make it ready for everyone
                            <p>Pack it up so others can use it too</p>
                        </div>
                    </div>
                </div>

                <div class="eli5-section">
                    <h3>🎉 What You'll Learn</h3>
                    <p>By the end, you'll know how to:</p>
                    <ul>
                        <li>Make AI helpers that can do real work</li>
                        <li>Keep everything safe and secure</li>
                        <li>Share your creation with friends</li>
                        <li>Build even cooler helpers in the future!</li>
                    </ul>
                </div>

                <div class="eli5-summary">
                    <h3>🌟 Ready to Start?</h3>
                    <p><strong>Building an AI helper is like digital arts and crafts - fun, creative, and super useful!</strong></p>
                    <p>Don't worry if you're new to this - we'll go slow and explain everything. By the end, you'll have made your very own AI assistant!</p>
                </div>
            </div>
        `;
    }

    getSimplifiedArchitectureContent() {
        return `
            <div class="eli5-content">
                <div class="eli5-header">
                    <h2>🎈 How MCP Works Inside (Like Taking Apart a Toy!)</h2>
                    <p class="eli5-intro">Ever wonder how MCP actually works? Let's peek inside and see the magic!</p>
                </div>

                <div class="eli5-section">
                    <h3>🏰 The Big Picture</h3>
                    <p>MCP is like a castle with different parts:</p>
                    <ul>
                        <li><strong>🤖 AI Friend (Client):</strong> Lives in one tower</li>
                        <li><strong>🛠️ Helper Tools (Server):</strong> Live in another tower</li>
                        <li><strong>🌉 Magic Bridge (Protocol):</strong> Connects the towers</li>
                        <li><strong>📮 Message System:</strong> How they talk to each other</li>
                    </ul>
                </div>

                <div class="eli5-section">
                    <h3>💬 How They Talk</h3>
                    <p>Your AI and its tools talk like pen pals:</p>
                    <div class="eli5-conversation">
                        <div class="message ai">🤖 "Hi! What can you help me with?"</div>
                        <div class="message server">🛠️ "I can read files, write files, and list folders!"</div>
                        <div class="message ai">🤖 "Great! Please read the file called 'shopping-list.txt'"</div>
                        <div class="message server">🛠️ "Here's what's in your shopping list: Milk, Bread, Cookies..."</div>
                    </div>
                </div>

                <div class="eli5-section">
                    <h3>🚚 Different Ways to Send Messages</h3>
                    <p>Just like sending letters, there are different ways:</p>
                    <ul>
                        <li><strong>📞 Direct Line (stdio):</strong> Like talking through a tube</li>
                        <li><strong>🌐 Internet Mail (HTTP):</strong> Like sending emails</li>
                        <li><strong>⚡ Lightning Fast (WebSockets):</strong> Like instant messaging</li>
                    </ul>
                </div>

                <div class="eli5-section">
                    <h3>🛡️ Security Guards</h3>
                    <p>MCP has lots of security guards to keep everything safe:</p>
                    <ul>
                        <li><strong>🎫 ID Checker:</strong> Makes sure you are who you say you are</li>
                        <li><strong>🚪 Permission Guard:</strong> Only lets you do what you're allowed to</li>
                        <li><strong>🔒 Secret Keeper:</strong> Encrypts messages so bad guys can't read them</li>
                        <li><strong>📝 Record Keeper:</strong> Writes down everything that happens</li>
                    </ul>
                </div>

                <div class="eli5-section">
                    <h3>⚡ Making It Super Fast</h3>
                    <p>To make MCP work really fast, it uses tricks like:</p>
                    <ul>
                        <li><strong>🧠 Memory Bank:</strong> Remembers things so it doesn't have to look them up again</li>
                        <li><strong>📦 Message Packing:</strong> Squishes messages to make them smaller</li>
                        <li><strong>🚀 Multiple Helpers:</strong> Has lots of helpers working at the same time</li>
                    </ul>
                </div>

                <div class="eli5-summary">
                    <h3>🎪 The Magic Explained</h3>
                    <p><strong>MCP is like a well-organized post office that helps AI friends and their tools talk safely and quickly!</strong></p>
                    <p>All the complex stuff happens behind the scenes, so you just see the magic - your AI helping you with everything you need!</p>
                </div>
            </div>
        `;
    }

    getGenericSimplifiedContent() {
        return `
            <div class="eli5-content">
                <div class="eli5-header">
                    <h2>🎈 This Article Made Simple!</h2>
                    <p class="eli5-intro">Let's break down this complex topic into simple, easy-to-understand pieces!</p>
                </div>

                <div class="eli5-section">
                    <h3>🎯 Main Ideas</h3>
                    <p>This article is about making AI assistants more helpful by connecting them to your tools and data safely.</p>
                </div>

                <div class="eli5-section">
                    <h3>🔑 Key Points</h3>
                    <ul>
                        <li>AI can be much more useful when it can access your files and tools</li>
                        <li>MCP provides a safe way to make these connections</li>
                        <li>It works like a bridge between AI and your digital world</li>
                        <li>Everything is designed to be secure and private</li>
                    </ul>
                </div>

                <div class="eli5-summary">
                    <h3>🌟 Bottom Line</h3>
                    <p><strong>This technology makes AI assistants incredibly more helpful while keeping everything safe!</strong></p>
                </div>
            </div>
        `;
    }

    displaySimplifiedContent(simplifiedHTML) {
        const article = document.querySelector('article');
        const originalH1 = article.querySelector('h1');
        const originalMeta = article.querySelector('.article-meta');
        
        // Create simplified version while preserving header
        const simplifiedArticle = document.createElement('div');
        simplifiedArticle.innerHTML = simplifiedHTML;
        
        // Clear article content but keep h1 and meta
        article.innerHTML = '';
        if (originalH1) article.appendChild(originalH1);
        if (originalMeta) article.appendChild(originalMeta);
        
        // Add simplified content
        article.appendChild(simplifiedArticle);
        
        // Add a notice
        const notice = document.createElement('div');
        notice.className = 'eli5-notice';
        notice.innerHTML = `
            <div class="eli5-notice-content">
                <span class="eli5-icon">🎈</span>
                <span>This is a simplified version of the article. Complex technical details have been explained in simple terms.</span>
            </div>
        `;
        article.insertBefore(notice, article.firstChild.nextSibling.nextSibling);
    }

    restoreArticleOriginal() {
        const article = document.querySelector('article');
        if (article && this.originalContent) {
            article.innerHTML = this.originalContent;
        }
        this.isSimplified = false;
        this.updateButtonState();
    }

    updateButtonState() {
        const buttonText = document.getElementById('eli5-text');
        const button = document.getElementById('eli5-button');
        
        if (this.isSimplified) {
            buttonText.textContent = 'Show Full Article';
            button.setAttribute('title', 'Show the complete technical article');
            button.classList.add('active');
        } else {
            buttonText.textContent = 'Explain Like I\'m 5';
            button.setAttribute('title', 'Simplify this article for easier understanding');
            button.classList.remove('active');
        }
    }

    setLoadingState(isLoading) {
        const button = document.getElementById('eli5-button');
        const loading = document.getElementById('eli5-loading');
        
        if (isLoading) {
            button.style.display = 'none';
            loading.style.display = 'flex';
        } else {
            button.style.display = 'flex';
            loading.style.display = 'none';
        }
    }

    showError(message) {
        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'eli5-error';
        errorDiv.textContent = message;
        
        const container = document.querySelector('.eli5-container');
        container.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    extractTextContent(article) {
        // Extract meaningful text content for AI processing
        const textElements = article.querySelectorAll('p, h2, h3, h4, li');
        return Array.from(textElements)
            .map(el => el.textContent.trim())
            .filter(text => text.length > 0)
            .join('\n');
    }
}

// Initialize ELI5 only on pages that have the required elements
document.addEventListener('DOMContentLoaded', () => {
    // CRITICAL FIX: Check for article element and prevent initialization on homepage
    const article = document.querySelector('article');
    const isHomepage = document.body.classList.contains('homepage') || 
                      window.location.pathname === '/' || 
                      window.location.pathname === '/index.html';
    
    // Only initialize on blog pages that have article content
    if (article && !isHomepage) {
        // Additional safety check - ensure article has substantial content
        const articleText = article.textContent.trim();
        if (articleText.length > 500) {  // Minimum content threshold
            console.log('Initializing ELI5 Manager for blog article');
            window.eli5Manager = new ELI5Manager();
        } else {
            console.log('Article content too short, skipping ELI5 initialization');
        }
    } else {
        console.log('No article found or homepage detected, skipping ELI5 initialization');
    }
});