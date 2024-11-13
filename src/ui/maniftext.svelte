<script context="module">

    // Permite que caixas de texto se expandam ao receber conteúdo de um dos botões de replicar conteúdo (setNext ou setAll)
    export let readjustFlag = false;

</script>

<script>
    import { onMount, setContext, createEventDispatcher, tick } from 'svelte';
    import { help, lang } from '../stores.js';

    export let obj = null;
    export let data = null;

    const dispatch = createEventDispatcher();
    let isDisabled = true;
    let input = null;
    let inpContainer = null;
    let dupe = null;
    let flag = false;


    $: if (readjustFlag) { readjust(obj.val); }

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
        dispatch('update');
    }

    function setNext() {
        readjustFlag = true;
        dispatch('set', { type: 'next', size: data, data: obj });
        tick(() => readjustFlag = false);
    }

    function setAll() {
        readjustFlag = true;
        dispatch('set', { type: 'alldown', size: data, data: obj });
        tick(() => readjustFlag = false);
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
    <li class="ind1" class:disabled={!obj.req && !obj.sel}>
        <span on:click={toggle} aria-label="{setTip(obj)}" data-balloon-pos="up-left">
            <i class="{setIcon(obj, 'ok')}"></i>
        </span>

        {#if $help}<a href="https://developer.mozilla.org/en-US/docs/Web/Manifest/{obj.label}" target="_blank"><i class="icon-help-circle"></i></a>{/if}
        <span class="prop" on:click={toggle}>"{obj.label}":</span>
        <span class="dupe" bind:this={dupe}></span>
        <span class="val" bind:this={inpContainer}>
            <span>"</span>
            <input type="text" bind:value={obj.val} bind:this={input} on:input={readjust} class:hasval={obj.val} class="mono" readonly="{obj.readonly}" />
            <span>"</span>

            {#if obj.downbtn}
                <b class="xtrabtns">
                    <button on:click={setNext} class="small" aria-label="{$lang.tips.repnext}" data-balloon-pos="up"><i class="icon-chevron-down"></i></button>
                    <button on:click={setAll} class="small" aria-label="{$lang.tips.repall}" data-balloon-pos="up"><i class="icon-chevrons-down"></i></button>                    
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