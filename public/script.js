class RikTechAI {
    constructor() {
        this.currentChat = [];
        this.chatHistory = JSON.parse(localStorage.getItem('riktech_chat_history')) || [];
        this.conversationContext = [];
        this.settings = this.loadSettings();
        this.isInitialized = false;
        this.aiStatus = 'initializing';
        this.conversationMetrics = {
            messageCount: 0,
            averageResponseTime: 0,
            userEngagement: 0,
            topicsDiscussed: new Set()
        };
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🚀 Initializing RikTech AI Enhanced...');
        
        // Initialize with error handling
        try {
            this.attachEventListeners();
            this.setupAdvancedFeatures();
            
            // Enhanced splash screen with progress tracking
            this.initializeSplashScreen();
            
            this.isInitialized = true;
            this.updateAIStatus('ready');
            
        } catch (error) {
            console.error('Initialization error:', error);
            this.emergencyStart();
        }
    }

    initializeSplashScreen() {
        const splashTimeout = setTimeout(() => {
            this.hideSplashScreen();
        }, 2500);

        // Enhanced fallback system
        const fallbackTimeout = setTimeout(() => {
            console.warn('🔄 Force starting application...');
            this.forceHideSplash();
        }, 6000);

        // Skip button with enhanced functionality
        const skipBtn = document.getElementById('skipSplash');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => {
                clearTimeout(splashTimeout);
                clearTimeout(fallbackTimeout);
                this.forceHideSplash();
                this.trackUserAction('splash_skipped');
            });
        }

        // Load AI modules progressively
        this.preloadAIModules();
    }

    preloadAIModules() {
        const modules = ['knowledge', 'reasoning', 'creative', 'analytical'];
        let loaded = 0;
        
        modules.forEach(module => {
            setTimeout(() => {
                loaded++;
                this.updateSplashProgress((loaded / modules.length) * 100);
            }, Math.random() * 1000);
        });
    }

    updateSplashProgress(percent) {
        const progress = document.querySelector('.loading-bar .progress');
        if (progress) {
            progress.style.width = `${percent}%`;
        }
    }

    hideSplashScreen() {
        try {
            const splashScreen = document.getElementById('splashScreen');
            const mainApp = document.getElementById('mainApp');
            
            if (!splashScreen || !mainApp) {
                throw new Error('UI elements not found');
            }

            // Add fade-out animation
            splashScreen.style.opacity = '0';
            splashScreen.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                mainApp.classList.remove('hidden');
                mainApp.style.opacity = '0';
                mainApp.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    mainApp.style.opacity = '1';
                    this.onAppReady();
                }, 50);
            }, 500);
            
        } catch (error) {
            console.error('Error in hideSplashScreen:', error);
            this.forceHideSplash();
        }
    }

    forceHideSplash() {
        const splashScreen = document.getElementById('splashScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (splashScreen) splashScreen.classList.add('hidden');
        if (mainApp) {
            mainApp.classList.remove('hidden');
            this.onAppReady();
        }
    }

    onAppReady() {
        this.applySettings();
        this.setupQuickActions();
        this.initializeAICapabilities();
        
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.focus();
            this.showWelcomeTip();
        }
        
        this.updateAIStatus('active');
        this.trackUserAction('app_ready');
    }

    initializeAICapabilities() {
        // Initialize advanced AI features
        this.setupVoiceInput();
        this.setupSmartSuggestions();
        this.initializeLearningEngine();
    }

    setupVoiceInput() {
        // Placeholder for voice input functionality
        console.log('🎤 Voice input module initialized');
    }

    setupSmartSuggestions() {
        // Smart suggestion engine
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('input', (e) => {
                this.generateSmartSuggestions(e.target.value);
            });
        }
    }

    generateSmartSuggestions(text) {
        if (text.length > 3) {
            // Simple keyword-based suggestions
            const suggestions = {
                'python': 'ingin belajar Python programming?',
                'javascript': 'butuh bantuan dengan JavaScript?',
                'website': 'mau buat website?',
                'ai': 'penasaran dengan Artificial Intelligence?',
                'database': 'perlu bantuan dengan database?'
            };

            for (const [keyword, suggestion] of Object.entries(suggestions)) {
                if (text.toLowerCase().includes(keyword)) {
                    this.showSuggestion(suggestion);
                    break;
                }
            }
        }
    }

    showSuggestion(suggestion) {
        // Remove existing suggestion
        const existingSuggestion = document.getElementById('smartSuggestion');
        if (existingSuggestion) {
            existingSuggestion.remove();
        }

        // Create new suggestion
        const suggestionElement = document.createElement('div');
        suggestionElement.id = 'smartSuggestion';
        suggestionElement.className = 'smart-suggestion';
        suggestionElement.innerHTML = `
            <span>💡 ${suggestion}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        const inputSection = document.querySelector('.input-section');
        if (inputSection) {
            inputSection.appendChild(suggestionElement);
        }
    }

    initializeLearningEngine() {
        // Analyze user patterns for personalization
        this.analyzeUserPatterns();
    }

    analyzeUserPatterns() {
        if (this.chatHistory.length > 0) {
            const recentChats = this.chatHistory.slice(-5);
            recentChats.forEach(chat => {
                chat.messages.forEach(msg => {
                    if (msg.sender === 'user') {
                        this.learnFromUserMessage(msg.content);
                    }
                });
            });
        }
    }

    learnFromUserMessage(message) {
        // Simple learning: track frequently discussed topics
        const words = message.toLowerCase().split(' ');
        words.forEach(word => {
            if (word.length > 4) {
                this.conversationMetrics.topicsDiscussed.add(word);
            }
        });
    }

    showWelcomeTip() {
        const tips = [
            "💡 Tips: Anda bisa menanyakan tentang programming, AI, bisnis, atau topik lainnya!",
            "🚀 Coba klik quick actions untuk pertanyaan cepat!",
            "🎯 RikTech AI memahami konteks percakapan Anda",
            "🔍 Semakin spesifik pertanyaan, semakin akurat jawabannya"
        ];

        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        this.showTemporaryMessage(randomTip, 'info');
    }

    showTemporaryMessage(message, type = 'info') {
        const tempMsg = document.createElement('div');
        tempMsg.className = `temp-message temp-${type}`;
        tempMsg.textContent = message;

        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.appendChild(tempMsg);

            setTimeout(() => {
                tempMsg.remove();
            }, 5000);
        }
    }

    // Enhanced Settings System
    loadSettings() {
        try {
            return {
                theme: localStorage.getItem('riktech_theme') || 'light',
                fontSize: localStorage.getItem('riktech_fontSize') || '16',
                typingIndicator: localStorage.getItem('riktech_typingIndicator') !== 'false',
                soundEffects: localStorage.getItem('riktech_soundEffects') !== 'false',
                aiPersonality: localStorage.getItem('riktech_aiPersonality') || 'professional',
                responseLength: localStorage.getItem('riktech_responseLength') || 'balanced'
            };
        } catch (error) {
            console.error('Error loading settings:', error);
            return this.getDefaultSettings();
        }
    }

    getDefaultSettings() {
        return {
            theme: 'light',
            fontSize: '16',
            typingIndicator: true,
            soundEffects: true,
            aiPersonality: 'professional',
            responseLength: 'balanced'
        };
    }

    saveSettings() {
        try {
            Object.entries(this.settings).forEach(([key, value]) => {
                localStorage.setItem(`riktech_${key}`, value);
            });
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

            // Update UI elements
            this.updateSettingsUI();

        } catch (error) {
            console.error('Error applying settings:', error);
        }
    }

    updateSettingsUI() {
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) themeSelect.value = this.settings.theme;
    }

    // Enhanced Event System
    attachEventListeners() {
        try {
            console.log('🔧 Attaching enhanced event listeners...');
            
            this.setupCoreEvents();
            this.setupMenuEvents();
            this.setupInputEvents();
            this.setupAdvancedInteractions();
            
            console.log('✅ Event listeners attached successfully');
            
        } catch (error) {
            console.error('❌ Error attaching event listeners:', error);
        }
    }

    setupCoreEvents() {
        // Send message
        const sendButton = document.getElementById('sendButton');
        const messageInput = document.getElementById('messageInput');
        
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }
        
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Clear input
        const clearInput = document.getElementById('clearInput');
        if (clearInput) {
            clearInput.addEventListener('click', () => {
                if (messageInput) {
                    messageInput.value = '';
                    this.updateCharCount();
                    this.hideSuggestion();
                }
            });
        }
    }

    setupMenuEvents() {
        // Enhanced dropdown with animation
        const dropdownBtn = document.querySelector('.dropdown-btn');
        if (dropdownBtn) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            this.closeDropdown();
        });

        // Menu items with enhanced functionality
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
                this.trackUserAction(`menu_${id}`);
            });
        }
    }

    toggleDropdown() {
        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent) {
            const isVisible = dropdownContent.style.display === 'block';
            dropdownContent.style.display = isVisible ? 'none' : 'block';
            
            if (!isVisible) {
                dropdownContent.style.animation = 'slideDown 0.3s ease';
            }
        }
    }

    closeDropdown() {
        const dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.style.display = 'none';
        }
    }

    setupInputEvents() {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            // Real-time character count with enhanced feedback
            messageInput.addEventListener('input', () => {
                this.updateCharCount();
                this.analyzeInputPattern(messageInput.value);
            });

            // Focus effects
            messageInput.addEventListener('focus', () => {
                messageInput.parentElement.classList.add('focused');
            });

            messageInput.addEventListener('blur', () => {
                messageInput.parentElement.classList.remove('focused');
            });
        }
    }

    setupAdvancedInteractions() {
        // Double click to edit messages
        document.addEventListener('dblclick', (e) => {
            const messageElement = e.target.closest('.message.user-message');
            if (messageElement) {
                this.enableMessageEdit(messageElement);
            }
        });

        // Right-click context menu for messages
        document.addEventListener('contextmenu', (e) => {
            const messageElement = e.target.closest('.message');
            if (messageElement) {
                e.preventDefault();
                this.showMessageContextMenu(e, messageElement);
            }
        });
    }

    analyzeInputPattern(text) {
        if (text.length > 10) {
            // Simple pattern analysis
            if (text.includes('?')) {
                this.updateAIStatus('analyzing');
            }
        }
    }

    updateCharCount() {
        const input = document.getElementById('messageInput');
        const charCount = document.getElementById('charCount');
        if (input && charCount) {
            const count = input.value.length;
            charCount.textContent = `${count}/1000`;
            
            // Visual feedback
            if (count > 900) {
                charCount.style.color = '#ef4444';
            } else if (count > 750) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = 'var(--text-secondary)';
            }
        }
    }

    hideSuggestion() {
        const suggestion = document.getElementById('smartSuggestion');
        if (suggestion) {
            suggestion.remove();
        }
    }

    // Enhanced Message Handling
    async sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input?.value.trim();
        
        if (!message || !input) return;

        this.trackUserAction('message_sent');
        this.conversationMetrics.messageCount++;

        // Hide welcome section on first message
        const welcomeSection = document.getElementById('welcomeSection');
        const chatMessages = document.getElementById('chatMessages');
        if (welcomeSection && chatMessages && !welcomeSection.classList.contains('hidden')) {
            welcomeSection.classList.add('hidden');
            chatMessages.classList.remove('hidden');
        }

        // Clear input and hide suggestions
        input.value = '';
        this.updateCharCount();
        this.hideSuggestion();

        // Add user message to chat with enhanced formatting
        this.addMessage(message, 'user');

        // Show advanced typing indicator
        this.showEnhancedTypingIndicator(message);

        try {
            const startTime = Date.now();
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message,
                    conversationHistory: this.conversationContext
                })
            });

            const responseTime = Date.now() - startTime;
            this.updateResponseMetrics(responseTime);

            this.hideTypingIndicator();

            if (response.ok) {
                const data = await response.json();
                
                // Add AI response with enhanced processing
                this.addMessage(data.response, 'ai', data.messageId, data);
                
                // Update conversation context with metadata
                this.conversationContext.push({
                    role: 'user',
                    message: message,
                    timestamp: new Date().toISOString(),
                    length: message.length
                }, {
                    role: 'assistant',
                    message: data.response,
                    timestamp: new Date().toISOString(),
                    type: data.type,
                    confidence: data.confidence,
                    responseTime: responseTime
                });

                this.updateAIStatus('active');
                this.handleSuggestedActions(data.suggestedActions);

            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.handleError(error, message);
        }
    }

    updateResponseMetrics(responseTime) {
        // Update average response time
        const totalTime = this.conversationMetrics.averageResponseTime * this.conversationMetrics.messageCount;
        this.conversationMetrics.averageResponseTime = (totalTime + responseTime) / (this.conversationMetrics.messageCount + 1);
    }

    handleSuggestedActions(actions) {
        if (actions && actions.length > 0) {
            this.showSuggestedActions(actions);
        }
    }

    showSuggestedActions(actions) {
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'suggested-actions';
        
        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'suggestion-btn';
            button.textContent = action;
            button.addEventListener('click', () => {
                this.handleSuggestionClick(action);
            });
            actionsContainer.appendChild(button);
        });

        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.appendChild(actionsContainer);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    handleSuggestionClick(action) {
        // Handle different suggestion types
        const actionHandlers = {
            '📚 Pelajari lebih lanjut': () => this.suggestDeeperLearning(),
            '🔍 Eksplorasi mendalam': () => this.suggestDeepExploration(),
            '💻 Lihat contoh kode': () => this.suggestCodeExamples(),
            '🛠️ Implementasi praktis': () => this.suggestPracticalImplementation()
        };

        const handler = actionHandlers[action];
        if (handler) {
            handler();
        }

        this.trackUserAction(`suggestion_${action.replace(/\s+/g, '_')}`);
    }

    suggestDeeperLearning() {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.value = 'Bisa jelaskan lebih dalam tentang topik ini?';
            messageInput.focus();
        }
    }

    showEnhancedTypingIndicator(message) {
        const typingIndicator = document.getElementById('typingIndicator');
        const chatMessages = document.getElementById('chatMessages');
        
        if (typingIndicator && chatMessages) {
            const estimatedTime = this.estimateResponseTime(message);
            const analysisType = this.getAnalysisType(message);
            
            typingIndicator.innerHTML = `
                <div class="typing-content">
                    <div class="typing-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <div class="typing-text">
                        <strong>RikTech AI sedang ${analysisType}...</strong>
                        <span>Estimasi: ${estimatedTime}</span>
                    </div>
                </div>
            `;
            
            typingIndicator.classList.remove('hidden');
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            this.updateAIStatus('thinking');
        }
    }

    estimateResponseTime(message) {
        const length = message.length;
        const wordCount = message.split(' ').length;
        const complexity = this.estimateComplexity(message);
        
        if (complexity === 'high') return '3-5 detik';
        if (complexity === 'medium') return '2-3 detik';
        return '1-2 detik';
    }

    estimateComplexity(message) {
        const techTerms = ['programming', 'code', 'algorithm', 'database', 'api', 'framework'];
        const hasTechTerms = techTerms.some(term => message.toLowerCase().includes(term));
        const wordCount = message.split(' ').length;
        
        if (hasTechTerms && wordCount > 8) return 'high';
        if (wordCount > 12) return 'high';
        if (wordCount > 6) return 'medium';
        return 'low';
    }

    getAnalysisType(message) {
        if (message.includes('?')) return 'menganalisis pertanyaan';
        if (message.includes('bagaimana') || message.includes('cara')) return 'menyusun tutorial';
        if (message.includes('masalah') || message.includes('error')) return 'mendiagnosis masalah';
        return 'memproses permintaan';
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.classList.add('hidden');
        }
    }

    addMessage(content, sender, messageId = null, metadata = {}) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (messageId) {
            messageDiv.id = messageId;
        }

        if (metadata.confidence && metadata.confidence < 0.6) {
            messageDiv.classList.add('low-confidence');
        }

        const timestamp = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const messageHeader = this.generateMessageHeader(sender, metadata);
        const formattedContent = this.formatEnhancedMessage(content, sender, metadata);
        const messageFooter = this.generateMessageFooter(sender, timestamp, metadata);

        messageDiv.innerHTML = `
            ${messageHeader}
            <div class="message-content">${formattedContent}</div>
            ${messageFooter}
        `;

        // Add animation
        messageDiv.style.animation = 'messageSlideIn 0.3s ease';

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Add to current chat with metadata
        this.currentChat.push({
            content,
            sender,
            timestamp: new Date().toISOString(),
            messageId,
            metadata
        });

        // Auto-save to history for AI responses
        if (sender === 'ai') {
            setTimeout(() => this.saveToHistory(), 1000);
        }

        // Track analytics
        this.trackMessageAnalytics(sender, content.length);
    }

    generateMessageHeader(sender, metadata) {
        if (sender === 'ai') {
            let badge = '';
            if (metadata.type) {
                badge = `<span class="ai-badge ai-${metadata.type}">${this.getTypeIcon(metadata.type)} ${metadata.type}</span>`;
            }
            
            return `
                <div class="message-header">
                    <i class="fas fa-robot"></i>
                    <strong>RikTech AI</strong>
                    ${badge}
                    ${metadata.confidence ? `<span class="confidence-score">${Math.round(metadata.confidence * 100)}%</span>` : ''}
                </div>
            `;
        }
        
        return `
            <div class="message-header">
                <i class="fas fa-user"></i>
                <strong>Anda</strong>
            </div>
        `;
    }

    getTypeIcon(type) {
        const icons = {
            knowledge: '📚',
            contextual: '💬',
            reasoning: '🔍',
            creative: '💡',
            technical: '🔧'
        };
        return icons[type] || '🤖';
    }

    generateMessageFooter(sender, timestamp, metadata) {
        if (sender === 'ai') {
            return `
                <div class="message-footer">
                    <span class="message-time">${timestamp}</span>
                    <div class="message-actions">
                        <button class="action-btn" onclick="riktechAI.copyMessage('${this.escapeHtml(metadata.messageId || '')}')" title="Salin pesan">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="action-btn" onclick="riktechAI.regenerateResponse('${this.escapeHtml(metadata.messageId || '')}')" title="Generate ulang">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="message-footer">
                <span class="message-time">${timestamp}</span>
            </div>
        `;
    }

    formatEnhancedMessage(content, sender, metadata) {
        if (sender === 'ai') {
            return content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/```(\w+)?\n([^`]+)```/g, '<pre><code class="language-$1">$2</code></pre>')
                .replace(/\n/g, '<br>')
                .replace(/(\d+)\.\s/g, '<br><strong>$1.</strong> ')
                .replace(/•\s/g, '<br>• ')
                .replace(/(💡|🚀|🎯|🔍|⚡|🎨|🔧|📚|🤖|👋|🎉|💪|🔬|🛡️|🏗️|📊|🤔|🔮)/g, '<span class="emoji">$1</span> ');
        }
        
        return this.escapeHtml(content);
    }

    copyMessage(messageId) {
        const messageElement = document.getElementById(messageId);
        if (messageElement) {
            const content = messageElement.querySelector('.message-content').textContent;
            navigator.clipboard.writeText(content).then(() => {
                this.showTemporaryMessage('Pesan disalin! 📋', 'success');
            });
        }
    }

    regenerateResponse(messageId) {
        // Find the user message that prompted this response
        const messageIndex = this.currentChat.findIndex(msg => msg.messageId === messageId);
        if (messageIndex > 0) {
            const userMessage = this.currentChat[messageIndex - 1];
            if (userMessage && userMessage.sender === 'user') {
                // Remove the existing AI response
                const messageElement = document.getElementById(messageId);
                if (messageElement) {
                    messageElement.remove();
                }
                
                // Remove from current chat
                this.currentChat = this.currentChat.filter(msg => msg.messageId !== messageId);
                
                // Resend the user message
                this.resendMessage(userMessage.content);
            }
        }
    }

    resendMessage(content) {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.value = content;
            this.sendMessage();
        }
    }

    handleError(error, originalMessage) {
        console.error('AI Communication Error:', error);
        
        const errorResponse = this.generateErrorResponse(error, originalMessage);
        this.addMessage(errorResponse, 'ai');
        
        this.updateAIStatus('error');
        
        // Offer retry option
        setTimeout(() => {
            this.showRetryOption(originalMessage);
        }, 2000);
    }

    generateErrorResponse(error, originalMessage) {
        const errorTemplates = [
            `🤖 **System Update in Progress**\n\nMaaf, RikTech AI sedang mengalami peningkatan kecerdasan. Sistem akan segera pulih.\n\n*Pesan Anda: "${originalMessage.substring(0, 50)}..."*`,
            
            `🔧 **AI Optimization Mode**\n\nSementara sistem utama dioptimalkan, berikut sementara saya:\n• Tetap bisa menjawab pertanyaan dasar\n• Memproses dengan kemampuan terbatas\n• Akan kembali normal segera\n\n*Error: ${error.message}*`,
            
            `🚀 **Enhanced Learning Phase**\n\nRikTech AI sedang belajar dari percakapan ini untuk menjadi lebih pintar! Mohon kesabarannya.\n\n*Pertanyaan Anda telah dicatat untuk analisis lebih lanjut.*`
        ];
        
        return errorTemplates[Math.floor(Math.random() * errorTemplates.length)];
    }

    showRetryOption(originalMessage) {
        const retryElement = document.createElement('div');
        retryElement.className = 'retry-option';
        retryElement.innerHTML = `
            <div class="retry-content">
                <span>Gagal mengirim. Coba lagi?</span>
                <button class="retry-btn" onclick="riktechAI.retryMessage('${this.escapeHtml(originalMessage)}')">
                    <i class="fas fa-redo"></i> Coba Lagi
                </button>
            </div>
        `;
        
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.appendChild(retryElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    retryMessage(message) {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.value = message;
            this.sendMessage();
        }
        
        // Remove retry option
        const retryOption = document.querySelector('.retry-option');
        if (retryOption) {
            retryOption.remove();
        }
    }

    trackMessageAnalytics(sender, length) {
        // Simple analytics tracking
        if (sender === 'user') {
            this.conversationMetrics.userEngagement++;
        }
    }

    trackUserAction(action) {
        console.log(`User action: ${action}`);
        // Here you can integrate with analytics services
    }

    updateAIStatus(status) {
        const statusText = document.getElementById('statusText');
        const indicator = document.querySelector('.online-indicator');
        
        if (statusText && indicator) {
            const statusConfig = {
                'ready': { text: 'Siap', color: '#10b981', icon: 'fa-check' },
                'active': { text: 'Aktif', color: '#3b82f6', icon: 'fa-bolt' },
                'thinking': { text: 'Berpikir', color: '#f59e0b', icon: 'fa-brain' },
                'analyzing': { text: 'Menganalisis', color: '#8b5cf6', icon: 'fa-search' },
                'learning': { text: 'Belajar', color: '#ec4899', icon: 'fa-graduation-cap' },
                'error': { text: 'Pemeliharaan', color: '#ef4444', icon: 'fa-tools' }
            };
            
            const config = statusConfig[status] || statusConfig.active;
            statusText.textContent = config.text;
            indicator.style.color = config.color;
            indicator.className = `fas ${config.icon} online-indicator`;
            
            this.aiStatus = status;
        }
    }

    // Enhanced Chat Management
    newChat() {
        if (this.currentChat.length > 0) {
            if (confirm('Mulai percakapan baru? Percakapan saat ini akan disimpan di history.')) {
                this.saveToHistory();
                this.resetChat();
            }
        } else {
            this.resetChat();
        }
    }

    resetChat() {
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
        if (messageInput) {
            messageInput.focus();
        }
        
        this.updateAIStatus('active');
        this.trackUserAction('new_chat');
    }

    showHistory() {
        const historyList = document.getElementById('historyList');
        const historyModal = document.getElementById('historyModal');
        
        if (!historyList || !historyModal) return;

        this.populateHistoryList(historyList);
        historyModal.classList.remove('hidden');
        
        this.trackUserAction('view_history');
    }

    populateHistoryList(historyList) {
        historyList.innerHTML = '';

        if (this.chatHistory.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <i class="fas fa-history"></i>
                    <h4>Belum ada history percakapan</h4>
                    <p>Percakapan Anda akan muncul di sini</p>
                </div>
            `;
        } else {
            this.chatHistory.forEach((chat, index) => {
                const historyItem = this.createHistoryItem(chat, index);
                historyList.appendChild(historyItem);
            });
        }
    }

    createHistoryItem(chat, index) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const lastMessage = chat.messages[chat.messages.length - 1];
        const preview = lastMessage.content.substring(0, 100) + (lastMessage.content.length > 100 ? '...' : '');
        const messageCount = chat.messages.length;
        const date = new Date(chat.timestamp).toLocaleDateString('id-ID');
        
        historyItem.innerHTML = `
            <div class="history-item-content">
                <div class="history-preview">
                    <strong>Percakapan ${this.chatHistory.length - index}</strong>
                    <p>${preview}</p>
                </div>
                <div class="history-meta">
                    <span>${date}</span>
                    <span>${messageCount} pesan</span>
                </div>
                <div class="history-actions">
                    <button class="history-btn load-btn" title="Muat percakapan">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="history-btn delete-btn" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        const loadBtn = historyItem.querySelector('.load-btn');
        const deleteBtn = historyItem.querySelector('.delete-btn');
        
        loadBtn.addEventListener('click', () => {
            this.loadHistory(chat);
            document.getElementById('historyModal').classList.add('hidden');
        });
        
        deleteBtn.addEventListener('click', () => {
            this.deleteHistory(index);
        });

        return historyItem;
    }

    deleteHistory(index) {
        if (confirm('Hapus percakapan ini?')) {
            this.chatHistory.splice(index, 1);
            localStorage.setItem('riktech_chat_history', JSON.stringify(this.chatHistory));
            this.showHistory(); // Refresh
            this.trackUserAction('delete_history');
        }
    }

    loadHistory(chat) {
        this.resetChat();
        const welcomeSection = document.getElementById('welcomeSection');
        const chatMessages = document.getElementById('chatMessages');
        
        if (welcomeSection && chatMessages) {
            welcomeSection.classList.add('hidden');
            chatMessages.classList.remove('hidden');
        }

        // Load messages
        chat.messages.forEach(msg => {
            this.addMessage(msg.content, msg.sender, msg.messageId, msg.metadata);
        });

        // Restore context
        this.conversationContext = chat.context || [];
        this.currentChat = chat.messages;

        this.trackUserAction('load_history');
    }

    saveToHistory() {
        if (this.currentChat.length > 0) {
            const chat = {
                messages: [...this.currentChat],
                timestamp: new Date().toISOString(),
                context: this.conversationContext,
                metrics: { ...this.conversationMetrics }
            };

            this.chatHistory.push(chat);
            
            // Keep only last 50 chats
            if (this.chatHistory.length > 50) {
                this.chatHistory = this.chatHistory.slice(-50);
            }

            try {
                localStorage.setItem('riktech_chat_history', JSON.stringify(this.chatHistory));
            } catch (error) {
                console.error('Error saving history:', error);
            }
        }
    }

    // Settings and Info Modals
    showSettings() {
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            this.populateSettings();
            settingsModal.classList.remove('hidden');
        }
    }

    populateSettings() {
        // Populate settings form with current values
        const themeSelect = document.getElementById('themeSelect');
        const fontSizeSlider = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        
        if (themeSelect) themeSelect.value = this.settings.theme;
        if (fontSizeSlider) {
            fontSizeSlider.value = this.settings.fontSize;
            if (fontSizeValue) {
                fontSizeValue.textContent = `${this.settings.fontSize}px`;
            }
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

    setupQuickActions() {
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', () => {
                const prompt = card.getAttribute('data-prompt');
                const messageInput = document.getElementById('messageInput');
                if (messageInput && prompt) {
                    messageInput.value = prompt;
                    this.updateCharCount();
                    messageInput.focus();
                    this.trackUserAction(`quick_action_${prompt.replace(/\s+/g, '_')}`);
                }
            });
        });
    }

    emergencyStart() {
        console.log('🚨 Emergency start initiated');
        this.forceHideSplash();
        this.showTemporaryMessage('Sistem dalam mode pemulihan. Beberapa fitur mungkin terbatas.', 'warning');
    }

    escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Enhanced CSS would be needed for new elements like:
// .smart-suggestion, .temp-message, .suggested-actions, .retry-option, etc.

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 RikTech AI Enhanced Starting...');
    try {
        window.riktechAI = new RikTechAI();
        window.riktechAI.init();
    } catch (error) {
        console.error('💥 Failed to initialize RikTech AI:', error);
        // Emergency fallback
        const splashScreen = document.getElementById('splashScreen');
        const mainApp = document.getElementById('mainApp');
        if (splashScreen) splashScreen.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('🌐 Global error:', event.error);
});
