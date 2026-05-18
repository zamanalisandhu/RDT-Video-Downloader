import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us - RDT Video Downloader",
  description: "Have questions or feedback? Contact the RDT Video Downloader team for support or suggestions.",
  alternates: {
    canonical: '/contact',
  },
};

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="mb-4">Contact Us</h1>
            <p className="text-xl text-slate-500">
              Have a question or feedback? We&apos;d love to hear from you.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
      <Footer />
    </main>
  );
}
