"use client"
import React, { useEffect } from 'react';
import { ModalProvider } from '@particle-network/connect-react-ui';
import { Solana, SolanaDevnet } from '@particle-network/chains';
import { solanaWallets } from '@particle-network/connect';

import '@particle-network/connect-react-ui/dist/index.css';

const PageConnectKit = ({ children }) => {

  const options = {
    projectId: "1b0f4491-a389-49bf-a531-351b2963a777",
    clientKey: "c2OxO6jcBaG5pDob4WS2veb5hSxsQHYnzcunudQ3",
    appId: "f5df37dc-2f44-4be8-943f-9d84b11e2a86",
    chains: [Solana, SolanaDevnet],
    wallets: solanaWallets(),
  
  };

  return (
    <ModalProvider 
    theme='dark'
    particleAuthSort={['email', 'phone', 'google', 'facebook']} options={options}>
      {children}
    </ModalProvider>
  );
};

export default PageConnectKit;