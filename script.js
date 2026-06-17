const root = document.documentElement;
const progress = document.querySelector(".scroll-progress");
const opener = document.querySelector(".opener");
const posterBottle = document.querySelector(".poster-bottle");
const posterCork = document.querySelector(".poster-cork");
const posterBottleArt = document.querySelector(".bottle-illustration");
const wineBuilder = document.querySelector(".wine-builder");
const worldSection = document.querySelector(".world-consumption");
const argentinaSection = document.querySelector(".argentina-zoom");
const calendarSection = document.querySelector(".wine-calendar");
const flourishStorySection = document.querySelector(".flourish-story-section");
const varietalSection = document.querySelector(".argentine-varietals");
const varietalBottles = [...document.querySelectorAll(".bottle-lineup .varietal-bottle")];
const bridgePour = document.querySelector("#bridgePour");
const bridgePourPath = document.querySelector("#bridgePourPath");
const bridgePourShadow = document.querySelector("#bridgePourShadow");
const bridgePourHighlight = document.querySelector("#bridgePourHighlight");
const bridgeReceivingGlass = document.querySelector(".bridge-receiving-glass");
const bridgeGlassSurface = document.querySelector(".bridge-glass-surface-anchor");
const bridgeWineFill = document.querySelector(".bridge-wine-fill");
const bridgeWineSurface = document.querySelector(".bridge-wine-top");
const pourSection = document.querySelector(".pour-story");
const travelingBottle = document.querySelector(".traveling-bottle");
const landingMark = document.querySelector(".landing-mark");
const mapPointsLayer = document.querySelector(".argentina-world-stage .map-points");
const mapHotspotsLayer = document.querySelector(".argentina-world-stage .map-hotspots");
const mapTooltip = document.querySelector(".argentina-world-stage .map-tooltip");
const tasteButtons = [...document.querySelectorAll(".taste-options button")];
const tasteQuestions = [...document.querySelectorAll(".taste-question")];
const profileCharts = [...document.querySelectorAll("[data-profile-chart]")];
const recommendationTitle = document.querySelector("#recommendationTitle");
const recommendationText = document.querySelector("#recommendationText");
const tagBody = document.querySelector("#tagBody");
const tagFlavor = document.querySelector("#tagFlavor");
const tagAge = document.querySelector("#tagAge");
const tastingSection = document.querySelector(".tasting-section");
const tastingStepLabel = document.querySelector("#tastingStepLabel");
const tastingTitle = document.querySelector("#tastingTitle");
const tastingText = document.querySelector("#tastingText");
const tastingCopyPanels = [...document.querySelectorAll(".tasting-copy-panel")];
const compositionSection = document.querySelector(".wine-composition-section");
const compositionSlices = [...document.querySelectorAll("[data-composition-slice]")];
const compositionDetails = [...document.querySelectorAll("[data-composition-detail]")];
const fermentationSection = document.querySelector(".fermentation-section");
const nextStep = document.querySelector("#nextStep");
const prevStep = document.querySelector("#prevStep");
const radarShape = document.querySelector("#radarShape");
const pourScene = document.querySelector(".pour-scene");
const pourBottleArt = document.querySelector(".pour-bottle-art");
const calculatedPour = document.querySelector("#calculatedPour");
const calculatedPourPath = document.querySelector("#calculatedPourPath");
const calculatedPourShadow = document.querySelector("#calculatedPourShadow");
const pourGlassBowl = document.querySelector(".pour-glass-bowl");
const pourGlassSurface = document.querySelector(".pour-glass-surface");

let corkPopped = false;
let audioContext = null;
let recommendationShown = false;
let tasteResultResetUntil = 0;
let tasteCurrentStep = 0;
let currentTastingStep = 0;
let flourishStorySlideIndex = -1;

const tasteTraitOrder = ["body", "flavor", "age"];
const tasteProfile = {
  body: "",
  flavor: "",
  age: "",
};

const recommendations = {
  "poco-ocasiones-simple": {
    title: "Consumidor ocasional",
    color: "#c86f92",
    text: "El vino aparece de vez en cuando: un brindis, una comida especial, una reunión puntual. En tu vida no es rutina, es señal de ocasión.",
  },
  "poco-ocasiones-atento": {
    title: "Consumidor curioso",
    color: "#b83b5e",
    text: "No tomás todo el tiempo, pero cuando aparece una botella hay cierta atención. El vino entra como detalle elegido, no como hábito diario.",
  },
  "poco-mesa-simple": {
    title: "Consumidor social",
    color: "#9f2345",
    text: "Tu consumo se activa cuando hay mesa compartida. No siempre buscás la botella perfecta, pero el vino aparece como parte del encuentro.",
  },
  "poco-mesa-atento": {
    title: "Consumidor selectivo",
    color: "#8b1232",
    text: "Tomás con moderación, pero elegís con intención. La copa no aparece todo el tiempo: aparece cuando tiene sentido acompañar la escena.",
  },
  "seguido-ocasiones-simple": {
    title: "Consumidor frecuente",
    color: "#7a1030",
    text: "El vino aparece seguido, aunque no siempre con ceremonia. Forma parte de tus planes y celebraciones sin necesitar demasiada explicación.",
  },
  "seguido-ocasiones-atento": {
    title: "Consumidor frecuente y atento",
    color: "#661126",
    text: "La copa aparece seguido y la elección importa. Tu consumo combina frecuencia con curiosidad: no es solo tomar, también mirar qué se toma.",
  },
  "seguido-mesa-simple": {
    title: "Consumidor de mesa",
    color: "#52101e",
    text: "El vino está bastante presente en tu vida cotidiana. Acompaña comidas, juntadas y sobremesas: más costumbre social que evento aislado.",
  },
  "seguido-mesa-atento": {
    title: "Consumidor ritual",
    color: "#3a0d10",
    text: "El vino ocupa un lugar fuerte: se toma, se elige y se integra a la experiencia de la mesa. En tu perfil, la copa ya es parte del ritual.",
  },
};
const profileLabels = {
  poco: "baja frecuencia",
  seguido: "frecuencia alta",
  ocasiones: "ocasiones",
  mesa: "mesa compartida",
  simple: "elección simple",
  atento: "elección atenta",
};

const tastingSteps = [
  {
    label: "Cata guiada",
    title: "Aprendamos a catar vino.",
    text: "Una copa y cuatro gestos para mirar el vino con más atención.",
    button: "Comenzar",
  },
  {
    label: "Paso 1 · Mirar",
    title: "Mirar",
    text: "Observá el color y la intensidad: antes de oler o probar, la copa ya empieza a contar cuerpo, edad y concentración.",
    button: "Siguiente",
  },
  {
    label: "Paso 2 · Girar",
    title: "Girar",
    text: "La copa gira para liberar aromas y dejar ver cómo el vino se mueve contra el vidrio.",
    button: "Siguiente",
  },
  {
    label: "Paso 3 · Oler",
    title: "Oler",
    text: "Acercá la nariz e identificá familias: fruta, flores, hierbas, especias o madera.",
    button: "Siguiente",
  },
  {
    label: "Paso 4 · Probar",
    title: "Probar",
    text: "Ahora entra la textura: acidez, alcohol, taninos, dulzor y persistencia aparecen juntos.",
    button: "Siguiente",
  },
];

if (bridgeReceivingGlass) {
  document.body.appendChild(bridgeReceivingGlass);
}

