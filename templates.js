const FILLER = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const TEMPLATES = [
  {
    id: 'gaceta',
    name: 'La Gaceta de la Boda',
    defaultHeadline: 'Titular de ejemplo para La Gaceta de la Boda',
    render(photoUrl, headline) {
      const photo = photoUrl
        ? `<img class="photo-img" src="${photoUrl}" alt="" />`
        : `<div class="photo-ph"><span>Foto aquí</span></div>`;
      const hl = esc(headline || this.defaultHeadline);
      const f = FILLER.repeat(4);
      return `
        <div class="newspaper tpl-gaceta">
          <div class="gac-content">
            <div class="gac-topbar">Edición Especial &nbsp;·&nbsp; Noticias de la Boda &nbsp;·&nbsp; Año I &nbsp;·&nbsp; Núm. 1</div>
            <div class="gac-r"></div>
            <div class="gac-rh"></div>
            <div class="gac-masthead">La Gaceta de la Boda</div>
            <div class="gac-rh"></div>
            <div class="gac-r"></div>
            <div class="gac-dateline">29 de Mayo de 2026 &nbsp;&middot;&nbsp; Ecuador &nbsp;&middot;&nbsp; Edición Especial</div>
            <div class="gac-r"></div>
            <div class="gac-sp"></div>
            <div class="gac-hl">${hl}</div>
            <div class="gac-subhl">Titular de ejemplo para siempre</div>
            <div class="gac-r"></div>
            <div class="gac-body">
              <div class="gac-col-l">
                <div class="gac-chead">Texto de<br>ejemplo<br>aquí</div>
                <div>${f}</div>
              </div>
              <div class="gac-col-c">
                <div class="photo-slot">${photo}</div>
              </div>
              <div class="gac-col-r">
                <div class="gac-chead">Texto de<br>ejemplo<br>aquí</div>
                <div>${f}</div>
              </div>
            </div>
            <div class="gac-r"></div>
            <div class="gac-bottom">
              <div class="gac-venue">
                <div class="gac-venue-head">Texto de ejemplo</div>
                <div class="gac-venue-img">Imagen decorativa</div>
              </div>
              <div class="gac-date-block">
                <span class="gac-date-pre">29 de</span>
                <span class="gac-date-big">Mayo,</span>
                <span class="gac-date-year">2026</span>
              </div>
            </div>
          </div>
        </div>`;
    }
  },

  {
    id: 'universo',
    name: 'El Universo',
    defaultHeadline: 'Titular de ejemplo para El Universo',
    render(photoUrl, headline) {
      const photo = photoUrl
        ? `<img class="photo-img" src="${photoUrl}" alt="" />`
        : `<div class="photo-ph"><span>Foto aquí</span></div>`;
      const hl = esc(headline || this.defaultHeadline);
      const f = FILLER.repeat(4);
      return `
        <div class="newspaper tpl-universo">
          <div class="uni-toprow">
            <span>Diario Independiente &#9733; Fundado en 1921</span>
            <span>N&ordm; 30.000</span>
          </div>
          <div class="uni-masthead">El Universo</div>
          <div class="uni-metarow">
            <span>Viernes</span>
            <span>Edici&oacute;n Especial &ndash; Ecuador</span>
            <span>29 de Mayo, 2026</span>
          </div>
          <div class="uni-breaking">&#161;Texto de Ejemplo!</div>
          <div class="uni-hl">${hl}</div>
          <div class="uni-subhl">Subtítulo de ejemplo aquí</div>
          <div class="uni-body">
            <div class="uni-photo-col">
              <div class="photo-slot">${photo}</div>
            </div>
            <div class="uni-story-col">
              <div class="uni-story-head">Texto de ejemplo</div>
              <div class="uni-story-sub">Subtítulo de ejemplo</div>
              <div class="uni-story-text">${f}</div>
            </div>
          </div>
          <div class="uni-rule"></div>
          <div class="uni-bottom">
            <div class="uni-details">
              <div class="uni-details-head">Detalles de Ejemplo</div>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Sed do eiusmod tempor</li>
              </ul>
            </div>
            <div class="uni-date-block">
              <div class="uni-date-main">29 &middot; 05<br>2026</div>
              <div class="uni-date-place">Ecuador</div>
            </div>
            <div class="uni-edition">
              <div class="uni-edition-head">Edición Especial</div>
              <div class="uni-edition-text">${f}</div>
            </div>
          </div>
        </div>`;
    }
  },

  {
    id: 'nytimes',
    name: 'The New York Times',
    defaultHeadline: 'Titular de ejemplo para The New York Times',
    render(photoUrl, headline) {
      const photo = photoUrl
        ? `<img class="photo-img" src="${photoUrl}" alt="" />`
        : `<div class="photo-ph"><span>Photo Here</span></div>`;
      const hl = esc(headline || this.defaultHeadline);
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
          <div class="nyt-hl">${hl}</div>
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
              <div class="nyt-caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
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
