const state = {
  template:    null,
  photoDataUrl: null,
  headline:    '',
  photoScale:  1,
  photoPanX:   0,
  photoPanY:   0
};

const NEWSPAPER_W = 360;
const NEWSPAPER_H = 509;

const $ = (id) => document.getElementById(id);

/* ── Step navigation ── */
function showStep(id) {
  document.querySelectorAll('.step').forEach((el) => {
    el.dataset.active = el.id === id ? 'true' : 'false';
  });
  window.scrollTo(0, 0);
}

/* ── Template picker ── */
function renderTemplateGrid() {
  const grid = $('templateGrid');
  grid.innerHTML = '';
  TEMPLATES.forEach((t) => {
    const wrap = document.createElement('button');
    wrap.className = 'tplCardWrap';
    wrap.setAttribute('aria-label', t.name);

    const inner = document.createElement('div');
    inner.className = 'tplCardInner';
    inner.innerHTML = t.render(null, t.defaultHeadline);

    wrap.appendChild(inner);
    wrap.addEventListener('click', () => {
      state.template = t;
      state.photoDataUrl = null;
      state.headline = '';
      state.photoScale = 1;
      state.photoPanX = 0;
      state.photoPanY = 0;
      $('photoInput').value = '';
      $('photoDropLabel').textContent = 'Tomar o elegir foto';
      document.querySelector('.photoDrop').classList.remove('hasPhoto');
      document.querySelector('.photoDrop').style.backgroundImage = '';
      showStep('stepPhoto');
    });
    grid.appendChild(wrap);
  });
}

/* ── Preview rendering ── */
function refreshPreview() {
  const wrap  = $('previewWrap');
  const inner = $('previewInner');
  if (!state.template) return;

  const hl = state.headline || state.template.defaultHeadline;
  inner.innerHTML = state.template.render(state.photoDataUrl, hl);

  const scale = wrap.clientWidth / NEWSPAPER_W;
  inner.style.transform = `scale(${scale})`;
  wrap.style.height = Math.round(NEWSPAPER_H * scale) + 'px';

  updatePhotoTransform();
}

function updatePhotoTransform() {
  const img = document.querySelector('#previewInner .photo-slot .photo-img');
  if (img) {
    img.style.transform = `scale(${state.photoScale}) translate(${state.photoPanX}px, ${state.photoPanY}px)`;
  }
}

/* ── Print ── */
function buildPrintSheet() {
  const sheet = $('printSheet');
  const hl = state.headline || state.template.defaultHeadline;
  sheet.innerHTML = state.template.render(state.photoDataUrl, hl);
  sheet.dataset.template = state.template.id;

  const img = sheet.querySelector('.photo-slot .photo-img');
  if (img) {
    img.style.transform = `scale(${state.photoScale}) translate(${state.photoPanX}px, ${state.photoPanY}px)`;
  }
}

/* ── Touch drag to pan photo ── */
let drag = null;

function initPhotoDrag() {
  const wrap = $('previewWrap');

  wrap.addEventListener('touchstart', (e) => {
    if (!state.photoDataUrl) return;
    drag = {
      x:    e.touches[0].clientX,
      y:    e.touches[0].clientY,
      panX: state.photoPanX,
      panY: state.photoPanY
    };
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    if (!drag) return;
    const previewScale = wrap.clientWidth / NEWSPAPER_W;
    state.photoPanX = drag.panX + (e.touches[0].clientX - drag.x) / previewScale / state.photoScale;
    state.photoPanY = drag.panY + (e.touches[0].clientY - drag.y) / previewScale / state.photoScale;
    updatePhotoTransform();
  }, { passive: true });

  wrap.addEventListener('touchend',   () => { drag = null; }, { passive: true });
  wrap.addEventListener('touchcancel',() => { drag = null; }, { passive: true });
}

/* ── Wire all events ── */
function wireEvents() {
  document.querySelectorAll('.backBtn').forEach((btn) => {
    btn.addEventListener('click', () => showStep(btn.dataset.back));
  });

  $('photoInput').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.photoDataUrl = reader.result;
      state.photoScale = 1;
      state.photoPanX  = 0;
      state.photoPanY  = 0;
      $('scaleSlider').value = 1;

      if (!state.headline) {
        $('headlineInput').value = '';
      }

      refreshPreview();
      showStep('stepHeadline');
    };
    reader.readAsDataURL(file);
  });

  $('scaleSlider').addEventListener('input', (e) => {
    state.photoScale = parseFloat(e.target.value);
    updatePhotoTransform();
  });

  $('headlineInput').addEventListener('input', (e) => {
    state.headline = e.target.value;
    refreshPreview();
  });

  $('printBtn').addEventListener('click', () => {
    buildPrintSheet();
    window.print();
  });

  initPhotoDrag();
}

renderTemplateGrid();
wireEvents();
