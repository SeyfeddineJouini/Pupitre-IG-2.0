import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="p-6">
    <div className="flex items-center justify-between flex-wrap mx-auto max-w-screen-xl">
      <div className="block">
        <Link to="/">
          <img
            className="h-[75px] top-0 left-0"
            alt="Logo"
            src="https://c.animaapp.com/8o9pA6SK/img/logo@2x.png"
          />
        </Link>
      </div>
      <nav className="block flex items-center justify-center flex-grow space-x-4">
        <Link to="/"><span className="inline-block font-extrabold text-[#596774] hover:text-gray-600 [font-family:'Inter',Helvetica]">Home</span></Link>
        <Link to="/"><span className="inline-block font-extrabold text-[#596774] hover:text-gray-600 [font-family:'Inter',Helvetica]">Actualites</span></Link>
        <Link to="/"><span className="inline-block font-extrabold text-[#596774] hover:text-gray-600 [font-family:'Inter',Helvetica]">Statistiques</span></Link>
        <Link to="/"><span className="inline-block font-extrabold text-[#596774] hover:text-gray-600 [font-family:'Inter',Helvetica]">Jeux Ludiques</span></Link>
        <Link to="/"><span className="inline-block font-extrabold text-[#596774] hover:text-gray-600 [font-family:'Inter',Helvetica]">Avis</span></Link>
      </nav>
      <div className="block">
        <Link to="/"><span className="inline-block px-4 py-2 leading-none border rounded text-gray-600 border-gray-600 hover:text-gray-900 hover:border-gray-900">Login</span></Link>
      </div>
    </div>
  </header>
);

export default Header;
