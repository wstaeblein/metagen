<script>
    // @ts-nocheck
        import { lang, supportedLangs } from '../stores.js';
    	import Accordion from './accordion.svelte';

        export let data = [];
        export let metas = [];
    
        let wordLists = {};
        let fbOpen = true;
        let twOpen = true;
    
/*         $: if (Object.keys(wordLists) == 0) {
            data.og.forEach(m => {
                if (m.type == 'wordlist') { wordLists[m.id] = { list: [], newVal: '' }; }
            });
        } */
    
    
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



        function autoFill() {
            let ogTitle = getSocial('og', 'title');
            let ogDesc = getSocial('og', 'desc');
            let ogURL = getSocial('og', 'url');

            let tcTitle = getSocial('tc', 'title');
            let tcDesc = getSocial('tc', 'desc');
            let tcURL = getSocial('tc', 'url');

            let title = getMeta('title').value;
            let desc = getMeta('desc').value; 
            let url = getMeta('canon').value; 

            ogTitle.value = tcTitle.value = title;
            ogDesc.value  = tcDesc.value  = desc;
            ogURL.value   = tcURL.value   = url;

            data = data;
        }

        function getMeta(id) {
            return metas.find(m => m.id == id);
        }

        function getSocial(socid, id) {
            let social;
            if (socid == 'og') { 
                social = data[data[0].id == 'og' ? 0 : 1];
            } else { 
                social = data[data[1].id == 'tc' ? 1 : 0];
            }
            console.log(social)
            return social.items.find(s => s.id == id);
        }
    </script>
    
    <section>
        <h2>{$lang.ui.mtgen}</h2>
        <div class="metas">
            <nav>
                <button on:click={autoFill}>{$lang.ui.autofill}</button>
            </nav>
            {#each data as social}
                <Accordion title="{social.name}" bind:open={social.open}>
                    <div slot="details">
                        {#each social.items as meta}

                            <div class="item" class:half={meta.half} class:auto={meta.auto} class:filler={meta.fill}>
               
                                {#if meta.type == 'longtext'}
                                    <div class="itemtitle">
                                        <div>{$lang.metas.tags[meta.id]}</div>
                                        {#if meta.max}<b>{meta.value.length}</b>{/if}
                                    </div>     
                                    <textarea class="len" rows="3" bind:value={meta.value}></textarea>
                                    {#if meta.max}
                                        <div>
                                            <meter min={0} max={meta.max[1] * 2} low={meta.max[0]} high={meta.max[1]} value={meta.value.length}></meter>
                                        </div>
                                    {/if}

                                {:else if meta.type == 'list'}
                                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                                    <select bind:value={meta.value}>
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
                                        <input type="number" min="0" bind:value={meta.value} />
                                        <input type="text" bind:value={meta.value2} />
                                    </div>

                                {:else if meta.type == 'int'}
                                    <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                                    <input type="number" style="width: 150px" list="{meta.id}" bind:value={meta.value} />
            

                                {:else if meta.type == 'btn'}
                                    <div>
                                        <button on:click={meta.action}>{$lang.metas.tags[meta.id]}</button>
                                    </div>
                                {:else }
                                    <div class="itemtitle">
                                        <div>{$lang.metas.tags[meta.id]}</div>
                                        {#if meta.max}<b>{meta.value.length}</b>{/if}
                                    </div>                                    
                                    <input type="text" list="{meta.id}" bind:value={meta.value} on:blur={meta.action || null} />
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
                                {/if}
                            </div>
                
                        {/each}
                    </div>
                </Accordion>
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

        nav {
            margin-bottom: 20px;
        }

        .half select {
            width: 100%;
        }

        textarea {
            height: 64px;
            resize: none;
            vertical-align: top;
        }

        .txtnum {
            display: flex;
            gap: 10px;
        }
    
        .txtnum > input:first-child {
            width: 100px;
        }
    

        
        section {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 0;
        }
        section > div  {
            overflow: auto;
            height: auto;
            display: flex;
            flex-wrap: wrap;
            padding: 20px 5px 20px 20px;
        }

        :global(section > div div.details > div) {
            height: auto;
            display: flex;
            flex-wrap: wrap;            
        }
    
        .item {
            padding: 15px 10px 15px 0;
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

        /*   TARGET ONLY FIREFOX   */
        @media all and (min--moz-device-pixel-ratio:0) and (min-resolution: 3e1dpcm) {
            meter {
                transform: translateY(3px);
                height: 6px;
                border-radius: 6px;
                vertical-align: top;
            }
        }

    </style>