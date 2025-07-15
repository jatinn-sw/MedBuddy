# 🏥 MedBuddy - AI-Powered Medical Assistant (Cloud Version)

A modern, intelligent medical chatbot that provides accurate health information, symptom analysis, and personalized medical guidance using OpenAI's GPT models. Now deployable globally on Vercel!

![MedBuddy Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Tech Stack](https://img.shields.io/badge/Tech-Node.js%20%7C%20Express%20%7C%20OpenAI%20%7C%20Vercel-orange)

## 🌟 Features

### 🤖 AI-Powered Medical Assistant
- **OpenAI GPT Integration**: Uses advanced language models for intelligent medical conversations
- **Intelligent Symptom Analysis**: Advanced AI that asks targeted questions to narrow down health concerns
- **Personalized Recommendations**: Tailored health advice based on your specific symptoms
- **Conversation Memory**: Maintains context throughout the conversation for better follow-up care
- **Global Accessibility**: Works from anywhere in the world with cloud-based infrastructure

### 🔒 Production-Ready Security
- **API Key Protection**: Secure environment variable handling for sensitive credentials
- **Rate Limiting**: Prevents abuse with configurable request limits
- **CORS Protection**: Secure cross-origin resource sharing configuration
- **Input Validation**: Comprehensive validation and sanitization of user inputs
- **Error Handling**: Graceful error handling with user-friendly messages

### 🚀 Cloud Infrastructure
- **Vercel Deployment**: Optimized for global edge deployment
- **Serverless Architecture**: Scales automatically based on demand
- **Environment Management**: Secure configuration management
- **Performance Monitoring**: Built-in logging and error tracking

## 🚀 Quick Deployment

### Prerequisites
- [OpenAI API Key](https://platform.openai.com/api-keys)
- [Vercel Account](https://vercel.com)
- Node.js 18+ (for local development)

### 1. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key for later use

### 2. Deploy to Vercel

#### Option A: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/medbuddy-cloud)

#### Option B: Manual Deploy
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/medbuddy-cloud.git
   cd medbuddy-cloud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-3.5-turbo
   NODE_ENV=production
   ```

4. **Deploy to Vercel**
   ```bash
   npx vercel
   ```

5. **Configure environment variables in Vercel**
   ```bash
   vercel env add OPENAI_API_KEY
   vercel env add OPENAI_MODEL
   ```

### 3. Configure Domain (Optional)
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain

## 💻 Local Development

### Setup
1. **Clone and install**
   ```bash
   git clone https://github.com/your-username/medbuddy-cloud.git
   cd medbuddy-cloud
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your OpenAI API key
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Development Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run preview` - Preview production build locally

## 🛠️ Technology Stack

### Backend
- **Node.js & Express**: Server framework with middleware support
- **OpenAI API**: GPT-3.5/GPT-4 for intelligent conversations
- **Express Rate Limit**: API rate limiting and abuse prevention
- **Helmet**: Security headers and protection
- **CORS**: Cross-origin resource sharing configuration

### Frontend
- **Vanilla JavaScript**: Lightweight, fast client-side code
- **Modern CSS**: CSS Grid, Flexbox, and custom properties
- **Progressive Web App**: Service worker for offline functionality
- **Responsive Design**: Mobile-first responsive layout

### Infrastructure
- **Vercel**: Global edge deployment and serverless functions
- **Environment Variables**: Secure configuration management
- **CDN**: Global content delivery for optimal performance

## 🔧 Configuration

### Environment Variables
```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional
OPENAI_MODEL=gpt-3.5-turbo          # or gpt-4
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com
RATE_LIMIT_WINDOW_MS=900000         # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100         # requests per window
```

### API Models
- **gpt-3.5-turbo**: Fast, cost-effective (recommended for most use cases)
- **gpt-4**: More accurate, higher cost
- **gpt-4-turbo**: Latest model with improved performance

### Rate Limiting
- Default: 100 requests per 15 minutes per IP
- Configurable via environment variables
- Prevents API abuse and controls costs

## 🔒 Security Features

### API Security
- **Environment Variables**: API keys never exposed to client
- **Rate Limiting**: Prevents abuse and DoS attacks
- **Input Validation**: Sanitizes and validates all user inputs
- **CORS Configuration**: Restricts cross-origin requests
- **Helmet Security**: Adds security headers

### Error Handling
- **Graceful Degradation**: User-friendly error messages
- **API Error Mapping**: Specific handling for OpenAI API errors
- **Timeout Protection**: Prevents hanging requests
- **Logging**: Comprehensive error logging for debugging

## 📊 Monitoring & Analytics

### Built-in Monitoring
- **Health Check Endpoint**: `/api/health` for uptime monitoring
- **Error Logging**: Comprehensive error tracking
- **Usage Metrics**: Request counting and rate limiting stats

### Vercel Analytics
- **Performance Monitoring**: Built-in performance metrics
- **Error Tracking**: Automatic error reporting
- **Usage Analytics**: Traffic and usage patterns

## 🌐 Global Deployment

### Edge Locations
Vercel automatically deploys to global edge locations:
- **Americas**: US East, US West, Brazil
- **Europe**: London, Frankfurt, Stockholm
- **Asia-Pacific**: Tokyo, Singapore, Sydney
- **And more**: 40+ global regions

### Performance Optimization
- **Edge Caching**: Static assets cached globally
- **Serverless Functions**: Auto-scaling based on demand
- **CDN**: Global content delivery network
- **Compression**: Automatic gzip/brotli compression

## 💰 Cost Management

### OpenAI API Costs
- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **GPT-4**: ~$0.03 per 1K tokens
- **Rate Limiting**: Helps control usage and costs
- **Token Optimization**: Efficient prompt engineering

### Vercel Costs
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for commercial use
- **Enterprise**: Custom pricing for large scale

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and formatting
- Test on multiple browsers and devices
- Ensure security best practices
- Update documentation for new features
- Test with different OpenAI models

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Important Medical Disclaimer**: MedBuddy is an AI-powered health information tool and should not replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns. In case of emergency, contact emergency services immediately.

## 🙏 Acknowledgments

- **OpenAI**: For providing the advanced language models
- **Vercel**: For the excellent deployment platform
- **Medical Professionals**: For reviewing and validating health content
- **Open Source Community**: For the tools and libraries that made this possible

## 📞 Support

If you encounter any issues:

1. **Check the Issues** page for existing problems
2. **Create a new issue** with detailed information
3. **Include system details** and error messages
4. **Provide steps to reproduce** the problem

---

**Made for better healthcare accessibility worldwide**

*MedBuddy - Your Global AI Health Companion*