// index.js
import en from './en.json'
import fr from './fr.json'

export const languages = {
  en: en,
  fr: fr,
}

// TO DO: create util js file with all utils functions like the ones below
const containsKey = (obj, key ) => Object.keys(obj).includes(key);

const getCookie = function(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

// TO DO: use VueCookie
var navigatorLang = navigator.language.substring(0, 2),
    savedLang = getCookie('language');

export const defaultLocale = savedLang ? savedLang : containsKey(languages, navigatorLang) ? navigatorLang : 'en';

