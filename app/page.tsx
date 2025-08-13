'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from './components/layout';
import { WalletConnect } from './components/wallet';
import { DIDWizard, DIDViewer } from './components/did';

interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

export default function Home() {
  const [didDocument, setDidDocument] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [currentStep, setCurrentStep] = useState<'connect' | 'create' | 'view'>('connect');
  const [isDark, setIsDark] = useState(false);

  // Dark mode toggle
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };
  
  const handleConnect = (walletAddress: string) => {
    setIsConnected(true);
    setAddress(walletAddress);
    setCurrentStep('create');
  };

  const handleDIDComplete = (document: string) => {
    setDidDocument(document);
    setIsCreating(false);
    setCurrentStep('view');
  };

  const handleDIDCreationStart = () => {
    setIsCreating(true);
  };

  const handleStartOver = () => {
    setDidDocument('');
    setCurrentStep('create');
  };

  // Feature icons
  const ShieldIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const KeyIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
    </svg>
  );

  const GlobeIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const features: Feature[] = [
    {
      icon: <ShieldIcon />,
      title: 'W3C Compliant',
      description: 'Fully compliant with W3C DID Core specification and industry standards for decentralized identity.'
    },
    {
      icon: <KeyIcon />,
      title: 'Self-Sovereign',
      description: 'You own and control your identity completely. No central authority can revoke or modify your DID.'
    },
    {
      icon: <GlobeIcon />,
      title: 'Interoperable',
      description: 'Works across multiple platforms and services that support decentralized identity standards.'
    },
    {
      icon: <LockIcon />,
      title: 'Secure by Design',
      description: 'Built on cryptographic foundations with support for multiple verification methods.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <Header onThemeToggle={toggleTheme} isDark={isDark} />

      {/* Hero Section */}
      {currentStep === 'connect' && (
        <section className="relative overflow-hidden">
          {/* Background with gradient mesh */}
          <div className="absolute inset-0 gradient-mesh opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
            <div className="text-center animate-fade-in">
              {/* Hero Title */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                Own Your
                <span className="block text-gradient">Digital Identity</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                Create and manage your decentralized identity with our W3C-compliant DID platform. 
                <span className="block mt-2">Secure, private, and fully under your control.</span>
              </p>

              {/* Wallet Connection */}
              <div className="max-w-lg mx-auto mb-16">
                <WalletConnect 
                  onConnect={handleConnect}
                  isConnected={isConnected}
                  address={address}
                />
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>W3C Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No Data Collection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Open Source</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section - Only show when not connected */}
      {currentStep === 'connect' && (
        <section id="features" className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose Decentralized Identity?
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Take control of your digital identity with cutting-edge decentralized technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="glass-card rounded-2xl p-8 hover-lift transition-all duration-300 animate-fade-in group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-105 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it Works Section - Only show when not connected */}
      {currentStep === 'connect' && (
        <section id="how-it-works" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Create your decentralized identity in just a few simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center animate-slide-in">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Connect Wallet
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Connect your MetaMask or use demo mode to get started with your DID creation
                </p>
              </div>

              <div className="text-center animate-slide-in" style={{ animationDelay: '200ms' }}>
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Configure Identity
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Set up your identity details, verification methods, and service endpoints
                </p>
              </div>

              <div className="text-center animate-slide-in" style={{ animationDelay: '400ms' }}>
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Generate DID
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your W3C-compliant DID document is generated and ready to use across platforms
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DID Creation Wizard */}
      {currentStep === 'create' && (
        <section className="py-16 lg:py-24 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <DIDWizard
              address={address}
              onComplete={handleDIDComplete}
              isCreating={isCreating}
              onStartCreating={handleDIDCreationStart}
            />
          </div>
        </section>
      )}

      {/* DID Document Viewer */}
      {currentStep === 'view' && didDocument && (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <button
                onClick={handleStartOver}
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Create Another DID</span>
              </button>
            </div>
            <DIDViewer didDocument={didDocument} />
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
