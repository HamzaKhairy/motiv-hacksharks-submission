import { isPlatform } from "@ionic/react";

export const domain = "dev-i0baieof8okbn3p7.us.auth0.com";
export const clientId = "KMFcm00wZpAE19knspyOB1esvxtRheyL";
const appId = "io.ionic.starter";

// Use `auth0Domain` in string interpolation below so that it doesn't
// get replaced by the quickstart auto-packager
const auth0Domain = domain;
const iosOrAndroid = isPlatform('hybrid');

export const callbackUri = iosOrAndroid
? `${appId}://${auth0Domain}/capacitor/${appId}/callback`
  : `${window.location.origin}`;
  
  
  
  // 'http://localhost:8100';


  // `${appId}://${auth0Domain}/capacitor/${appId}/callback`
  // ? 'io.ionic.starter://dev-i0baieof8okbn3p7.us.auth0.com/capacitor/io.ionic.starter/callback'
