const root = document.documentElement;
const progress = document.querySelector(".scroll-progress");
const scaleIndexLinks = [...document.querySelectorAll("[data-scale-link]")];
const creditsIrisSvg = document.querySelector(".credits-iris-svg");
const creditsIrisPath = document.querySelector(".credits-iris-fill");
const opener = document.querySelector(".opener");
const culturalSequence = document.querySelector("[data-cultural-sequence]");
const culturalFrames = [...document.querySelectorAll("[data-cultural-frame]")];
const culturalTrackStage = document.querySelector("[data-cultural-track-stage]");
const culturalTrack = document.querySelector("[data-cultural-track]");
const culturalActivePhrase = document.querySelector("[data-cultural-active-phrase]");
const posterBottle = document.querySelector(".poster-bottle");
const posterCork = document.querySelector(".poster-cork");
const posterBottleArt = document.querySelector(".bottle-illustration");
const wineBuilder = document.querySelector(".wine-builder");
const argentinaSection = document.querySelector(".argentina-zoom");
const consumptionCalendarSection = document.querySelector("#calendario-consumo");
const consumptionMonthStains = [...document.querySelectorAll("#calendario-consumo .month-stain")];
const calendarSection = document.querySelector(".production-history-section");
const productionBridgeSection = document.querySelector(".narrative-bridge-before-history");
const productionDocumentarySection = document.querySelector(".narrative-bridge-documentary");
const productionHistoryViewport = document.querySelector("[data-production-history-viewport]");
const productionHistoryLinePath = document.querySelector("[data-production-line-path]");
const productionHistoryMarker = document.querySelector("[data-production-line-marker]");
const productionHistoryActiveYear = document.querySelector("[data-production-active-year]");
const productionHistoryActiveValue = document.querySelector("[data-production-active-value]");
const productionHistoryReflection = document.querySelector("[data-production-history-reflection]");
const narrativeBridgeSections = [...document.querySelectorAll("[data-narrative-bridge]")];
const worldBridgeSection = document.querySelector(".narrative-bridge-scale-intro");
const grapeBridgeSection = document.querySelector(".narrative-bridge-grape");
const flourishStorySection = document.querySelector(".flourish-story-section");
const flourishStoryCards = [...document.querySelectorAll(".story-card")];
const varietalSection = document.querySelector(".argentine-varietals");
const varietalBottles = [...document.querySelectorAll(".bottle-lineup .varietal-bottle")];
const storyMalbecBottle = document.querySelector(".bottle-malbec");
const storyMalbecSlot = storyMalbecBottle?.closest(".varietal-slot");
const storyMalbecHome = storyMalbecBottle?.parentElement;
const bridgePour = document.querySelector("#bridgePour");
const bridgePourPath = document.querySelector("#bridgePourPath");
const bridgePourShadow = document.querySelector("#bridgePourShadow");
const bridgePourHighlight = document.querySelector("#bridgePourHighlight");
const bridgeReceivingGlass = document.querySelector(".bridge-receiving-glass");
const bridgeGlassSurface = document.querySelector(".bridge-glass-surface-anchor");
const bridgeWineFill = document.querySelector(".bridge-wine-fill");
const bridgeWineSurface = document.querySelector(".bridge-wine-top");
const landingMark = document.querySelector(".landing-mark");
const argentinaWorldMap = document.querySelector(".argentina-world-map");
const tasteButtons = [...document.querySelectorAll(".taste-options button")];
const tasteQuestions = [...document.querySelectorAll(".taste-question")];
const profileCharts = [...document.querySelectorAll("[data-profile-chart]")];
const recommendationTitle = document.querySelector("#recommendationTitle");
const recommendationText = document.querySelector("#recommendationText");
const tagBody = document.querySelector("#tagBody");
const tagFlavor = document.querySelector("#tagFlavor");
const tagAge = document.querySelector("#tagAge");
const tastingSection = document.querySelector(".tasting-section");
const tastingMenu = document.querySelector(".tasting-menu");
const tastingCopyPanels = [...document.querySelectorAll(".tasting-copy-panel")];
const compositionSection = document.querySelector(".wine-composition-section");
const compositionSlices = [...document.querySelectorAll("[data-composition-slice]")];
const compositionDetails = [...document.querySelectorAll("[data-composition-detail]")];
const chemistryVarietySection = document.querySelector("#quimica-por-variedad");
const fermentationSection = document.querySelector(".fermentation-section");
const fermentationFlourish = document.querySelector("[data-fermentation-flourish]");
const malbecProfileSection = document.querySelector(".malbec-profile-section");
const finalToastSection = document.querySelector(".final-toast-section");
const projectCredits = document.querySelector(".project-credits");
const corkPopSound = new Audio("assets/audio/wine-cork-pop.wav");
const winePourSound = new Audio("assets/audio/pouring-wine.wav");

corkPopSound.preload = "auto";
corkPopSound.volume = 0.82;
winePourSound.preload = "auto";
winePourSound.volume = 0.58;

let corkPopped = false;
let audioContext = null;
let recommendationShown = false;
let tasteResultResetUntil = 0;
let tasteCurrentStep = 0;
let currentTastingStep = 0;
let tastingMenuLocked = false;
let flourishStorySlideIndex = -1;
let fermentationFlourishSlideIndex = -1;
let storyMalbecLineupSettled = false;
let varietalBridgeGlassActive = false;
let previousVarietalAudioProgress = 0;
let corkSoundPlayed = false;
let pourSoundPlayed = false;
let pourSoundTimer = 0;
let sceneSoundsUnlocked = false;
const WINE_INTERIOR_GLASS_SCALE = 12;
const WINE_INTERIOR_GLASS_X = 0;
const WINE_SETTLED_GLASS_X = 25;
const tasteTraitOrder = ["body", "flavor", "age"];
const tasteProfile = {
  body: "",
  flavor: "",
  age: "",
};

function playSceneSound(sound) {
  sound.muted = false;
  sound.currentTime = 0;
  const playback = sound.play();
  return playback?.then(() => true).catch(() => false) || Promise.resolve(true);
}

function stopSceneSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}

function playPourAfterCork() {
  window.clearTimeout(pourSoundTimer);
  const corkRemaining = Number.isFinite(corkPopSound.duration)
    ? Math.max(corkPopSound.duration - corkPopSound.currentTime, 0)
    : 0;
  const delay = corkPopSound.paused ? 0 : Math.min(corkRemaining * 1000, 900);

  pourSoundTimer = window.setTimeout(() => {
    playSceneSound(winePourSound);
  }, delay);
}

function primeSceneSounds() {
  if (sceneSoundsUnlocked) return;
  sceneSoundsUnlocked = true;

  /* Desbloquear audio con copias descartables: nunca silenciar los sonidos reales. */
  [corkPopSound, winePourSound].forEach((sound) => {
    const primer = sound.cloneNode();
    primer.muted = true;
    primer.volume = 0;
    const playback = primer.play();
    playback?.then(() => {
      primer.pause();
      primer.removeAttribute("src");
      primer.load();
    }).catch(() => {});
  });

  window.removeEventListener("pointerdown", primeSceneSounds);
  window.removeEventListener("touchstart", primeSceneSounds);
  window.removeEventListener("keydown", primeSceneSounds);
}

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
const worldTooltipCountries = new Set([
  "United States of America",
  "France",
  "Italy",
  "Spain",
  "Argentina",
  "Chile",
  "Australia",
]);

if (argentinaWorldMap) {
  argentinaWorldMap
    .querySelectorAll("[data-country]")
    .forEach((countryPath) => {
      if (worldTooltipCountries.has(countryPath.dataset.country)) {
        countryPath.classList.add("wine-highlight-country");
      }
    });

  argentinaWorldMap
    .querySelectorAll(".argentina-map-shape")
    .forEach((argentinaPath) => {
      argentinaPath.classList.add("wine-highlight-country");
    });
}

const TASTING_STEP_COUNT = 5;

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

const productionHistoryData = [
  { year: 1996, hectoliters: 15200000 },
  { year: 1997, hectoliters: 14900000 },
  { year: 1998, hectoliters: 12800000 },
  { year: 1999, hectoliters: 15400000 },
  { year: 2000, hectoliters: 12900000 },
  { year: 2001, hectoliters: 15900000 },
  { year: 2002, hectoliters: 12600000 },
  { year: 2003, hectoliters: 13100000 },
  { year: 2004, hectoliters: 15464289 },
  { year: 2005, hectoliters: 15397000 },
  { year: 2006, hectoliters: 15395000 },
  { year: 2007, hectoliters: 15046000 },
  { year: 2008, hectoliters: 15040000 },
  { year: 2009, hectoliters: 12135000 },
  { year: 2010, hectoliters: 13378000 },
  { year: 2011, hectoliters: 15467000 },
  { year: 2012, hectoliters: 11778000 },
  { year: 2013, hectoliters: 14985000 },
  { year: 2014, hectoliters: 15217000 },
  { year: 2015, hectoliters: 13420000 },
  { year: 2016, hectoliters: 8821000 },
  { year: 2017, hectoliters: 11758000 },
  { year: 2018, hectoliters: 13741000 },
  { year: 2019, hectoliters: 13098000 },
  { year: 2020, hectoliters: 10648000 },
  { year: 2021, hectoliters: 10855000 },
  { year: 2022, hectoliters: 11450571 },
  { year: 2023, hectoliters: 8813048 },
  { year: 2024, hectoliters: 10868843 },
  { year: 2025, hectoliters: 10370000 },
];

let productionHistoryPointData = [];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function smoothStep(value) {
  const eased = clamp(value, 0, 1);
  return eased * eased * (3 - 2 * eased);
}

const VARIETAL_PRODUCTION_MAX_LITERS = 260000000;

function getBottleProductionRatio(bottle) {
  const liters = Number(bottle?.dataset?.productionLiters);
  if (Number.isFinite(liters) && liters > 0) {
    return clamp(liters / VARIETAL_PRODUCTION_MAX_LITERS, 0.08, 1);
  }

  return clamp(Number(bottle?.dataset?.productionScale) || 1, 0.08, 1);
}

const chapterMotion = {
  fadeIn: 0.24,
  fadeOut: 0.22,
  fadeOutStart: 0.78,
  titleFadeIn: 0.22,
  titleFadeOut: 0.2,
  titleFadeOutStart: 0.32,
  noteFadeInStart: 0.2,
  noteFadeOutStart: 0.56,
  slideIn: 0.28,
  slideOut: 0.18,
  slideOutStart: 0.84,
  documentarySlideOutStart: 0.66,
  scenicSlideIn: 0.34,
  scenicSlideOut: 0.24,
  scenicSlideOutStart: 0.8,
};

function lerp(start, end, amount) {
  return start + (end - start) * clamp(amount, 0, 1);
}

function getCreditsWipeState() {
  if (!projectCredits) {
    return {
      isActive: false,
      wipeProgress: 0,
      holeRadius: Math.hypot(window.innerWidth, window.innerHeight),
      contentProgress: 0,
    };
  }

  const rect = projectCredits.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const preFreezeLead = Math.min(viewportHeight * 0.12, 96);
  const wipeStart = viewportHeight + preFreezeLead;
  const isActive = rect.top < wipeStart && rect.bottom > 0;
  const wipeProgress = smoothStep((wipeStart - rect.top) / (viewportHeight * 1.62));
  const maxRadius = Math.hypot(viewportWidth, viewportHeight) * 0.54;
  const holeCloseProgress = smoothStep(wipeProgress / 0.94);
  const holeRadius = holeCloseProgress >= 0.998 ? 0 : lerp(maxRadius, 0, holeCloseProgress);
  const contentProgress = smoothStep((wipeProgress - 0.955) / 0.045);

  return { isActive, wipeProgress, holeRadius, contentProgress };
}

function updateCreditsIrisPath(radius) {
  if (!creditsIrisSvg || !creditsIrisPath) return;

  const width = Math.max(window.innerWidth, 1);
  const height = Math.max(window.innerHeight, 1);
  const centerX = width / 2;
  const centerY = height / 2;
  const safeRadius = Math.max(radius, 0);
  let path = `M0 0H${width}V${height}H0Z`;

  if (safeRadius > 0.5) {
    path += `M${centerX + safeRadius} ${centerY}`;
    path += `A${safeRadius} ${safeRadius} 0 1 0 ${centerX - safeRadius} ${centerY}`;
    path += `A${safeRadius} ${safeRadius} 0 1 0 ${centerX + safeRadius} ${centerY}Z`;
  }

  creditsIrisSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  creditsIrisPath.setAttribute("d", path);
}

function formatMillions(value) {
  return (value / 1000000).toFixed(1).replace(".", ",");
}

function getFermentationGlassShift() {
  return window.innerWidth <= 700 ? 52 : window.innerWidth <= 980 ? 38 : 35;
}

function getProductionHistoryPoints() {
  const values = productionHistoryData.map((item) => item.hectoliters);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const valueRange = Math.max(maxValue - minValue, 1);
  const xMin = 6;
  const xMax = 96;
  const yMin = 16;
  const yMax = 82;

  return productionHistoryData.map((item, index) => {
    const x = lerp(xMin, xMax, index / (productionHistoryData.length - 1));
    const y = lerp(yMax, yMin, (item.hectoliters - minValue) / valueRange);

    return {
      ...item,
      x,
      y,
    };
  });
}

