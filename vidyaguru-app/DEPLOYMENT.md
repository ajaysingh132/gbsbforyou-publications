# तैनाती गाइड

## Vercel पर तैनाती (अनुशंसित)

### चरण 1: Vercel खाता बनाएं
1. [vercel.com](https://vercel.com) पर जाएं
2. GitHub से साइन अप करें

### चरण 2: प्रोजेक्ट कनेक्ट करें
1. Vercel डैशबोर्ड में "New Project" पर क्लिक करें
2. अपनी GitHub रिपॉजिटरी चुनें
3. `vidyaguru-app` निर्देशिका सेट करें

### चरण 3: पर्यावरण चर सेट करें
Vercel प्रोजेक्ट सेटिंग्स में जाएं और निम्न जोड़ें:
```
VITE_ANTHROPIC_API_KEY=your_api_key
```

### चरण 4: तैनात करें
Vercel स्वचालित रूप से मुख्य शाखा को तैनात करता है।

## Netlify पर तैनाती

### चरण 1: Netlify खाता बनाएं
1. [netlify.com](https://netlify.com) पर जाएं
2. GitHub से कनेक्ट करें

### चरण 2: साइट बनाएं
1. "New site from Git" पर क्लिक करें
2. अपनी रिपॉजिटरी चुनें
3. बिल्ड सेटिंग्स:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `vidyaguru-app`

### चरण 3: पर्यावरण चर सेट करें
Netlify सेटिंग्स में Environment variables जोड़ें:
```
VITE_ANTHROPIC_API_KEY=your_api_key
```

## Docker में तैनाती

### Dockerfile बनाएं
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### बिल्ड और रन करें
```bash
docker build -t vidyaguru-ai .
docker run -p 3000:3000 -e VITE_ANTHROPIC_API_KEY=your_key vidyaguru-ai
```

## GitHub Pages पर तैनाती

### package.json अपडेट करें
```json
{
  "homepage": "https://username.github.io/gbsbforyou-publications",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d vidyaguru-app/dist"
  }
}
```

### तैनात करें
```bash
npm install --save-dev gh-pages
npm run deploy
```

## उत्पादन चेकलिस्ट

- [ ] API keys सुरक्षित हैं
- [ ] बिल्ड सफल है
- [ ] सभी लिंक काम कर रहे हैं
- [ ] मोबाइल पर परीक्षण किया गया
- [ ] SEO मेटा टैग जोड़े गए हैं
- [ ] Analytics कनेक्ट किया गया है
- [ ] Error tracking सेटअप किया गया है
