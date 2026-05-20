const state = {
  template:         null,
  photoDataUrl:     null,
  photoPositionX:   50,   // object-position percentage, 0–100
  photoPositionY:   50,
  edits:            {},
  articleToggle:    'vip',
  // view transform (canvas zoom/pan)
  fitScale:         1,
  viewScale:        1,
  viewPanX:         0,
  viewPanY:         0,
};

const NEWSPAPER_W = 360;
const NEWSPAPER_H = 509;
const EDITOR_W    = NEWSPAPER_W * 2; // zoom:2 on #editorNewspaper → 720px effective
const EDITOR_H    = NEWSPAPER_H * 2;
const SCALE_STEP  = 0.1;

const LS_GUEST_PHOTO = 'guest_photo';

const $ = (id) => document.getElementById(id);

/* ── Step navigation ── */
function showStep(id) {
  document.querySelectorAll('.step').forEach((el) => {
    el.dataset.active = el.id === id ? 'true' : 'false';
  });
  if (id !== 'stepEditor') window.scrollTo(0, 0);
}

/* ── Template picker cards ── */
function scaleCard(wrap) {
  const inner = wrap.querySelector('.tplCardInner');
  const w = wrap.clientWidth;
  if (!w) return;
  const scale = w / NEWSPAPER_W;
  inner.style.transform = `scale(${scale})`;
  wrap.style.height = Math.round(NEWSPAPER_H * scale) + 'px';
}

function renderTemplateGrid() {
  const grid = $('templateGrid');
  grid.innerHTML = '';
  TEMPLATES.forEach((t) => {
    const item = document.createElement('div');
    item.className = 'tplCardItem';

    const wrap = document.createElement('button');
    wrap.className = 'tplCardWrap';
    wrap.setAttribute('aria-label', t.name);

    const inner = document.createElement('div');
    inner.className = 'tplCardInner';
    inner.innerHTML = t.render(null, {});
    wrap.appendChild(inner);
    wrap.addEventListener('click', () => openEditor(t));

    const label = document.createElement('p');
    label.className = 'tplCardLabel';
    label.textContent = t.name;

    item.appendChild(wrap);
    item.appendChild(label);
    grid.appendChild(item);
  });

  requestAnimationFrame(() => {
    grid.querySelectorAll('.tplCardWrap').forEach(scaleCard);
  });
}

/* ── Editor ── */
function openEditor(template) {
  state.template       = template;
  state.photoDataUrl   = null;
  localStorage.removeItem(LS_GUEST_PHOTO); // fresh start per guest
  state.photoPositionX = 50;
  state.photoPositionY = 50;
  state.edits          = {};
  state.articleToggle  = 'vip';
  $('editorTitle').textContent = template.name;
  $('photoControls').removeAttribute('hidden');
  if (template.id === 'comercio' || template.id === 'nytimes') {
    $('editorArticleBar').removeAttribute('hidden');
    syncArticleBar();
  } else {
    $('editorArticleBar').setAttribute('hidden', '');
  }
  refreshEditor();
  showStep('stepEditor');
  requestAnimationFrame(initEditorView);
}

function initEditorView() {
  const canvas = $('editorCanvas');
  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;
  const s  = Math.min(cw * 0.92 / EDITOR_W, 1.0);
  state.fitScale  = s;
  state.viewScale = 1;
  state.viewPanX  = Math.round((cw - EDITOR_W * s) / 2);
  state.viewPanY  = Math.max(20, Math.round((ch - EDITOR_H * s) / 2));
  $('editorNewspaper').style.marginLeft = '';
  applyViewTransform(false);
  syncBottomBar();
}

function applyViewTransform(animated) {
  const s  = state.fitScale * state.viewScale;
  const el = $('editorNewspaper');
  el.style.transition = animated ? 'transform 0.25s ease' : '';
  el.style.transform  = `translate(${state.viewPanX}px, ${state.viewPanY}px) scale(${s})`;
}

function zoomAround(cx, cy, ratio) {
  const newScale = Math.max(0.5, Math.min(2.0, state.viewScale * ratio));
  const oldS = state.fitScale * state.viewScale;
  const newS = state.fitScale * newScale;
  state.viewPanX  = cx + (state.viewPanX - cx) * (newS / oldS);
  state.viewPanY  = cy + (state.viewPanY - cy) * (newS / oldS);
  state.viewScale = newScale;
  applyViewTransform(false);
  syncBottomBar();
}

function resetViewToFit() {
  const canvas = $('editorCanvas');
  state.viewScale = 1;
  state.viewPanX  = Math.round((canvas.clientWidth  - EDITOR_W * state.fitScale) / 2);
  state.viewPanY  = Math.max(20, Math.round((canvas.clientHeight - EDITOR_H * state.fitScale) / 2));
  applyViewTransform(true);
  syncBottomBar();
}

