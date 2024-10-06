<script>
    import { onMount } from 'svelte';
    import { langCode, lang, supportedLangs } from './stores.js';
	import Metas from './ui/metas.svelte';
	import Bots from './ui/bots.svelte';
	import Social from './ui/social.svelte';
	import Images from './ui/images.svelte';
	import Google from './ui/google.svelte';
    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github.css';
    import xml from 'highlight.js/lib/languages/xml';

    hljs.registerLanguage('xml', xml);

    // https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=pt-br
    let menuOpt = 0;
    let respCode = '';

    let websoft = ['Dreamweaver', 'EditPlus', 'Frontpage', 'Ghost', 'Joomla', 'WordPress'];
    let charsets = ['utf-8','big5','euc-kr','iso-8859-1','iso-8859-2','iso-8859-3','iso-8859-4','iso-8859-5','iso-8859-6','iso-8859-7','iso-8859-8','koi8-r','shift-jis','x-euc','windows-1250','windows-1251','windows-1252','windows-1253','windows-1254','windows-1255','windows-1256','windows-1257','windows-1258','windows-874']
    let mimes = ['image/jpeg', 'image/png', 'image/apng', 'image/gif', 'image/webp', 'image/bmp', 'image/heic', 'image/heif'];

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
            { id: 'amwac',  tag: 'meta',  name: 'apple-mobile-web-app-capable', attr: 'content', value: false, type: 'bool', def: 'yes', half: true },
            { id: 'nocac',  tag: 'meta',  httpequiv: 'Pragma', attr: 'content', value: false, type: 'bool', def: 'no-cache', half: true },
            { id: 'spc1',   type: 'spacer' },
            { id: 'title',  tag: 'title', value: '', type: 'text' },
            { id: 'desc',   tag: 'meta',  name: 'description', attr: 'content', value: '', type: 'longtext' },
            { id: 'keys',   tag: 'meta',  name: 'keywords', attr: 'content', value: '', type: 'wordlist' },
            { id: 'author', tag: 'meta',  name: 'author', attr: 'content', value: '', type: 'text', half: true },
            { id: 'gener',  tag: 'meta',   name: 'generator', attr: 'content', value: '', type: 'text', datalist: websoft, half: true },
            { id: 'copy',   tag: 'meta',  name: 'copyright', attr: 'content', value: '', type: 'text', auto: true, fill: true },
            { id: 'thclr',  tag: 'meta',  name: 'theme-color', attr: 'content', value: '', type: 'color', auto: true },
            { id: 'canon',  tag: 'link',  rel: 'canonical', attr: 'href', value: '', type: 'text' },
            { id: 'lang',   tag: 'meta',  httpequiv: 'content-language', attr: 'content', value: '', type: 'dbllist', list: 'langlist', auto: true },
            { id: 'chars',  tag: 'meta',  httpequiv: 'Content-Type', attr: 'content', value: 'utf-8', type: 'list', list: charsets, template: 'text/html; charset=$$$', auto: true },
            { id: 'refr',   tag: 'meta',  httpequiv: 'refresh', attr: 'content', value: '', type: 'txtnum' },
            { id: 'wasbs',   tag: 'meta',  name: 'apple-mobile-web-app-status-bar-style', attr: 'content', value: '', type: 'objlist', list: 'applestylelist', auto: true },
            { id: 'rate',    tag: 'meta',  name: 'rating', attr: 'content', value: '', type: 'objlist', list: 'ratelist', auto: true }

            
        ],
        bots: [
            { id: 'robots',        tag: 'meta', name: 'robots',         attr: 'content', value: '', type: 'multi', list: structuredClone(botlist) },
            { id: 'googlebot',     tag: 'meta', name: 'googlebot',      attr: 'content', value: '', type: 'multi', list: structuredClone(botlist) },
            { id: 'googlebotnews', tag: 'meta', name: 'googlebot-news', attr: 'content', value: '', type: 'multi', list: structuredClone(botlist) },
            { id: 'bingbot',       tag: 'meta', name: 'bingbot',        attr: 'content', value: '', type: 'multi', list: bingbotlist },
        ],
        social: [
            { 
                name: 'Open Graph (Facebook)',
                items: [
                    { id: 'title', prop: 'og:title', value: '' },
                    { id: 'desc', prop: 'og:description', value: '', type: 'longtext' },
                    { id: 'url', prop: 'og:url', value: '' },
                    { id: 'image', prop: 'og:image', value: '' },
                    { id: 'imaget', prop: 'og:image:type', value: '', type: 'list', list: mimes, half: true  },
                    { id: 'imagealt', prop: 'og:image:alt', value: '', half: true  },
                    { id: 'imagew', prop: 'og:image:width', value: '', type: 'int', auto: true },
                    { id: 'imageh', prop: 'og:image:height', value: '', type: 'int' , auto: true},
                    { id: 'type', prop: 'og:type', value: '', type: 'list', list: [], auto: true },
                    { id: 'locale', prop: 'og:locale', value: '', half: true },
                    { id: 'fbappid', prop: 'fb:app_id', value: '', half: true }
                ]
            }, {
                name: 'Twitter Cards',
                items: [
                    { id: 'title', prop: 'twitter:title', value: '' },
                    { id: 'desc', prop: 'twitter:description', value: '', type: 'longtext' },
                    { id: 'image', prop: 'twitter:image', value: '' },
                    { id: 'url', prop: 'twitter:url', value: '' },
                    { id: 'type', prop: 'twitter:card', value: '', half: true },
                    { id: 'twtsite', prop: 'twitter:site', value: '', half: true },

                ]
            }
        ],
        images: [

        ],
        google: [
            { id: 'gglver', tag: 'meta',  name: 'google-site-verification', attr: 'content', value: '', type: 'text' },
        ]

    }
    let debounceProcess = debounce(process, 500);
    $: debounceProcess(cats);

    onMount(() => {

    })

