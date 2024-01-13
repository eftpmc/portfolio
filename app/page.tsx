import React from 'react';
import Link from 'next/link'
import BlogList from '../components/BlogList';
import Particles from "../components/Particles";

const Home = () => {
  return (
    <div className="w-screen h-screen max-w-4xl mx-auto px-4">
      <header className="text-center my-12">
        <h1 className="text-5xl font-bold my-4">ari</h1>
        <p className="text-xl">web developer</p>
      </header>

      <Particles
        className="absolute inset-0 animate-fade-in"
        quantity={100}
      />
      <section className="my-10">
        <BlogList />
      </section>

      <footer className="text-center my-10 z-5">
        <p>&copy; {new Date().getFullYear()} ari. All rights reserved.</p>
        <p>Connect with me on
          <Link
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
            href='https://github.com/eftpmc'> github
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Home;
