# योगदान देने के नियम

विद्यागुरु AI प्रोजेक्ट में योगदान के लिए धन्यवाद! इन दिशानिर्देशों का पालन करें:

## शुरू करने से पहले

1. प्रोजेक्ट को Fork करें
2. अपनी मशीन पर क्लोन करें
3. `npm install` चलाएं
4. `.env.local` फाइल सेट करें

## विकास वर्कफ़्लो

1. एक नई ब्रांच बनाएं:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. अपने परिवर्तन करें

3. कोड फॉर्मेट करें:
   ```bash
   npm run format
   ```

4. कोड जांचें:
   ```bash
   npm run lint
   ```

5. परिवर्तन Commit करें:
   ```bash
   git commit -m "feat: आपकी सुविधा का विवरण"
   ```

6. अपनी ब्रांच को Push करें:
   ```bash
   git push origin feature/your-feature-name
   ```

7. GitHub पर Pull Request खोलें

## Commit संदेश नियम

- `feat:` - नई सुविधा
- `fix:` - बग फिक्स
- `docs:` - दस्तावेज
- `style:` - कोड शैली
- `refactor:` - कोड पुनर्गठन
- `test:` - परीक्षण
- `chore:` - परियोजना प्रबंधन

## कोड शैली

- हिंदी कमेंट का उपयोग करें
- const के साथ शुरू करें
- JSX में arrow functions का उपयोग करें
- Tailwind CSS का उपयोग करें

## प्रश्न या समस्याएं?

GitHub Issues में एक issue खोलें।
