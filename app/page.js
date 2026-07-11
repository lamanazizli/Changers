'use client';
import Navbar from '../components/Navbar';
import CoursesSection from '../components/CourseCard';
import HomeSections from '../components/Homesections';
import Footer from '../components/Footer';
import HeroVisual from '../components/HeroVisual';
import FloatingCTA from '../components/FloatingCTA';

export default function Home() {
  return (
    <main style={{ background: '#0B0B0F', minHeight: '100vh' }}>
      <Navbar activePage="Ana Sehife" />
      <section style={{ display: 'flex', alignItems: 'stretch', width: '100%', padding: '0' }}>
        <HeroVisual />
      </section>
      <CoursesSection />
      <HomeSections />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
