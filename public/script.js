* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --primary-light: #818cf8;
    --secondary-color: #10b981;
    --background-color: #ffffff;
    --surface-color: #f8fafc;
    --text-color: #1e293b;
    --text-secondary: #64748b;
    --border-color: #e2e8f0;
    --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --border-radius: 16px;
    --border-radius-lg: 24px;
    --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-primary: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
}

[data-theme="dark"] {
    --primary-color: #818cf8;
    --primary-dark: #6366f1;
    --primary-light: #a5b4fc;
    --secondary-color: #34d399;
    --background-color: #0f172a;
    --surface-color: #1e293b;
    --text-color: #f1f5f9;
    --text-secondary: #94a3b8;
    --border-color: #334155;
}

body {
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: var(--background-color);
    color: var(--text-color);
    min-height: 100vh;
    transition: all 0.3s ease;
    line-height: 1.6;
}

/* Splash Screen */
.splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.splash-content {
    text-align: center;
    color: white;
}

.logo-animation {
    position: relative;
    font-size: 4rem;
    margin-bottom: 2rem;
}

.pulse-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: pulse 2s infinite;
}

.pulse-ring.delay-1 {
    animation-delay: 0.7s;
    width: 140px;
    height: 140px;
}

.pulse-ring.delay-2 {
    animation-delay: 1.4s;
    width: 160px;
    height: 160px;
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1.2);
        opacity: 0;
    }
}

.splash-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.loading-bar {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    margin: 2rem auto 0;
    overflow: hidden;
}

.progress {
    height: 100%;
    background: white;
    border-radius: 2px;
    animation: loading 2s ease-in-out;
}

@keyframes loading {
    0% { width: 0%; }
    100% { width: 100%; }
}

.hidden {
    display: none !important;
}

/* Main App */
.main-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header */
.header {
    background: var(--background-color);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: var(--shadow);
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo {
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
}

.app-info h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
}

.app-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.online-indicator {
    color: var(--secondary-color);
    font-size: 0.5rem;
}

/* Navigation */
.nav-btn {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: var(--text-color);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
}

.nav-btn:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-1px);
}

.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    background: var(--background-color);
    min-width: 250px;
    box-shadow: var(--shadow-lg);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    z-index: 1000;
    margin-top: 0.5rem;
}

.dropdown:hover .dropdown-content {
    display: block;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    text-decoration: none;
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.nav-item:last-child {
    border-bottom: none;
}

.nav-item:hover {
    background: var(--surface-color);
    color: var(--primary-color);
}

/* Main Content */
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    padding: 0 2rem;
}

/* Welcome Section */
.welcome-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
}

.welcome-content {
    text-align: center;
    max-width: 800px;
}

.ai-avatar {
    width: 120px;
    height: 120px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 3rem;
    margin: 0 auto 2rem;
    box-shadow: var(--shadow-lg);
}

.welcome-content h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.welcome-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 3rem;
    line-height: 1.8;
}

/* Quick Actions */
.quick-actions {
    margin-bottom: 3rem;
}

.action-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto;
}

.action-card {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 1.5rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
}

.action-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow);
    border-color: var(--primary-color);
}

.action-card i {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.action-card span {
    font-weight: 600;
    color: var(--text-color);
}

/* Capabilities */
.capabilities {
    margin-top: 3rem;
}

.capability-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}

.capability-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--surface-color);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
}

.capability-item i {
    color: var(--secondary-color);
}

/* Chat Container */
.chat-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 200px);
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Message Styles */
.message {
    max-width: 80%;
    padding: 1.5rem;
    border-radius: var(--border-radius-lg);
    position: relative;
    animation: messageSlide 0.3s ease-out;
}

@keyframes messageSlide {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.user-message {
    background: var(--gradient-primary);
    color: white;
    margin-left: auto;
    border-bottom-right-radius: 8px;
    box-shadow: var(--shadow);
}

.ai-message {
    background: var(--surface-color);
    color: var(--text-color);
    margin-right: auto;
    border-bottom-left-radius: 8px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
}

.message-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.message-content {
    line-height: 1.7;
    white-space: pre-line;
}

.message-content ul,
.message-content ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
}

.message-content li {
    margin: 0.25rem 0;
}

.message-time {
    font-size: 0.75rem;
    opacity: 0.7;
    margin-top: 0.75rem;
    text-align: right;
}

/* Input Section */
.input-section {
    padding: 2rem 0;
    background: var(--background-color);
    border-top: 1px solid var(--border-color);
}

.input-container {
    max-width: 800px;
    margin: 0 auto;
}

.input-group {
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
}

