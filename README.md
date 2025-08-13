# 🔐 DID Frontend - Decentralized Identity Management

A modern, enterprise-grade decentralized identity (DID) management system built with Next.js 15, React 19, and cutting-edge Web3 technologies.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/did-frontend)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)

## ✨ Features

### 🚀 **Core Functionality**
- ✅ **MetaMask Integration** - Real wallet connection with fallback demo mode
- ✅ **W3C DID Compliant** - Full specification compliance for interoperability
- ✅ **Multi-Chain Support** - Ethereum Mainnet & Sepolia testnet
- ✅ **Real-time DID Generation** - Instant document creation with cryptographic proofs

### 🎨 **Modern UI/UX**
- ✅ **Premium Design System** - Glass morphism, gradients, and micro-interactions
- ✅ **Dark/Light Mode** - Seamless theme switching with system preference detection
- ✅ **Mobile-First** - Responsive design optimized for all devices
- ✅ **Progressive Disclosure** - Intuitive step-by-step user journey

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 + React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Blockchain** | MetaMask, Web3 Provider API |
| **Deployment** | Vercel + GitHub Actions |

## 📋 Pré-requisitos

- Node.js 18+ 
- NPM ou Yarn
- Carteira Ethereum (MetaMask, WalletConnect, etc.)

## 🔧 Configuração e Instalação

1. **Instale as dependências:**
```bash
npm install
```

2. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` e adicione seu Project ID do WalletConnect:
```env
NEXT_PUBLIC_PROJECT_ID=seu_project_id_aqui
```

3. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse a aplicação:**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Como Usar

1. **Conectar Carteira:**
   - Clique no botão "Connect Wallet"
   - Selecione sua carteira preferida
   - Autorize a conexão

2. **Criar DID:**
   - Com a carteira conectada, clique em "Create DID Document"
   - Assine a mensagem na sua carteira
   - Seu documento DID será gerado e exibido

## 📁 Estrutura do Projeto

```
did-frontend/
├── app/
│   ├── components/
│   │   ├── ConnectWallet.tsx    # Componente de conexão da carteira
│   │   └── DIDManager.tsx       # Gerenciador de DID
│   ├── globals.css              # Estilos globais
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página inicial
│   └── providers.tsx            # Provedores de contexto
├── public/                      # Arquivos públicos
├── .env.example                 # Exemplo de variáveis de ambiente
└── README.md                    # Documentação
```

## 📦 Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Executa o servidor de produção
- `npm run lint` - Executa verificação de código

## 🛠️ Status do Projeto

✅ **Concluído** - O projeto está funcional e pronto para uso!
