<script>
    import { lang, supportedLangs } from '../stores.js';

    import Maniftext from './maniftext.svelte';
    import Manificons from './manificons.svelte';

    export let obj = null;

    let allFlag = false;
    let sizes = [
        { value: 16, sel: false }, { value: 24, sel: false }, { value: 32, sel: false }, { value: 48, sel: false }, 
        { value: 64, sel: false }, { value: 96, sel: false }, { value: 128, sel: false }, {value: 192, sel: false },
        { value: 256, sel: false }, { value: 512, sel: false }, { value: 1024, sel: false }, {value: 2048, sel: false }
    ];
    let shortcut = [
        { label: 'name', val: '', type: 'text', sel: true, req: true },
        { label: 'url', val: '', type: 'text', sel: true, req: true },
        { label: 'short_name', val: '', type: 'text', sel: false },
        { label: 'description', val: '', type: 'text', sel: false },
        { label: 'icons', val: [], type: 'icons', sel: false },
    ];

    let selIcons = [];


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

    function toggleSize(size, val) { 
        let sizeObj = icons.find(i => i.size == size.value);

        if (sizeObj) { 
            sizeObj.sel = val == null ? !sizeObj.sel : val;
            size.sel = sizeObj.sel;
            sizes = sizes;
            obj = obj;

            selIcons = icons.filter(i => i.sel)
        }
    }

    function addDelSizes() {
        allFlag = !allFlag;
        sizes.forEach(s => toggleSize(s, allFlag));
        obj = obj;
    }

    function setEventHandler(evt) {
        if (!evt.detail.data.val) { return; }
  
        let txt = evt.detail.data.val.trim(); 
        let field = evt.detail.data.label;
        let size = evt.detail.size;
        let purpose = icons.find(i => i.size == size).fields.find(f => f.label == 'purpose').val;
        let initialType = icons.find(i => i.size == size).fields.find(f => f.label == 'type').val.split('/').pop();
        let flag = false;
        let done = false;

        let re = new RegExp(/\$\$/, 'g');
        txt = txt.replace(re, size);

        icons.forEach(icn => {
            if (icn.sel) {
                let icnObj = icn.fields.find(f => f.label == field);
                let typeObj = icn.fields.find(f => f.label == 'type');
                let purposeObj = icn.fields.find(f => f.label == 'purpose');

                let setValues = (icon) => {
                    let re2 = new RegExp(size, 'g');
                    let newText = txt.replace(re2, icon.size);
                    let newType = newText.indexOf('.') > -1 ? newText.split('.').pop().toLowerCase() : initialType; 

                    if (newType == 'jpg') { newType = 'jpeg'; }
                    if (newType) { typeObj.val = typeObj.list.find(t => t == 'image/' + newType) || ''; }
                    purposeObj.val = purpose;
                    return newText;
                }

                if (flag && !done) {
                    // Matches the size number or $$ and replaces it by the new size
                    icnObj.val = setValues(icn);
                    if (evt.detail.type == 'next') { done = true; }

                } else {
                    if (icnObj && icn.size == size) { 
                        flag = true; 
                        icnObj.val = setValues(icn);
                    }
                }
            }
        });
        icons = icons;

    }

    function addShortcut() {
        let newItem = structuredClone(shortcut);
        obj.val.push(newItem);
        obj = obj;
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
            <div class="prop">"{obj.label}": <span class="delim">&lbrack;</span>{#if !obj.sel}<span class="delim">&rbrack;</span>{:else}&nbsp;<button on:click={addShortcut} class="small">{$lang.ui.add}</button>{/if}</div>
        </div>

        {#if obj.sel}
            <div class="iconval ind1">

                <ol class="ind1">
                    {#each obj.val as sc, index}
                        <li>
                            {#if index == 0}
                                <div class="delim">
                                    <span>&lbrace;</span>
                                    <span on:click={delItem.bind(this, index)}><i class="icon-trash-2"></i></span>
                                </div>
                            {/if}
                            
                            {#each sc as item}
                                {#if item.type == 'text'}
                                    <Maniftext bind:obj={item} on:set></Maniftext>

                                {:else if item.type == 'icons'}
                                    <Manificons bind:obj={item}></Manificons>
                                {/if}
                            {/each}

                            <div>
                                {#if index == obj.val.length - 1}
                                    <span class="delim">&rbrace;</span>
                                {:else}
                                    <span class="delim">&rbrace;, &lbrace;&nbsp;<span on:click={delItem.bind(this, index)}><i class="icon-trash-2"></i></span></span>
                                {/if}
                            </div>
                        </li>
                    {/each}
                </ol>
            </div>
        
            <div class="delim">&rbrack;</div>
        {/if}
    </li>
{/if}

<style>
    .iconval {
        display: flex;
        flex-direction: column;
    }

    ol {
        padding: 0;
        display: flex;
        gap: 8px;
        flex-direction: column;
    }

    li > div:first-child {
        display: flex;
        gap: 8px;
        padding: 2px 0;
    }

    li > div:first-child > span:first-child {
        cursor: pointer;
    }


    ol > li {
        /* font-size: smaller; */
        padding: 0 5px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

/*     ol > li:hover {
        background-color: var(--hilite);
    } */

    ol > li.sel {
        background-color: var(--base);
        color: #fff;
    }

    li {
        display: flex;
/*         gap: 5px;*/
        margin-bottom: 6px; 
        flex-direction: column;
    }

    select {
        background-color: transparent;
        padding: 0;
        height: auto;
        font-weight: bold;
        color: inherit;
    }
</style>