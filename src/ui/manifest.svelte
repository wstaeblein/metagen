<script>
    import { getContext } from 'svelte';
    import { lang, supportedLangs, help } from '../stores.js';

    import Maniftext from './maniftext.svelte';
    import Maniflist from './maniflist.svelte';
    import Manifcolor from './manifcolor.svelte';
    import Manificons from './manificons.svelte';
    import Manifmulti from './manifmulti.svelte';
    import Manifobjarray from './manifobjarray.svelte';
    import Manifbool from './manifbool.svelte';
    import Manifobject from './manifobject.svelte';

    export let data = [];
    let exp = true;
    let catsList = ['books', 'business', 'education', 'entertainment', 'finance', 'fitness', 'food', 'games', 'government', 'health', 'kids', 'lifestyle', 'magazines', 'medical', 'music', 'navigation', 'news', 'personalization', 'photo', 'politics', 'productivity', 'security', 'shopping', 'social', 'sports', 'travel', 'utilities', 'weather'];
    let copyStatus = 0;

    $: data = manif;

    const copy2Clipboard = getContext('copy');
    
    let screenShot = [
        { label: 'src', val: '', type: 'text', req: true },
        { label: 'sizes', val: '', type: 'text', list: ['1024x768', '1280 x 720', '1366 x 768', '1440 x 900', '1536 x 864', '1600 x 900', '1920 x 1080'] },
        { label: 'type', val: '', type: 'list', list: ['image/png', 'image/jpeg', 'image/gif', 'image/', 'image/bmp', 'image/webp', 'image/svg+xml'] },
        { label: 'form_factor', val: '', type: 'list', list: ['narrow', 'wide'] },
        { label: 'label', val: '', type: 'text' }
    ];

    let relApps = [
        { label: 'url', val: '', type: 'text', req: true },
        { label: 'platform', val: '', type: 'list', list: ['chrome_web_store', 'play', 'chromeos_play', 'webapp', 'windows', 'f-droid', 'amazon'] },
        { label: 'id', val: '', type: 'text' }
    ];

    let protHandlers = [
        { label: 'protocol', val: '', type: 'text', req: true },
        { label: 'url', val: '', type: 'text', req: true },

    ];

    let launchHandlers = [
        { label: 'client_mode', val: [], type: 'multi', list: ['auto', 'focus-existing', 'navigate-existing', 'navigate-new'], req: true },
    ];

    let launchHandlerTransf = (v) => {
        switch(v.length) {
            case 0: return '';
            case 1: return v[0];
            default: return v;
        }
    }

    let shortcuts = [
        { label: 'name', val: '', type: 'text', sel: true, req: true },
        { label: 'url', val: '', type: 'text', sel: true, req: true },
        { label: 'short_name', val: '', type: 'text', sel: false },
        { label: 'description', val: '', type: 'text', sel: false },
        { label: 'icons', val: [], type: 'icons', sel: false },
    ];

    let share_targets_params_files = [
        { label: 'name', val: '', type: 'text' },
        { label: 'accept', val: [], type: 'multi' },
    ];

    let share_targets_params = [
        { label: 'title', val: '', type: 'text' },
        { label: 'text', val: '', type: 'text' },
        { label: 'url', val: '', type: 'text' },
        { label: 'files', val: [], type: 'objarray', default: share_targets_params_files },
    ];

    let share_targets = [
        { label: 'action', val: '', type: 'text', req: true },
        { label: 'enctype', val: '', type: 'text' },
        { label: 'method', val: '', type: 'list', list: ['GET', 'POST'] },
        { label: 'params', val: {}, type: 'object', default: share_targets_params }
    ];

    let ServWorker = [
        { label: 'scope', val: '', type: 'text', req: true },
        { label: 'src', val: '', type: 'text', req: true },
        { label: 'use_cache', val: null, type: 'bool' },
    ]

    let manif = [
        { label: 'short_name', val: '', type: 'text', req: true },
        { label: 'name', val: '', type: 'text', req: true },
        { label: 'id', val: '', type: 'text', req: true },
        { label: 'description', val: '', type: 'text' },
        { label: 'categories', val: [], type: 'multi', list: catsList },        
        { label: 'orientation', val: '', type: 'list', list: ['any', 'natural', 'portrait', 'portrait-primary', 'portrait-secondary', 'landscape', 'landscape-primary', 'landscape-secondary'] },
        { label: 'icons', val: [], type: 'icons' },
        { label: 'shortcuts', val: [], type: 'objarray', default: shortcuts },
        { label: 'start_url', val: '', type: 'text' },
        { label: 'display', val: '', type: 'list', list: ['fullscreen', 'standalone', 'minimal-ui', 'browser'] },
        { label: 'display_override', val: [], type: 'multi', list: ['fullscreen', 'standalone', 'minimal-ui', 'browser'], experimental: true },
        { label: 'theme_color', val: '', type: 'color' },
        { label: 'background_color', val: '', type: 'color' },
        { label: 'start_url', val: '', type: 'text' },
        { label: 'scope', val: '', type: 'text' },
        { label: 'serviceworker', val: {}, type: 'object', default: ServWorker, experimental: true },
        { label: 'screenshots', val: [], type: 'objarray', default: screenShot, experimental: true },
        { label: 'prefer_related_applications', val: null, type: 'bool', experimental: true },
        { label: 'related_applications', val: [], type: 'objarray', default: relApps, experimental: true },
        { label: 'protocol_handlers', val: [], type: 'objarray', default: protHandlers, experimental: true },
        { label: 'launch_handler', val: {}, type: 'object', default: launchHandlers, transform: launchHandlerTransf, experimental: true },
        { label: 'share_target', val: {}, type: 'object', default: share_targets, experimental: true },
    ];

    function copyProxy() {
        copyStatus = 1;
        copy2Clipboard();
        setTimeout(() => copyStatus = 0, 1500);
    }
