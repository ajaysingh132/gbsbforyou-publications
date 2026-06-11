# विद्यागुरु AI - AI-संचालित शिक्षा प्लेटफॉर्म

![Vidyaguru](https://img.shields.io/badge/Vidyaguru-AI%20Education-purple?style=flat-square)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

## 🎓 विवरण

**विद्यागुरु AI** एक आधुनिक, AI-संचालित शिक्षा प्लेटफॉर्म है जो आंगनबाड़ी से PhD तक सभी स्तर के छात्रों के लिए व्यक्तिगत सीखने का मार्ग प्रदान करता है।

### ✨ मुख्य विशेषताएं

- **🤖 AI शिक्षक**: Claude AI द्वारा संचालित व्यक्तिगत शिक्षण सहायक
- **📚 व्यापक पाठ्यक्रम**: आंगनबाड़ी, कक्षा 10, 12 (CBSE, ICSE, राज्य बोर्ड)
- **🎯 NEP 2020 संरेखित**: भारतीय शिक्षा नीति के अनुसार डिजाइन किया गया
- **🌍 हिंदी माध्यम**: पूरी तरह हिंदी में सामग्री और इंटरफेस
- **📊 प्रगति ट्रैकिंग**: अंक, स्ट्रीक, सटीकता मेट्रिक्स
- **🎬 मल्टीमीडिया सामग्री**: वीडियो, नोट्स, अभ्यास, मॉक टेस्ट
- **✅ इंटरेक्टिव लर्निंग**: क्विज़, प्रश्नोत्तरी, व्यावहारिक समस्याएं
- **📱 मोबाइल-फ्रेंडली**: सभी डिवाइसों पर उत्तम अनुभव

## 🚀 त्वरित शुरुआत

### आवश्यकताएं

- **Node.js** (v16 या उच्चतर)
- **npm** या **yarn**
- **Anthropic API Key** (Claude AI के लिए)

### इंस्टॉलेशन

1. **रिपॉजिटरी क्लोन करें**
```bash
git clone https://github.com/ajaysingh132/gbsbforyou-publications.git
cd vidyaguru-app
```

2. **विषयवस्तु संचालित करें**
```bash
npm install
```

3. **पर्यावरण चर सेट करें**
```bash
cp .env.example .env.local
```

`.env.local` खोलें और अपनी Anthropic API key जोड़ें:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

4. **विकास सर्वर शुरू करें**
```bash
npm run dev
```

ब्राउज़र में `http://localhost:3000` खोलें।

## 📁 परियोजना संरचना

```
vidyaguru-app/
├── src/
│   ├── App.jsx                 # मुख्य एप्लिकेशन कंपोनेंट
│   ├── main.jsx               # React प्रवेश बिंदु
│   ├── index.css              # वैश्विक स्टाइलिंग
│   └── services/
│       └── apiService.js      # Claude AI एकीकरण
├── index.html                 # HTML टेम्पलेट
├── package.json               # परियोजना निर्भरताएं
├── vite.config.js            # Vite कॉन्फ़िगरेशन
├── tailwind.config.js        # Tailwind CSS कॉन्फ़िगरेशन
├── postcss.config.js         # PostCSS कॉन्फ़िगरेशन
└── .env.example              # पर्यावरण चर टेम्पलेट
```

## 🛠️ उपलब्ध कमांड

```bash
# विकास सर्वर शुरू करें
npm run dev

# उत्पादन बिल्ड करें
npm run build

# बिल्ड का पूर्वावलोकन करें
npm run preview

# ESLint के साथ कोड जांचें
npm run lint

# Prettier के साथ कोड फॉर्मेट करें
npm run format
```

## 🎨 स्क्रीन और विशेषताएं

### 1. ऑनबोर्डिंग स्क्रीन
- आकर्षक परिचय
- प्रमुख सुविधाओं का प्रदर्शन
- शुरुआत करने का बटन

### 2. स्तर चयन
- आंगनबाड़ी (3-6 साल)
- कक्षा 9-10 (बोर्ड परीक्षा)
- कक्षा 11-12 (JEE/NEET)

### 3. प्रोफाइल प्रबंधन
- उपयोगकर्ता जानकारी संपादन
- बोर्ड और भाषा चयन
- प्रगति मेट्रिक्स (अंक, स्ट्रीक, सटीकता)

### 4. होम डैशबोर्ड
- सभी विषयों तक पहुंच
- दैनिक सांख्यिकी
- AI शिक्षक त्वरित पहुंच

### 5. विषय विवरण
- अध्याय सूची
- प्रगति बार
- कठिनाई स्तर और अवधि

### 6. अध्याय विवरण
- **📹 वीडियो सामग्री**: कई शिक्षण वीडियो
- **📝 अध्याय नोट्स**: विस्तृत व्याख्या
- **🏋️ अभ्यास प्रश्न**: आसान, मध्यम, कठिन स्तर
- **📋 मॉक टेस्ट**: परीक्षा सिमुलेशन
- **🤖 AI सारांश**: Claude द्वारा जेनरेट की गई सामग्री

### 7. AI शिक्षक (चैटबॉट)
- वास्तविक समय में छात्रों के प्रश्नों का उत्तर दें
- विषय-विशिष्ट उत्तर
- हिंदी में स्पष्ट और सरल स्पष्टीकरण

## 🔧 तकनीकी स्टैक

- **Frontend**: React 18.2 + JSX
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Build Tool**: Vite 5.0
- **AI Backend**: Claude API (Anthropic)
- **HTTP Client**: Fetch API

## 🤖 AI एकीकरण

### Claude API का उपयोग

ऐप निम्नलिखित के लिए Claude API का उपयोग करता है:

1. **इंटरेक्टिव Q&A**
   - छात्र प्रश्न पूछते हैं
   - AI हिंदी में विस्तृत उत्तर देता है

2. **कोर्स सामग्री जेनरेशन**
   - अध्याय सारांश
   - मुख्य बिंदु और सूत्र
   - व्यावहारिक उदाहरण

3. **प्रश्न जेनरेशन**
   - अभ्यास प्रश्न
   - मल्टीपल चॉइस प्रश्न
   - कठिनाई स्तर के अनुसार

## 📝 API कॉल उदाहरण

```javascript
// AI शिक्षक से प्रश्न पूछें
const response = await fetchAIResponse({
  studentName: 'राज कुमार',
  level: 'class10',
  subject: 'गणित',
  question: 'वास्तविक संख्याएं क्या हैं?'
});

// कोर्स सामग्री जेनरेट करें
const content = await generateCourseContent({
  chapterName: 'वास्तविक संख्याएं',
  level: 'class10',
  board: 'CBSE'
});

// अभ्यास प्रश्न जेनरेट करें
const questions = await generatePracticeQuestions({
  chapterName: 'बहुपद',
  difficulty: 'मध्यम',
  count: 5
});
```

## 🔐 सुरक्षा

- API keys को `.env.local` में सुरक्षित रूप से संग्रहीत करें
- `.env.local` को `.gitignore` में जोड़ें
- सार्वजनिक कमिट में API keys प्रकट न करें

## 🐛 समस्या निवारण

### API त्रुटि
```
Error: Could not find API key
```
**समाधान**: सुनिश्चित करें कि `.env.local` में `VITE_ANTHROPIC_API_KEY` सही है।

### Tailwind CSS लोड नहीं हो रहा
```
npm install -D tailwindcss postcss autoprefixer
```

### पोर्ट 3000 पहले से उपयोग में है
```bash
npm run dev -- --port 3001
```

## 📱 ब्राउज़र समर्थन

- Chrome/Chromium (नवीनतम)
- Firefox (नवीनतम)
- Safari (नवीनतम)
- Edge (नवीनतम)

## 🎯 भविष्य की सुविधाएं

- [ ] उपयोगकर्ता प्रमाणीकरण और डेटा सिंक
- [ ] ऑफलाइन सामग्री डाउनलोड
- [ ] लाइव क्लासेस और शिक्षक सहयोग
- [ ] व्यक्तिगत प्रदर्शन विश्लेषण
- [ ] गेमिफिकेशन (badges, leaderboards)
- [ ] अभिभावक ड्रायवर पोर्टल
- [ ] कम्युनिटी फोरम
- [ ] डाउनलोडेबल संसाधन लाइब्रेरी

## 📊 प्रदर्शन

- **First Contentful Paint**: < 2s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 90+

## 📄 लाइसेंस

MIT License - [LICENSE](LICENSE) फाइल देखें

## 🤝 योगदान

योगदान स्वागत है! कृपया देखें:

1. Fork करें
2. Feature branch बनाएं (`git checkout -b feature/amazing-feature`)
3. परिवर्तन commit करें (`git commit -m 'Add amazing feature'`)
4. Branch पर push करें (`git push origin feature/amazing-feature`)
5. Pull Request खोलें

## 📞 संपर्क और समर्थन

- **लेखक**: Ajay Singh
- **ईमेल**: banjarajanmat@gmail.com
- **GitHub**: [@ajaysingh132](https://github.com/ajaysingh132)

## 🙏 धन्यवाद

इस प्रोजेक्ट को वास्तविकता बनाने के लिए:
- Anthropic (Claude AI के लिए)
- OpenAI Community
- शिक्षा विशेषज्ञ और सलाहदाता

---

**नोट**: यह प्रोजेक्ट शिक्षा को सभी के लिए सुलभ बनाने के लिए समर्पित है। ❤️

अंतिम अपडेट: मई 2026
