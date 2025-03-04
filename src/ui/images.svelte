<script>
    // @ts-nocheck
    
    import { lang, supportedLangs } from '../stores.js';



    export let data = [];

    let fileSpec = { folder: '', file: '' };
    let splashSpec = { folder: '', file: '' };
    let noSize = null;

/*     $: if (noSize != null) { setAppleIcons(); } */


    $: console.log(data)
    
    // Set a clicked size label
    function setSize(sz, which) {
        sz.selected = !sz.selected;

        if (which == 's') {
            $lang.images.splashsizes = $lang.images.splashsizes;
            setAppleIcons('s');
        } else {
            $lang.images.applesizes = $lang.images.applesizes;
            setAppleIcons();
        }
    }

    function setAppleIcons(which) {

        let appIconPref = 'apple_';
        let appSplashPref = 'splash_';
        let otherIcons = data.filter(i => i.id.substr(0, 6) != appIconPref && i.id.substr(0, 7) != appSplashPref );
        let appleIcons = [];
        let splashImgs = [];
        let noSplash = !splashSpec.folder || !splashSpec.file.includes('#S');
        let noIcon = !fileSpec.folder || !fileSpec.file.includes('#S');

        // Validate
        if (which == 's') {
            // Splash images
            if (noSplash || !$lang.images.splashsizes.some(as => as.selected)) { 
                data = data.filter(i => i.id.substr(0, 7) != appSplashPref );
                return; 
            }
        } else {
            // Icons
            if (noIcon || (!$lang.images.applesizes.some(as => as.selected) && noSize == null)) { 
                data = data.filter(i => i.id.substr(0, 6) != appIconPref );
                return; 
            }
        }
        
        // Prepare paths
        let fullPath = fileSpec.folder + (fileSpec.folder.slice(-1) != '/' ? '/' : '') + fileSpec.file;
        let fullSplashPath = splashSpec.folder + (splashSpec.folder.slice(-1) != '/' ? '/' : '') + splashSpec.file;

        let isPreComp = fileSpec.file.includes('#P');
        let rel = 'apple-touch-icon' + (isPreComp ? '-precomposed' : '');
        let tag = 'link', attr = 'href', type = 'text';

        if (noSize) {
            let value = fullPath.replace('#Sx#S', '').replace('#S', '').replace('#S', '');
            value = repLast(value, '-x-', '');
            value = repLast(value,'--', '');
            value = repLast(value,'-', '').replace('#P', '-precomposed');
            appleIcons.push({ id: appIconPref + 'nosize', tag, rel, attr, value, type, size: 0, label: $lang.metas.tags.nosize });
        }

        // Create icon tags
        if (!noIcon) {
            $lang.images.applesizes.forEach(as => { 
                let id = appIconPref + ('00'+ as.size).slice(-4); console.log(id)
                let value = fullPath.replace('#S', as.size).replace('#S', as.size).replace('#P', 'precomposed');

                if (as.selected) {
                    appleIcons.push({ id, tag, rel, attr, value, type, size: as.size + 'x' + as.size, label: as.size + 'px - ' + as.lbl });
                }
            });
        }

        // Create splash image tags
        if (!noSplash) {
            $lang.images.splashsizes.forEach(sss => { 
                let id = appSplashPref + ('000'+ sss.size).slice(-9); console.log(sss)
                let value = fullSplashPath.replace('#S', sss.size);

                if (sss.selected) {
                    splashImgs.push({ id, tag, rel: 'apple-touch-startup-image' , attr, value, type,  label: sss.size + ' - ' + sss.lbl, media: sss.media });
                }
            });
        }


        //data = otherIcons.concat(appleIcons);
        console.log(appleIcons)
        otherIcons.splice(otherIcons.length - 1, 0, ...appleIcons); console.log(otherIcons)
        data = otherIcons.concat(splashImgs);
    }


    function setAll() {
        $lang.images.applesizes.forEach(as => as.selected = true);
        $lang.images.applesizes = $lang.images.applesizes;
        setAppleIcons();
    }

    function setNoSize() { 
        noSize = noSize ? false : true; 
        setAppleIcons();
    }


    // Replace last
    function repLast (str, pattern, replacement) {
        const match = typeof pattern === 'string' ? pattern : (str.match(new RegExp(pattern.source, 'g')) || []).slice(-1)[0];
        if (!match) { return str; }
        
        const last = str.lastIndexOf(match);
        return last !== -1 ? `${str.slice(0, last)}${replacement}${str.slice(last + match.length)}` : str;
    }


    function autoFill() {
        splashSpec.folder = fileSpec.folder;
    }
</script>