function buildProductionLinePath(points) {
  return points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command} ${point.x.toFixed(3)} ${point.y.toFixed(3)}`;
    })
    .join(" ");
}

function renderProductionHistory() {
  if (!productionHistoryLinePath || productionHistoryLinePath.dataset.rendered === "true") return;

  productionHistoryPointData = getProductionHistoryPoints();
  productionHistoryLinePath.setAttribute("d", buildProductionLinePath(productionHistoryPointData));

  productionHistoryLinePath.dataset.rendered = "true";
}

function getProductionHistoryStoryPosition(progressValue) {
  return {
    index: lerp(0, productionHistoryData.length - 1, clamp(progressValue, 0, 1)),
  };
}

function getProductionHistoryInterpolatedPoint(indexValue) {
  if (!productionHistoryPointData.length) return productionHistoryData[0];

  const lowerIndex = clamp(Math.floor(indexValue), 0, productionHistoryPointData.length - 1);
  const upperIndex = clamp(Math.ceil(indexValue), 0, productionHistoryPointData.length - 1);
  const lowerPoint = productionHistoryPointData[lowerIndex];
  const upperPoint = productionHistoryPointData[upperIndex];
  const amount = indexValue - lowerIndex;

  return {
    x: lerp(lowerPoint.x, upperPoint.x, amount),
    y: lerp(lowerPoint.y, upperPoint.y, amount),
  };
}

function getStoryCardBaseSize() {
  const isMobile = window.innerWidth <= 700;
  const width = isMobile
    ? Math.min(window.innerWidth * 0.84, 420)
    : clamp(window.innerWidth * 0.27, 300, 420);
  const height = isMobile
    ? clamp(window.innerHeight * 0.24, 150, 240)
    : clamp(window.innerHeight * 0.16, 118, 172);

  return { width, height };
}

function getVarietalBottleMetrics() {
  // Las dimensiones responsive viven en CSS. Tomarlas de una botella estable
  // evita que Malbec viaje con la antigua escala JS y salte al alinearse.
  const referenceBottle = varietalBottles.find((bottle) => bottle !== storyMalbecBottle);
  if (referenceBottle?.offsetWidth && referenceBottle?.offsetHeight) {
    return {
      width: referenceBottle.offsetWidth,
      height: referenceBottle.offsetHeight,
    };
  }

  const isMobile = window.innerWidth <= 700;
  const width = isMobile
    ? clamp(window.innerWidth * 0.184, 62, 82)
    : clamp(window.innerWidth * 0.14, 142, 255);

  return {
    width,
    height: Math.min(window.innerHeight * 0.82, width * 2.96),
  };
}

function getStoryMorphMalbecTarget() {
  const isMobile = window.innerWidth <= 700;
  const width = isMobile
    ? clamp(window.innerWidth * 0.18, 64, 86)
    : clamp(window.innerWidth * 0.1, 118, 185);
  const height = Math.min(window.innerHeight * (isMobile ? 0.62 : 0.66), width * 2.96);

  return {
    x: 0,
    y: 0,
    width,
    height,
    scale: 1,
  };
}

function getFinalMalbecTarget() {
  const metrics = getVarietalBottleMetrics();

  if (!storyMalbecSlot) {
    return {
      x: -window.innerWidth * 0.37,
      y: window.innerHeight * 0.5 - metrics.height / 2,
      width: metrics.width,
      height: metrics.height,
      scale: 1,
    };
  }

  const slotRect = storyMalbecSlot.getBoundingClientRect();

  return {
    x: slotRect.left + slotRect.width / 2 - window.innerWidth / 2,
    y: slotRect.bottom - metrics.height / 2 - window.innerHeight / 2,
    width: metrics.width,
    height: metrics.height,
    scale: 1,
  };
}

function interpolateMalbecTarget(from, to, progressAmount) {
  const amount = clamp(progressAmount, 0, 1);

  return {
    x: lerp(from.x, to.x, amount),
    y: lerp(from.y, to.y, amount),
    width: lerp(from.width, to.width, amount),
    height: lerp(from.height, to.height, amount),
    scale: lerp(from.scale, to.scale, amount),
  };
}

function addLineupRiseToTarget(target, lineupProgress) {
  const riseOffset = (1 - clamp(lineupProgress, 0, 1)) * window.innerHeight * 0.12;

  return {
    ...target,
    y: target.y + riseOffset,
  };
}

function applyTravelingMalbec(target, opacity = 1, detailOpacity = 1, shapeProgress = 1) {
  if (!storyMalbecBottle || !target) return;

  if (storyMalbecBottle.parentElement !== document.body) {
    document.body.appendChild(storyMalbecBottle);
  }

  storyMalbecSlot?.classList.add("is-traveling-bottle-source");
  storyMalbecBottle.classList.add("is-traveling-to-lineup");
  const shape = clamp(shapeProgress, 0, 1);
  const bodyRadiusXTop = lerp(6, 46, shape);
  const bodyRadiusYTop = lerp(6, 30, shape);
  const bodyRadiusXBottom = lerp(6, 12, shape);
  const bodyRadiusYBottom = lerp(6, 8, shape);
  const neckShape = smoothStep((shape - 0.46) / 0.54);

  storyMalbecBottle.style.setProperty("--traveling-bottle-opacity", opacity.toFixed(3));
  storyMalbecBottle.style.setProperty("--traveling-bottle-detail-opacity", detailOpacity.toFixed(3));
  storyMalbecBottle.style.setProperty("--traveling-bottle-shape-progress", shape.toFixed(3));
  storyMalbecBottle.style.setProperty("--traveling-bottle-body-height", `${lerp(100, 76, shape).toFixed(2)}%`);
  storyMalbecBottle.style.setProperty(
    "--traveling-bottle-body-radius",
    `${bodyRadiusXTop.toFixed(2)}% ${bodyRadiusXTop.toFixed(2)}% ${bodyRadiusXBottom.toFixed(2)}% ${bodyRadiusXBottom.toFixed(2)}% / ${bodyRadiusYTop.toFixed(2)}% ${bodyRadiusYTop.toFixed(2)}% ${bodyRadiusYBottom.toFixed(2)}% ${bodyRadiusYBottom.toFixed(2)}%`,
  );
  storyMalbecBottle.style.setProperty("--traveling-bottle-neck-opacity", neckShape.toFixed(3));
  storyMalbecBottle.style.setProperty("--traveling-bottle-neck-y", `${lerp(20, 0, neckShape).toFixed(2)}%`);
  storyMalbecBottle.style.setProperty("--traveling-bottle-neck-scale-y", lerp(0.22, 1, neckShape).toFixed(3));
  storyMalbecBottle.style.setProperty("--traveling-bottle-x", `${target.x.toFixed(2)}px`);
  storyMalbecBottle.style.setProperty("--traveling-bottle-y", `${target.y.toFixed(2)}px`);
  storyMalbecBottle.style.setProperty("--traveling-bottle-width", `${target.width.toFixed(2)}px`);
  storyMalbecBottle.style.setProperty("--traveling-bottle-height", `${target.height.toFixed(2)}px`);
  storyMalbecBottle.style.setProperty("--varietal-bottle-width", `${target.width.toFixed(2)}px`);
  storyMalbecBottle.style.setProperty("--varietal-bottle-height", `${target.height.toFixed(2)}px`);
  storyMalbecBottle.style.setProperty("--traveling-bottle-scale", target.scale.toFixed(3));
}

function clearTravelingMalbec() {
  if (!storyMalbecBottle) return;

  storyMalbecSlot?.classList.remove("is-traveling-bottle-source");
  storyMalbecBottle.classList.remove("is-traveling-to-lineup");

  if (storyMalbecHome && storyMalbecBottle.parentElement !== storyMalbecHome) {
    storyMalbecHome.appendChild(storyMalbecBottle);
  }

  [
    "--traveling-bottle-opacity",
    "--traveling-bottle-x",
    "--traveling-bottle-y",
    "--traveling-bottle-width",
    "--traveling-bottle-height",
    "--traveling-bottle-scale",
    "--traveling-bottle-detail-opacity",
    "--traveling-bottle-shape-progress",
    "--traveling-bottle-neck-opacity",
    "--traveling-bottle-body-height",
    "--traveling-bottle-body-radius",
    "--traveling-bottle-neck-y",
    "--traveling-bottle-neck-scale-y",
    "--varietal-bottle-width",
    "--varietal-bottle-height",
  ].forEach((property) => storyMalbecBottle.style.removeProperty(property));
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
  const sceneProgress = smoothStep(introProgress / 0.9);
  const toastX = 28 * sceneProgress;
  const toastY = -2.2 * sceneProgress;
  const toastRotate = -1.6 * sceneProgress;

  root.style.setProperty("--intro-progress", introProgress.toFixed(3));
  root.style.setProperty("--intro-toast-x", `${toastX.toFixed(2)}vw`);
  root.style.setProperty("--intro-toast-y", `${toastY.toFixed(2)}vh`);
  root.style.setProperty("--intro-toast-rotate", `${toastRotate.toFixed(2)}deg`);
  root.style.setProperty("--opener-title-fill-x", `${(44 + introProgress * 18).toFixed(2)}%`);
  root.style.setProperty("--title-progress", titleProgress.toFixed(3));
  root.style.setProperty("--title-line-1", titleLine1.toFixed(3));
  root.style.setProperty("--title-line-2", titleLine2.toFixed(3));
  root.style.setProperty("--title-line-3", titleLine3.toFixed(3));
  root.style.setProperty("--title-line-1-clip", `${((1 - titleLine1) * 100).toFixed(2)}%`);
  root.style.setProperty("--title-line-2-clip", `${((1 - titleLine2) * 100).toFixed(2)}%`);
  root.style.setProperty("--title-line-3-clip", `${((1 - titleLine3) * 100).toFixed(2)}%`);
}

function updateCulturalSequenceState() {
  if (!culturalSequence) return;

  const travel = Math.max(culturalSequence.offsetHeight - window.innerHeight, 1);
  const rect = culturalSequence.getBoundingClientRect();
  const progress = clamp(-rect.top / travel, 0, 1);
  const frameCount = culturalFrames.length;
  const gallerySteps = Math.max(frameCount - 1, 0);
  const galleryStart = 1.12;
  const frameHold = 0.62;
  const frameMove = 0.5;
  const frameSpan = frameHold + frameMove;
  const galleryEnd = galleryStart + gallerySteps * frameSpan + 1.08;
  const segmentCount = galleryEnd + 1.9;
  const rawProgress = progress * segmentCount;

  const introOut = smoothStep((rawProgress - 0.68) / 0.42);
  const introOpacity = 1 - introOut;
  const introY = lerp(0, -1.4, introOut);
  const galleryOpacity =
    smoothStep((rawProgress - 0.94) / 0.34) * (1 - smoothStep((rawProgress - galleryEnd) / 0.34));
  const meaningLocal = rawProgress - (galleryEnd + 0.32);
  const meaningOpacity =
    smoothStep(meaningLocal / 0.36) * (1 - smoothStep((meaningLocal - 1.08) / 0.36));
  const meaningY =
    lerp(1.8, 0, smoothStep(meaningLocal / 0.36))
    - smoothStep((meaningLocal - 1.08) / 0.36) * 1.4;

  culturalSequence.style.setProperty("--cultural-intro-opacity", introOpacity.toFixed(3));
  culturalSequence.style.setProperty("--cultural-intro-y", `${introY.toFixed(2)}rem`);
  culturalSequence.style.setProperty("--cultural-gallery-opacity", galleryOpacity.toFixed(3));
  culturalSequence.style.setProperty("--cultural-meaning-opacity", meaningOpacity.toFixed(3));
  culturalSequence.style.setProperty("--cultural-meaning-y", `${meaningY.toFixed(2)}rem`);

  if (!frameCount) return;

  const galleryRaw = clamp(rawProgress - galleryStart, 0, gallerySteps * frameSpan);
  const baseIndex = Math.min(Math.floor(galleryRaw / frameSpan), gallerySteps);
  const localProgress = galleryRaw - baseIndex * frameSpan;
  const advance =
    baseIndex >= gallerySteps ? 0 : smoothStep((localProgress - frameHold) / frameMove);
  const trackIndex = Math.min(baseIndex + advance, gallerySteps);
  const trackBaseIndex = Math.min(Math.floor(trackIndex), gallerySteps);
  const trackFraction = trackIndex - trackBaseIndex;
  const activeIndex = clamp(
    trackBaseIndex + (trackFraction > 0.86 ? 1 : 0),
    0,
    gallerySteps,
  );
  const activeFrame = culturalFrames[activeIndex];
  const activePhrase = activeFrame?.dataset.culturalPhrase || "";
  const activeDistance = Math.abs(activeIndex - trackIndex);
  const copyFocus = 1 - smoothStep(activeDistance / 0.58);
  const copyOpacity = galleryOpacity * (0.62 + copyFocus * 0.38);

  if (culturalActivePhrase && culturalActivePhrase.textContent !== activePhrase) {
    culturalActivePhrase.textContent = activePhrase;
  }

  culturalSequence.dataset.culturalActiveIndex = String(activeIndex);
  culturalSequence.style.setProperty("--cultural-copy-opacity", copyOpacity.toFixed(3));

  if (culturalTrack && culturalTrackStage) {
    const stageWidth = culturalTrackStage.clientWidth || window.innerWidth;
    const currentIndex = Math.min(Math.floor(trackIndex), gallerySteps);
    const nextIndex = Math.min(currentIndex + 1, gallerySteps);
    const currentFrame = culturalFrames[currentIndex];
    const nextFrame = culturalFrames[nextIndex];
    const currentCenter = currentFrame.offsetLeft + currentFrame.offsetWidth / 2;
    const nextCenter = nextFrame.offsetLeft + nextFrame.offsetWidth / 2;
    const between = trackIndex - currentIndex;
    const targetCenter = lerp(currentCenter, nextCenter, between);
    const trackX = stageWidth / 2 - targetCenter;
    const stageRect = culturalTrackStage.getBoundingClientRect();
    const pinRect = culturalSequence.querySelector(".cultural-sequence-pin")?.getBoundingClientRect() || stageRect;
    const activeCenter =
      activeFrame.offsetLeft + activeFrame.offsetWidth / 2 + trackX + stageRect.left - pinRect.left;

    culturalSequence.style.setProperty("--cultural-track-x", `${trackX.toFixed(2)}px`);
    culturalSequence.style.setProperty("--cultural-copy-x", `${activeCenter.toFixed(2)}px`);
  }

  culturalFrames.forEach((frame, index) => {
    const distance = Math.abs(index - trackIndex);
    const focus = 1 - smoothStep(distance / 0.68);
    const frameOpacity = 0.24 + focus * 0.76;
    const frameScale = 0.935 + focus * 0.085;
    const frameBlur = 0.82 * (1 - focus);
    const frameSaturate = 0.62 + focus * 0.48;
    const frameContrast = 0.88 + focus * 0.16;
    const frameShadowOpacity = 0.04 + focus * 0.18;

    frame.style.setProperty("--frame-opacity", frameOpacity.toFixed(3));
    frame.style.setProperty("--frame-scale", frameScale.toFixed(3));
    frame.style.setProperty("--frame-blur", `${frameBlur.toFixed(2)}px`);
    frame.style.setProperty("--frame-saturate", frameSaturate.toFixed(3));
    frame.style.setProperty("--frame-contrast", frameContrast.toFixed(3));
    frame.style.setProperty("--frame-shadow-opacity", frameShadowOpacity.toFixed(3));
    frame.classList.toggle("is-active", index === activeIndex);
  });
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
    ? smoothStep((sectionProgress - 0.1) / 0.12)
    : 0;
  const slideProgress = isComplete
    && !isResultResetting
    ? smoothStep((sectionProgress - 0.24) / 0.32)
    : 0;
  const profileShift = -118 * slideProgress;
  const chartShift = clamp(118 - chartPeekProgress * 36 - slideProgress * 82, 0, 118);
  const chartOpacity = Math.max(chartPeekProgress, slideProgress);
  const profileScale = 1;
  const detailTextProgress = isComplete ? 1 : 0;
  const detailTextY = 0;

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

  if (!recommendationShown) {
    recommendationShown = true;
    tasteResultResetUntil = Date.now() + 760;
    updateTasteDetailState();
    window.setTimeout(() => {
      tasteResultResetUntil = 0;
      updateTasteDetailState();
    }, 820);
  }
}

function renderTastingStep() {
  if (!tastingSection) return;

  tastingSection.dataset.step = String(currentTastingStep);
  root.dataset.tastingStep = String(currentTastingStep);
  tastingCopyPanels.forEach((panel) => {
    panel.classList.toggle("is-current", Number(panel.dataset.step) === currentTastingStep);
  });
}

function projectMapPoint(lat, lon) {
  return {
    x: ((lon + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 520,
  };
}

function updateArgentinaState() {
  if (!argentinaSection) return;

  const travel = Math.max(argentinaSection.offsetHeight - window.innerHeight, 1);
  const rect = argentinaSection.getBoundingClientRect();
  const rawArgProgress = clamp(-rect.top / travel, 0, 1);
  const ARGENTINA_FINAL_HOLD_START = 0.9;
  const argProgress = clamp(rawArgProgress / ARGENTINA_FINAL_HOLD_START, 0, 1);
  const isMobileArgentina = window.innerWidth <= 700;
  const setArgentinaVar = (name, value) => {
    root.style.setProperty(name, value);
    argentinaSection.style.setProperty(name, value);
  };

  // Tramos: mapa completo quieto -> contexto mundial -> zoom documental por viewBox.
  const mapIn = smoothStep((window.innerHeight - rect.top) / (window.innerHeight * 0.5));
  const popupIn = smoothStep((argProgress - 0.24) / 0.08);
  const popupOut = smoothStep((argProgress - 0.48) / 0.14);
  const popupOpacity = popupIn * (1 - popupOut);
  const argZoomProgress = smoothStep((argProgress - 0.56) / 0.4);
  const worldFocus = smoothStep((argZoomProgress - 0.58) / 0.34);
  const copyIn = smoothStep((argZoomProgress - 0.86) / 0.14);
  const worldOpacity = mapIn * lerp(1, 0.14, worldFocus);
  const worldBlur = lerp(0, isMobileArgentina ? 0.65 : 1.1, worldFocus);
  const targetViewBoxWidth = isMobileArgentina ? 300 : 315;
  const targetViewBoxHeight = targetViewBoxWidth * 0.52;
  const argentinaCenter = { x: 324, y: 371 };
  const argentinaScreenFocus = {
    x: isMobileArgentina ? 0.48 : 0.215,
    y: isMobileArgentina ? 0.49 : 0.365,
  };
  const targetViewBoxX = clamp(
    argentinaCenter.x - targetViewBoxWidth * argentinaScreenFocus.x,
    0,
    1000 - targetViewBoxWidth,
  );
  const targetViewBoxY = clamp(
    argentinaCenter.y - targetViewBoxHeight * argentinaScreenFocus.y,
    0,
    520 - targetViewBoxHeight,
  );
  const viewBoxX = targetViewBoxX * argZoomProgress;
  const viewBoxY = targetViewBoxY * argZoomProgress;
  const viewBoxWidth = 1000 + (targetViewBoxWidth - 1000) * argZoomProgress;
  const viewBoxHeight = 520 + (targetViewBoxHeight - 520) * argZoomProgress;
  const argentinaOnlyScale = 1000 / viewBoxWidth;
  const mapMetaOpacity = mapIn * (1 - smoothStep((argProgress - 0.44) / 0.24));
  const isFocusedArgentina = popupOpacity > 0.2 || argZoomProgress > 0.08;

  argentinaWorldMap?.setAttribute(
    "viewBox",
    `${viewBoxX.toFixed(1)} ${viewBoxY.toFixed(1)} ${viewBoxWidth.toFixed(1)} ${viewBoxHeight.toFixed(1)}`,
  );
  setArgentinaVar("--arg-progress", argProgress.toFixed(3));
  setArgentinaVar("--arg-map-stage-opacity", mapIn.toFixed(3));
  setArgentinaVar("--arg-map-meta-opacity", mapMetaOpacity.toFixed(3));
  setArgentinaVar("--arg-world-opacity", worldOpacity.toFixed(3));
  setArgentinaVar("--arg-world-blur", `${worldBlur.toFixed(2)}px`);
  setArgentinaVar("--argentina-only-scale", argentinaOnlyScale.toFixed(3));
  setArgentinaVar("--argentina-only-x", `${viewBoxX.toFixed(1)}px`);
  setArgentinaVar("--argentina-only-y", `${viewBoxY.toFixed(1)}px`);
  setArgentinaVar("--popup-opacity", popupOpacity.toFixed(3));
  setArgentinaVar("--arg-copy-opacity", copyIn.toFixed(3));
  root.classList.toggle("is-argentina-focus", isFocusedArgentina);
}

function updateConsumptionCalendarStains() {
  if (!consumptionCalendarSection || !consumptionMonthStains.length) return;

  const travel = Math.max(consumptionCalendarSection.offsetHeight - window.innerHeight, 1);
  const rect = consumptionCalendarSection.getBoundingClientRect();
  const sectionProgress = clamp(-rect.top / travel, 0, 1);
  const monthTilt = [-1.2, 0.8, -0.7, 1, -0.9, 0.6, -0.55, 0.75, -0.8, 0.9, -0.45, 0.65];

  consumptionMonthStains.forEach((stain, index) => {
    const start = 0.08 + index * 0.06;
    const reveal = smoothStep((sectionProgress - start) / 0.1);
    const settle = smoothStep((reveal - 0.72) / 0.28);
    const bloom = smoothStep(reveal / 0.72);
    const scale = lerp(0.84, 1.035, bloom) - settle * 0.035;
    const spread = lerp(2, 86, reveal);
    const opacity = smoothStep(reveal / 0.42);
    const blur = lerp(1.1, 0, reveal);
    const saturation = lerp(0.86, 1, reveal);
    const rotate = monthTilt[index % monthTilt.length] * (1 - reveal);

    stain.style.setProperty("--stain-reveal", opacity.toFixed(3));
    stain.style.setProperty("--stain-scale", scale.toFixed(3));
    stain.style.setProperty("--stain-spread", `${spread.toFixed(2)}%`);
    stain.style.setProperty("--stain-blur", `${blur.toFixed(2)}px`);
    stain.style.setProperty("--stain-saturation", saturation.toFixed(3));
    stain.style.setProperty("--stain-rotate", `${rotate.toFixed(3)}deg`);
  });
}

function updateNarrativeBridgeState() {
  narrativeBridgeSections.forEach((section) => {
    const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
    const rect = section.getBoundingClientRect();
    const progress = clamp(-rect.top / travel, 0, 1);
    const enter = smoothStep(progress / chapterMotion.fadeIn);
    const exit = smoothStep((progress - chapterMotion.fadeOutStart) / chapterMotion.fadeOut);
    let copyOffset = `${((1 - enter) * 4 - exit * 1.4).toFixed(2)}rem`;
    let statementOffset = `${((1 - enter) * 5 - exit * 1.6).toFixed(2)}rem`;
    let photoYOffset = "0vh";
    const photoX = 0;
    const photoClip = 0;

    if (section.classList.contains("narrative-bridge-before-history")) {
      const sceneIn = smoothStep(progress / chapterMotion.scenicSlideIn);
      const sceneOut = smoothStep((progress - 0.66) / 0.22);
      const sideEntryDistance = window.innerWidth < 760 ? 24 : 38;
      const sideExitDistance = window.innerWidth < 760 ? 32 : 48;
      const copyX = lerp(-sideEntryDistance, 0, sceneIn) - sceneOut * sideExitDistance;
      const visualX = lerp(sideEntryDistance, 0, sceneIn) + sceneOut * sideExitDistance;
      const sceneOpacity = Math.max(sceneIn * (1 - sceneOut), 0);

      copyOffset = "0vh";
      statementOffset = "0vh";
      photoYOffset = "0vh";
      section.style.setProperty("--before-history-copy-x", `${copyX.toFixed(2)}vw`);
      section.style.setProperty("--before-history-visual-x", `${visualX.toFixed(2)}vw`);
      section.style.setProperty("--before-history-scene-opacity", sceneOpacity.toFixed(3));
    }

    if (section.classList.contains("narrative-bridge-documentary")) {
      const blockEnter = smoothStep(progress / chapterMotion.fadeIn);
      const blockExit = smoothStep((progress - chapterMotion.documentarySlideOutStart) / chapterMotion.scenicSlideOut);
      const sharedOffset = `${((1 - blockEnter) * 2.4 - blockExit * 38).toFixed(2)}vh`;

      copyOffset = sharedOffset;
      statementOffset = sharedOffset;
      photoYOffset = sharedOffset;
    }

    if (section.classList.contains("narrative-bridge-production-close")) {
      statementOffset = "0rem";
    }

    if (section.classList.contains("narrative-bridge-grape")) {
      // Entrada y salida amplias para que el desplazamiento lateral se perciba
      // suave, sin perder la pausa de lectura en el centro de la escena.
      const sceneIn = smoothStep(progress / 0.27);
      const sceneOut = smoothStep((progress - 0.78) / 0.22);
      const sideEntryDistance = window.innerWidth < 760 ? 115 : 105;
      const sideExitDistance = window.innerWidth < 760 ? 115 : 105;
      // Cada pieza entra y sale por el lado en el que finalmente se ubica:
      // texto por la izquierda e imagen por la derecha, sin cruzarse.
      const photoX = lerp(sideEntryDistance, 0, sceneIn) + sceneOut * sideExitDistance;
      const copyX = lerp(-sideEntryDistance, 0, sceneIn) - sceneOut * sideExitDistance;
      // La opacidad se conserva mientras atraviesan la pantalla y solo cae
      // cuando ya completaron practicamente todo el recorrido lateral.
      const sceneFadeIn = smoothStep(progress / 0.06);
      const sceneFadeOut = smoothStep((progress - 0.94) / 0.06);
      const sceneOpacity = sceneFadeIn * (1 - sceneFadeOut);

      copyOffset = "0vh";
      statementOffset = "0vh";
      photoYOffset = "0vh";
      section.style.setProperty("--grape-photo-x", `${photoX.toFixed(2)}vw`);
      section.style.setProperty("--grape-copy-x", `${copyX.toFixed(2)}vw`);
      section.style.setProperty("--grape-scene-opacity", sceneOpacity.toFixed(3));
    }

    section.style.setProperty("--narrative-progress", progress.toFixed(3));
    section.style.setProperty("--narrative-copy-y", copyOffset);
    section.style.setProperty("--narrative-statement-y", statementOffset);
    section.style.setProperty("--narrative-photo-x", `${photoX.toFixed(2)}vw`);
    section.style.setProperty("--narrative-photo-y", photoYOffset);
    section.style.setProperty("--narrative-photo-clip", `${photoClip.toFixed(2)}%`);

  });
}

function updateCalendarState() {
  if (!calendarSection || !productionHistoryViewport || !productionHistoryLinePath || !productionHistoryMarker) return;

  renderProductionHistory();
  const travel = Math.max(calendarSection.offsetHeight - window.innerHeight, 1);
  const rect = calendarSection.getBoundingClientRect();
  const setHistoryVar = (name, value) => {
    calendarSection.style.setProperty(name, value);
  };
  const historyProgress = clamp(-rect.top / travel, 0, 1);
  const HISTORY_REFLECTION_START = 0.82;
  /* Producción ya está presente al terminar el video. Se conserva un
     pequeño margen superior y permanece hasta que entra la cita. */
  const sceneY = 3.5;
  /* La curva termina casi en el borde de la sección: ya no queda una
     pantalla vacía entre el último dato y la cita. */
  const timelineProgress = clamp((historyProgress - 0.27) / 0.7, 0, 1);
  const storyPosition = getProductionHistoryStoryPosition(timelineProgress);
  const activeIndex = clamp(Math.round(storyPosition.index), 0, productionHistoryData.length - 1);
  const activeItem = productionHistoryData[activeIndex] || productionHistoryData[0];
  const markerPoint = getProductionHistoryInterpolatedPoint(storyPosition.index);
  const reflectionActive = historyProgress > HISTORY_REFLECTION_START;

  setHistoryVar("--history-progress", historyProgress.toFixed(3));
  setHistoryVar("--history-scene-y", `${sceneY.toFixed(2)}vh`);
  setHistoryVar("--history-copy-opacity", "1");
  setHistoryVar("--history-copy-y", "0rem");
  setHistoryVar("--history-chart-opacity", "1");
  setHistoryVar("--history-readout-opacity", "1");
  setHistoryVar("--history-marker-x", `${markerPoint.x.toFixed(3)}%`);
  setHistoryVar("--history-marker-y", `${markerPoint.y.toFixed(3)}%`);
  setHistoryVar("--history-reflection-opacity", "1");
  setHistoryVar("--history-reflection-y", "0rem");

  if (productionHistoryActiveYear) {
    productionHistoryActiveYear.textContent = String(activeItem.year);
  }

  if (productionHistoryActiveValue) {
    productionHistoryActiveValue.textContent = formatMillions(activeItem.hectoliters);
  }

  calendarSection.classList.toggle(
    "is-history-reflection-active",
    Boolean(productionHistoryReflection && reflectionActive),
  );
}

function updateVarietalState() {
  if (!varietalSection) return;

  const travel = Math.max(varietalSection.offsetHeight - window.innerHeight, 1);
  const rect = varietalSection.getBoundingClientRect();
  const rawVarietalProgress = clamp(-rect.top / travel, 0, 1);
  const isVarietalSceneInView = rect.top <= window.innerHeight && rect.bottom >= 0;
  const MALBEC_MORPH_START = 0.052;
  const MALBEC_MORPH_END = 0.112;
  const MALBEC_LABEL_START = 0.104;
  const MALBEC_TRAVEL_START = 0.108;
  const MALBEC_TRAVEL_END = 0.148;
  const LINEUP_REVEAL_START = 0.136;
  const LINEUP_REVEAL_END = 0.172;
  const LINEUP_TURN_START = 0.17;
  const LINEUP_TURN_END = 0.42;
  const PRODUCTION_BAR_START = LINEUP_TURN_END + 0.025;
  const PRODUCTION_BAR_END = PRODUCTION_BAR_START + 0.055;
  const PRODUCTION_AXIS_START = PRODUCTION_BAR_END + 0.014;
  const PRODUCTION_AXIS_END = PRODUCTION_AXIS_START + 0.045;
  const PRODUCTION_HOLD_END = PRODUCTION_AXIS_END + 0.052;
  const PRODUCTION_CHART_EXIT_START = PRODUCTION_HOLD_END - 0.02;
  const PRODUCTION_CHART_EXIT_END = PRODUCTION_HOLD_END + 0.055;
  const OTHER_BOTTLES_EXIT_START = PRODUCTION_CHART_EXIT_END + 0.012;
  const OTHER_BOTTLES_EXIT_END = OTHER_BOTTLES_EXIT_START + 0.06;
  const MALBEC_LABEL_FADE_START = OTHER_BOTTLES_EXIT_END + 0.006;
  const MALBEC_LABEL_FADE_END = MALBEC_LABEL_FADE_START + 0.04;
  const MALBEC_ROTATE_START = OTHER_BOTTLES_EXIT_END + 0.018;
  const MALBEC_ROTATE_END = MALBEC_ROTATE_START + 0.065;
  const MALBEC_CENTER_HOLD_START = MALBEC_ROTATE_END;
  const MALBEC_CENTER_HOLD_END = 0.905;
  const QUESTION_START = 0.846;
  const QUESTION_END = 0.918;
  const QUESTION_FADE_IN_DURATION = 0.018;
  const QUESTION_FADE_OUT_DURATION = 0.014;
  const BOTTLE_PULLBACK_START = 0.92;
  const BOTTLE_PULLBACK_END = 0.932;
  const BOTTLE_PULLBACK_1_START = BOTTLE_PULLBACK_START;
  const BOTTLE_PULLBACK_1_END = BOTTLE_PULLBACK_END;
  const CORK_START = 0.928;
  const CORK_END = 0.936;
  const BOTTLE_PULLBACK_2_START = 0.936;
  const BOTTLE_PULLBACK_2_END = 0.95;
  const BOTTLE_TILT_START = 0.94;
  const BOTTLE_TILT_END = 0.952;
  const STREAM_START = 0.946;
  const BOTTLE_LIFT_START = 0.95;
  const BOTTLE_LIFT_END = 0.963;
  const GLASS_ENTER_START = 0.965;
  const GLASS_ENTER_END = 0.975;
  const GLASS_FILL_START = GLASS_ENTER_END;
  const GLASS_FILL_END = 0.986;
  const STREAM_CUT_START = GLASS_FILL_END;
  const STREAM_CUT_END = 0.988;
  const GLASS_CENTER_START = STREAM_CUT_END;
  const GLASS_CENTER_END = 0.99;
  const GLASS_ZOOM_IN_START = GLASS_CENTER_END;
  const GLASS_ZOOM_IN_END = 0.99975;
  const GLASS_ZOOM_HOLD_START = GLASS_ZOOM_IN_END;
  const GLASS_ZOOM_HOLD_END = 0.99993;
  const GLASS_ZOOM_OUT_START = GLASS_ZOOM_HOLD_END;
  const GLASS_ZOOM_OUT_END = 0.99997;
  const GLASS_SETTLE_RIGHT_START = GLASS_ZOOM_OUT_END;
  const GLASS_SETTLE_RIGHT_END = 0.99999;
  const GLASS_ZOOM_START = GLASS_ZOOM_IN_START;
  const GLASS_ZOOM_END = GLASS_ZOOM_IN_END;
  const POUR_START = BOTTLE_TILT_START;
  const POUR_END = BOTTLE_TILT_END;
  const STREAM_END = STREAM_CUT_START;
  const STREAM_FADE_END = STREAM_CUT_END;
  const BOTTLE_EXIT_START = BOTTLE_LIFT_START;
  const BOTTLE_EXIT_END = BOTTLE_LIFT_END;
  const GLASS_APPEAR_START = GLASS_ENTER_START;
  const GLASS_APPEAR_END = GLASS_ENTER_END;
  const GLASS_RELEASE_END = 1;
  const GLASS_ENTRY_START_Y = 58;
  const POUR_MOUTH_TARGET_RATIO = 0.72;
  const POUR_STREAM_TARGET_RATIO = 0.54;
  const STILL_BOTTLE_CUT_START = MALBEC_ROTATE_END + 0.012;
  const STILL_BOTTLE_CUT_END = QUESTION_START - 0.006;
  const STILL_BOTTLE_CUT_SIZE = Math.max(STILL_BOTTLE_CUT_END - STILL_BOTTLE_CUT_START, 0);
  const RETAINED_VARIETAL_TIMELINE = 1 - STILL_BOTTLE_CUT_SIZE;
  const varietalTimelineCursor = rawVarietalProgress * RETAINED_VARIETAL_TIMELINE;
  const varietalProgress = varietalTimelineCursor >= STILL_BOTTLE_CUT_START
    ? varietalTimelineCursor + STILL_BOTTLE_CUT_SIZE
    : varietalTimelineCursor;

  const crossedCorkStart = previousVarietalAudioProgress < CORK_START && varietalProgress >= CORK_START;
  const crossedPourStart = previousVarietalAudioProgress < STREAM_START && varietalProgress >= STREAM_START;

  if (crossedCorkStart && !corkSoundPlayed) {
    playSceneSound(corkPopSound);
    corkSoundPlayed = true;
  }

  if (crossedPourStart && !pourSoundPlayed) {
    playPourAfterCork();
    pourSoundPlayed = true;
  }

  if (varietalProgress < CORK_START - 0.004) {
    corkSoundPlayed = false;
    pourSoundPlayed = false;
    window.clearTimeout(pourSoundTimer);
    stopSceneSound(corkPopSound);
    stopSceneSound(winePourSound);
  }

  previousVarietalAudioProgress = varietalProgress;
  const TITLE_FADE_IN_START = 0.006;
  const TITLE_FADE_IN_DURATION = 0.018;
  const TEXT_SHRINK_START = 0.025;
  const TEXT_SHRINK_END = MALBEC_MORPH_START;
  const GREEN_RECT_REVEAL_START = TEXT_SHRINK_START + (TEXT_SHRINK_END - TEXT_SHRINK_START) * 0.58;
  const GREEN_RECT_REVEAL_END = TEXT_SHRINK_END - 0.001;
  const TEXT_EXIT_START = GREEN_RECT_REVEAL_START + 0.004;
  const BOTTLE_SHAPE_START = TEXT_SHRINK_END + 0.002;
  const hasStoryBridge = Boolean(
    flourishStorySection &&
    storyMalbecBottle &&
    storyMalbecSlot,
  );
  const storyFinished = !flourishStorySection ||
    flourishStorySection.getBoundingClientRect().bottom <= window.innerHeight + 2;
  const bridgeActive = hasStoryBridge && storyFinished;
  const storyMorphTarget = getStoryMorphMalbecTarget();
  const titleIntroProgress = bridgeActive
    ? smoothStep((varietalProgress - TITLE_FADE_IN_START) / TITLE_FADE_IN_DURATION)
    : 0;
  const titleSquashProgress = bridgeActive
    ? smoothStep((varietalProgress - TEXT_SHRINK_START) / (TEXT_SHRINK_END - TEXT_SHRINK_START))
    : 1;
  const titleTextExitProgress = bridgeActive
    ? smoothStep((varietalProgress - TEXT_EXIT_START) / 0.014)
    : 1;
  const titleMorphProgress = bridgeActive
    ? smoothStep((varietalProgress - BOTTLE_SHAPE_START) / (MALBEC_MORPH_END - BOTTLE_SHAPE_START))
    : 1;
  const titleFadeProgress = bridgeActive
    ? smoothStep((varietalProgress - (MALBEC_MORPH_END - 0.012)) / 0.044)
    : 1;
  const titleBaseWidth = Math.min(window.innerWidth * 0.82, 1120);
  const titleBaseHeight = clamp(window.innerHeight * 0.16, 112, 168);
  const thinMorphWidth = clamp(window.innerWidth * 0.012, 12, 24);
  const thinMorphHeight = titleBaseHeight;
  const bottleRevealProgress = bridgeActive
    ? smoothStep((varietalProgress - GREEN_RECT_REVEAL_START) / (GREEN_RECT_REVEAL_END - GREEN_RECT_REVEAL_START))
    : 1;
  const bottleShapeProgress = bridgeActive
    ? smoothStep((varietalProgress - BOTTLE_SHAPE_START) / (MALBEC_MORPH_END - BOTTLE_SHAPE_START))
    : 1;
  const bottleDetailProgress = bridgeActive
    ? smoothStep((varietalProgress - MALBEC_LABEL_START) / (MALBEC_TRAVEL_END - MALBEC_LABEL_START))
    : 1;
  const malbecTravelProgress = bridgeActive
    ? smoothStep((varietalProgress - MALBEC_TRAVEL_START) / (MALBEC_TRAVEL_END - MALBEC_TRAVEL_START))
    : 1;
  const morphTitleOpacity = titleIntroProgress * (1 - titleFadeProgress);
  const morphTextOpacity = titleIntroProgress * (1 - titleTextExitProgress);
  const morphShapeOpacity = 0;
  const morphWidth = lerp(
    lerp(titleBaseWidth, thinMorphWidth, titleSquashProgress),
    storyMorphTarget.width,
    titleMorphProgress,
  );
  const morphHeight = lerp(
    lerp(titleBaseHeight, thinMorphHeight, titleSquashProgress),
    storyMorphTarget.height,
    titleMorphProgress,
  );
  const morphTextScaleX = lerp(1, 0.018, titleSquashProgress);
  const morphTitleScale = 1;
  const copyOpacity = 1 - clamp((varietalProgress - 0.02) / 0.18, 0, 1);
  const lineupOpacity = bridgeActive
    ? smoothStep((varietalProgress - LINEUP_REVEAL_START) / (LINEUP_REVEAL_END - LINEUP_REVEAL_START))
    : clamp((varietalProgress - 0.2) / 0.12, 0, 1);
  const turnProgress = clamp(
    (varietalProgress - (bridgeActive ? LINEUP_TURN_START : 0.24)) /
      (bridgeActive ? LINEUP_TURN_END - LINEUP_TURN_START : 0.34),
    0,
    1,
  );
  const productionAxisInProgress = bridgeActive
    ? smoothStep((varietalProgress - PRODUCTION_AXIS_START) / (PRODUCTION_AXIS_END - PRODUCTION_AXIS_START))
    : 0;
  const productionBarInProgress = bridgeActive
    ? smoothStep((varietalProgress - PRODUCTION_BAR_START) / (PRODUCTION_BAR_END - PRODUCTION_BAR_START))
    : 0;
  const productionChartExitProgress = bridgeActive
    ? smoothStep((varietalProgress - PRODUCTION_CHART_EXIT_START) / (PRODUCTION_CHART_EXIT_END - PRODUCTION_CHART_EXIT_START))
    : 1;
  const productionBottleResetProgress = bridgeActive
    ? smoothStep((varietalProgress - OTHER_BOTTLES_EXIT_END) / (MALBEC_ROTATE_START - OTHER_BOTTLES_EXIT_END))
    : 1;
  const productionChartProgress = productionBarInProgress * (1 - productionBottleResetProgress);
  const productionAxisOpacity = productionAxisInProgress * (1 - productionChartExitProgress);
  const productionAxisY = 0;
  const transitionProgress = bridgeActive
    ? smoothStep((varietalProgress - OTHER_BOTTLES_EXIT_START) / (OTHER_BOTTLES_EXIT_END - OTHER_BOTTLES_EXIT_START))
    : smoothStep((varietalProgress - 0.54) / 0.14);
  const labelClearProgress = bridgeActive
    ? smoothStep((varietalProgress - MALBEC_LABEL_FADE_START) / (MALBEC_LABEL_FADE_END - MALBEC_LABEL_FADE_START))
    : smoothStep((varietalProgress - 0.55) / 0.07);
  const heroProgress = bridgeActive
    ? smoothStep((varietalProgress - MALBEC_ROTATE_START) / (MALBEC_ROTATE_END - MALBEC_ROTATE_START))
    : smoothStep((varietalProgress - 0.58) / 0.16);
  const bottlePullback1Progress = bridgeActive
    ? smoothStep((varietalProgress - BOTTLE_PULLBACK_1_START) / (BOTTLE_PULLBACK_1_END - BOTTLE_PULLBACK_1_START))
    : 0;
  const bottlePullback2Progress = bridgeActive
    ? smoothStep((varietalProgress - BOTTLE_PULLBACK_2_START) / (BOTTLE_PULLBACK_2_END - BOTTLE_PULLBACK_2_START))
    : 0;
  const questionInProgress = bridgeActive
    ? smoothStep((varietalProgress - QUESTION_START) / QUESTION_FADE_IN_DURATION)
    : smoothStep((varietalProgress - 0.67) / 0.07);
  const questionOutProgress = bridgeActive
    ? smoothStep((varietalProgress - (QUESTION_END - QUESTION_FADE_OUT_DURATION)) / QUESTION_FADE_OUT_DURATION)
    : smoothStep((varietalProgress - 0.82) / 0.045);
  const questionProgress = questionInProgress * (1 - questionOutProgress);
  const backgroundProgress = bridgeActive
    ? smoothStep((varietalProgress - MALBEC_ROTATE_START) / (MALBEC_CENTER_HOLD_START - MALBEC_ROTATE_START))
    : smoothStep((varietalProgress - 0.58) / 0.12);
  const corkProgress = bridgeActive
    ? smoothStep((varietalProgress - CORK_START) / (CORK_END - CORK_START))
    : smoothStep((varietalProgress - 0.79) / 0.065);
  const corkFadeProgress = bridgeActive
    ? smoothStep((varietalProgress - CORK_END) / (POUR_START - CORK_END))
    : smoothStep((varietalProgress - 0.87) / 0.045);
  const corkOpacity = (heroProgress > 0.985 ? 1 : 0) * (1 - corkFadeProgress);
  const sprayProgress = bridgeActive
    ? smoothStep((varietalProgress - CORK_START) / (CORK_END - CORK_START))
    : smoothStep((varietalProgress - 0.8) / 0.065);
  const sprayFadeProgress = bridgeActive
    ? smoothStep((varietalProgress - CORK_END) / (POUR_START - CORK_END))
    : smoothStep((varietalProgress - 0.885) / 0.045);
  const sprayOpacity = sprayProgress * (1 - sprayFadeProgress);
  const sprayDistance = 52 * sprayProgress;
  const bottlePourProgress = bridgeActive
    ? smoothStep((varietalProgress - BOTTLE_TILT_START) / (BOTTLE_TILT_END - BOTTLE_TILT_START))
    : smoothStep((varietalProgress - 0.825) / 0.105);
  const bottleServiceLiftProgress = bridgeActive
    ? smoothStep((varietalProgress - BOTTLE_LIFT_START) / (BOTTLE_LIFT_END - BOTTLE_LIFT_START))
    : 0;
  const bottleExitForGlassProgress = bridgeActive
    ? smoothStep((varietalProgress - BOTTLE_EXIT_START) / (BOTTLE_EXIT_END - BOTTLE_EXIT_START))
    : 0;
  const bridgeGlassProgress = bridgeActive
    ? smoothStep((varietalProgress - GLASS_ENTER_START) / (GLASS_ENTER_END - GLASS_ENTER_START))
    : smoothStep((varietalProgress - 0.958) / 0.055);
  const streamInProgress = bridgeActive
    ? smoothStep((varietalProgress - STREAM_START) / (GLASS_ENTER_START - STREAM_START))
    : smoothStep((varietalProgress - 0.945) / 0.035);
  const streamLength = bridgeActive
    ? smoothStep((varietalProgress - STREAM_START) / (GLASS_FILL_END - STREAM_START))
    : smoothStep((varietalProgress - 0.952) / 0.04);
  const streamOutProgress = bridgeActive
    ? smoothStep((varietalProgress - STREAM_CUT_START) / (STREAM_CUT_END - STREAM_CUT_START))
    : smoothStep((varietalProgress - 0.992) / 0.018);
  const bottleLiftProgress = bridgeActive
    ? smoothStep((varietalProgress - BOTTLE_EXIT_START) / (BOTTLE_EXIT_END - BOTTLE_EXIT_START))
    : smoothStep((varietalProgress - 0.965) / 0.07);
  const glassZoomInProgress = bridgeActive
    ? smoothStep((varietalProgress - GLASS_ZOOM_IN_START) / (GLASS_ZOOM_IN_END - GLASS_ZOOM_IN_START))
    : smoothStep((varietalProgress - 0.992) / 0.04);
  const glassZoomOutProgress = bridgeActive
    ? 0
    : smoothStep((varietalProgress - 1.05) / 0.02);
  const glassSettleRightProgress = bridgeActive
    ? 0
    : 0;
  const glassReleaseProgress = bridgeActive
    ? smoothStep((varietalProgress - GLASS_SETTLE_RIGHT_END) / (GLASS_RELEASE_END - GLASS_SETTLE_RIGHT_END))
    : 0;
  const glassZoomProgress = bridgeActive
    ? glassZoomInProgress * (1 - glassZoomOutProgress)
    : glassZoomInProgress * (1 - glassZoomOutProgress);
  const glassRightProgress = bridgeActive
    ? glassSettleRightProgress
    : smoothStep((varietalProgress - 1.05) / 0.02);
  const glassPourX = bridgeActive
    ? window.innerWidth <= 700
      ? 10
      : window.innerWidth <= 980
        ? 7.5
        : 5.8
    : 0;
  const glassCenterProgress = bridgeActive
    ? smoothStep((varietalProgress - GLASS_CENTER_START) / (GLASS_CENTER_END - GLASS_CENTER_START))
    : 1;
  const streamOpacity = streamInProgress * (1 - streamOutProgress);
  const streamTopCut = 0;
  const streamBottomCut = Math.max((1 - streamLength) * 100, streamOutProgress * 100);
  const bridgeGlassEntryY = bridgeActive ? GLASS_ENTRY_START_Y : 128;
  const bridgeGlassY = (1 - bridgeGlassProgress) * bridgeGlassEntryY;
  const bridgeGlassOpacity = bridgeGlassProgress;
  const bridgeGlassVisible = bridgeGlassOpacity > 0.001;
  const bridgeGlassScale = lerp(1, WINE_INTERIOR_GLASS_SCALE, glassZoomProgress);
  const bridgeGlassOriginY = lerp(74, 48, glassZoomProgress);
  const bridgeGlassExtraX = bridgeActive
    ? lerp(glassPourX, WINE_INTERIOR_GLASS_X, glassCenterProgress)
    : WINE_SETTLED_GLASS_X * glassRightProgress;
  const bridgeGlassControlsScene = isVarietalSceneInView && (bridgeActive
    ? varietalProgress >= GLASS_APPEAR_START && varietalProgress < 1
    : varietalProgress > 0.94 && varietalProgress < 0.998);
  const bridgeGlassOwnsScene = isVarietalSceneInView && (bridgeActive
    ? varietalProgress >= GLASS_APPEAR_START && varietalProgress <= GLASS_RELEASE_END
    : bridgeGlassControlsScene);
  const bridgeGlassPreEntry = isVarietalSceneInView && bridgeActive &&
    varietalProgress >= STREAM_START &&
    varietalProgress < GLASS_ENTER_START;
  const bridgeFillProgress = bridgeActive
    ? smoothStep((varietalProgress - GLASS_FILL_START) / (GLASS_FILL_END - GLASS_FILL_START))
    : smoothStep((varietalProgress - 0.972) / 0.035);
  const malbecIndex = varietalBottles.findIndex((bottle) =>
    bottle.classList.contains("bottle-malbec"),
  );
  const heroIndex = malbecIndex >= 0
    ? malbecIndex
    : Math.floor(varietalBottles.length / 2);

  if (!bridgeActive || varietalProgress < LINEUP_REVEAL_END) {
    storyMalbecLineupSettled = false;
  }

  root.style.setProperty("--varietal-progress", varietalProgress.toFixed(3));
  root.style.setProperty("--varietal-copy-opacity", copyOpacity.toFixed(3));
  root.style.setProperty("--varietal-lineup-opacity", lineupOpacity.toFixed(3));
  root.style.setProperty("--varietal-production-axis-opacity", productionAxisOpacity.toFixed(3));
  root.style.setProperty("--varietal-production-axis-y", `${productionAxisY.toFixed(2)}vh`);
  root.style.setProperty("--varietal-morph-title-opacity", morphTitleOpacity.toFixed(3));
  root.style.setProperty("--varietal-morph-text-opacity", morphTextOpacity.toFixed(3));
  root.style.setProperty("--varietal-morph-shape-opacity", morphShapeOpacity.toFixed(3));
  root.style.setProperty("--varietal-morph-bottle-progress", titleMorphProgress.toFixed(3));
  root.style.setProperty("--varietal-morph-text-scale-x", morphTextScaleX.toFixed(3));
  root.style.setProperty("--varietal-morph-title-scale", morphTitleScale.toFixed(3));
  root.style.setProperty("--varietal-morph-width", `${morphWidth.toFixed(2)}px`);
  root.style.setProperty("--varietal-morph-height", `${morphHeight.toFixed(2)}px`);
  root.style.setProperty("--bottle-transition-bg-opacity", backgroundProgress.toFixed(3));
  root.style.setProperty("--bottle-question-opacity", questionProgress.toFixed(3));
  root.style.setProperty("--bridge-stream-opacity", streamOpacity.toFixed(3));
  root.style.setProperty("--bridge-stream-length", streamLength.toFixed(3));
  root.style.setProperty("--bridge-stream-cut", `${streamBottomCut.toFixed(2)}%`);
  root.style.setProperty("--bridge-stream-top-cut", `${streamTopCut.toFixed(2)}%`);
  root.style.setProperty("--bridge-stream-bottom-cut", `${streamBottomCut.toFixed(2)}%`);
  root.style.setProperty("--bridge-stream-y", "0vh");
  if (bridgeGlassOwnsScene) {
    root.style.setProperty("--bridge-glass-opacity", bridgeGlassOpacity.toFixed(3));
    root.style.setProperty("--bridge-glass-y", `${bridgeGlassY.toFixed(2)}vh`);
    root.style.setProperty("--bridge-glass-scale", bridgeGlassScale.toFixed(3));
    root.style.setProperty("--bridge-glass-origin-y", `${bridgeGlassOriginY.toFixed(2)}%`);
    root.style.setProperty("--bridge-wine-fill-progress", bridgeFillProgress.toFixed(3));
    root.classList.toggle("is-bridge-glass-zooming", bridgeGlassVisible && glassZoomProgress > 0.001);
    root.style.setProperty("--bridge-glass-extra-x", `${bridgeGlassExtraX.toFixed(2)}vw`);
    root.style.setProperty("--bridge-glass-rotate", "0deg");
    root.style.setProperty("--shared-glass-opacity", "1");
  } else if (bridgeGlassPreEntry) {
    root.style.setProperty("--bridge-glass-opacity", "0");
    root.style.setProperty("--bridge-glass-y", `${GLASS_ENTRY_START_Y.toFixed(2)}vh`);
    root.style.setProperty("--bridge-glass-scale", "1");
    root.style.setProperty("--bridge-glass-origin-y", "74%");
    root.style.setProperty("--bridge-wine-fill-progress", "0");
    root.style.setProperty("--bridge-glass-extra-x", `${glassPourX.toFixed(2)}vw`);
    root.style.setProperty("--bridge-glass-rotate", "0deg");
    root.style.setProperty("--shared-glass-opacity", "1");
    root.classList.remove("is-bridge-glass-zooming");
  } else if (isVarietalSceneInView && !bridgeGlassOwnsScene) {
    root.style.setProperty("--bridge-glass-opacity", "0");
    root.style.setProperty("--bridge-glass-y", "148vh");
    root.style.setProperty("--bridge-glass-scale", "1");
    root.style.setProperty("--bridge-glass-origin-y", "74%");
    root.style.setProperty("--bridge-wine-fill-progress", "0");
    root.style.setProperty("--bridge-glass-extra-x", "0vw");
    root.style.setProperty("--bridge-glass-rotate", "0deg");
    root.style.setProperty("--shared-glass-opacity", "1");
    root.classList.remove("is-bridge-glass-zooming");
  }
  root.classList.toggle(
    "is-varietal-pour-scene",
    bridgeGlassOwnsScene && glassZoomProgress <= 0.001,
  );

  if (bridgeActive && !storyMalbecLineupSettled) {
    storyMalbecSlot?.classList.add("is-traveling-bottle-source");
    const fromTarget = {
      ...storyMorphTarget,
      width: morphWidth,
      height: morphHeight,
    };
    const toTarget = getFinalMalbecTarget();
    const travelTarget = interpolateMalbecTarget(fromTarget, toTarget, malbecTravelProgress);
    const malbecReadyForLineup = varietalProgress >= LINEUP_REVEAL_END;

    if (!malbecReadyForLineup) {
      applyTravelingMalbec(
        travelTarget,
        bottleRevealProgress,
        bottleDetailProgress,
        bottleShapeProgress,
      );
    } else {
      storyMalbecLineupSettled = true;
      storyMalbecSlot?.classList.add("is-travel-handoff");
      clearTravelingMalbec();
      requestAnimationFrame(() => {
        storyMalbecSlot?.classList.remove("is-travel-handoff");
      });
    }
  } else if (!bridgeActive) {
    clearTravelingMalbec();
  }

  varietalBridgeGlassActive = bridgeGlassControlsScene;

  const bridgeWineLevel = buildBridgeWineLevel(bridgeFillProgress);
  bridgeWineFill?.setAttribute("d", bridgeWineLevel.fill);
  bridgeWineSurface?.setAttribute("d", bridgeWineLevel.top);

  const productionChartSlotOffsets = [];
  const lineupElement = varietalBottles[0]?.closest(".bottle-lineup");
  if (lineupElement && varietalBottles.length) {
    const bottleBodyWidthRatio = 0.91;
    const bottleChartWidths = varietalBottles.map((lineupBottle) => {
      const targetScaleValue = getBottleProductionRatio(lineupBottle);
      return Math.max(lineupBottle.offsetWidth * targetScaleValue * bottleBodyWidthRatio, 1);
    });
    const chartWidthTotal = bottleChartWidths.reduce((sum, width) => sum + width, 0);
    const lineupWidth = lineupElement.clientWidth || window.innerWidth;
    const leftAxisReserve = clamp(window.innerWidth * 0.078, 90, 150);
    const rightReserve = clamp(window.innerWidth * 0.018, 24, 54);
    const availableSpan = Math.max(lineupWidth - leftAxisReserve - rightReserve, chartWidthTotal);
    const idealGap = clamp(lineupWidth * 0.052, 62, 104);
    const availableGap = varietalBottles.length > 1
      ? (availableSpan - chartWidthTotal) / (varietalBottles.length - 1)
      : 0;
    const equalGap = varietalBottles.length > 1
      ? Math.max(10, Math.min(idealGap, availableGap))
      : 0;
    const chartSpan = chartWidthTotal + equalGap * Math.max(varietalBottles.length - 1, 0);
    const maxLeftEdge = Math.max(leftAxisReserve, lineupWidth - rightReserve - chartSpan);
    const centeredLeftEdge = (lineupWidth - chartSpan) / 2;
    const chartLeftEdge = Math.max(0, Math.min(Math.max(leftAxisReserve, centeredLeftEdge), maxLeftEdge));
    let chartCursor = chartLeftEdge;

    varietalBottles.forEach((lineupBottle, lineupIndex) => {
      const slot = lineupBottle.closest(".varietal-slot");
      const baseCenter = slot ? slot.offsetLeft + slot.offsetWidth / 2 : 0;
      const targetCenter = chartCursor + bottleChartWidths[lineupIndex] / 2;
      productionChartSlotOffsets[lineupIndex] = targetCenter - baseCenter;
      chartCursor += bottleChartWidths[lineupIndex] + equalGap;
    });
  }

  varietalBottles.forEach((bottle, index) => {
    const slot = bottle.closest(".varietal-slot");
    const isHeroBottle = index === heroIndex;
    const turnCycleProgress = smoothStep(turnProgress * varietalBottles.length - index);
    const turnToBackProgress = smoothStep(turnCycleProgress / 0.28);
    const turnToFrontProgress = smoothStep((turnCycleProgress - 0.75) / 0.25);
    const bottleTurnAngle = 180 * turnToBackProgress + 180 * turnToFrontProgress;
    const sideProgress = Math.abs(Math.sin((bottleTurnAngle * Math.PI) / 180));
    const cylinderProgress = clamp(sideProgress, 0, 1);
    const isCompletingTurn = turnToFrontProgress > 0.001;
    const labelTurnOffset = 110;
    const frontOffset = isCompletingTurn
      ? (1 - turnToFrontProgress) * labelTurnOffset
      : -turnToBackProgress * labelTurnOffset;
    const backOffset = isCompletingTurn
      ? -turnToFrontProgress * labelTurnOffset
      : (1 - turnToBackProgress) * labelTurnOffset;
    const edgeOpacity = 0.08 + cylinderProgress * 0.38;
    const labelEdgeOpacity = 0.06 + cylinderProgress * 0.34;
    const shineLeft = 26 + (bottleTurnAngle / 360) * 48;
    const labelFade = 1 - labelClearProgress;
    const targetBottleScale = getBottleProductionRatio(bottle);
    const bottleChartProgress = isHeroBottle
      ? productionBarInProgress * (1 - heroProgress)
      : productionChartProgress;
    const bottleChartScale = lerp(1, targetBottleScale, bottleChartProgress);
    const bottleOriginY = lerp(56, 100, bottleChartProgress);
    const lineupCenterIndex = (varietalBottles.length - 1) / 2;
    const distanceFromCenter = index - lineupCenterIndex;
    const chartSlotTargetX = Number.isFinite(productionChartSlotOffsets[index])
      ? productionChartSlotOffsets[index]
      : -distanceFromCenter * window.innerWidth * 0.052;
    const chartSlotX = chartSlotTargetX * bottleChartProgress;
    const chartSlotY = 0;

    if (slot) {
      slot.style.setProperty("--slot-chart-x", `${chartSlotX.toFixed(2)}px`);
      slot.style.setProperty("--slot-chart-y", `${chartSlotY.toFixed(2)}vh`);
      slot.style.setProperty("--slot-value-top", `${((1 - targetBottleScale) * 100).toFixed(2)}%`);
      if (isHeroBottle) {
        slot.style.setProperty("--slot-exit-x", "0vw");
        slot.style.setProperty("--slot-exit-y", "0vh");
        slot.style.setProperty("--slot-exit-opacity", "1");
      } else {
        const distanceFromHero = index - heroIndex;
        const exitOpacity = 1 - transitionProgress;
        slot.style.setProperty("--slot-exit-x", `${(distanceFromHero * 3.2 * transitionProgress).toFixed(2)}vw`);
        slot.style.setProperty("--slot-exit-y", `${(-128 * transitionProgress).toFixed(2)}vh`);
        slot.style.setProperty("--slot-exit-opacity", exitOpacity.toFixed(3));
      }
    }

    if (isHeroBottle) {
      const pullbackScale = bottlePullback1Progress * 0.22 + bottlePullback2Progress * 0.04;
      const pullbackY = bottlePullback1Progress * 9 + bottlePullback2Progress * 1.8;
      const serviceLiftY = bottleServiceLiftProgress * 34;
      const serviceLiftScale = bottleServiceLiftProgress * 0.14;
      const heroOpacity = 1 - bottleExitForGlassProgress;
      /* Al girar 90°, la altura original de la botella pasa a ocupar ancho.
         Limitamos el crecimiento por ambas dimensiones para que la fase hero
         entre completa en cualquier monitor o notebook. */
      const heroScaleByWidth = (window.innerWidth * 0.68) / Math.max(bottle.offsetHeight, 1);
      const heroScaleByHeight = (window.innerHeight * 0.66) / Math.max(bottle.offsetWidth, 1);
      const heroExpandedScale = clamp(Math.min(2.18, heroScaleByWidth, heroScaleByHeight), 1.42, 2.18);
      const baseHeroScale = lerp(1, heroExpandedScale, heroProgress) - pullbackScale - serviceLiftScale - bottlePourProgress * 0.24;
      const heroScale = baseHeroScale * bottleChartScale;
      const pourCoverY = 4.5 * bottlePourProgress * (1 - bottleLiftProgress);
      bottle.style.setProperty("--hero-x", "0px");
      bottle.style.setProperty("--hero-y", `${(-8 * heroProgress - pullbackY - serviceLiftY + pourCoverY - 118 * bottleLiftProgress).toFixed(2)}vh`);
      bottle.style.setProperty("--hero-rotate", `${(-90 * heroProgress - 15 * bottlePourProgress).toFixed(2)}deg`);
      bottle.style.setProperty("--hero-scale", heroScale.toFixed(3));
      bottle.style.setProperty("--hero-opacity", heroOpacity.toFixed(3));
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
      bottle.style.setProperty("--hero-scale", bottleChartScale.toFixed(3));
      bottle.style.setProperty("--hero-opacity", "1");
      bottle.style.setProperty("--hero-z", "0");
      bottle.style.setProperty("--bridge-cork-progress", "0");
      bottle.style.setProperty("--bridge-cork-opacity", "0");
      bottle.style.setProperty("--bridge-spray-progress", "0");
      bottle.style.setProperty("--bridge-spray-opacity", "0");
      bottle.style.setProperty("--bridge-spray-distance", "0px");
    }

    bottle.style.setProperty("--bottle-turn", `${bottleTurnAngle.toFixed(2)}deg`);
    bottle.style.setProperty("--varietal-active", cylinderProgress.toFixed(3));
    bottle.style.setProperty("--bottle-edge-opacity", edgeOpacity.toFixed(3));
    bottle.style.setProperty("--front-label-offset", `${frontOffset.toFixed(2)}%`);
    bottle.style.setProperty("--back-label-offset", `${backOffset.toFixed(2)}%`);
    bottle.style.setProperty("--label-edge-opacity", labelEdgeOpacity.toFixed(3));
    bottle.style.setProperty("--label-spine-opacity", cylinderProgress.toFixed(3));
    bottle.style.setProperty("--bottle-shine-left", `${shineLeft.toFixed(1)}%`);
    bottle.style.setProperty("--front-label-opacity", labelFade.toFixed(3));
    bottle.style.setProperty("--back-label-opacity", labelFade.toFixed(3));
    bottle.style.setProperty("--bottle-origin-y", `${bottleOriginY.toFixed(2)}%`);
  });

  const heroBottle = varietalBottles[heroIndex];
  const pin = varietalSection.querySelector(".varietal-pin");
  root.style.setProperty("--bridge-stream-ready", "0");
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
        const targetMouthX = surfaceRect.left + surfaceRect.width * POUR_MOUTH_TARGET_RATIO;
        const pourAlignmentProgress = bridgeActive
          ? smoothStep((varietalProgress - BOTTLE_PULLBACK_START) / (BOTTLE_PULLBACK_END - BOTTLE_PULLBACK_START))
          : heroProgress;
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
      const mouthWidth = clamp(Math.min(correctedMouthRect.width, correctedMouthRect.height) * 1.55, 36, 62);
      const surfaceEnd = {
        x: pourTargetRect.left + pourTargetRect.width * POUR_STREAM_TARGET_RATIO - pinRect.left,
        y: pourTargetRect.top + pourTargetRect.height * 0.5 - pinRect.top,
      };
      const fixedMouthWidth = mouthWidth;
      const streamX = surfaceEnd.x;
      const sourceX =
        correctedMouthRect.left + correctedMouthRect.width * 0.52 - pinRect.left;
      const start = {
        x: sourceX,
        y: correctedMouthRect.top + correctedMouthRect.height * 0.54 - pinRect.top,
      };
      const end = {
        x: streamX,
        y: surfaceEnd.y + fixedMouthWidth * 0.08,
      };
      const streamSizesReady = [
        pinRect.width,
        pinRect.height,
        correctedMouthRect.width,
        correctedMouthRect.height,
        pourTargetRect.width,
        pourTargetRect.height,
      ].every((value) => Number.isFinite(value) && value > 0);
      const streamCoordinatesReady = [
        start.x,
        start.y,
        end.x,
        end.y,
      ].every((value) => Number.isFinite(value));

      if (!streamSizesReady || !streamCoordinatesReady || end.y <= start.y) {
        return;
      }

      root.style.setProperty("--bridge-stream-ready", "1");
      root.style.setProperty("--bridge-stream-width", `${mouthWidth.toFixed(2)}px`);
      root.style.setProperty("--bridge-stream-shadow-width", `${(mouthWidth + 10).toFixed(2)}px`);
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
          const taper = fixedMouthWidth * (0.5 + inletOpen * 0.44 - progress * 0.24);
          const pulse =
            Math.sin(progress * Math.PI * 2.2) * fixedMouthWidth * 0.035 +
            Math.sin(progress * Math.PI * 5.1) * fixedMouthWidth * 0.018;
          const minWidth = fixedMouthWidth * (0.48 + inletOpen * 0.12);
          return clamp(taper + pulse, minWidth, fixedMouthWidth * 1.08);
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

  const slideCount = Math.max(Number(flourishStorySection.dataset.slideCount) || 1, 1);
  const travel = Math.max(flourishStorySection.offsetHeight - window.innerHeight, 1);
  const rect = flourishStorySection.getBoundingClientRect();
  const storyProgress = clamp(-rect.top / travel, 0, 1);
  const storyFinished = rect.bottom <= window.innerHeight + 2;
  const cardTimelines = [
    { start: 0.44, enter: 0.045, hold: 0.18, exit: 0.055 },
    { start: 0.875, enter: 0.045, hold: 0.065, exit: 0.02 },
  ];
  const firstReorderStart = 0.16;
  const secondReorderStart = 0.72;
  const slideIndex = storyProgress >= secondReorderStart
    ? Math.min(slideCount - 1, 2)
    : storyProgress >= firstReorderStart
      ? Math.min(slideCount - 1, 1)
      : 0;
  const graphOpacity = 1;
  const baseCardSize = getStoryCardBaseSize();

  flourishStorySection.style.setProperty("--story-graph-opacity", graphOpacity.toFixed(3));

  flourishStoryCards.forEach((card, index) => {
    const timeline = cardTimelines[index] || cardTimelines[cardTimelines.length - 1];
    const enterProgress = smoothStep((storyProgress - timeline.start) / timeline.enter);
    const exitStart = timeline.start + timeline.enter + timeline.hold;
    const exitProgress = timeline.exit > 0
      ? smoothStep((storyProgress - exitStart) / timeline.exit)
      : 0;
    const cardOpacity = clamp(enterProgress - exitProgress, 0, 1);
    const entryLift = 14 * (1 - enterProgress) - 8 * exitProgress;
    let cardX = index === 0 ? -180 : -255;
    let cardY = (index === 0 ? -130 : 118) + entryLift;
    let cardWidth = baseCardSize.width;
    let cardHeight = baseCardSize.height;
    const cardScale = 0.965 + cardOpacity * 0.035;
    let cardRadius = "6px";
    let textOpacity = 1;
    let cardVisualOpacity = storyFinished || storyProgress >= 0.985 ? 0 : cardOpacity;

    cardWidth = clamp(window.innerWidth * 0.18, 230, 290);
    cardHeight = clamp(window.innerHeight * 0.12, 118, 156);

    if (window.innerWidth > 1300) {
      const sideOffset = Math.min(window.innerWidth * 0.34, 620);
      cardX = index === 1 ? -sideOffset * 0.86 : sideOffset;
      cardY = (index === 0 ? -72 : 96) + entryLift;
    } else {
      cardX = 0;
      cardY = Math.min(window.innerHeight * 0.38, 285) + entryLift;
      cardWidth = clamp(window.innerWidth * 0.78, 260, 360);
      cardHeight = clamp(window.innerHeight * 0.12, 112, 150);
    }

    card.style.setProperty("--story-card-opacity", cardVisualOpacity.toFixed(3));
    card.style.setProperty("--story-card-x", `${cardX.toFixed(2)}px`);
    card.style.setProperty("--story-card-y", `${cardY.toFixed(2)}px`);
    card.style.setProperty("--story-card-width", `${cardWidth.toFixed(2)}px`);
    card.style.setProperty("--story-card-height", "auto");
    card.style.setProperty("--story-card-min-height", `${cardHeight.toFixed(2)}px`);
    card.style.setProperty("--story-card-radius", cardRadius);
    card.style.setProperty("--story-card-text-opacity", textOpacity.toFixed(3));
    card.style.setProperty("--story-card-scale", cardScale.toFixed(3));
  });

  const iframe = flourishStorySection.querySelector(".flourish-embed iframe");
  if (!iframe || !iframe.src) return;

  if (slideIndex === flourishStorySlideIndex) return;

  flourishStorySlideIndex = slideIndex;
  iframe.src = iframe.src.replace(/#slide-\d+$/, "") + `#slide-${slideIndex}`;
}

