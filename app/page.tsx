import React from 'react';
import Link from 'next/link';
import BlogList from '@/components/Projects';
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";

const Home = () => {
  return (
    <div className="w-screen h-screen max-w-4xl mx-auto px-4">

      <header className="text-center my-12">
        <h1 className="text-5xl font-bold my-4">ari</h1>
        <p className="text-xl">Web Developer</p>
      </header>

      <Team />

      <Blog />

      <Testimonials />

      <Contact />

      <footer className="text-center my-10">
        <p>&copy; {new Date().getFullYear()} ari. All rights reserved.</p>
        <p>Connect with me on <Link href='https://github.com/eftpmc'>github</Link></p>
      </footer>
    </div>
  );
};

export default Home;
