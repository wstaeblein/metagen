import { writable, readable } from 'svelte/store';
import langs from './langs.json';

let supLangs = [];

export let langCode = writable((localStorage.getItem('language') || (navigator.language || 'pt')).split('-').shift());

export let lang = writable({});

langCode.subscribe((value) => { console.log('LANGCODE: ', value)
    lang.set(langs[value.toLowerCase()]);
    supLangs = Object.keys(langs).map(key => ({ id: key, name: langs[key].name }));
});

export let supportedLangs = readable([], function start(set) {
    set(supLangs);
});

export let help = writable(false);