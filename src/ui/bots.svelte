<script>
    // @ts-nocheck
    
    import { lang, supportedLangs } from '../stores.js';
	import Accordion from './accordion.svelte';


    export let data = [];


</script>

<section>
    <h2>{$lang.ui.botgen}</h2>
    <div>
        {#each data as bot}
            <Accordion title="{bot.id}" bind:open={bot.open}>
                <ul slot="details" id="{bot.id}">
                    {#each bot.list as item}
                       <li class="item">
                            {#if item.type == 'bool'}
                                <label>
                                    <input type="checkbox" bind:checked={item.value} />
                                    <span>{$lang.bots.tags[item.id]}</span>
                                </label>
                            {:else if item.type == 'int'}
                                <div class="itemtitle">{$lang.bots.tags[item.id.replace(/-/g, '_')]}</div>
                                <div class="byside">
                                    <input type="number" min="{item.min || 0}" bind:value={item.value} />
                                    {#if item.xtras}
                                        <div class="byside">
                                            {#each item.xtras as xtra}
                                                <button class:checked={item.value == xtra.val} on:click={() => item.value = xtra.val}>{$lang.bots.tags['xtra_' + xtra.id]}</button>
                                            {/each}
                                        </div>
                                    {/if}                                    
                                </div>
                            {:else if item.type == 'choice'}
                                <div class="itemtitle">{$lang.bots.tags[item.id.replace(/-/g, '_')]}</div>
                                <div class="byside">
                                    <select bind:value={item.value}>
                                        <option value=""></option>
                                        {#each item.list as ch}
                                            <option value="{ch}">{$lang.bots.tags['ch_' + ch]}</option>
                                        {/each}                                        
                                    </select>

                                </div>

                            {:else if item.type == 'datetime'}        
                                <div class="itemtitle">{$lang.bots.tags[item.id.replace(/-/g, '_')]}</div>
                                <input type="datetime-local" bind:value={item.value} min="{new Date().toISOString().slice(0, 11) + '00:00'}" />
                            {/if}
                        </li>
                    {/each}
                    
                </ul>
            </Accordion>            
        {/each}

    </div>
    
</section>


<style>
    .byside {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
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

    h2 {
        background: var(--bars);
        padding: 5px 15px;
    }

    .item {
        margin-bottom: 15px;
    }


    .item > label {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .item > label > span {
        color: var(--base);
    }    

    input[type=number] {
        max-width: 100px;
    }
</style>