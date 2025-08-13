'use client';

import { useState } from 'react';

interface WalletConnectProps {
  onConnect: (address: string) => void;
  isConnected: boolean;
  address: string;
}

// SVG Icons
const MetaMaskIcon = () => (
  <svg viewBox="0 0 318.6 318.6" className="w-8 h-8">
    <style>
      {`.st0{fill:#E2761B;stroke:#E2761B;stroke-linecap:round;stroke-linejoin:round;}
       .st1{fill:#E4761B;stroke:#E4761B;stroke-linecap:round;stroke-linejoin:round;}
       .st2{fill:#D7C1B3;stroke:#D7C1B3;stroke-linecap:round;stroke-linejoin:round;}
       .st3{fill:#233447;stroke:#233447;stroke-linecap:round;stroke-linejoin:round;}
       .st4{fill:#CD6116;stroke:#CD6116;stroke-linecap:round;stroke-linejoin:round;}
       .st5{fill:#E4751F;stroke:#E4751F;stroke-linecap:round;stroke-linejoin:round;}
       .st6{fill:#F6851B;stroke:#F6851B;stroke-linecap:round;stroke-linejoin:round;}
       .st7{fill:#C0AD9E;stroke:#C0AD9E;stroke-linecap:round;stroke-linejoin:round;}
       .st8{fill:#161616;stroke:#161616;stroke-linecap:round;stroke-linejoin:round;}
       .st9{fill:#763D16;stroke:#763D16;stroke-linecap:round;stroke-linejoin:round;}`}
    </style>
    <polygon className="st0" points="274.1,35.5 174.6,109.4 193,65.8"/>
    <g>
      <polygon className="st1" points="44.4,35.5 143.1,110.1 125.6,65.8"/>
      <polygon className="st1" points="238.3,206.8 211.8,247.4 268.5,262.6 283.5,207.7"/>
      <polygon className="st1" points="35.2,207.7 50.1,262.6 106.8,247.4 80.3,206.8"/>
      <polygon className="st1" points="103.6,138.2 87.8,162.1 144.1,164.6 142.1,104.1"/>
      <polygon className="st1" points="214.9,138.2 175.9,103.4 174.6,164.6 230.8,162.1"/>
      <polygon className="st1" points="106.8,247.4 140.6,230.9 111.4,208.1"/>
      <polygon className="st1" points="177.9,230.9 211.8,247.4 207.1,208.1"/>
    </g>
  </svg>
);

const WalletIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export function WalletConnect({ onConnect, isConnected, address }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleConnect = async (walletType: 'metamask' | 'demo') => {
    setIsConnecting(true);
    setSelectedWallet(walletType);
    
    try {
      if (walletType === 'metamask') {
        setConnectionStatus('Checking for MetaMask...');
        
        // Check if MetaMask is available
        if (typeof window !== 'undefined' && window.ethereum) {
          setConnectionStatus('MetaMask found! Requesting permission...');
          
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          
          if (accounts.length > 0) {
            setConnectionStatus('Connected successfully!');
            setTimeout(() => onConnect(accounts[0]), 500);
          } else {
            throw new Error('No accounts found');
          }
        } else {
          throw new Error('MetaMask not detected');
        }
      } else {
        // Demo mode
        setConnectionStatus('Generating demo wallet...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        const demoAddress = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
        setConnectionStatus('Demo wallet created!');
        setTimeout(() => onConnect(demoAddress), 500);
      }
    } catch (error) {
      console.error('Connection failed:', error);
      setConnectionStatus('Connection failed, using demo mode...');
      // Fallback to demo
      const demoAddress = '0x' + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setTimeout(() => onConnect(demoAddress), 1000);
    } finally {
      setTimeout(() => {
        setIsConnecting(false);
        setConnectionStatus('');
        setSelectedWallet(null);
      }, 1500);
    }
  };

  // Connected State
  if (isConnected) {
    return (
      <div className="w-full max-w-md mx-auto animate-scale-in">
        <div className="glass-card rounded-2xl p-6 border border-emerald-200/30 dark:border-emerald-400/20">
          {/* Success Header */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
              <CheckIcon />
            </div>
          </div>
          
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Wallet Connected
            </h3>
            
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                Connected Address
              </p>
              <p className="font-mono text-sm text-slate-900 dark:text-white break-all">
                {address.slice(0, 8)}...{address.slice(-6)}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <ShieldCheckIcon />
              <span className="text-sm font-medium">Secure Connection</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (isConnecting) {
    return (
      <div className="w-full max-w-md mx-auto animate-scale-in">
        <div className="glass-card rounded-2xl p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <LoadingSpinner />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {selectedWallet === 'metamask' ? 'Connecting to MetaMask' : 'Setting up Demo Wallet'}
              </h3>
              {connectionStatus && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {connectionStatus}
                </p>
              )}
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Connection Options
  return (
    <div className="w-full max-w-md mx-auto space-y-4 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Connect Your Wallet
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Choose how you&apos;d like to connect to get started with DID
        </p>
      </div>

      {/* MetaMask Option */}
      <button
        onClick={() => handleConnect('metamask')}
        className="w-full glass-card rounded-xl p-6 hover-lift hover-glow focus-ring group transition-all duration-300"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 p-3 group-hover:scale-105 transition-transform duration-200">
              <MetaMaskIcon />
            </div>
          </div>
          
          <div className="flex-1 text-left">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              MetaMask
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Connect using your MetaMask wallet for full blockchain features
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Demo Mode Option */}
      <button
        onClick={() => handleConnect('demo')}
        className="w-full glass-card rounded-xl p-6 hover-lift hover-glow focus-ring group transition-all duration-300"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-400 to-blue-500 p-3 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
              <WalletIcon />
            </div>
          </div>
          
          <div className="flex-1 text-left">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              Demo Mode
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Try the DID system with a generated demo wallet
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200/30 dark:border-blue-800/30 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
              Secure & Private
            </h4>
            <p className="text-xs text-blue-800 dark:text-blue-200">
              Your wallet connection is secure and private. We never store your private keys.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}