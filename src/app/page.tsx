import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQAccordion from '@/components/FAQAccordion';
import { getSortedPostsData } from '@/lib/blog';

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
import DetailedGuide from '@/components/home/DetailedGuide';

export const metadata = {
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const latestPosts = (await getSortedPostsData('blog')).slice(0, 3);

  return (
    <>
      <SchemaMarkup />
      <Header />
      <main className="min-h-screen">
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

        {/* Detailed Guide for SEO content expansion */}
        <DetailedGuide />

        {/* Latest Blog Guides */}
        <LatestBlogs posts={latestPosts} />

        {/* FAQ Section */}
        <section id="faq" className="py-6 bg-white scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2.5">Frequently Asked Questions</h2>
              <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about downloading high-quality Reddit media.
              </p>
            </div>
            <FAQAccordion />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
