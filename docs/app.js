
function renderGaleria(contenedorId, lista) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  if (!lista || lista.length === 0) {
    contenedor.innerHTML = '<p class="galeria-vacia">// aún no se han subido imágenes aquí</p>';
    return;
  }

  contenedor.innerHTML = lista.map(item => `
    <figure class="galeria-item">
      <img src="${item.src}" alt="${item.titulo || ''}" loading="lazy"
           onerror="this.closest('.galeria-item').style.display='none'">
      <figcaption>
        ${item.titulo || ''}
        ${item.autor ? `<span class="autor">${item.autor}</span>` : ''}
      </figcaption>
    </figure>
  `).join('');
}

function renderTodasLasGalerias() {
  renderGaleria('galeria-equipo', IMAGENES.equipo);
  renderGaleria('galeria-arquitectura', IMAGENES.arquitectura);
}

document.addEventListener('DOMContentLoaded', renderTodasLasGalerias);

// ---------- Navegación entre secciones ----------
function show(id) {
  const secciones = ['home', 'equipo', 'componentes', 'arquitectura', 'conclusiones'];
  secciones.forEach(s => document.getElementById(s).style.display = (s === id) ? 'block' : 'none');

  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  const idx = secciones.indexOf(id);
  document.querySelectorAll('nav button')[idx].classList.add('active');

  // Si volvemos a componentes, aseguramos que se vea la lista
  if (id === 'componentes') cerrarComponente();
}

// ---------- Datos de cada componente ----------
const DATOS_COMPONENTES = {
  componente1: {
    badge: '<span class="layer-badge" style="background:rgba(247,131,172,0.15);color:#F783AC"><span class="piece piece-l" aria-hidden="true"><i></i><i></i><i></i><i></i></span> L1 · Bare metal</span>',
    titulo: 'Componente 1 — Virtualización con Linux',
    desc: '<p>Instalación de 2 VMs con VirtualBox, particionamiento manual (/ · swap · /home), configuración de red y acceso SSH.</p><p>VM Gráfica: Ubuntu 24.04 LTS · VM Consola: Debian 13.5</p>',
    imagenes: () => IMAGENES.componente1
  },
  componente2: {
    badge: '<span class="layer-badge" style="background:rgba(91,200,232,0.15);color:#5BC8E8"><span class="piece piece-i" aria-hidden="true"><i></i><i></i><i></i><i></i></span> L2 · Contenedores</span>',
    titulo: 'Componente 2 — Contenedores Docker',
    desc: '<p>Frontend Nginx (puerto 80) y backend Python (puerto 5000) orquestados con Docker Compose sobre imagen ubuntu:24.04.</p>',
    imagenes: () => IMAGENES.componente2
  },
  componente3: {
    badge: '<span class="layer-badge" style="background:rgba(185,138,232,0.15);color:#B98AE8"><span class="piece piece-t" aria-hidden="true"><i></i><i></i><i></i><i></i></span> L3 · Orquestación</span>',
    titulo: 'Componente 3 — Orquestación Kubernetes',
    desc: '<p>Despliegue de Nginx con Minikube, manifiestos YAML (Deployment + Service NodePort 30080), escalado de 2 a 3 réplicas.</p>',
    imagenes: () => IMAGENES.componente3
  },
  componente4: {
    badge: '<span class="layer-badge" style="background:rgba(78,205,164,0.15);color:#4ECDA4"><span class="piece piece-s" aria-hidden="true"><i></i><i></i><i></i><i></i></span> L4 · Entrega</span>',
    titulo: 'Componente 4 — Sitio Web',
    desc: '<p>Documentación técnica publicada en GitHub Pages con evidencias, diagramas y video demostrativo en YouTube.</p>',
    imagenes: () => []
  }
};

// ---------- Carrusel ----------
let carruselIndex = 0;
let carruselTotal = 0;

function abrirComponente(id) {
  const datos = DATOS_COMPONENTES[id];
  if (!datos) return;

  document.getElementById('componentes-lista').style.display = 'none';
  const detalle = document.getElementById('componente-detalle');
  detalle.style.display = 'block';

  document.getElementById('detalle-badge').innerHTML = datos.badge;
  document.getElementById('detalle-titulo').textContent = datos.titulo;
  document.getElementById('detalle-desc').innerHTML = datos.desc;

  const imgs = datos.imagenes() || [];
  carruselIndex = 0;
  carruselTotal = imgs.length;

  const vacio = document.getElementById('carrusel-vacio');
  const contenedor = document.getElementById('carrusel-contenedor');

  if (imgs.length === 0) {
    vacio.style.display = 'block';
    contenedor.style.display = 'none';
    return;
  }

  vacio.style.display = 'none';
  contenedor.style.display = 'block';

  // Renderizar slides
  const track = document.getElementById('carrusel-track');
  track.innerHTML = imgs.map(item => `
    <figure class="carrusel-slide">
      <img src="${item.src}" alt="${item.titulo || ''}" loading="lazy">
      <figcaption>
        ${item.titulo || ''}
        ${item.autor ? `<span class="autor">${item.autor}</span>` : ''}
      </figcaption>
    </figure>
  `).join('');

  // Dots
  const dots = document.getElementById('carrusel-dots');
  dots.innerHTML = imgs.map((_, i) =>
    `<button class="carrusel-dot${i === 0 ? ' active' : ''}" onclick="irASlide(${i})" aria-label="Imagen ${i+1}"></button>`
  ).join('');

  actualizarCarrusel();
}

function cerrarComponente() {
  document.getElementById('componentes-lista').style.display = 'block';
  document.getElementById('componente-detalle').style.display = 'none';
}

function actualizarCarrusel() {
  const track = document.getElementById('carrusel-track');
  track.style.transform = `translateX(-${carruselIndex * 100}%)`;

  // Actualizar dots
  document.querySelectorAll('.carrusel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carruselIndex);
  });

  // Contador
  const counter = document.getElementById('carrusel-counter');
  if (counter) counter.textContent = `${carruselIndex + 1} / ${carruselTotal}`;

  // Botones prev/next
  const prev = document.querySelector('.carrusel-prev');
  const next = document.querySelector('.carrusel-next');
  if (prev) prev.disabled = carruselIndex === 0;
  if (next) next.disabled = carruselIndex === carruselTotal - 1;
}

function carruselPrev() {
  if (carruselIndex > 0) { carruselIndex--; actualizarCarrusel(); }
}

function carruselNext() {
  if (carruselIndex < carruselTotal - 1) { carruselIndex++; actualizarCarrusel(); }
}

function irASlide(i) {
  carruselIndex = i;
  actualizarCarrusel();
}