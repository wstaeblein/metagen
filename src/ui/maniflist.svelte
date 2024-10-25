<script>

    export let obj = null;

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
        obj.sel = !!obj.val;
    }
</script>

{#if obj}
    <li class="ind1" class:disabled={!obj.req && !obj.sel && !obj.val}>
        <span on:click={() => obj.sel = !obj.sel}>
            <i class="{setIcon(obj, 'ok')}"></i>
        </span>
        <span class="prop">"{obj.label}":</span>
        <span class="val">
            "<select bind:value={obj.val} on:change={change} required>
                <option value=""></option>
                {#each obj.list as item}
                    <option value="{item}">{item}</option>
                {/each}
            </select>"
        </span>
    </li>
{/if}

<style>

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
        font-family: inherit;
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
</style>