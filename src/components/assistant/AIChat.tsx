import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  initialMessage?: string;
}

export function AIChat({ initialMessage }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your StudySync Assistant. Paste your notes or use the scan feature, and I can help you summarize, explain, or generate quiz questions from them.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      handleSend(`Explain this text:

${initialMessage}`);
    }
  }, [initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateMockResponse(content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const generateMockResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('explain')) {
      return `Based on the text provided, here is a simplified explanation:

1. The core concept revolves around the integration of sensory inputs into long-term memory.
2. Key processes include encoding, consolidation, and retrieval.
3. Practical application suggests that spaced repetition significantly improves retention rates compared to cramming.`;
    }
    if (lowerInput.includes('summarize')) {
      return `Summary: This material discusses the fundamental principles of academic research, emphasizing the importance of peer-reviewed sources and methodological rigor. It outlines the three primary stages of the research cycle: hypothesis formation, data collection, and analysis.`;
    }
    return `I've analyzed your input. Would you like me to:
- Summarize this content?
- Generate a practice quiz?
- Explain complex terms?
- Translate this to another language?`;
  };

  return (
    <Card className="h-[calc(100vh-250px)] flex flex-col overflow-hidden bg-white/50 backdrop-blur-sm border-slate-200">
      <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden border border-blue-200">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/0f733cb7-3251-4131-8b19-f230d0bf4a16/ai-assistant-avatar-188cd66e-1779811091829.webp" 
              alt="AI" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">StudySync AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs text-slate-500 font-medium">Online</span>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-slate-500"
          onClick={() => setMessages([messages[0]])}
        >
          Clear Chat
        </Button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-[80%] p-4 rounded-2xl shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}
              `}>
                <div className="flex items-center gap-2 mb-1 opacity-70">
                  {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  <span className="text-[10px] uppercase tracking-wider font-bold">
                    {msg.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                <div className="mt-2 text-[10px] text-right opacity-50">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <span className="text-xs text-slate-500 italic">AI is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything or paste scanned text..."
            className="flex-1 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-blue-600"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <div className="flex gap-2 mt-3">
          {['Summarize', 'Quiz', 'Translate'].map((action) => (
            <button
              key={action}
              type="button"
              onClick={() => handleSend(`${action} the previous content`)}
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}