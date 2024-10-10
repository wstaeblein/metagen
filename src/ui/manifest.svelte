<script>
    // @ts-nocheck
    import { lang, supportedLangs } from '../stores.js';

    export let data = [];
</script>


<section>
    <h2>{$lang.ui.manifest}</h2>
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

                {:else if meta.type == 'objlist'}
                <div class="itemtitle">{$lang.metas.tags[meta.id]}</div>
                    <select bind:value={meta.value}>
                        {#each $lang.metas[meta.list] as item}
                            <option value="{item.val}">{item.name}</option>
                        {/each}
                    </select>

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


</style>