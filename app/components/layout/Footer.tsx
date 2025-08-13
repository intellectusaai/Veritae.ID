'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Icons
  const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const ExternalLinkIcon = ({ className }: { className?: string }) => (
    <svg className={`w-4 h-4 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );

  const HeartIcon = ({ className }: { className?: string }) => (
    <svg className={`w-4 h-4 ${className || ''}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );

  const links = [
    {
      title: 'Resources',
      links: [
        { name: 'W3C DID Specification', href: 'https://w3c.github.io/did-core/', external: true },
        { name: 'DID Method Registry', href: 'https://w3c.github.io/did-spec-registries/', external: true },
        { name: 'Verifiable Credentials', href: 'https://www.w3.org/TR/vc-data-model/', external: true },
        { name: 'Self-Sovereign Identity', href: 'https://sovrin.org/', external: true }
      ]
    },
    {
      title: 'Technology',
      links: [
        { name: 'Ethereum', href: 'https://ethereum.org/', external: true },
        { name: 'MetaMask', href: 'https://metamask.io/', external: true },
        { name: 'Next.js', href: 'https://nextjs.org/', external: true },
        { name: 'Tailwind CSS', href: 'https://tailwindcss.com/', external: true }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'GitHub', href: 'https://github.com/', external: true },
        { name: 'Discord', href: '#', external: false },
        { name: 'Documentation', href: '#', external: false },
        { name: 'Support', href: '#', external: false }
      ]
    }
  ];

  return (
    <footer className="relative bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 opacity-60"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                    <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-900 flex items-center justify-center">
                      <svg 
                        className="w-6 h-6 text-blue-600 dark:text-blue-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gradient">DID Identity</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Decentralized & Secure
                  </p>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Create and manage your decentralized identity with our W3C-compliant DID platform. 
                Take control of your digital identity.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200 hover-lift"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-500 transition-all duration-200 hover-lift"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-700 transition-all duration-200 hover-lift"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            {/* Links Sections */}
            {links.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
                      >
                        <span>{link.name}</span>
                        {link.external && (
                          <ExternalLinkIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Stay Updated
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Get the latest updates on DID technology and decentralized identity.
              </p>
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover-lift transition-all duration-200 text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                <p>&copy; {currentYear} DID Identity Platform. All rights reserved.</p>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            {/* Made with Love */}
            <div className="mt-6 text-center">
              <p className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                <span>Made with</span>
                <HeartIcon className="text-red-500" />
                <span>for the decentralized web</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}