function updateCompositionState() {
  if (!compositionSection) return;

  const travel = Math.max(compositionSection.offsetHeight - window.innerHeight, 1);
  const rect = compositionSection.getBoundingClientRect();
  const fermentationRect = fermentationSection?.getBoundingClientRect();
  const compositionProgress = clamp(-rect.top / travel, 0, 1);
  const isCompactComposition = window.innerWidth <= 700;
  const isCompositionActive = rect.top <= window.innerHeight && rect.bottom >= 0;
  const isCompositionNear = rect.top <= window.innerHeight * 1.15 && rect.bottom >= 0;
  const isFermentationTakingGlass =
    fermentationRect
    && fermentationRect.top <= window.innerHeight * 1.08
    && fermentationRect.bottom >= 0;
  const compositionControlsGlass =
    isCompositionNear
    && !isFermentationTakingGlass
    && !varietalBridgeGlassActive;
  const focusStart = 0.14;
  const graphSequenceEnd = 0.94;
  const wineZoomProgress = smoothStep((compositionProgress - 0.14) / 0.42);
  const wineRecedeProgress = smoothStep((compositionProgress - 0.66) / 0.16);
  const chartIn = smoothStep((compositionProgress - 0.04) / 0.18);
  const chartOut = smoothStep((compositionProgress - 0.97) / 0.03);
  const chartVisible = chartIn * (1 - chartOut);
  const chartX = -4 * (1 - chartIn) - 22 * chartOut;
  const chartScale = 0.72 + chartIn * 0.28 - chartOut * 0.04;
  const copyIn = smoothStep((compositionProgress - 0.12) / 0.14);
  const copyOut = smoothStep((compositionProgress - 0.96) / 0.035);
  const copyVisible = copyIn * (1 - copyOut);
  const copyY = (1 - copyIn) * 0.85;
  const glassShift = WINE_INTERIOR_GLASS_X;
  const glassScale = WINE_INTERIOR_GLASS_SCALE;
  const glassOpacity = 1;
  const focusEnd = graphSequenceEnd;
  const focusProgress = clamp(
    (compositionProgress - focusStart) / (focusEnd - focusStart),
    0,
    0.999,
  );
  const segmentWeights = compositionSlices.map(() => 1);
  const totalSegmentWeight = segmentWeights.reduce((sum, weight) => sum + weight, 0);
  let activeSliceIndex = -1;
  let activeSliceProgress = 0;

  if (compositionProgress >= focusStart && compositionProgress <= focusEnd) {
    let segmentStart = 0;
    segmentWeights.some((weight, index) => {
      const segmentEnd = segmentStart + weight / totalSegmentWeight;
      const isLastSegment = index === segmentWeights.length - 1;
      const isActiveSegment =
        focusProgress >= segmentStart && (focusProgress < segmentEnd || isLastSegment);

      if (isActiveSegment) {
        activeSliceIndex = index;
        activeSliceProgress = clamp(
          (focusProgress - segmentStart) / Math.max(segmentEnd - segmentStart, 0.001),
          0,
          0.999,
        );
        return true;
      }

      segmentStart = segmentEnd;
      return false;
    });
  }
  const sliceFocus =
    activeSliceIndex >= 0
      ? smoothStep(activeSliceProgress / 0.12)
        * (1 - smoothStep((activeSliceProgress - 0.88) / 0.12))
      : 0;

  root.classList.toggle("is-composition-active", isCompositionActive);
  root.classList.toggle("is-composition-near", isCompositionNear);
  root.classList.toggle(
    "is-composition-glass-zooming",
    compositionControlsGlass,
  );
  root.style.setProperty("--composition-progress", compositionProgress.toFixed(3));
  root.style.setProperty("--composition-chart-x", `${chartX.toFixed(2)}vw`);
  root.style.setProperty("--composition-chart-opacity", chartVisible.toFixed(3));
  root.style.setProperty("--composition-chart-scale", chartScale.toFixed(3));
  root.style.setProperty("--composition-copy-opacity", copyVisible.toFixed(3));
  root.style.setProperty("--composition-copy-y", `${copyY.toFixed(2)}rem`);

  if (compositionControlsGlass) {
    root.classList.add("is-bridge-glass-zooming");
    root.style.setProperty("--bridge-glass-opacity", "1");
    root.style.setProperty("--bridge-glass-extra-x", `${glassShift.toFixed(2)}vw`);
    root.style.setProperty("--bridge-glass-y", "0vh");
    root.style.setProperty("--bridge-glass-scale", glassScale.toFixed(3));
    root.style.setProperty("--bridge-glass-rotate", "0deg");
    root.style.setProperty("--bridge-glass-origin-y", "48%");
    root.style.setProperty("--shared-glass-opacity", glassOpacity.toFixed(3));
  }

  compositionSlices.forEach((slice, index) => {
    const focus = index === activeSliceIndex ? sliceFocus : 0;
    const midAngle = Number(slice.dataset.midAngle) || 0;
    const percent = Number(slice.dataset.percent) || 0;
    const popDistance = percent > 50 ? 8 : percent > 5 ? 14 : 10;
    const scaleBoost = percent > 50 ? 0.01 : percent > 5 ? 0.018 : 0.004;
    const pop = compositionPoint(popDistance * focus, midAngle);

    slice.style.setProperty("--slice-pop-x", `${pop.x.toFixed(2)}px`);
    slice.style.setProperty("--slice-pop-y", `${pop.y.toFixed(2)}px`);
    slice.style.setProperty("--slice-scale", (1 + focus * scaleBoost).toFixed(3));
    slice.style.setProperty("--slice-focus", focus.toFixed(3));
  });

  compositionDetails.forEach((detail, index) => {
    const detailFocus =
      index === activeSliceIndex
        ? smoothStep(activeSliceProgress / 0.1)
          * (1 - smoothStep((activeSliceProgress - 0.9) / 0.1))
        : 0;

    detail.classList.toggle("is-active", detailFocus > 0.02);
    detail.style.setProperty("--detail-opacity", detailFocus.toFixed(3));
    detail.style.setProperty("--detail-y", "0rem");
  });
}

