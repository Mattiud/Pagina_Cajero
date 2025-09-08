console.log('hora.js cargado');

document.addEventListener("DOMContentLoaded", () => {
  function actualizarHora() {
    const fecha    = new Date();
    let   hora     = fecha.getHours();
    const minutos  = fecha.getMinutes();
    const segundos = fecha.getSeconds();
    const diaSemana = fecha.getDay();
    const dia       = fecha.getDate();
    const mes       = fecha.getMonth();
    const anio      = fecha.getFullYear();
    let   ampm;

    // referencias a elementos
    const $pHoras      = document.getElementById("horas");
    const $pSegundos   = document.getElementById("segundos");
    const $pMinutos    = document.getElementById("minutos");
    const $pAMPM       = document.getElementById("ampm");
    const $pDiaSemana  = document.getElementById("diaSemana");
    const $pDia        = document.getElementById("dia");
    const $pMes        = document.getElementById("mes");
    const $pAnio       = document.getElementById("anio");

    const semana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    const meses  = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                    "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    // texto de fecha
    $pDiaSemana.textContent = semana[diaSemana];
    $pDia.textContent       = dia;
    $pMes.textContent       = meses[mes];
    $pAnio.textContent      = anio;

    // formato 12h
    if (hora >= 12) {
      hora = hora - 12;
      ampm = "PM";
    } else {
      ampm = "AM";
    }
    if (hora === 0) {
      hora = 12;
    }

    // completar con ceros
    $pHoras.textContent   = hora.toString().padStart(2, "0");
    $pMinutos.textContent = minutos.toString().padStart(2, "0");
    $pSegundos.textContent= segundos.toString().padStart(2, "0");
    $pAMPM.textContent    = ampm;
  }

  actualizarHora();               // primera vez
  setInterval(actualizarHora, 1000); // cada segundo
});