#!/usr/bin/env node

// AI-Powered Translation Generator using Google Gemini 2.0 Flash
// Generates contextually accurate, professional translations for MCP Hub

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const GEMINI_API_KEY = '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';
const GEMINI_MODEL = 'google/gemini-2.0-flash-001';
const API_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Source translations (English as reference)
const sourceTranslations = {
    // Navigation & Core
    loading: "Loading...",
    siteName: "MCP Hub",
    "nav.home": "Home",
    "nav.demo": "Demos", 
    "nav.blog": "Blog",
    "nav.playground": "Playground",
    "nav.tutorials": "Tutorials",
    "nav.pricing": "Pricing",

    // Hero Section
    "hero.title": "Master Model Context Protocol",
    "hero.subtitle": "Connect your AI to any data source with enterprise-grade security, performance, and reliability. Learn MCP through hands-on demos, expert tutorials, and production-ready examples.",
    "hero.startDemo": "Explore Demos",
    "hero.tryPlayground": "Try Playground",

    // Statistics
    "stats.developers": "Developers",
    "stats.integrations": "Integrations", 
    "stats.uptime": "% Uptime",
    "stats.support": "/7 Support",

    // Demo Section
    "demo.title": "Interactive MCP Demonstrations",
    "demo.subtitle": "Experience MCP's capabilities through live demos showcasing real-world integration patterns",
    "demo.filesystem.title": "Filesystem Integration",
    "demo.filesystem.description": "Demonstrate secure AI-to-filesystem interactions with read/write permissions and sandboxing",
    "demo.database.title": "Database Connections", 
    "demo.database.description": "Explore seamless AI-database integration with real-time queries and secure data access patterns",
    "demo.api.title": "API Integration",
    "demo.api.description": "Connect third-party APIs and web services directly into your AI workflows with MCP",
    "demo.realtime.title": "Real-time Data Streams",
    "demo.realtime.description": "Live data streaming and event-driven architecture for modern AI applications",

    // Code Examples
    "code.title": "Production-Ready Code Examples",
    "code.subtitle": "Implement MCP in your preferred programming language with battle-tested, scalable code",
    "code.copy": "Copy Code",

    // Playground
    "playground.title": "Interactive Code Playground", 
    "playground.subtitle": "Experiment with MCP implementations directly in your browser - no setup required",
    "playground.editor": "MCP Code Editor",
    "playground.run": "Run Code",
    "playground.reset": "Reset",
    "playground.output": "Output:",

    // Tutorials
    "tutorials.title": "Expert-Led Video Tutorials",
    "tutorials.subtitle": "Master MCP through structured, step-by-step tutorials from industry experts",
    "tutorials.intro.title": "MCP Fundamentals",
    "tutorials.intro.description": "Understand core concepts, architecture, and design principles behind Model Context Protocol",
    "tutorials.setup.title": "Production Server Setup",
    "tutorials.setup.description": "Build your first MCP server with security, monitoring, and scaling best practices",
    "tutorials.advanced.title": "Enterprise Integration Patterns",
    "tutorials.advanced.description": "Advanced patterns for enterprise deployment, error handling, and performance optimization",
    "tutorials.duration": "15 minutes",
    "tutorials.duration2": "25 minutes",
    "tutorials.duration3": "45 minutes", 
    "tutorials.beginner": "Beginner",
    "tutorials.intermediate": "Intermediate",
    "tutorials.advanced": "Advanced",

    // Testimonials
    "testimonials.title": "What Industry Leaders Say",
    "testimonials.subtitle": "Experiences from teams who've implemented MCP in production environments",
    "testimonials.quote1": "MCP completely transformed our AI integration strategy. We reduced complexity by 70% while significantly improving security and reliability.",
    "testimonials.quote2": "As a tech lead, I'd recommend MCP to anyone building scalable AI systems. The protocol is well-designed and the documentation is exceptional.",
    "testimonials.quote3": "We migrated from custom integrations to MCP in 3 weeks. Now we've standardized all AI connections and saved months of development time.",

    // Pricing
    "pricing.title": "Investment Calculator",
    "pricing.subtitle": "Calculate ROI and costs for your MCP enterprise implementation",
    "pricing.requests": "API Requests/month",
    "pricing.servers": "Server Instances", 
    "pricing.support": "Support Level",
    "pricing.basic": "Standard",
    "pricing.premium": "Professional",
    "pricing.enterprise": "Enterprise",
    "pricing.details": "Includes all features, 99.9% SLA, dedicated support, and enterprise security",

    // Real-time Demo
    "realtime.title": "Live Data Integration",
    "realtime.connection": "Connection Status",
    "realtime.connected": "Connected",
    "realtime.connecting": "Connecting...",
    "realtime.disconnected": "Disconnected",
    "realtime.subscribe": "Subscribe to Stream",
    "realtime.unsubscribe": "Unsubscribe",
    "realtime.streams": "Available Data Streams",
    "realtime.filters": "Data Filters",
    "realtime.export": "Export Dataset",
    "realtime.chart": "Live Visualization",
    "realtime.protocol": "MCP WebSocket",
    "realtime.stock": "Financial Data",
    "realtime.sensors": "IoT Sensors",
    "realtime.system": "System Metrics",
    "realtime.analytics": "Real-time Analytics",

    // Blog Section
    "blog.title": "MCP Expert Blog",
    "blog.subtitle": "In-depth articles, tutorials, and insights from the MCP community",
    "blog.readMore": "Read More",
    "blog.categories": "Categories",
    "blog.tags": "Tags", 
    "blog.author": "Written by",
    "blog.publishedOn": "Published on",
    "blog.readTime": "read time",
    "blog.relatedPosts": "Related Articles"
};

