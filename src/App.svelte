<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import { fade } from "svelte/transition";

    // @ts-ignore
    import { langCode, lang, supportedLangs } from './stores.js';
	import Metas from './ui/metas.svelte';
	import Bots from './ui/bots.svelte';
	import Social from './ui/social.svelte';
	import Images from './ui/images.svelte';
	import Manifest from './ui/manifest.svelte';
	import Home from './ui/home.svelte';
	import Ctxmenu from './ui/ctxmenu.svelte';
    import { Router, Link, Route, navigate } from 'svelte-routing';


    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github.css';
    // @ts-ignore
    import xml from 'highlight.js/lib/languages/xml';

    hljs.registerLanguage('xml', xml);

    export let url = "";

    // https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=pt-br
    let menuOpt = 0;
    let menuOpen = false;
    let respCode = '';
    let respCodeText = '';
    let respManifestText = '';
    let cbCopyStatus = 0;
    let cbCopyStatus2 = 0;
    let infoDlg = null;
    let currLang = 'pt';
    let availableLangs = [
        { label: 'Português', value: 'pt', img: 'img/flags/pt.png' },
        { label: 'English', value: 'en', img: 'img/flags/en.png' },
        { label: 'Español', value: 'es', img: 'img/flags/es.png' },
        { label: 'Français', value: 'fr', img: 'img/flags/fr.png' },
        { label: 'Deutsch', value: 'de', img: 'img/flags/de.png' }
    ]

    let websoft = ['Dreamweaver', 'EditPlus', 'Frontpage', 'Ghost', 'Joomla', 'WordPress'];
    let charsets = ['utf-8','big5','euc-kr','iso-8859-1','iso-8859-2','iso-8859-3','iso-8859-4','iso-8859-5','iso-8859-6','iso-8859-7','iso-8859-8','koi8-r','shift-jis','x-euc','windows-1250','windows-1251','windows-1252','windows-1253','windows-1254','windows-1255','windows-1256','windows-1257','windows-1258','windows-874']
    let mimes = ['', 'image/jpeg', 'image/png', 'image/apng', 'image/gif', 'image/webp', 'image/bmp', 'image/heic', 'image/heif'];
    let ogTypes = ['article', 'book', 'profile', 'website'];
    let tcTypes = ['summary', 'summary_large_image', 'app']

    let botlist = [
        { id: 'noindex', type: 'bool' },
        { id: 'nofollow', type: 'bool' }, 
        { id: 'none', type: 'bool' },
        { id: 'noarchive', type: 'bool' }, 
        { id: 'notranslate', type: 'bool' }, 
        { id: 'noimageindex', type: 'bool' }, 
        { id: 'indexifembedded', type: 'bool' }, 
        { id: 'nosnippet', type: 'bool' }, 
        { id: 'max-snippet', type: 'int', xtras: [{ id: 'nosnippet', val: 0 }, { id: 'auto', val: -1 }], min: -1 }, 
        { id: 'max-video-preview',  type: 'int', xtras: [{ id: 'static', val: 0 }, { id: 'nolimit', val: -1 }], min: -1 },
        { id: 'max-image-preview',  type: 'choice', list: ['none', 'standard', 'large'] },
        { id: 'unavailable_after',  type: 'datetime' }
    ]
    let bingbotlist = [
        { id: 'noindex', type: 'bool' },
        { id: 'nocache', type: 'bool' }, 
        { id: 'noarchive', type: 'bool' }, 
        { id: 'nosnippet', type: 'bool' }, 
        { id: 'max-snippet', type: 'int', xtras: [{ id: 'nosnippet', val: 0 }, { id: 'auto', val: -1 }], min: -1  }, 
        { id: 'max-video-preview',  type: 'intx', xtras: [{ id: 'static', val: 0 }, { id: 'nolimit', val: -1 }] },
        { id: 'max-image-preview',  type: 'list', list: ['none', 'standard', 'large'] }
    ]

    let cats = {
        metas: [
            { id: 'html',   tagspec: '<!doctype html>\n<html lang="##">\n\t<head>\n$$$\n\t</head>\n\t<body>\n\n\n\t</body>\n</html>', value: false, type: 'bool', half: true },
            { id: 'view',   tagspec: '<meta name="viewport" content="width=device-width, initial-scale=1" />', value: true, type: 'bool', half: true },
            { id: 'nocac',  tag: 'meta',  httpequiv: 'Pragma', attr: 'content', value: false, type: 'bool', def: 'no-cache', half: true },
            { id: 'hhfri',  tag: 'meta',  name: 'HandheldFriendly', attr: 'content', value: false, type: 'bool', def: 'true', half: true },
            { id: 'manif',  tag: 'link',  rel: 'manifest', attr: 'href', value: false, type: 'bool', half: true, def: 'manifest.json' },
            { id: 'spc1',   type: 'spacer' },
            { id: 'title',  tag: 'title', value: '', type: 'text', max: [60, 70] },
            { id: 'desc',   tag: 'meta',  name: 'description', attr: 'content', value: '', type: 'longtext', max: [150, 160] },
            { id: 'asbt',   tag: 'meta',  name: 'abstract', attr: 'content', value: '', type: 'longtext', max: [150, 160] },
            { id: 'keys',   tag: 'meta',  name: 'keywords', attr: 'content', value: '', type: 'wordlist' },
            { id: 'author', tag: 'meta',  name: 'author', attr: 'content', value: '', type: 'text', half: true },
            { id: 'gener',  tag: 'meta',   name: 'generator', attr: 'content', value: '', type: 'text', datalist: websoft, half: true },
            { id: 'copy',   tag: 'meta',  name: 'copyright', attr: 'content', value: '', type: 'text', auto: true, fill: true },
            { id: 'thclr',  tag: 'meta',  name: 'theme-color', attr: 'content', value: '', type: 'color', auto: true },
            { id: 'canon',  tag: 'link',  rel: 'canonical', attr: 'href', value: '', type: 'text' },
            { id: 'lang',   tag: 'meta',  httpequiv: 'content-language', attr: 'content', value: '', type: 'dbllist', list: 'langlist', auto: true },
            { id: 'chars',  tag: 'meta',  httpequiv: 'Content-Type', attr: 'content', value: 'utf-8', type: 'list', list: charsets, template: 'text/html; charset=$$$', auto: true },
            { id: 'rate',   tag: 'meta',  name: 'rating', attr: 'content', value: '', type: 'objlist', list: 'ratelist', auto: true },
            { id: 'refr',   tag: 'meta',  httpequiv: 'refresh', attr: 'content', value: '', type: 'txtnum', pl: ['secs', 'url'] }
            
        ],
        bots: [
            { id: 'robots',        tag: 'meta', name: 'robots',         attr: 'content', value: '', type: 'multi', list: structuredClone(botlist), open: true },
            { id: 'googlebot',     tag: 'meta', name: 'googlebot',      attr: 'content', value: '', type: 'multi', list: structuredClone(botlist) },
            { id: 'googlebotnews', tag: 'meta', name: 'googlebot-news', attr: 'content', value: '', type: 'multi', list: structuredClone(botlist) },
            { id: 'bingbot',       tag: 'meta', name: 'bingbot',        attr: 'content', value: '', type: 'multi', list: bingbotlist },
        ],
        social: [
            { 
                id: 'og',
                name: 'Open Graph (Facebook)',
                open: true,
                items: [
                    { id: 'title', prop: 'og:title', value: '', max: [60, 70] },
                    { id: 'desc', prop: 'og:description', value: '', type: 'longtext', max: [160, 200] },
                    { id: 'url', prop: 'og:url', value: '' },
                    { id: 'image', prop: 'og:image', value: '' , action: getMime.bind(this, 'og', 'image', 'imaget') },
                    { id: 'imaget', prop: 'og:image:type', value: '', type: 'list', list: mimes, half: true  },
                    { id: 'imagealt', prop: 'og:image:alt', value: '', half: true  },
                    { id: 'imagew', prop: 'og:image:width', value: '', type: 'int', auto: true },
                    { id: 'imageh', prop: 'og:image:height', value: '', type: 'int' , auto: true},
                    { id: 'type', prop: 'og:type', value: '', type: 'text', datalist: ogTypes, auto: true },
                    { id: 'locale', prop: 'og:locale', value: '', half: true },
                    { id: 'fbappid', prop: 'fb:app_id', value: '', half: true }
                ]
            }, {
                id: 'tc',
                name: 'Twitter Cards',
                items: [
                    { id: 'autofill', type: 'btn', action: copyFromOG },
                    { id: 'title', prop: 'twitter:title', value: '' },
                    { id: 'desc', prop: 'twitter:description', value: '', type: 'longtext' },
                    { id: 'image', prop: 'twitter:image', value: '' },
                    { id: 'url', prop: 'twitter:url', value: '' },
                    { id: 'twtcreator', prop: 'twitter:creator', value: '', half: true },
                    { id: 'twtsite', prop: 'twitter:site', value: '', half: true },
                    { id: 'type', prop: 'twitter:card', value: '', type: 'list', list: tcTypes, half: true },
                ]
            }
        ],
        images: [
            { id: 'fav',  tag: 'link',  rel: 'favicon', attr: 'href', value: '', type: 'text', icontype: 'auto' },
            { id: 'mask',  tag: 'link',  rel: 'mask-icon', attr: 'href', value: '', type: 'text', icontype: 'auto' },
            { id: 'short',  tag: 'link',  rel: 'shortcut icon', attr: 'href', value: '', type: 'text', icontype: 'auto' },
            { id: 'apple',  tag: 'link',  rel: 'apple-touch-icon', attr: 'href', value: '', type: 'icons', sizes: 'applesizes' },
            { id: 'splash',  tag: 'link',  rel: 'apple-touch-startup-image', attr: 'href', value: '', type: 'splash', sizes: 'splashsizes' },

        ],
        other: [
            { id: 'mwac',  tag: 'meta',  name: 'mobile-web-app-capable', attr: 'content', value: false, type: 'bool', def: 'yes', half: true },
            { id: 'amwac',  tag: 'meta', name: 'apple-mobile-web-app-capable', attr: 'content', value: false, type: 'bool', def: 'yes', half: true },
            { id: 'fmtd1',  tag: 'meta',  name: 'format-detection', attr: 'content', value: false, type: 'bool', def: 'telephone=no', half: true },
            { id: 'fmtd2',  tag: 'meta', name: 'format-detection', attr: 'content', value: false, type: 'bool', def: 'email=no', half: true },

            { id: 'spc1',   type: 'spacer' },

            { id: 'amwat',  tag: 'meta', name: 'apple-mobile-web-app-title', attr: 'content', value: '', type: 'text', half: true },
            { id: 'wasbs',  tag: 'meta', name: 'apple-mobile-web-app-status-bar-style', attr: 'content', value: '', type: 'objlist', list: 'applestylelist', half: true },

            { id: 'appnm',  tag: 'meta', name: 'application-name', attr: 'content', value: '', type: 'text', half: true  },
            { id: 'base', tag: 'base',  attr: 'href', value: '', type: 'text', half: true  },

            { id: 'region', tag: 'meta', name: 'geo.region', attr: 'content', value: '', type: 'region', pl: 'state' },
            { id: 'place', tag: 'meta', name: 'geo.placename', attr: 'content', value: '', type: 'text', pl: 'city' },
            { id: 'posit', tag: 'meta', name: 'geo.position', attr: 'content', value: '', type: 'latlon', half: true },
            { id: 'icbm', tag: 'meta', name: 'ICBM', attr: 'content', value: '', type: 'latlon', half: true },

            
            { id: 'gglver', tag: 'meta',  name: 'google-site-verification', attr: 'content', value: '', type: 'text' },

        ],
        manifest: []

    }
    let debounceProcess = debounce(process, 300);

    // Observa a mudança de URL
    let currRoute = '';
    const observer = new MutationObserver(function(mutations) {
        if (location.href !== currRoute) { currRoute = location.pathname; }
    });
    observer.observe(document, {subtree: true, childList: true});

   // @ts-ignore
     $: debounceProcess(cats);
 


    onMount(() => {
        let ll = ''
        cats.manifest.forEach(m => { ll += '"' + m.id + '": "", \n' });
    });


