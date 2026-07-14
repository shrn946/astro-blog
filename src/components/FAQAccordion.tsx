import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div 
            key={idx}
            className={`rounded-2xl glass transition-all duration-300 border ${
              isOpen 
                ? 'border-primary/40 bg-purple-950/10 shadow-lg shadow-primary/5' 
                : 'border-white/5 hover:border-white/10 hover:bg-white/2'
            }`}
          >
            <button
              onClick={() => toggleAccordion(idx)}
              className="w-full flex items-center justify-between p-6 text-left outline-none group"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className={`w-5 h-5 transition-colors ${isOpen ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />
                <span className={`font-semibold text-base transition-colors ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {item.question}
                </span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-primary' : ''
                }`} 
              />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-48 border-t border-white/5 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <p className="p-6 text-sm text-gray-400 leading-relaxed bg-black/10">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
