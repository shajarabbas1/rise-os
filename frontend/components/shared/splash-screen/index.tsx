import React from 'react';

import { CSSProperties } from 'react';

// ToDo : add a logo of NDIS
import InstaLogo from '../../../public/images/logo.png';
import Image from 'next/image';

const splashScreenStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  animation: 'myAnim 6s ease',
};

const splashScreenKeyframes = `
  @keyframes myAnim {
    0% {
      opacity: 1;
    }
      50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0.75;
    }
    100% {
      opacity: 0; 
    }
  }
`;
const SplashScreen = () => (
  <>
    <style>{splashScreenKeyframes}</style>
    <div style={splashScreenStyle}>
      <Image src={InstaLogo} alt="splash-logo" width={250} height={250} />
    </div>
  </>
);

export default SplashScreen;
