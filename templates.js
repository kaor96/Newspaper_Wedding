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
    photoPrint: { top: 53, left: 5, width: 88, height: 69 },
    defaults: { caption: 'Kevin y Karie · 29 de mayo, 2026 · Quito, Ecuador' },
    articles: {
      futbol: {
        hl:    'Exceso de Talento Frustrado: El Casi-Futbolista Sale de su Retiro',
        subhl: 'Un hombre que "casi llegó" al fútbol profesional reaparece por primera vez desde que la vida tomó otras decisiones por él',
        byline:'POR NUESTRO CRONISTA DEPORTIVO · SECCIÓN NOSTALGIA',
        body:  'En lo que expertos califican como "el regreso más esperado desde el último regreso que nadie esperaba," este invitado a la boda de Kevin y Karie ha confirmado su asistencia, poniendo fin a años de retiro silencioso y autoimpuesto. Se trata de un hombre que, entre los 14 y los 19 años, estuvo convencido de que el fútbol profesional era su destino. Una rodilla, un entrenador poco visionario, o simplemente la realidad, pensaron diferente.',
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
                  <div class="com-tove-hl">Tove Sigue Durmiendo y Come Galletas Sin Disculparse</div>
                  <div class="com-tove-subhl">La labrador contin&uacute;a su agenda de siestas; los planes de reforma no avanzan</div>
                  <div class="com-tove-byline">CORRESPONSAL CANINO &middot; SECCI&Oacute;N SOCIEDAD</div>
                  <div class="com-tove-body">Fuentes confirman que Tove, labrador retriever amarilla, mantiene sin alteraciones su programa: dormir, comer galletas, y lanzarse encima de cualquier persona que tenga la ingenuidad de sentarse cerca de ella. Interrogada sobre si planea modificar su conducta con motivo de la boda, Tove no respondi&oacute;. Suspir&oacute; con profunda satisfacci&oacute;n existencial y continu&oacute; durmiendo.</div>
                  <div class="com-tove-closing">No estuvo disponible para declaraciones. Estaba durmiendo.</div>
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
    defaultHeadline: 'Titular de ejemplo para The New York Times',
    photoPrint: { top: 67, left: 139, width: 60, height: 105 },
    defaults: {
      headline: 'Titular de ejemplo para The New York Times',
      caption:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    render(photoUrl, edits = {}) {
      const photo   = photoUrl ? `<img class="photo-img" src="${photoUrl}" alt="" />` : PHOTO_PH;
      const hl      = esc(edits.headline || this.defaults.headline);
      const caption = esc(edits.caption  || this.defaults.caption);
      const f = FILLER.repeat(5);
      return `
        <div class="newspaper tpl-nytimes">
          <div class="nyt-top">
            <span>All the News That&rsquo;s Fit to Print</span>
            <span>May 29, 2026</span>
          </div>
          <div class="nyt-r"></div>
          <div class="nyt-rh"></div>
          <div class="nyt-masthead">The New York Times</div>
          <div class="nyt-rh"></div>
          <div class="nyt-r"></div>
          <div class="nyt-meta">
            <span>VOL. CLIV . . . No. 40,340</span>
            <span>FRIDAY, MAY 29, 2026</span>
            <span>$4.00</span>
          </div>
          <div class="nyt-r"></div>
          <div class="nyt-sp"></div>
          <div class="nyt-hl" data-editable="headline">${hl}</div>
          <div class="nyt-r"></div>
          <div class="nyt-body">
            <div class="nyt-body-left">
              <div class="nyt-txt-col">
                <div class="nyt-col-head">Lorem ipsum dolor sit.</div>
                <div class="nyt-col-text">${f}</div>
              </div>
              <div class="nyt-txt-col">
                <div class="nyt-col-head">Consectetur adipiscing.</div>
                <div class="nyt-col-text">${f}</div>
              </div>
            </div>
            <div class="nyt-body-right">
              <div class="photo-slot">${photo}</div>
              <div class="nyt-caption" data-editable="caption">${caption}</div>
            </div>
          </div>
          <div class="nyt-r"></div>
          <div class="nyt-lower">
            <div class="nyt-lower-col">
              <div class="nyt-lower-head">Lorem ipsum dolor.</div>
              <div class="nyt-lower-text">${f}</div>
            </div>
            <div class="nyt-lower-col">
              <div class="nyt-lower-head">Consectetur adipiscing.</div>
              <div class="nyt-lower-text">${f}</div>
            </div>
            <div class="nyt-lower-col">
              <div class="nyt-lower-head">Sed do eiusmod.</div>
              <div class="nyt-lower-text">${f}</div>
            </div>
          </div>
          <div class="nyt-venue">Venue Photo</div>
        </div>`;
    }
  }
];
