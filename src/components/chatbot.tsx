// src/components/chatbot.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { synapseChat } from '@/ai/flows/synapse-chat';
import { Avatar, AvatarFallback } from './ui/avatar';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');


  useEffect(() => {
    if (isOpen) {
      setMessages([
        { sender: 'bot', text: "Hello! I'm AGENT X. How can I help you with your projects today?" }
      ]);
    } else {
        setMessages([]);
        setInputValue('');
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to the bottom when a new message is added
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const newMessages: Message[] = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await synapseChat(inputValue);
      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages([...newMessages, { text: "Sorry, I ran into an error. Please try again.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const botIcon = (
    <div className="bg-primary rounded-full p-2 text-primary-foreground">
        <Bot className="h-6 w-6" />
    </div>
  );

  const userIcon = (
    <Avatar className="h-10 w-10">
        {userAvatar && <Image src={userAvatar.imageUrl} alt="User Avatar" width={32} height={32} data-ai-hint={userAvatar.imageHint} />}
        <AvatarFallback>U</AvatarFallback>
    </Avatar>
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleToggle}
          size="icon"
          className="rounded-full w-16 h-16 shadow-lg"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-40"
          >
            <Card className="w-[380px] h-[550px] shadow-2xl flex flex-col">
              <CardHeader>
                <CardTitle>AGENT X</CardTitle>
                <CardDescription>Your intelligent assistant for project insights.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
                <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 ${
                          message.sender === 'user' ? 'justify-end' : ''
                        }`}
                      >
                        {message.sender === 'bot' && botIcon}
                        <div
                          className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.text}
                        </div>
                        {message.sender === 'user' && userIcon}
                      </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3">
                            {botIcon}
                            <div className="bg-muted rounded-xl px-4 py-3">
                                <Loader2 className="h-5 w-5 animate-spin" />
                            </div>
                        </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="flex items-center gap-2 pt-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about a project..."
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
