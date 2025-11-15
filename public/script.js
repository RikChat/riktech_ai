class RikTechAI {
    constructor() {
        this.currentChat = [];
        this.chatHistory = JSON.parse(localStorage.getItem('riktech_chat_history')) || [];
        this.conversationContext = [];
        this.settings = this.loadSettings();
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('Initializing RikTech AI...');
        
        // Setup event listeners first
        this.attachEventListeners();
        
        // Hide splash screen after 2 seconds dengan fallback
        const splashTimeout = setTimeout(() => {
            this.hideSplashScreen();
        }, 2000);

        // Fallback: hide splash screen setelah 5 detik
        const fallbackTimeout = setTimeout(() => {
            console.warn('Fallback: Force hiding splash screen');
            this.forceHideSplash();
        }, 5000);

        // Skip splash button
        const skipBtn = document.getElementById('skipSplash');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                clearTimeout(splashTimeout);
                clearTimeout(fallbackTimeout);
                this.forceHideSplash();
            });
        }

        this.isInitialized = true;
    }

    forceHideSplash() {
        const splashScreen = document.getElementById('splashScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (splashScreen) splashScreen.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        this.applySettings();
        this.setupQuickActions();
        
        // Focus ke input
        const messageInput = document.getElementById('messageInput');
        if (messageInput) messageInput.focus();
    }

    hideSplashScreen() {
        try {
            const splashScreen = document.getElementById('splashScreen');
            const mainApp = document.getElementById('mainApp');
            
            if (!splashScreen || !mainApp) {
                console.error('Required elements not found');
                this.forceHideSplash();
                return;
            }

            splashScreen.classList.add('hidden');
            mainApp.classList.remove('hidden');
            this.applySettings();
            this.setupQuickActions();
            
            // Focus ke input
            const messageInput = document.getElementById('messageInput');
            if (messageInput) messageInput.focus();
            
        } catch (error) {
            console.error('Error hiding splash screen:', error);
            this.forceHideSplash();
        }
    }

    loadSettings() {
        try {
            return {
                theme: localStorage.getItem('riktech_theme') || 'light',
                fontSize: localStorage.getItem('riktech_fontSize') || '16'
            };
        } catch (error) {
            console.error('Error loading settings:', error);
            return { theme: 'light', fontSize: '16' };
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('riktech_theme', this.settings.theme);
            localStorage.setItem('riktech_fontSize', this.settings.fontSize);
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    applySettings() {
        try {
            // Apply theme
            document.documentElement.setAttribute('data-theme', this.settings.theme);
            
            // Apply font size
            document.documentElement.style.fontSize = this.settings.fontSize + 'px';

            // Update settings form jika ada
            const themeSelect = document.getElementById('themeSelect');
            if (themeSelect) themeSelect.value = this.settings.theme;

        } catch (error) {
            console.error('Error applying settings:', error);
        }
    }

    attachEventListeners() {
        try {
            console.log('Attaching event listeners...');
            
            // Basic event listeners dulu
            this.setupBasicEvents();
            
            // Menu events
            this.setupMenuEvents();
            
            // Settings events
            this.setupSettingsEvents();
            
            // Input events
            this.setupInputEvents();
            
            console.log('Event listeners attached successfully');
            
        } catch (error) {
            console.error('Error attaching event listeners:', error);
        }
    }

    setupBasicEvents() {
        // Send message
        const sendButton = document.getElementById('sendButton');
        const messageInput = document.getElementById('messageInput');
        
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }
        
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
            
            messageInput.addEventListener('input', () => this.updateCharCount());
        }

        // Clear input
        const clearInput = document.getElementById('clearInput');
        if (clearInput) {
            clearInput.addEventListener('click', () => {
                if (messageInput) {
                    messageInput.value = '';
                    this.updateCharCount();
                }
            });
        }

        // Close modals
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) modal.classList.add('hidden');
            });
        });

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        });
    }

    setupMenuEvents() {
        // Dropdown menu
        const dropdownBtn = document.querySelector('.dropdown-btn');
        if (dropdownBtn) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdownContent = document.querySelector('.dropdown-content');
                if (dropdownContent) {
                    const isVisible = dropdownContent.style.display === 'block';
                    dropdownContent.style.display = isVisible ? 'none' : 'block';
                }
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            const dropdownContent = document.querySelector('.dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        });

        // Menu items
        this.setupMenuItem('newChat', () => this.newChat());
        this.setupMenuItem('showHistory', () => this.showHistory());
        this.setupMenuItem('showSettings', () => this.showSettings());
        this.setupMenuItem('showAppInfo', () => this.showAppInfo());
        this.setupMenuItem('showDevInfo', () => this.showDevInfo());
    }

    setupMenuItem(id, handler) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                handler();
            });
        }
    }

    setupSettingsEvents() {
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                this.settings.theme = e.target.value;
                this.saveSettings();
                this.applySettings();
            });
        }
    }

    setupInputEvents() {
        // Character count
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('input', () => this.updateCharCount());
        }
    }

    setupQuickActions() {
        try {
            const actionCards = document.querySelectorAll('.action-card');
            actionCards.forEach(card => {
                card.addEventListener('click', () => {
                    const prompt = card.getAttribute('data-prompt');
                    const messageInput = document.getElementById('messageInput');
                    if (messageInput && prompt) {
                        messageInput.value = prompt;
                        this.updateCharCount();
                        messageInput.focus();
                    }
                });
            });
        } catch (error) {
            console.error('Error setting up quick actions:', error);
        }
    }

    updateCharCount() {
        const input = document.getElementById('messageInput');
        const charCount = document.getElementById('charCount');
        if (input && charCount) {
            const count = input.value.length;
            charCount.textContent = `${count}/1000`;
        }
    }

    async sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input?.value.trim();
        
        if (!message || !input) return;

        // Hide welcome section on first message
        const welcomeSection = document.getElementById('welcomeSection');
        const chatMessages = document.getElementById('chatMessages');
        if (welcomeSection && chatMessages && !welcomeSection.classList.contains('hidden')) {
            welcomeSection.classList.add('hidden');
            chatMessages.classList.remove('hidden');
        }

        // Clear input
        input.value = '';
        this.updateCharCount();

        // Add user message to chat
        this.addMessage(message, 'user');

        // Show typing indicator
        this.showTypingIndicator();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message,
                    conversationHistory: this.conversationContext.slice(-5)
                })
            });

            this.hideTypingIndicator();

            if (response.ok) {
                const data = await response.json();
                this.addMessage(data.response, 'ai', data.messageId);
                
                // Update conversation context
                this.conversationContext.push({
                    role: 'user',
                    message: message
                }, {
                    role: 'assistant',
                    message: data.response
                });
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage(
                'Maaf, terjadi kesalahan sementara. Silakan coba lagi dalam beberapa saat.', 
                'ai'
            );
            console.error('Error sending message:', error);
        }
    }

    addMessage(content, sender, messageId = null) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (messageId) {
            messageDiv.id = messageId;
        }

        const timestamp = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const messageHeader = sender === 'ai' ? 
            '<div class="message-header"><i class="fas fa-robot"></i> RikTech AI</div>' : 
            '<div class="message-header"><i class="fas fa-user"></i> Anda</div>';

        const formattedContent = this.formatMessage(content);

        messageDiv.innerHTML = `
            ${messageHeader}
            <div class="message-content">${formattedContent}</div>
            <div class="message-time">${timestamp}</div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Save to current chat
        this.currentChat.push({
            content,
            sender,
            timestamp: new Date().toISOString(),
            messageId
        });

        // Auto-save to history jika AI response
        if (sender === 'ai') {
            this.saveToHistory();
        }
    }

    formatMessage(content) {
        return this.escapeHtml(content)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        const chatMessages = document.getElementById('chatMessages');
        
        if (typingIndicator && chatMessages) {
            typingIndicator.classList.remove('hidden');
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.classList.add('hidden');
        }
    }

    newChat() {
        if (this.currentChat.length > 0) {
            this.saveToHistory();
        }
        
        this.currentChat = [];
        this.conversationContext = [];
        
        const welcomeSection = document.getElementById('welcomeSection');
        const chatMessages = document.getElementById('chatMessages');
        
        if (welcomeSection && chatMessages) {
            welcomeSection.classList.remove('hidden');
            chatMessages.classList.add('hidden');
            chatMessages.innerHTML = '';
        }
        
        const messageInput = document.getElementById('messageInput');
        if (messageInput) messageInput.focus();
    }

    showHistory() {
        const historyList = document.getElementById('historyList');
        const historyModal = document.getElementById('historyModal');
        
        if (!historyList || !historyModal) return;

        historyList.innerHTML = '';

        if (this.chatHistory.length === 0) {
            historyList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                    <i class="fas fa-history" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>Belum ada history percakapan</p>
                </div>
            `;
        } else {
            this.chatHistory.forEach((chat, index) => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                
                const lastMessage = chat.messages[chat.messages.length - 1];
                const preview = lastMessage.content.substring(0, 100) + (lastMessage.content.length > 100 ? '...' : '');
                
                historyItem.innerHTML = `
                    <div style="display: flex; justify-content: between; align-items: start; gap: 1rem;">
                        <div style="flex: 1;">
                            <strong>Percakapan ${this.chatHistory.length - index}</strong>
                            <p style="margin: 0.5rem 0; color: var(--text-secondary); font-size: 0.875rem;">${preview}</p>
                            <small>${new Date(chat.timestamp).toLocaleDateString('id-ID')} • ${chat.messages.length} pesan</small>
                        </div>
                    </div>
                `;
                
                historyItem.addEventListener('click', () => {
                    this.loadHistory(chat);
                    historyModal.classList.add('hidden');
                });

                historyList.appendChild(historyItem);
            });
        }

        historyModal.classList.remove('hidden');
    }

    loadHistory(chat) {
        this.newChat();
        const welcomeSection = document.getElementById('welcomeSection');
        const chatMessages = document.getElementById('chatMessages');
        
        if (welcomeSection && chatMessages) {
            welcomeSection.classList.add('hidden');
            chatMessages.classList.remove('hidden');
        }

        chat.messages.forEach(msg => {
            this.addMessage(msg.content, msg.sender, msg.messageId);
        });

        // Restore conversation context
        this.conversationContext = chat.messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            message: msg.content
        }));
    }

    saveToHistory() {
        if (this.currentChat.length > 0) {
            const chat = {
                messages: [...this.currentChat],
                timestamp: new Date().toISOString(),
                context: this.conversationContext
            };

            this.chatHistory.push(chat);
            
            // Keep only last 20 chats
            if (this.chatHistory.length > 20) {
                this.chatHistory = this.chatHistory.slice(-20);
            }

            try {
                localStorage.setItem('riktech_chat_history', JSON.stringify(this.chatHistory));
            } catch (error) {
                console.error('Error saving history:', error);
            }
        }
    }

    showSettings() {
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            settingsModal.classList.remove('hidden');
        }
    }

    showAppInfo() {
        const appInfoModal = document.getElementById('appInfoModal');
        if (appInfoModal) {
            appInfoModal.classList.remove('hidden');
        }
    }

    showDevInfo() {
        const devInfoModal = document.getElementById('devInfoModal');
        if (devInfoModal) {
            devInfoModal.classList.remove('hidden');
        }
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting RikTech AI');
    try {
        window.riktechAI = new RikTechAI();
        window.riktechAI.init();
    } catch (error) {
        console.error('Failed to initialize RikTech AI:', error);
        // Fallback: langsung tampilkan main app
        const splashScreen = document.getElementById('splashScreen');
        const mainApp = document.getElementById('mainApp');
        if (splashScreen) splashScreen.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
    }
});

// Fallback jika ada error
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    const splashScreen = document.getElementById('splashScreen');
    const mainApp = document.getElementById('mainApp');
    if (splashScreen && mainApp && !mainApp.classList.contains('hidden')) {
        splashScreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
    }
});
