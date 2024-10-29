<script>
    import { help } from '../stores.js';
    
    export let obj = null;

    function setIcon(obj, extra) {
        let cls = '';
        if (obj.req) {
            cls = 'icon-star req';
        } else {
            cls = 'icon' + (obj.sel ? '-check' : '') + '-circle';
        }

        if (obj.sel && obj.val == null) { obj.val = false; }
        
        if (extra) { cls += ' ' + extra; }
        return cls.trim();
    }

    function toggle() {
        obj.sel = !obj.sel;
        if (!obj.sel) { obj.val = null; }
    }

    function toggleCheck() {
        obj.val = !obj.val;
        obj.sel = true;
    }
</script>

{#if obj}
    <li class="ind1" class:disabled={!obj.req && !obj.sel && obj.val == null}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span on:click={toggle}>
            <i class="{setIcon(obj, 'ok')}"></i>
        </span>
        {#if $help}<a href="https://developer.mozilla.org/en-US/docs/Web/Manifest/{obj.label}" target="_blank"><i class="icon-help-circle"></i></a>{/if}
        <span class="prop" on:click={toggle}>"{obj.label}":</span>
        <span class="val choice">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span class="check" class:sel={obj.val} on:click={toggleCheck}></span>
            <span>{obj.val ? 'true' : obj.val == false ? 'false' : '--'}</span>
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

    .choice {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .check {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid maroon;
        border-radius: 4px;
        position: relative;
        box-sizing: border-box;
        cursor: pointer;
    }

    .check.sel::after {
        content: '';
        width: 12px;
        height: 12px;
        background-color: maroon;
        position: absolute;
        top: 2px;
        left: 2px;
        box-sizing: border-box;
        border-radius: 3px;
    }
</style>