function updateChemistryVarietyState() {
  if (!chemistryVarietySection) return;

  const travel = Math.max(chemistryVarietySection.offsetHeight - window.innerHeight, 1);
  const rect = chemistryVarietySection.getBoundingClientRect();
  const chemistryProgress = clamp(-rect.top / travel, 0, 1);
  const isChemistryActive = rect.top <= window.innerHeight && rect.bottom >= 0;
  const headingIn = smoothStep(chemistryProgress / 0.16);
  const linkIn = smoothStep((chemistryProgress - 0.14) / 0.18);
  const frameIn = smoothStep((chemistryProgress - 0.36) / 0.28);
  const sectionOut = smoothStep((chemistryProgress - 0.9) / 0.08);
  const headingVisible = headingIn * (1 - sectionOut);
  const frameVisible = frameIn * (1 - sectionOut);
  const linkVisible = linkIn * (1 - sectionOut);
  const frameScale = 0.965 + frameIn * 0.035 - sectionOut * 0.015;
  const frameClip = 100 - frameIn * 100;

  root.classList.toggle("is-chemistry-variety-active", isChemistryActive);
  root.style.setProperty("--chemistry-heading-opacity", headingVisible.toFixed(3));
  root.style.setProperty(
    "--chemistry-heading-y",
    `${((1 - headingIn) * 1.2 - sectionOut * 1.4).toFixed(2)}rem`,
  );
  root.style.setProperty("--chemistry-link-progress", linkVisible.toFixed(3));
  root.style.setProperty("--chemistry-frame-opacity", frameVisible.toFixed(3));
  root.style.setProperty(
    "--chemistry-frame-y",
    `${((1 - frameIn) * 2.2 - sectionOut * 1.6).toFixed(2)}rem`,
  );
  root.style.setProperty("--chemistry-frame-scale", frameScale.toFixed(3));
  root.style.setProperty("--chemistry-frame-clip", `${frameClip.toFixed(2)}%`);
}

