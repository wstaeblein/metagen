<script>
// @ts-nocheck
    import { lang, supportedLangs } from '../stores.js';

    export let data = [];

    let wordLists = {};

    $: if (Object.keys(wordLists) == 0) {
        data.forEach(m => {
            if (m.type == 'wordlist') { wordLists[m.id] = { list: [], newVal: '' }; }
        });
    }


    function procWordlist(obj, evt) { 
        let list = wordLists[obj.id].list;
        let nw = wordLists[obj.id].newVal;

        if ((evt.key == 'Enter' || evt.type == 'click') && !list.includes(nw)) {
            list.push(nw);
            wordLists[obj.id].newVal = '';
        }
        wordLists[obj.id].list = wordLists[obj.id].list;
        obj.value = wordLists[obj.id].list.join(', ');
    }

    function delWordList(obj, index) {
        wordLists[obj.id].list.splice(index, 1);
        wordLists[obj.id].list = wordLists[obj.id].list;

        obj.value = wordLists[obj.id].list.join(', ');
    }
</script>

<section>
    <h2>{$lang.ui.mtgen}</h2>
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
                    <div class="itemtitle">
                        <div>{$lang.metas.tags[meta.id]}</div>
                        {#if meta.max}<b>{meta.value.length}</b>{/if}
                    </div>
                    <input type="text" list="{meta.id}" bind:value={meta.value} placeholder="{$lang.metas.pl[meta.pl] || ''}" />
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

                {:else if meta.type == 'wordlist'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="keywords rel">
                        <input type="text" bind:value={wordLists[meta.id].newVal} on:keydown={procWordlist.bind(this, meta) } />
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <b on:click={procWordlist.bind(this, meta)} role="button" tabindex="0">✓</b>

                        {#each wordLists[meta.id].list as kw, index}
                            <span>
                                <b>{kw}</b>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <i on:click={delWordList.bind(this, meta, index)}>✖</i>
                            </span>
                        {/each}

                    </div>
                {:else if meta.type == 'objlist'}
                <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <select bind:value={meta.value}>
                        <option value=""></option>
                        {#each $lang.metas[meta.list] as item}
                            <option value="{item.val}">{item.name}</option>
                        {/each}
                    </select>

                {:else if meta.type == 'list'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <select bind:value={meta.value}>
                        <option value=""></option>
                        {#each meta.list as item}
                            <option value="{item}">{item}</option>
                        {/each}
                    </select>  

                {:else if meta.type == 'dbllist'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <select bind:value={meta.value} on:change={() => meta.value2 = ''}>
                        {#each $lang.metas[meta.list] as item}
                            <option value="{item}">{item.name}</option>
                        {/each}
                    </select>
                    
                    {#if meta.value}
                        <select bind:value={meta.value2}>
                            {#each meta.value.vars as item}
                                <option value="{item.val}">{item.name}</option>
                            {/each}
                        </select>      
                    {/if}
                           
                {:else if meta.type == 'txtnum'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <div class="txtnum">
                        <input type="number" min="0" step="1" bind:value={meta.value} placeholder="{meta.pl ? $lang.metas.pl[meta.pl[0]] : ''}" />
                        <input type="text" bind:value={meta.value2} placeholder="{meta.pl ? $lang.metas.pl[meta.pl[1]] : ''}" />
                    </div>

                {:else if meta.type == 'color'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <div class="txtnum">
                        <input type="color" min="0" bind:value={meta.value} />
                        
                    </div>

                {:else if meta.type == 'region'}
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <div class="txtnum">
                        <select bind:value={meta.value}>
                            <option value=""></option>
                            {#each $lang.countries as ctry}
                                <option value="{ctry.id}">{ctry.val}</option>
                            {/each}
                        </select>
                        <input type="text" bind:value={meta.value2} placeholder="{$lang.metas.pl[meta.pl] || ''}" />
                        
                    </div>           
                {:else if meta.type == 'latlon'}      
                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <div class="latlon">
                        <input type="number" bind:value={meta.value} placeholder="{$lang.metas.pl.latitude}"/>
                        <input type="number" bind:value={meta.value2} placeholder="{$lang.metas.pl.longitude}" />
                    </div>
                {/if}
            </div>

        {/each}
    </div>
</section>


<style>
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




    @media (max-width: 1200px) {
        .item.half {
            width: 100%;
        }
    }
</style>