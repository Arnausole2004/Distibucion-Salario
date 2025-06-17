// =======================
// UTILIDADES GENERALES
// =======================
function mostrarError(mensaje) {
  alert(mensaje);
}

function formatoMoneda(valor) {
  return `$${parseFloat(valor).toFixed(2)}`;
}

// =======================
// 1. DISTRIBUCIÓN DE SALARIO
// =======================
function distribuirSalario(salario) {
  return {
    gastos: salario * 0.5,
    ahorro: salario * 0.3,
    inversion: salario * 0.2
  };
}

function manejarDistribucion() {
  const input = document.getElementById('salarioInput');
  const salario = parseFloat(input?.value);

  if (!salario || salario <= 0) {
    return mostrarError('Introduce un salario válido mayor que 0.');
  }

  const { gastos, ahorro, inversion } = distribuirSalario(salario);
  document.getElementById('resultDistribucion').innerHTML = `
    <p><strong>Gastos (50%):</strong> ${formatoMoneda(gastos)}</p>
    <p><strong>Ahorro (30%):</strong> ${formatoMoneda(ahorro)}</p>
    <p><strong>Inversión (20%):</strong> ${formatoMoneda(inversion)}</p>
  `;
}

document.getElementById('calcularDistribucion')?.addEventListener('click', manejarDistribucion);

// =======================
// 2. CÁLCULO INTERÉS COMPUESTO
// =======================
function calcularInteresCompuesto(principal, tasaAnual, años, compuestoPorAno = 1) {
  const r = tasaAnual / 100;
  const montoFinal = principal * Math.pow(1 + r / compuestoPorAno, compuestoPorAno * años);
  return {
    montoFinal,
    interesGanado: montoFinal - principal
  };
}

function manejarInteresCompuesto() {
  const principal = parseFloat(document.getElementById('principal')?.value);
  const tasa = parseFloat(document.getElementById('tasa')?.value);
  const años = parseFloat(document.getElementById('años')?.value);
  const compuesto = parseInt(document.getElementById('compuestoPorAno')?.value);

  if ([principal, tasa, años, compuesto].some(val => isNaN(val) || val <= 0)) {
    return mostrarError('Todos los campos deben tener valores válidos mayores que 0.');
  }

  const { montoFinal, interesGanado } = calcularInteresCompuesto(principal, tasa, años, compuesto);

  document.getElementById('resultInteres').innerHTML = `
    <p><strong>Monto Final:</strong> ${formatoMoneda(montoFinal)}</p>
    <p><strong>Interés Ganado:</strong> ${formatoMoneda(interesGanado)}</p>
  `;
}

document.getElementById('calcularInteres')?.addEventListener('click', manejarInteresCompuesto);

// =======================
// 3. SIMULADOR DE INVERSIÓN MENSUAL
// =======================
function simularInversion({ inicial, mensual, tasa, años }) {
  const tasaMensual = tasa / 100 / 12;
  let saldo = inicial;
  let aportado = inicial;
  const historial = [];

  for (let mes = 1; mes <= años * 12; mes++) {
    saldo = saldo * (1 + tasaMensual) + mensual;
    aportado += mensual;

    if (mes % 12 === 0) {
      historial.push({ año: mes / 12, saldo: saldo });
    }
  }

  return {
    saldoFinal: saldo,
    totalAportado: aportado,
    historial
  };
}

function manejarSimulador() {
  const inversionInicial = parseFloat(document.getElementById('inversionInicial')?.value);
  const aporteMensual = parseFloat(document.getElementById('aporteMensual')?.value);
  const tasaAnual = parseFloat(document.getElementById('tasaAnual')?.value);
  const años = parseInt(document.getElementById('añosSimulador')?.value);

  if (
    [inversionInicial, aporteMensual, tasaAnual, años].some(val => isNaN(val) || val < 0) ||
    tasaAnual === 0 || años === 0
  ) {
    return mostrarError('Introduce valores positivos y mayores que cero en todos los campos.');
  }

  const resultado = simularInversion({
    inicial: inversionInicial,
    mensual: aporteMensual,
    tasa: tasaAnual,
    años: años
  });

  const tablaHTML = resultado.historial.map(({ año, saldo }) =>
    `<tr><td>${año}</td><td>${formatoMoneda(saldo)}</td></tr>`
  ).join('');

  document.getElementById('resultSimulador').innerHTML = `
    <p><strong>Saldo Final:</strong> ${formatoMoneda(resultado.saldoFinal)}</p>
    <p><strong>Total Aportado:</strong> ${formatoMoneda(resultado.totalAportado)}</p>
    <table>
      <thead><tr><th>Año</th><th>Saldo</th></tr></thead>
      <tbody>${tablaHTML}</tbody>
    </table>
  `;
}

document.getElementById('calcularSimulador')?.addEventListener('click', manejarSimulador);
