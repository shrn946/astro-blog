import React, { useState, useEffect } from 'react';
import { ChevronDown, Moon, Sun, Laptop, Menu, X, Cpu } from 'lucide-react';

type ThemeMode = 'light' | 'dark' | 'auto';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('auto');
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  // Initialize theme from storage
  useEffect(() => {
    const stored = (localStorage.getItem('theme') as ThemeMode) || 'auto';
    setCurrentTheme(stored);
  }, []);

  const handleThemeChange = (mode: ThemeMode) => {
    setCurrentTheme(mode);
    localStorage.setItem('theme', mode);
    setThemeDropdownOpen(false);
    
    if (mode === 'auto') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.className = systemDark ? 'dark' : 'light';
    } else {
      document.documentElement.className = mode;
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-gray-400 dark:from-white dark:to-gray-300 transition-colors">
              ANTIGRAVITY<span className="text-primary">.AI</span>
            </span>
          </a>

          {/* Main Desktop Navbar START */}
          <nav className="hidden xl:flex items-center space-x-8">
            
            {/* Demos Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('demos')}
                className="flex items-center text-sm font-medium hover:text-primary transition-colors gap-1 text-foreground"
              >
                Demos <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'demos' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'demos' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[450px] rounded-2xl glass border border-border overflow-hidden p-6 shadow-2xl animate-fade-in bg-card text-foreground">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <ul className="space-y-2.5 text-xs font-semibold text-gray-400">
                      <li><a href="/" className="hover:text-primary transition-colors block">Classic Default</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors block">Software Company</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors block">Finance Consulting</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors block">AI Agency</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors block">Product Landing</a></li>
                    </ul>
                    <ul className="space-y-2.5 text-xs font-semibold text-gray-400">
                      <li><a href="#" className="hover:text-primary transition-colors block">SaaS</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors block">SaaS AI Chatbot</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors block">Application Showcase</a></li>
                      <li><a href="#" className="hover:text-primary transition-colors block">Personal Portfolio</a></li>
                      <li><a href="/blog" className="text-primary transition-colors block font-bold">★ Blog Home</a></li>
                    </ul>
                  </div>
                  {/* CTA Box */}
                  <div className="h-28 rounded-xl bg-gradient-to-r from-primary/10 to-purple-500/20 border border-primary/20 flex flex-col justify-center px-4">
                    <h6 className="text-xs font-bold text-white mb-1">Looking for custom integration?</h6>
                    <p className="text-[10px] text-gray-400 mb-2">Our engineers are here to support your tech stack workflow.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Pages Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('pages')}
                className="flex items-center text-sm font-medium hover:text-primary transition-colors gap-1 text-foreground"
              >
                Pages <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'pages' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'pages' && (
                <div className="absolute top-full left-0 mt-3 w-56 rounded-xl glass border border-border p-3 shadow-2xl space-y-1.5 animate-fade-in bg-card text-xs text-gray-400 font-semibold">
                  <a href="#" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors">About Us</a>
                  <a href="/blog" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors">Blog Archives</a>
                  <a href="#" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors">Pricing Page</a>
                  <a href="#" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors">Integrations</a>
                  <a href="#" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors">Portfolio</a>
                  <a href="#" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors">Authentication</a>
                  <a href="/404" className="block px-3 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors">Error 404</a>
                </div>
              )}
            </div>

            {/* Doc Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('doc')}
                className="flex items-center text-sm font-medium hover:text-primary transition-colors gap-1 text-foreground"
              >
                Doc <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'doc' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'doc' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[600px] rounded-2xl glass border border-border p-6 shadow-2xl animate-fade-in bg-card text-foreground">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Documentation Card */}
                    <a href="#" className="flex p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                      <div className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                        📄
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-white">Documentation</h6>
                        <p className="text-[10px] text-gray-500 mt-1">Develop projects with layout instructions.</p>
                      </div>
                    </a>
                    {/* Snippets Card */}
                    <a href="#" className="flex p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                      <div className="w-8 h-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center mr-3 flex-shrink-0">
                        ⚡
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-white">Snippets</h6>
                        <p className="text-[10px] text-gray-500 mt-1">Development guidelines for building platforms.</p>
                      </div>
                    </a>
                    {/* Changelog Card */}
                    <a href="#" className="flex p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                      <div className="w-8 h-8 rounded bg-green-500/20 text-green-400 flex items-center justify-center mr-3 flex-shrink-0">
                        🎯
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-white">Changelog</h6>
                        <p className="text-[10px] text-gray-500 mt-1">Recent updates and release announcements.</p>
                      </div>
                    </a>
                    {/* Playwright Card */}
                    <a href="#" className="flex p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                      <div className="w-8 h-8 rounded bg-yellow-500/20 text-yellow-400 flex items-center justify-center mr-3 flex-shrink-0">
                        🎭
                      </div>
                      <div>
                        <h6 className="text-xs font-bold text-white">Playwright tips</h6>
                        <p className="text-[10px] text-gray-500 mt-1">Headless browser automation guides.</p>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="text-sm font-medium hover:text-primary transition-colors text-foreground">Contact us</a>
          </nav>
          {/* Main Desktop Navbar END */}

          {/* Action buttons Block */}
          <div className="flex items-center space-x-3 relative z-50">
            
            {/* Color Switcher */}
            <div className="relative">
              <button 
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                aria-label="Color Switcher"
              >
                {currentTheme === 'light' ? (
                  <Sun className="w-5 h-5" />
                ) : currentTheme === 'dark' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Laptop className="w-5 h-5" />
                )}
              </button>
              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl glass border border-border p-2 shadow-xl animate-fade-in bg-card text-xs text-gray-400 font-semibold space-y-1 z-55">
                  <button 
                    onClick={() => handleThemeChange('light')}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors ${currentTheme === 'light' ? 'text-primary bg-primary/10' : ''}`}
                  >
                    <Sun className="w-3.5 h-3.5" /> Light
                  </button>
                  <button 
                    onClick={() => handleThemeChange('dark')}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors ${currentTheme === 'dark' ? 'text-primary bg-primary/10' : ''}`}
                  >
                    <Moon className="w-3.5 h-3.5" /> Dark
                  </button>
                  <button 
                    onClick={() => handleThemeChange('auto')}
                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors ${currentTheme === 'auto' ? 'text-primary bg-primary/10' : ''}`}
                  >
                    <Laptop className="w-3.5 h-3.5" /> Auto
                  </button>
                </div>
              )}
            </div>

            {/* Sign up */}
            <a 
              href="#" 
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-xl bg-primary text-white hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all"
            >
              Sign up
            </a>

            {/* Mobile Toggler */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden glass border-t border-border py-4 px-6 absolute top-full left-0 w-full shadow-2xl flex flex-col space-y-4 animate-fade-in bg-card text-foreground">
          <a href="#" className="text-sm font-semibold hover:text-primary transition-colors">Demos</a>
          <a href="#" className="text-sm font-semibold hover:text-primary transition-colors">Pages</a>
          <a href="#" className="text-sm font-semibold hover:text-primary transition-colors">Doc</a>
          <a href="#" className="text-sm font-semibold hover:text-primary transition-colors">Contact us</a>
          <a href="#" className="w-full text-center py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/15">
            Sign up
          </a>
        </div>
      )}
    </header>
  );
}
