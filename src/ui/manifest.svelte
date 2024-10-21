<script>
    // @ts-nocheck
    import { lang, supportedLangs } from '../stores.js';

    export let data = [];

    let sizes = [
                    { size: 16, sel: false }, { size: 24, sel: false }, { size: 32, sel: false }, { size: 48, sel: false }, 
                    { size: 64, sel: false }, { size: 96, sel: false }, { size: 128, sel: false }, {size: 192, sel: false },
                    { size: 256, sel: false }, { size: 512, sel: false }, { size: 1024, sel: false }, {size: 2048, sel: false }
                ];

    $: console.log('MANIFEST: ', data )


    function multiList(list, mc) {
        let index = list.indexOf(mc);
        if (index == -1) {
            list.push(mc);
        } else {
            list.splice(index, 1);
        }
        data = data;
    }


    function autoFill() {

    }
</script>


<section>
    <h2>{$lang.ui.manifest}</h2>

    <div class="metas">
        <nav>
            <button on:click={autoFill}>{$lang.ui.autofill}</button>
        </nav>
        {#each data as meta}
            <div class="item" class:half={meta.half} class:auto={meta.auto} class:filler={meta.fill} >
                {#if meta.type == 'spacer'}
                    <div class="spacer"></div>

                {:else if meta.type == 'bool'}
                    <label>
                        <input type="checkbox" bind:checked={meta.value} />
                        <span>{$lang.metas.tags[meta.id]}</span>
                    </label>
                
                {:else if meta.type == 'text'}
                    <div class="itemtitle">
                        <div>{$lang.metas.tags[meta.id]}</div>
                        {#if meta.max}<b>{meta.value.length}</b>{/if}
                    </div>
                    <input type="text" list="{meta.id}" bind:value={meta.value} />
                    {#if meta.max}
                        <div>
                            <meter min={0} max={meta.max[1] * 2} low={meta.max[0]} high={meta.max[1]} value={meta.value.length}></meter>
                        </div>
                    {/if}
                    {#if meta.datalist}
                    <datalist id="{meta.id}">
                        {#each meta.datalist as dl}
                            <option value="{dl}"></option>
                        {/each}
                    </datalist> 
                    {/if}

                {:else if meta.type == 'longtext'}
                    <div class="itemtitle">
                        <div>{$lang.metas.tags[meta.id]}</div>
                        {#if meta.max}<b>{meta.value.length}</b>{/if}
                    </div>
                    <textarea class="len" bind:value={meta.value}></textarea>
                    {#if meta.max}
                        <div>
                            <meter min={0} max={meta.max[1] * 2} low={meta.max[0]} high={meta.max[1]} value={meta.value.length}></meter>
                        </div>
                    {/if}

                {:else if meta.type == 'multichoice'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <div class="multichoice">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        {#each meta.list as mc}
                            <!-- svelte-ignore missing-declaration -->
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <span on:click={multiList.bind(this, meta.value, mc)} class:sel={meta.value.includes(mc)}>{mc}</span>
                        {/each}
                    </div>
                    
                {:else if meta.type == 'icons'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <div class="subtitle">{$lang.ui.definefolder}</div>
                    <div class="folder">
                        <input type="text" list="icofolders" bind:value={meta.folder} placeholder="{$lang.metas.tags.pl_folder}" />
                        <datalist id="icofolders">
                            {#each $lang.images.folderSuggestions as fs}
                                <option value="{fs}"></option>
                            {/each}
                        </datalist> 
                        <input type="text" list="icofilenames" bind:value={meta.file} placeholder="{$lang.metas.tags.pl_filename}" />
                        <datalist id="icofilenames">
                            {#each $lang.images.filesuggestions as fs}
                                <option value="{fs}"></option>
                            {/each}
                        </datalist>                         
                    </div>         
                    <div class="subtitle">{$lang.ui.choosesizes}</div>
                    <ul class="sizes">
                        <li><button class="small">{$lang.ui.all}</button></li>
                        {#each sizes as size}
                            <li class:sel={size.sel}>{size.size}</li>
                        {/each}
                    </ul>                               
                    <div class="icons">

                    </div>

                {:else if meta.type == 'list'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <select bind:value={meta.value}>
                        {#each meta.list as item}
                            <option value="{item}">{item}</option>
                        {/each}
                    </select>  

                           

                {:else if meta.type == 'color'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <div class="txtnum">
                        <input type="color" min="0" bind:value={meta.value} />
                        
                    </div>
                {/if}
            </div>

        {/each}
    </div>

</section>

<style>
    .folder {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
    }

    nav {
        margin-bottom: 20px;
    }

    .multichoice {
        display: flex;
        gap: 5PX;
        flex-wrap: wrap;
        height: auto !important;
        padding: 6px 0;
    }

    .multichoice > span {
        padding: 3px 10px 3px;
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

    .multichoice > span:hover  {
        background-color: var(--hilite);
        color: var(--base);
    }

    .multichoice > span.sel {
        background-color: var(--base);
        color: #fff;
    }

    meter {
        width: 100%;
        transform: translateY(-10px);
        height: 12px;
        border-radius: 6px;
    }

    textarea {
        height: 64px;
        resize: none;
        vertical-align: top;
    }

    .latlon {
        display: flex;
        gap: 10px;
    }

    .txtnum {
        display: flex;
        gap: 10px;
    }

    .txtnum > input:first-child {
        width: 100px;
    }

    .spacer {
        height: 0;
        width: 100%;
    }

    .keywords {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        padding: 8px 15px;
        font-size: 16px;
        border-radius: 7px;
        border: none;
        color: #3f62a3;
        width: 100%;
        outline: none;
        background-color: #fff;
    }

    .keywords.rel > b {
        position: absolute;
        left: 145px;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s ease;
        color: #777;
        transform: translateY(7px);
    }

    .keywords > input {
        padding: 2px 25px 2px 5px;
        background-color: #eee;
        width: 150px;
    }

    .keywords > span {
        border: 1px dotted #777;
        border-radius: 5px;
        padding: 2px 6px;
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .keywords > span > i {
        cursor: pointer;   
        transition: color 0.3s ease;
        color: #777;
    }

    .keywords > span > i:hover, .keywords.rel > b:hover {
        color: var(--base);
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

    .item.half {
        width: 50%;
    }

    .item.auto {
        width: auto;
    }

    .item.filler {
        flex-grow: 1;
        width: auto;
    }


    .item > label {
        display: flex;
        gap: 12px;
        align-items: center;
        font-size: 16px;
    }

    .item > label > span {
        color: var(--base);
    }



    .item:has(input[type=checkbox]):not(:last-of-type) {
        padding-bottom: 5px;
    }

    .item > div:has(meter) {
        height: 12px;
    }

    h2 {
        background: var(--bars);
        padding: 5px 15px;
    }





    ul.sizes {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    ul.sizes > li {
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

    ul.sizes > li:hover  {
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
    

    @media (max-width: 1200px) {
        .item.half {
            width: 100%;
        }
    }
</style>