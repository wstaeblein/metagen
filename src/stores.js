import { writable, readable } from 'svelte/store';
import langs from './langs.json';

let supLangs = [];

export let langCode = writable((localStorage.getItem('language') || (navigator.language || 'pt')).split('-').shift());

export let lang = writable(langs[langCode]);

langCode.subscribe((value) => { console.log('LANGCODE: ', value)
    let newLang = value.toLowerCase();
    lang.set(langs[newLang]);
    supLangs = Object.keys(langs).map(key => ({ id: key, name: langs[key].name }));
    localStorage.setItem('language', newLang);
});

export let supportedLangs = readable([], function start(set) {
    set(supLangs);
});

export let help = writable(false);