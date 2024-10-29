<script>
    import Maniftext from './maniftext.svelte';
    import Maniflist from './maniflist.svelte';
    import Manifobject from './manifobject.svelte';
    import Manifmulti from './manifmulti.svelte';
    import Manifbool from './manifbool.svelte';
    import Manifobjarray from './manifobjarray.svelte';
    import { lang, supportedLangs, help } from '../stores.js';

    export let obj = [];

    $: obj.val = Object.assign({}, ...obj.default.filter(d => d.sel).map(d => ({ [d.label]: d.val }))); 

/*     function addIconItem(action) {
        let newItem = structuredClone(obj.default);

        obj.actions.forEach(oa => {
            let defFn = (i) => i;
            let newVal = '';
            let newFn = oa.mutate || defFn;

            switch(oa.type) {
                case 'text':
                    newVal = newFn(oa.val, obj.actions);
                    break;
            }
        });
    } */


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

    function toggle() {
        obj.sel = !obj.sel;
    }
</script>

{#if obj}
    <li class="ind1" class:disabled={!obj.req && !obj.sel}>
        <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span on:click={toggle}>
                <i class="{setIcon(obj, 'ok')}"></i>
            </span>
            {#if $help}<a href="https://developer.mozilla.org/en-US/docs/Web/Manifest/{obj.label}" target="_blank"><i class="icon-help-circle"></i></a>{/if}
            <div class="prop"><span on:click={toggle}>"{obj.label}":</span> <span class="delim">&lbrace;</span>{#if !obj.sel}<span class="delim">&rbrace;</span>{/if}</div>
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

                                {:else if item.type == 'bool'}
                                    <Manifbool bind:obj={item}></Manifbool>        

                                {:else if item.type == 'object'}
                                    <Manifobject bind:obj={item}></Manifobject>        

                                {:else if item.type == 'objarray'}
                                    <Manifobjarray bind:obj={item}></Manifobjarray>                                         
                                    
                                {/if}
                            {/each}
          
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