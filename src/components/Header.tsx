import { Leaf, Github, Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-400 bg-clip-text text-transparent tracking-tight leading-none">
                AI Agriculture
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Insight Information
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              About
            </a>
          </nav>

          {/* GitHub Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
              GitHub
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              AI Agriculture Insight Builder
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for farmers worldwide
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
