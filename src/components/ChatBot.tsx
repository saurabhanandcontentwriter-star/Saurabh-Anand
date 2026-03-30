import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, User, Bot, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface Message {
  role: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! I'm Saurabh's AI assistant. How can I help you learn more about his SEO expertise or projects today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }]
        })).concat([{ role: "user", parts: [{ text: input }] }]),
        config: {
          systemInstruction: `You are a professional AI assistant for Saurabh Anand's portfolio website. 
          Your goal is to answer questions about Saurabh's professional background, skills, and projects based on the following information:
          
          About Saurabh:
          - Name: Saurabh Anand
          - Role: Results-driven SEO Analyst and Digital Marketing Professional with 2+ years of experience.
          - Education: Bachelor of Computer Applications (BCA) (2024), Diploma from DPG Polytechnic College (2021).
          - Achievements: LinkedIn Top Voice 2024, Google Certified.
          
          Experience:
          1. SEO Executive at TripzyGo (Mar 2024 – Present):
             - Achieved 80% increase in organic traffic in 6 months.
             - Optimized 500+ landing pages.
             - Tools: Google Analytics, Search Console, Ahrefs, Semrush.
          2. SEO Analyst at Guest Blogging Technology (Mar 2022 – Mar 2023):
             - Secured 200+ high-DA backlinks.
             - Increased Domain Authority by 15 points.
             - Tools: Moz, BuzzStream, Screaming Frog.
          3. Digital Marketing Intern at TripzyGo International:
             - Contributed to 70% traffic increase for the main blog.
          
          Skills:
          - SEO Mastery: Keyword Research, On-Page/Off-Page, Technical SEO, HTML SEO.
          - Digital Marketing: Content Strategy, GA4, Search Console.
          - Design & UX: Figma, UI/UX Optimization, User Behavior Analysis.
          - Development: HTML/CSS, React Fundamentals, Git.
          
          Tone: Professional, helpful, concise, and enthusiastic about Saurabh's work. 
          If asked about something not in this context, politely redirect them to Saurabh's contact section or suggest they email him at saurabhanandcontentwriter@gmail.com.`,
          maxOutputTokens: 500,
          temperature: 0.7,
        },
      });

      const botMessage: Message = {
        role: "bot",
        text: response.text || "I'm sorry, I couldn't process that request. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I'm having a bit of trouble connecting right now. Feel free to reach out to Saurabh directly via the contact form!",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-zinc-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Saurabh's Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-zinc-900 text-white rounded-tr-none" 
                          : "bg-white text-zinc-800 border border-zinc-100 shadow-sm rounded-tl-none"
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-zinc-100 shadow-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-zinc-100">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="w-full pl-4 pr-12 py-3 bg-zinc-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-zinc-900 transition-all outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-zinc-900 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                  <p className="mt-2 text-[10px] text-center text-zinc-400 uppercase tracking-widest font-medium">
                    Powered by Gemini AI
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-zinc-900 text-white rotate-90" : "bg-white text-zinc-900 border border-zinc-100"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
