import { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiMinimize2 } from 'react-icons/fi';

const faqResponses = {
  greeting: ["Hello! 👋 I'm here to help you with your resume. How can I assist you today?", "Hi there! Ready to help you build an amazing resume. What do you need?", "Welcome! Ask me anything about creating or improving your resume."],
  help: ["I can help you with:\n• Creating a new resume\n• Editing existing resumes\n• Tips for writing compelling content\n• Formatting guidelines\n• Industry-specific advice\n\nWhat would you like to know more about?"],
  tips: ["Here are some quick tips for your resume:\n\n1. **Keep it concise** - Aim for 1-2 pages\n2. **Use action verbs** - 'Led', 'Created', 'Developed'\n3. **Quantify achievements** - 'Increased sales by 25%'\n4. **Tailor for each job** - Customize for each application\n5. **Proofread carefully** - No spelling or grammar errors\n\nNeed more specific advice?"],
  format: ["Resume format tips:\n\n• **Reverse chronological** - Most common, shows career progression\n• **Functional** - Skills-focused, good for career changers\n• **Combination** - Best of both worlds\n\nFor most job seekers, reverse chronological works best. Your recent experience matters most!"],
  skills: ["Highlighting skills effectively:\n\n• List both **technical skills** (software, languages, tools)\n• Include **soft skills** (leadership, communication)\n• Match keywords from the job description\n• Put your most relevant skills at the top\n• Don't just list - show how you used them!\n\nWould you like help identifying your key skills?"],
  experience: ["Describing work experience:\n\n• Start with a strong action verb\n• Include specific numbers and results\n• Focus on achievements, not just duties\n• Use the STAR method (Situation, Task, Action, Result)\n• Match responsibilities to the job you want\n\nExample: 'Increased customer satisfaction by 30% through implementing a new feedback system'"],
  education: ["Education section tips:\n\n• Put relevant coursework if you're a recent graduate\n• Include honors (GPA above 3.5, Dean's List)\n• Add certifications and professional development\n• Don't dates if you're worried about age discrimination\n• Only include high school if you have no college experience"],
  ats: ["ATS (Applicant Tracking System) tips:\n\n• Use standard section headings\n• Avoid tables, graphics, and headers/footers\n• Use keywords from the job posting\n• Submit as .docx or .pdf (check job posting)\n• Don't stuff keywords - use them naturally\n• Keep formatting simple and clean\n\nMost ATS systems can't read complex formatting!"],
  cover_letter: ["Cover letter advice:\n\n• Customize for each application\n• Show you've researched the company\n• Explain WHY you're a great fit\n• Keep it to one page\n• Focus on what you can do for them\n• End with a clear call to action\n\nNeed help writing a specific cover letter?"],
  default: ["That's a great question! Here are some things I can help with:\n\n• Creating your first resume\n• Editing and improving existing resumes\n• Resume formatting and layout\n• Writing compelling descriptions\n• Tips for specific industries\n\nTry asking about 'tips', 'format', 'skills', 'experience', or 'ATS' for specific advice!"]
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: faqResponses.greeting[0] }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.match(/^(hi|hello|hey|greetings)/)) {
      return faqResponses.greeting[Math.floor(Math.random() * faqResponses.greeting.length)];
    }
    if (lowerInput.match(/help|what can you do|assist|support/)) {
      return faqResponses.help[0];
    }
    if (lowerInput.match(/tip|advice|guideline|best practice/)) {
      return faqResponses.tips[0];
    }
    if (lowerInput.match(/format|layout|style|structure/)) {
      return faqResponses.format[0];
    }
    if (lowerInput.match(/skill|ability|competenc/)) {
      return faqResponses.skills[0];
    }
    if (lowerInput.match(/experience|work history|job/)) {
      return faqResponses.experience[0];
    }
    if (lowerInput.match(/educat|degree|university|school/)) {
      return faqResponses.education[0];
    }
    if (lowerInput.match(/ats|applicant tracking|keyword/)) {
      return faqResponses.ats[0];
    }
    if (lowerInput.match(/cover letter|letter/)) {
      return faqResponses.cover_letter[0];
    }
    return faqResponses.default[0];
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: inputValue.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = { id: Date.now() + 1, type: 'bot', text: getResponse(inputValue.trim()) };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center z-50"
        aria-label="Open chat"
      >
        <FiMessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-indigo-500/20 overflow-hidden z-50 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <FiMessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Resume Assistant</h3>
            <p className="text-xs text-white/80">Online • Ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Minimize chat"
          >
            <FiMinimize2 className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <FiX className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-sm shadow-sm'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about resumes..."
            className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Send message"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
