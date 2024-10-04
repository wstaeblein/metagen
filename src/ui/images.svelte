<script>
    // @ts-nocheck
    
    import { lang, supportedLangs } from '../stores.js';
	import Accordion from './accordion.svelte';


    export let data = [];

</script>


<section>
    <h2>Image Tags Generator</h2>

</section>


<style>
    .byside {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-wrap: wrap;
    }

    section {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0;
    }
    section > div {
        overflow: auto;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        padding: 20px 5px 20px 20px;
    }

    h2 {
        background: var(--bars);
        padding: 5px 15px;
    }

</style>