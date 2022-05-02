import { availableFeatures } from '@ionic/react-hooks/browser';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;


export const BROWSER_handleClose = () => {
  if (availableFeatures.close) {
    Browser.close()
  }
};

export const BROWSER_handleOpen = (urlString: string) => {
  if (availableFeatures.open) {
    Browser.open({ url: urlString});
  }
};

export const BROWSER_handlePrefetch = (prefetchUrl: string[]) => {
  if (availableFeatures.prefetch) {
    Browser.prefetch({urls: prefetchUrl})
  }
};
