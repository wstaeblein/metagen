<script>
    export let open = false;
    export let title = '';
    import { slide } from 'svelte/transition';
    const handleClick = () => open = !open
</script>
  
<div class="accordion">
    <div class="header">
        <h4 on:click={handleClick}>
            <span class:rotate={open}>▶</span>
            <span class="upper">{title}</span>
        </h4>

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
        margin: 0 0 1rem 0;
        padding: 10px;
        background-color: #7f8da885;
        border-radius: 9px;
        width: calc(100% - 20px);
        box-sizing: border-box;
    }
    
    div.header {
        display:flex;
        width:100%;
    }

    h4 {
        margin: 0;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    h4 > span:first-child {
        display: inline-block;
        transition: all 0.4s ease;
        font-size: 16px;
    }

    h4 > span.rotate:first-child {
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
  