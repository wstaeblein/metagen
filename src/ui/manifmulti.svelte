<script>
    import { help } from '../stores.js';

    export let obj = null;

    let newItem = '';

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

    function change() {
        obj.sel = !!obj.val.length;
        if (newItem) { 
            if (!obj.val.includes(newItem)) { obj.val.push(newItem); }
            newItem = '';
            obj = obj;
        }
    }

    function delItem(index) {
        obj.val.splice(index, 1);
        obj = obj;
    }

    function process(evt) {
        if (evt.key == 'Enter') { change(); }
    }

    function toggle() {
        obj.sel = !obj.sel;
    }
</script>

{#if obj}
    <li class="ind1" class:disabled={!obj.req && !obj.sel && !obj.val.length}>
        <span on:click={toggle}>
            <i class="{setIcon(obj, 'ok')}"></i>
        </span>
        {#if $help}<a href="https://developer.mozilla.org/en-US/docs/Web/Manifest/{obj.label}" target="_blank"><i class="icon-help-circle"></i></a>{/if}
        <span class="prop" on:click={toggle}>"{obj.label}": </span>

        <span class="val">
            {#if obj.list}
                <select bind:value={newItem} on:change={change} required>
                    <option value=""></option>
                    {#each obj.list as item}
                        <option value="{item}">{item}</option>
                    {/each}
                </select>
            {:else}
                <input type="text" class="mono" bind:value={newItem} on:keypress={process} />
            {/if}
            &nbsp; 
            <span class="items">
                <span class="delim">&lbrack;</span>
                {#each obj.val as item, ind}
                    <span class="itm" on:click={delItem.bind(this, ind)}>"{item}"{ind < obj.val.length - 1 ? ',' : ''}</span>
                {/each}
                <span class="delim">&rbrack;</span>
            </span>
            
        </span>
    </li>
{/if}

<style>
    .val {
        align-items: baseline;
    }

    .items {
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
        font-size: smaller;
    }

    .itm {
        cursor: pointer;
    }

    li {
        display: flex;
        gap: 10px;
        margin-bottom: 6px;
    }

    li > span:first-child {
        cursor: pointer;
    }


    select {
        background-color: transparent;
        padding: 3px 0;
        height: auto;
        font-weight: bold;
        color: inherit;
        border: 1px dotted var(--manifborder);
        width: auto;
        align-self: baseline;
    }

    select:focus {
        border: 1px dotted #666 !important;
    }

    select:has(option:checked[value='']) {
        width: 70px;
    }

    select:valid {
        min-width: 0;
        border-color: transparent;
    }    


    input {
        background-color: transparent;
        padding: 2px 4px;
        height: auto;
        width: 120px;
        color: inherit;
        border: 1px dotted var(--manifborder);
        border-radius: 3px;
        font-family: var(--mono);
    }

    input:focus {
        border: 1px dotted var(--manifborder);
    }
   
</style>