.attach-btn,
.send-btn {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 0.75rem;
    cursor: pointer;
    color: var(--text-color);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.send-btn {
    background: var(--gradient-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
}

.send-btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow);
}

.input-wrapper {
    flex: 1;
    position: relative;
}

.input-wrapper input {
    width: 100%;
    padding: 1rem 3rem 1rem 1rem;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--surface-color);
    color: var(--text-color);
    font-size: 1rem;
    resize: none;
    transition: all 0.3s ease;
}

.input-wrapper input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.input-actions {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
}

.action-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.25rem;
}

.input-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.ai-tip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Typing Indicator */
.typing-indicator {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    margin: 1rem 0;
    max-width: fit-content;
    animation: pulse 2s infinite;
}

.typing-dots {
    display: flex;
    gap: 0.25rem;
}

.dot {
    width: 8px;
    height: 8px;
    background: var(--text-secondary);
    border-radius: 50%;
    animation: typing 1.4s infinite ease-in-out;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
}

/* Modals */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 1rem;
}

.modal-content {
    background: var(--background-color);
    border-radius: var(--border-radius-lg);
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--border-color);
    animation: modalSlide 0.3s ease-out;
}

@keyframes modalSlide {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    padding: 0.25rem;
    border-radius: 4px;
}

.close-btn:hover {
    background: var(--surface-color);
    color: var(--text-color);
}

.modal-body {
    padding: 2rem;
}

/* Settings */
.settings-grid {
    display: grid;
    gap: 2rem;
}

.setting-group h4 {
    margin-bottom: 1rem;
    color: var(--text-color);
    font-weight: 600;
}

.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border-color);
}

.setting-item:last-child {
    border-bottom: none;
}

.setting-select {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--surface-color);
    color: var(--text-color);
}

.setting-range {
    flex: 1;
    margin: 0 1rem;
}

.setting-value {
    min-width: 40px;
    text-align: right;
}

/* Toggle Switch */
.toggle-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
}

.toggle-label input {
    display: none;
}

.toggle-slider {
    width: 44px;
    height: 24px;
    background: var(--border-color);
    border-radius: 12px;
    position: relative;
    transition: all 0.3s ease;
}

.toggle-slider::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    transition: all 0.3s ease;
}

.toggle-label input:checked + .toggle-slider {
    background: var(--primary-color);
}

.toggle-label input:checked + .toggle-slider::before {
    transform: translateX(20px);
}

/* History */
.history-list {
    max-height: 400px;
    overflow-y: auto;
}

.history-item {
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    margin-bottom: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.history-item:hover {
    background: var(--surface-color);
    border-color: var(--primary-color);
    transform: translateX(5px);
}

/* Info Content */
.info-content,
.dev-info {
    text-align: center;
}

.app-logo-large,
.dev-avatar {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
}

.app-description,
.dev-description {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.7;
}

.feature-grid {
    display: grid;
    gap: 1.5rem;
    margin-top: 2rem;
}

.feature-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    text-align: left;
    padding: 1.5rem;
    background: var(--surface-color);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
}

.feature-item i {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-top: 0.25rem;
}

.tech-stack {
    margin: 2rem 0;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    justify-content: center;
}

.tech-tag {
    background: var(--surface-color);
    color: var(--primary-color);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid var(--border-color);
}

.contact-info {
    margin-top: 2rem;
    text-align: left;
}

.contact-info h5 {
    margin-bottom: 1rem;
    color: var(--text-color);
}

.contact-info p {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    color: var(--text-secondary);
}

/* Responsive Design */
@media (max-width: 768px) {
    .header-content {
        padding: 0 1rem;
    }
    
    .main-content {
        padding: 0 1rem;
    }
    
    .welcome-content h1 {
        font-size: 2.5rem;
    }
    
    .ai-avatar {
        width: 80px;
        height: 80px;
        font-size: 2rem;
    }
    
    .action-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .message {
        max-width: 90%;
    }
    
    .input-group {
        flex-direction: column;
    }
    
    .attach-btn {
        align-self: flex-start;
    }
    
    .modal-content {
        width: 95%;
        margin: 1rem;
    }
    
    .input-footer {
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }
}

@media (max-width: 480px) {
    .welcome-content h1 {
        font-size: 2rem;
    }
    
    .action-grid {
        grid-template-columns: 1fr;
    }
    
    .capability-list {
        grid-template-columns: 1fr;
    }
    
    .feature-item {
        flex-direction: column;
        text-align: center;
    }
}

/* Scrollbar Styling */
.chat-messages::-webkit-scrollbar {
    width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
    background: var(--surface-color);
}

.chat-messages::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
        }
