import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SDRChat } from './components/SDRChat';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-brand-500/30 selection:text-brand-200">
      <Navbar />
      
      <main>
        <Hero />
        
        <Features />
        
        {/* Interactive Demo Section */}
        <section id="demo" className="py-24 bg-slate-900/50 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-10">
              <div className="max-w-4xl text-center space-y-6">
                <h2 className="text-3xl font-bold text-white">
                  Experimente o futuro do <br />
                  <span className="text-brand-400">Atendimento SDR</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Abaixo está um exemplo real do nosso Agente SDR "Nexus". 
                  Ele foi treinado para qualificar leads para a NexAuto.
                  <br className="hidden md:block"/>
                  <span className="text-sm opacity-80">(Você pode alternar entre cenários diferentes no menu lateral do chat)</span>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-left max-w-2xl mx-auto">
                  <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-brand-500 hover:bg-slate-700 transition-colors">
                    <h4 className="font-semibold text-white mb-1">Tente perguntar:</h4>
                    <p className="text-slate-400 text-sm">"Como vocês podem ajudar minha empresa de logística?"</p>
                  </div>
                  <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-purple-500 hover:bg-slate-700 transition-colors">
                     <h4 className="font-semibold text-white mb-1">Ou pergunte sobre preço:</h4>
                    <p className="text-slate-400 text-sm">"Quanto custa para implementar um chatbot?"</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full">
                <SDRChat />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
             <div className="absolute inset-0 bg-brand-900/20 z-0"></div>
             <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Pronto para escalar sua operação?</h2>
                <p className="text-slate-400 text-lg mb-8">
                    Não deixe seus leads esperando. Implemente um SDR virtual hoje mesmo e veja seus resultados decolarem.
                </p>
                <button className="bg-white text-brand-900 hover:bg-slate-100 font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:-translate-y-1">
                    Falar com um Especialista Humano
                </button>
             </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;