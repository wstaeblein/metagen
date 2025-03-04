<script>
    import { langCode, lang, supportedLangs } from '../stores.js';
</script>

<div class="home">
    <div>
        <h3>{$lang.hero.title}</h3>
        <h5>{$lang.hero.subtitle}</h5>
        <br>

        <div class="hero">
            <img src="/img/rocket.png" alt="SEO" />
            <div>
                <p>{$lang.hero.text1}</p>

                <p>{$lang.hero.text2}</p>
                
                <p>{$lang.hero.text3}</p>
            </div>
        </div>  
        <div class="cards">
            <h3>{$lang.hero.cardstitle}</h3>
            <h5>{$lang.hero.cardsdesc}</h5>
            <br>
            <ol>
                {#each $lang.hero.cards as card}
                    <li>
                        <h6>{card.title}</h6>
                        <div><i class="{card.icon}"></i></div>
                        <div>{card.text}</div>
                    </li>
                {/each}                                                          
            </ol>
            <br><br><br>
        </div>        

        <div class="sites">
            <h3>{$lang.hero.sitestitle}</h3>
            <h5>{$lang.hero.sitesdesc}</h5>
            <br>
            <ol>
                {#each $lang.hero.sites as site}
                    <li>
                        <a href="{site.link}" target="_blank" title="{site.title}">
                            <h6>{site.name}</h6>
                            <div><img src="/img/sites/{site.id}.png" alt="{site.title}" /></div>
                            <div>{site.desc}</div>
                        </a>
                    </li>
                {/each}                                                          
            </ol>
            <br>
        </div>           
    </div>

    <div>

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

    div.cards {
        margin-top: 3em;
    }
    
    div.cards > ol, div.sites > ol {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
        gap: 1em;
        color: var(--text);
        padding: 0;
        margin: 0;
        text-align: center;
    }

    div.cards > ol > li, div.sites > ol > li {
        background-color: #f9f9f9;
        border-radius: 9px;
        padding: 10px;
        box-shadow: 3px 3px 10px 2px #777;
    }

    div.cards > ol > li > h6 {
        font-size: 20px;
        margin: 0;
        text-transform: uppercase;
        color: var(--base);
    }

    div.cards > ol > li > div:has(i) {
        margin: 10px 0 5px;
    }

    div.cards > ol > li > div:last-child {
        font-size: smaller;
    }

    div.cards > ol > li > div > i {
        font-size: 52px;
        color: var(--hilite);
        text-shadow: 2px 2px 0 #444;
    }





    div.sites > ol > li > a > div > img {
        max-width: 120px;
    }

    div.sites > ol > li > a {
        display: block;
        color: inherit;
        transition: transform 0.3s ease;
        transform: scale(0.9);
    }

    div.sites > ol > li > a:hover {
        transform: scale(1);
    }

    div.sites > ol > li > a > h6 {
        font-size: 18px;
        margin: 0;
        text-transform: uppercase;
        color: var(--base);
    }

    div.sites > ol > li > a > div:has(i) {
        margin: 10px 0 5px;
    }

    div.sites > ol > li > a > div:last-child {
        font-size: smaller;
    }

    div.sites > ol > li > a > div > i {
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