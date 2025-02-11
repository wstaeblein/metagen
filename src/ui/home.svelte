<script>
    import { langCode, lang, supportedLangs } from '../stores.js';
</script>

<div class="home">
    <h3>{$lang.hero.title}</h3>
    <h5>{$lang.hero.subtitle}</h5>
    <br>

    <div class="hero">
        <img src="/img/rocket.png" alt="SEO" />
        <div >
            <p>{$lang.hero.text1}</p>

            <p>{$lang.hero.text2}</p>
            
            <p>{$lang.hero.text3}</p>
            
            <ol class="cards">
                {#each $lang.hero.cards as card}
                    <li>
                        <h6>{card.title}</h6>
                        <div><i class="{card.icon}"></i></div>
                        <div>{card.text}</div>
                    </li>
                {/each}                                                          
            </ol>
        </div>

    </div>

</div>


<style>
    .home {
        padding: 20px;
        height: 100%;
        overflow: auto;
    }

    h3 {
        margin: 0;
        color: var(--base);
        text-transform: uppercase;
    }

    h5 {
        margin: 0;
        font-size: 16px;
        color: var(--base);
    }
    
    ol.cards {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1em;
        color: var(--text);
        padding: 0;
        margin: 0;
        text-align: center;
    }

    ol.cards > li {
        background-color: #f9f9f9;
        border-radius: 9px;
        padding: 10px;
        box-shadow: 3px 3px 10px 2px #777;
    }

    ol.cards > li > h6 {
        font-size: 20px;
        margin: 0;
        text-transform: uppercase;
        color: var(--base);
    }

    ol.cards > li > div:has(i) {
        margin: 10px 0 5px;
    }

    ol.cards > li > div:last-child {
        font-size: smaller;
    }

    ol.cards > li > div > i {
        font-size: 52px;
        color: var(--hilite);
        text-shadow: 2px 2px 0 #444;
    }

    .hero {
        display: flex; 
        gap: 3em;
    }

    .hero > img {
        min-height: 260px;
        max-height: 400px;
        align-self: self-start;
        height: auto;
    }

    .hero > div {
        text-align: justify; 
        max-width: 640px;
    }

    @media (max-width: 1250px) {
        ol.cards {
            grid-template-columns: repeat(2, 1fr);
            gap: 2em;
        }
    }

    @media (max-width: 900px) {
        .home h3, .home h5 {
            text-align: center;
        }
        
        .hero {
            flex-direction: column;
            align-items: center;
        }

        .hero > img {
            margin: auto;
        }
    }
</style>