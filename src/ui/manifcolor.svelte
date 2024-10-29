<script>
    import { onMount } from 'svelte';
    import { help } from '../stores.js';

    export let obj = null;

    let isDisabled = true;


    $: isDisabled = !obj.req && !obj.sel && !obj.val;

    onMount(() => { console.log(obj)
        readjust();
    });

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

    function readjust() {
        obj.sel = !!obj.val;
    }

    function remove() {
        obj.val = '';
        obj.sel = false;
    }

    function toggle() {
        obj.sel = !obj.sel;
    }
</script>

{#if obj}
    <li class="ind1" class:disabled={isDisabled}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span on:click={toggle}>
            <i class="{setIcon(obj, 'ok')}"></i>
        </span>
        
        {#if $help}<a href="https://developer.mozilla.org/en-US/docs/Web/Manifest/{obj.label}" target="_blank"><i class="icon-help-circle"></i></a>{/if}

        <span class="prop" on:click={toggle}>"{obj.label}":</span>
        
        <span class="val">
            <input type="color" bind:value={obj.val} on:input={readjust} class:hasval={obj.val} class="mono" />
            <span>"</span>
            <span>{obj.val || ''}</span>
            <span>"</span>

            {#if obj.val}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <span class="remove" on:click={remove}><i class="icon-trash-2"></i></span>
            {/if}
        </span>

    </li>
{/if}

<style>
    .remove {
        padding-left: 8px;
        cursor: pointer;
    }

    li {
        display: flex;
        gap: 10px;
        margin-bottom: 6px;
        align-items: center;
    }

    li > span:first-child {
        cursor: pointer;
    }


    input {
        background-color: transparent;
        height: 27px;
        color: inherit;
        border: 1px dotted var(--manifborder);
        border-radius: 3px;
        font-family: var(--mono);
        width: 27px;
        padding: 0;
        margin: 0 8px 0 0;
    }

    input:focus {
        border: 1px dotted var(--manifborder);
    }

    input.hasval:not(:focus) {
        border: none;
    }

    .dupe {
        background-color: transparent;
        padding: 2px 4px;
        height: auto;
        width: auto;
        color: transparent;
        border: 1px dotted transparent;
        border-radius: 3px;
        font-size: 16px;
        position: absolute;
        font-family: var(--mono);
        z-index: -1;
        visibility: hidden;
        position: absolute;
    }    
</style>