// https://rockcontent.com/ferramentas/gerador-de-metatags/
// https://webcode.tools/open-graph-generator/book
// https://www.ciawebsites.com.br/ferramentas-de-seo/gerador-de-meta-tags/
// https://easyretro.io/tools/meta-tag-generator/


    function getMime(socid, id, targetid) {
        let socItem = cats.social[socid == 'og' ? 0 : 1].items;
        let imgItem = socItem.find(m => m.id == id);
        let value = imgItem?.value;
        let mime = getMimeString(value);

        if (mime) {
            let targetItem = socItem.find(m => m.id == targetid); 

            if (targetItem) { 
                targetItem.value = mime; 
                cats = cats;
            }
        }
    }

    function getMimeString(path) {
        
        if (path) {
            let ext = path.split('.').pop().trim().toLowerCase(); 
            switch (ext) {
                case 'jpg':
                case 'jpeg':
                    return 'image/jpeg';
                case 'gif':
                case 'png':
                case 'apng':
                case 'webp':
                case 'heic':
                case 'heif':
                case 'bmp':
                    return 'image/' + ext;
                case 'ico':
                    return 'image/x-icon';
            }
        }
        return '';
    }

    function copyFromOG() {
        let ogItems = finder(cats.social, 'og').items;
        let tcItems = finder(cats.social, 'tc').items;

        let tcTitle = finder(tcItems, 'title');
        if (tcTitle && !tcTitle.value) { tcTitle.value = finder(ogItems, 'title').value || ''; }

        let tcDesc = finder(tcItems, 'desc');
        if (tcDesc && !tcDesc.value) { tcDesc.value = finder(ogItems, 'desc').value || ''; }        
        
        let tcURL = finder(tcItems, 'url');
        if (tcURL && !tcURL.value) { tcURL.value = finder(ogItems, 'url').value || ''; }  
        
        let tcImg = finder(tcItems, 'image');
        if (tcImg && !tcImg.value) { tcImg.value = finder(ogItems, 'image').value || ''; }        

        cats = cats;
    }

    function finder(obj, id) {
        return obj.find(i => i.id == id);
    }


    function process(dataObj) {
        let html = '';
        let hasSkeleton = dataObj.metas.find(m => m.id == 'html')?.value;
        let lang = dataObj.metas.find(m => m.id == 'lang')?.value;
        let indent = hasSkeleton ? '\t\t' : '';
        let metatags = '';
        let bottags = '';
        let soctags = '';
        let imgtags = '';
        let othertags = '';
        let manifest = '';
                                
        if (lang.val) { lang = lang.val; } 

        // METATAGS
        dataObj.metas.forEach((meta) => {
            let value = structuredClone(meta.value);

            switch (meta.type) {
                case 'bool':
                    if (meta.id == 'html') {
                        html = value ? meta.tagspec.replace('##', lang) : '';
                    } else {
                        if (value) {
                            if (meta.tagspec) {
                                metatags += indent + meta.tagspec + '\n';
                            } else {
                                let tagAttr = meta.name ? 'name' : meta.rel ? 'rel' : 'http-equiv';
                                let tagAttrCtt = meta.name || meta.httpequiv ||  meta.rel;
                                metatags += indent + '<' + meta.tag + ' ' + tagAttr + '="' + tagAttrCtt + '" ' + meta.attr + '="' + meta.def + '" />\n';
                            }
                        }
                    }
                    break;

                case 'dbllist':
                    if (meta.id == 'lang') {
                        let cult = meta.value2;
                        value = lang + (cult ? '-' + cult : '');     
                        metatags += indent + '<' + meta.tag;       
                        metatags += ' http-equiv="' + meta.httpequiv + '" ' + meta.attr + '="' + value + '" />\n';                     
                    }
                    break;

                case 'txtnum':
                    if (value) {
                        metatags += indent + '<' + meta.tag;
                        let v2 = (meta.value2 || '').trim();
                        let v = value + (v2 ? '; ' + v2 : '');
                        metatags += ' http-equiv="' + meta.httpequiv + '" ' + meta.attr + '="' + v + '" />\n';                        
                    }
                    break;

                case 'text':
                case 'list':
                case 'color':
                case 'objlist':
                case 'wordlist':
                case 'longtext':
                    if (value) {
                        metatags += indent + '<' + meta.tag;
                        value = value.replace(/\s/g, ' ').trim();

                        if (meta.name) {
                            metatags += ' name="' + meta.name + '" ' + meta.attr + '="' + value + '" />\n';
                        } else if (meta.rel) {
                            metatags += ' rel="' + meta.rel + '" ' + meta.attr + '="' + value + '" />\n';
                        } else if (meta.httpequiv) {
                            metatags += ' http-equiv="' + meta.httpequiv + '" ' + meta.attr + '="' + value + '" />\n';
                        } else {
                            metatags += '>' + value + '</' + meta.tag + '>\n'
                        }
                    }
                    break;

            }
        });

        if (metatags) { metatags = ((hasSkeleton ? '\t\t' : '') + '<!-- Metatags -->\n') + metatags + '\n'}

        // BOT TAGS
        dataObj.bots.forEach((bot) => {
            let botVal = [];

            bot.list.forEach((ll) => {
                switch(ll.type) {
                    case 'bool': 
                        if (ll.value) { botVal.push(ll.id); }
                        break;

                    case 'int':
                        if (ll.value != null) { botVal.push(ll.id + ':' + ll.value); }
                        break;

                    case 'choice':
                    case 'datetime':
                        if (ll.value) { botVal.push(ll.id + ':' + ll.value); }
                        break;
                }
            })

            if (botVal.length) {
                bottags += indent + '<' + bot.tag;
                bottags += ' name="' + bot.name + '" ' + bot.attr + '="' + botVal.join(', ') + '" />\n';
            }
        });

        if (bottags) { bottags = '<!-- Bot Tags -->\n' + bottags + '\n' }


        // SOCIAL
        dataObj.social.forEach((social) => {
            social.items.forEach((si) => {
                if (si.value) {
                    switch (si.type) {

                        default:
                            soctags += indent + '<meta property="' + si.prop + '" content="' + si.value + '" />\n'
                    }
                }
            });
        });

        if (soctags) { soctags = '<!-- Social Tags -->\n' + soctags + '\n' }

        // IMAGES & ICONS
        dataObj.images.forEach((img) => {
            if ((img.type != 'icons' && img.type != 'splash') && img.value) {
                imgtags += indent + '<link rel="' + img.rel + '" href="' + img.value + '"';
                if (img.size) { imgtags += ' sizes="' + img.size  + '"'; }
                if (img.icontype) {
                    let icoType = getMimeString(img.value);
                    if (icoType) { imgtags += ' type="' + icoType + '"'; }
                }
                let media = img.media ? ' media="' + img.media + '"' : '';
                imgtags += media + ' />\n' 
            }
        });        

        if (imgtags) { imgtags = '<!-- Icon & Image Tags -->\n' + imgtags + '\n' }

        // OTHER
        dataObj.other.forEach((other) => {
            let value = structuredClone(other.value);

            switch (other.type) {
                case 'bool':
                    if (other.id == 'html') {
                        html = value ? other.tagspec.replace('##', lang) : '';
                    } else {
                        if (value) {
                            if (other.tagspec) {
                                othertags += indent + other.tagspec + '\n';
                            } else {
                                let tagAttr = other.name ? 'name' : 'http-equiv';
                                let tagAttrCtt = other.name || other.httpequiv;
                                othertags += indent + '<' + other.tag + ' ' + tagAttr + '="' + tagAttrCtt + '" ' + other.attr + '="' + other.def + '" />\n';
                            }
                        }
                    }
                    break;

                case 'objlist':
                case 'text':
                    if (value) {
                        othertags += indent + '<' + other.tag;
                        value = value.replace(/\s/g, ' ').trim();

                        if (other.name) {
                            othertags += ' name="' + other.name + '" ' + other.attr + '="' + value + '" />\n';
                        } else if (other.rel) {
                            othertags += ' rel="' + other.rel + '" ' + other.attr + '="' + value + '" />\n';
                        } else if (other.httpequiv) {
                            othertags += ' http-equiv="' + other.httpequiv + '" ' + other.attr + '="' + value + '" />\n';
                        } else {
                            othertags += '>' + value + '</' + other.tag + '>\n'
                        }
                    }
                    break;

                case 'latlon':
                case 'region':
                    if (value && other.value2) {
                        let sep = other.type == 'region' ? '-' : ';';
                        othertags += indent + '<' + other.tag + ' name="' + other.name + '" ' + other.attr + '="' + (value + sep + other.value2).toUpperCase() + '" />\n';
                    }
                
                }

        });

        if (othertags) { othertags = '<!-- Other Tags -->\n' + othertags + '\n' }
        
        [
            {
                "sel": true,
                "size": 16,
                "fields": [
                    {
                        "label": "src",
                        "val": "",
                        "type": "text",
                        "sel": false,
                        "req": true,
                        "downbtn": true
                    },
                    {
                        "label": "sizes",
                        "val": "16x16",
                        "type": "text",
                        "sel": true,
                        "readonly": true
                    },
                    {
                        "label": "type",
                        "val": "",
                        "type": "list",
                        "sel": false,
                        "list": [
                            "image/png",
                            "image/jpeg",
                            "image/gif",
                            "image/",
                            "image/bmp",
                            "image/webp",
                            "image/svg+xml"
                        ]
                    },
                    {
                        "label": "purpose",
                        "val": "",
                        "type": "list",
                        "list": [
                            "any",
                            "monochrome",
                            "maskable"
                        ],
                        "sel": false
                    }
                ]
            },
            {
                "sel": true,
                "size": 24,
                "fields": [
                    {
                        "label": "src",
                        "val": "",
                        "type": "text",
                        "sel": false,
                        "req": true,
                        "downbtn": true
                    },
                    {
                        "label": "sizes",
                        "val": "24x24",
                        "type": "text",
                        "sel": true,
                        "readonly": true
                    },
                    {
                        "label": "type",
                        "val": "",
                        "type": "list",
                        "sel": false,
                        "list": [
                            "image/png",
                            "image/jpeg",
                            "image/gif",
                            "image/",
                            "image/bmp",
                            "image/webp",
                            "image/svg+xml"
                        ]
                    },
                    {
                        "label": "purpose",
                        "val": "",
                        "type": "list",
                        "list": [
                            "any",
                            "monochrome",
                            "maskable"
                        ],
                        "sel": false
                    }
                ]
            }
        ]

        // MANIFEST
        let manifObj = {}, tmpIcons = []
        dataObj.manifest.forEach(man => {
            if (man.sel || man.req) {
                switch (man.type) {
                    case 'icons':
                        manifObj.icons = man.val;                break;
                    case 'object':
                        manifObj[man.label] = man.val;           break;
                    default:
                        manifObj[man.label] = extractValue(man); break;                        
                }
            }
        });
        respManifestText = JSON.stringify(manifObj, null, 4);

        let finalContent = metatags + indent + bottags + indent + soctags + indent + imgtags + indent + othertags;

        respCodeText = html ? html.replace('$$$', finalContent) : finalContent;
        respCode = hljs.highlight(respCodeText, {language: 'xml'}).value;
    }

    function extractValue(item) {
        let resp = null;
        let obj = {};

        switch (item.type) {
            case 'objarray': 
            case 'icons':
                resp = item.val;               break;
            case 'object':
                resp = extractValue(item.val); break;
            default:
                resp = item.val || '';         break;
        }
        return resp;
    }

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    function code2Clipboard() {
        navigator.clipboard.writeText(respCodeText).then(() => {
                /* clipboard successfully set */
                cbCopyStatus = 1;
                setTimeout(() => cbCopyStatus = 0, 1500);
            }, () => {
                /* clipboard write failed */
                cbCopyStatus = 2;
                setTimeout(() => cbCopyStatus = 0, 1500);
            },
        );
    }


    function manif2Clipboard() {
        navigator.clipboard.writeText(respManifestText).then(() => {
                /* clipboard successfully set */
                cbCopyStatus2 = 1;
                setTimeout(() => cbCopyStatus2 = 0, 1500);
            }, () => {
                /* clipboard write failed */
                cbCopyStatus2 = 2;
                setTimeout(() => cbCopyStatus2 = 0, 1500);
            },
        );
    }

    function toggleMenu() {
        menuOpen = !menuOpen;
    }

    // https://translate.i18next.com/
    function changeLang(evt) {
        $langCode = evt.detail.value;
        //alert(evt.detail.label)
    }
