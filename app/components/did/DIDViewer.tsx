'use client';

import { useState } from 'react';

interface DIDViewerProps {
  didDocument: string;
  onClose?: () => void;
}

// Icons
const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CopyIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
);

const VerifiedIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

// Simple JSON syntax highlighter
function highlightJSON(json: string): string {
  return json
    .replace(/(".*?")\s*:/g, '<span class="text-blue-600 dark:text-blue-400">$1</span>:')
    .replace(/:\s*(".*?")/g, ': <span class="text-green-600 dark:text-green-400">$1</span>')
    .replace(/:\s*(true|false|null)/g, ': <span class="text-purple-600 dark:text-purple-400">$1</span>')
    .replace(/:\s*(\d+)/g, ': <span class="text-orange-600 dark:text-orange-400">$1</span>')
    .replace(/([{}[\]])/g, '<span class="text-slate-600 dark:text-slate-400">$1</span>');
}

export function DIDViewer({ didDocument, onClose }: DIDViewerProps) {
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<'formatted' | 'raw'>('formatted');

  let parsedDID;
  try {
    parsedDID = didDocument ? JSON.parse(didDocument) : {};
  } catch (error) {
    console.error('Invalid JSON in DID document:', error);
    parsedDID = {};
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(didDocument);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([didDocument], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `did-${parsedDID.id.split(':').pop()?.slice(-8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DID Document',
          text: `Check out my DID: ${parsedDID.id}`,
          files: [new File([didDocument], 'did-document.json', { type: 'application/json' })]
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full animate-scale-in">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <DocumentIcon />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                DID Document Created
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your decentralized identity is ready
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
            <VerifiedIcon />
            <span className="text-sm font-medium">W3C Compliant</span>
          </div>
        </div>

        {/* DID Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-600 dark:text-slate-400">DID Identifier:</span>
            <p className="font-mono text-slate-900 dark:text-white break-all mt-1">
              {parsedDID?.id || 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-slate-600 dark:text-slate-400">Created:</span>
            <p className="text-slate-900 dark:text-white mt-1">
              {parsedDID?.created ? new Date(parsedDID.created).toLocaleString() : 'N/A'}
            </p>
          </div>
          {parsedDID?.name && (
            <div>
              <span className="text-slate-600 dark:text-slate-400">Name:</span>
              <p className="text-slate-900 dark:text-white mt-1">
                {parsedDID?.name}
              </p>
            </div>
          )}
          <div>
            <span className="text-slate-600 dark:text-slate-400">Controller:</span>
            <p className="font-mono text-slate-900 dark:text-white break-all mt-1">
              {parsedDID.controller.slice(0, 8)}...{parsedDID.controller.slice(-6)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span className="text-sm font-medium">
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
        
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
        >
          <DownloadIcon />
          <span className="text-sm font-medium">Download</span>
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          <ShareIcon />
          <span className="text-sm font-medium">Share</span>
        </button>

        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          <button
            onClick={() => setView('formatted')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              view === 'formatted' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Formatted
          </button>
          <button
            onClick={() => setView('raw')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              view === 'raw' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Raw JSON
          </button>
        </div>
      </div>

      {/* Document Content */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {view === 'formatted' ? (
          <div className="p-6">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Document Structure
            </h4>
            
            {/* Context */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Context
              </h5>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                {parsedDID['@context'].map((context: string, index: number) => (
                  <div key={index} className="text-sm font-mono text-slate-600 dark:text-slate-400">
                    {context}
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Methods */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Verification Methods
              </h5>
              <div className="space-y-3">
                {parsedDID.verificationMethod.map((method: any, index: number) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">ID:</span>
                        <p className="font-mono text-slate-900 dark:text-white break-all">
                          {method.id}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Type:</span>
                        <p className="text-slate-900 dark:text-white">
                          {method.type}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-slate-600 dark:text-slate-400">Public Key:</span>
                        <p className="font-mono text-slate-900 dark:text-white break-all">
                          {method.publicKeyHex}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Services
              </h5>
              <div className="space-y-3">
                {parsedDID.service.map((service: any, index: number) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Type:</span>
                        <p className="text-slate-900 dark:text-white">
                          {service.type}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Endpoint:</span>
                        <p className="text-slate-900 dark:text-white break-all">
                          {service.serviceEndpoint}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Authentication & Assertion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Authentication
                </h5>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                  {parsedDID.authentication.map((auth: string, index: number) => (
                    <div key={index} className="text-sm font-mono text-slate-600 dark:text-slate-400 break-all">
                      {auth}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Assertion Method
                </h5>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                  {parsedDID.assertionMethod.map((assertion: string, index: number) => (
                    <div key={index} className="text-sm font-mono text-slate-600 dark:text-slate-400 break-all">
                      {assertion}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="bg-slate-900 dark:bg-slate-950 p-6 overflow-x-auto">
              <pre 
                className="text-sm font-mono text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: highlightJSON(JSON.stringify(parsedDID, null, 2))
                }}
              />
            </div>
            
            {/* Copy button overlay for raw view */}
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <CheckIcon className="text-green-400" />
              ) : (
                <CopyIcon className="text-slate-300" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Success Message */}
      <div className="mt-6 bg-green-50 dark:bg-green-950/50 border border-green-200/30 dark:border-green-800/30 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <VerifiedIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
              DID Document Successfully Created
            </h4>
            <p className="text-xs text-green-800 dark:text-green-200">
              Your decentralized identity document follows the W3C DID specification and is ready to be used across compatible platforms and applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}