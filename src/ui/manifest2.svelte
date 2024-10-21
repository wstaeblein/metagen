<script>
    import { lang, supportedLangs } from '../stores.js';

    import Maniftext from './maniftext.svelte';
    import Maniflist from './maniflist.svelte';
    import Manifcolor from './manifcolor.svelte';
    import Manificons from './manificons.svelte';
    import Manifobjarray from './manifobjarray.svelte';

/*     let sizes = [
        { value: 16, sel: false }, { value: 24, sel: false }, { value: 32, sel: false }, { value: 48, sel: false }, 
        { value: 64, sel: false }, { value: 96, sel: false }, { value: 128, sel: false }, {value: 192, sel: false },
        { value: 256, sel: false }, { value: 512, sel: false }, { value: 1024, sel: false }, {value: 2048, sel: false }
    ]; */

    let catsList = ['books', 'business', 'education', 'entertainment', 'finance', 'fitness', 'food', 'games', 'government', 'health', 'kids', 'lifestyle', 'magazines', 'medical', 'music', 'navigation', 'news', 'personalization', 'photo', 'politics', 'productivity', 'security', 'shopping', 'social', 'sports', 'travel', 'utilities', 'weather'];

    let icon = [
        { label: 'src', val: '', type: 'text', sel: true, req: true },
        { label: 'sizes', val: '', type: 'text', sel: true },
        { label: 'type', val: '', type: 'text', sel: true },
        { label: 'purpose', val: '', type: 'list', list: ['any', 'monochrome', 'maskable'], sel: true },
    ];
/*     let iconActions = [
        { id: 'fldspec', val: '/icons/img-#Sx#S.png', type: 'text', field: 'src',             mutate: (i, obj) => i.replace(/#S/g, obj.size) },
        { id: 'size',    val: [],                 type: 'list', field: 'sizes', list: sizes,  mutate: (i) => i + 'x' + i }
    ] */
    let manif = [
        { label: 'short_name', val: '', type: 'text', req: true },
        { label: 'name', val: '', type: 'text', req: true },
        { label: 'id', val: '', type: 'text', req: true },
        { label: 'description', val: '', type: 'text' },        
        { label: 'categories', val: '', type: 'list', list: catsList },        
        { label: 'orientation', val: '', type: 'list', list: ['any', 'natural', 'portrait', 'portrait-primary', 'portrait-secondary', 'landscape', 'landscape-primary', 'landscape-secondary'] },
        { label: 'icons', val: [], type: 'icons', default: icon },
        { label: 'start_url', val: '', type: 'text' },
        { label: 'display', val: '', type: 'list', list: ['fullscreen', 'standalone', 'minimal-ui', 'browser'] },
        { label: 'theme_color', val: '', type: 'color' },
        { label: 'background_color', val: '', type: 'color' },
        { label: 'start_url', val: '', type: 'text' },
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