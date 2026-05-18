interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[32px] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/40 group">
      {icon && (
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-slate-100">
          {icon}
        </div>
      )}
      <h3 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tight">
        {title}
      </h3>
      <p className="text-[#64748B] leading-relaxed text-lg">
        {description}
      </p>
    </div>

  );
}
