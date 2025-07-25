'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { format } from 'date-fns';
import { ChatList } from './chat-list';
import { Message, Chat } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const STORAGE_KEY = 'chat-history';

export function ChatContainer() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem(STORAGE_KEY);
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    if (chats.length === 0) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, selectedChatId]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    setChats(prev => [newChat, ...prev]);
    setSelectedChatId(newChat.id);
  };

  const updateChatTitle = (chatId: string, firstMessage: string) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          title: firstMessage.slice(0, 30) + (firstMessage.length > 30 ? '...' : ''),
        };
      }
      return chat;
    }));
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentTime = new Date().toISOString();
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: format(new Date(), 'HH:mm'),
    };

    // Create new chat if none is selected
    if (!selectedChatId) {
      const newChat: Chat = {
        id: uuidv4(),
        title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
        messages: [userMessage],
        createdAt: currentTime,
        lastModified: currentTime,
      };
      setChats(prev => [newChat, ...prev]);
      setSelectedChatId(newChat.id);
    } else {
      // Update existing chat
      setChats(prev => prev.map(chat => {
        if (chat.id === selectedChatId) {
          const updatedMessages = [...chat.messages, userMessage];
          // Update title if this is the first message
          const title = chat.messages.length === 0 ? input.slice(0, 30) + (input.length > 30 ? '...' : '') : chat.title;
          return {
            ...chat,
            messages: updatedMessages,
            title,
            lastModified: currentTime,
          };
        }
        return chat;
      }));
    }

    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: `System Instruction: Neural Network Assistant

You are an AI assistant specialized in neural networks. Your role is to answer any question related to neural networks with clarity, technical accuracy, and helpful context, whether for beginners or advanced users.

In addition to direct answers, whenever applicable, recommend users consult specific documentation sections from an available reference, which includes the following topics:

Activation Functions

Conclusion

Core Process

Datasets

Introduction to Neural Networks

Math

Network Structure

Normalization

Overfitting

Regularization

Training Dynamics

Types of Layers

Types of Learning

Types of Problems

If a user's question aligns with one or more of these sections, briefly answer the question and recommend the matching documentation topic(s) for deeper understanding or practical application. Prioritize helpfulness and user empowerment over verbosity.

When recommending a section, use phrasing like:

“For a deeper dive, check the documentation on [topic].”

Avoid hallucinating documentation content. If a topic doesn't clearly match the user's question, don't suggest unrelated docs.` });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
        timestamp: format(new Date(), 'HH:mm'),
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, assistantMessage],
            lastModified: new Date().toISOString(),
          };
        }
        return chat;
      }));
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: format(new Date(), 'HH:mm'),
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, errorMessage],
            lastModified: new Date().toISOString(),
          };
        }
        return chat;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <div className="w-full max-w-6xl mx-auto min-h-[600px] flex">
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        onNewChat={createNewChat}
      />

      <Card className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {selectedChat?.messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-lg p-3">
                  <p className="text-sm">Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              Send
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}