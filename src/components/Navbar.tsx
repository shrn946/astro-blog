import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Search, Cpu, Code, BookOpen, Layers } from 'lucide-react';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
    
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Monitor scrolling to add background blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const categories = [
    { title: 'AI', url: '/blog?category=ai', icon: Cpu },
    { title: 'React', url: '/blog?category=react', icon: Code },
    { title: 'JavaScript', url: '/blog?category=javascript', icon: Layers },
    { title: 'CSS', url: '/blog?category=css', icon: BookOpen },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'glass py-3 shadow-lg border-b border-black/5 dark:border-white/5' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 transition-colors">
                ANTIGRAVITY<span className="text-purple-500">.AI</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-sm font-medium hover:text-purple-400 transition-colors">Home</a>
              <a href="/blog" className="text-sm font-medium hover:text-purple-400 transition-colors">Articles</a>
              
              {/* Categories Mega Menu Trigger */}
              <div className="relative group">
                <button className="flex items-center text-sm font-medium hover:text-purple-400 transition-colors gap-1">
                  Topics
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-4 rounded-2xl glass border border-black/10 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl">
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map(cat => {
                      const Icon = cat.icon;
                      return (
                        <a key={cat.title} href={cat.url} className="flex flex-col p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                          <Icon className="w-5 h-5 text-purple-400 mb-2" />
                          <span className="text-sm font-semibold">{cat.title}</span>
                          <span className="text-[10px] text-gray-500">View articles</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <a 
                href="/blog" 
                className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-primary text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-600/35 transition-all"
              >
                Read Blog
              </a>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden glass border-t border-white/5 py-4 px-6 absolute top-full left-0 w-full shadow-2xl flex flex-col space-y-4 animate-fade-in">
            <a href="/" className="text-base font-semibold hover:text-purple-400 transition-colors" onClick={() => setIsOpen(false)}>Home</a>
            <a href="/blog" className="text-base font-semibold hover:text-purple-400 transition-colors" onClick={() => setIsOpen(false)}>Articles</a>
            <div className="border-t border-white/5 pt-3">
              <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(cat => (
                  <a key={cat.title} href={cat.url} className="p-2 rounded-lg bg-white/5 text-sm font-medium" onClick={() => setIsOpen(false)}>
                    {cat.title}
                  </a>
                ))}
              </div>
            </div>
            <a href="/blog" className="w-full text-center py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold shadow-lg shadow-purple-600/20" onClick={() => setIsOpen(false)}>
              Get Started
            </a>
          </div>
        )}
      </header>

      {/* Render Search Overlay */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
