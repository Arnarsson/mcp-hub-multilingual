require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

// Try to load express-rate-limit, fallback to basic implementation
let rateLimit;
try {
  rateLimit = require('express-rate-limit');
} catch (err) {
  console.warn('express-rate-limit not found, using basic rate limiting');
  // Basic rate limiting implementation
  const requestCounts = new Map();
  rateLimit = (options) => {
    return (req, res, next) => {
      const ip = req.ip || req.connection.remoteAddress;
      const now = Date.now();
      const windowStart = now - options.windowMs;
      
      if (!requestCounts.has(ip)) {
        requestCounts.set(ip, []);
      }
      
      const requests = requestCounts.get(ip);
      const validRequests = requests.filter(time => time > windowStart);
      
      if (validRequests.length >= options.max) {
        return res.status(429).json({ error: options.message });
      }
      
      validRequests.push(now);
      requestCounts.set(ip, validRequests);
      next();
    };
  };
}

// --- Production Environment Setup ---
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

// --- API Key Validation ---
if (!process.env.OPENROUTER_API_KEY) {
    console.error("FATAL ERROR: OPENROUTER_API_KEY is not defined.");
    console.error("Please create a .env file and add your API key.");
    process.exit(1); // Exit the process with an error code
}

const app = express();
const port = process.env.PORT || 3000;

// --- Security Middleware ---
// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProduction ? 100 : 1000, // Limit each IP to 100 requests per windowMs in production
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Translation-specific rate limiting (more restrictive)
const translationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes  
    max: isProduction ? 50 : 200, // 50 translation requests per 15 minutes in production
    message: 'Translation rate limit exceeded, please try again later.',
});

app.use(limiter);

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    if (isProduction) {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    
    next();
});

