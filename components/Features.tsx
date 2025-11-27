import React from 'react';
import { Bot, Zap, Clock, BarChart3, ShieldCheck, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: "Atendimento 24/7",
    description: "Seu SDR virtual nunca dorme. Atenda leads instantaneamente, em qualquer fuso horário."
  },
  {
    icon: Zap,
    title: "Qualificação Automática",
    description: "Filtre curiosos de clientes reais usando critérios personalizados e lógica avançada de IA."
  },
  {
    icon: Clock,
    title: "Implementação Rápida",
    description: "Nossos sistemas são plug-and-play. Comece a operar em dias, não meses."
  },
  {
    icon: MessageSquare,
    title: "Multicanal",
    description: "Integre com WhatsApp, Instagram, Email e Webchat em uma única plataforma centralizada."
  },
  {
    icon: BarChart3,
    title: "Analytics em Tempo Real",
    description: "Dashboards completos para acompanhar conversões, tempo de resposta e ROI."
  },
  {
    icon: ShieldCheck,
    title: "Segurança de Dados",
    description: "Compliance total com LGPD. Seus dados e os dos seus clientes estão protegidos."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-400 font-semibold tracking-wide uppercase text-sm mb-3">Por que escolher a NexAuto?</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Potencialize sua equipe comercial</h3>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Nossas ferramentas não substituem seu time, elas dão superpoderes para que eles foquem no fechamento, enquanto nós cuidamos da prospecção.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-brand-500/50 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-900/50 transition-colors">
                <feature.icon className="w-6 h-6 text-brand-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};