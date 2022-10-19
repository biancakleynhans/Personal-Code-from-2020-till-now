const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
};

const showHideByIdWithCss = (bool: boolean, id: string, cssName: string) => {
  const b = !bool;
  const element = document.getElementById(id);
  if (!element) return false;
  // add hidden class
  if (!b) element.classList.add(cssName);
  // remove hidden class
  else element.classList.remove(cssName);
};

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return false;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const lowerCaseWord = (string: string) => {
  return string.toLowerCase();
};

const extractNumberFromString = (value: string) => {
  const matches = value.match(/(\d+)/);
  return matches ? matches[0] : 0;
};

const replaceString = (str: string, replaceValue: string, newValue: string) => {
  return str.replace(replaceValue, newValue);
};

const handleScroll = (offSetScrollValue: any, element: any) => {
  if (!element) return false;

  const offset = element.scrollY;

  if (offset >= offSetScrollValue) {
    return true;
  }

  return false;
};

const reOrderArray = function (arr: any[], from: number, to: number) {
  // Delete the item from it's current position
  let item = arr?.splice(from, 1);

  // Move the item to its new position
  arr?.splice(to, 0, item[0]);

  return arr;
};

const getBaseURL = (url: string) => url.replace(/[?#].*$/, '');

const isAbsoluteURL = (str: string) => /^[a-z][a-z0-9+.-]*:/.test(str);

const getLinkPrefix = (hostname: string) => {
  let prefix = '';

  switch (hostname) {
    case 'next-portal-dev.mwebaws.co.za':
      prefix = 'https://dev.mwebaws.co.za';
      break;
    case 'next-portal-prod.mweb.co.za':
      prefix = 'http://www.mweb.co.za';
      break;
    default:
      prefix = '';
  }

  return prefix;
};

const getFallBackCampaignName = (campaignCode: string, campaignName: string) => {
  if (campaignCode?.includes('LTE') && campaignCode?.includes('ROUTER') && campaignName === '') return 'Sim + Router purchase';
  else if (campaignCode?.includes('LTE') && campaignCode?.includes('SIMONLY') && campaignName === '') return 'Sim card only';
  else return campaignName;
};

const logToDevConsole = (message: string, bgColor: string | null = null, textColor: string | null = null) => {
  if (process.env.NODE_ENV === 'development') {
    for (const msg of message) {
      if (bgColor || textColor) {
        const arrStyles = [];
        if (bgColor) {
          arrStyles.push(`background-color: ${bgColor}`);
        }
        if (textColor) {
          arrStyles.push(`color: ${textColor}`);
        }
        const styleString = arrStyles.join(';');

        if (typeof msg !== 'object') {
          console.log(`%c${msg}`, styleString);
        } else {
          console.log(msg);
        }
      } else {
        console.log(msg);
      }
    }
  }
};

export const Helpers = {
  isMobileDevice: isMobileDevice,
  showHideByIdWithCss: showHideByIdWithCss,
  scrollTo: scrollTo,
  capitalizeFirstLetter: capitalizeFirstLetter,
  lowerCaseWord: lowerCaseWord,
  replaceString: replaceString,
  handleScroll: handleScroll,
  extractNumberFromString: extractNumberFromString,
  reOrderArray: reOrderArray,
  getLinkPrefix: getLinkPrefix,
  getBaseURL: getBaseURL,
  isAbsoluteURL: isAbsoluteURL,
  getFallBackCampaignName: getFallBackCampaignName,
  logToDevConsole: logToDevConsole,
};
