import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-brand-300 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
          </span>
          Nova Tecnologia de SDR Virtual disponível
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6">
          Automatize Suas Vendas com <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
            Inteligência Artificial
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
          A NexAuto cria agentes virtuais que qualificam leads, agendam reuniões e tiram dúvidas dos seus clientes 24/7. Aumente sua conversão sem aumentar a equipe.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="w-full sm:w-auto text-lg px-8 py-4"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Testar SDR Agora <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
            Ver Planos
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" /> Sem cartão necessário
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" /> Setup em 24h
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" /> Integração CRM
          </div>
        </div>
      </div>
    </section>
  );
};