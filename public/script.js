// Chat functionality with OpenAI API
class ChatBot {
  constructor() {
    this.conversationId = null;
    this.isLoading = false;
    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    this.sendButton = document.getElementById('send-button');
    this.userInput = document.getElementById('user-input');
    this.chatBox = document.getElementById('chat-box');
    this.letsTalkButton = document.getElementById('lets-talk-btn');
    this.chatContainer = document.getElementById('chat-container');
    this.closeButton = document.getElementById('close-chat');
    this.sendText = document.getElementById('send-text');
    this.loadingSpinner = document.getElementById('loading-spinner');
  }

  attachEventListeners() {
    // Open chat
    this.letsTalkButton.addEventListener('click', () => this.openChat());
    
    // Close chat
    this.closeButton.addEventListener('click', () => this.closeChat());
    
    // Send message
    this.sendButton.addEventListener('click', () => this.sendMessage());
    
    // Enter key support
    this.userInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    });

    // Input validation
    this.userInput.addEventListener('input', () => this.validateInput());

    // Navigation buttons
    document.getElementById('medical-facilities').addEventListener('click', () => {
      window.open('https://www.google.com/search?q=medical+facilities+near+me', '_blank');
    });

    document.getElementById('online-consultation').addEventListener('click', () => {
      window.open('https://www.practo.com/consult', '_blank');
    });
  }

  openChat() {
    this.chatContainer.style.display = 'flex';
    this.userInput.focus();
    
    // Add welcome message if chat is empty
    if (this.chatBox.children.length === 0) {
      this.addBotMessage(
        "Hello! I'm MedBuddy, your AI medical assistant. Please describe your symptoms, and I'll help analyze them and provide guidance. Remember, I'm here to provide information, but always consult healthcare professionals for serious concerns."
      );
    }
  }

  closeChat() {
    this.chatContainer.style.display = 'none';
  }

  validateInput() {
    const message = this.userInput.value.trim();
    this.sendButton.disabled = !message || this.isLoading;
  }

  async sendMessage() {
    const message = this.userInput.value.trim();
    if (!message || this.isLoading) return;

    // Add user message to chat
    this.addUserMessage(message);
    this.userInput.value = '';
    this.setLoading(true);

    try {
      const response = await this.callChatAPI(message);
      
      if (response.error) {
        this.addErrorMessage(response.error);
      } else {
        this.conversationId = response.conversationId;
        this.addBotMessage(response.response);
      }
    } catch (error) {
      console.error('Chat error:', error);
      this.addErrorMessage('Sorry, I\'m having trouble connecting right now. Please try again in a moment.');
    } finally {
      this.setLoading(false);
    }
  }

  async callChatAPI(message) {
    const apiUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5000/api/chat'
      : '/api/chat';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        conversationId: this.conversationId
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  }

  setLoading(loading) {
    this.isLoading = loading;
    this.sendButton.disabled = loading || !this.userInput.value.trim();
    
    if (loading) {
      this.sendText.style.display = 'none';
      this.loadingSpinner.style.display = 'inline';
    } else {
      this.sendText.style.display = 'inline';
      this.loadingSpinner.style.display = 'none';
    }
  }

  addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('user-message');
    messageElement.textContent = message;
    this.chatBox.appendChild(messageElement);
    this.scrollToBottom();
  }

  addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('bot-message');
    
    // Add severity color coding
    const severityMatch = message.match(/severity level is:\s*(\w+)/i);
    if (severityMatch) {
      const severity = severityMatch[1].toLowerCase();
      messageElement.classList.add(`severity-${severity}`);
    }
    
    // Format the message with line breaks
    const formattedMessage = this.formatMessage(message);
    messageElement.innerHTML = formattedMessage;
    
    this.chatBox.appendChild(messageElement);
    this.scrollToBottom();
  }

  addErrorMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('error-message');
    messageElement.textContent = message;
    this.chatBox.appendChild(messageElement);
    this.scrollToBottom();
  }

  formatMessage(message) {
    return message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/(\d+\.)\s/g, '<br>$1 ')
      .replace(/^<br>/, '')
      .replace(/\n/g, '<br>');
  }

  scrollToBottom() {
    this.chatBox.scrollTop = this.chatBox.scrollHeight;
  }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new ChatBot();
});

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}