// https://rockcontent.com/ferramentas/gerador-de-metatags/
// https://webcode.tools/open-graph-generator/book
// https://www.ciawebsites.com.br/ferramentas-de-seo/gerador-de-meta-tags/
// https://easyretro.io/tools/meta-tag-generator/



    function process(dataObj) {
        let html = '';
        let hasSkeleton = dataObj.metas.find(m => m.id == 'html')?.value;
        let lang = dataObj.metas.find(m => m.id == 'lang')?.value;
        let indent = hasSkeleton ? '\t\t' : '';
        let metatags = '';
        let bottags = '';
                                
        if (lang.val) { lang = lang.val; } 

        console.log(dataObj.bots)

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
                                let tagAttr = meta.name ? 'name' : 'http-equiv';
                                let tagAttrCtt = meta.name || meta.httpequiv;
                                metatags += indent + '<' + meta.tag + ' ' + tagAttr + '="' + tagAttrCtt + '" ' + meta.attr + '="' + meta.def + '" />\n';
                            }
                        }
                    }
                    break;

                case 'dbllist':
                    if (meta.id == 'lang') {
                        let cult = meta.value2;
                        value = lang + (cult ? '-' + cult : '');                         
                    }

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
        })

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

        let finalContent = metatags + indent + bottags;

        respCode = hljs.highlight(html ? html.replace('$$$', finalContent) : finalContent, {language: 'xml'}).value;
    }

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
</script>


<main>
    <header>
        <nav>
            <div>

            </div>
            <img src="/public/img/logo.png" alt="logo" />
        </nav>
    </header>
    
    <article>
        <nav class="bkg">
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <ul class="menu">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <li class:sel={menuOpt == 0} on:click={() => menuOpt = 0}>Home</li>
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li class:sel={menuOpt == 1} on:click={() => menuOpt = 1}>Meta Tags</li>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li class:sel={menuOpt == 2} on:click={() => menuOpt = 2}>Bots</li>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li class:sel={menuOpt == 3} on:click={() => menuOpt = 3}>Social</li>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li class:sel={menuOpt == 4} on:click={() => menuOpt = 4}>Ícones & Imagens</li>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li class:sel={menuOpt == 5} on:click={() => menuOpt = 5}>Google</li>
                
            </ul>
        </nav>
        <section >
            <div class="bkg2">
                {#if menuOpt == 0}
                <div class="home">
                    <h3>Gerador de Metatags</h3>
                    <h5>Gere mais tráfego criando as meta tags corretamente com este app gratuito e completo</h5>
                    <br>

                    <div  style="columns: 600px auto; column-gap: 30px; text-align: justify; column-fill: balance;">
                        <p>Os meta tags são uma ferramenta essencial no universo da Otimização para Mecanismos de Busca (SEO) e têm um impacto significativo na visibilidade online das páginas web. Embora muitas pessoas não estejam cientes da sua importância, os meta tags desempenham um papel crucial ao ajudar os mecanismos de busca a indexarem corretamente as páginas web.</p>

                        <p>Os meta tags são etiquetas adicionais em HTML (Hypertext Markup Language) que fornecem informações detalhadas sobre uma página, como título, descrição e palavras-chave. Essas tags são "metadados" ou dados que não visuais para o usuário final, mas que são fundamentais para os mecanismos de busca.</p>

                    </div>
                </div>
                    
                
                {:else if menuOpt == 1}
                    <Metas bind:data={cats.metas}></Metas>

                {:else if menuOpt == 2}
                    <Bots bind:data={cats.bots}></Bots>

                {:else if menuOpt == 3}
                    <Social bind:data={cats.social}></Social>

                {:else if menuOpt == 4}
                    <Images bind:data={cats.images}></Images>

                {:else if menuOpt == 5}
                    <Google bind:data={cats.google}></Google>


                {/if}

            </div>

            {#if menuOpt > 0}
                <div class="code bkg2">
                    <h2>{$lang.ui.result}</h2>
                    
                        <div>
                            <pre><code>{@html respCode}</code></pre> 
                        </div>
                    
                </div>
            {/if}
        </section>

    </article>
</main>



<style>
    code {
        white-space: pre-wrap;
    }
    .home {
        padding: 20px;
    }

    h3 {
        margin: 0;
        color: var(--base);
        text-transform: uppercase;
    }

    h5 {
        margin: 0;
        font-size: 16px;
        color: var(--base);
    }

    ul.menu {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 0;
    }

    ul.menu > li {
        padding: 5px 15px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    ul.menu > li:hover, ul.menu > li.sel {
        background-color: var(--hilite);
        color: var(--base);
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
        overflow: hidden;
    }

    main {
        padding: 64px 0 0;
        width: 100%;
        height: 100%;
    }

    header {
        padding: 10px;
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

    header > nav > img {
        height: 44px;
    }


    .code {
        font-family: monospace;
    }

    .code pre {
        tab-size: 4;
        margin: 0;
    }

    .code h2 {
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
    }

}

@media (max-width: 800px) {
    article > section {
        flex-direction: column;
    }
    article > section > div {
        width: 100%;
    }
}
</style>
