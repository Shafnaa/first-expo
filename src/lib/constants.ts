export const APP_NAME = 'MyApp';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'This is a sample app description.';

export const APP_AUTHOR = 'Your Name';
export const APP_AUTHOR_URL = 'https://yourwebsite.com';

export const BACKEND_HOST = process.env.BACKEND_HOST || '192.168.123.106';
export const BACKEND_PORT = process.env.BACKEND_PORT || 8080;
export const BACKEND_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}`;

export const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(240 5.9% 10%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground
  },
  dark: {
    background: 'hsl(240 10% 3.9%)', // background
    border: 'hsl(240 3.7% 15.9%)', // border
    card: 'hsl(240 10% 3.9%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(0 0% 98%)', // primary
    text: 'hsl(0 0% 98%)', // foreground
  },
};
