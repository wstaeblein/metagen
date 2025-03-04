<script>
    import { createEventDispatcher, tick, onMount } from 'svelte';
    import { lang } from '../stores.js';

    const dispatch = createEventDispatcher();

    let data = {
        baseUrl: '',
        urlText: '',
        urlArr: []
    }
    let isUrlFlag = true;

    onMount(() => {
        
    });


    function processURLs() {

        data.urlArr = [];

        if (data.baseUrl && isUrl(data.baseUrl)) {
            data.urlArr.push(newItem(data.baseUrl));
        }

        if (data.urlText) {
            let len = data.urlText.length;
            let higher, tmp = 0;
            [
                { char: ',',   len: howMany(data.urlText, ',') },
                { char: ';',   len: howMany(data.urlText, ';') },
                { char: '\\t', len: howMany(data.urlText, '\\t') },
                { char: '\\n', len: howMany(data.urlText, '\\n') },
            ].forEach(h => {
                if (h.len >= tmp) {
                    tmp = h.len;
                    higher = h;
                }
            });

            console.log('HIGHER: ', higher)
            if (!higher) {
                higher = { char: '\\n', len: howMany(data.urlText, '\\n') }
            }
            let arr = data.urlText.split(new RegExp(higher.char)).filter((a => !!a.trim()));
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

    function checkUrl() {
        if (data.baseUrl) {
            isUrlFlag = isUrl(data.baseUrl);
        }
    }

    function isUrl(url) {
        try {
            let x = new URL(data.baseUrl);
            return true;

        } catch (error) {
            return false;
        }   
    }
</script>

<section>
    <h2>Sitemap</h2>
    <div class="ctt">
        
        <div>
            <div class="itemtitle">{$lang.sitemap.baseurl}</div>
            <div class:error={!isUrlFlag} class="baseurl">
                <input type="url" bind:value={data.baseUrl} on:blur={processURLs} on:input={checkUrl} />
                <i class="icon-bug"></i>
            </div>
        </div>
        <br>
        <div>
            <div class="itemtitle">{$lang.sitemap.otherurls}</div>
            <div class="subtitle">{$lang.sitemap.otherurlsdesc}</div>
            <textarea rows="10" on:blur={processURLs} bind:value={data.urlText}></textarea>
        </div>

        {#each data.urlArr as item}
            <div>
                <div class="full">
                    <div class="itemtitle">URL</div>
                    <input type="url" bind:value={item.url} on:input={changeMe} />                
                </div>
                <div class="divide">
                    <div>
                        <div class="itemtitle">{$lang.sitemap.lastmod}</div>
                        <input type="date" bind:value={item.lm} on:input={changeMe} />
                    </div>
                    <div>
                        <div class="itemtitle">{$lang.sitemap.freq}</div>
                        <select bind:value={item.change} on:input={changeMe}>
                            <option></option>
                            {#each Object.entries($lang.sitemap.freqlist) as [val, lbl]}
                                <option value="{val}">{lbl}</option>
                            {/each}
                        </select>
                    </div>     
                    <div>
                        <div class="itemtitle">{$lang.sitemap.prio}</div>
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
    .error {
        position: relative;
    }

    .error > input {
        border-right: 40px solid crimson;
    }
    .error > i {
        position: absolute;
        right: 12px;
        top: 11px;
        display: inline-block !important;
        color: #fff;
    }

    .baseurl > i {
        display: none;
    }


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