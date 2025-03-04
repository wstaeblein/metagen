<script>
    import { createEventDispatcher, tick } from 'svelte';

    const dispatch = createEventDispatcher();

    let data = {
        baseUrl: '',
        urlText: '',
        urlArr: []
    }


    function processURLs() {

        let sm = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        data.urlArr = [];

        if (data.baseUrl) {
            data.urlArr.push(newItem(data.baseUrl));
        }

        if (data.urlText) {
            let len = data.urlText.length;
            let higher, tmp = 0;
            [
                { char: ',',   len: howMany(data.urlText, ',') },
                { char: ';',   len: howMany(data.urlText, ';') },
                { char: ' ',   len: howMany(data.urlText, ' ') },
                { char: '\\t', len: howMany(data.urlText, '\\t') },
                { char: '\\n', len: howMany(data.urlText, '\\n') },
            ].forEach(h => {
                if (h.len >= tmp) {
                    tmp = h.len;
                    higher = h;
                }
            });

            if (higher) {
                let arr = data.urlText.split(new RegExp(higher.char));
                console.log(arr)

                if (arr && arr.length) {
                    arr.forEach(itm => {
                        try {
                            if (!itm.startsWith('http')) { itm = new URL(itm, data.baseUrl).href; }
                            data.urlArr.push(newItem(itm));

                        } catch (error) {
                            console.log('ERROR on: ' + itm)
                        }
                    });
                }
            } else {
                // No valid separators found
            }
        }
        dispatch('change', data.urlArr);
    }

    function howMany(txt, char) {
        let re = new RegExp(char, 'g'); console.log(re)
        return txt.length - txt.replace(re, '').length;
    }


    function newItem(url, lm, change, prio) {
        return { url, lm, change, prio };
    }

    function changeMe() { 
        setTimeout(() => dispatch('change', data.urlArr), 0);
    }
</script>

<section>
    <h2>Sitemap</h2>
    <div class="ctt">
        
        <div>
            <div class="itemtitle">Insira a url base do site</div>
            <input type="text" bind:value={data.baseUrl} on:blur={processURLs} />
        </div>
        <br>
        <div>
            <div class="itemtitle">Insira as demais urls do site (absolutas ou relativas)</div>
            <textarea rows="10" on:blur={processURLs} bind:value={data.urlText}></textarea>
        </div>

        {#each data.urlArr as item}
            <div>
                <div class="full">
                    <div class="itemtitle">URL</div>
                    <input type="text" bind:value={item.url} on:input={changeMe} />                
                </div>
                <div class="divide">
                    <div>
                        <div class="itemtitle">Last Mod</div>
                        <input type="date" bind:value={item.lm} on:input={changeMe} />
                    </div>
                    <div>
                        <div class="itemtitle">Frequency</div>
                        <select bind:value={item.change} on:input={changeMe}>
                            <option></option>
                            <option>always</option>
                            <option>hourly</option>
                            <option>daily</option>
                            <option>weekly</option>
                            <option>monthly</option>
                            <option>yearly</option>
                            <option>never</option>
                        </select>
                    </div>     
                    <div>
                        <div class="itemtitle">Priority</div>
                        <select bind:value={item.prio} on:input={changeMe}>
                            <option></option>
                            <option>0</option>
                            <option>0.1</option>
                            <option>0.2</option>
                            <option>0.3</option>
                            <option>0.4</option>
                            <option>0.5</option>
                            <option>0.6</option>
                            <option>0.7</option>
                            <option>0.8</option>
                            <option>0.9</option>
                            <option>1</option>
                        </select>
                    </div>                                 
                </div>
            </div>
            <br>
        {/each}
    </div>

</section>


<style>

    .ctt {
        overflow-y: auto;
    }

    .divide {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }

    .full {
        margin-bottom: 8px;
    }

    section {
        padding: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    section > div {
        padding: 20px;
    }

    .itemtitle {
        color: var(--base);
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
    }

    h2 {
        background: var(--bars);
        padding: 5px 15px;
        display: flex;
        justify-content: space-between;
        gap: 20px;
        align-items: center;

    }

    textarea {
        height: 120px;
    }
</style>