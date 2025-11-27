import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Briefcase, Sun, Wrench, Lock } from 'lucide-react';
import { initializeChat, sendMessageToSDR } from '../services/geminiService';
import { Message, ChatStatus, Scenario } from '../types';
import { Button } from './ui/Button';
import { ALINE_SYSTEM_INSTRUCTION, DEFAULT_SYSTEM_INSTRUCTION, COMPANY_NAME } from '../constants';

const SCENARIOS: Scenario[] = [
  {
    id: 'default',
    title: 'NexAuto Padrão',
    subtitle: 'Demonstração Geral',
    status: 'active',
    systemPrompt: DEFAULT_SYSTEM_INSTRUCTION,
    initialTrigger: "Olá, inicie o atendimento se apresentando."
  },
  {
    id: 'law',
    title: 'Advocacia',
    subtitle: 'Qualificação de Leads',
    status: 'coming_soon'
  },
  {
    id: 'solar',
    title: 'Energia Solar',
    subtitle: 'Qualificação de Leads',
    status: 'coming_soon'
  },
  {
    id: 'auto',
    title: 'Oficina Mecânica',
    subtitle: 'Agendamento de Serviços',
    status: 'active',
    systemPrompt: ALINE_SYSTEM_INSTRUCTION,
    initialTrigger: "Inicie a conversa como Aline, se apresentando cordialmente."
  }
];

export const SDRChat: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when scenario changes
  useEffect(() => {
    const initScenario = async () => {
      setStatus(ChatStatus.LOADING);
      setMessages([]); // Clear previous messages
      
      try {
        // Enable tools only for 'auto' scenario (Aline)
        const useTools = activeScenario.id === 'auto';
        initializeChat(activeScenario.systemPrompt, useTools);
        
        // Initial greeting
        const response = await sendMessageToSDR(activeScenario.initialTrigger || "Olá");
        
        const greeting: Message = {
          id: 'init-' + Date.now(),
          role: 'model',
          text: response,
          timestamp: new Date(),
        };
        setMessages([greeting]);
      } catch (error) {
        console.error("Failed to init chat", error);
      } finally {
        setStatus(ChatStatus.IDLE);
      }
    };

    if (activeScenario.status === 'active') {
      initScenario();
    }
  }, [activeScenario]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  const handleSend = async () => {
    if (!inputText.trim() || status === ChatStatus.LOADING) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setStatus(ChatStatus.LOADING);

    try {
      const responseText = await sendMessageToSDR(userMsg.text);
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setStatus(ChatStatus.IDLE);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getIcon = (id: string) => {
    switch(id) {
      case 'law': return <Briefcase className="w-5 h-5" />;
      case 'solar': return <Sun className="w-5 h-5" />;
      case 'auto': return <Wrench className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[700px] w-full max-w-6xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl shadow-brand-900/20">
      
      {/* Sidebar - Scenario Selection */}
      <div className="w-full md:w-80 bg-slate-950/50 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-400" />
            Modelos de SDR
          </h3>
          <p className="text-xs text-slate-500 mt-1">Selecione um cenário para testar</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => scenario.status === 'active' && setActiveScenario(scenario)}
              disabled={scenario.status !== 'active'}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 group ${
                activeScenario.id === scenario.id 
                  ? 'bg-brand-900/20 border-brand-500/50 ring-1 ring-brand-500/20' 
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              } ${scenario.status !== 'active' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`mt-1 p-2 rounded-lg ${activeScenario.id === scenario.id ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'}`}>
                {getIcon(scenario.id)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${activeScenario.id === scenario.id ? 'text-white' : 'text-slate-300'}`}>
                    {scenario.title}
                  </span>
                  {scenario.status !== 'active' && (
                    <span className="text-[10px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded border border-slate-700">Dev</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">{scenario.subtitle}</p>
                {scenario.status !== 'active' && (
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-amber-500/80 font-medium">
                        <Lock className="w-3 h-3" /> Em desenvolvimento
                    </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900">
        {/* Chat Header */}
        <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center shadow-lg shadow-brand-900/50">
                {activeScenario.id === 'auto' ? (
                   <Wrench className="w-5 h-5 text-white" />
                ) : (
                   <Bot className="w-6 h-6 text-white" />
                )}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full animate-pulse"></span>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                {activeScenario.id === 'auto' ? 'Aline - Bono Pneus' : 'Nexus SDR'}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                Online • {activeScenario.subtitle}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex bg-brand-900/30 px-3 py-1 rounded-full border border-brand-500/30 items-center gap-2">
              <Sparkles className="w-3 h-3 text-brand-400" />
              <span className="text-xs text-brand-300 font-medium">AI Powered</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/30">
          {messages.length === 0 && status !== ChatStatus.LOADING && (
             <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2 opacity-50">
                <Bot className="w-12 h-12 mb-2" />
                <p>Iniciando conexão com o SDR...</p>
             </div>
          )}
          
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] sm:max-w-[75%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar Bubble */}
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-auto mb-1 ${
                      msg.role === 'user' ? 'bg-slate-700' : 'bg-brand-900/50 border border-brand-500/30'
                  }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-slate-300"/> : <Bot className="w-4 h-4 text-brand-400"/>}
                  </div>

                  <div
                    className={`rounded-2xl px-5 py-3.5 shadow-md ${
                      msg.role === 'user'
                        ? 'bg-brand-600 text-white rounded-br-sm'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-sm'
                    }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                    <div className={`text-[10px] mt-1.5 ${msg.role === 'user' ? 'text-brand-200' : 'text-slate-500'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
              </div>
            </div>
          ))}
          {status === ChatStatus.LOADING && (
            <div className="flex justify-start">
               <div className="flex items-end gap-2">
                   <div className="w-8 h-8 rounded-full bg-brand-900/50 border border-brand-500/30 flex items-center justify-center mb-1">
                        <Bot className="w-4 h-4 text-brand-400" />
                   </div>
                   <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                     <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
                     <span className="text-xs text-slate-400">Digitando...</span>
                   </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <div className="flex gap-2 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={activeScenario.id === 'auto' ? "Ex: Gostaria de agendar uma troca de óleo..." : "Digite sua mensagem..."}
              className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
            <Button 
              onClick={handleSend} 
              disabled={status === ChatStatus.LOADING || !inputText.trim()}
              className="rounded-xl px-4"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-center text-xs text-slate-600 mt-2">
              Nexus AI • {COMPANY_NAME}
          </p>
        </div>
      </div>
    </div>
  );
};