function syncArticleBar() {
  $('editorArticleBar').querySelectorAll('[data-toggle]').forEach((btn) => {
    btn.classList.toggle('eabActive', btn.dataset.toggle === state.articleToggle);
  });
}

function syncBottomBar() {
  $('photoChangeBtn').innerHTML = state.photoDataUrl
    ? '&#128247; Cambiar foto'
    : '&#128247; Agregar foto';
  $('scaleLabel').textContent = Math.round(state.viewScale * 100) + '%';
}

function refreshEditor() {
  const el = $('editorNewspaper');
  if (!state.template) return;
  el.innerHTML = state.template.render(state.photoDataUrl, state.edits, state.articleToggle);
  updateEditorPhotoPosition();
  makeEditable();
  injectPhotoOverlay();
}

/* ── Tap-to-edit ── */
function makeEditable() {
  $('editorNewspaper').querySelectorAll('[data-editable]').forEach((node) => {
    const field = node.dataset.editable;
    node.contentEditable = 'true';
    node.spellcheck = false;
    if (state.edits[field] !== undefined) node.innerText = state.edits[field];
    node.addEventListener('input', () => { state.edits[field] = node.innerText; });
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); node.blur(); }
    });
  });
}

/* ── Photo positioning ── */
function updateEditorPhotoPosition() {
  const img = document.querySelector('#editorNewspaper .photo-slot .photo-img');
  if (img) img.style.objectPosition = `${state.photoPositionX}% ${state.photoPositionY}%`;
}

/* Overlay "Cambiar foto" button on top of a loaded photo — injected via JS so it never
   appears in the print sheet (which is rendered separately by buildPrintSheet). */
function injectPhotoOverlay() {
  if (!state.photoDataUrl) return;
  const slot = document.querySelector('#editorNewspaper .photo-slot');
  if (!slot) return;
  const btn = document.createElement('button');
  btn.className = 'photoOverlayBtn';
  btn.setAttribute('aria-label', 'Cambiar foto');
  btn.innerHTML = '&#128247; Cambiar';
  btn.addEventListener('pointerdown', (e) => e.stopPropagation());
  btn.addEventListener('click', () => $('editorPhotoInput').click());
  slot.appendChild(btn);
}


/* ── Photo upload ── */
function wirePhotoUpload() {
  $('editorCanvas').addEventListener('click', (e) => {
    if (e.target.closest('.photo-ph')) $('editorPhotoInput').click();
  });

  $('editorArticleBar').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-toggle]');
    if (!btn) return;
    state.articleToggle = btn.dataset.toggle;
    syncArticleBar();
    refreshEditor();
  });

  $('editorPhotoInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      state.photoDataUrl   = ev.target.result;
      localStorage.setItem(LS_GUEST_PHOTO, ev.target.result); // FIX 6
      state.photoPositionX = 50;
      state.photoPositionY = 50;
      refreshEditor();
      syncBottomBar();
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });
}


/* ── Photo drag-to-reposition ── */
function wirePhotoDrag() {
  const canvas = $('editorCanvas');

  canvas.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.photo-img') || !state.photoDataUrl) return;

    const img  = e.target.closest('.photo-img');
    const slot = img.closest('.photo-slot');
    const rect = slot.getBoundingClientRect();   // already accounts for all nested scales
    const startX  = state.photoPositionX;
    const startY  = state.photoPositionY;
    const startPX = e.clientX;
    const startPY = e.clientY;

    canvas.setPointerCapture(e.pointerId);

    const onMove = (ev) => {
      const dx = ev.clientX - startPX;
      const dy = ev.clientY - startPY;
      // Drag right → reveal left side of image → decrease objectPosition X
      state.photoPositionX = Math.max(0, Math.min(100, startX - (dx / rect.width)  * 100));
      state.photoPositionY = Math.max(0, Math.min(100, startY - (dy / rect.height) * 100));
      img.style.objectPosition = `${state.photoPositionX}% ${state.photoPositionY}%`;
      ev.preventDefault();
    };

    const onEnd = () => {
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup',   onEnd);
    };

    canvas.addEventListener('pointermove', onMove, { passive: false });
    canvas.addEventListener('pointerup',   onEnd);
  });
}

