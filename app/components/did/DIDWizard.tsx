'use client';

import { useState } from 'react';

interface DIDWizardProps {
  address: string;
  onComplete: (didDocument: string) => void;
  isCreating: boolean;
  onStartCreating?: () => void;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactElement;
  status: 'pending' | 'current' | 'completed';
}

// Icons
const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const KeyIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LoadingIcon = () => (
  <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export function DIDWizard({ address, onComplete, isCreating, onStartCreating }: DIDWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [didData, setDidData] = useState({
    name: '',
    description: '',
    serviceEndpoint: '',
  });

  const steps: Step[] = [
    {
      id: 1,
      title: 'Basic Information',
      description: 'Set up your DID identity details',
      icon: <UserIcon />,
      status: currentStep === 1 ? 'current' : currentStep > 1 ? 'completed' : 'pending'
    },
    {
      id: 2,
      title: 'Configure Keys',
      description: 'Set up verification methods',
      icon: <KeyIcon />,
      status: currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'pending'
    },
    {
      id: 3,
      title: 'Review & Create',
      description: 'Review and generate your DID',
      icon: <DocumentIcon />,
      status: currentStep === 3 ? 'current' : currentStep > 3 ? 'completed' : 'pending'
    }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateDID = async () => {
    onStartCreating?.();
    
    try {
      // Simulate signing process with realistic timing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const timestamp = new Date().toISOString();
      const did = {
        '@context': [
          'https://www.w3.org/ns/did/v1',
          'https://w3id.org/security/suites/secp256k1-2019/v1'
        ],
        id: `did:eth:${address}`,
        controller: address,
        created: timestamp,
        updated: timestamp,
        name: didData.name || 'Unnamed DID',
        description: didData.description || 'A decentralized identity document',
        verificationMethod: [{
          id: `did:eth:${address}#key-1`,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: `did:eth:${address}`,
          publicKeyHex: address
        }],
        authentication: [`did:eth:${address}#key-1`],
        assertionMethod: [`did:eth:${address}#key-1`],
        service: [{
          id: `did:eth:${address}#service-1`,
          type: 'LinkedDomains',
          serviceEndpoint: didData.serviceEndpoint || 'https://identity.example.com'
        }],
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: timestamp,
          verificationMethod: `did:eth:${address}#key-1`,
          proofPurpose: 'assertionMethod',
          jws: `eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..${btoa(address.slice(2, 10))}`
        }
      };

      onComplete(JSON.stringify(did, null, 2));
    } catch (error) {
      console.error('Error creating DID:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Create Your DID
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Follow the steps to create your decentralized identity document
            </p>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Step {currentStep} of {steps.length}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center">
              {/* Step Circle */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${step.status === 'completed' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white' 
                  : step.status === 'current'
                  ? 'bg-white dark:bg-slate-900 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-400'
                }
              `}>
                {step.status === 'completed' ? <CheckCircleIcon /> : step.icon}
              </div>
              
              {/* Step Info */}
              <div className="mt-2 text-center min-w-0">
                <p className={`text-sm font-medium ${
                  step.status === 'current' ? 'text-blue-600 dark:text-blue-400' 
                  : step.status === 'completed' ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-24">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="glass-card rounded-2xl p-8 mb-8">
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <UserIcon />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Basic Information
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Provide basic details for your decentralized identity
              </p>
            </div>

            <div className="grid gap-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={didData.name}
                  onChange={(e) => setDidData({ ...didData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your display name"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This name will be associated with your DID
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={didData.description}
                  onChange={(e) => setDidData({ ...didData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Describe your identity or use case"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200/30 dark:border-blue-800/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      Connected Wallet
                    </h4>
                    <p className="text-xs text-blue-800 dark:text-blue-200 mt-1 font-mono">
                      {address.slice(0, 10)}...{address.slice(-8)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <KeyIcon />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Configure Keys
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Set up verification methods and service endpoints
              </p>
            </div>

            <div className="grid gap-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Service Endpoint
                </label>
                <input
                  type="url"
                  value={didData.serviceEndpoint}
                  onChange={(e) => setDidData({ ...didData, serviceEndpoint: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="https://your-domain.com"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Optional: URL where your DID services can be found
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-slate-900 dark:text-white">Verification Methods</h4>
                
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 dark:text-white">
                        Secp256k1 Key
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Ethereum-compatible signature verification
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono ml-11">
                    Public Key: {address}
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <h5 className="font-medium text-slate-900 dark:text-white">
                        Authentication
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Proves control of the DID document
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                {isCreating ? <LoadingIcon /> : <DocumentIcon />}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {isCreating ? 'Creating DID Document' : 'Review & Create'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {isCreating ? 'Generating your decentralized identity...' : 'Review your DID configuration and create the document'}
              </p>
            </div>

            {!isCreating && (
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">DID Summary</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">DID Identifier:</span>
                      <span className="font-mono text-sm text-slate-900 dark:text-white">{`did:eth:${address.slice(0, 8)}...`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Display Name:</span>
                      <span className="text-slate-900 dark:text-white">{didData.name || 'Unnamed DID'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Description:</span>
                      <span className="text-slate-900 dark:text-white max-w-48 text-right">{didData.description || 'No description'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Service Endpoint:</span>
                      <span className="text-slate-900 dark:text-white">{didData.serviceEndpoint || 'Default endpoint'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Verification Method:</span>
                      <span className="text-slate-900 dark:text-white">Secp256k1</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      {!isCreating && (
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover-lift transition-all duration-200"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleCreateDID}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover-lift transition-all duration-200"
            >
              Create DID Document
            </button>
          )}
        </div>
      )}
    </div>
  );
}