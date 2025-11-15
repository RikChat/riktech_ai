export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Preprocessing pesan
    const processedMessage = message.toLowerCase().trim();
    
    // Enhanced AI Response System dengan context awareness
    const response = await generateAdvancedResponse(processedMessage, conversationHistory);
    
    // Simulasi delay untuk natural feel
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    res.status(200).json({
      response: response,
      timestamp: new Date().toISOString(),
      messageId: generateMessageId()
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      fallback: 'Maaf, saya sedang mengalami gangguan teknis. Silakan coba lagi dalam beberapa saat.'
    });
  }
}

function generateMessageId() {
  return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

async function generateAdvancedResponse(message, conversationHistory) {
  // Context analysis dari history percakapan
  const context = analyzeConversationContext(message, conversationHistory);
  
  // Enhanced knowledge base dengan multiple domains
  const knowledgeBase = {
    // Greetings dan basa-basi
    greetings: {
      patterns: ['hai', 'halo', 'hello', 'hi', 'hei', 'hoi', 'selamat pagi', 'selamat siang', 'selamat malam', 'selamat sore', 'assalamualaikum'],
      responses: [
        'Halo! Saya RikTech AI, asisten AI canggih yang siap membantu Anda! 😊',
        'Hai! Senang bertemu dengan Anda! Ada yang bisa saya bantu hari ini?',
        'Hello! Saya RikTech AI di sini untuk membantu Anda. Ceritakan apa yang Anda butuhkan!',
        'Halo! Senang Anda datang. Saya siap menjawab pertanyaan dan membantu menyelesaikan masalah Anda!'
      ]
    },

    // Pertanyaan tentang AI
    about_ai: {
      patterns: ['siapa kamu', 'apa itu riktech', 'riktech ai', 'kamu ai', 'teknologi kamu'],
      responses: [
        'Saya adalah **RikTech AI** - asisten AI canggih yang dikembangkan dengan teknologi modern. Saya bisa membantu dengan berbagai topik termasuk teknologi, pendidikan, bisnis, programming, dan banyak lagi! 🚀',
        'Saya **RikTech AI**, asisten inteligensi artifisial yang dirancang untuk memahami dan membantu kebutuhan Anda. Saya terus belajar dan berkembang!',
        'Saya RikTech AI! 🤖 Teman virtual Anda yang siap membantu 24/7 dengan pengetahuan yang terus diperbarui di berbagai bidang.'
      ]
    },

    // Teknologi dan Programming
    technology: {
      patterns: ['programming', 'koding', 'code', 'bahasa pemrograman', 'python', 'javascript', 'java', 'c++', 'html', 'css', 'react', 'node', 'vue', 'framework', 'database', 'api'],
      responses: [
        '**Tips Programming**: Gunakan Python untuk data science, JavaScript untuk web development, Java untuk enterprise applications. Always practice clean code! 🖥️',
        '**Web Development**: React, Vue, dan Angular adalah framework JavaScript populer. Untuk backend, coba Node.js, Django, atau Laravel.',
        '**Database**: SQL seperti MySQL/PostgreSQL untuk structured data, NoSQL seperti MongoDB untuk flexible schema. Pilih berdasarkan kebutuhan project Anda!',
        '**Best Practice**: Selalu gunakan version control (Git), testing, dan dokumentasi yang baik dalam development.'
      ]
    },

    // Pendidikan dan Belajar
    education: {
      patterns: ['belajar', 'pendidikan', 'sekolah', 'kuliah', 'tutorial', 'course', 'skill', 'kemampuan'],
      responses: [
        '**Strategi Belajar Efektif**:\n• Fokus pada konsep fundamental\n• Practice consistently\n• Build projects nyata\n• Join communities belajar\n• Jangan takut membuat kesalahan! 📚',
        '**Skill yang Demand Tinggi 2024**:\n• AI & Machine Learning\n• Cloud Computing\n• Cybersecurity\n• Data Science\n• Digital Marketing\n• Software Development',
        'Belajar itu journey, bukan destination. Mulai dari dasar, konsisten, dan selalu curious!'
      ]
    },

    // Bisnis dan Karir
    business: {
      patterns: ['bisnis', 'usaha', 'startup', 'entrepreneur', 'karir', 'kerja', 'pekerjaan', 'cv', 'interview'],
      responses: [
        '**Tips Bisnis**:\n• Solve real problems\n• Know your target market\n• Build strong team\n• Manage finances wisely\n• Adapt to changes quickly 💼',
        '**Karir Development**:\n• Continuous learning\n• Networking yang baik\n• Build portfolio/projects\n• Soft skills development\n• Work-life balance',
        '**Startup Success**: Fokus pada product-market fit, customer feedback, dan scalable business model.'
      ]
    },

    // Kesehatan dan Lifestyle
    health: {
      patterns: ['kesehatan', 'sehat', 'olahraga', 'diet', 'makanan', 'fitness', 'mental health', 'stress'],
      responses: [
        '**Tips Sehat**:\n• Olahraga rutin 30 menit/hari\n• Makan balanced diet\n• Tidur cukup 7-8 jam\n• Manage stress\n• Regular check-up 🏃‍♂️',
        '**Mental Wellness**:\n• Practice mindfulness\n• Social connections\n• Hobbies & passions\n• Professional help when needed\n• Work-life balance',
        'Healthy body, healthy mind! Jaga pola hidup seimbang untuk produktivitas optimal.'
      ]
    },

    // AI dan Machine Learning
    ai_ml: {
      patterns: ['machine learning', 'deep learning', 'neural network', 'artificial intelligence', 'data science', 'nlp', 'computer vision'],
      responses: [
        '**AI/ML Trends 2024**:\n• Generative AI\n• Transformer architectures\n• Edge AI computing\n• Ethical AI development\n• Multimodal models 🤖',
        '**Machine Learning Path**:\n1. Mathematics foundation\n2. Programming (Python)\n3. ML frameworks (TensorFlow/PyTorch)\n4. Projects & competitions\n5. Specialization',
        '**NLP Tips**: Understand linguistics fundamentals, practice with real datasets, dan explore pre-trained models seperti BERT/GPT.'
      ]
    },

    // Umum dan pengetahuan
    general: {
      patterns: ['apa', 'bagaimana', 'mengapa', 'kapan', 'di mana', 'siapa', 'bisa', 'caranya'],
      responses: [
        'Berdasarkan pertanyaan Anda, saya sarankan untuk:\n• Research mendalam tentang topik\n• Consult multiple sources\n• Practical experimentation\n• Community discussion\n• Continuous learning 🧠',
        'Untuk pertanyaan seperti ini, penting untuk memahami konteks lengkap dan mencari informasi dari sumber terpercaya.',
        'Saya merekomendasikan pendekatan systematic: define problem, research, analyze, implement, dan evaluate results.'
      ]
    },

    // Motivasi dan Inspirasi
    motivation: {
      patterns: ['motivasi', 'inspirasi', 'semangat', 'down', 'sedih', 'kecewa', 'gagal'],
      responses: [
        '**Remember**: Every expert was once a beginner. Every success story has chapters of failure. Keep going! 💪\n\n"Yang penting bukan seberapa cepat Anda berlari, tetapi seberapa jauh Anda melangkah."',
        '**Growth Mindset**:\n• View challenges as opportunities\n• Learn from criticism\n• Find lessons in failures\n• Celebrate small wins\n• Stay persistent',
        'Hari buruk tidak berarti hidup buruk. Istirahat sejenak, tarik napas dalam, dan coba lagi besok. You got this! ✨'
      ]
    }
  };

  // Advanced pattern matching dengan context awareness
  let bestMatch = { category: null, confidence: 0 };
  
  for (const [category, data] of Object.entries(knowledgeBase)) {
    for (const pattern of data.patterns) {
      const confidence = calculateMatchConfidence(message, pattern, context);
      if (confidence > bestMatch.confidence) {
        bestMatch = { category, confidence };
      }
    }
  }

  // Fallback responses yang lebih intelligent
  const fallbackResponses = [
    `Pertanyaan menarik! "${message}" - Untuk topik ini, saya sarankan:\n\n• Melakukan research lebih lanjut\n• Konsultasi dengan expert di bidangnya\n• Eksperimen praktis\n• Bergabung dengan komunitas terkait\n\nAda yang spesifik dari topik ini yang ingin Anda dalami? 🤔`,

    `Terima kasih untuk pertanyaannya! "${message}" adalah topik yang kompleks. Saya bisa membantu dengan:\n\n• Break down masalah menjadi bagian kecil\n• Sumber belajar yang recommended\n• Best practices umum\n• Trend terkini di bidang ini\n\nApa aspek khusus yang paling Anda minati? 💡`,

    `Great question! Untuk "${message}", saya merekomendasikan pendekatan:\n\n1. Define clear objectives\n2. Research fundamental concepts\n3. Practical implementation\n4. Iteration & improvement\n5. Community feedback\n\nMau kita eksplor aspek tertentu lebih dalam? 🚀`
  ];

  // Response selection dengan confidence threshold
  if (bestMatch.confidence > 0.3) {
    const responses = knowledgeBase[bestMatch.category].responses;
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add contextual follow-up
    const followUps = [
      '\n\nAda aspek lain yang ingin Anda tanyakan?',
      '\n\nButuh penjelasan lebih detail tentang bagian tertentu?',
      '\n\nApakah ini menjawab pertanyaan Anda?',
      '\n\nIngin saya jelaskan lebih lanjut?'
    ];
    
    return selectedResponse + followUps[Math.floor(Math.random() * followUps.length)];
  }

  // Intelligent fallback
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

function analyzeConversationContext(currentMessage, conversationHistory) {
  const context = {
    topics: new Set(),
    sentiment: 'neutral',
    complexity: 'medium'
  };

  // Analyze previous messages for context
  if (conversationHistory.length > 0) {
    const recentMessages = conversationHistory.slice(-3); // Last 3 messages
    
    recentMessages.forEach(msg => {
      // Simple topic extraction
      const words = msg.message.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 3) { // Filter short words
          context.topics.add(word);
        }
      });
    });
  }

  // Simple sentiment analysis
  const positiveWords = ['bagus', 'baik', 'senang', 'terima kasih', 'mantap', 'keren'];
  const negativeWords = ['susah', 'sulit', 'problema', 'error', 'gagal', 'sedih'];
  
  if (positiveWords.some(word => currentMessage.includes(word))) {
    context.sentiment = 'positive';
  } else if (negativeWords.some(word => currentMessage.includes(word))) {
    context.sentiment = 'negative';
  }

  // Complexity analysis
  const wordCount = currentMessage.split(' ').length;
  context.complexity = wordCount > 10 ? 'high' : wordCount > 5 ? 'medium' : 'low';

  return context;
}

function calculateMatchConfidence(message, pattern, context) {
  let confidence = 0;
  
  // Exact match
  if (message.includes(pattern)) {
    confidence += 0.6;
  }
  
  // Partial match
  const patternWords = pattern.split(' ');
  const messageWords = message.split(' ');
  const matches = patternWords.filter(word => 
    messageWords.some(mWord => mWord.includes(word) || word.includes(mWord))
  );
  
  confidence += (matches.length / patternWords.length) * 0.4;
  
  // Context bonus
  if (context.topics.has(pattern)) {
    confidence += 0.2;
  }
  
  return Math.min(confidence, 1.0);
                 }
