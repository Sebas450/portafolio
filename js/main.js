// Semestre actual calculado desde la fecha de inicio (data-inicio="AAAA-MM"), 6 meses por semestre.
const semestre = document.getElementById('semestre');
if (semestre) {
    const [anio, mes] = semestre.dataset.inicio.split('-').map(Number);
    const hoy = new Date();
    const meses = (hoy.getFullYear() - anio) * 12 + (hoy.getMonth() + 1 - mes);
    semestre.textContent = `Cursando semestre ${Math.floor(meses / 6) + 1}`;
}

const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Texto que se escribe solo con los roles.
const rol = document.getElementById('rol');
if (rol && !reducido) {
    const roles = ['Desarrollador web', 'Soporte técnico', 'Estudiante de Ingeniería de software'];
    let i = 0, letras = roles[0].length, borrando = true;
    function paso() {
        letras += borrando ? -1 : 1;
        rol.textContent = roles[i].slice(0, letras);
        let espera = borrando ? 40 : 90;
        if (!borrando && letras === roles[i].length) { borrando = true; espera = 2000; }
        else if (borrando && letras === 0) { borrando = false; i = (i + 1) % roles.length; espera = 300; }
        setTimeout(paso, espera);
    }
    setTimeout(paso, 2000);
}

// Cifras que cuentan desde 0.
function contar(el) {
    const fin = Number(el.dataset.count), t0 = performance.now();
    (function frame(t) {
        const p = Math.min((t - t0) / 1200, 1);
        el.textContent = Math.round(fin * (1 - (1 - p) ** 3));
        if (p < 1) requestAnimationFrame(frame);
    })(t0);
}

// Elementos que aparecen al hacer scroll (las barras de habilidades se llenan vía CSS).
if (reducido) {
    document.documentElement.classList.remove('js');
} else {
    const animables = document.querySelectorAll('.section h2, .intro, .stats li, .skill, .project, .col-title, .timeline li, footer .container > *');
    const obs = new IntersectionObserver(entradas => entradas.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        e.target.querySelectorAll('[data-count]').forEach(contar);
        obs.unobserve(e.target);
    }), { threshold: 0.15 });
    animables.forEach(el => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${([...el.parentElement.children].indexOf(el) % 4) * 90}ms`;
        obs.observe(el);
    });
}

// Resalta en el menú la sección que está en el centro de la pantalla.
const enlaces = document.querySelectorAll('.nav ul a');
const espia = new IntersectionObserver(entradas => entradas.forEach(e => {
    if (e.isIntersecting) enlaces.forEach(a => a.classList.toggle('active', a.hash === `#${e.target.id}`));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section, footer').forEach(s => espia.observe(s));
