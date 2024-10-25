<script>
    import { lang, supportedLangs } from '../stores.js';

    import Maniftext from './maniftext.svelte';
    import Maniflist from './maniflist.svelte';
    import Manifcolor from './manifcolor.svelte';
    import Manificons from './manificons.svelte';
    import Manifmulti from './manifmulti.svelte';
    import Manifobjarray from './manifobjarray.svelte';
    import Manifshortcuts from './manifshortcuts.svelte';
    import Manifbool from './manifbool.svelte';
    import Manifobject from './manifobject.svelte';


    let catsList = ['books', 'business', 'education', 'entertainment', 'finance', 'fitness', 'food', 'games', 'government', 'health', 'kids', 'lifestyle', 'magazines', 'medical', 'music', 'navigation', 'news', 'personalization', 'photo', 'politics', 'productivity', 'security', 'shopping', 'social', 'sports', 'travel', 'utilities', 'weather'];

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

    let share_targets_params_files = [
        { label: 'name', val: '', type: 'text' },
        { label: 'accept', val: [], type: 'multi' },
    ]

    let share_targets_params = [
        { label: 'title', val: '', type: 'text' },
        { label: 'text', val: '', type: 'text' },
        { label: 'url', val: '', type: 'text' },
        { label: 'files', val: [], type: 'objarray', default: share_targets_params_files },
    ]

    let share_targets = [
        { label: 'action', val: '', type: 'text', req: true },
        { label: 'enctype', val: '', type: 'text' },
        { label: 'method', val: '', type: 'list', list: ['GET', 'POST'] },
        { label: 'params', val: {}, type: 'object', default: share_targets_params }
    ]

    let manif = [
        { label: 'short_name', val: '', type: 'text', req: true },
        { label: 'name', val: '', type: 'text', req: true },
        { label: 'id', val: '', type: 'text', req: true },
        { label: 'description', val: '', type: 'text' },
        { label: 'categories', val: [], type: 'multi', list: catsList },        
        { label: 'orientation', val: '', type: 'list', list: ['any', 'natural', 'portrait', 'portrait-primary', 'portrait-secondary', 'landscape', 'landscape-primary', 'landscape-secondary'] },
        { label: 'icons', val: [], type: 'icons' },
        { label: 'shortcuts', val: [], type: 'shortcuts' },
        { label: 'start_url', val: '', type: 'text' },
        { label: 'display', val: '', type: 'list', list: ['fullscreen', 'standalone', 'minimal-ui', 'browser'] },
        { label: 'display_override', val: [], type: 'multi', list: ['fullscreen', 'standalone', 'minimal-ui', 'browser'] },
        { label: 'theme_color', val: '', type: 'color' },
        { label: 'background_color', val: '', type: 'color' },
        { label: 'start_url', val: '', type: 'text' },
        { label: 'scope', val: '', type: 'text' },
        { label: 'serviceworker', val: {}, type: 'object' },
        { label: 'screenshots', val: [], type: 'objarray', default: screenShot },
        { label: 'prefer_related_applications', val: null, type: 'bool' },
        { label: 'related_applications', val: [], type: 'objarray', default: relApps },
        { label: 'protocol_handlers', val: [], type: 'objarray', default: protHandlers },
        { label: 'launch_handler', val: {}, type: 'object', default: launchHandlers, transform: launchHandlerTransf },
        { label: 'share_target', val: {}, type: 'object', default: share_targets },
    ];

</script>

<section>
    <h2>{$lang.ui.manifest}</h2>
    <ul>
        <li class="delim">&lbrace;</li>
        <li class="cmds">
            <span class="icon-check-circle"></span>
            <span class="icon-circle"></span>
            <span class="icon-refresh-ccw"></span>
        </li>
        {#each manif as man}
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

            {:else if man.type == 'shortcuts'}
                <Manifshortcuts bind:obj={man}></Manifshortcuts>

            {:else if man.type == 'bool'}
                <Manifbool bind:obj={man}></Manifbool>                

            {:else if man.type == 'object'}
                <Manifobject bind:obj={man}></Manifobject>        

            {:else if man.type == 'objarray'}
                <Manifobjarray bind:obj={man}></Manifobjarray>                
            {/if}
        {/each}

        <li class="delim">&rbrace; </li>
    </ul>



</section>

<style>
    section {
        padding: 0;
    }

    ul {
        font-family: var(--mono);
        padding: 20px;
        position: relative;
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



    .delim {
        color: maroon
    }

    .prop {
        color: #005cc5;;
    }

    .val {
        color: #032f62;
    }

    .ind1 {
        margin-left: 30px;
    }

    .ind2 {
        margin-left: 60px;
    }

    h2 {
        background: var(--bars);
        padding: 5px 15px;
    }
</style>