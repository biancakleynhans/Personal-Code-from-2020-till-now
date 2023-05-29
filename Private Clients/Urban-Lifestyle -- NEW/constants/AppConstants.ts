export const FooterText = 'Reserved & Designed by Coffee Coder';
export const TEMP_LINK = 'https://docs.google.com/spreadsheets/d/1t2oBrtnultp1LQeNJ9fRLgXuyw074c3BFJJbINRH9IY/edit?usp=sharing';

// public folder-> assets-> save comapny logo there add filename before .png
export const COMPANY_LOGO = '/assets/fileType.png';

export const PLACEHOLDER =
  'https://firebasestorage.googleapis.com/v0/b/black-wolfs-moon.appspot.com/o/product-image-placeholder.jpg?alt=media&token=2a9f7739-0dcf-4b98-97af-063002bb22bb';

export const waLink = '#';
export const fbLink = '#';
export const ghLink = '#';

export const TOTAL_RATING_COUNT = 5;
export const DELIVERY_COST = 100.0;

export const VALID_COUPONS = [
  { name: 'SALE22', discType: '%', amount: 22.0 },
  { name: 'HALLOWEEN', discType: 'free delivery', amount: DELIVERY_COST },
  { name: 'HELLO SUMMER', discType: 'ZAR', amount: 50.0 },
];

export enum UserTypes {
  'user' = 'user',
  'admin' = 'admin',
  'super' = 'super',
}

export enum Progress {
  'pending' = 'pending',
  'started' = 'started',
  'in progress' = 'in progress',
  'completed' = 'completed',
  'overdue' = 'overdue',
}

export enum Complete {
  'upload file' = 'upload file',
  'check box' = 'check box',
  'text response' = 'text response',
}
