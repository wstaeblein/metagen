export default async (request, context) => {
    const url = new URL(request.url);
  
    // Look for the home page
    if (url.pathname != '/') { return; }
  
    // Get lang
    const langTag = request.headers.get('accept-language').split(';').shift();
    const lang = langTag.split('-').shift().toLowerCase();

    console.log('LANG: ', langTag, lang)

    // If language isn't matched, return in english
    let title = 'Metatags, sitemaps and manifest generator';
    let desc = 'Generate more traffic by creating meta tags, sitemaps and web manifests correctly with this free and complete app';

    switch (lang) {
        case 'pt':
            title = 'Gerador de meta tags, sitemaps e manifestos da web';
            desc = 'Gere mais tráfego criando meta tags, sitemaps e manifestos da web corretamente com este aplicativo 100% gratuito e completo';
            break;

        case 'es':
            title = 'Generador de metaetiquetas, mapas de sitio y manifiestos web';
            desc = 'Genere más tráfico creando metaetiquetas, mapas de sitios y manifiestos web correctamente con esta aplicación 100% gratuita y completa';
            break;    
            
        case 'fr':
            title = 'Gestionnaire de balises méta, plans de site et manifestes du Web';
            desc = 'Générez plus de trafic en créant correctement des balises méta, des plans de site et des manifestes Web avec cette application 100% gratuite et complète';
            break;
            
        case 'de':
            title = 'Generieren Sie Metatags, Sitemaps und Webmanifeste';
            desc = 'Generieren Sie mehr Verkehr, indem Sie Meta-Tags, Sitemaps und Web-Manifeste mit dieser 100 % kostenlosen und vollständigen App richtig erstellen';
            break;
    }

    const response = await context.next();
    let html = await response.text();
  
    html = html.replace(/\$\$\$LANG\$\$\$/g, lang).replace(/\$\$\$TITLE\$\$\$/g, title).replace(/\$\$\$DESC\$\$\$/g, desc).replace(/\$\$\$LANGTAG\$\$\$/g, langTag);
  
    // Return the response
    return new Response(updatedPage, response);
};