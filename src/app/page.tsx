import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectPreview from '@/components/ProjectPreview';
import WorkshopJourney from '@/components/WorkshopJourney';
import Curriculum from '@/components/Curriculum';
import RegistrationForm from '@/components/RegistrationForm';
import ShareSection from '@/components/ShareSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'BuildSprint AI | Build Your First AI Project in 60 Minutes (NxtWave)',
  description:
    'Turn your curiosity into code. Join a free 60-minute online workshop designed for final-year engineering students ready to start building with AI.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFD] dark:bg-[#080C14] text-slate-800 dark:text-slate-100 flex flex-col selection:bg-[#4285F4] selection:text-white transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProjectPreview />
        <WorkshopJourney />
        <Curriculum />
        <RegistrationForm />
        <ShareSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
