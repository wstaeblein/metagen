<script>
    export let open = false;
    export let title = '';
    import { slide } from 'svelte/transition';
    const handleClick = () => open = !open
</script>
  
<div class="accordion">
    <div class="header">
        <h2>
            <span on:click={handleClick} class:rotate={open}>▶</span>
            <span class="upper">{title}</span>
        </h2>

    </div>
    
    {#if open}
    <div class="details" transition:slide>
        <slot name="details">
        </slot>
    </div>
    {/if}
</div>
  
<style>
    div.accordion {
        margin: 1rem 0;
    }
    
    div.header {
        display:flex;
        width:100%;
    }

    h2 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    h2 > span:first-child {
        cursor: pointer;
        display: inline-block;
        transition: all 0.4s ease;
        font-size: 16px;
    }

    h2 > span.rotate:first-child {
        transform: rotate(90deg);
    }
    
    div.header .text {
        flex: 1;
        margin-right: 5px;
    }


    
    div.details {
        padding: 0.5rem 1rem 1rem;
    }
</style>
  