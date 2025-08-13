'use client';

import { useState } from 'react';

export function DIDManager() {
  // Mock wallet connection for demo purposes
  const address = '0x742d35Cc6635C0532925a3b8D1C3A8c134d1B2B7';
  const isConnected = true;
  const [didDocument, setDidDocument] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  const createDID = async () => {
    if (!address) return;
    
    setIsCreating(true);
    try {
      const message = `Creating DID for address: ${address}`;
      // Mock signing process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const did = {
        '@context': ['https://www.w3.org/ns/did/v1'],
        id: `did:eth:${address}`,
        controller: address,
        verificationMethod: [{
          id: `did:eth:${address}#key-1`,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: `did:eth:${address}`,
          publicKeyHex: address
        }],
        authentication: [`did:eth:${address}#key-1`],
        service: [{
          id: `did:eth:${address}#service-1`,
          type: 'LinkedDomains',
          serviceEndpoint: 'https://example.com'
        }]
      };

      setDidDocument(JSON.stringify(did, null, 2));
    } catch (error) {
      console.error('Error creating DID:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Please connect your wallet to manage your DID</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">DID Management</h2>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">Connected Address:</p>
          <p className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">{address}</p>
        </div>

        <button
          onClick={createDID}
          disabled={isCreating}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {isCreating ? 'Creating DID...' : 'Create DID Document'}
        </button>

        {didDocument && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">DID Document:</h3>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm overflow-x-auto">
              {didDocument}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}