// --- Distribución de salario ---
function distribuirSalario(salario) {
  const gastos = salario * 0.50;
  const ahorro = salario * 0.30;
  const inversion = salario * 0.20;

  return {
    gastos: gastos.toFixed(2),
    ahorro: ahorro.toFixed(2),
    inversion: inversion.toFixed(2)
  };
}

document.getElementById('calcularDistribucion')?.addEventListener('click', () => {
  const salario = parseFloat(document.getElementById('salarioInput')?.value);
  if (isNaN(salario) || salario <= 0) {
    alert('Introduce un salario válido mayor que 0');
    return;
  }
  const res = distribuirSalario(salario);
  document.getElementById('resultDistribucion').innerHTML = `
    <p><strong>Gastos (50%):</strong> $${res.gastos}</p>
    <p><strong>Ahorro (30%):</strong> $${res.ahorro}</p>
    <p><strong>Inversión (20%):</strong> $${res.inversion}</p>
  `;
});

// --- Calculadora de interés compuesto ---
function calcularInteresCompuesto(principal, tasaAnual, años, compuestoPorAno = 1) {
  const tasaDecimal = tasaAnual / 100;
  const montoFinal = principal * Math.pow(1 + tasaDecimal / compuestoPorAno, compuestoPorAno * años);
  const interesGanado = montoFinal - principal;
  return {
    montoFinal: montoFinal.toFixed(2),
    interesGanado: interesGanado.toFixed(2)
  };
}

document.getElementById('calcularInteres')?.addEventListener('click', () => {
  const principal = parseFloat(document.getElementById('principal')?.value);
  const tasa = parseFloat(document.getElementById('tasa')?.value);
  const años = parseFloat(document.getElementById('años')?.value);
  const compuestoPorAno = parseInt(document.getElementById('compuestoPorAno')?.value);

  if (
    isNaN(principal) || principal <= 0 ||
    isNaN(tasa) || tasa <= 0 ||
    isNaN(años) || años <= 0 ||
    isNaN(compuestoPorAno) || compuestoPorAno <= 0
  ) {
    alert('Por favor, rellena todos los campos con valores válidos mayores que 0');
    return;
  }

  const resultado = calcularInteresCompuesto(principal, tasa, años, compuestoPorAno);
  document.getElementById('resultInteres').innerHTML = `
    <p><strong>Monto Final:</strong> $${resultado.montoFinal}</p>
    <p><strong>Interés Ganado:</strong> $${resultado.interesGanado}</p>
  `;
});

// --- Simulador de inversión ---
function simularInversion(inversionInicial, aporteMensual, tasaAnual, años) {
  const tasaMensual = tasaAnual / 100 / 12;
  let saldo = inversionInicial;
  let totalAportado = inversionInicial;
  const saldoPorAño = [];

  for (let i = 1; i <= años * 12; i++) {
    saldo = saldo * (1 + tasaMensual) + aporteMensual;
    totalAportado += aporteMensual;

    if (i % 12 === 0) {
      saldoPorAño.push({ año: i / 12, saldo: saldo.toFixed(2) });
    }
  }

  return {
    saldoFinal: saldo.toFixed(2),
    totalAportado: totalAportado.toFixed(2),
    saldoPorAño
  };
}

document.getElementById('calcularSimulador')?.addEventListener('click', () => {
  const inversionInicial = parseFloat(document.getElementById('inversionInicial')?.value);
  const aporteMensual = parseFloat(document.getElementById('aporteMensual')?.value);
  const tasaAnual = parseFloat(document.getElementById('tasaAnual')?.value);
  const años = parseInt(document.getElementById('añosSimulador')?.value);

  if (
    isNaN(inversionInicial) || inversionInicial < 0 ||
    isNaN(aporteMensual) || aporteMensual < 0 ||
    isNaN(tasaAnual) || tasaAnual <= 0 ||
    isNaN(años) || años <= 0
  ) {
    alert('Introduce valores válidos para todos los campos');
    return;
  }

  const resultado = simularInversion(inversionInicial, aporteMensual, tasaAnual, años);
  let tabla = '<table><thead><tr><th>Año</th><th>Saldo</th></tr></thead><tbody>';
  resultado.saldoPorAño.forEach(({ año, saldo }) => {
    tabla += `<tr><td>${año}</td><td>$${saldo}</td></tr>`;
  });
  tabla += '</tbody></table>';

  document.getElementById('resultSimulador').innerHTML = `
    <p><strong>Saldo Final:</strong> $${resultado.saldoFinal}</p>
    <p><strong>Total Aportado:</strong> $${resultado.totalAportado}</p>
    ${tabla}
  `;
});