const wineConsumptionData = [
  { country: "Estados Unidos", consumption: 33.3, lat: 39, lon: -98, fact: "Gran mercado impulsado por California, uno de los mayores productores del mundo." },
  { country: "Francia", consumption: 24.4, lat: 46, lon: 2, fact: "El vino forma parte de la gastronomía y cultura cotidiana desde hace siglos." },
  { country: "Italia", consumption: 21.8, lat: 43, lon: 12, fact: "Tiene una de las tradiciones vitivinícolas más antiguas y diversas del mundo." },
  { country: "Alemania", consumption: 19, lat: 51, lon: 10, fact: "Aunque famosa por la cerveza, el vino es muy popular en regiones del Rin y Mosela." },
  { country: "Reino Unido", consumption: 12.6, lat: 54, lon: -2, fact: "Produce poco vino pero es uno de los mayores importadores mundiales." },
  { country: "España", consumption: 9.9, lat: 40, lon: -4, fact: "La cultura de tapas y comidas largas favorece el consumo de vino." },
  { country: "Argentina", consumption: 8.8, lat: -34, lon: -64, fact: "El consumo está ligado al asado y a una fuerte producción local de Malbec." },
  { country: "Rusia", consumption: 8.1, lat: 60, lon: 90, fact: "El vino ha ganado popularidad frente a otras bebidas alcohólicas en años recientes." },
  { country: "China", consumption: 6.8, lat: 35, lon: 104, fact: "El crecimiento de la clase media impulsó el interés por el vino." },
  { country: "Portugal", consumption: 5.6, lat: 39, lon: -8, fact: "Posee uno de los consumos per cápita más altos del mundo." },
  { country: "Brasil", consumption: 4.1, lat: -14, lon: -52, fact: "El vino gana terreno entre consumidores jóvenes y urbanos." },
  { country: "Australia", consumption: 5.3, lat: -25, lon: 134, fact: "Cuenta con una fuerte industria vitivinícola y cultura de consumo local." },
  { country: "Canadá", consumption: 5, lat: 56, lon: -100, fact: "El consumo crece junto con la popularidad de vinos importados." },
  { country: "Japón", consumption: 3.5, lat: 37, lon: 138, fact: "La combinación con cocina occidental impulsó la demanda de vino." },
  { country: "Países Bajos", consumption: 3, lat: 52, lon: 5, fact: "Gran parte del consumo proviene de importaciones europeas." },
  { country: "Bélgica", consumption: 2.9, lat: 50.5, lon: 4.5, fact: "La cercanía con Francia favorece una fuerte cultura del vino." },
  { country: "Suiza", consumption: 2.7, lat: 46.8, lon: 8, fact: "Tiene elevado consumo per cápita y una producción local apreciada." },
  { country: "Austria", consumption: 2.4, lat: 47.5, lon: 14.5, fact: "El vino acompaña muchas comidas tradicionales." },
  { country: "Chile", consumption: 2.2, lat: -30, lon: -71, fact: "Es productor destacado y el vino tiene precios accesibles localmente." },
  { country: "Sudáfrica", consumption: 2, lat: -29, lon: 24, fact: "Combina tradición vitivinícola histórica con fuerte producción nacional." },
  { country: "Suecia", consumption: 2.1, lat: 62, lon: 15, fact: "El interés por la gastronomía elevó el consumo de vino." },
  { country: "Dinamarca", consumption: 1.8, lat: 56, lon: 10, fact: "Presenta uno de los consumos per cápita más altos del norte de Europa." },
  { country: "México", consumption: 1.3, lat: 23, lon: -102, fact: "El consumo crece impulsado por gastronomía y turismo." },
  { country: "Polonia", consumption: 1.4, lat: 52, lon: 19, fact: "El vino gana popularidad frente a bebidas tradicionales." },
  { country: "República Checa", consumption: 1.2, lat: 49.8, lon: 15, fact: "El consumo aumenta junto con la expansión de la oferta importada." },
  { country: "Hungría", consumption: 1, lat: 47.2, lon: 19, fact: "Posee una larga tradición vinícola, destacada por Tokaj." },
  { country: "Grecia", consumption: 1.1, lat: 39, lon: 22, fact: "El vino tiene raíces en una tradición milenaria." },
  { country: "Rumania", consumption: 1, lat: 45.9, lon: 25, fact: "Es productor histórico y mantiene un importante mercado interno." },
  { country: "Nueva Zelanda", consumption: 0.9, lat: -41, lon: 172, fact: "Su reconocida industria de Sauvignon Blanc impulsa el consumo." },
  { country: "Turquía", consumption: 0.8, lat: 39, lon: 35, fact: "A pesar de restricciones culturales, existe una tradición vinícola antigua." },
  { country: "Corea del Sur", consumption: 0.7, lat: 36, lon: 127, fact: "El vino se asocia cada vez más con estatus y gastronomía." },
  { country: "Finlandia", consumption: 0.5, lat: 64, lon: 26, fact: "El interés por vinos importados creció en las últimas décadas." },
  { country: "Noruega", consumption: 0.5, lat: 61, lon: 8, fact: "Alto poder adquisitivo y preferencia por bebidas premium." },
  { country: "Irlanda", consumption: 0.6, lat: 53, lon: -8, fact: "El vino se volvió una alternativa popular a la cerveza." },
  { country: "Croacia", consumption: 0.4, lat: 45, lon: 16, fact: "La producción local y el turismo favorecen el consumo." },
  { country: "Eslovenia", consumption: 0.3, lat: 46, lon: 14.9, fact: "Tiene una fuerte tradición vitivinícola pese a su tamaño." },
  { country: "Uruguay", consumption: 0.3, lat: -33, lon: -56, fact: "Presenta uno de los mayores consumos per cápita de América." },
  { country: "Perú", consumption: 0.2, lat: -9, lon: -75, fact: "La gastronomía impulsó el interés por maridajes con vino." },
  { country: "Colombia", consumption: 0.3, lat: 4, lon: -74, fact: "El crecimiento de la clase media favorece el mercado del vino." },
  { country: "India", consumption: 0.2, lat: 22, lon: 78, fact: "El consumo aún es bajo per cápita pero crece rápidamente." },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function smoothStep(value) {
  const eased = clamp(value, 0, 1);
  return eased * eased * (3 - 2 * eased);
}

function compositionPoint(radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: Math.cos(radians) * radius,
    y: Math.sin(radians) * radius,
  };
}

