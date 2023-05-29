import { IonLoading } from '@ionic/react';
import React, { useState } from 'react';

interface iProps {
  txt?: string;
}

function Loader(props: iProps) {
  const [showLoading, setShowLoading] = useState(true);
  return (
    <IonLoading
      backdropDismiss={false}
      showBackdrop={true}
      animated={true}
      spinner='bubbles'
      isOpen={showLoading}
      onDidDismiss={() => setShowLoading(false)}
      message={props.txt ? props.txt : 'Connecting to server please wait...'}
      duration={25000}
    />
  );
}

export default Loader;
