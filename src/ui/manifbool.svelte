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

    function toggle() {
        obj.sel = !obj.sel;
        if (!obj.sel) { obj.val = null; }
    }
</script>

{#if obj}
    <li class="ind1" class:disabled={!obj.req && !obj.sel && obj.val == null}>
        <span on:click={toggle}>
            <i class="{setIcon(obj, 'ok')}"></i>
        </span>
        <span class="prop">"{obj.label}":</span>
        <span class="val choice">
            <span class="check" class:sel={obj.val} on:click={() => obj.val = !obj.val}></span>
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