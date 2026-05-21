import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import JsonLd from './JsonLd';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rdtvideodownloader.com';

  // Construct JSON-LD BreadcrumbList Schema
  const schemaItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteUrl,
    },
    ...items.map((item, index) => {
      const position = index + 2;
      return {
        "@type": "ListItem",
        "position": position,
        "name": item.label,
        ...(item.url ? { "item": item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}` } : {}),
      };
    }),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": schemaItems,
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="w-full py-3.5 px-5 mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
        <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-400">
          <li className="flex items-center">
            <Link 
              href="/"
              className="flex items-center gap-1.5 transition-colors duration-200 hover:text-orange-500 text-slate-400 focus:outline-none"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
                {isLast || !item.url ? (
                  <span className="text-orange-400 font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-sm" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="transition-colors duration-200 hover:text-orange-500 truncate max-w-[150px] sm:max-w-xs text-slate-300"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
