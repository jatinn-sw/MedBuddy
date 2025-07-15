import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "https://api.openai.com"]
    }
  }
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', limiter);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Conversation storage (in production, use Redis or database)
const conversations = new Map();

// Medical prompt template
const MEDICAL_PROMPT = `You are MedBuddy, an AI medical assistant designed to help analyze symptoms and provide health guidance. 

Your role is to:
1. Analyze reported symptoms carefully
2. Ask clarifying questions when needed
3. Provide possible diagnoses with severity levels
4. Suggest appropriate actions based on severity

Severity Level Guidelines:
- RED (80-100): Rush to the hospital immediately
- ORANGE (60-80): Consult a doctor soon and follow basic remedies until then
- YELLOW (40-60): Visit a clinic or take an online consultation
- BLUE (20-40): Mild issue. Suggest home remedies
- GREEN (0-20): No significant health problem, no medical visit required

Always format your response with:
- The most likely diagnosis based on the symptoms
- The severity level (RED/ORANGE/YELLOW/BLUE/GREEN)
- Recommended actions based on severity level

Remember: You are not a replacement for professional medical advice. Always recommend consulting healthcare professionals for serious concerns.

Be empathetic, clear, and helpful in your responses.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'OpenAI API key not configured'
      });
    }

    // Get or create conversation history
    const sessionId = conversationId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    let conversation = conversations.get(sessionId) || [];

    // Add user message to conversation
    conversation.push({
      role: 'user',
      content: message
    });

    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: MEDICAL_PROMPT
      },
      ...conversation.slice(-10) // Keep last 10 messages for context
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const assistantMessage = completion.choices[0].message.content;

    // Add assistant response to conversation
    conversation.push({
      role: 'assistant',
      content: assistantMessage
    });

    // Store updated conversation (limit to last 20 messages)
    conversations.set(sessionId, conversation.slice(-20));

    // Clean up old conversations (simple memory management)
    if (conversations.size > 1000) {
      const oldestKey = conversations.keys().next().value;
      conversations.delete(oldestKey);
    }

    res.json({
      response: assistantMessage,
      conversationId: sessionId,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Chat API Error:', error);

    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        error: 'API quota exceeded. Please try again later.'
      });
    }

    if (error.code === 'rate_limit_exceeded') {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please wait a moment before trying again.'
      });
    }

    if (error.code === 'invalid_api_key') {
      return res.status(401).json({
        error: 'Invalid API configuration.'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'An error occurred while processing your request. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});