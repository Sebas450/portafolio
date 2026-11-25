// Semestre actual calculado desde la fecha de inicio (data-inicio="AAAA-MM"), 6 meses por semestre.
const semestre = document.getElementById('semestre');
if (semestre) {
    const [anio, mes] = semestre.dataset.inicio.split('-').map(Number);
    const hoy = new Date();
    const meses = (hoy.getFullYear() - anio) * 12 + (hoy.getMonth() + 1 - mes);
    semestre.textContent = `Cursando semestre ${Math.floor(meses / 6) + 1}`;
}
