const FILLER = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';

const CAMERA_SVG = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`;

const PHOTO_PH = `<div class="photo-ph">${CAMERA_SVG}<span>Toca para agregar foto</span></div>`;

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const TEMPLATES = [
  {
    id: 'comercio',
    name: 'El Comercio',
    photoPrint: { top: 62, left: 5, width: 89, height: 79 },
    defaults: { caption: 'Kevin y Karie · 29 de mayo, 2026 · Quito, Ecuador' },
    articles: {
      futbol: {
        hl:    'Exceso de Talento Frustrado: El Casi-Futbolista Sale de su Retiro',
        subhl: 'Un hombre que "casi llegó" al fútbol profesional reaparece por primera vez desde que la vida tomó otras decisiones por él',
        byline:'POR NUESTRO CRONISTA DEPORTIVO · SECCIÓN NOSTALGIA',
        body:  'En lo que expertos califican como "el regreso más esperado desde el último regreso que nadie esperaba," este invitado a la boda de Kevin y Karie ha confirmado su asistencia, poniendo fin a años de retiro silencioso y autoimpuesto. Se trata de un hombre que, hasta el día de hoy, sigue completamente convencido de que el fútbol profesional es su destino. Una rodilla, un entrenador poco visionario, o simplemente la realidad, pensaron diferente. Las siguientes son declaraciones que se repetia en cada partido.',
        pq:    '"Yo habría llegado lejos. Lo que pasa es que el árbitro siempre me tenía pica."',
        body3: 'Este distinguido asistente planea demostrar que aún tiene lo que se necesita durante el baile, y no descarta organizar un partido informal "solo para los que saben jugar." Llegará con una lesión preexistente de la que hablará durante toda la cena. La novia ha declinado comentar. El novio ha pedido que alguien tenga a mano un botiquin.',
      },
      vip: {
        hl:    'La Invitada Llegó y Quito Ya No Es la Misma Ciudad',
        subhl: 'Testigos confirman que el outfit detuvo conversaciones, giró cabezas y colapsó el tráfico en redes sociales — todos hablando de ella.',
        byline:'POR NUESTRA CORRESPONSAL DE MODA · QUITO, ECUADOR',
        body:  'La llegada fue discreta solo en el sentido más técnico de la palabra. El outfit, descrito por testigos como "de otro nivel," generó de inmediato una ola de especulación sin precedentes. Fuentes exclusivas aseguran que la pieza fue diseñada especialmente para ella, encargada con meses de anticipación.',
        body2: 'Sin embargo, sectores del chisme organizado apuntan a que el pedido llegó en una bolsa de Temu con envío estándar de doce días. La verdad, como siempre, permanece en manos de quienes estuvieron presentes — y ellas no están hablando.',
        pq:    '"No voy a decir nada. Solo que cuando apareció, todos voltearon. Todos." — Testigo presencial que pidió reserva de identidad',
        body3: 'Lo que sí está confirmado por fuentes de absoluta confianza es que el outfit es completamente legítimo, que luce exactamente como debe lucir, y que el verdadero momento todavía no ha llegado. Quienes la conocen saben que la pista de baile es donde esta historia termina de contarse — y que lo que viene no tiene nombre aún, pero lo tendrá.',
      },
      sobriety: {
        hl:    'Invitado Local Jura No Beber Esta Noche — Sus Amigos No Le Creen',
        subhl: 'Un bar abierto se interpone entre él y sus sueños.',
        byline:'POR NUESTRA CORRESPONSAL SOCIAL · QUITO, ECUADOR',
        body:  'En una declaración que dejó atónitos a sus amigos, incluido a los novios, y provocó la carcajada de al menos un bartender, un invitado a la boda anunció esta mañana que no bebería esta noche. Ni una sola gota. Lo dijo muy en serio. Once minutos después de llegar, ya estaba en el bar. Los testigos confirman que fue un doble.',
        body2: 'Quienes lo conocen bien describen a un hombre de grandes intenciones y una sed aún más grande, alguien que ha hecho esta misma promesa en bodas, cumpleaños, y al menos una fiesta de oficina de la que nadie habla ya.',
        pq:    '"Hasta él mismo ya no se cree. Pero lo dice con confianza." — Un amigo de toda la vida',
        body3: 'La pista de baile también corre grave peligro. El invitado ha declarado públicamente que "no baila." El DJ ha sido informado. Al cierre de esta edición, fue visto estudiando el menú de cócteles con una concentración que no corresponde a alguien que supuestamente no prometió nada a nadie. ¿Logrará mantenerse sobrio? Con un bar abierto y personas que no ha visto en años — esta redacción le desea toda la suerte del mundo. La va a necesitar.',
      },
      fashion: {
        hl:    'Pareja Famosa Deslumbra en la Boda del Año — El Misterio del Outfit Se Profundiza',
        subhl: 'Temu no ha respondido a solicitudes de comentario.',
        byline:'POR NUESTRA CORRESPONSAL DE MODA · QUITO, ECUADOR',
        body:  'Una pareja famosa fue vista anoche en la boda más comentada de la temporada, y no llegaron para pasar desapercibidos. Los expertos de moda presentes reaccionaron de inmediato, describiendo sus atuendos como "piezas claramente originales," "de confección magistral," y "obra de un diseñador visionario."',
        body2: 'Sin embargo, rumores que circulan entre las mesas del fondo cuentan una historia muy diferente. Múltiples fuentes aseguran que los mismos atuendos están disponibles en Temu con envío estándar gratuito — y que el pedido llegó el día anterior a la boda.',
        pq:    '"Se veían increíbles. Eso es lo único que importa." — Testigo que prefirió no profundizar en el tema',
        body3: 'La pareja ha declinado comentar. Se veían increíbles de todas formas. La verdadera pregunta que todos se hacen no es de dónde vienen los atuendos — sino si sobrevivirán la pista de baile esta noche. La política de devoluciones de Temu ha sido revisada. Por si acaso.',
      },
    },
    render(photoUrl, edits = {}, articleToggle = 'vip') {
      const photo   = photoUrl ? `<img class="photo-img" src="${photoUrl}" alt="" />` : PHOTO_PH;
      const caption = esc(edits.caption || this.defaults.caption);
      const a       = this.articles[articleToggle] || this.articles.vip;
      const dropcap = esc(a.body[0]);
      const body1   = esc(a.body.slice(1));
      const body2   = a.body2 ? `<div class="com-para">${esc(a.body2)}</div>` : '';
      const body3   = a.body3 ? `<div class="com-para">${esc(a.body3)}</div>` : '';
      return `
        <div class="newspaper tpl-comercio">
          <div class="com-topbar">
            <span>0,65 d&oacute;lares &middot; A&ntilde;o 109 &middot; N&ordm; 40226 &middot; 34 p&aacute;ginas &middot; Segunda edici&oacute;n</span>
            <span>N&uacute;mero total de ejemplares: 64.400</span>
          </div>
          <div class="com-datebar">VIERNES 29 DE MAYO DEL 2026</div>
          <div class="com-masthead">EL COMERCIO</div>
          <div class="com-redrule"></div>
          <div class="com-metabar">
            <span>Viernes</span>
            <span class="com-metabar-center">Diario Independiente &middot; Fundado en 1906</span>
            <span>Edici&oacute;n Especial &middot; Ecuador</span>
          </div>
          <div class="com-body">
            <div class="com-left">
              <div class="com-photo-zone">
                <div class="photo-slot">${photo}</div>
              </div>
              <div class="com-caption" data-editable="caption">${caption}</div>
              <div class="com-drinks">
                <div class="com-drinks-head">La Carta de Esta Noche</div>
                <div class="com-drinks-subhead">Fuentes cercanas confirman que el bar est&aacute; completamente abastecido. Beba con dignidad. O no.</div>
                <div class="com-drink-item">
                  <div class="com-drink-name">Vodka &middot; &ldquo;Amor Delirante&rdquo;</div>
                  <div class="com-drink-desc">Suave, elegante, y responsable de al menos tres declaraciones que nadie recuerda haber hecho.</div>
                </div>
                <div class="com-drink-item">
                  <div class="com-drink-name">Tequila &middot; &ldquo;Blue Margarita&rdquo;</div>
                  <div class="com-drink-desc">Activa instintos de pista de baile. Consumir con precauci&oacute;n y calzado adecuado.</div>
                </div>
                <div class="com-drink-item com-drink-last">
                  <div class="com-drink-name">Ron &middot; &ldquo;Mojito&rdquo;</div>
                  <div class="com-drink-desc">Inocente en apariencia. El mojito es siempre el primero en llegar y el &uacute;ltimo en irse. Con menta, sin remordimientos.</div>
                </div>
            
              </div>
            </div>
            <div class="com-right">
              <div class="com-article">
                <div class="com-hl">${esc(a.hl)}</div>
                <div class="com-subhl">${esc(a.subhl)}</div>
                <div class="com-byline">${esc(a.byline)}</div>
                <div class="com-article-body">
                  <div class="com-para com-para-first"><span class="com-dropcap">${dropcap}</span>${body1}</div>
                  ${body2}
                  <div class="com-pullquote"><span class="com-pq-text">${esc(a.pq)}</span></div>
                  ${body3}
                </div>
              </div>
            </div>
          </div>
          <div class="com-bottom">
            <div class="com-tove-col">
              <div class="com-tove-inner">
                <img class="com-tove-photo" src="tove.jpg" alt="Tove" />
                <div class="com-tove-text">
                  <div class="com-tove-hl">Tove Sigue Durmiendo y Come Galletas Sin Parar</div>
                  <div class="com-tove-subhl">La labrador contin&uacute;a su agenda de siestas; los planes de reforma no avanzan</div>
                  <div class="com-tove-byline">CORRESPONSAL CANINO &middot; SECCI&Oacute;N SOCIEDAD</div>
                  <div class="com-tove-body">Fuentes confirman que Tove, labrador retriever amarilla, mantiene sin alteraciones su programa: dormir, comer galletas, y lanzarse encima de cualquier persona que tenga la ingenuidad de sentarse cerca de ella. Interrogada sobre si planea modificar su conducta, Tove no respondi&oacute;. Suspir&oacute; con profunda satisfacci&oacute;n existencial y continu&oacute; durmiendo.</div>
                  <div class="com-tove-closing">No estuvo disponible para declaraciones.</div>
                </div>
              </div>
            </div>
            <div class="com-dateblock">
              <div class="com-dateblock-num">29</div>
              <div class="com-dateblock-mid">&middot;05&middot;</div>
              <div class="com-dateblock-year">2026</div>
              <div class="com-dateblock-place">ECUADOR</div>
            </div>
            <div class="com-edition-col">
              <div class="com-edition-head">EDICI&Oacute;N ESPECIAL</div>
              <div class="com-edition-body">Hoy, 29 de mayo de 2026, El Comercio celebra junto a Kevin y Karie uno de los momentos m&aacute;s esperados del a&ntilde;o. Esta edici&oacute;n queda como testimonio de un d&iacute;a que sus familias, amigos, y una labrador que prefiri&oacute; no comentar, recordar&aacute;n por siempre.</div>
              <div class="com-edition-body">Que esta uni&oacute;n est&eacute; llena de amor, risas, y suficiente energ&iacute;a para aguantar a Tove encima del sof&aacute; por muchos a&ntilde;os m&aacute;s.</div>
              <div class="com-edition-closing">&mdash; La Redacci&oacute;n de El Comercio</div>
            </div>
          </div>
          <div class="com-footer">
            <span>El Comercio &middot; Edici&oacute;n Especial de Bodas &middot; Kevin &amp; Karie</span>
            <span>29.05.2026</span>
          </div>
        </div>`;
    }
  },

  {
    id: 'nytimes',
    name: 'The New York Times',
    photoPrint: { top: 67, left: 139, width: 60, height: 93 },
    defaults: {
      headline: 'Local Guest Photographed at Historic Quito Wedding',
      caption:  'Kevin & Karie · May 29, 2026 · Quito, Ecuador'
    },
    articles: {
      futbol: {
        hl:     'Former Near-Pro Footballer Ends Decade of Self-Imposed Retirement for One Historic Evening',
        sub:    'In what analysts are calling the comeback of the season, a guest whose career peaked between fourteen and nineteen makes his long-awaited reappearance',
        byline: 'By Our Sports Correspondent &middot; Nostalgia Section',
        col1:   `<p class="nyt-body-p nyt-body-p-first"><span class="nyt-dropcap">I</span>N what experts are describing as &ldquo;the comeback most anticipated since the last comeback nobody anticipated,&rdquo; this guest &mdash; whose football career burned bright somewhere between the ages of fourteen and nineteen before the universe made other arrangements &mdash; has confirmed his attendance at the wedding of Kevin and Karie, ending years of quiet, self-imposed retirement from social sporting events.</p><p class="nyt-body-p">A knee, an insufficiently visionary coach, or simply reality, thought differently. He has not specified which. He has, however, specified that he still has what it takes, and plans to demonstrate this on the dance floor before the evening is out.</p>`,
        col2:   `<p class="nyt-body-p">&ldquo;I would have gone far,&rdquo; he told no one in particular earlier this week. &ldquo;The referee simply had it out for me.&rdquo; He is expected to repeat this assessment several times during the reception dinner, at increasing volume.</p><p class="nyt-body-p">He arrives with a pre-existing injury he intends to discuss at considerable length. An informal match has been proposed for &ldquo;after the cake, for those who know what they&rsquo;re doing.&rdquo; The groom has quietly requested a first-aid kit within reach. The bride has declined to comment.</p>`,
      },
      vip: {
        hl:     'Guest\'s Arrival Halts Conversations, Redirects Attention Across the Venue',
        sub:    'Witnesses confirm the entrance was, technically, quiet &mdash; the outfit decidedly was not',
        byline: 'By Our Fashion Correspondent &middot; Quito Bureau',
        col1:   `<p class="nyt-body-p nyt-body-p-first"><span class="nyt-dropcap">Q</span>UITO, Ecuador &mdash; The arrival was, technically, quiet. The outfit was not. Witnesses described the ensemble as &ldquo;another level entirely,&rdquo; generating an immediate wave of speculation. Exclusive sources confirm the piece was designed specifically for her, commissioned months in advance.</p><p class="nyt-body-p">Sectors of organized gossip suggest the order arrived in a bag with standard twelve-day shipping. The truth, as always, remains with those who were present. They are not talking.</p>`,
        col2:   `<p class="nyt-body-p">What is confirmed by sources of absolute reliability is that the outfit is completely legitimate, that it looks exactly as it should, and that the real moment has not yet arrived. Those who know her understand that the dance floor is where this story finishes telling itself.</p><p class="nyt-body-p">The arrival generated immediate applause from all quarters. No further comment was available by press time. What happens on the dance floor is expected to be well-documented.</p>`,
      },
      fashion: {
        hl:     'Famous Couple Spotted at Wedding of the Year',
        sub:    'Temu has not responded to requests for comment.',
        byline: 'By Our Style Correspondent &middot; Quito Bureau',
        col1:   `<p class="nyt-body-p nyt-body-p-first"><span class="nyt-dropcap">A</span> FAMOUS couple was spotted last night attending the most talked-about wedding of the season, and they did not come to go unnoticed. Fashion experts on the scene were quick to react, describing their outfits as &ldquo;clearly original pieces,&rdquo; &ldquo;masterfully crafted,&rdquo; and &ldquo;the work of a visionary designer.&rdquo;</p><p class="nyt-body-p">Photographers fought for position. The couple moved through the venue with the serene confidence of two people who know exactly what they are doing and would like others to know it as well.</p>`,
        col2:   `<p class="nyt-body-p">However, rumors emerging from the back tables tell a very different story. Multiple sources claim the exact same outfits are currently available on Temu with free standard shipping &mdash; and that the order arrived the day before the wedding.</p><p class="nyt-body-p">The couple has declined to comment. They looked amazing either way. The real question on everyone&rsquo;s mind is not where the outfits came from &mdash; but whether they will survive the dance floor tonight. Temu&rsquo;s return policy has been reviewed. Just in case.</p>`,
      },
      galapagos: {
        hl:     'Family Survives Galapagos Trip; Barely',
        sub:    'No penguins were harmed. The sunscreen supply was not so lucky.',
        byline: 'By Our Travel Correspondent &middot; Pacific Islands Bureau',
        col1:   `<p class="nyt-body-p nyt-body-p-first"><span class="nyt-dropcap">G</span>AL&Aacute;PAGOS ISLANDS, Ecuador &mdash; In what experts are calling &ldquo;a bold pre-wedding decision,&rdquo; the bride&rsquo;s family traveled to the Gal&aacute;pagos Islands days before the ceremony, returning sunburned, overwhelmed, and somehow more excited than when they left.</p><p class="nyt-body-p">The group reportedly applied sunscreen at levels not seen since the invention of sunscreen. Dermatologists described the effort as &ldquo;heroic,&rdquo; adding that the dresses will be fine, probably, and that aloe vera was likely involved.</p>`,
        col2:   `<p class="nyt-body-p">Wildlife encounters were reported throughout the trip. However, in a development that surprised many, no penguins attacked anyone. Not a single one. The penguins, known for their bold personalities and complete disregard for personal space, reportedly made eye contact and moved on. Authorities consider this a miracle.</p><p class="nyt-body-p">The family has since arrived at the wedding venue, fully hydrated, and ready to dance. The penguins were not invited. They did not take it well.</p>`,
      },
      sobriety: {
        hl:     'Local Guest Vows Sobriety Tonight - Sources Are Not Convinced',
        sub:    'An open bar stands between him and his dreams.',
        byline: 'By Our Social Correspondent &middot; Quito Bureau',
        col1:   `<p class="nyt-body-p nyt-body-p-first"><span class="nyt-dropcap">Q</span>UITO, Ecuador &mdash; In a statement that stunned friends, included the newlyweds, and caused at least one bartender to laugh out loud, a wedding guest announced earlier today that he would not be drinking tonight. Not a single drop. He was very clear about this.</p><p class="nyt-body-p">He was at the bar eleven minutes after arriving. Witnesses confirm it was a double.</p><p class="nyt-body-p">Those close to the guest describe a man of great intentions and even greater thirst </p>`,
        col2:   `<p class="nyt-body-p">The dance floor, sources say, is also at serious risk. The guest has publicly stated he &ldquo;doesn&rsquo;t really dance.&rdquo; The DJ has been warned.</p><p class="nyt-body-p">At press time, the guest was seen studying the cocktail menu with the focus and dedication of a man who had definitely not promised anything to anyone. The open bar was unavailable for comment. It was very busy.</p><p class="nyt-body-p">Will he achieve sobriety tonight? With an open bar, and people he hasn&rsquo;t seen in years &mdash; this publication wishes him nothing but luck. He is going to need all of it.</p>`,
      },
    },
    render(photoUrl, edits = {}, articleToggle = 'futbol') {
      const photo   = photoUrl ? `<img class="photo-img" src="${photoUrl}" alt="" />` : PHOTO_PH;
      const hl      = esc(edits.headline || this.defaults.headline);
      const caption = esc(edits.caption  || this.defaults.caption);
      const a       = this.articles[articleToggle] || this.articles.futbol;
      return `
        <div class="newspaper tpl-nytimes">

          <div class="nyt-topbar">
            <span class="nyt-motto">&ldquo;All the News That&rsquo;s Fit to Print&rdquo;</span>
            <span class="nyt-late-ed">Late Edition</span>
          </div>
          <div class="nyt-hrule nyt-hrule-thick"></div>
          <img class="nyt-masthead" src="TNYT.png" alt="The New York Times" />
          <div class="nyt-hrule nyt-hrule-thick"></div>
          <div class="nyt-metabar">
            <span>VOL. CLIV&nbsp;.&nbsp;.&nbsp;.&nbsp;No.&nbsp;40,340</span>
            <span>FRIDAY, MAY 29, 2026</span>
            <span>$4.00</span>
          </div>
          <div class="nyt-hrule"></div>

          <div class="nyt-upper">
            <div class="nyt-mainstory">
              <div class="nyt-main-hl">${esc(a.hl)}</div>
              <div class="nyt-main-sub">${a.sub}</div>
              <div class="nyt-hrule"></div>
              <div class="nyt-byline-row">${a.byline}</div>
              <div class="nyt-mainstory-cols">
                <div class="nyt-mainstory-col">${a.col1}</div>
                <div class="nyt-vcol-rule"></div>
                <div class="nyt-mainstory-col">${a.col2}</div>
              </div>
            </div>
            <div class="nyt-vcol-rule"></div>
            <div class="nyt-photocol">
              <div class="nyt-photocol-hl" data-editable="headline">${hl}</div>
              <div class="nyt-hrule"></div>
              <div class="photo-slot nyt-photo-slot">${photo}</div>
              <div class="nyt-photocol-caption" data-editable="caption">${caption}</div>
            </div>
          </div>

          <div class="nyt-hrule"></div>

          <div class="nyt-lower">
            <div class="nyt-lower-col">
              <div class="nyt-col-hl">Labrador Maintains Full Napping Schedule; Cookie Intake Rises Sharply</div>
              <div class="nyt-byline-row">Canine Correspondent &middot; Domestic</div>
              <div class="nyt-hrule"></div>
              <img class="nyt-tove" src="tove.jpg" alt="Tove" />
              <p class="nyt-body-p nyt-body-p-first">Sources confirm that Tove, a yellow Labrador retriever, has made zero adjustments to her established schedule in light of today&rsquo;s events. The program &mdash; developed over years of careful iteration &mdash; consists of sleeping, consuming snacks, and situating herself atop any seated person within range. She was unavailable for comment. She was sleeping.</p>
            </div>
            <div class="nyt-vcol-rule"></div>
            <div class="nyt-lower-col">
              <div class="nyt-col-hl">Tonight&rsquo;s Bar Report</div>
              <div class="nyt-byline-row">Beverages Correspondent &middot; Special Report</div>
              <div class="nyt-hrule"></div>
              <div class="nyt-drink-item">
                <div class="nyt-drink-name">Vodka &middot; &ldquo;Amor Delirante&rdquo;</div>
                <div class="nyt-drink-desc">Smooth, elegant, and responsible for at least three declarations nobody remembers making.</div>
              </div>
              <div class="nyt-drink-item">
                <div class="nyt-drink-name">Tequila &middot; &ldquo;Blue Margarita&rdquo;</div>
                <div class="nyt-drink-desc">Activates dance floor instincts. Consume with caution and appropriate footwear.</div>
              </div>
              <div class="nyt-drink-item nyt-drink-last">
                <div class="nyt-drink-name">Ron &middot; &ldquo;Mojito&rdquo;</div>
                <div class="nyt-drink-desc">Innocent in appearance. Always first to arrive and last to leave. With mint, without regrets.</div>
              </div>
              <div class="nyt-hrule" style="margin:4px 0"></div>
              <p class="nyt-body-p nyt-body-p-first">Today, May 29, 2026, The New York Times joins Kevin and Karie in celebrating one of the most anticipated moments of the year. This edition stands as a testament to a day that their families and friends, will remember forever.</p>
              <p class="nyt-body-p">May this union be filled with love, laughter, and enough energy to take care of Tove for many years to come.</em></p>
            </div>
          </div>

          <div class="nyt-footer-bar">
            <span>Kevin &amp; Karie &middot; Wedding Edition &middot; May 29, 2026</span>
            <span class="nyt-page-tag">A1</span>
          </div>

        </div>`;
    }
  }
];