<section>
    <h2>{$lang.ui.imagegen}</h2>
        <div class="metas">
            {#each data as meta}
                <div class="item" class:half={meta.half} class:auto={meta.auto} class:filler={meta.fill}>
                    {#if meta.type == 'spacer'}
                        <div class="spacer"></div>
    
                    {:else if meta.type == 'bool'}
                        <label>
                            <input type="checkbox" bind:checked={meta.value} />
                            <span>{$lang.metas.tags[meta.id]}</span>
                        </label>
                    
                    {:else if meta.type == 'text'}
                        <div class="itemtitle">{meta.label || $lang.metas.tags[meta.id]}</div>
                        <input type="text" list="{meta.id}" bind:value={meta.value} />


                    {:else if meta.type == 'icons'}
                        <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>   
                        <div class="subtitle">{$lang.ui.definefolder}</div>
                        <div class="folder">
                            <input type="text" list="folders" bind:value={fileSpec.folder} on:input={setAppleIcons} placeholder="{$lang.metas.tags.pl_folder}" />
                            <datalist id="folders">
                                {#each $lang.images.folderSuggestions as fs}
                                    <option value="{fs}"></option>
                                {/each}
                            </datalist> 
                            <input type="text" list="filenames" bind:value={fileSpec.file} on:input={setAppleIcons} placeholder="{$lang.metas.tags.pl_filename}" />
                            <datalist id="filenames">
                                {#each $lang.images.filesuggestions as fs}
                                    <option value="{fs}"></option>
                                {/each}
                            </datalist>                         
                        </div>

                        <div class="subtitle">{$lang.ui.choosesizes}</div>
                        <ul class="sizes">
                            <li><button class="small" on:click={setAll}>{$lang.ui.all}</button></li>
                            {#each $lang.images.applesizes as size}
                                <li class:sel={size.selected} on:click={setSize.bind(this, size)} aria-label="{size.lbl}" data-balloon-pos="up" data-balloon-length="medium">{size.size}</li>
                            {/each}
                        </ul>
                 
                        <div class="nosize">
                            <label>
                                <input type="checkbox" on:change={setNoSize} />
                                <span>{$lang.ui.nosize}</span>
                            </label>                                   
                        </div>

                    {:else if meta.type == 'splash'}
                        <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>   
                        <div class="subtitle between">
                            <span>{$lang.ui.definefolder}</span>
                            <button class="small" on:click={autoFill}>{$lang.ui.autofill}</button>
                        </div>
                        <div class="folder">
                            <input type="text" list="splfolders" bind:value={splashSpec.folder} on:input={setAppleIcons.bind(this, 's')} placeholder="{$lang.metas.tags.pl_folder}" />
                            <datalist id="splfolders">
                                {#each $lang.images.splashfoldersuggestions as fs}
                                    <option value="{fs}"></option>
                                {/each}
                            </datalist> 
                            <input type="text" list="splfilenames" bind:value={splashSpec.file} on:input={setAppleIcons.bind(this, 's')} placeholder="{$lang.metas.tags.pl_filename}" />
                            <datalist id="splfilenames">
                                {#each $lang.images.splashfilesuggestions as fs}
                                    <option value="{fs}"></option>
                                {/each}
                            </datalist>                         
                        </div>

                        <div class="subtitle">{$lang.ui.choosesizes}</div>
                        <ul class="sizes splash">
                            <li><button class="small" on:click={setAll.bind(this, 's')}>{$lang.ui.all}</button></li>
                            {#each $lang.images.splashsizes as size}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                <li class:sel={size.selected} on:click={setSize.bind(this, size, 's')} aria-label="{size.lbl}" data-balloon-pos="up" data-balloon-length="medium">{size.size}</li>
                            {/each}
                        </ul>
                 
                    {/if}                    
                </div>
    
            {/each}
        </div>
    </section>
    
    
<style>
    .nosize {
        margin: 10px 0 20px;
    }
    .folder {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
    }

    .folder > input:first-child {
        width: 50%;
        flex-grow: 1;
    }
    .folder > input:last-child {
        width: 50%;
        flex-grow: 1;
    }
   
    ul.sizes {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    ul.sizes > li:first-child {
        transform: translateY(-1px);
    }

    ul.sizes > li:not(:first-child) {
        width: 60px;
        padding: 2px 0 1px;
        background-color: #ccc;
        color: green;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
        border-radius: 5px;
        transition: all 0.3s ease;
        cursor: pointer;
        user-select: none;
    }

    ul.sizes > li:not(:first-child):hover  {
        background-color: var(--hilite);
        color: var(--base);
    }

    ul.sizes > li.sel {
        background-color: var(--base);
        color: #fff;
    }

    ul.sizes.splash > li {
        width: 100px;
    }

    ul.sizes.splash > li:first-child {
        width: auto;
    }

    .spacer {
        height: 0;
        width: 100%;
    }


    
    section {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0;
    }
    section > div {
        overflow: auto;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        padding: 20px 5px 20px 20px;
    }

    .item {
        padding: 0 10px 30px 0;
        width: 100%;
    }

    .half {
        width: 50%;
    }

    .item.auto {
        width: auto;
    }

    .item.filler {
        flex-grow: 1;
    }


     label {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    label > span {
        color: var(--base);
        font-size: smaller;
        font-weight: bold;
    }



    .item:has(input[type=checkbox]):not(:last-of-type) {
        padding-bottom: 5px;
    }

    h2 {
        background: var(--bars);
        padding: 5px 15px;
    }




    @media (max-width: 1200px) {
        .item.half {
            width: 100%;
        }
    }
</style>
