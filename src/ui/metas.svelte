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
    <h2>Meta Tags Generator</h2>
    <div>
        {#each data as meta}
            <div class="item" class:half={meta.half} class:auto={meta.auto}>
                {#if meta.type == 'spacer'}
                    <div class="spacer"></div>

                {:else if meta.type == 'bool'}
                    <label>
                        <input type="checkbox" bind:checked={meta.value} />
                        <span>{$lang.metas.tags[meta.id]}</span>
                    </label>
                
                {:else if meta.type == 'text'}
                    <div>{$lang.metas.tags[meta.id]}</div>
                    <input type="text" list="{meta.id}" bind:value={meta.value} />
                    {#if meta.datalist}
                    <datalist id="{meta.id}">
                        {#each meta.datalist as dl}
                            <option value="{dl}"></option>
                        {/each}
                    </datalist> 
                    {/if}

                {:else if meta.type == 'longtext'}
                    <div>{$lang.metas.tags[meta.id]}</div>
                    <textarea class="len" cols="3" bind:value={meta.value}></textarea>

                {:else if meta.type == 'wordlist'}
                    <div>{$lang.metas.tags[meta.id]}</div>
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

                {:else if meta.type == 'list'}
                    <div>{$lang.metas.tags[meta.id]}</div>
                    <select bind:value={meta.value}>
                        {#each meta.list as item}
                            <option value="{item}">{item}</option>
                        {/each}
                    </select>  

                {:else if meta.type == 'dbllist'}
                    <div>{$lang.metas.tags[meta.id]}</div>
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
                    <div>{$lang.metas.tags[meta.id]}</div>
                    <div class="txtnum">
                        <input type="number" min="0" bind:value={meta.value} />
                        <input type="text" bind:value={meta.value2} />
                    </div>

                {/if}
            </div>

        {/each}
    </div>
</section>


<style>
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
        transform: translateY(2px);
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


    .item > label {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .item > label > span {
        color: var(--base);
    }

    .item > div:first-child {
        color: var(--base);
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        padding-bottom: 2px;
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