// --- AI Client Setup ---
// Configure the OpenAI client to use the OpenRouter API
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// --- Base Language Data ---
// The original English text is stored here on the server.
const baseTranslations = {
    "site_title": "MCP Hub",
    "nav_home": "Home",
    "nav_features": "Features", 
    "nav_demos": "Demos",
    "nav_blog": "Blog",
    "nav_about": "About",
    "hero_title": "Master Model Context Protocol",
    "hero_subtitle": "Learn how to build powerful AI integrations with Model Context Protocol. From basic concepts to enterprise implementation.",
    "hero_cta_demos": "🚀 Try Live Demos",
    "hero_cta_guides": "📚 Read Guides",
    
    "features_title": "Why Choose MCP?",
    "features_subtitle": "Model Context Protocol revolutionizes how AI assistants connect to external systems. Experience the power of standardized AI integration.",
    
    "feature_secure_title": "Secure Integration",
    "feature_secure_desc": "Built with security in focus. MCP includes advanced permission systems, authentication, and audit trails to ensure your data stays protected while enabling powerful AI capabilities.",
    
    "feature_universal_title": "Universal Compatibility", 
    "feature_universal_desc": "Connect to any system, database, or API with standardized protocols. MCP works seamlessly across platforms, languages, and frameworks.",
    
    "feature_developer_title": "Developer Friendly",
    "feature_developer_desc": "Simple, well-documented APIs with extensive examples. Get started in minutes with our comprehensive SDK and detailed tutorials.",
    
    "feature_realtime_title": "Real-time Performance",
    "feature_realtime_desc": "Lightning-fast connections with optimized data streaming. Handle high-volume operations with minimal latency and maximum reliability.",
    
    "feature_scalable_title": "Enterprise Scalable",
    "feature_scalable_desc": "Built to scale from prototype to production. Handle millions of requests with distributed architecture and auto-scaling capabilities.",
    
    "feature_community_title": "Thriving Community",
    "feature_community_desc": "Join thousands of developers building the future of AI integration. Get support, share knowledge, and contribute to open-source innovation.",
    
    "demos_title": "Interactive Demos",
    "demos_subtitle": "Experience MCP in action with live, interactive demonstrations that show real protocol communication and practical implementation examples.",
    
    "demo_run_filesystem": "Run Filesystem Demo",
    "demo_run_database": "Run Database Demo", 
    "demo_run_api": "Run API Demo",
    "demo_run_realtime": "Run Real-time Demo",
    
    "blog_title": "Educational Resources",
    "blog_subtitle": "Comprehensive guides, tutorials, and best practices to master Model Context Protocol development.",
    
    "blog.post1.title": "Understanding MCP: The Protocol That Connects AI to Everything",
    "blog.post1.excerpt": "Discover how Model Context Protocol revolutionizes AI integrations by providing a standardized way to connect AI assistants to any data source or tool.",
    
    "blog.post2.title": "MCP Architecture Deep Dive: How It Really Works", 
    "blog.post2.excerpt": "Explore the technical architecture behind MCP, including the client-server model, resource management, and security considerations.",
    
    "blog.post3.title": "Build Your First MCP Server: Complete Step-by-Step Guide",
    "blog.post3.excerpt": "Hands-on tutorial to build a production-ready MCP server from scratch. Includes code examples and best practices.",
    
    "blog.post4.title": "MCP Use Cases: From File Management to Real-Time Data",
    "blog.post4.excerpt": "Explore practical MCP implementations across industries with real examples and case studies.",
    
    "blog.readTime": "min read",
    "blog.readMore": "Read More",
    
    "about_title": "About MCP Hub",
    "about_subtitle": "Your comprehensive resource for mastering Model Context Protocol and building powerful AI integrations.",
    
    "about_mission_title": "Our Mission",
    "about_mission_desc": "To democratize AI integration by providing comprehensive, accessible education on Model Context Protocol. We believe every developer should have the tools and knowledge to build secure, scalable AI-powered applications.",
    
    "about_current_title": "Current Focus",
    "about_current_desc": "We're actively developing cutting-edge MCP implementations, creating educational content, and building a community of developers who are shaping the future of AI integration.",
    
    "about_different_title": "What Makes Us Different",
    "about_different_desc": "Unlike other platforms, we focus exclusively on practical, hands-on learning. Every tutorial includes real code, working examples, and production-ready patterns you can use immediately.",
    
    "about_community_title": "Join Our Community",
    "about_community_desc": "Connect with fellow developers, contribute to open-source projects, and stay up-to-date with the latest MCP developments. Together, we're building the future of AI integration.",
    
    "footer_learn_title": "Learn MCP",
    "footer_getting_started": "Getting Started",
    "footer_tutorials": "Tutorials",
    "footer_examples": "Examples", 
    "footer_best_practices": "Best Practices",
    "footer_documentation": "Documentation",
    
    "footer_community_title": "Community",
    "footer_github": "GitHub Repository",
    "footer_discord": "Discord Server",
    "footer_forum": "Community Forum",
    "footer_blog": "Developer Blog",
    "footer_contribute": "Contribute",
    
    "footer_support_title": "Support",
    "footer_help": "Help & Support",
    "footer_contact": "Contact Us",
    "footer_bug_reports": "Bug Reports",
    "footer_feature_requests": "Feature Requests", 
    "footer_status": "Status Page",
    
    "footer_description": "MCP Hub is the definitive resource for Model Context Protocol education, providing comprehensive tutorials, examples, and community support for developers building AI-powered applications.",
    "footer_copyright": "© 2024 MCP Hub. Built for the developer community."
};

// CORS configuration
const corsOptions = {
    origin: isProduction 
        ? ['https://mcp-hub.com', 'https://www.mcp-hub.com'] 
        : ['http://localhost:3000', 'http://localhost:4000', 'http://localhost:4001'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Reasonable limit for translation requests

// Request logging
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
});

// --- Health Check Endpoint ---
app.get('/', (req, res) => {
    res.status(200).send('AI Translation Server is running.');
});

// --- AI Translation Function ---
async function getAiTranslation(text, lang) {
  console.log(`AI Translating "${text}" to ${lang}...`);
  try {
    const completion = await openrouter.chat.completions.create({
      model: "google/gemini-flash-1.5",
      messages: [
        {
          role: 'system',
          content: `You are an expert translator. Translate the user's text to the specified language. Provide only the translated text, without any additional comments or quotation marks. The translation should be natural and sound like a native speaker.`
        },
        {
          role: 'user',
          content: `Translate the following text to ${lang}: "${text}"`
        }
      ],
      temperature: 0.7,
    });
    const translation = completion.choices[0].message.content.trim();
    console.log(`AI Translation successful: "${translation}"`);
    return translation;
  } catch (error) {
    console.error(`AI Translation failed for "${text}":`, error);
    // Fallback to original text in case of an API error
    return text;
  }
}