/* ── Zoom and pan gestures ── */
function wireGestures() {
  const canvas = $('editorCanvas');
  const pointers = {};
  let lastPinchDist = null;
  let lastTap       = 0;
  let dragStart     = null;
  let isPanning     = false;

  canvas.addEventListener('pointerdown', (e) => {
    // Let contenteditable, photo-ph, and photo-img handle their own interactions
    if (
      e.target.closest('[contenteditable]') ||
      e.target.closest('.photo-ph') ||
      e.target.closest('.photo-img') ||
      e.target.closest('.photoOverlayBtn')
    ) return;

    pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    const count = Object.keys(pointers).length;

    if (count === 1) {
      const now = Date.now();
      if (now - lastTap < 300) { resetViewToFit(); lastTap = 0; return; }
      lastTap   = now;
      dragStart = { x: e.clientX, y: e.clientY, panX: state.viewPanX, panY: state.viewPanY };
      isPanning = false;
    } else if (count === 2) {
      dragStart = null;
      const pts = Object.values(pointers);
      lastPinchDist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
    }
  });

  canvas.addEventListener('pointermove', (e) => {
    if (!pointers[e.pointerId]) return;
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    const pts = Object.values(pointers);

    if (pts.length >= 2) {
      const dist = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      if (lastPinchDist) {
        const cx = (pts[0].x + pts[1].x) / 2;
        const cy = (pts[0].y + pts[1].y) / 2;
        zoomAround(cx, cy, dist / lastPinchDist);
      }
      lastPinchDist = dist;
      e.preventDefault();
    } else if (pts.length === 1 && dragStart) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      if (!isPanning && Math.hypot(dx, dy) > 5) {
        isPanning = true;
        canvas.setPointerCapture(e.pointerId);
        canvas.classList.add('grabbing');
      }
      if (isPanning) {
        state.viewPanX = dragStart.panX + dx;
        state.viewPanY = dragStart.panY + dy;
        applyViewTransform(false);
        e.preventDefault();
      }
    }
  }, { passive: false });

  const endPointer = (e) => {
    delete pointers[e.pointerId];
    if (Object.keys(pointers).length === 0) {
      lastPinchDist = null;
      dragStart     = null;
      isPanning     = false;
      canvas.classList.remove('grabbing');
    }
  };
  canvas.addEventListener('pointerup',     endPointer);
  canvas.addEventListener('pointercancel', endPointer);

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    zoomAround(e.clientX, e.clientY, e.deltaY < 0 ? 1.08 : 0.93);
  }, { passive: false });
}

/* ── Print ── */
function setPrintVars(p) {
  const s = document.documentElement.style;
  s.setProperty('--photo-top',    p.top    + 'mm');
  s.setProperty('--photo-left',   p.left   + 'mm');
  s.setProperty('--photo-width',  p.width  + 'mm');
  s.setProperty('--photo-height', p.height + 'mm');
}

function buildTemplateSheet() {
  const { template, edits, articleToggle } = state;
  $('printSheet').innerHTML =
    `<div class="print-template">${template.render(null, edits, articleToggle)}</div>`;
}

function buildFullSheet() {
  const { template, photoDataUrl, photoPositionX, photoPositionY, edits, articleToggle } = state;
  $('printSheet').innerHTML =
    `<div class="print-template">${template.render(photoDataUrl, edits, articleToggle)}</div>`;
  const img = $('printSheet').querySelector('.photo-slot .photo-img');
  if (img) img.style.objectPosition = `${photoPositionX}% ${photoPositionY}%`;
}

function buildPrintSheet() {
  const { template, photoDataUrl, photoPositionX, photoPositionY } = state;
  setPrintVars(template.photoPrint);
  $('printSheet').innerHTML = photoDataUrl
    ? `<img class="print-photo" src="${photoDataUrl}" style="object-position:${photoPositionX}% ${photoPositionY}%" alt="" />`
    : '';
}

/* ── Wire events ── */
function wireEvents() {
  $('editorBack').addEventListener('click', () => {
    $('photoControls').setAttribute('hidden', '');
    $('editorArticleBar').setAttribute('hidden', '');
    showStep('stepTemplate');
  });

  $('editorTemplatePrint').addEventListener('click', () => {
    buildTemplateSheet();
    window.print();
  });

  $('editorFullPrint').addEventListener('click', () => {
    if (!state.photoDataUrl) { alert('Agrega una foto antes de imprimir completo.'); return; }
    buildFullSheet();
    window.print();
  });

  $('editorPrint').addEventListener('click', () => {
    if (!state.photoDataUrl) { alert('Agrega una foto antes de imprimir.'); return; }
    const btn = $('editorPrint');
    btn.textContent = 'Imprimiendo...';
    btn.disabled = true;
    setTimeout(() => {
      buildPrintSheet();
      window.print();
      btn.textContent = 'Imprimir';
      btn.disabled = false;
    }, 1500);
  });

$('photoChangeBtn').addEventListener('click', () => $('editorPhotoInput').click());

  $('scaleUp').addEventListener('click', () => {
    const c = $('editorCanvas');
    zoomAround(c.clientWidth / 2, c.clientHeight / 2, 1 + SCALE_STEP);
  });
  $('scaleDown').addEventListener('click', () => {
    const c = $('editorCanvas');
    zoomAround(c.clientWidth / 2, c.clientHeight / 2, 1 - SCALE_STEP);
  });

  wirePhotoUpload();
  wirePhotoDrag();
  wireGestures();
}

window.addEventListener('resize', () => {
  document.querySelectorAll('.tplCardWrap').forEach(scaleCard);
  if ($('stepEditor').dataset.active === 'true') initEditorView();
});

renderTemplateGrid();
wireEvents();