// Language configurations with cultural context
const languageConfigs = {
    da: {
        name: "Danish",
        context: "Professional Danish for software developers and technical decision makers. Use formal but accessible language. Avoid anglicisms where good Danish equivalents exist.",
        culturalNotes: "Danish tech culture values directness, efficiency, and practical solutions. Use 'du' form (informal) as it's standard in tech contexts."
    },
    de: {
        name: "German", 
        context: "Professional German for enterprise software and technical documentation. Use precise, technical language appropriate for German engineering culture.",
        culturalNotes: "German tech culture values precision, thoroughness, and technical excellence. Use formal language but avoid unnecessary complexity."
    },
    es: {
        name: "Spanish",
        context: "Professional Spanish for international business and technical audiences. Use neutral Spanish that works across different Spanish-speaking regions.",
        culturalNotes: "Focus on clear, professional language suitable for both European and Latin American Spanish speakers in tech industries."
    }
};

// Function to make API call to Gemini
async function callGeminiAPI(prompt) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: GEMINI_MODEL,
            messages: [
                {
                    role: "user", 
                    content: prompt
                }
            ],
            temperature: 0.3,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        const options = {
            hostname: 'openrouter.ai',
            port: 443,
            path: '/api/v1/chat/completions',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GEMINI_API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'HTTP-Referer': 'https://mcp-hub.com',
                'X-Title': 'MCP Hub Translation Service'
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(responseData);
                    if (response.choices && response.choices[0] && response.choices[0].message) {
                        resolve(response.choices[0].message.content);
                    } else {
                        reject(new Error('Invalid API response structure'));
                    }
                } catch (error) {
                    reject(new Error(`Failed to parse API response: ${error.message}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

// Generate translations for a specific language
async function generateTranslations(langCode) {
    const config = languageConfigs[langCode];
    if (!config) {
        throw new Error(`Language ${langCode} not supported`);
    }

    console.log(`🔄 Generating ${config.name} translations...`);

    const prompt = `You are a professional translator specializing in technical software documentation and marketing content for AI/ML products.

CONTEXT: You're translating content for "MCP Hub" - a platform that teaches developers how to use Model Context Protocol (MCP), which is Anthropic's new standard for connecting AI assistants to data sources and tools.

TARGET LANGUAGE: ${config.name}
AUDIENCE: ${config.context}
CULTURAL NOTES: ${config.culturalNotes}

TRANSLATION GUIDELINES:
1. Maintain technical accuracy - MCP terminology should be consistent
2. Keep brand names like "MCP Hub", "Model Context Protocol" in English  
3. Adapt tone to local business culture while staying professional
4. Use active voice and clear, concise language
5. Ensure call-to-action buttons are compelling in the target language
6. Technical terms like "API", "WebSocket", "JSON" stay in English
7. For testimonials, make them sound natural and authentic in the target language

IMPORTANT TECHNICAL TERMS TO KEEP CONSISTENT:
- Model Context Protocol = Model Context Protocol (don't translate)
- MCP = MCP (acronym stays)
- API = API  
- WebSocket = WebSocket
- JSON-RPC = JSON-RPC

Please translate the following key-value pairs from English to ${config.name}. Return ONLY a valid JSON object with the translated key-value pairs:

${JSON.stringify(sourceTranslations, null, 2)}

Return format: {"key": "translated_value", ...}`;

    try {
        const response = await callGeminiAPI(prompt);
        
        // Extract JSON from response (in case there's extra text)
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No valid JSON found in API response');
        }

        const translations = JSON.parse(jsonMatch[0]);
        console.log(`✅ Generated ${Object.keys(translations).length} ${config.name} translations`);
        
        return translations;
    } catch (error) {
        console.error(`❌ Error generating ${config.name} translations:`, error.message);
        throw error;
    }
}

// Generate all translations and save to file
async function generateAllTranslations() {
    console.log('🚀 Starting AI-powered translation generation...\n');
    
    const allTranslations = {
        en: sourceTranslations // English as base
    };

    // Generate translations for each target language
    for (const langCode of Object.keys(languageConfigs)) {
        try {
            allTranslations[langCode] = await generateTranslations(langCode);
            // Add delay to respect API rate limits
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Failed to generate ${langCode} translations:`, error.message);
            process.exit(1);
        }
    }

    // Create the enhanced translations file
    const outputContent = `// AI-Generated Enhanced Translations for MCP Hub
// Generated using Google Gemini 2.0 Flash
// Professional, contextually accurate translations for technical content

const translations = ${JSON.stringify(allTranslations, null, 4)};

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = translations;
}

// Global assignment for browser use  
if (typeof window !== 'undefined') {
    window.translations = translations;
}`;

    const outputPath = path.join(__dirname, '..', 'public', 'translations.js');
    fs.writeFileSync(outputPath, outputContent);
    
    console.log(`\n✅ All translations generated successfully!`);
    console.log(`📝 Saved to: ${outputPath}`);
    console.log(`📊 Languages: ${Object.keys(allTranslations).join(', ')}`);
    console.log(`🔢 Total translations: ${Object.keys(sourceTranslations).length} keys x ${Object.keys(allTranslations).length} languages = ${Object.keys(sourceTranslations).length * Object.keys(allTranslations).length} total`);
}

// Run the script
if (require.main === module) {
    generateAllTranslations().catch(error => {
        console.error('💥 Translation generation failed:', error.message);
        process.exit(1);
    });
}

module.exports = { generateAllTranslations, generateTranslations };