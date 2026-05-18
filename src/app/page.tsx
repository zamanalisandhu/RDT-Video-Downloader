import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQAccordion from '@/components/FAQAccordion';
import { getSortedPostsData } from '@/lib/markdown';

// Home Components
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Features from '@/components/home/Features';
import UseCases from '@/components/home/UseCases';
import Testimonials from '@/components/home/Testimonials';
import SubredditInfo from '@/components/home/SubredditInfo';
import SupportedFormats from '@/components/home/SupportedFormats';
import PowerUsers from '@/components/home/PowerUsers';
import Comparison from '@/components/home/Comparison';
import RelatedTools from '@/components/home/RelatedTools';
import LatestBlogs from '@/components/home/LatestBlogs';

export const metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const latestPosts = getSortedPostsData('blog').slice(0, 3);

  return (
    <main className="min-h-screen">
      <SchemaMarkup />
      <Header />
      
      <Hero />
      <HowItWorks />
      <Features />
      <UseCases />
      <Testimonials />
      <SubredditInfo />
      <SupportedFormats />
      <PowerUsers />
      <Comparison />
      <RelatedTools />

      {/* Latest Blog Guides */}
      <LatestBlogs posts={latestPosts} />

      {/* FAQ Section */}
      <section id="faq" className="py-10 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about downloading high-quality Reddit media.
            </p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <Footer />
    </main>
  );
}
