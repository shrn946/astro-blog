import React, { useState } from 'react';
import { Send, Heart, Mail } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-md pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Brief */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              ANTIGRAVITY<span className="text-purple-500">.AI</span>
            </h3>
            <p className="text-sm text-gray-400 max-w-sm">
              An enterprise-quality, blazing fast engineering blog diving deep into artificial intelligence, modern frontend engineering, and clean code architectures.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://twitter.com" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-400">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Articles</a></li>
              <li><a href="/sitemap-index.xml" className="text-sm text-gray-400 hover:text-white transition-colors">Sitemap</a></li>
              <li><a href="/rss.xml" className="text-sm text-gray-400 hover:text-white transition-colors">RSS Feed</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-purple-400">Stay Updated</h4>
            <p className="text-sm text-gray-400">Subscribe to our newsletter for technical articles and news.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all"
              />
              <button 
                type="submit"
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors shadow-lg shadow-purple-600/20"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-green-400 font-semibold animate-pulse">Thanks for subscribing!</p>
            )}
          </div>
        </div>

        {/* AdSense ready placement */}
        <div className="my-8 py-4 border-y border-white/5 flex items-center justify-center min-h-[90px] bg-white/2">
          {/* AdSense Placeholder */}
          <div className="text-center text-[10px] text-gray-500 tracking-wider">
            <p>ADVERTISEMENT</p>
            <div className="text-xs text-gray-400 mt-1">Responsive AdSense Placement (Footer)</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Antigravity.AI. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Built with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> & Astro
          </p>
        </div>
      </div>
    </footer>
  );
}