// --- API Endpoint ---
app.post('/api/translate', translationLimiter, async (req, res) => {
  try {
    const { key, lang } = req.body;

    // Input validation
    if (!key || !lang) {
      return res.status(400).json({ 
        error: 'Missing "key" or "lang" in request body',
        code: 'MISSING_PARAMETERS'
      });
    }

    // Sanitize language code
    const validLangs = ['da', 'en', 'de', 'es'];
    if (!validLangs.includes(lang)) {
      return res.status(400).json({ 
        error: 'Invalid language code. Supported: da, en, de, es',
        code: 'INVALID_LANGUAGE'
      });
    }

    // Return English text directly if requested
    if (lang === 'en') {
      const originalText = baseTranslations[key];
      if (!originalText) {
        return res.status(404).json({ 
          error: `Translation key "${key}" not found.`,
          code: 'KEY_NOT_FOUND'
        });
      }
      return res.json({ translation: originalText });
    }

    const originalText = baseTranslations[key];
    if (!originalText) {
      return res.status(404).json({ 
        error: `Translation key "${key}" not found.`,
        code: 'KEY_NOT_FOUND'
      });
    }

    const translatedText = await getAiTranslation(originalText, lang);
    res.json({ 
      translation: translatedText,
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Translation API error:', error);
    res.status(500).json({ 
      error: 'Failed to translate text',
      code: 'TRANSLATION_FAILED'
    });
  }
});

// --- New Endpoint for Translating Raw HTML ---
app.post('/api/translate-html', translationLimiter, async (req, res) => {
  try {
    const { html, lang } = req.body;

    // Input validation
    if (!html || !lang) {
      return res.status(400).json({ 
        error: 'Missing "html" or "lang" in request body',
        code: 'MISSING_PARAMETERS'
      });
    }

    // Sanitize language code
    const validLangs = ['da', 'en', 'de', 'es'];
    if (!validLangs.includes(lang)) {
      return res.status(400).json({ 
        error: 'Invalid language code. Supported: da, en, de, es',
        code: 'INVALID_LANGUAGE'
      });
    }

    // HTML size limit
    if (html.length > 100000) { // 100KB limit
      return res.status(400).json({ 
        error: 'HTML content too large. Maximum 100KB allowed.',
        code: 'CONTENT_TOO_LARGE'
      });
    }

    // Return original HTML if English is requested
    if (lang === 'en') {
      return res.json({ 
        translation: html,
        cached: true,
        timestamp: new Date().toISOString()
      });
    }

    console.log(`AI Translating HTML block to ${lang}...`);
    const completion = await openrouter.chat.completions.create({
      model: "google/gemini-flash-1.5",
      messages: [
        {
          role: 'system',
          content: `You are an expert translator specializing in technical documentation.
          - Translate the user-visible text content within the provided HTML snippet to the target language.
          - **Crucially, do not alter, add, or remove any HTML tags or attributes.** Preserve the exact HTML structure.
          - For example, if you receive '<h2>What is MCP?</h2>', you should return '<h2>Hvad er MCP?</h2>' for Danish.
          - Only return the translated HTML snippet.`
        },
        {
          role: 'user',
          content: `Translate the following HTML to ${lang}:\\n\\n${html}`
        }
      ],
      temperature: 0.7,
    });
    const translatedHtml = completion.choices[0].message.content.trim();
    res.json({ 
      translation: translatedHtml,
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(`AI HTML Translation failed:`, error);
    res.status(500).json({ 
      error: 'Failed to translate HTML',
      code: 'TRANSLATION_FAILED'
    });
  }
});

// --- Global Error Handling ---
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    ...(isProduction ? {} : { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    code: 'NOT_FOUND'
  });
});

// --- Server Startup ---
const server = app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] AI Translation server listening at http://localhost:${port}`);
  console.log(`[${new Date().toISOString()}] Environment: ${NODE_ENV}`);
  console.log(`[${new Date().toISOString()}] Rate limiting: ${isProduction ? 'Enabled (strict)' : 'Enabled (relaxed)'}`);
});

// --- Graceful Shutdown ---
process.on('SIGTERM', () => {
  console.log('[SIGTERM] Graceful shutdown starting...');
  server.close(() => {
    console.log('[SIGTERM] Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[SIGINT] Graceful shutdown starting...');
  server.close(() => {
    console.log('[SIGINT] Server closed.');
    process.exit(0);
  });
});

// --- Unhandled Promise Rejection ---
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  if (isProduction) {
    process.exit(1);
  }
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  if (isProduction) {
    process.exit(1);
  }
}); 