</script>


<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<main on:click={() => menuOpen = false}>
    <header>
        <nav>
            <div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <span class="hamburguer" on:click|stopPropagation={toggleMenu}><i class="icon-menu"></i></span>
                <img src="/img/logo.png" alt="logo" class="lrglogo" />
                <img src="/img/icon-128.png" alt="logo" class="smllogo" />
            </div>
            
            <div>
                <a href="https://buymeacoffee.com/wstaeblein" class="noclr" target="_blank" aria-label="{$lang.tips.coffee}" data-balloon-pos="down"><i class="icon-coffee"></i></a>
                <span on:click={() => infoDlg.showModal()} aria-label="{$lang.tips.about}" data-balloon-pos="down"><i class="icon-info"></i></span>
                <span on:click={() => location.reload()} aria-label="{$lang.tips.cls}" data-balloon-pos="down"><i class="icon-trash-2"></i></span>
                <Ctxmenu items={availableLangs} bind:sel={currLang} align="right bottom" on:menuchoice={changeLang}></Ctxmenu>
                
            </div>
        </nav>
    </header>
    
    <article>
        <Router {url}>
            <nav class="bkg" class:open={menuOpen}>
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <div class="menu">
                    <Link to="/" let:active>
                        <div class:sel={active}><i class="icon-home"></i><span>{$lang.ui.menu.home}</span></div>
                    </Link>
                    <Link to="/tags" let:active>
                        <div class:sel={active}><i class="icon-tag"></i><span>{$lang.ui.menu.meta}</span></div>
                    </Link>
                    <Link to="/bots" let:active>
                        <div class:sel={active}><i class="icon-bot"></i><span>{$lang.ui.menu.bots}</span></div>
                    </Link>
                    <Link to="/social" let:active>
                        <div class:sel={active}><i class="icon-share-2"></i><span>{$lang.ui.menu.social}</span></div>
                    </Link>
                    <Link to="/images" let:active>
                        <div class:sel={active}><i class="icon-image"></i><span>{$lang.ui.menu.icons}</span></div>
                    </Link>
                    <Link to="/other" let:active>
                        <div class:sel={active}><i class="icon-layers"></i><span>{$lang.ui.menu.other}</span></div>                        
                    </Link>
                    <Link to="/manifest" let:active>
                        <div class:sel={active}><i class="icon-file-text"></i><span>{$lang.ui.menu.manifest}</span></div>
                    </Link>
                </div>
            </nav>
            <section >
                <div class="bkg2 vert">
                    <Route path="/">
                        <Home></Home>
                    </Route>
                    <Route path="/tags">
                        <Metas bind:data={cats.metas}></Metas>
                    </Route>
                    <Route path="/bots">
                        <Bots bind:data={cats.bots}></Bots>
                    </Route>
                    <Route path="/social">
                        <Social bind:data={cats.social} metas={cats.metas}></Social>
                    </Route>
                    <Route path="/images">
                        <Images bind:data={cats.images}></Images>
                    </Route>
                    <Route path="/other">
                        <Metas bind:data={cats.other}></Metas>
                    </Route>
                    <Route path="/manifest">
