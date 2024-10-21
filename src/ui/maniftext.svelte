<script>
    import { onMount, setContext, createEventDispatcher, tick } from 'svelte';

    export let obj = null;
    export let data = null;

    const dispatch = createEventDispatcher();
    let isDisabled = true;
    let input = null;
    let inpContainer = null;
    let dupe = null;

    $: isDisabled = !obj.req && !obj.sel && !obj.val;
    $: readjust(obj.val)

    onMount(() => {
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
        if (input) {
            dupe.textContent = obj.val;
            let dupeWidth = dupe.getBoundingClientRect().width ; 
            let cttWidth = inpContainer.offsetWidth - 50 - (obj.downbtn ? 30 : 0); 
            let width = Math.min(dupeWidth, cttWidth);

            input.style.width = obj.val ? width + 'px' : '70px';
            obj.sel = !!obj.val;
        }
    }

    function setNext() {
        dispatch('set', { type: 'next', size: data, data: obj });
    }

    function setAll() {
        dispatch('set', { type: 'alldown', size: data, data: obj });
    }
</script>

{#if obj}
    <li class="ind1" class:disabled={isDisabled}>
        <span on:click={() => obj.sel = !obj.sel}>
            <i class="{setIcon(obj, 'ok')}"></i>
        </span>
        <span class="prop">"{obj.label}":</span>
        <span class="dupe" bind:this={dupe}></span>
        <span class="val" bind:this={inpContainer}>
            <span>"</span>
            <input type="text" bind:value={obj.val} bind:this={input} on:input={readjust} class:hasval={obj.val} class="mono" readonly="{obj.readonly}" />
            <span>"</span>

            {#if obj.downbtn}
                <b class="xtrabtns">
                    <span on:click={setNext}><i class="icon-chevron-down"></i></span>
                    <span on:click={setAll}><i class="icon-chevrons-down"></i></span>                    
                </b>

            {/if}            
        </span>

    </li>
{/if}

<style>
    .xtrabtns {
        display: flex;
        align-items: center;
        margin-left: 8px;
        gap: 8px;
        font-size: 18px;
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
        padding: 2px 4px;
        height: auto;
        width: 70px;
        color: inherit;
        border: 1px dotted var(--manifborder);
        border-radius: 3px;
        font-family: var(--mono);
    }

    input:focus {
        border: 1px dotted var(--manifborder);
    }

    input.hasval:not(:focus), input:read-only {
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