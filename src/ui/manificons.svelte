<script>
    import { lang, supportedLangs, help } from '../stores.js';

    import Maniftext from './maniftext.svelte';
    import Maniflist from './maniflist.svelte';

    export let obj = null;

    let allFlag = false;
    let sizes = [
        { value: 16, sel: false }, { value: 24, sel: false }, { value: 32, sel: false }, { value: 48, sel: false }, 
        { value: 64, sel: false }, { value: 96, sel: false }, { value: 128, sel: false }, {value: 192, sel: false },
        { value: 256, sel: false }, { value: 512, sel: false }, { value: 1024, sel: false }, {value: 2048, sel: false }
    ];
    let icon = [
        { label: 'src', val: '', type: 'text', sel: true, req: true, downbtn: true },
        { label: 'sizes', val: '', type: 'text', sel: false, readonly: true },
        { label: 'type', val: '', type: 'list', sel: false, list: ['image/png', 'image/jpeg', 'image/gif', 'image/', 'image/bmp', 'image/webp', 'image/svg+xml'] },
        { label: 'purpose', val: '', type: 'list', list: ['any', 'monochrome', 'maskable'], sel: false },
    ];

    let selIcons = [];
    let icons = sizes.map(sz => {
        let icn = structuredClone(icon);
        let szIcon = icn.find(i => i.label == 'sizes');
        szIcon.val = sz.value + 'x' + sz.value;
        return { sel: false, size: sz.value, fields: icn };
    });


/*     $: obj.val = icons.filter(i => i.sel).map(itm => { console.log(itm)
        let _obj = {};
        itm.fields.forEach(i => { _obj[i.label] = i.val; });
        return _obj;
    }); */
    $: obj.val = selIcons.map(a => Object.assign({}, ...a.fields.filter(f => f.sel).map(d => ({ [d.label]: d.val })))); 

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

        icons.forEach(icn => { console.log(icn)
            if (icn.sel) {
                let icnObj = icn.fields.find(f => f.label == field);
                let typeObj = icn.fields.find(f => f.label == 'type');
                let purposeObj = icn.fields.find(f => f.label == 'purpose');

                let setValues = (icon) => {
                    let re2 = new RegExp(size, 'g');
                    let newText = txt.replace(re2, icon.size);
                    let newType = newText.indexOf('.') > -1 ? newText.split('.').pop().toLowerCase() : initialType; 

                    if (newType == 'jpg') { newType = 'jpeg'; }
                    if (newType) { 
                        let tmpType = typeObj.list.find(t => t == 'image/' + newType) || ''; 
                        typeObj.val = tmpType;
                        if (tmpType) { typeObj.sel = true; }
                    }
                    purposeObj.val = purpose;
                    if (purpose) { purposeObj.sel = true; }


                    return newText;
                }

                if (flag && !done) {
                    // Matches the size number or $$ and replaces it with the new size
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
        obj = obj;
        selIcons = icons.filter(i => i.sel);
    }

    function toggle() {
        obj.sel = !obj.sel;
        obj = obj;
    }

    function updateHandler() {
        icons = icons;
        obj = obj;
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
            <div class="prop"><span on:click={toggle}>"{obj.label}":</span> <span class="delim">&lbrack;</span>{#if !obj.sel}<span class="delim">&rbrack;</span>{/if}</div>
        </div>

        {#if obj.sel}
            <div class="iconval ind1">

                <ul class="ind1">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <li on:click={addDelSizes}>{#if allFlag}{$lang.ui.none}{:else}{$lang.ui.all}{/if}</li>
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    {#each sizes as size}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li on:click={() => toggleSize(size)} class:sel={size.sel}>{size.value}</li>
                    {/each}
                </ul>



                <ol class="ind1">
                    {#each selIcons as icon, index}
                        <li>
                            {#if index == 0}
                                <div>
                                    <span class="delim">&lbrace;</span>

                                </div>
                            {/if}
                            
                            {#each icon.fields as fld}
                                {#if fld.type == 'text'}
                                    <Maniftext bind:obj={fld} data={icon.size} on:set={setEventHandler}></Maniftext>

                                {:else if fld.type == 'list'}
                                    <Maniflist bind:obj={fld} on:update={updateHandler}></Maniflist>

                                {/if}

                            {/each}

                            <div>
                                {#if index == selIcons.length - 1}
                                    <span class="delim">&rbrace;</span>
                                {:else}
                                    <span class="delim">&rbrace;, &lbrace;</span>
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

    .iconval > ul {
        display: flex;
        gap: 5px;
        margin-top: 2px;
    }

    .iconval > ul > li {
        font-size: 12px;
        color: #fff;
        background-color: var(--base);
        padding: 1px 8px 3px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: bold;
        margin-bottom: 0;
    }

    .iconval > ul > li:hover {
        background-color: var(--hilite);
        color: var(--base);
    }
    .iconval > ul > li.sel {
        background-color: var(--hilite);
        color: var(--base);
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