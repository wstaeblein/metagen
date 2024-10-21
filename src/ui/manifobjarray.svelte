<script>
    import Maniftext from './maniftext.svelte';
    import Maniflist from './maniflist.svelte';

    export let obj = null;

    let sizes = [
        { value: 16, sel: false }, { value: 24, sel: false }, { value: 32, sel: false }, { value: 48, sel: false }, 
        { value: 64, sel: false }, { value: 96, sel: false }, { value: 128, sel: false }, {value: 192, sel: false },
        { value: 256, sel: false }, { value: 512, sel: false }, { value: 1024, sel: false }, {value: 2048, sel: false }
    ];
    let icon = [
        { label: 'src', val: '', type: 'text', sel: true, req: true },
        { label: 'sizes', val: '', type: 'text', sel: false },
        { label: 'type', val: '', type: 'list', sel: false, list: ['image/png', 'image/jpeg', 'image/gif', 'image/', 'image/bmp', 'image/webp', 'image/svg+xml'] },
        { label: 'purpose', val: '', type: 'list', list: ['any', 'monochrome', 'maskable'], sel: false },
    ];
    let icons = sizes.map(sz => {
        let icn = structuredClone(icon);
        let szIcon = icn.find(i => i.label == 'sizes');
        szIcon.val = sz.value + 'x' + sz.value;
        return { sel: false, fields: icn };
    });

    console.log('icons: ', icons)

    $: console.log(obj)

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
        })


/*         let newItem = item || obj.default; console.log(newItem)
        obj.val.push(newItem);
        obj = obj;
        console.log(obj) */
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
</script>

{#if obj}
    <li class="ind1" class:disabled={!obj.req && !obj.sel}>
        <div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span on:click={() => obj.sel = !obj.sel}>
                <i class="{setIcon(obj, 'ok')}"></i>
            </span>
            <div class="prop">"{obj.label}": <span class="delim">&lbrack;</span>{#if !obj.sel}<span class="delim">&rbrack;</span>{/if}</div>
        </div>

        {#if obj.sel}
            <div class="val ind1">
                <ol class="ind1">
                    {#each icons as icon}
                        <li>
                            <div>
                                <span on:click={() => icon.sel = !icon.sel}>
                                    <i class="{setIcon(obj, 'ok')}"></i>
                                </span>
                                <span class="delim">&lbrace;</span>
                            </div>
                            
                            {#each icon.fields as fld}
                                {#if fld.type == 'text'}
                                    <Maniftext bind:obj={fld}></Maniftext>

                                {:else if fld.type == 'list'}
                                    <Maniflist bind:obj={fld}></Maniflist>

                                {/if}
                            {/each}

                            <div><span class="delim">&rbrace;</span></div>
                        </li>
                    {/each}
                </ol>


                {#each obj.actions as action}
                    {#if action.type == 'text'}
                        <div class="acttext">
                            <input type="text" bind:value={action.val} />
                        </div>

                    {:else if action.type == 'list'}
                        <ol>
                            <li on:click={addAllListActionItems.bind(this, action)}>Todos</li>
                            {#each action.list as item}
                                <li on:click={toggleListActionItem.bind(this, action, item)} class:sel={item.sel}>{item.value}</li>
                            {/each}
                        </ol>

                    {/if}
                {/each}
                <!-- <button class="small" on:click={addIconItem}>Add New</button> -->


                <div class="ind1">
                    {#if obj.val && obj.val.length}

                        {#each obj.val as icon, ind}
                            <span class="delim">&lbrace;</span>

                            {#each icon as item}
                                {#if item.type == 'text'}
                                    <Maniftext bind:obj={item}></Maniftext>

                                {:else if item.type == 'list'}
                                    <Maniflist bind:obj={item}></Maniflist>

                                {/if}
                            {/each}

                            <span class="delim">&rbrace;{ind != obj.val.length - 1 ? ',' : ''} </span>
                        {/each}
                    {/if}
                </div>
            </div>
        
            <div class="delim">&rbrack;</div>
        {/if}
    </li>
{/if}

<style>

    .acttext {
        margin-bottom: 10px;
    }

    .acttext > input[type=text] {
        height: auto;
        max-width: 250px;
        padding: 3px 8px;
        background-color: #eee;
        font-family: var(--mono);
    }

    ol {
        padding: 0;
        display: flex;
        gap: 8px;
        flex-direction: column;
    }

    ol, li > div:first-child {
        display: flex;
        gap: 8px;
    }

    ol > li {
        font-size: smaller;
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
        gap: 5px;
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