import React from 'react';
import { Cpu, Linkedin, Twitter, Instagram } from 'lucide-react';
import { COMPANY_NAME } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-8 h-8 text-brand-500" />
              <span className="text-xl font-bold text-white">{COMPANY_NAME}</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              Transformando a maneira como empresas vendem através de automação inteligente e tecnologia de ponta.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-brand-400 transition-colors">Soluções</a></li>
              <li><a href="#about" className="hover:text-brand-400 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>contato@nexauto.com.br</li>
              <li>+55 (11) 99999-9999</li>
              <li>São Paulo, SP</li>
            </ul>
            <div className="flex gap-4 mt-4">
                <a href="#" className="text-slate-400 hover:text-white"><Linkedin className="w-5 h-5"/></a>
                <a href="#" className="text-slate-400 hover:text-white"><Twitter className="w-5 h-5"/></a>
                <a href="#" className="text-slate-400 hover:text-white"><Instagram className="w-5 h-5"/></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};