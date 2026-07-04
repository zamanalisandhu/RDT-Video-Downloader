import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';
import { pageSEO } from '@/lib/seo';

export const metadata: Metadata = pageSEO({
  title: "Contact RDT Video Downloader — Support & Feedback",
  description: "Get in touch with the RDT Video Downloader team for support, feature requests, partnerships, or press inquiries. We typically respond within 24 hours.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col flex-grow bg-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
            <p className="text-xl text-slate-500">
              Have a question or feedback? We&apos;d love to hear from you.
            </p>
          </div>

          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
