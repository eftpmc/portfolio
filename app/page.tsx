import React from 'react';
import Link from 'next/link';
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";

const Home = () => {
  return (
    <div className="w-screen h-screen max-w-4xl mx-auto px-4">

      <header className="text-center my-12">
        <h1 className="text-5xl font-bold my-4">ari</h1>
        <p className="text-xl">Web Developer</p>
      </header>

      <Team />

      <Projects />

      <Testimonials />

      <Contact />

      <footer className="text-center py-10">
        <p>&copy; {new Date().getFullYear()} ari. Made with React.</p>
      </footer>
    </div>
  );
};

export default Home;
