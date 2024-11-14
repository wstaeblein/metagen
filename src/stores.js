import { writable, readable } from 'svelte/store';
import langs from './langs.json';

let subDomain = window.location.host.split('.').shift();
let supLangs = [];
let isSubDomain = Object.keys(langs).includes(subDomain);
let localLang = isSubDomain ? subDomain : localStorage.getItem('language') || (navigator.language || 'pt');

export let langCode = writable((localLang).split('-').shift());
export let lang = writable(langs[langCode]);

langCode.subscribe((value) => { 
    let newLang = value.toLowerCase();
    lang.set(langs[newLang]);
    supLangs = Object.keys(langs).map(key => ({ id: key, name: langs[key].name }));
    localStorage.setItem('language', newLang);
});

export let supportedLangs = readable([], function start(set) {
    set(supLangs);
});

export let help = writable(false);