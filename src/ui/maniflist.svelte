<script>
    import { createEventDispatcher } from 'svelte';
    import { help, lang } from '../stores.js';

    export let obj = null;

    const dispatch = createEventDispatcher();
    
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
        dispatch('update');
    }

    function toggle() {
        obj.sel = !obj.sel;
        dispatch('update');
    }

    
    function setTip(obj) {
        if (obj.req) {
            return $lang.tips.req;
        } else {
            return obj.sel ? $lang.tips.issel : $lang.tips.notsel;
        }
    }
</script>

{#if obj}
    <li class="ind1" class:disabled={!obj.req && !obj.sel && !obj.val}>
        <span on:click={toggle} aria-label="{setTip(obj)}" data-balloon-pos="up-left">
            <i class="{setIcon(obj, 'ok')}"></i>
        </span>
        {#if $help}<a href="https://developer.mozilla.org/en-US/docs/Web/Manifest/{obj.label}" target="_blank"><i class="icon-help-circle"></i></a>{/if}
        <span class="prop" on:click={toggle}>"{obj.label}":</span>
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