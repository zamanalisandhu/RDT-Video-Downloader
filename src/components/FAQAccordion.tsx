'use client';

import { useState } from 'react';
import { homepageFaqs } from '@/lib/faqs';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`wp-block-kadence-pane border rounded-[16px] transition-all duration-300 overflow-hidden mb-3.5 bg-white ${
        isOpen 
          ? 'border-brand-orange shadow-md shadow-brand-orange/5' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      <dt>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className="kt-blocks-accordion-header w-full flex items-center justify-between p-5 text-left cursor-pointer select-none focus:outline-none"
        >
          <span className="text-[17px] font-semibold text-slate-900 pr-4">
            {question}
          </span>
          <div 
            className={`kt-blocks-accordion-icon-trigger relative w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
              isOpen ? 'bg-brand-orange text-white rotate-45' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {/* Horizontal line of plus */}
            <span className={`absolute w-3 h-0.5 rounded transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-slate-600'}`} />
            {/* Vertical line of plus */}
            <span className={`absolute w-0.5 h-3 rounded transition-colors duration-300 ${isOpen ? 'bg-white' : 'bg-slate-600'}`} />
          </div>
        </button>
      </dt>
      <dd 
        className="kt-accordion-panel transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5 pt-0 text-slate-600 leading-relaxed text-[15px]">
          {answer}
        </div>
      </dd>
    </div>
  );
}

export default function FAQAccordion() {
  return (
    <div className="max-w-3xl mx-auto">
      <dl>
        {homepageFaqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </dl>
    </div>
  );
}