<!--                         <div class="code">
                            <h2 class="between">
                                <span>{$lang.ui.manifest}</span>
                                {#if cbCopyStatus2 == 0}
                                    <button on:click={manif2Clipboard} title="{$lang.ui.copy}"><i class="icon-copy"></i></button>
                                {:else if cbCopyStatus2 == 1}
                                    <span class="msg copyok"><i class="icon-thumbs-up"></i></span>
                                {:else}
                                    <span class="msg copyerr"><i class="icon-thumbs-down"></i></span>
                                {/if}
                            </h2>                        
                        </div> -->
                        <div class="manifbody">
                            <Manifest bind:data={cats.manifest}></Manifest>
                        </div>
                    </Route>
                </div>

                {#if currRoute != '/'}
                
                    <div class="code bkg2">
                        <h2 class="between">
                            <span>{$lang.ui.result}</span>
                            {#if cbCopyStatus == 0}
                                <button on:click={code2Clipboard} title="{$lang.ui.copy}"><i class="icon-copy"></i></button>
                            {:else if cbCopyStatus == 1}
                                <span class="msg copyok"><i class="icon-thumbs-up"></i></span>
                            {:else}
                                <span class="msg copyerr"><i class="icon-thumbs-down"></i></span>
                            {/if}
                        </h2>
                        
                        <div>
                            <pre><code>{@html respCode}</code></pre> 
                        </div>

                    </div>
                {/if}
            </section>
        </Router>
    </article>

</main>

<dialog bind:this={infoDlg}>
    <h1>Teste</h1>
    <p><button on:click={infoDlg.close()}>Close</button></p>
</dialog>


<style>
    dialog {
        position: fixed;
        top: 50%;
        left: 0;
        z-index: 111;
        transform: translateY(-50%);
        box-shadow: 5px 5px 18px 2px #111;
        border: none;
        border-radius: 7px;


    }

    dialog::backdrop {
        background-color: #001021cc;

    }


    .manifbody {
        overflow-y: auto;
    }

    .vert {
        display: flex;
        flex-direction: column;
    }

    .lrglogo {
        display: block;
    }

    .smllogo {
        display: none;
    }

    .scroll {
        overflow-y: auto !important;
        overflow-x: hidden;
    }





    .hamburguer {
        display: none;
    }

    .msg {
        display: inline-block;
        font-size: 16px;
/*         width: 60px; */
        text-align: center;
        padding: 3px 10px;
        border-radius: 7px;
    }
    .copyok {
        background-color: forestgreen;
    }
    .copyerr {
        background-color: crimson;
    }

    code {
        white-space: pre-wrap;
    }


    div.menu {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 0;
    }

    div.menu div {
        padding: 5px 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        gap: 8px;
        align-items: center;
        font-weight: bold;
    }

    div.menu div:hover, div.menu div.sel {
        background-color: var(--hilite);
        color: var(--base);
    }

    :global(div.menu a) {
        color: inherit;
    }

    .bkg {
        background-color: var(--bars);
        align-self: auto;
        padding: 0;
    }

    .bkg2 {
        background-color: #88889988;
        align-self: auto;
        padding: 0;
        border-radius: 9px;
        overflow: auto;
    }



    main {
        padding: 64px 0 0;
        width: 100%;
        height: 100%;
    }

    header {
        height: 64px;
        padding: 10px 10px 0; 
        background: #fff;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 3;
    }

    article {
        display: flex;
        color: #eee;
        height: 100%;
    }

    article > nav {
        width: 200px;
        min-width: 200px;
        flex-grow: 0;
        transition: all 0.3s ease;
        z-index: 111;
    }

    article > section {
        display: flex;
        gap: 15px;
        flex-grow: 1;
        padding: 15px;
    }

    article > section > div {
        flex-grow: 1;
        width: 50%;
    }

    header > nav {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        align-items: center;
    }

    header > nav > div {
        display: flex;
        gap: 10px;
        font-size: 36px;
        color: var(--base);
        font-weight: bold;
        position: relative;
    }

    header > nav > div:last-child {
        font-size: 24px;
    }

    header > nav > div > img {
        height: 44px;
    }


    .code {
        font-family: var(--mono);
    }

    .code pre {
        tab-size: 4;
        margin: 0;
    }

    .code h2 {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        background: var(--bars);
        padding: 5px 15px;
    }

    .code > div {
        padding: 20px;
        overflow: auto;
        height: calc(100% - 50px);
        color:  #6e1809;
    }


@media (max-width: 1200px) {
    article > nav {
        position: absolute;
        left: -250px;
        height: 100%;
        transition: all 0.4s ease;
        background-color: var(--solidbars) !important;
    }

    article > nav.open {
        left: 0;
        bottom: 0;
        top: 64px;
        position: fixed;
    }

    .hamburguer {
        display: block;
    }

    .hero > img {
        min-height: 180px;
        max-height: 300px;
    }

}

@media (max-width: 800px) {

    header {
        box-shadow: 0 2px 6px 0px #b3b3b3;
    }

    article > section {
        display: block;
    }

    article > section > div {
        width: 100%;
        margin-bottom: 20px;
    }

    .code {
        font-size: smaller;
    }

    .hero {
        display: block; 
        text-align: center;
    }

    .hero > img {
        margin-bottom: 20px;
    }

    .hero > img {
        max-width: 60%;
        height: auto;
        min-height: auto;
        max-height: auto;
    }
}

@media (max-width: 480px) {
    .lrglogo {
        display: none;
    }

    .smllogo {
        display: block;
    }
}
</style>
