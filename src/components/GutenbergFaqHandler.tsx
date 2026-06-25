'use client';

import { useEffect } from 'react';

interface GutenbergFaqHandlerProps {
  slug?: string;
}

export default function GutenbergFaqHandler({ slug }: GutenbergFaqHandlerProps) {
  useEffect(() => {
    // 1. RankMath FAQ Block Handling
    const rankMathItems = document.querySelectorAll('.rank-math-list-item');
    rankMathItems.forEach((item) => {
      if (item.classList.contains('faq-enhanced')) return;
      item.classList.add('faq-enhanced');

      const question = item.querySelector('.rank-math-question');
      const answer = item.querySelector('.rank-math-answer') as HTMLElement;
      
      if (question && answer) {
        // Base styling for item container
        item.className = 'border border-slate-200 bg-white rounded-2xl mb-3.5 overflow-hidden transition-all duration-300 hover:border-brand-orange/30 hover:shadow-[0_6px_20px_rgba(255,69,0,0.02)] faq-enhanced';
        
        // Style question wrapper (which acts as a button)
        const qText = question.textContent || '';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer select-none focus:outline-none';
        btn.innerHTML = `
          <span class="flex items-center gap-3">
            <span class="q-badge text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md shrink-0 transition-colors duration-300 bg-slate-100 text-slate-500">Q</span>
            <span class="q-text text-[15px] sm:text-[17px] font-extrabold transition-colors duration-300 pr-4 text-slate-900">${qText}</span>
          </span>
          <div class="circle-chevron w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 bg-slate-50 border-slate-100 text-slate-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        `;
        question.replaceWith(btn);

        // Style answer block
        answer.style.display = 'none';
        const rawContent = answer.innerHTML;
        answer.innerHTML = `
          <div class="px-5 pb-5 pt-0 border-t border-slate-100/50">
            <div class="pl-4 border-l-2 border-brand-orange/50 mt-4 mb-1 text-slate-600 leading-relaxed text-sm sm:text-base">
              ${rawContent}
            </div>
          </div>
        `;

        const qBadge = btn.querySelector('.q-badge');
        const qTextSpan = btn.querySelector('.q-text');
        const circleChevron = btn.querySelector('.circle-chevron');

        // Interactive toggle
        btn.addEventListener('click', () => {
          const isOpen = answer.style.display !== 'none';
          if (isOpen) {
            answer.style.display = 'none';
            item.className = 'border border-slate-200 bg-white rounded-2xl mb-3.5 overflow-hidden transition-all duration-300 hover:border-brand-orange/30 hover:shadow-[0_6px_20px_rgba(255,69,0,0.02)] faq-enhanced';
            
            qBadge?.classList.remove('bg-brand-orange', 'text-white');
            qBadge?.classList.add('bg-slate-100', 'text-slate-500');
            
            qTextSpan?.classList.remove('text-brand-orange');
            qTextSpan?.classList.add('text-slate-900');
            
            circleChevron?.classList.remove('bg-brand-orange/10', 'border-brand-orange/20', 'text-brand-orange', 'rotate-90');
            circleChevron?.classList.add('bg-slate-50', 'border-slate-100', 'text-slate-400');
          } else {
            answer.style.display = 'block';
            item.className = 'border-brand-orange bg-gradient-to-br from-white to-orange-50/15 shadow-md shadow-brand-orange/5 rounded-2xl mb-3.5 overflow-hidden transition-all duration-300 faq-enhanced';
            
            qBadge?.classList.remove('bg-slate-100', 'text-slate-500');
            qBadge?.classList.add('bg-brand-orange', 'text-white');
            
            qTextSpan?.classList.remove('text-slate-900');
            qTextSpan?.classList.add('text-brand-orange');
            
            circleChevron?.classList.remove('bg-slate-50', 'border-slate-100', 'text-slate-400');
            circleChevron?.classList.add('bg-brand-orange/10', 'border-brand-orange/20', 'text-brand-orange', 'rotate-90');
          }
        });
      }
    });

    // 2. Yoast FAQ Block Handling
    const yoastItems = document.querySelectorAll('.schema-faq-section');
    yoastItems.forEach((item) => {
      if (item.classList.contains('faq-enhanced')) return;
      item.classList.add('faq-enhanced');

      const question = item.querySelector('.schema-faq-question');
      const answer = item.querySelector('.schema-faq-answer') as HTMLElement;

      if (question && answer) {
        item.className = 'border border-slate-200 bg-white rounded-2xl mb-3.5 overflow-hidden transition-all duration-300 hover:border-brand-orange/30 hover:shadow-[0_6px_20px_rgba(255,69,0,0.02)] faq-enhanced';

        const qText = question.textContent || '';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer select-none focus:outline-none';
        btn.innerHTML = `
          <span class="flex items-center gap-3">
            <span class="q-badge text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md shrink-0 transition-colors duration-300 bg-slate-100 text-slate-500">Q</span>
            <span class="q-text text-[15px] sm:text-[17px] font-extrabold transition-colors duration-300 pr-4 text-slate-900">${qText}</span>
          </span>
          <div class="circle-chevron w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 bg-slate-50 border-slate-100 text-slate-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        `;
        question.replaceWith(btn);

        answer.style.display = 'none';
        const rawContent = answer.innerHTML;
        answer.innerHTML = `
          <div class="px-5 pb-5 pt-0 border-t border-slate-100/50">
            <div class="pl-4 border-l-2 border-brand-orange/50 mt-4 mb-1 text-slate-600 leading-relaxed text-sm sm:text-base">
              ${rawContent}
            </div>
          </div>
        `;

        const qBadge = btn.querySelector('.q-badge');
        const qTextSpan = btn.querySelector('.q-text');
        const circleChevron = btn.querySelector('.circle-chevron');

        btn.addEventListener('click', () => {
          const isOpen = answer.style.display !== 'none';
          if (isOpen) {
            answer.style.display = 'none';
            item.className = 'border border-slate-200 bg-white rounded-2xl mb-3.5 overflow-hidden transition-all duration-300 hover:border-brand-orange/30 hover:shadow-[0_6px_20px_rgba(255,69,0,0.02)] faq-enhanced';
            
            qBadge?.classList.remove('bg-brand-orange', 'text-white');
            qBadge?.classList.add('bg-slate-100', 'text-slate-500');
            
            qTextSpan?.classList.remove('text-brand-orange');
            qTextSpan?.classList.add('text-slate-900');
            
            circleChevron?.classList.remove('bg-brand-orange/10', 'border-brand-orange/20', 'text-brand-orange', 'rotate-90');
            circleChevron?.classList.add('bg-slate-50', 'border-slate-100', 'text-slate-400');
          } else {
            answer.style.display = 'block';
            item.className = 'border-brand-orange bg-gradient-to-br from-white to-orange-50/15 shadow-md shadow-brand-orange/5 rounded-2xl mb-3.5 overflow-hidden transition-all duration-300 faq-enhanced';
            
            qBadge?.classList.remove('bg-slate-100', 'text-slate-500');
            qBadge?.classList.add('bg-brand-orange', 'text-white');
            
            qTextSpan?.classList.remove('text-slate-900');
            qTextSpan?.classList.add('text-brand-orange');
            
            circleChevron?.classList.remove('bg-slate-50', 'border-slate-100', 'text-slate-400');
            circleChevron?.classList.add('bg-brand-orange/10', 'border-brand-orange/20', 'text-brand-orange', 'rotate-90');
          }
        });
      }
    });

    // 3. Kadence Accordion Block Handling
    const kadencePanes = document.querySelectorAll('.kt-accordion-pane');
    kadencePanes.forEach((pane) => {
      if (pane.classList.contains('faq-enhanced')) return;

      const titleEl = pane.querySelector('.kt-blocks-accordion-title');
      const panelInner = pane.querySelector('.kt-accordion-panel-inner');
      const panel = pane.querySelector('.kt-accordion-panel');

      if (titleEl && (panelInner || panel)) {
        // Mark as enhanced to prevent double-processing
        pane.classList.add('faq-enhanced');

        const qText = titleEl.textContent?.trim() || '';
        const rawContent = (panelInner || panel)!.innerHTML;

        // Check if it is initially open (Kadence uses active class or doesn't have hidden class)
        const isInitiallyOpen = pane.classList.contains('kt-accordion-pane-active') || 
                                (panel && !panel.classList.contains('kt-accordion-panel-hidden'));

        // Clear native Kadence structure inside the pane
        pane.innerHTML = '';

        // Apply our base custom accordion style
        const baseClass = 'wp-block-kadence-pane kt-accordion-pane faq-enhanced border rounded-2xl mb-3.5 overflow-hidden transition-all duration-300';
        const closedClass = `${baseClass} border-slate-200 bg-white hover:border-brand-orange/30 hover:shadow-[0_6px_20px_rgba(255,69,0,0.02)]`;
        const openClass = `${baseClass} border-brand-orange bg-gradient-to-br from-white to-orange-50/15 shadow-md shadow-brand-orange/5`;
        
        pane.className = isInitiallyOpen ? openClass : closedClass;

        // Reconstruct Button
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer select-none focus:outline-none';
        
        const badgeBg = isInitiallyOpen ? 'bg-brand-orange text-white' : 'bg-slate-100 text-slate-500';
        const textCol = isInitiallyOpen ? 'text-brand-orange' : 'text-slate-900';
        const chevronState = isInitiallyOpen ? 'bg-brand-orange/10 border-brand-orange/20 text-brand-orange rotate-90' : 'bg-slate-50 border-slate-100 text-slate-400';

        btn.innerHTML = `
          <span class="flex items-center gap-3">
            <span class="q-badge text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md shrink-0 transition-colors duration-300 ${badgeBg}">Q</span>
            <span class="q-text text-[15px] sm:text-[17px] font-extrabold transition-colors duration-300 pr-4 ${textCol}">${qText}</span>
          </span>
          <div class="circle-chevron w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${chevronState}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </div>
        `;

        // Reconstruct Answer Block
        const answer = document.createElement('div');
        answer.style.display = isInitiallyOpen ? 'block' : 'none';
        answer.className = 'transition-all duration-300';
        answer.innerHTML = `
          <div class="px-5 pb-5 pt-0 border-t border-slate-100/50">
            <div class="pl-4 border-l-2 border-brand-orange/50 mt-4 mb-1 text-slate-600 leading-relaxed text-sm sm:text-base">
              ${rawContent}
            </div>
          </div>
        `;

        pane.appendChild(btn);
        pane.appendChild(answer);

        const qBadge = btn.querySelector('.q-badge');
        const qTextSpan = btn.querySelector('.q-text');
        const circleChevron = btn.querySelector('.circle-chevron');

        btn.addEventListener('click', () => {
          const isOpen = answer.style.display !== 'none';
          if (isOpen) {
            answer.style.display = 'none';
            pane.className = closedClass;
            
            qBadge?.classList.remove('bg-brand-orange', 'text-white');
            qBadge?.classList.add('bg-slate-100', 'text-slate-500');
            
            qTextSpan?.classList.remove('text-brand-orange');
            qTextSpan?.classList.add('text-slate-900');
            
            circleChevron?.classList.remove('bg-brand-orange/10', 'border-brand-orange/20', 'text-brand-orange', 'rotate-90');
            circleChevron?.classList.add('bg-slate-50', 'border-slate-100', 'text-slate-400');
          } else {
            answer.style.display = 'block';
            pane.className = openClass;
            
            qBadge?.classList.remove('bg-slate-100', 'text-slate-500');
            qBadge?.classList.add('bg-brand-orange', 'text-white');
            
            qTextSpan?.classList.remove('text-slate-900');
            qTextSpan?.classList.add('text-brand-orange');
            
            circleChevron?.classList.remove('bg-slate-50', 'border-slate-100', 'text-slate-400');
            circleChevron?.classList.add('bg-brand-orange/10', 'border-brand-orange/20', 'text-brand-orange', 'rotate-90');
          }
        });
      }
    });

    // Reset native Kadence block container borders, paddings, and styles
    const kadenceWraps = document.querySelectorAll('.wp-block-kadence-accordion, .kt-accordion-wrap, .kt-accordion-inner-wrap');
    kadenceWraps.forEach((wrap) => {
      const w = wrap as HTMLElement;
      w.style.border = 'none';
      w.style.background = 'transparent';
      w.style.boxShadow = 'none';
      w.style.padding = '0';
      w.style.margin = '0';
      w.style.maxWidth = 'none';
    });
  }, [slug]);

  return null;
}

