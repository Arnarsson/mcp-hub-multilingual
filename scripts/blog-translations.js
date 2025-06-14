#!/usr/bin/env node

// Blog-specific translations to add to the main translations file

const blogTranslations = {
    en: {
        // Blog post titles and content
        "blog.post1.title": "Understanding MCP: The Protocol That Connects AI to Everything",
        "blog.post1.excerpt": "Discover how Model Context Protocol revolutionizes AI integrations by providing a standardized way to connect AI assistants to any data source or tool.",
        
        "blog.post2.title": "MCP Architecture Deep Dive: How It Really Works",
        "blog.post2.excerpt": "Explore the technical architecture behind MCP, including the client-server model, resource management, and security considerations.",
        
        "blog.post3.title": "Build Your First MCP Server: A Step-by-Step Tutorial",
        "blog.post3.excerpt": "Learn to build a production-ready MCP server from scratch with this comprehensive tutorial covering setup, security, and best practices.",
        
        "blog.post4.title": "MCP Use Cases: From File Management to Real-Time Data",
        "blog.post4.excerpt": "Explore real-world applications of MCP across different industries and discover how teams are leveraging it for various integration scenarios."
    },
    
    da: {
        "blog.post1.title": "Forstå MCP: Protokollen Der Forbinder AI Til Alt",
        "blog.post1.excerpt": "Opdag hvordan Model Context Protocol revolutionerer AI-integrationer ved at give en standardiseret måde at forbinde AI-assistenter til enhver datakilde eller værktøj.",
        
        "blog.post2.title": "MCP Arkitektur Dybdegående: Sådan Virker Det Virkelig",
        "blog.post2.excerpt": "Udforsk den tekniske arkitektur bag MCP, inklusive klient-server modellen, ressourcestyring og sikkerhedsovervejelser.",
        
        "blog.post3.title": "Byg Din Første MCP Server: En Step-by-Step Tutorial",
        "blog.post3.excerpt": "Lær at bygge en produktionsklar MCP server fra bunden med denne omfattende tutorial der dækker opsætning, sikkerhed og best practices.",
        
        "blog.post4.title": "MCP Use Cases: Fra Filhåndtering Til Realtidsdata",
        "blog.post4.excerpt": "Udforsk virkelige anvendelser af MCP på tværs af forskellige industrier og opdag hvordan teams udnytter det til forskellige integrationsscenarier."
    },
    
    de: {
        "blog.post1.title": "MCP Verstehen: Das Protokoll Das KI Mit Allem Verbindet",
        "blog.post1.excerpt": "Entdecken Sie, wie Model Context Protocol KI-Integrationen revolutioniert, indem es eine standardisierte Methode bietet, KI-Assistenten mit jeder Datenquelle oder jedem Tool zu verbinden.",
        
        "blog.post2.title": "MCP Architektur Tiefgang: Wie Es Wirklich Funktioniert",
        "blog.post2.excerpt": "Erkunden Sie die technische Architektur hinter MCP, einschließlich Client-Server-Modell, Ressourcenverwaltung und Sicherheitsüberlegungen.",
        
        "blog.post3.title": "Erstellen Sie Ihren Ersten MCP Server: Eine Schritt-für-Schritt Anleitung",
        "blog.post3.excerpt": "Lernen Sie, einen produktionsreifen MCP-Server von Grund auf zu erstellen mit diesem umfassenden Tutorial zu Setup, Sicherheit und Best Practices.",
        
        "blog.post4.title": "MCP Anwendungsfälle: Von Dateiverwaltung Bis Echtzeitdaten",
        "blog.post4.excerpt": "Erkunden Sie reale Anwendungen von MCP in verschiedenen Branchen und entdecken Sie, wie Teams es für verschiedene Integrationsszenarien nutzen."
    },
    
    es: {
        "blog.post1.title": "Entendiendo MCP: El Protocolo Que Conecta IA A Todo",
        "blog.post1.excerpt": "Descubre cómo Model Context Protocol revoluciona las integraciones de IA proporcionando una forma estandarizada de conectar asistentes de IA a cualquier fuente de datos o herramienta.",
        
        "blog.post2.title": "Arquitectura MCP En Profundidad: Cómo Funciona Realmente",
        "blog.post2.excerpt": "Explora la arquitectura técnica detrás de MCP, incluyendo el modelo cliente-servidor, gestión de recursos y consideraciones de seguridad.",
        
        "blog.post3.title": "Construye Tu Primer Servidor MCP: Un Tutorial Paso A Paso",
        "blog.post3.excerpt": "Aprende a construir un servidor MCP listo para producción desde cero con este tutorial integral que cubre configuración, seguridad y mejores prácticas.",
        
        "blog.post4.title": "Casos De Uso MCP: Desde Gestión De Archivos Hasta Datos En Tiempo Real",
        "blog.post4.excerpt": "Explora aplicaciones del mundo real de MCP en diferentes industrias y descubre cómo los equipos lo aprovechan para diversos escenarios de integración."
    }
};

// Add these to the main translations file
const fs = require('fs');
const path = require('path');

const translationsPath = path.join(__dirname, '..', 'public', 'translations.js');
let content = fs.readFileSync(translationsPath, 'utf8');

// Parse the existing translations
const translationsMatch = content.match(/const translations = (\{[\s\S]*?\});/);
if (translationsMatch) {
    const existingTranslations = eval('(' + translationsMatch[1] + ')');
    
    // Merge blog translations
    Object.keys(blogTranslations).forEach(lang => {
        if (existingTranslations[lang]) {
            Object.assign(existingTranslations[lang], blogTranslations[lang]);
        }
    });
    
    // Update the file
    const newContent = content.replace(
        /const translations = \{[\s\S]*?\};/,
        `const translations = ${JSON.stringify(existingTranslations, null, 4)};`
    );
    
    fs.writeFileSync(translationsPath, newContent);
    console.log('✅ Blog translations added successfully!');
} else {
    console.error('❌ Could not find translations object in file');
}