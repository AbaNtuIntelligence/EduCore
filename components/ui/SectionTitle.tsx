interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  centered = true,
  className = '' 
}: SectionTitleProps) {
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B4C] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-20 bg-[#F05A28] rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
}