function buildCompositionSlice(startAngle, endAngle, radius = 104) {
  const start = compositionPoint(radius, startAngle);
  const end = compositionPoint(radius, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    "M0 0",
    `L${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `A${radius} ${radius} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

function renderCompositionPie() {
  if (!compositionSlices.length) return;

  const total = compositionSlices.reduce(
    (sum, slice) => sum + Math.max(Number(slice.dataset.percent) || 0, 0),
    0,
  );

  let currentAngle = 18;

  compositionSlices.forEach((slice) => {
    const percent = Math.max(Number(slice.dataset.percent) || 0, 0);
    const sweep = total > 0 ? (percent / total) * 360 : 0;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    const midAngle = startAngle + sweep / 2;

    slice.setAttribute("d", buildCompositionSlice(startAngle, endAngle));
    slice.dataset.midAngle = String(midAngle);
    slice.style.setProperty("--slice-pop-x", "0px");
    slice.style.setProperty("--slice-pop-y", "0px");
    slice.style.setProperty("--slice-scale", "1");
    slice.style.setProperty("--slice-focus", "0");
    currentAngle = endAngle;
  });
}

function buildBridgeWineLevel(progress) {
  const fillProgress = clamp(progress, 0, 1);
  const surfaceY = 238 - fillProgress * 86;
  const halfWidth = 110 + fillProgress * 26;
  const left = 258 - halfWidth;
  const right = 258 + halfWidth;
  const topDip = 17;
  const sideY = surfaceY + 58 + fillProgress * 18;

  return {
    fill: [
      `M${left.toFixed(1)} ${surfaceY.toFixed(1)}`,
      `C${(left + 48).toFixed(1)} ${(surfaceY - topDip).toFixed(1)} ${(right - 48).toFixed(1)} ${(surfaceY - topDip).toFixed(1)} ${right.toFixed(1)} ${surfaceY.toFixed(1)}`,
      `C${(right + 18).toFixed(1)} ${sideY.toFixed(1)} 420 330 420 410`,
      "L96 410",
      `C96 330 ${(left - 18).toFixed(1)} ${sideY.toFixed(1)} ${left.toFixed(1)} ${surfaceY.toFixed(1)}Z`,
    ].join(" "),
    top: [
      `M${left.toFixed(1)} ${surfaceY.toFixed(1)}`,
      `C${(left + 48).toFixed(1)} ${(surfaceY - topDip).toFixed(1)} ${(right - 48).toFixed(1)} ${(surfaceY - topDip).toFixed(1)} ${right.toFixed(1)} ${surfaceY.toFixed(1)}`,
      `C${(right - 48).toFixed(1)} ${(surfaceY + 18).toFixed(1)} ${(left + 48).toFixed(1)} ${(surfaceY + 18).toFixed(1)} ${left.toFixed(1)} ${surfaceY.toFixed(1)}Z`,
    ].join(" "),
  };
}

function normalizeVector(vector) {
  const length = Math.hypot(vector.x, vector.y) || 1;
  return {
    x: vector.x / length,
    y: vector.y / length,
  };
}

function cubicPoint(start, controlA, controlB, end, progress) {
  const inverse = 1 - progress;
  return {
    x:
      inverse ** 3 * start.x +
      3 * inverse ** 2 * progress * controlA.x +
      3 * inverse * progress ** 2 * controlB.x +
      progress ** 3 * end.x,
    y:
      inverse ** 3 * start.y +
      3 * inverse ** 2 * progress * controlA.y +
      3 * inverse * progress ** 2 * controlB.y +
      progress ** 3 * end.y,
  };
}

function buildLiquidStreamShape(start, controlA, controlB, end, widthAt, steps = 28) {
  const centers = Array.from({ length: steps + 1 }, (_, index) => {
    const progress = index / steps;
    return cubicPoint(start, controlA, controlB, end, progress);
  });

  const left = [];
  const right = [];
  centers.forEach((point, index) => {
    const previous = centers[Math.max(0, index - 1)];
    const next = centers[Math.min(centers.length - 1, index + 1)];
    const tangent = normalizeVector({
      x: next.x - previous.x,
      y: next.y - previous.y,
    });
    const normal = { x: -tangent.y, y: tangent.x };
    const width = widthAt(index / steps);
    left.push({
      x: point.x + normal.x * width * 0.5,
      y: point.y + normal.y * width * 0.5,
    });
    right.push({
      x: point.x - normal.x * width * 0.5,
      y: point.y - normal.y * width * 0.5,
    });
  });

  const pointToString = (point) => `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  return [
    `M ${pointToString(left[0])}`,
    ...left.slice(1).map((point) => `L ${pointToString(point)}`),
    ...right.reverse().map((point) => `L ${pointToString(point)}`),
    "Z",
  ].join(" ");
}

function buildBezierPath(start, controlA, controlB, end) {
  return [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `C ${controlA.x.toFixed(2)} ${controlA.y.toFixed(2)}`,
    `${controlB.x.toFixed(2)} ${controlB.y.toFixed(2)}`,
    `${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(" ");
}

function svgPointToClient(svg, x, y) {
  const ctm = svg?.getScreenCTM?.();
  if (!ctm) return null;

  return {
    x: ctm.a * x + ctm.c * y + ctm.e,
    y: ctm.b * x + ctm.d * y + ctm.f,
  };
}

function updatePosterCorkPosition() {
  if (!posterBottle || !posterCork || !posterBottleArt) return;

  const viewBox = posterBottleArt.viewBox?.baseVal;
  const bottleWidth = posterBottle.offsetWidth;
  const bottleHeight = posterBottle.offsetHeight;
  if (!viewBox?.width || !viewBox?.height || !bottleWidth || !bottleHeight) return;

  const neckTop = 92;
  const neckBottom = 144;
  const neckCenter = (neckTop + neckBottom) / 2;
  const mouthX = 18;
  const scaleX = bottleWidth / viewBox.width;
  const scaleY = bottleHeight / viewBox.height;
  const corkHeight = (neckBottom - neckTop) * scaleY;
  const corkWidth = corkHeight * 1.2;
  const insertedWidth = corkHeight * 0.5;
  const corkLeft = (mouthX - viewBox.x) * scaleX + insertedWidth - corkWidth;
  const corkTop = (neckCenter - viewBox.y) * scaleY - corkHeight / 2;

  posterCork.style.setProperty("--poster-cork-left", `${corkLeft.toFixed(2)}px`);
  posterCork.style.setProperty("--poster-cork-top", `${corkTop.toFixed(2)}px`);
  posterCork.style.setProperty("--poster-cork-width", `${corkWidth.toFixed(2)}px`);
  posterCork.style.setProperty("--poster-cork-height", `${corkHeight.toFixed(2)}px`);
  posterCork.style.setProperty("--poster-cork-pop-x", `${(-corkWidth * 0.84).toFixed(2)}px`);
  posterCork.style.setProperty("--poster-cork-pop-y", `${(-corkHeight * 3.94).toFixed(2)}px`);
}

function updateCalculatedPour() {
  if (
    !pourScene ||
    !pourBottleArt ||
    !calculatedPour ||
    !calculatedPourPath ||
    !calculatedPourShadow ||
    !pourGlassBowl ||
    !pourGlassSurface
  ) {
    return;
  }

  const sceneRect = pourScene.getBoundingClientRect();
  const bowlRect = pourGlassBowl.getBoundingClientRect();
  const surfaceRect = pourGlassSurface.getBoundingClientRect();
  const mouthClient = svgPointToClient(pourBottleArt, 18, 118);
  const mouthDirectionClient = svgPointToClient(pourBottleArt, -48, 118);

  if (
    !sceneRect.width ||
    !sceneRect.height ||
    !bowlRect.width ||
    !surfaceRect.width ||
    !mouthClient ||
    !mouthDirectionClient
  ) {
    return;
  }

  const sceneLeft = sceneRect.left;
  const sceneTop = sceneRect.top;
  const start = {
    x: mouthClient.x - sceneLeft,
    y: mouthClient.y - sceneTop,
  };
  const mouthDirection = {
    x: mouthDirectionClient.x - mouthClient.x,
    y: mouthDirectionClient.y - mouthClient.y,
  };
  const end = {
    x: surfaceRect.left + surfaceRect.width * 0.5 - sceneLeft,
    y: surfaceRect.top + surfaceRect.height * 0.32 - sceneTop,
  };

  const delta = {
    x: end.x - start.x,
    y: end.y - start.y,
  };
  const distance = Math.hypot(delta.x, delta.y);
  const exitVector = normalizeVector(mouthDirection);
  const waveVector = normalizeVector({ x: -delta.y, y: delta.x });
  const waveSize = clamp(sceneRect.width * 0.05, 24, 84);
  const startHandleMax = Math.min(270, Math.max(64, sceneRect.width * 0.18));
  const startHandle = clamp(distance * 0.16, 64, startHandleMax);
  const endHandle = clamp(distance * 0.18, 160, 520);
  const pointAt = (progress, wave = 0) => ({
    x: start.x + delta.x * progress + waveVector.x * wave,
    y: start.y + delta.y * progress + waveVector.y * wave,
  });
  const between = (from, to, progress, wave = 0) => ({
    x: from.x + (to.x - from.x) * progress + waveVector.x * wave,
    y: from.y + (to.y - from.y) * progress + waveVector.y * wave,
  });
  const waveIn = pointAt(0.36, waveSize);
  const waveOut = pointAt(0.66, -waveSize * 0.72);
  const controlStart = {
    x: start.x + exitVector.x * startHandle,
    y: start.y + exitVector.y * startHandle,
  };
  const controlToWaveIn = between(start, waveIn, 0.66, waveSize * 0.18);
  const controlFromWaveIn = between(waveIn, waveOut, 0.28, -waveSize * 0.32);
  const controlToWaveOut = between(waveIn, waveOut, 0.72, waveSize * 0.22);
  const controlFromWaveOut = between(waveOut, end, 0.26, -waveSize * 0.2);
  const controlEnd = {
    x: end.x,
    y: end.y - endHandle,
  };
  const path = [
    `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`,
    `C ${controlStart.x.toFixed(2)} ${controlStart.y.toFixed(2)}`,
    `${controlToWaveIn.x.toFixed(2)} ${controlToWaveIn.y.toFixed(2)}`,
    `${waveIn.x.toFixed(2)} ${waveIn.y.toFixed(2)}`,
    `C ${controlFromWaveIn.x.toFixed(2)} ${controlFromWaveIn.y.toFixed(2)}`,
    `${controlToWaveOut.x.toFixed(2)} ${controlToWaveOut.y.toFixed(2)}`,
    `${waveOut.x.toFixed(2)} ${waveOut.y.toFixed(2)}`,
    `C ${controlFromWaveOut.x.toFixed(2)} ${controlFromWaveOut.y.toFixed(2)}`,
    `${controlEnd.x.toFixed(2)} ${controlEnd.y.toFixed(2)}`,
    `${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
  ].join(" ");

  calculatedPour.setAttribute(
    "viewBox",
    `0 0 ${Math.ceil(sceneRect.width)} ${Math.ceil(sceneRect.height)}`,
  );
  calculatedPourPath.setAttribute("d", path);
  calculatedPourShadow.setAttribute("d", path);
}

function playCorkPop() {
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return;

  audioContext = audioContext || new AudioEngine();

  const play = () => {
    const now = audioContext.currentTime;
    const sampleRate = audioContext.sampleRate;
    const duration = 0.16;
    const buffer = audioContext.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
    const channel = buffer.getChannelData(0);

    for (let i = 0; i < channel.length; i += 1) {
      const fade = 1 - i / channel.length;
      channel[i] = (Math.random() * 2 - 1) * fade * fade;
    }

    const noise = audioContext.createBufferSource();
    const highpass = audioContext.createBiquadFilter();
    const noiseGain = audioContext.createGain();
    noise.buffer = buffer;
    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(560, now);
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.18, now + 0.012);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    noise.connect(highpass).connect(noiseGain).connect(audioContext.destination);
    noise.start(now);
    noise.stop(now + duration);

    const pop = audioContext.createOscillator();
    const popGain = audioContext.createGain();
    pop.type = "triangle";
    pop.frequency.setValueAtTime(168, now);
    pop.frequency.exponentialRampToValueAtTime(62, now + 0.13);
    popGain.gain.setValueAtTime(0.0001, now);
    popGain.gain.exponentialRampToValueAtTime(0.14, now + 0.01);
    popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    pop.connect(popGain).connect(audioContext.destination);
    pop.start(now);
    pop.stop(now + 0.15);
  };

  if (audioContext.state === "suspended") {
    audioContext.resume().then(play).catch(() => {});
    recommendationTitle.textContent = "Respondé las tres preguntas";
    recommendationText.textContent =
      "El resultado aparece cuando terminás de ubicar qué lugar ocupa el vino en tus hábitos.";
    return;
  }

  play();
}

function updateIntroState() {
  if (!opener) return;

  const travel = Math.max(opener.offsetHeight - window.innerHeight, 1);
  const rect = opener.getBoundingClientRect();
  const introProgress = clamp(-rect.top / travel, 0, 1);
  const titleProgress = 1;
  const titleLine1 = 1;
  const titleLine2 = 1;
  const titleLine3 = 1;
  const toastInProgress = smoothStep(introProgress / 0.42);
  const toastOutProgress = smoothStep((introProgress - 0.58) / 0.52);
  const toastX = toastInProgress * 3.2 - toastOutProgress * 30;
  const toastY = -toastInProgress * 0.5 - toastOutProgress * 0.9;
  const toastRotate = -toastInProgress * 1.2 - toastOutProgress * 2.4;

  root.style.setProperty("--intro-progress", introProgress.toFixed(3));
  root.style.setProperty("--intro-toast-x", `${toastX.toFixed(2)}vw`);
  root.style.setProperty("--intro-toast-y", `${toastY.toFixed(2)}vh`);
  root.style.setProperty("--intro-toast-rotate", `${toastRotate.toFixed(2)}deg`);
  root.style.setProperty("--title-progress", titleProgress.toFixed(3));
  root.style.setProperty("--title-line-1", titleLine1.toFixed(3));
  root.style.setProperty("--title-line-2", titleLine2.toFixed(3));
  root.style.setProperty("--title-line-3", titleLine3.toFixed(3));
  root.style.setProperty("--title-line-1-clip", `${((1 - titleLine1) * 100).toFixed(2)}%`);
  root.style.setProperty("--title-line-2-clip", `${((1 - titleLine2) * 100).toFixed(2)}%`);
  root.style.setProperty("--title-line-3-clip", `${((1 - titleLine3) * 100).toFixed(2)}%`);
}

function updateTasteFlow() {
  if (!wineBuilder) return;

  const isComplete = tasteTraitOrder.every((trait) => tasteProfile[trait]);
  const activeIndex =
    isComplete && tasteCurrentStep >= tasteQuestions.length
      ? tasteQuestions.length
      : Math.min(tasteCurrentStep, tasteQuestions.length - 1);

  wineBuilder.style.setProperty("--taste-step", activeIndex);
  wineBuilder.style.setProperty("--taste-offset", `${activeIndex * -100}%`);
  wineBuilder.dataset.tasteStep = String(activeIndex);

  tasteQuestions.forEach((question, index) => {
    const trait = question.querySelector("[data-trait]")?.dataset.trait;
    const isAnswered = Boolean(trait && tasteProfile[trait]);
    const isActive = index === activeIndex;

    question.classList.toggle("is-active", isActive);
    question.classList.toggle("is-answered", isAnswered);
    question.classList.toggle("is-before", index < activeIndex);
    question.setAttribute("aria-hidden", isActive ? "false" : "true");
  });
}

function updateTasteDetailState() {
  if (!wineBuilder) return;

  const isComplete = wineBuilder.classList.contains("is-complete");
  const travel = Math.max(wineBuilder.offsetHeight - window.innerHeight, 1);
  const rect = wineBuilder.getBoundingClientRect();
  const sectionProgress = clamp(-rect.top / travel, 0, 1);
  const isResultResetting = Date.now() < tasteResultResetUntil;
  const chartPeekProgress = isComplete
    && !isResultResetting
    ? smoothStep((sectionProgress - 0.12) / 0.14)
    : 0;
  const slideProgress = isComplete
    && !isResultResetting
    ? smoothStep((sectionProgress - 0.3) / 0.38)
    : 0;
  const profileShift = -118 * slideProgress;
  const chartShift = clamp(118 - chartPeekProgress * 36 - slideProgress * 82, 0, 118);
  const chartOpacity = Math.max(chartPeekProgress, slideProgress);
  const profileScale = 1;
  const detailTextProgress = isComplete ? 1 : 0;
  const detailTextY = 10 * (1 - detailTextProgress);

  root.style.setProperty("--taste-detail-progress", slideProgress.toFixed(3));
  root.style.setProperty("--profile-slide-x", `${profileShift.toFixed(2)}vw`);
  root.style.setProperty("--profile-scale", profileScale.toFixed(3));
  root.style.setProperty("--profile-detail-opacity", detailTextProgress.toFixed(3));
  root.style.setProperty("--profile-detail-y", `${detailTextY.toFixed(1)}px`);
  root.style.setProperty("--chart-slide-x", `${chartShift.toFixed(2)}vw`);
  root.style.setProperty("--chart-opacity", chartOpacity.toFixed(3));
}

function updateTasteRecommendation() {
  if (!recommendationTitle || !recommendationText) return;

  const { body, flavor, age } = tasteProfile;
  const isComplete = Boolean(body && flavor && age);
  const isShowingResult = isComplete && tasteCurrentStep >= tasteQuestions.length;
  const profileKey = `${body}-${flavor}-${age}`;

  if (tagBody) tagBody.textContent = profileLabels[body] || "frecuencia";
  if (tagFlavor) tagFlavor.textContent = profileLabels[flavor] || "momento";
  if (tagAge) tagAge.textContent = profileLabels[age] || "atención";

  if (!isComplete) {
    recommendationShown = false;
    wineBuilder?.classList.remove("is-complete");
    wineBuilder?.style.removeProperty("--result-color");
    recommendationTitle.textContent = "Elegí tus tres rasgos";
    recommendationText.textContent =
      "La recomendación aparece cuando terminás de armar el perfil de tu copa.";
    profileCharts.forEach((chart) => chart.classList.remove("is-active"));
    wineBuilder?.removeAttribute("data-profile-key");
    updateTasteFlow();
    updateTasteDetailState();
    return;
  }

  const recommendation = recommendations[profileKey];
  wineBuilder?.style.setProperty("--result-color", recommendation.color);
  wineBuilder?.setAttribute("data-profile-key", profileKey);
  recommendationTitle.textContent = recommendation.title;
  recommendationText.textContent = recommendation.text;
  wineBuilder?.classList.toggle("is-complete", isShowingResult);
  profileCharts.forEach((chart) => {
    chart.classList.toggle("is-active", chart.dataset.profileChart === profileKey);
  });
  updateTasteFlow();
  updateTasteDetailState();

  if (!isShowingResult) {
    recommendationShown = false;
    return;
  }

  updateRadar();

  if (!recommendationShown) {
    recommendationShown = true;
    tasteResultResetUntil = Date.now() + 760;
    updateTasteDetailState();
    window.setTimeout(() => {
      wineBuilder?.scrollIntoView({ behavior: "smooth", block: "start" });
      updateTasteDetailState();
    }, 40);
    window.setTimeout(() => {
      tasteResultResetUntil = 0;
      updateTasteDetailState();
    }, 820);
  }
}

function getRadarValues() {
  return {
    body: tasteProfile.body === "seguido" ? 0.86 : 0.48,
    aroma: tasteProfile.flavor === "mesa" ? 0.76 : 0.58,
    finish: tasteProfile.age === "atento" ? 0.88 : 0.5,
    acidity: tasteProfile.body === "poco" ? 0.72 : 0.52,
    fruit: tasteProfile.flavor === "ocasiones" ? 0.66 : 0.82,
  };
}

function updateRadar() {
  if (!radarShape) return;

  const values = getRadarValues();
  const center = { x: 130, y: 130 };
  const axes = [
    { x: 130, y: 24, value: values.body },
    { x: 230, y: 94, value: values.aroma },
    { x: 192, y: 216, value: values.finish },
    { x: 68, y: 216, value: values.acidity },
    { x: 30, y: 94, value: values.fruit },
  ];
  const points = axes.map((axis) => {
    const x = center.x + (axis.x - center.x) * axis.value;
    const y = center.y + (axis.y - center.y) * axis.value;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  radarShape.setAttribute("points", points.join(" "));
}

function renderTastingStep() {
  const step = tastingSteps[currentTastingStep];
  if (!step || !tastingSection) return;

  tastingSection.dataset.step = String(currentTastingStep);
  root.dataset.tastingStep = String(currentTastingStep);
  tastingCopyPanels.forEach((panel) => {
    panel.classList.toggle("is-current", Number(panel.dataset.step) === currentTastingStep);
  });
  if (tastingStepLabel) tastingStepLabel.textContent = step.label;
  if (tastingTitle) tastingTitle.textContent = step.title;
  if (tastingText) tastingText.textContent = step.text;
  if (nextStep) nextStep.textContent = step.button;
  if (prevStep) {
    prevStep.disabled = currentTastingStep === 0;
    prevStep.hidden = currentTastingStep === 0;
  }
  updateRadar();
}

function projectMapPoint(lat, lon) {
  return {
    x: ((lon + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 520,
  };
}

function moveMapTooltip(event) {
  if (!mapTooltip) return;

  const offset = 18;
  const tooltipWidth = mapTooltip.offsetWidth || 300;
  const origin = Number.isFinite(event.clientX)
    ? { x: event.clientX, y: event.clientY }
    : {
        x: event.currentTarget.getBoundingClientRect().left,
        y: event.currentTarget.getBoundingClientRect().top,
      };
  const left = Math.min(origin.x + offset, window.innerWidth - tooltipWidth - 18);
  const top = Math.max(82, origin.y - 18);
  mapTooltip.style.transform = `translate(${left}px, ${top}px)`;
}

function showMapTooltip(event, item) {
  if (!mapTooltip) return;

  mapTooltip.innerHTML = `
    <strong>${item.country}</strong>
    <span>${item.consumption.toLocaleString("es-AR")} millones hl</span>
    <p>${item.fact}</p>
  `;
  mapTooltip.classList.add("is-visible");
  moveMapTooltip(event);
}

function hideMapTooltip() {
  mapTooltip?.classList.remove("is-visible");
}

function renderWineMap() {
  if (!mapPointsLayer) return;

  const maxConsumption = Math.max(...wineConsumptionData.map((item) => item.consumption));
  mapPointsLayer.innerHTML = "";
  if (mapHotspotsLayer) mapHotspotsLayer.innerHTML = "";

  wineConsumptionData.forEach((item) => {
    const point = projectMapPoint(item.lat, item.lon);
    const radius = 5 + Math.sqrt(item.consumption / maxConsumption) * 23;
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const hotspot = document.createElement("button");

    group.classList.add("map-point");
    group.setAttribute("tabindex", "0");
    group.setAttribute("role", "button");
    group.setAttribute("aria-label", `${item.country}: ${item.consumption} millones de hectolitros`);
    group.setAttribute("transform", `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)})`);

    circle.setAttribute("r", radius.toFixed(1));

    const bindTooltip = (target) => {
      target.addEventListener("mouseenter", (event) => showMapTooltip(event, item));
      target.addEventListener("mousemove", moveMapTooltip);
      target.addEventListener("mouseleave", hideMapTooltip);
      target.addEventListener("pointerenter", (event) => showMapTooltip(event, item));
      target.addEventListener("pointermove", moveMapTooltip);
      target.addEventListener("pointerleave", hideMapTooltip);
      target.addEventListener("click", (event) => showMapTooltip(event, item));
    };

    group.append(circle);
    bindTooltip(group);
    bindTooltip(circle);
    group.addEventListener("focus", (event) => showMapTooltip(event, item));
    group.addEventListener("blur", hideMapTooltip);

    mapPointsLayer.append(group);

    if (mapHotspotsLayer) {
      hotspot.className = "map-hotspot";
      hotspot.type = "button";
      hotspot.setAttribute("aria-label", `${item.country}: ${item.consumption} millones de hectolitros`);
      hotspot.style.left = `${(point.x / 1000) * 100}%`;
      hotspot.style.top = `${(point.y / 520) * 100}%`;
      hotspot.style.width = `${Math.max(radius * 2.4, 24)}px`;
      hotspot.style.height = `${Math.max(radius * 2.4, 24)}px`;
      bindTooltip(hotspot);
      hotspot.addEventListener("mouseenter", () => group.classList.add("is-active"));
      hotspot.addEventListener("mouseleave", () => group.classList.remove("is-active"));
      hotspot.addEventListener("pointerenter", () => group.classList.add("is-active"));
      hotspot.addEventListener("pointerleave", () => group.classList.remove("is-active"));
      hotspot.addEventListener("focus", (event) => showMapTooltip(event, item));
      hotspot.addEventListener("focus", () => group.classList.add("is-active"));
      hotspot.addEventListener("blur", () => {
        group.classList.remove("is-active");
        hideMapTooltip();
      });
      mapHotspotsLayer.append(hotspot);
    }
  });
}

function updateWorldState() {
  if (!worldSection) return;

  const travel = Math.max(worldSection.offsetHeight - window.innerHeight, 1);
  const rect = worldSection.getBoundingClientRect();
  const worldProgress = clamp(-rect.top / travel, 0, 1);
  const questionOpacity = 1 - clamp(worldProgress * 2.4, 0, 1);
  const noteIn = clamp((worldProgress - 0.18) * 4, 0, 1);
  const noteOut = clamp((worldProgress - 0.55) * 4, 0, 1);
  const noteOpacity = noteIn * (1 - noteOut);
  const mapProgress = clamp((worldProgress - 0.58) * 2.6, 0, 1);

  root.style.setProperty("--world-progress", worldProgress.toFixed(3));
  root.style.setProperty("--world-question-opacity", questionOpacity.toFixed(3));
  root.style.setProperty("--world-note-in", noteIn.toFixed(3));
  root.style.setProperty("--world-note-out", noteOut.toFixed(3));
  root.style.setProperty("--world-note-opacity", noteOpacity.toFixed(3));
  root.style.setProperty("--world-map-progress", mapProgress.toFixed(3));
}

function updateArgentinaState() {
  if (!argentinaSection) return;

  const travel = Math.max(argentinaSection.offsetHeight - window.innerHeight, 1);
  const rect = argentinaSection.getBoundingClientRect();
  const argProgress = clamp(-rect.top / travel, 0, 1);
  const questionOpacity = 1 - clamp(argProgress / 0.18, 0, 1);
  const noteIn = clamp((argProgress - 0.1) / 0.13, 0, 1);
  const noteOut = clamp((argProgress - 0.31) / 0.13, 0, 1);
  const noteOpacity = noteIn * (1 - noteOut);
  const mapProgress = clamp((argProgress - 0.36) / 0.14, 0, 1);
  const zoomStage = clamp((argProgress - 0.47) / 0.53, 0, 1);
  const metaFade = 1 - clamp((zoomStage - 0.07) / 0.18, 0, 1);
  const mapMetaOpacity = mapProgress * metaFade;
  const mapY = mapMetaOpacity * 28;
  const neighborOpacity = 1 - clamp((zoomStage - 0.1) / 0.34, 0, 1);
  const pointsOpacity = neighborOpacity;
  const neighborY = clamp(zoomStage / 0.55, 0, 1);
  const zoomProgress = clamp((zoomStage - 0.18) / 0.42, 0, 1);
  const argZoom = 1 + zoomProgress * 1.85;
  const argShift = clamp((zoomStage - 0.58) / 0.27, 0, 1);
  const copyOpacity = clamp((zoomStage - 0.66) / 0.24, 0, 1);
  const focusOpacity = 0.45 + clamp(zoomStage / 0.42, 0, 1) * 0.55;

  root.style.setProperty("--arg-progress", argProgress.toFixed(3));
  root.style.setProperty("--world-progress", argProgress.toFixed(3));
  root.style.setProperty("--world-question-opacity", questionOpacity.toFixed(3));
  root.style.setProperty("--world-note-in", noteIn.toFixed(3));
  root.style.setProperty("--world-note-out", noteOut.toFixed(3));
  root.style.setProperty("--world-note-opacity", noteOpacity.toFixed(3));
  root.style.setProperty("--world-map-progress", mapProgress.toFixed(3));
  root.style.setProperty("--arg-map-stage-opacity", mapProgress.toFixed(3));
  root.style.setProperty("--arg-map-meta-opacity", mapMetaOpacity.toFixed(3));
  root.style.setProperty("--arg-map-y", `${mapY.toFixed(2)}vh`);
  root.style.setProperty("--arg-points-opacity", pointsOpacity.toFixed(3));
  root.style.setProperty("--arg-neighbor-opacity", neighborOpacity.toFixed(3));
  root.style.setProperty("--arg-neighbor-y", neighborY.toFixed(3));
  root.style.setProperty("--arg-zoom", argZoom.toFixed(3));
  root.style.setProperty("--arg-shift", argShift.toFixed(3));
  root.style.setProperty("--arg-copy-opacity", copyOpacity.toFixed(3));
  root.style.setProperty("--arg-focus-opacity", focusOpacity.toFixed(3));
  root.classList.toggle("is-argentina-focus", pointsOpacity < 0.08);

  if (pointsOpacity < 0.08) {
    hideMapTooltip();
  }
}

function updateCalendarState() {
  if (!calendarSection) return;

  const travel = Math.max(calendarSection.offsetHeight - window.innerHeight, 1);
  const rect = calendarSection.getBoundingClientRect();
  const calendarProgress = clamp(-rect.top / travel, 0, 1);
  const copyProgress = clamp(calendarProgress / 0.24, 0, 1);
  const stainProgress = clamp((calendarProgress - 0.18) / 0.64, 0, 1);
  const noteProgress = clamp((calendarProgress - 0.74) / 0.2, 0, 1);

  root.style.setProperty("--calendar-progress", calendarProgress.toFixed(3));
  root.style.setProperty("--calendar-copy-progress", copyProgress.toFixed(3));
  root.style.setProperty("--calendar-stain-progress", stainProgress.toFixed(3));
  root.style.setProperty("--calendar-note-progress", noteProgress.toFixed(3));
}

function updateVarietalState() {
  if (!varietalSection) return;

  const travel = Math.max(varietalSection.offsetHeight - window.innerHeight, 1);
  const rect = varietalSection.getBoundingClientRect();
  const varietalProgress = clamp(-rect.top / travel, 0, 1);
  const copyOpacity = 1 - clamp((varietalProgress - 0.02) / 0.18, 0, 1);
  const lineupOpacity = clamp((varietalProgress - 0.08) / 0.12, 0, 1);
  const turnProgress = clamp((varietalProgress - 0.13) / 0.45, 0, 1);
  const transitionProgress = smoothStep((varietalProgress - 0.58) / 0.16);
  const labelClearProgress = smoothStep((varietalProgress - 0.58) / 0.07);
  const heroProgress = smoothStep((varietalProgress - 0.62) / 0.13);
  const questionInProgress = smoothStep((varietalProgress - 0.67) / 0.07);
  const questionOutProgress = smoothStep((varietalProgress - 0.805) / 0.035);
  const questionProgress = questionInProgress * (1 - questionOutProgress);
  const backgroundProgress = smoothStep((varietalProgress - 0.61) / 0.12);
  const corkProgress = smoothStep((varietalProgress - 0.805) / 0.06);
  const corkFadeProgress = smoothStep((varietalProgress - 0.858) / 0.026);
  const corkOpacity = (heroProgress > 0.985 ? 1 : 0) * (1 - corkFadeProgress);
  const sprayProgress = smoothStep((varietalProgress - 0.815) / 0.05);
  const sprayFadeProgress = smoothStep((varietalProgress - 0.856) / 0.028);
  const sprayOpacity = sprayProgress * (1 - sprayFadeProgress);
  const sprayDistance = 52 * sprayProgress;
  const bottlePourProgress = smoothStep((varietalProgress - 0.858) / 0.052);
  const streamInProgress = smoothStep((varietalProgress - 0.895) / 0.03);
  const streamLength = smoothStep((varietalProgress - 0.9) / 0.055);
  const bottleLiftProgress = smoothStep((varietalProgress - 0.915) / 0.05);
  const bridgeGlassProgress = smoothStep((varietalProgress - 0.925) / 0.045);
  const streamOutProgress = smoothStep((varietalProgress - 0.982) / 0.018);
  const streamLiftProgress = smoothStep((varietalProgress - 0.982) / 0.018);
  const streamOpacity = streamInProgress * (1 - streamOutProgress);
  const streamTopCut = 0;
  const streamBottomCut = Math.max((1 - streamLength) * 100, streamOutProgress * 100);
  const bridgeGlassY = (1 - bridgeGlassProgress) * 128;
  const bridgeGlassOpacity = bridgeGlassProgress;
  const bridgeGlassScale = 1;
  const bridgeFillProgress = smoothStep((varietalProgress - 0.946) / 0.036);
  const heroIndex = Math.floor(varietalBottles.length / 2);

  root.style.setProperty("--varietal-progress", varietalProgress.toFixed(3));
  root.style.setProperty("--varietal-copy-opacity", copyOpacity.toFixed(3));
  root.style.setProperty("--varietal-lineup-opacity", lineupOpacity.toFixed(3));
  root.style.setProperty("--bottle-transition-bg-opacity", backgroundProgress.toFixed(3));
  root.style.setProperty("--bottle-question-opacity", questionProgress.toFixed(3));
  root.style.setProperty("--bridge-stream-opacity", streamOpacity.toFixed(3));
  root.style.setProperty("--bridge-stream-length", streamLength.toFixed(3));
  root.style.setProperty("--bridge-stream-cut", `${streamBottomCut.toFixed(2)}%`);
  root.style.setProperty("--bridge-stream-top-cut", `${streamTopCut.toFixed(2)}%`);
  root.style.setProperty("--bridge-stream-bottom-cut", `${streamBottomCut.toFixed(2)}%`);
  root.style.setProperty("--bridge-stream-y", `${(-30 * streamLiftProgress).toFixed(2)}vh`);
  root.style.setProperty("--bridge-glass-opacity", bridgeGlassOpacity.toFixed(3));
  root.style.setProperty("--bridge-glass-y", `${bridgeGlassY.toFixed(2)}vh`);
  root.style.setProperty("--bridge-glass-scale", bridgeGlassScale.toFixed(3));
  root.style.setProperty("--bridge-wine-fill-progress", bridgeFillProgress.toFixed(3));

  const bridgeWineLevel = buildBridgeWineLevel(bridgeFillProgress);
  bridgeWineFill?.setAttribute("d", bridgeWineLevel.fill);
  bridgeWineSurface?.setAttribute("d", bridgeWineLevel.top);

  varietalBottles.forEach((bottle, index) => {
    const slot = bottle.closest(".varietal-slot");
    const isHeroBottle = index === heroIndex;
    const bottleProgress = smoothStep((turnProgress * varietalBottles.length - index) / 0.86);
    const sideProgress = Math.sin(bottleProgress * Math.PI);
    const cylinderProgress = clamp(sideProgress, 0, 1);
    const frontExit = clamp(bottleProgress / 0.5, 0, 1);
    const backEnter = clamp((bottleProgress - 0.5) / 0.5, 0, 1);
    const frontOffset = -frontExit * 96;
    const backOffset = (1 - backEnter) * 96;
    const edgeOpacity = 0.08 + cylinderProgress * 0.38;
    const labelEdgeOpacity = 0.06 + cylinderProgress * 0.34;
    const shineLeft = 26 + bottleProgress * 48;
    const backLabelOpacity = smoothStep((bottleProgress - 0.62) / 0.18);
    const frontLabelOpacity = 1 - smoothStep((bottleProgress - 0.38) / 0.18);
    const labelFade = 1 - labelClearProgress;

    if (slot) {
      if (isHeroBottle) {
        slot.style.setProperty("--slot-exit-x", "0vw");
        slot.style.setProperty("--slot-exit-y", "0vh");
        slot.style.setProperty("--slot-exit-opacity", "1");
      } else {
        const distanceFromHero = index - heroIndex;
        const exitOpacity = 1 - smoothStep((transitionProgress - 0.54) / 0.4);
        slot.style.setProperty("--slot-exit-x", `${(distanceFromHero * 3.2 * transitionProgress).toFixed(2)}vw`);
        slot.style.setProperty("--slot-exit-y", `${(-128 * transitionProgress).toFixed(2)}vh`);
        slot.style.setProperty("--slot-exit-opacity", exitOpacity.toFixed(3));
      }
    }

    if (isHeroBottle) {
      const heroScale = 1 + heroProgress * 1.18 - bottlePourProgress * 0.44;
      const pourCoverY = 4.5 * bottlePourProgress * (1 - bottleLiftProgress);
      bottle.style.setProperty("--hero-x", "0px");
      bottle.style.setProperty("--hero-y", `${(-8 * heroProgress + pourCoverY - 118 * bottleLiftProgress).toFixed(2)}vh`);
      bottle.style.setProperty("--hero-rotate", `${(-90 * heroProgress - 15 * bottlePourProgress).toFixed(2)}deg`);
      bottle.style.setProperty("--hero-scale", heroScale.toFixed(3));
      bottle.style.setProperty("--hero-z", heroProgress > 0.01 ? "10" : "0");
      bottle.style.setProperty("--bridge-cork-progress", corkProgress.toFixed(3));
      bottle.style.setProperty("--bridge-cork-opacity", corkOpacity.toFixed(3));
      bottle.style.setProperty("--bridge-spray-progress", sprayProgress.toFixed(3));
      bottle.style.setProperty("--bridge-spray-opacity", sprayOpacity.toFixed(3));
      bottle.style.setProperty("--bridge-spray-distance", `${sprayDistance.toFixed(2)}px`);
    } else {
      bottle.style.setProperty("--hero-x", "0px");
      bottle.style.setProperty("--hero-y", "0vh");
      bottle.style.setProperty("--hero-rotate", "0deg");
      bottle.style.setProperty("--hero-scale", "1");
      bottle.style.setProperty("--hero-z", "0");
      bottle.style.setProperty("--bridge-cork-progress", "0");
      bottle.style.setProperty("--bridge-cork-opacity", "0");
      bottle.style.setProperty("--bridge-spray-progress", "0");
      bottle.style.setProperty("--bridge-spray-opacity", "0");
      bottle.style.setProperty("--bridge-spray-distance", "0px");
    }

    bottle.style.setProperty("--bottle-turn", `${(bottleProgress * 180).toFixed(2)}deg`);
    bottle.style.setProperty("--varietal-active", cylinderProgress.toFixed(3));
    bottle.style.setProperty("--bottle-edge-opacity", edgeOpacity.toFixed(3));
    bottle.style.setProperty("--front-label-offset", `${frontOffset.toFixed(2)}%`);
    bottle.style.setProperty("--back-label-offset", `${backOffset.toFixed(2)}%`);
    bottle.style.setProperty("--label-edge-opacity", labelEdgeOpacity.toFixed(3));
    bottle.style.setProperty("--label-spine-opacity", cylinderProgress.toFixed(3));
    bottle.style.setProperty("--bottle-shine-left", `${shineLeft.toFixed(1)}%`);
    bottle.style.setProperty("--front-label-opacity", (frontLabelOpacity * labelFade).toFixed(3));
    bottle.style.setProperty("--back-label-opacity", (backLabelOpacity * labelFade).toFixed(3));
  });

  const heroBottle = varietalBottles[heroIndex];
  const pin = varietalSection.querySelector(".varietal-pin");
  if (heroBottle && pin) {
    const heroRect = heroBottle.getBoundingClientRect();
    const pinRect = pin.getBoundingClientRect();
    const bottleCenterX = heroRect.left + heroRect.width / 2;
    const bodyCenterX = heroRect.left + heroRect.width * 0.62;
    const mouthAnchor = heroBottle.querySelector(".bottle-mouth-anchor");
    let heroCorrection = (window.innerWidth / 2 - bottleCenterX) * heroProgress;

    if (mouthAnchor && bridgeGlassSurface) {
      const mouthRect = mouthAnchor.getBoundingClientRect();
      const surfaceRect = bridgeGlassSurface.getBoundingClientRect();

      if (mouthRect.width && surfaceRect.width) {
        const centeredMouthX = mouthRect.left + mouthRect.width / 2 + heroCorrection;
        const targetMouthX = surfaceRect.left + surfaceRect.width / 2 - mouthRect.width * 0.16;
        const pourAlignmentProgress = smoothStep((varietalProgress - 0.82) / 0.07);
        const mouthCorrection = targetMouthX - centeredMouthX;
        heroCorrection += mouthCorrection * pourAlignmentProgress;
      }
    }

    heroBottle.style.setProperty("--hero-x", `${heroCorrection.toFixed(2)}px`);
    root.style.setProperty("--bottle-body-title-x", `${(bodyCenterX + heroCorrection - pinRect.left).toFixed(2)}px`);

    if (
      bridgePour &&
      bridgePourPath &&
      bridgePourShadow &&
      bridgeGlassSurface &&
      mouthAnchor
    ) {
      const correctedMouthRect = mouthAnchor.getBoundingClientRect();
      const surfaceRect = bridgeGlassSurface.getBoundingClientRect();
      const wineSurfaceRect = bridgeWineSurface?.getBoundingClientRect();
      const pourTargetRect =
        wineSurfaceRect?.width && wineSurfaceRect?.height ? wineSurfaceRect : surfaceRect;
      const mouthWidth = clamp(Math.min(correctedMouthRect.width, correctedMouthRect.height) * 1.18, 24, 46);
      root.style.setProperty("--bridge-stream-width", `${mouthWidth.toFixed(2)}px`);
      root.style.setProperty("--bridge-stream-shadow-width", `${(mouthWidth + 10).toFixed(2)}px`);
      const surfaceEnd = {
        x: pourTargetRect.left + pourTargetRect.width / 2 - pinRect.left,
        y: pourTargetRect.top + pourTargetRect.height * 0.5 - pinRect.top,
      };
      const fixedMouthWidth = mouthWidth;
      const streamX = surfaceEnd.x;
      const sourceX = streamX + fixedMouthWidth * 0.16;
      const start = {
        x: sourceX,
        y: correctedMouthRect.top + correctedMouthRect.height * 0.54 - pinRect.top,
      };
      const end = {
        x: streamX,
        y: surfaceEnd.y + fixedMouthWidth * 0.08,
      };
      const distance = Math.max(end.y - start.y, fixedMouthWidth * 4);
      const controlStart = {
        x: sourceX,
        y: start.y + clamp(distance * 0.32, 90, 260),
      };
      const controlEnd = {
        x: streamX,
        y: end.y - clamp(distance * 0.3, 110, 320),
      };
      const streamShape = buildLiquidStreamShape(
        start,
        controlStart,
        controlEnd,
        end,
        (progress) => {
          const inletOpen = smoothStep(progress / 0.2);
          const taper = fixedMouthWidth * (0.46 + inletOpen * 0.42 - progress * 0.28);
          const pulse =
            Math.sin(progress * Math.PI * 2.2) * fixedMouthWidth * 0.035 +
            Math.sin(progress * Math.PI * 5.1) * fixedMouthWidth * 0.018;
          const minWidth = fixedMouthWidth * (0.42 + inletOpen * 0.12);
          return clamp(taper + pulse, minWidth, fixedMouthWidth * 1.02);
        },
      );
      const streamCenter = buildBezierPath(start, controlStart, controlEnd, end);

      bridgePour.setAttribute(
        "viewBox",
        `0 0 ${Math.ceil(pinRect.width)} ${Math.ceil(pinRect.height)}`,
      );
      bridgePourPath.setAttribute("d", streamShape);
      bridgePourShadow.setAttribute("d", streamShape);
      bridgePourHighlight?.setAttribute("d", streamCenter);
    }
  }
}

function updateFlourishStoryState() {
  if (!flourishStorySection) return;

  const iframe = flourishStorySection.querySelector(".flourish-embed iframe");
  if (!iframe || !iframe.src) return;

  const slideCount = Math.max(Number(flourishStorySection.dataset.slideCount) || 1, 1);
  const travel = Math.max(flourishStorySection.offsetHeight - window.innerHeight, 1);
  const rect = flourishStorySection.getBoundingClientRect();
  const storyProgress = clamp(-rect.top / travel, 0, 1);
  const slideIndex = Math.min(slideCount - 1, Math.floor(storyProgress * slideCount));

  if (slideIndex === flourishStorySlideIndex) return;

  flourishStorySlideIndex = slideIndex;
  iframe.src = iframe.src.replace(/#slide-\d+$/, "") + `#slide-${slideIndex}`;
}

function updatePourState() {
  if (!pourSection) return;

  const travel = Math.max(pourSection.offsetHeight - window.innerHeight, 1);
  const rect = pourSection.getBoundingClientRect();
  const pourProgress = clamp(-rect.top / travel, 0, 1);

  root.style.setProperty("--pour-progress", pourProgress.toFixed(3));
}

function updateCompositionState() {
  if (!compositionSection) return;

  const travel = Math.max(compositionSection.offsetHeight - window.innerHeight, 1);
  const rect = compositionSection.getBoundingClientRect();
  const compositionProgress = clamp(-rect.top / travel, 0, 1);
  const isCompositionActive = rect.top <= window.innerHeight && rect.bottom >= 0;
  const isCompositionNear = rect.top <= window.innerHeight * 1.15 && rect.bottom >= 0;
  const chartIn = smoothStep((compositionProgress - 0.04) / 0.13);
  const chartOut = smoothStep((compositionProgress - 0.86) / 0.1);
  const chartVisible = chartIn * (1 - chartOut);
  const chartX = -42 * (1 - chartIn) - 42 * chartOut;
  const chartScale = 0.94 + chartIn * 0.06 - chartOut * 0.04;
  const copyIn = smoothStep((compositionProgress - 0.12) / 0.12);
  const copyOut = smoothStep((compositionProgress - 0.84) / 0.08);
  const copyVisible = copyIn * (1 - copyOut);
  const copyY = 0;
  const glassCentering = smoothStep((compositionProgress - 0.62) / 0.3);
  const glassShift = 22 * (1 - glassCentering);
  const focusStart = 0.25;
  const focusEnd = 0.79;
  const focusProgress = clamp(
    (compositionProgress - focusStart) / (focusEnd - focusStart),
    0,
    0.999,
  );
  const segmentFloat = focusProgress * compositionSlices.length;
  const activeSliceIndex =
    compositionProgress >= focusStart && compositionProgress <= focusEnd
      ? Math.min(compositionSlices.length - 1, Math.floor(segmentFloat))
      : -1;
  const activeSliceProgress =
    activeSliceIndex >= 0 ? segmentFloat - activeSliceIndex : 0;
  const sliceFocus =
    activeSliceIndex >= 0
      ? smoothStep(activeSliceProgress / 0.18)
        * (1 - smoothStep((activeSliceProgress - 0.82) / 0.18))
      : 0;

  root.classList.toggle("is-composition-active", isCompositionActive);
  root.classList.toggle("is-composition-near", isCompositionNear);
  root.style.setProperty("--composition-progress", compositionProgress.toFixed(3));
  root.style.setProperty("--composition-chart-x", `${chartX.toFixed(2)}vw`);
  root.style.setProperty("--composition-chart-opacity", chartVisible.toFixed(3));
  root.style.setProperty("--composition-chart-scale", chartScale.toFixed(3));
  root.style.setProperty("--composition-copy-opacity", copyVisible.toFixed(3));
  root.style.setProperty("--composition-copy-y", `${copyY.toFixed(2)}rem`);

  if (isCompositionNear) {
    root.style.setProperty("--bridge-glass-extra-x", `${glassShift.toFixed(2)}vw`);
    root.style.setProperty("--bridge-glass-y", "0vh");
    root.style.setProperty("--bridge-glass-scale", "1");
    root.style.setProperty("--bridge-glass-rotate", "0deg");
    root.style.setProperty("--shared-glass-opacity", "1");
  }

  compositionSlices.forEach((slice, index) => {
    const focus = index === activeSliceIndex ? sliceFocus : 0;
    const midAngle = Number(slice.dataset.midAngle) || 0;
    const percent = Number(slice.dataset.percent) || 0;
    const popDistance = percent > 50 ? 13 : percent > 5 ? 22 : 18;
    const scaleBoost = percent > 50 ? 0.018 : percent > 5 ? 0.032 : 0.006;
    const pop = compositionPoint(popDistance * focus, midAngle);

    slice.style.setProperty("--slice-pop-x", `${pop.x.toFixed(2)}px`);
    slice.style.setProperty("--slice-pop-y", `${pop.y.toFixed(2)}px`);
    slice.style.setProperty("--slice-scale", (1 + focus * scaleBoost).toFixed(3));
    slice.style.setProperty("--slice-focus", focus.toFixed(3));
  });

  compositionDetails.forEach((detail, index) => {
    const detailFocus = index === activeSliceIndex ? sliceFocus : 0;

    detail.classList.toggle("is-active", detailFocus > 0.02);
    detail.style.setProperty("--detail-opacity", detailFocus.toFixed(3));
    detail.style.setProperty("--detail-y", "0rem");
  });
}

function updateFermentationState() {
  if (!fermentationSection) return;

  const travel = Math.max(fermentationSection.offsetHeight - window.innerHeight, 1);
  const rect = fermentationSection.getBoundingClientRect();
  const fermentationProgress = clamp(-rect.top / travel, 0, 1);
  const isFermentationActive = rect.top <= window.innerHeight && rect.bottom >= 0;
  const isFermentationNear = rect.top <= window.innerHeight * 1.08 && rect.bottom >= 0;
  const copyIn = smoothStep((fermentationProgress - 0.1) / 0.14);
  const copyOut = smoothStep((fermentationProgress - 0.78) / 0.1);
  const chartIn = smoothStep((fermentationProgress - 0.14) / 0.3);
  const chartOut = smoothStep((fermentationProgress - 0.76) / 0.2);
  const chartVisible = chartIn * (1 - chartOut);
  const chartX = -52 * (1 - chartIn) - 52 * chartOut;
  const chartAfterX = 52 * (1 - chartIn) + 52 * chartOut;
  const chartY = -1.5 * chartIn - 2 * chartOut;
  const chartScale = 0.98 + chartIn * 0.02 - chartOut * 0.02;
  const glassShift = 0;
  const glassScale = 1;

  root.classList.toggle("is-fermentation-active", isFermentationActive);
  root.classList.toggle("is-fermentation-near", isFermentationNear);
  root.style.setProperty("--fermentation-progress", fermentationProgress.toFixed(3));
  root.style.setProperty("--fermentation-copy-opacity", (copyIn * (1 - copyOut)).toFixed(3));
  root.style.setProperty("--fermentation-copy-x", `${(-12 * (1 - copyIn) - 12 * copyOut).toFixed(2)}vw`);
  root.style.setProperty("--fermentation-chart-opacity", chartVisible.toFixed(3));
  root.style.setProperty("--fermentation-chart-x", `${chartX.toFixed(2)}vw`);
  root.style.setProperty("--fermentation-chart-after-x", `${chartAfterX.toFixed(2)}vw`);
  root.style.setProperty("--fermentation-chart-y", `${chartY.toFixed(2)}vh`);
  root.style.setProperty("--fermentation-chart-scale", chartScale.toFixed(3));

  if (isFermentationNear) {
    root.style.setProperty("--bridge-glass-opacity", "1");
    root.style.setProperty("--bridge-glass-extra-x", `${glassShift.toFixed(2)}vw`);
    root.style.setProperty("--bridge-glass-y", "0vh");
    root.style.setProperty("--bridge-glass-scale", glassScale.toFixed(3));
    root.style.setProperty("--bridge-glass-rotate", "0deg");
    root.style.setProperty("--shared-glass-opacity", "1");
  }
}

function updateTastingScrollState() {
  if (!tastingSection) return;

  const travel = Math.max(tastingSection.offsetHeight - window.innerHeight, 1);
  const rect = tastingSection.getBoundingClientRect();
  const tastingProgress = clamp(-rect.top / travel, 0, 1);
  const isTastingActive = rect.top <= window.innerHeight && rect.bottom >= 0;
  const isTastingNear = rect.top <= window.innerHeight * 1.08 && rect.bottom >= 0;
  const entryProgress = 1;
  const copyY = 12 - tastingProgress * 24;
  const copyOpacity = smoothStep((tastingProgress - 0.025) / 0.11);
  const tastingGlassEntry = smoothStep(tastingProgress / 0.28);
  const glassShift = isTastingActive ? 22 * tastingGlassEntry : 0;
  const discoverGlassFade = smoothStep((tastingProgress - 0.8) / 0.1);
  const sharedGlassOpacity =
    isTastingActive ? 1 - discoverGlassFade : rect.top > window.innerHeight ? 1 : 0;
  const slideProgress = clamp((tastingProgress - 0.035) / 0.93, 0, 0.999);
  const stepCount = tastingSteps.length;
  const stepFloat = slideProgress * stepCount;
  const phaseIndex = Math.min(stepCount - 1, Math.floor(stepFloat));
  const phaseProgress = stepFloat - phaseIndex;
  const enterEnd = 0.18;
  const holdEnd = 0.68;
  const exitEnd = 0.84;
  const activeTextIndex = phaseProgress < exitEnd ? phaseIndex : -1;
  const activeEffectStep = phaseProgress >= exitEnd ? 0 : phaseIndex;
  const nextTastingStep = activeEffectStep;

  root.classList.toggle("is-tasting-active", isTastingActive);
  root.style.setProperty("--tasting-progress", tastingProgress.toFixed(3));
  root.style.setProperty("--tasting-entry-progress", entryProgress.toFixed(3));
  root.style.setProperty("--tasting-copy-y", `${copyY.toFixed(2)}vh`);
  root.style.setProperty("--tasting-copy-opacity", copyOpacity.toFixed(3));
  root.style.setProperty("--tasting-glass-drop-y", "0vh");
  if (isTastingNear) {
    root.style.setProperty("--bridge-glass-extra-x", `${glassShift.toFixed(2)}vw`);
    root.style.setProperty("--shared-glass-opacity", sharedGlassOpacity.toFixed(3));
  }
  tastingCopyPanels.forEach((panel, index) => {
    let panelOpacity = 0;
    let panelY = 68;
    let panelScale = 0.985;

    if (index < phaseIndex) {
      panelY = -68;
    } else if (index === activeTextIndex) {
      panelOpacity = copyOpacity;
      panelScale = 1;

      if (phaseProgress < enterEnd) {
        const enterProgress = smoothStep(phaseProgress / enterEnd);
        panelY = (1 - enterProgress) * 68;
      } else if (phaseProgress < holdEnd) {
        panelY = 0;
      } else {
        const exitProgress = smoothStep((phaseProgress - holdEnd) / (exitEnd - holdEnd));
        panelY = -exitProgress * 68;
      }
    }

    panel.style.setProperty("--panel-opacity", panelOpacity.toFixed(3));
    panel.style.setProperty("--panel-y", `${panelY.toFixed(2)}vh`);
    panel.style.setProperty("--panel-scale", panelScale.toFixed(3));
  });

  if (nextTastingStep !== currentTastingStep) {
    currentTastingStep = nextTastingStep;
    renderTastingStep();
  }
}

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

  if (progress) {
    progress.style.width = `${scrollPercent}%`;
  }

  updatePosterCorkPosition();
  updateIntroState();
  updateWorldState();
  updateArgentinaState();
  updateTasteDetailState();
  updateCalendarState();
  updateFlourishStoryState();
  updateVarietalState();
  updatePourState();
  updateTastingScrollState();
  updateCompositionState();
  updateFermentationState();
  updateCalculatedPour();
}

tasteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { trait, value } = button.dataset;
    if (!trait || !value) return;

    tasteProfile[trait] = value;
    tasteCurrentStep = Math.min(tasteTraitOrder.indexOf(trait) + 1, tasteQuestions.length);

    tasteButtons
      .filter((item) => item.dataset.trait === trait)
      .forEach((item) => item.classList.toggle("is-selected", item === button));

    updateTasteRecommendation();
  });
});

nextStep?.addEventListener("click", () => {
  currentTastingStep =
    currentTastingStep === tastingSteps.length - 1 ? 0 : currentTastingStep + 1;
  renderTastingStep();
});

prevStep?.addEventListener("click", () => {
  currentTastingStep = Math.max(0, currentTastingStep - 1);
  renderTastingStep();
});

renderWineMap();
renderCompositionPie();
renderTastingStep();
updateScrollState();
updateTasteRecommendation();
window.setTimeout(updateFlourishStoryState, 1200);
window.setTimeout(updateFlourishStoryState, 2800);
document.fonts?.ready.then(() => {
  updatePosterCorkPosition();
  updateCalculatedPour();
}).catch(() => {});
window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
