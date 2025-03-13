import { writable, readable } from 'svelte/store';
import langs from './langs.json';

let availableLangs = Object.keys(langs);
let supLangs = [];
let firstTime = true;

let navLang = navigator.language.split('-').shift();
let nativeLang = availableLangs.includes(navLang) ? navLang : 'en';
let localLang = localStorage.getItem('language') || nativeLang;

export let langCode = writable(localLang); 
export let lang = writable(langs[langCode]);

langCode.subscribe((value) => { 
    let newLang = value.toLowerCase();
    lang.set(langs[newLang]);
    supLangs = Object.keys(langs).map(key => ({ id: key, name: langs[key].name }));
    if (firstTime) {
        firstTime = false;
    } else {
        localStorage.setItem('language', newLang);
    }
});

export let supportedLangs = readable([], function start(set) {
    set(supLangs);
});

export let help = writable(false);