function updateFermentationState() {
  if (!fermentationSection) return;

  const travel = Math.max(fermentationSection.offsetHeight - window.innerHeight, 1);
  const rect = fermentationSection.getBoundingClientRect();
  const fermentationProgress = clamp(-rect.top / travel, 0, 1);
  const isFermentationActive = rect.top <= window.innerHeight && rect.bottom >= 0;
  const isFermentationNear = rect.top <= window.innerHeight * 1.08 && rect.bottom >= 0;
  const copyIn = smoothStep((fermentationProgress - 0.06) / 0.12);
  const copyOut = smoothStep((fermentationProgress - 0.86) / 0.1);
  const chartIn = smoothStep((fermentationProgress - 0.1) / 0.24);
  const chartOut = smoothStep((fermentationProgress - 0.88) / 0.1);
  const copyVisible = copyIn * (1 - copyOut);
  const chartVisible = chartIn * (1 - chartOut);
  const chartX = -12 * (1 - chartIn) - 32 * chartOut;
  const chartY = -0.8 * chartIn - 2 * chartOut;
  const chartScale = 0.98 + chartIn * 0.02 - chartOut * 0.02;
  const glassTargetShift = getFermentationGlassShift();
  const glassTargetScale = window.innerWidth <= 700 ? 0.82 : window.innerWidth <= 980 ? 0.92 : 1;
  const glassZoomOutProgress = smoothStep((fermentationProgress - 0.88) / 0.12);
  const glassSettleRightProgress = smoothStep((fermentationProgress - 0.96) / 0.04);
  const glassShift = lerp(WINE_INTERIOR_GLASS_X, glassTargetShift, glassSettleRightProgress);
  const glassScale = lerp(WINE_INTERIOR_GLASS_SCALE, glassTargetScale, glassZoomOutProgress);
  const glassOriginY = glassZoomOutProgress < 0.985 ? "48%" : "74%";

  root.classList.toggle("is-fermentation-active", isFermentationActive);
  root.classList.toggle("is-fermentation-near", isFermentationNear);
  root.classList.toggle(
    "is-fermentation-glass-revealing",
    isFermentationNear && glassZoomOutProgress > 0.001,
  );
  if (isFermentationNear) {
    root.classList.toggle("is-bridge-glass-zooming", glassZoomOutProgress < 0.985);
  }
  root.style.setProperty("--fermentation-progress", fermentationProgress.toFixed(3));
  root.style.setProperty("--fermentation-copy-opacity", copyVisible.toFixed(3));
  root.style.setProperty("--fermentation-copy-x", "0vw");
  root.style.setProperty("--fermentation-chart-opacity", chartVisible.toFixed(3));
  root.style.setProperty("--fermentation-chart-x", `${chartX.toFixed(2)}vw`);
  root.style.setProperty("--fermentation-chart-y", `${chartY.toFixed(2)}vh`);
  root.style.setProperty("--fermentation-chart-scale", chartScale.toFixed(3));
  updateFermentationFlourishSlide(fermentationProgress);

  if (isFermentationNear && !varietalBridgeGlassActive) {
    root.style.setProperty("--bridge-glass-opacity", "1");
    root.style.setProperty("--bridge-glass-extra-x", `${glassShift.toFixed(2)}vw`);
    root.style.setProperty("--bridge-glass-y", "0vh");
    root.style.setProperty("--bridge-glass-scale", glassScale.toFixed(3));
    root.style.setProperty("--bridge-glass-origin-y", glassOriginY);
    root.style.setProperty("--bridge-glass-rotate", "0deg");
    root.style.setProperty("--shared-glass-opacity", "1");
  }
}