</script>

<section class="manifest">
    <h2>
        <span>{$lang.ui.manifest}</span>
        <span>
            <button on:click={() => exp = !exp} class:checked={exp} aria-label="{$lang.tips.exper}" data-balloon-pos="down-right" data-balloon-length="medium">
                <i class="icon-experimental"></i>
            </button>
            <button on:click={() => $help = !$help} class:checked={$help} aria-label="{$lang.tips.help}" data-balloon-pos="down-right" data-balloon-length="medium">
                <i class="icon-help-circle aux"></i>
            </button>
        
<!--             {#if copyStatus == 0}
                <button on:click={copyProxy} aria-label="{$lang.tips.copyman}" data-balloon-pos="down-right" data-balloon-length="medium">
                    <i class="icon-copy"></i>
                </button>   
            {:else if copyStatus == 1}
                <span class="msg copyok"><i class="icon-thumbs-up"></i></span>
            {:else}
                <span class="msg copyerr"><i class="icon-thumbs-down"></i></span>
            {/if}     -->         
        </span>

    </h2>
    <ul>
        <li class="delim">&lbrace;</li>
        {#each manif as man}
            {#if exp || !man.experimental} 
                {#if man.type == 'text'}
                    <Maniftext bind:obj={man}></Maniftext>

                {:else if man.type == 'list'}
                    <Maniflist bind:obj={man}></Maniflist>

                {:else if man.type == 'color'}
                    <Manifcolor bind:obj={man}></Manifcolor>

                {:else if man.type == 'icons'}
                    <Manificons bind:obj={man}></Manificons>

                {:else if man.type == 'multi'}
                    <Manifmulti bind:obj={man}></Manifmulti>

                {:else if man.type == 'bool'}
                    <Manifbool bind:obj={man}></Manifbool>                

                {:else if man.type == 'object'}
                    <Manifobject bind:obj={man}></Manifobject>        

                {:else if man.type == 'objarray'}
                    <Manifobjarray bind:obj={man}></Manifobjarray>                
                {/if}
            {/if}
        {/each}

        <li class="delim">&rbrace; </li>
    </ul>



</section>

<style>
    .aux {
        transform: translateX(2px);
        display: inline-block;
    }

    section {
        padding: 0;
        height: 100%;
    }

    ul {
        font-family: var(--mono);
        padding: 20px;
        position: relative;
        height: calc(100% - 50px);
        overflow: scroll;
    }

    ul > li {
        display: flex;
        gap: 10px;
        margin-bottom: 6px;
    }

    ul > li.cmds {
        position: absolute;
        right: 20px;
        top: 10px;
        color: var(--base);
    }

/*     ul > li.cmds > span {
        cursor: pointer;
        filter: grayscale(1);
        opacity: 0.6;
        transition: all 0.3s ease;

        padding: 4px 8px 3px;

        border-radius: 50%;
    
    }

    ul > li.cmds > span:hover {
        background-color: var(--hilite);
        opacity: 1;
        filter: none;
    }

    ul > li.cmds > span.sel {
        opacity: 1;
        filter: none;
        background: var(--base);
        color: #fff;
    } */

    .delim {
        color: maroon
    }

/*     .prop {
        color: #005cc5;

    }

    .val {
        color: #032f62;
    }

    .ind1 {
        margin-left: 30px;
    }

    .ind2 {
        margin-left: 60px;
    } */

    h2 {
        background: var(--bars);
        padding: 5px 15px;
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: center;
        font-size: 100%;
    }

    h2 > span:first-child {
        font-size: 27px;
    }

    h2 > span:last-child {
        display: flex;
        gap: 5px;
    }
</style>