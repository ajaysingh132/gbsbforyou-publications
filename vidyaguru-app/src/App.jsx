import React, { useState, useEffect } from 'react';
import { BookOpen, Home, MessageCircle, User, ChevronRight, Award, Clock, Book, Video, FileText, Settings, CheckCircle, Download, Send, Loader, PlayCircle, X } from 'lucide-react';
import { fetchAIResponse, generateCourseContent } from './services/apiService';

const VidyaguruPrototype = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [userProfile, setUserProfile] = useState({
    name: 'राज कुमार',
    level: 'class10',
    board: 'CBSE',
    language: 'Hindi',
    streak: 7,
    points: 240,
    accuracy: 85,
    completedCourses: 3
  });
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiContent, setAiContent] = useState('');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [error, setError] = useState(null);

  const courseDatabase = {
    anganwadi: {
      subjects: [
        { id: 'colors', name: 'रंग सीखें', icon: '🎨', chapters: 5 },
        { id: 'numbers', name: 'गिनती', icon: '🔢', chapters: 10 },
        { id: 'alphabets', name: 'अक्षर ज्ञान', icon: '🅰️', chapters: 26 }
      ]
    },
    class10: {
      subjects: [
        { id: 'math', name: 'गणित', icon: '📐', chapters: 15 },
        { id: 'science', name: 'विज्ञान', icon: '🔬', chapters: 16 },
        { id: 'social', name: 'सामाजिक विज्ञान', icon: '🌍', chapters: 8 },
        { id: 'hindi', name: 'हिंदी-A', icon: '📝', chapters: 12 }
      ]
    },
    class12: {
      subjects: [
        { id: 'math', name: 'गणित', icon: '📐', chapters: 13 },
        { id: 'physics', name: 'भौतिकी', icon: '⚛️', chapters: 15 },
        { id: 'chemistry', name: 'रसायन विज्ञान', icon: '🧪', chapters: 16 }
      ]
    }
  };

  const generateChapters = (subjectId, subjectName, totalChapters) => {
    const mathChapters = [
      { id: 1, name: 'वास्तविक संख्याएं', difficulty: 'आसान', duration: '45', completed: true },
      { id: 2, name: 'बहुपद', difficulty: 'मध्यम', duration: '60', completed: true },
      { id: 3, name: 'रैखिक समीकरण युग्म', difficulty: 'मध्यम', duration: '75', completed: false },
      { id: 4, name: 'द्विघात समीकरण', difficulty: 'कठिन', duration: '90', completed: false },
      { id: 5, name: 'समांतर श्रेढ़ी', difficulty: 'मध्यम', duration: '60', completed: false }
    ];

    const scienceChapters = [
      { id: 1, name: 'रासायनिक अभिक्रियाएं', difficulty: 'आसान', duration: '50', completed: true },
      { id: 2, name: 'अम्ल, क्षारक एवं लवण', difficulty: 'मध्यम', duration: '60', completed: false },
      { id: 3, name: 'धातु एवं अधातु', difficulty: 'मध्यम', duration: '65', completed: false }
    ];

    if (subjectId === 'math') return mathChapters.slice(0, totalChapters);
    if (subjectId === 'science') return scienceChapters.slice(0, totalChapters);
    
    return Array.from({ length: Math.min(totalChapters, 5) }, (_, i) => ({
      id: i + 1,
      name: \`\${subjectName} - अध्याय \${i + 1}\`,
      difficulty: ['आसान', 'मध्यम', 'कठिन'][Math.floor(Math.random() * 3)],
      duration: \`\${40 + Math.floor(Math.random() * 50)}\`,
      completed: i < 2
    }));
  };

  const generateStudyMaterials = (chapterName) => {
    return {
      videos: [
        { 
          id: 1, 
          title: 'परिचय और मुख्य अवधारणाएं', 
          duration: '12:30', 
          completed: false,
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        { 
          id: 2, 
          title: 'विस्तृत व्याख्या', 
          duration: '18:45', 
          completed: false,
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        { 
          id: 3, 
          title: 'उदाहरण और समाधान', 
          duration: '15:20', 
          completed: false,
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
      ],
      notes: {
        title: 'अध्याय नोट्स',
        content: \`\${chapterName} के मुख्य बिंदु:\n\n• अवधारणा की परिभाषा\n• सूत्र और नियम\n• व्यावहारिक अनुप्रयोग\`
      },
      practice: {
        easy: 10,
        medium: 15,
        hard: 8,
        total: 33
      },
      test: {
        questions: 20,
        duration: '60 मिनट',
        marks: 50
      }
    };
  };

  const handleAIChat = async (message) => {
    if (!message.trim()) return;

    const userMessage = { type: 'user', text: message };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAIResponse({
        studentName: userProfile.name,
        level: userProfile.level,
        subject: selectedSubject?.name || 'सामान्य',
        question: message
      });
      
      setChatMessages(prev => [...prev, { type: 'ai', text: response }]);
    } catch (err) {
      const errorMsg = err.message || 'क्षमा करें, कुछ त्रुटि हुई। कृपया पुनः प्रयास करें।';
      setChatMessages(prev => [...prev, { type: 'ai', text: errorMsg }]);
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCourseContentAsync = async (chapterName) => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await generateCourseContent({
        chapterName,
        level: userProfile.level,
        board: userProfile.board
      });
      setAiContent(content);
      return content;
    } catch (err) {
      const errorMsg = 'सामग्री लोड करने में त्रुटि: ' + (err.message || 'अज्ञात त्रुटि');
      setAiContent(errorMsg);
      setError(errorMsg);
      return errorMsg;
    } finally {
      setIsLoading(false);
    }
  };

  const playVideo = (video) => {
    setSelectedVideo(video);
    setShowVideoPlayer(true);
    setUserProfile({...userProfile, points: userProfile.points + 10});
  };

  const VideoPlayerModal = () => {
    if (!showVideoPlayer || !selectedVideo) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-slide-in">
        <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-purple-600 to-teal-500 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{selectedVideo.title}</h3>
              <p className="text-sm text-purple-200">{selectedVideo.duration}</p>
            </div>
            <button 
              onClick={() => {
                setShowVideoPlayer(false);
                setSelectedVideo(null);
              }}
              className="p-2 hover:bg-purple-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="aspect-video bg-black flex items-center justify-center">
            <div className="text-center text-white p-8">
              <PlayCircle className="w-24 h-24 mx-auto mb-4 animate-pulse-custom" />
              <p className="text-xl mb-4">वीडियो प्लेयर</p>
              <p className="text-sm text-gray-400 mb-4">यहाँ {selectedVideo.title} का वीडियो चलेगा</p>
              <div className="bg-green-500 text-white px-6 py-2 rounded-full inline-block font-bold">
                +10 अंक मिले! 🎉
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600">
              📝 नोट: वास्तविक ऐप में यहाँ शैक्षिक वीडियो चलेगा (YouTube, Vimeo, या कस्टम वीडियो सर्वर से)
            </p>
          </div>
        </div>
      </div>
    );
  };

  const ErrorBanner = () => {
    if (!error) return null;
    return (
      <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 flex justify-between items-center z-40 animate-slide-in">
        <span>{error}</span>
        <button 
          onClick={() => setError(null)}
          className="hover:opacity-80 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const OnboardingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-teal-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-slide-in">
        <div className="text-6xl mb-4 animate-bounce">🎓</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">विद्यागुरु AI</h1>
        <p className="text-gray-600 mb-6 text-lg">आंगनबाड़ी से PhD तक का सफर</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center bg-purple-50 p-4 rounded-xl border-l-4 border-purple-600">
            <div className="text-3xl mr-4">✨</div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">AI-संचालित शिक्षा</h3>
              <p className="text-sm text-gray-600">व्यक्तिगत लर्निंग पाथ</p>
            </div>
          </div>
          
          <div className="flex items-center bg-teal-50 p-4 rounded-xl border-l-4 border-teal-600">
            <div className="text-3xl mr-4">📚</div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">NEP 2020 संरेखित</h3>
              <p className="text-sm text-gray-600">सभी बोर्ड्स और परीक्षाएं</p>
            </div>
          </div>

          <div className="flex items-center bg-pink-50 p-4 rounded-xl border-l-4 border-pink-600">
            <div className="text-3xl mr-4">🌟</div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">हिंदी माध्यम</h3>
              <p className="text-sm text-gray-600">अपनी भाषा में सीखें</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setCurrentScreen('levelSelect')}
          className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all active:scale-95"
        >
          शुरू करें →
        </button>
      </div>
    </div>
  );

  const LevelSelectScreen = () => (
    <div className="min-h-screen bg-gray-50 p-4 pt-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-slide-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">अपना शिक्षा स्तर चुनें</h2>
          <p className="text-gray-600">हम आपके लिए कस्टम कंटेंट तैयार करेंगे</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 animate-slide-in">
          {[
            { id: 'anganwadi', name: 'आंगनबाड़ी', desc: '3-6 साल', icon: '🧸', gradient: 'from-pink-400 to-pink-600' },
            { id: 'class10', name: 'कक्षा 9-10', desc: 'बोर्ड परीक्षा', icon: '🎯', gradient: 'from-purple-400 to-purple-600' },
            { id: 'class12', name: 'कक्षा 11-12', desc: 'JEE, NEET', icon: '🚀', gradient: 'from-green-400 to-green-600' }
          ].map(level => (
            <div 
              key={level.id}
              onClick={() => { 
                setUserProfile({...userProfile, level: level.id}); 
                setCurrentScreen('profile'); 
              }}
              className={\`bg-gradient-to-br \${level.gradient} rounded-2xl p-6 text-white cursor-pointer hover:scale-105 transition-transform active:scale-95 shadow-lg\`}
            >
              <div className="text-4xl mb-3">{level.icon}</div>
              <h3 className="text-xl font-bold mb-2">{level.name}</h3>
              <p className="opacity-90 mb-4">{level.desc}</p>
              <div className="text-sm opacity-75">टैप करें →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileScreen = () => {
    const isEditing = currentScreen === 'profile';
    
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-purple-600 to-teal-500 text-white p-6 shadow-lg">
          {!isEditing && (
            <button 
              onClick={() => setCurrentScreen('home')} 
              className="mb-4 text-white hover:opacity-80 transition-opacity flex items-center"
            >
              ← वापस
            </button>
          )}
          <h2 className="text-3xl font-bold">मेरा प्रोफ़ाइल</h2>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg animate-slide-in">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-3xl text-white font-bold shadow-lg">
                {userProfile.name.charAt(0)}
              </div>
              <div className="ml-4 flex-1">
                {isEditing ? (
                  <input 
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    className="text-xl font-bold border-b-2 border-purple-300 focus:outline-none w-full p-2 focus:border-purple-600 transition-colors"
                    placeholder="नाम दर्ज करें"
                  />
                ) : (
                  <h3 className="text-xl font-bold text-gray-800">{userProfile.name}</h3>
                )}
                <p className="text-sm text-gray-600">कक्षा: {userProfile.level}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-2xl font-bold text-gray-800">{userProfile.streak}</div>
                <div className="text-xs text-gray-600">दिन</div>
              </div>
              <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-2xl font-bold text-gray-800">{userProfile.points}</div>
                <div className="text-xs text-gray-600">अंक</div>
              </div>
              <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-2xl font-bold text-gray-800">{userProfile.accuracy}%</div>
                <div className="text-xs text-gray-600">सटीकता</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">📈 पूर्ण किए गए कोर्स</p>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-teal-500 h-2 rounded-full transition-all"
                  style={{width: \`\${(userProfile.completedCourses / 10) * 100}%\`}}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">{userProfile.completedCourses} / 10 कोर्स</p>
            </div>
          </div>

          {isEditing && (
            <div className="bg-white rounded-2xl p-6 shadow-lg space-y-4 animate-slide-in">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">🏫 बोर्ड</label>
                <select 
                  value={userProfile.board}
                  onChange={(e) => setUserProfile({...userProfile, board: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-purple-600 focus:outline-none transition-colors"
                >
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State">राज्य बोर्ड</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">🌐 भाषा</label>
                <select 
                  value={userProfile.language}
                  onChange={(e) => setUserProfile({...userProfile, language: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                >
                  <option value="Hindi">हिंदी</option>
                  <option value="English">English</option>
                </select>
              </div>

              <button 
                onClick={() => setCurrentScreen('home')}
                className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-3 rounded-full font-bold hover:shadow-lg transition-all active:scale-95"
              >
                सहेजें और जारी रखें ✓
              </button>
            </div>
          )}
        </div>

        {!isEditing && <BottomNav current="profile" setScreen={setCurrentScreen} />}
      </div>
    );
  };

  const HomeScreen = () => {
    const subjects = courseDatabase[userProfile.level]?.subjects || [];
    
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-purple-600 to-teal-500 text-white p-6 rounded-b-3xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">नमस्ते, {userProfile.name}! 👋</h2>
              <p className="text-purple-100">आज क्या सीखेंगे?</p>
            </div>
            <button 
              onClick={() => setCurrentScreen('profile')}
              className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-opacity-30 transition-all active:scale-90"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-xl font-bold text-gray-800">{userProfile.streak}</div>
              <div className="text-xs text-gray-600">दिन</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-xl font-bold text-gray-800">{userProfile.points}</div>
              <div className="text-xs text-gray-600">अंक</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-xl font-bold text-gray-800">{userProfile.accuracy}%</div>
              <div className="text-xs text-gray-600">सटीकता</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">आपके विषय</h3>
            <div className="grid grid-cols-2 gap-3">
              {subjects.map((subject, idx) => (
                <div 
                  key={subject.id}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setCurrentScreen('subjectDetail');
                  }}
                  className="bg-white rounded-xl p-4 shadow cursor-pointer hover:shadow-lg transition-all hover:scale-105 active:scale-95 animate-slide-in"
                  style={{animationDelay: \`\${idx * 50}ms\`}}
                >
                  <div className="text-4xl mb-2">{subject.icon}</div>
                  <h4 className="font-semibold text-gray-800 text-sm">{subject.name}</h4>
                  <p className="text-xs text-gray-600">{subject.chapters} अध्याय</p>
                </div>
              ))}
            </div>
          </div>

          <div 
            onClick={() => {
              setChatMessages([{
                type: 'ai',
                text: \`नमस्ते \${userProfile.name}! मैं आपका AI शिक्षक हूं। कोई भी सवाल पूछें! 😊\`
              }]);
              setCurrentScreen('aiAssistant');
            }}
            className="bg-gradient-to-r from-teal-400 to-green-500 rounded-2xl p-5 text-white cursor-pointer hover:scale-105 transition-transform active:scale-95 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold mb-1">🤖 AI शिक्षक</h4>
                <p className="text-sm">कोई भी सवाल पूछें</p>
              </div>
              <MessageCircle className="w-12 h-12" />
            </div>
          </div>
        </div>

        <BottomNav current="home" setScreen={setCurrentScreen} />
      </div>
    );
  };

  const SubjectDetailScreen = () => {
    if (!selectedSubject) return null;
    
    const chapters = generateChapters(selectedSubject.id, selectedSubject.name, selectedSubject.chapters);
    const completedCount = chapters.filter(c => c.completed).length;
    const progressPercent = (completedCount / chapters.length) * 100;
    
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 shadow-lg">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="mb-4 text-white hover:opacity-80 transition-opacity flex items-center"
          >
            ← वापस
          </button>
          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">{selectedSubject.icon}</div>
            <div>
              <h2 className="text-2xl font-bold">{selectedSubject.name}</h2>
              <p className="text-blue-100">{chapters.length} अध्याय</p>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="flex justify-between mb-2 text-sm">
              <span>प्रगति</span>
              <span>{completedCount}/{chapters.length}</span>
            </div>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all"
                style={{width: \`\${progressPercent}%\`}}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {chapters.map((chapter, idx) => (
            <div 
              key={chapter.id}
              onClick={() => {
                setSelectedChapter(chapter);
                setAiContent('');
                setCurrentScreen('chapterDetail');
              }}
              className={\`bg-white rounded-xl p-4 shadow cursor-pointer hover:shadow-lg transition-all hover:translate-x-1 \${chapter.completed ? 'border-l-4 border-green-500' : ''}\`}
              style={{animation: \`slideInUp 0.3s ease-out \${idx * 50}ms\`}}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{chapter.name}</h4>
                  <div className="flex gap-3 text-xs text-gray-600">
                    <span>⏱️ {chapter.duration} मिनट</span>
                    <span>📊 {chapter.difficulty}</span>
                  </div>
                </div>
                <div className="text-xl ml-4">
                  {chapter.completed ? '✅' : '⭕'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ChapterDetailScreen = () => {
    if (!selectedChapter || !selectedSubject) return null;

    const materials = generateStudyMaterials(selectedChapter.name);

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 shadow-lg">
          <button 
            onClick={() => setCurrentScreen('subjectDetail')}
            className="mb-4 text-white hover:opacity-80 transition-opacity flex items-center"
          >
            ← वापस
          </button>
          <h2 className="text-2xl font-bold">{selectedChapter.name}</h2>
          <p className="text-green-100">{selectedChapter.duration} मिनट • {selectedChapter.difficulty}</p>
        </div>

        <div className="p-4 space-y-4">
          {/* Videos Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Video className="w-5 h-5" /> वीडियो (3)
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {materials.videos.map(video => (
                <div 
                  key={video.id}
                  onClick={() => playVideo(video)}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{video.title}</p>
                      <p className="text-xs text-gray-600">{video.duration}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" /> नोट्स
              </h3>
            </div>
            <div className="p-4">
              <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                {materials.notes.content}
              </p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> PDF डाउनलोड करें
              </button>
            </div>
          </div>

          {/* Practice Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Award className="w-5 h-5" /> अभ्यास (33 प्रश्न)
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{materials.practice.easy}</div>
                  <div className="text-xs text-gray-600">आसान</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{materials.practice.medium}</div>
                  <div className="text-xs text-gray-600">मध्यम</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{materials.practice.hard}</div>
                  <div className="text-xs text-gray-600">कठिन</div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg hover:shadow-lg transition-all active:scale-95 font-bold">
                अभ्यास शुरू करें →
              </button>
            </div>
          </div>

          {/* AI Content Section */}
          {aiContent && (
            <div className="bg-white rounded-2xl shadow-lg p-4 border-l-4 border-purple-600">
              <h3 className="font-bold text-gray-800 mb-3">🤖 AI सारांश</h3>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{aiContent}</p>
            </div>
          )}

          {!aiContent && (
            <button 
              onClick={() => generateCourseContentAsync(selectedChapter.name)}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-teal-500 text-white py-3 rounded-lg hover:shadow-lg transition-all active:scale-95 font-bold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  लोड हो रहा है...
                </>
              ) : (
                <>✨ AI से अध्याय सारांश प्राप्त करें</>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  const AIAssistantScreen = () => {
    return (
      <div className="fixed inset-0 bg-gray-50 flex flex-col z-40">
        <div className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">🤖 AI शिक्षक</h2>
          <button 
            onClick={() => setCurrentScreen('home')}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-600">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>कोई सवाल पूछें!</p>
              </div>
            </div>
          ) : (
            chatMessages.map((msg, idx) => (
              <div 
                key={idx}
                className={\`flex \${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in\`}
              >
                <div
                  className={\`max-w-xs px-4 py-2 rounded-lg \${
                    msg.type === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }\`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm">सोच रहे हैं...</span>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4 bg-white">
          <div className="flex gap-2">
            <input 
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAIChat(chatInput)}
              placeholder="अपना सवाल लिखें..."
              className="flex-1 p-3 border-2 border-gray-300 rounded-full focus:border-teal-500 focus:outline-none transition-colors"
              disabled={isLoading}
            />
            <button 
              onClick={() => handleAIChat(chatInput)}
              disabled={isLoading || !chatInput.trim()}
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white p-3 rounded-full hover:shadow-lg transition-all active:scale-90 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const BottomNav = ({ current, setScreen }) => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 flex justify-around py-2 shadow-lg">
      <button 
        onClick={() => setScreen('home')}
        className={\`flex flex-col items-center justify-center py-3 px-4 rounded-lg transition-all \${
          current === 'home' ? 'text-purple-600 bg-purple-50' : 'text-gray-600'
        }\`}
      >
        <Home className="w-6 h-6 mb-1" />
        <span className="text-xs font-semibold">होम</span>
      </button>
      
      <button 
        onClick={() => setScreen('aiAssistant')}
        className={\`flex flex-col items-center justify-center py-3 px-4 rounded-lg transition-all \${
          current === 'ai' ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
        }\`}
      >
        <MessageCircle className="w-6 h-6 mb-1" />
        <span className="text-xs font-semibold">AI शिक्षक</span>
      </button>
      
      <button 
        onClick={() => setScreen('profile')}
        className={\`flex flex-col items-center justify-center py-3 px-4 rounded-lg transition-all \${
          current === 'profile' ? 'text-pink-600 bg-pink-50' : 'text-gray-600'
        }\`}
      >
        <User className="w-6 h-6 mb-1" />
        <span className="text-xs font-semibold">प्रोफ़ाइल</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorBanner />
      {currentScreen === 'onboarding' && <OnboardingScreen />}
      {currentScreen === 'levelSelect' && <LevelSelectScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
      {currentScreen === 'profileView' && <ProfileScreen />}
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'subjectDetail' && <SubjectDetailScreen />}
      {currentScreen === 'chapterDetail' && <ChapterDetailScreen />}
      {currentScreen === 'aiAssistant' && <AIAssistantScreen />}
      <VideoPlayerModal />
    </div>
  );
};

export default VidyaguruPrototype;
