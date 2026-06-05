interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/30 group">
      {icon && (
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300 border border-slate-100">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-[#0F172A] mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[#64748B] leading-relaxed text-sm">
        {description}
      </p>
    </div>

  );
}
