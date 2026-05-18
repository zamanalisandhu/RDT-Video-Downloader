interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
}

export default function HowItWorksStep({ number, title, description }: HowItWorksStepProps) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-brand-orange-light text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-lg shadow-brand-orange/30">
        {number}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed max-w-[280px]">
        {description}
      </p>
    </div>
  );
}
