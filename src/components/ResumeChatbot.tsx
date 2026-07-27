import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare, ChevronRight } from 'lucide-react';
import { chatQAPairs, defaultBotResponses } from '../data';
import { ChatMessage } from '../types';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';

export default function ResumeChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: '您好！我是由小米大模型 mimo-v2.5-pro 驱动的张志洋 AI 简历助理。我深度了解志洋的教育背景、德勤与政府实习经历、商业大赛成果以及他自研的 Deloitte-Diagram-Generator、SmartRepair、FundControl-AI 等创新系统。您可以通过点击下方推荐问题，或直接在输入框中向我提问！',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    '为什么选择雇佣张志洋？有哪些核心优势？',
    '在德勤中国的数字化咨询实习中，他做了什么？',
    '他开发的 3 款 AI + 财经项目是什么？有何商业价值？',
    '他在全国高校商业精英挑战赛中获得了什么奖项？',
    '他在上海市政府与上海电气的合规与内控审计实习表现如何？'
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    const startTime = Date.now();

    try {
      // Connects directly to our secure Express full-stack model gateway
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      const data = await response.json();

      // Ensure a natural-feeling typing delay of at least 1200ms
      const elapsedTime = Date.now() - startTime;
      const minDelay = 1200;
      if (elapsedTime < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsedTime));
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.warn("AI Chat API failed, activating high-fidelity local fallback:", error);

      // Local keyword-matching fallback mechanism
      let matchedAnswer = '';
      const lowercaseQuery = text.toLowerCase();

      for (const pair of chatQAPairs) {
        const matchesKeyword = pair.keywords.some(
          (kw) => lowercaseQuery.includes(kw.toLowerCase()) || text.includes(kw)
        );
        if (matchesKeyword) {
          matchedAnswer = pair.answer;
          break;
        }
      }

      if (!matchedAnswer) {
        const defaultIndex = Math.floor(Math.random() * defaultBotResponses.length);
        matchedAnswer = defaultBotResponses[defaultIndex];
      }

      // Ensure a natural-feeling typing delay of at least 1200ms for fallback
      const elapsedTime = Date.now() - startTime;
      const minDelay = 1200;
      if (elapsedTime < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsedTime));
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: matchedAnswer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="ai-assistant-container" className="flex flex-col h-[580px] bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
      {/* Bot Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-900 to-slate-800 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-display font-medium text-sm tracking-wide">张志洋的 AI 助理</h3>
            <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              在线答疑 · mimo-v2.5-pro
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full text-xs text-emerald-400 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>小米大模型</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-slate-700 text-white'
                  : 'bg-emerald-500 text-white'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            {/* Chat Content */}
            <div className="space-y-1">
              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-tr-none whitespace-pre-line'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
              >
                {msg.sender === 'user' ? (
                  msg.text
                ) : (
                  <div className="markdown-body">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                )}
              </div>
              <p
                className={`text-[10px] text-gray-400 px-1 ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div 
            className="flex gap-3 max-w-[80%]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Panel */}
      <div className="px-6 py-3 bg-white border-t border-gray-100">
        <p className="text-[11px] font-medium text-gray-400 mb-2 flex items-center gap-1">
          <MessageSquare className="w-3 h-3 text-emerald-500" />
          点击快速提问：
        </p>
        <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto pr-1">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isTyping}
              className="text-xs text-gray-600 bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-1.5 rounded-lg border border-gray-100 text-left transition duration-200 flex items-center gap-1 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate max-w-[340px]">{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="flex gap-2 p-4 bg-gray-50 border-t border-gray-100"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="在此输入您的提问，例如：'他的德勤实习细节'..."
          disabled={isTyping}
          className="flex-1 px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={isTyping || !inputValue.trim()}
          className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition duration-200 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:hover:bg-slate-900 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