function updateFermentationFlourishSlide(fermentationProgress) {
  if (!fermentationFlourish) return;

  const slideCount = Math.max(Number(fermentationFlourish.dataset.slideCount) || 1, 1);
  if (slideCount <= 1) return;

  const iframe = fermentationFlourish.querySelector("iframe");
  if (!iframe || !iframe.src) return;

  const slideProgress = clamp((fermentationProgress - 0.46) / 0.38, 0, 0.999);
  const slideIndex = Math.min(slideCount - 1, Math.floor(slideProgress * slideCount));
  if (slideIndex === fermentationFlourishSlideIndex) return;

  fermentationFlourishSlideIndex = slideIndex;
  iframe.src = iframe.src.replace(/#slide-\d+$/, "") + `#slide-${slideIndex}`;
}

function updateInsideWineState() {
  const viewportHeight = window.innerHeight;
  let insideWineOpacity = 0;

  const getProgress = (section) => {
    if (!section) return 0;

    const travel = Math.max(section.offsetHeight - viewportHeight, 1);
    const rect = section.getBoundingClientRect();
    return clamp(-rect.top / travel, 0, 1);
  };

  const getPresence = (section, lead = 0.08) => {
    if (!section) return 0;

    const rect = section.getBoundingClientRect();
    if (rect.top >= viewportHeight * (1 + lead) || rect.bottom <= 0) return 0;
    return 1;
  };

  if (varietalSection) {
    const rect = varietalSection.getBoundingClientRect();
    const progress = getProgress(varietalSection);

    if (rect.top < viewportHeight && rect.bottom > 0) {
      insideWineOpacity = Math.max(
        insideWineOpacity,
        smoothStep((progress - 0.99) / 0.009),
      );
    }
  }

  insideWineOpacity = Math.max(
    insideWineOpacity,
    getPresence(compositionSection, 0.14),
    getPresence(chemistryVarietySection, 0.12),
  );

  if (fermentationSection) {
    const fermentationPresence = getPresence(fermentationSection, 0.12);
    const fermentationProgress = getProgress(fermentationSection);
    const fermentationExit = smoothStep((fermentationProgress - 0.96) / 0.04);

    insideWineOpacity = Math.max(
      insideWineOpacity,
      fermentationPresence * (1 - fermentationExit),
    );
  }

  root.classList.toggle("is-inside-wine", insideWineOpacity > 0.01);
}

function updateMalbecProfileState() {
  if (!malbecProfileSection) return;

  const travel = Math.max(malbecProfileSection.offsetHeight - window.innerHeight, 1);
  const rect = malbecProfileSection.getBoundingClientRect();
  const profileProgress = clamp(-rect.top / travel, 0, 1);
  const isProfileActive = rect.top <= window.innerHeight && rect.bottom >= 0;
  const isProfileNear = rect.top <= window.innerHeight * 1.08 && rect.bottom >= 0;
  const copyProgress = smoothStep((profileProgress - 0.04) / 0.12);
  const radarProgress = smoothStep((profileProgress - 0.14) / 0.14);
  const copyVisible = copyProgress > 0.04 ? 1 : 0;
  const radarVisible = radarProgress > 0.04 ? 1 : 0;
  const shapeProgress = smoothStep((profileProgress - 0.64) / 0.16);
  const shapeFill = smoothStep((profileProgress - 0.72) / 0.1);
  const barProgress = smoothStep((profileProgress - 0.36) / 0.22);
  const transitionProgress = smoothStep((profileProgress - 0.78) / 0.06);
  const glassScale = window.innerWidth <= 700 ? 0.82 : window.innerWidth <= 980 ? 0.92 : 1;

  root.classList.toggle("is-malbec-profile-active", isProfileActive);
  root.classList.toggle("is-malbec-profile-near", isProfileNear);
  root.style.setProperty("--malbec-profile-progress", profileProgress.toFixed(3));
  root.style.setProperty("--malbec-profile-copy-opacity", copyVisible.toFixed(3));
  root.style.setProperty("--malbec-profile-copy-y", `${(1.6 * (1 - copyProgress)).toFixed(2)}rem`);
  root.style.setProperty("--malbec-profile-radar-opacity", radarVisible.toFixed(3));
  root.style.setProperty("--malbec-profile-radar-y", `${(1.8 * (1 - radarProgress)).toFixed(2)}rem`);
  root.style.setProperty("--malbec-profile-radar-scale", (0.96 + radarProgress * 0.04).toFixed(3));
  root.style.setProperty("--malbec-profile-grid-opacity", (radarProgress * 0.82).toFixed(3));
  root.style.setProperty("--malbec-profile-shape-progress", shapeProgress.toFixed(3));
  root.style.setProperty("--malbec-profile-shape-fill", shapeFill.toFixed(3));
  root.style.setProperty("--malbec-profile-bar-progress", barProgress.toFixed(3));
  root.style.setProperty("--malbec-profile-transition-opacity", transitionProgress.toFixed(3));
  root.style.setProperty("--malbec-profile-transition-y", `${(1.2 * (1 - transitionProgress)).toFixed(2)}rem`);

  for (let index = 0; index < 5; index += 1) {
    const axisProgress = smoothStep((profileProgress - (0.26 + index * 0.055)) / 0.07);
    const labelProgress = smoothStep((profileProgress - (0.34 + index * 0.055)) / 0.07);

    root.style.setProperty(`--malbec-profile-axis-${index + 1}`, axisProgress.toFixed(3));
    root.style.setProperty(`--malbec-profile-label-${index + 1}`, labelProgress.toFixed(3));
  }

  if (isProfileActive && !varietalBridgeGlassActive) {
    root.classList.remove("is-bridge-glass-zooming");
    root.style.setProperty("--bridge-glass-opacity", "1");
    root.style.setProperty("--bridge-glass-extra-x", `${getFermentationGlassShift().toFixed(2)}vw`);
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
  const creditsWipeState = getCreditsWipeState();
  const rawTastingProgress = clamp(-rect.top / travel, 0, 1);
  const shouldLockTastingMenu = Boolean(
    tastingMenu &&
    (creditsWipeState.isActive || (rawTastingProgress > 0.015 && rect.bottom > 0)),
  );

  if (shouldLockTastingMenu && !tastingMenuLocked) {
    const menuRect = tastingMenu.getBoundingClientRect();
    root.style.setProperty("--tasting-menu-lock-left", `${menuRect.left.toFixed(2)}px`);
    root.style.setProperty("--tasting-menu-lock-top", `${menuRect.top.toFixed(2)}px`);
    root.style.setProperty("--tasting-menu-lock-width", `${menuRect.width.toFixed(2)}px`);
    root.style.setProperty("--tasting-menu-lock-height", `${menuRect.height.toFixed(2)}px`);
    root.classList.add("is-tasting-menu-locked");
    tastingMenuLocked = true;
  } else if (!shouldLockTastingMenu && tastingMenuLocked) {
    root.classList.remove("is-tasting-menu-locked");
    tastingMenuLocked = false;
  }

  const creditsTastingFreezeProgress = 0.92;
  const tastingProgress = creditsWipeState.isActive
    ? creditsTastingFreezeProgress
    : Math.min(rawTastingProgress, creditsTastingFreezeProgress);
  const isTastingActive = creditsWipeState.isActive || (rect.top <= window.innerHeight && rect.bottom >= 0);
  const isTastingNear = creditsWipeState.isActive || (rect.top <= window.innerHeight * 1.08 && rect.bottom >= 0);
  const TASTING_GLASS_ENTRY_END = 0.28;
  const TASTING_EFFECT_START = 0.32;
  const TASTING_GUIDE_END = 0.96;
  const entryProgress = 1;
  const copyY = 12 - tastingProgress * 24;
  const copyVisible = tastingProgress > 0.025 ? 1 : 0;
  const tastingGlassEntry = smoothStep(tastingProgress / TASTING_GLASS_ENTRY_END);
  const tastingEffectsReady = tastingProgress >= TASTING_EFFECT_START;
  const tastingSipProgress = smoothStep((tastingProgress - 0.81) / 0.055);
  const glassCarryShift = getFermentationGlassShift();
  const glassTargetShift = 22;
  const glassShift = isTastingActive
    ? lerp(glassCarryShift, glassTargetShift, tastingGlassEntry)
    : glassCarryShift;
  const discoverGlassFade = 0;
  const sharedGlassOpacity =
    isTastingActive ? 1 - discoverGlassFade : rect.top > window.innerHeight ? 1 : 0;
  const guideProgress = clamp(
    (tastingProgress - TASTING_EFFECT_START) / (TASTING_GUIDE_END - TASTING_EFFECT_START),
    0,
    0.999,
  );
  const guideStepCount = Math.max(TASTING_STEP_COUNT - 1, 1);
  const guideFloat = guideProgress * guideStepCount;
  const activeTextIndex = tastingEffectsReady
    ? 1 + Math.min(guideStepCount - 1, Math.floor(guideFloat))
    : 0;
  const activeEffectStep = activeTextIndex;
  const nextTastingStep = activeEffectStep;

  root.classList.toggle("is-tasting-active", isTastingActive && tastingEffectsReady);
  root.style.setProperty("--tasting-progress", tastingProgress.toFixed(3));
  root.style.setProperty("--tasting-entry-progress", entryProgress.toFixed(3));
  root.style.setProperty("--tasting-copy-y", `${copyY.toFixed(2)}vh`);
  root.style.setProperty("--tasting-copy-opacity", copyVisible.toFixed(3));
  root.style.setProperty("--tasting-mouth-opacity", tastingSipProgress.toFixed(3));
  root.style.setProperty(
    "--tasting-mouth-x",
    `${(18 * (1 - tastingSipProgress)).toFixed(2)}%`,
  );
  root.style.setProperty("--tasting-glass-drop-y", "0vh");
  if (isTastingNear && !varietalBridgeGlassActive) {
    root.classList.remove("is-bridge-glass-zooming");
    root.style.setProperty("--bridge-glass-opacity", "1");
    root.style.setProperty("--bridge-glass-y", "0vh");
    root.style.setProperty("--bridge-glass-scale", "1");
    root.style.setProperty("--bridge-glass-origin-y", "74%");
    root.style.setProperty("--bridge-glass-extra-x", `${glassShift.toFixed(2)}vw`);
    root.style.setProperty(
      "--bridge-glass-rotate",
      `${(19 * tastingSipProgress).toFixed(2)}deg`,
    );
    root.style.setProperty("--shared-glass-opacity", sharedGlassOpacity.toFixed(3));
  }
  tastingCopyPanels.forEach((panel, index) => {
    const isMenuPanel = Boolean(panel.closest(".tasting-menu"));
    const panelStep = Number(panel.dataset.step || index);
    const isActiveMenuStep = isMenuPanel && panelStep === activeTextIndex;
    let panelOpacity = copyVisible;
    let panelY = 0;
    let panelScale = isActiveMenuStep ? 1.012 : 1;
    let panelWrite = 1;

    if (!isMenuPanel) {
      panelOpacity = panelStep === activeTextIndex ? copyVisible : 0;
      panelY = panelStep < activeTextIndex ? -68 : 68;
      panelScale = panelStep === activeTextIndex ? 1 : 0.985;
      panelWrite = panelStep === activeTextIndex ? 1 : 0;
    }

    panel.style.setProperty("--panel-opacity", panelOpacity.toFixed(3));
    panel.style.setProperty("--panel-y", `${panelY.toFixed(2)}${isMenuPanel ? "rem" : "vh"}`);
    panel.style.setProperty("--panel-scale", panelScale.toFixed(3));
    panel.style.setProperty("--panel-write", panelWrite.toFixed(3));
    panel.classList.toggle("is-current", panelStep === activeTextIndex);
    panel
      .querySelectorAll("h2, h3, .tasting-menu-eyebrow, .tasting-menu-intro, .tasting-menu-step-label, .tasting-menu-step-text")
      .forEach((target, targetIndex) => {
        const targetWrite = isMenuPanel
          ? panelWrite
          : smoothStep((panelWrite - targetIndex * 0.07) / 0.2);
        target.style.setProperty("--line-write", targetWrite.toFixed(3));
        target.style.setProperty("--line-clip", `${((1 - targetWrite) * 100).toFixed(2)}%`);
      });
  });

  if (nextTastingStep !== currentTastingStep) {
    currentTastingStep = nextTastingStep;
    renderTastingStep();
  }
}

function updateFinalToastState() {
  if (!finalToastSection) return;

  const travel = Math.max(finalToastSection.offsetHeight - window.innerHeight, 1);
  const rect = finalToastSection.getBoundingClientRect();
  const toastProgress = clamp(-rect.top / travel, 0, 1);
  const entryProgress = smoothStep((toastProgress - 0.02) / 0.24);
  const impactProgress = clamp((toastProgress - 0.23) / 0.18, 0, 1);
  const impactPeak = Math.sin(impactProgress * Math.PI);
  const clinkVisible =
    smoothStep((toastProgress - 0.2) / 0.08) *
    (1 - smoothStep((toastProgress - 0.68) / 0.14));
  const copyProgress = smoothStep((toastProgress - 0.38) / 0.16);
  const soundProgress =
    smoothStep((toastProgress - 0.25) / 0.09) *
    (1 - smoothStep((toastProgress - 0.76) / 0.12));

  const leftX = lerp(-24, -4.6, entryProgress) - impactPeak * 0.85;
  const rightX = lerp(24, 4.6, entryProgress) + impactPeak * 0.85;
  const glassY = lerp(1.4, 0, entryProgress) - impactPeak * 0.55;
  const leftRotate = lerp(-14, -5.4, entryProgress) + impactPeak * 5;
  const rightRotate = lerp(14, 5.4, entryProgress) - impactPeak * 5;

  finalToastSection.style.setProperty("--final-toast-progress", toastProgress.toFixed(3));
  finalToastSection.style.setProperty("--final-toast-copy-opacity", copyProgress.toFixed(3));
  finalToastSection.style.setProperty("--final-toast-copy-y", `${((1 - copyProgress) * 0.75).toFixed(2)}rem`);
  finalToastSection.style.setProperty("--final-toast-halo-opacity", (0.2 + toastProgress * 0.26).toFixed(3));
  finalToastSection.style.setProperty("--final-toast-halo-scale", (0.86 + toastProgress * 0.2).toFixed(3));
  finalToastSection.style.setProperty("--toast-left-x", `${leftX.toFixed(2)}vw`);
  finalToastSection.style.setProperty("--toast-left-y", `${glassY.toFixed(2)}vh`);
  finalToastSection.style.setProperty("--toast-left-rotate", `${leftRotate.toFixed(2)}deg`);
  finalToastSection.style.setProperty("--toast-right-x", `${rightX.toFixed(2)}vw`);
  finalToastSection.style.setProperty("--toast-right-y", `${glassY.toFixed(2)}vh`);
  finalToastSection.style.setProperty("--toast-right-rotate", `${rightRotate.toFixed(2)}deg`);
  finalToastSection.style.setProperty("--toast-clink-opacity", clinkVisible.toFixed(3));
  finalToastSection.style.setProperty("--toast-clink-scale", (0.8 + impactPeak * 0.38).toFixed(3));
  finalToastSection.style.setProperty("--toast-sound-opacity", soundProgress.toFixed(3));
  finalToastSection.style.setProperty("--toast-sound-y", `${((1 - soundProgress) * 0.8).toFixed(2)}rem`);
}

function updateCreditsState() {
  if (!projectCredits) return;

  const { isActive, wipeProgress, holeRadius, contentProgress } = getCreditsWipeState();

  root.classList.toggle("is-credits-wipe-active", isActive);
  root.style.setProperty("--credits-wipe-progress", wipeProgress.toFixed(3));
  root.style.setProperty("--credits-wipe-opacity", isActive ? "1" : "0");
  root.style.setProperty("--credits-hole-radius", `${holeRadius.toFixed(2)}px`);
  updateCreditsIrisPath(holeRadius);
  projectCredits.style.setProperty("--credits-content-opacity", contentProgress.toFixed(3));
  projectCredits.style.setProperty(
    "--credits-content-y",
    `${((1 - contentProgress) * 1.35).toFixed(2)}rem`,
  );

}

function updateScaleIndexState() {
  if (!scaleIndexLinks.length) return;

  const markerY = window.innerHeight * 0.46;
  const scaleMarkers = [
    { scale: "intro", element: opener },
    { scale: "intro", element: culturalSequence },
    { scale: "intro", element: wineBuilder },
    { scale: "mundial", element: worldBridgeSection },
    { scale: "mundial", element: argentinaSection },
    { scale: "nacional", element: consumptionCalendarSection },
    { scale: "nacional", element: productionBridgeSection },
    { scale: "nacional", element: productionDocumentarySection },
    { scale: "nacional", element: calendarSection },
    { scale: "varietal", element: grapeBridgeSection },
    { scale: "varietal", element: flourishStorySection },
    { scale: "varietal", element: varietalSection },
    { scale: "molecular", element: compositionSection },
    { scale: "molecular", element: chemistryVarietySection },
    { scale: "molecular", element: fermentationSection },
    { scale: "cata", element: malbecProfileSection },
    { scale: "cata", element: tastingSection },
    { scale: "cata", element: finalToastSection },
    { scale: "cata", element: projectCredits },
  ].filter(({ element }) => element);

  let activeScale = "";

  if (argentinaSection) {
    const rect = argentinaSection.getBoundingClientRect();

    if (rect.top <= markerY && rect.bottom >= markerY) {
      const travel = Math.max(argentinaSection.offsetHeight - window.innerHeight, 1);
      const sectionProgress = clamp(-rect.top / travel, 0, 1);
      activeScale = sectionProgress < 0.58 ? "mundial" : "nacional";
    }
  }

  if (!activeScale) {
    let activeMarker = null;

    scaleMarkers.forEach((marker) => {
      const rect = marker.element.getBoundingClientRect();

      if (rect.top <= markerY) {
        activeMarker = marker;
      }
    });

    activeScale = activeMarker?.scale || "";
  }

  root.dataset.currentScale = activeScale;

  scaleIndexLinks.forEach((link) => {
    const isActive = link.dataset.scaleLink === activeScale;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function updateScrollState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

  if (progress) {
    progress.style.width = `${scrollPercent}%`;
  }

  updateScaleIndexState();
  updatePosterCorkPosition();
  updateIntroState();
  updateCulturalSequenceState();
  updateArgentinaState();
  updateConsumptionCalendarStains();
  updateTasteDetailState();
  updateNarrativeBridgeState();
  updateCalendarState();
  updateFlourishStoryState();
  updateVarietalState();
  updateCreditsState();
  updateTastingScrollState();
  updateCompositionState();
  updateChemistryVarietyState();
  updateFermentationState();
  updateInsideWineState();
  updateMalbecProfileState();
  updateFinalToastState();
}

function queueLayoutRefresh() {
  window.requestAnimationFrame(() => {
    updateScrollState();
    window.requestAnimationFrame(updateScrollState);
  });
  window.setTimeout(updateScrollState, 120);
  window.setTimeout(updateScrollState, 420);
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

renderCompositionPie();
renderTastingStep();
updateScrollState();
queueLayoutRefresh();
updateTasteRecommendation();
window.setTimeout(updateFlourishStoryState, 1200);
window.setTimeout(updateFlourishStoryState, 2800);
document.fonts?.ready.then(() => {
  updatePosterCorkPosition();
  queueLayoutRefresh();
}).catch(() => {});
window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", queueLayoutRefresh);
window.addEventListener("load", queueLayoutRefresh);
window.addEventListener("pointerdown", primeSceneSounds, { passive: true });
window.addEventListener("touchstart", primeSceneSounds, { passive: true });
window.addEventListener("keydown", primeSceneSounds);
