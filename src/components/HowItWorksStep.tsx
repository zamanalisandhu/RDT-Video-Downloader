interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
}

export default function HowItWorksStep({ number, title, description }: HowItWorksStepProps) {
  return (
    <li className="flex flex-col items-center text-center p-3">
      <div className="w-11 h-11 bg-gradient-to-br from-brand-orange to-brand-orange-light text-white rounded-full flex items-center justify-center text-base font-black mb-3 shadow-lg shadow-brand-orange/20">
        {number}
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-[13px] max-w-[280px]">
        {description}
      </p>
    </li>
  );
}
