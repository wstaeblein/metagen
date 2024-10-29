<script>
    import { createEventDispatcher } from 'svelte';
    import { ClickOutside } from './ClickOutside.js';

    export let items = [];
    export let align = '';
    export let sel = '';

    let alignVals = { vert: '', horz: '' }
    let selObj = {};
    let open = false;
    const dispatch = createEventDispatcher();

    $: if (sel) { selObj = items.find(i => i.value == sel); }

    $: if (align) {
        let tmp = align.split(' ');
        alignVals.horz = tmp[0] || 'center';
        alignVals.vert = tmp[1] || 'bottom';
    }

    function toggle() {
        open = !open;
    }

    function setItem(item) { console.log(item)
        sel = item.value;
        selObj = item;
        dispatch('menuchoice', item);
        open = false;
    } 
</script>


<span class="lang" use:ClickOutside on:outclick={() => open = false}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img src="/img/flags/{selObj.value}.png" alt="{selObj.label}" on:click={toggle} />

    <ul class="{alignVals.horz + ' ' + alignVals.vert}" class:open>
        {#each items as item}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li on:click={setItem.bind(this, item)} class:sel={item.value == selObj.value}>
                {#if item.img}
                    <img src="{item.img}" alt="{item.label}" style="height: 2ch; width: 2ch"/>
                {/if}
                <span>{item.label}</span>
            </li>
        {/each}
    </ul>    
</span>


<style>
        .lang {
            display: inline-block;
            position: relative;

        }

        .lang img {
            height: 26px;
            width: 26px;
            transform: translateY(3px);
            cursor: pointer;
            border-radius: 50%;
        }

    ul {
        position: absolute;
        top: 100%;
        background-color: var(--solidbars);
        right: 0;
        left: 0;
        font-size: 16px;
        padding: 3px 0;
        border-radius: 7px;
        color: #fff;
        display: none;
    }

    ul.open {
        display: block;
    }

    ul.center {
        right: 0;
        left: 0;
    }

    ul.right {
        right: 0;
        left: unset;
    }

    ul.left {
        right: unset;
        left: 0;
    }

    ul > li {
        padding: 5px 15px;
        display: flex;
        gap: 10px;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.3s ease;
    }

    ul > li.sel {
        opacity: 1;
        pointer-events: none;
    }

    ul > li:hover {
        opacity: 1;
    }

</style>