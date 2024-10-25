<script>
    import Maniftext from './maniftext.svelte';
    import Maniflist from './maniflist.svelte';
    import Manifobject from './manifobject.svelte';
    import Manifmulti from './manifmulti.svelte';
    import Manifobjarray from './manifobjarray.svelte';
    import { lang, supportedLangs } from '../stores.js';

    export let obj = [];

    function addIconItem(action) {
        let newItem = structuredClone(obj.default);

        obj.actions.forEach(oa => {
            let defFn = (i) => i;
            let newVal = '';
            let newFn = oa.mutate || defFn;

            switch(oa.type) {
                case 'text':
                    newVal = newFn(oa.val, obj.actions);
                    
            }
        });
    }

    
    $: console.log('OBJECT: ', obj)

    function setIcon(obj, extra) {
        let cls = '';
        if (obj.req) {
            cls = 'icon-star req';
        } else {
            cls = 'icon' + (obj.sel ? '-check' : '') + '-circle';
        }
        if (extra) { cls += ' ' + extra; }
        return cls.trim();
    }    

    function toggleListActionItem(action, item) {
        let index = action.val.indexOf(item.value);

        if (index == -1) {
            action.val.push(item.value);
            item.sel = true;
        } else {
            action.val.splice(index, 1);
            item.sel = false;
        }
        obj = obj;
    }

    function addAllListActionItems(action) {
        action.list.forEach(l => l.sel = true);
        obj = obj;
    }

    function addItem() {
        obj.val.push(structuredClone(obj.default));
        obj = obj;
        console.log(obj.val)
    }

    function delItem(ind) {
        obj.val.splice(ind, 1);
        obj = obj;
    }
</script>

{#if obj}
    <li class="ind1" class:disabled={!obj.req && !obj.sel}>
        <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span on:click={() => obj.sel = !obj.sel}>
                <i class="{setIcon(obj, 'ok')}"></i>
            </span>
            <div class="prop">"{obj.label}": <span class="delim">&lbrace;</span></div>
        </div>

        {#if obj.sel}
            <div class="val ind1">
                <ol>
                    {#if obj.default && obj.default.length}
                        {#each obj.default as item, index}
                                {#if item.type == 'text'}
                                    <Maniftext bind:obj={item}></Maniftext>

                                {:else if item.type == 'list'}
                                    <Maniflist bind:obj={item}></Maniflist>

                                {:else if item.type == 'multi'}
                                    <Manifmulti bind:obj={item}></Manifmulti>

                                {:else if item.type == 'object'}
                                    <Manifobject bind:obj={item}></Manifobject>        

                                {:else if item.type == 'objarray'}
                                    <Manifobjarray bind:obj={item}></Manifobjarray>                                         
                                    
                                {/if}
                            {/each}
                         

                            <div>
<!--                                 {#if index == obj.val.length - 1}
                                    <span class="delim">&rbrace;</span>
                                {:else}
                                    <span class="delim">&rbrace;, &lbrace;&nbsp;<span on:click={delItem.bind(this, index)}><i class="icon-trash-2"></i></span></span>
                                {/if} -->
                            </div>                            
          
                    {/if}
                </ol>
            </div>
        
            <div class="delim">&rbrace;</div>
        {/if}
    </li>
{/if}

<style>
    ol {
        padding: 0;
        display: flex;
        gap: 8px;
        flex-direction: column;
        width: 100%;
    }

    ol, li > div:first-child {
        display: flex;
        gap: 8px;
    }

    ol > li {
        padding: 0 5px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    li > div:first-child > span:first-child {
        cursor: pointer;
    }



    ol > li.sel {
        background-color: var(--base);
        color: #fff;
    }

    li {
        display: flex;
        gap: 5px;
        margin-bottom: 6px;
        flex-direction: column;
    }


</style>