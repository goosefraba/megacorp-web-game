const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d", { alpha: false });

const ui = {
  menuOverlay: document.getElementById("menu-overlay"),
  startBtn: document.getElementById("start-btn"),
  funds: document.getElementById("funds-value"),
  cashflow: document.getElementById("cashflow-value"),
  researchRate: document.getElementById("research-rate"),
  dataUnits: document.getElementById("data-units"),
  talent: document.getElementById("talent-value"),
  patents: document.getElementById("patent-value"),
  influence: document.getElementById("influence-value"),
  reputation: document.getElementById("reputation-value"),
  emissions: document.getElementById("emissions-value"),
  modelTier: document.getElementById("model-tier"),
  valuation: document.getElementById("valuation"),
  riskLevel: document.getElementById("risk-level"),
  date: document.getElementById("date-label"),
  locationSummary: document.getElementById("location-summary"),
  acquireBtn: document.getElementById("acquire-btn"),
  upgradeDcBtn: document.getElementById("upgrade-dc-btn"),
  buyServerBtn: document.getElementById("buy-server-btn"),
  buildLabBtn: document.getElementById("build-lab-btn"),
  gatherDataBtn: document.getElementById("gather-data-btn"),
  recruitBtn: document.getElementById("recruit-btn"),
  patentBtn: document.getElementById("patent-btn"),
  contractBtn: document.getElementById("contract-btn"),
  hardenBtn: document.getElementById("harden-btn"),
  lobbyBtn: document.getElementById("lobby-btn"),
  acceptOfferBtn: document.getElementById("accept-offer-btn"),
  challengeStatus: document.getElementById("challenge-status"),
  challengeOffer: document.getElementById("challenge-offer"),
  challengeContracts: document.getElementById("challenge-contracts"),
  agiProgressText: document.getElementById("agi-progress-text"),
  agiAchieved: document.getElementById("agi-achieved"),
  agiProgressBar: document.getElementById("agi-progress-bar"),
  locationBreakdown: document.getElementById("location-breakdown"),
  actionIntel: document.getElementById("action-intel"),
  zoomOutBtn: document.getElementById("zoom-out-btn"),
  zoomResetBtn: document.getElementById("zoom-reset-btn"),
  zoomInBtn: document.getElementById("zoom-in-btn"),
  zoomLabel: document.getElementById("zoom-label"),
  speedButtons: [...document.querySelectorAll(".speed-controls button")],
  focusButtonsWrap: document.getElementById("focus-buttons"),
  marketBars: document.getElementById("market-bars"),
  modelsList: document.getElementById("models-list"),
  researchTree: document.getElementById("research-tree"),
  strategyTree: document.getElementById("strategy-tree"),
  researchProgressWrap: document.getElementById("research-progress-wrap"),
  researchingName: document.getElementById("researching-name"),
  researchingTime: document.getElementById("researching-time"),
  researchProgressBar: document.getElementById("research-progress-bar"),
  eventFeed: document.getElementById("event-feed"),
};

const MAP_LOCATIONS = [
  {
    id: "virginia",
    name: "Ashburn",
    country: "USA",
    lon: -77.5,
    lat: 39,
    energy: 1.02,
    legal: 0.94,
    tax: 0.89,
    talent: 1.12,
    market: 1.2,
    climate: 0.93,
    acquireCost: 0,
  },
  {
    id: "oregon",
    name: "Portland",
    country: "USA",
    lon: -122.6,
    lat: 45.6,
    energy: 0.86,
    legal: 0.97,
    tax: 0.93,
    talent: 1.05,
    market: 1.06,
    climate: 0.88,
    acquireCost: 1_250_000,
  },
  {
    id: "quebec",
    name: "Montreal",
    country: "Canada",
    lon: -73.6,
    lat: 45.5,
    energy: 0.79,
    legal: 0.98,
    tax: 0.94,
    talent: 1.04,
    market: 1.07,
    climate: 0.9,
    acquireCost: 1_340_000,
  },
  {
    id: "sao-paulo",
    name: "Sao Paulo",
    country: "Brazil",
    lon: -46.6,
    lat: -23.5,
    energy: 1.13,
    legal: 1.07,
    tax: 0.88,
    talent: 1.02,
    market: 1.12,
    climate: 1.09,
    acquireCost: 1_040_000,
  },
  {
    id: "santiago",
    name: "Santiago",
    country: "Chile",
    lon: -70.7,
    lat: -33.4,
    energy: 0.97,
    legal: 1.01,
    tax: 0.86,
    talent: 0.98,
    market: 0.98,
    climate: 0.96,
    acquireCost: 980_000,
  },
  {
    id: "london",
    name: "London",
    country: "UK",
    lon: -0.12,
    lat: 51.5,
    energy: 1.22,
    legal: 1.08,
    tax: 1,
    talent: 1.17,
    market: 1.22,
    climate: 0.92,
    acquireCost: 1_800_000,
  },
  {
    id: "frankfurt",
    name: "Frankfurt",
    country: "Germany",
    lon: 8.68,
    lat: 50.1,
    energy: 1.12,
    legal: 1.11,
    tax: 1.02,
    talent: 1.16,
    market: 1.24,
    climate: 0.95,
    acquireCost: 1_760_000,
  },
  {
    id: "stockholm",
    name: "Stockholm",
    country: "Sweden",
    lon: 18.1,
    lat: 59.3,
    energy: 0.82,
    legal: 1.09,
    tax: 0.98,
    talent: 1.08,
    market: 1.08,
    climate: 0.86,
    acquireCost: 1_620_000,
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    lon: 55.3,
    lat: 25.2,
    energy: 0.9,
    legal: 1.21,
    tax: 0.84,
    talent: 1,
    market: 1.08,
    climate: 1.14,
    acquireCost: 1_540_000,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    lon: 72.8,
    lat: 19,
    energy: 0.94,
    legal: 1.13,
    tax: 0.91,
    talent: 1.14,
    market: 1.26,
    climate: 1.11,
    acquireCost: 1_690_000,
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    lon: 103.8,
    lat: 1.3,
    energy: 1.02,
    legal: 1.01,
    tax: 0.95,
    talent: 1.2,
    market: 1.29,
    climate: 1.03,
    acquireCost: 2_050_000,
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    lon: 126.98,
    lat: 37.56,
    energy: 1.11,
    legal: 1.06,
    tax: 0.99,
    talent: 1.18,
    market: 1.24,
    climate: 0.98,
    acquireCost: 2_160_000,
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    lon: 139.7,
    lat: 35.7,
    energy: 1.19,
    legal: 1.09,
    tax: 1.03,
    talent: 1.22,
    market: 1.27,
    climate: 1,
    acquireCost: 2_300_000,
  },
  {
    id: "johannesburg",
    name: "Johannesburg",
    country: "South Africa",
    lon: 28,
    lat: -26.2,
    energy: 1.16,
    legal: 1.12,
    tax: 0.89,
    talent: 0.95,
    market: 0.94,
    climate: 1.06,
    acquireCost: 900_000,
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    lon: 151.2,
    lat: -33.9,
    energy: 1.05,
    legal: 1.01,
    tax: 0.97,
    talent: 1.09,
    market: 1.05,
    climate: 0.94,
    acquireCost: 1_470_000,
  },
];

const MARKET_SECTORS = [
  { id: "cloud", label: "Cloud", valuePerDay: 1_700_000, volatility: 0.12 },
  { id: "coding", label: "Coding AI", valuePerDay: 1_250_000, volatility: 0.16 },
  { id: "genai", label: "Generative", valuePerDay: 1_420_000, volatility: 0.2 },
  { id: "robotics", label: "Robotics", valuePerDay: 990_000, volatility: 0.18 },
  { id: "biotech", label: "Bio AI", valuePerDay: 1_080_000, volatility: 0.17 },
];

const RESEARCH_NODES = [
  {
    id: "virtualization",
    name: "Container Virtualization",
    branch: "compute",
    prereqs: [],
    fundingCost: 280_000,
    rpCost: 170,
    desc: "Higher VM density and better scheduler packing.",
    effects: { serverEffMul: 1.08 },
  },
  {
    id: "data-fabric",
    name: "Unified Data Fabric",
    branch: "ai",
    prereqs: [],
    fundingCost: 320_000,
    rpCost: 190,
    desc: "Faster ingestion and training corpus lifecycle.",
    effects: { dataHarvestMul: 1.14 },
  },
  {
    id: "heat-recovery",
    name: "Heat Recovery Grid",
    branch: "energy",
    prereqs: [],
    fundingCost: 300_000,
    rpCost: 180,
    desc: "Reuses thermal output to reduce power spend.",
    effects: { energyEffMul: 0.93 },
  },
  {
    id: "compliance-os",
    name: "Compliance OS",
    branch: "policy",
    prereqs: [],
    fundingCost: 340_000,
    rpCost: 200,
    desc: "Automates audit responses and policy checks.",
    effects: { legalEffMul: 0.9 },
  },
  {
    id: "compiler-mesh",
    name: "Compiler Mesh",
    branch: "compute",
    prereqs: ["virtualization"],
    fundingCost: 540_000,
    rpCost: 260,
    desc: "Cross-region build and execution acceleration.",
    effects: { serverEffMul: 1.1, cloudLatencyAdd: 0.03 },
  },
  {
    id: "edge-routing",
    name: "Edge Routing Fabric",
    branch: "market",
    prereqs: ["virtualization"],
    fundingCost: 580_000,
    rpCost: 280,
    desc: "Improves global response times and premium reach.",
    effects: { marketReachAdd: 0.06 },
  },
  {
    id: "synthetic-labeling",
    name: "Synthetic Labeling",
    branch: "ai",
    prereqs: ["data-fabric"],
    fundingCost: 620_000,
    rpCost: 300,
    desc: "Expands useful datasets through auto-labeling.",
    effects: { aiEffAdd: 0.08, dataHarvestMul: 1.12 },
  },
  {
    id: "alignment-lab",
    name: "Alignment Lab",
    branch: "ai",
    prereqs: ["data-fabric"],
    fundingCost: 640_000,
    rpCost: 320,
    desc: "Quality, safety, and brand-trust gains.",
    effects: { reputationBoostAdd: 0.06 },
  },
  {
    id: "coolants-v2",
    name: "Cryo Coolant V2",
    branch: "energy",
    prereqs: ["heat-recovery"],
    fundingCost: 680_000,
    rpCost: 330,
    desc: "Lowers thermal risk in dense clusters.",
    effects: { energyEffMul: 0.9, riskControlAdd: 0.05 },
  },
  {
    id: "grid-forecast",
    name: "Grid Forecast Twin",
    branch: "energy",
    prereqs: ["heat-recovery"],
    fundingCost: 720_000,
    rpCost: 340,
    desc: "Predictive pricing and procurement planning.",
    effects: { energyEffMul: 0.88 },
  },
  {
    id: "treaty-engine",
    name: "Treaty Negotiation Engine",
    branch: "policy",
    prereqs: ["compliance-os"],
    fundingCost: 760_000,
    rpCost: 360,
    desc: "Reduces legal drag across regions.",
    effects: { legalEffMul: 0.86, complianceShieldAdd: 0.08 },
  },
  {
    id: "sovereign-pipelines",
    name: "Sovereign Data Pipelines",
    branch: "policy",
    prereqs: ["compliance-os"],
    fundingCost: 840_000,
    rpCost: 390,
    desc: "Unlocks regulated market contracts.",
    effects: { marketReachAdd: 0.05, riskControlAdd: 0.04 },
  },
  {
    id: "distillation-plant",
    name: "Model Distillation Plant",
    branch: "ai",
    prereqs: ["synthetic-labeling", "compiler-mesh"],
    fundingCost: 1_200_000,
    rpCost: 470,
    desc: "High quality inference with lower serving cost.",
    effects: { aiEffAdd: 0.16, serverEffMul: 1.05 },
  },
  {
    id: "multimodal-fusion",
    name: "Multimodal Fusion Core",
    branch: "ai",
    prereqs: ["distillation-plant", "alignment-lab"],
    fundingCost: 1_850_000,
    rpCost: 620,
    desc: "Unified text, image, audio and code intelligence.",
    effects: { aiEffAdd: 0.24, reputationBoostAdd: 0.08 },
  },
  {
    id: "autonomous-agents",
    name: "Autonomous Agent Grid",
    branch: "compute",
    prereqs: ["multimodal-fusion", "treaty-engine"],
    fundingCost: 2_500_000,
    rpCost: 760,
    desc: "Agentic workflows increase operational leverage.",
    effects: { agentBoostAdd: 0.22, researchMul: 1.12 },
  },
  {
    id: "carbon-fabs",
    name: "Carbon-Negative Fabrication",
    branch: "energy",
    prereqs: ["grid-forecast", "coolants-v2"],
    fundingCost: 2_150_000,
    rpCost: 700,
    desc: "Large emissions cut and resilience gain.",
    effects: { energyEffMul: 0.8, riskControlAdd: 0.08 },
  },
  {
    id: "synthetic-researchers",
    name: "Synthetic Researchers",
    branch: "compute",
    prereqs: ["autonomous-agents"],
    fundingCost: 3_400_000,
    rpCost: 940,
    desc: "Accelerates high-end discovery throughput.",
    effects: { researchMul: 1.2, talentMul: 1.12 },
  },
  {
    id: "frontier-labs",
    name: "Frontier Labs Network",
    branch: "market",
    prereqs: ["synthetic-researchers", "carbon-fabs", "sovereign-pipelines"],
    fundingCost: 4_800_000,
    rpCost: 1200,
    desc: "Late-game dominance in model quality and reach.",
    effects: { aiEffAdd: 0.34, marketReachAdd: 0.11, patentMul: 1.2, reputationBoostAdd: 0.12 },
  },
];

const STRATEGY_NODES = [
  {
    id: "renewable-ppa",
    name: "Renewable PPA Desk",
    branch: "energy",
    prereqs: [],
    researchReq: null,
    moneyCost: 600_000,
    influenceCost: 6,
    patentCost: 0,
    desc: "Long-term energy contracts reduce volatility.",
    effects: { energyEffMul: 0.9 },
  },
  {
    id: "talent-academy",
    name: "Talent Academy",
    branch: "compute",
    prereqs: [],
    researchReq: null,
    moneyCost: 520_000,
    influenceCost: 4,
    patentCost: 0,
    desc: "Internal upskilling for applied AI teams.",
    effects: { talentMul: 1.15, researchMul: 1.05 },
  },
  {
    id: "policy-network",
    name: "Policy Network",
    branch: "policy",
    prereqs: ["renewable-ppa"],
    researchReq: null,
    moneyCost: 760_000,
    influenceCost: 10,
    patentCost: 0,
    desc: "Multi-region legal and policy partnerships.",
    effects: { legalEffMul: 0.9, complianceShieldAdd: 0.1 },
  },
  {
    id: "chip-foundry",
    name: "AI Chip Foundry JV",
    branch: "compute",
    prereqs: ["talent-academy"],
    researchReq: "compiler-mesh",
    moneyCost: 1_450_000,
    influenceCost: 12,
    patentCost: 3,
    desc: "Preferential chip access for expansion phases.",
    effects: { chipAdvAdd: 0.15, serverEffMul: 1.07, patentMul: 1.12 },
  },
  {
    id: "sovereign-cloud",
    name: "Sovereign Cloud Alliance",
    branch: "market",
    prereqs: ["policy-network"],
    researchReq: "sovereign-pipelines",
    moneyCost: 1_650_000,
    influenceCost: 14,
    patentCost: 2,
    desc: "Access to regulated national contracts.",
    effects: { marketReachAdd: 0.08, salesBoostAdd: 0.06 },
  },
  {
    id: "global-sales",
    name: "Global Enterprise Sales Grid",
    branch: "market",
    prereqs: ["sovereign-cloud"],
    researchReq: null,
    moneyCost: 1_900_000,
    influenceCost: 16,
    patentCost: 2,
    desc: "Bigger deal flow across verticals.",
    effects: { salesBoostAdd: 0.1, reputationBoostAdd: 0.08 },
  },
  {
    id: "undersea-cables",
    name: "Undersea Cable Consortium",
    branch: "compute",
    prereqs: ["chip-foundry"],
    researchReq: "edge-routing",
    moneyCost: 2_250_000,
    influenceCost: 18,
    patentCost: 4,
    desc: "Lower latency for globally distributed workloads.",
    effects: { cloudLatencyAdd: 0.12, marketReachAdd: 0.07 },
  },
  {
    id: "safety-council",
    name: "Frontier Safety Council",
    branch: "policy",
    prereqs: ["global-sales", "policy-network"],
    researchReq: "multimodal-fusion",
    moneyCost: 2_600_000,
    influenceCost: 20,
    patentCost: 4,
    desc: "Higher trust score and risk mitigation.",
    effects: { riskControlAdd: 0.14, reputationBoostAdd: 0.11 },
  },
  {
    id: "orbital-relay",
    name: "Orbital Relay Program",
    branch: "compute",
    prereqs: ["undersea-cables"],
    researchReq: "autonomous-agents",
    moneyCost: 3_200_000,
    influenceCost: 24,
    patentCost: 6,
    desc: "Global resilience layer for mission-critical inference.",
    effects: { marketReachAdd: 0.1, serverEffMul: 1.08 },
  },
  {
    id: "planetary-exchange",
    name: "Planetary Compute Exchange",
    branch: "market",
    prereqs: ["orbital-relay", "safety-council"],
    researchReq: "frontier-labs",
    moneyCost: 4_900_000,
    influenceCost: 30,
    patentCost: 8,
    desc: "Late-game strategic moat and market dominance.",
    effects: { salesBoostAdd: 0.16, marketReachAdd: 0.13, agentBoostAdd: 0.12 },
  },
];

const AI_MODELS = [
  {
    id: "baseline",
    name: "Heuristic Assistants",
    tier: 1,
    dataCost: 0,
    moneyCost: 0,
    talentReq: 0,
    patentReq: 0,
    researchReq: null,
    strategyReq: null,
    desc: "Rules-based copilots for early productization.",
    bonus: { cloud: 0.03, coding: 0.05, genai: 0.02, robotics: 0.02, biotech: 0.01 },
  },
  {
    id: "seed-lm",
    name: "Seed LM",
    tier: 2,
    dataCost: 70,
    moneyCost: 450_000,
    talentReq: 30,
    patentReq: 0,
    researchReq: "virtualization",
    strategyReq: null,
    desc: "First trainable foundation model stack.",
    bonus: { cloud: 0.05, coding: 0.1, genai: 0.08, robotics: 0.04, biotech: 0.03 },
  },
  {
    id: "alpha-core",
    name: "Alpha Core",
    tier: 3,
    dataCost: 130,
    moneyCost: 920_000,
    talentReq: 45,
    patentReq: 1,
    researchReq: "synthetic-labeling",
    strategyReq: null,
    desc: "Reliable enterprise coding and automation model.",
    bonus: { cloud: 0.07, coding: 0.17, genai: 0.12, robotics: 0.08, biotech: 0.06 },
  },
  {
    id: "sigma-weave",
    name: "Sigma Weave",
    tier: 4,
    dataCost: 230,
    moneyCost: 1_850_000,
    talentReq: 65,
    patentReq: 2,
    researchReq: "distillation-plant",
    strategyReq: "chip-foundry",
    desc: "Distilled multi-routing model family.",
    bonus: { cloud: 0.1, coding: 0.23, genai: 0.19, robotics: 0.14, biotech: 0.1 },
  },
  {
    id: "omni-x",
    name: "Omni X",
    tier: 5,
    dataCost: 360,
    moneyCost: 3_150_000,
    talentReq: 85,
    patentReq: 3,
    researchReq: "multimodal-fusion",
    strategyReq: "sovereign-cloud",
    desc: "Cross-modal frontier model for enterprise suites.",
    bonus: { cloud: 0.14, coding: 0.28, genai: 0.31, robotics: 0.19, biotech: 0.15 },
  },
  {
    id: "mesh-ops",
    name: "Mesh Ops",
    tier: 6,
    dataCost: 470,
    moneyCost: 4_600_000,
    talentReq: 110,
    patentReq: 4,
    researchReq: "autonomous-agents",
    strategyReq: "undersea-cables",
    desc: "Agentic orchestration across global workloads.",
    bonus: { cloud: 0.18, coding: 0.34, genai: 0.36, robotics: 0.26, biotech: 0.2 },
  },
  {
    id: "oracle-prime",
    name: "Oracle Prime",
    tier: 7,
    dataCost: 640,
    moneyCost: 6_900_000,
    talentReq: 145,
    patentReq: 6,
    researchReq: "frontier-labs",
    strategyReq: "safety-council",
    desc: "High-trust frontier intelligence platform.",
    bonus: { cloud: 0.22, coding: 0.38, genai: 0.41, robotics: 0.32, biotech: 0.3 },
  },
  {
    id: "planetary-cortex",
    name: "Planetary Cortex",
    tier: 8,
    dataCost: 860,
    moneyCost: 9_400_000,
    talentReq: 180,
    patentReq: 8,
    researchReq: "frontier-labs",
    strategyReq: "planetary-exchange",
    desc: "The final planetary-scale model stack.",
    bonus: { cloud: 0.27, coding: 0.44, genai: 0.48, robotics: 0.4, biotech: 0.37 },
  },
];

const MAP_DATA_URL = "./assets/world-countries.geo.json";

const worldMap = {
  ready: false,
  features: [],
  layerCanvas: null,
  layerWidth: 0,
  layerHeight: 0,
  loadingError: null,
};

const MAP_ASPECT_RATIO = 2;
const MAP_ZOOM_MIN = 1;
const MAP_ZOOM_MAX = 2.6;

const FEED_LIMIT = 18;
const SECONDS_PER_DAY = 4;
const CHALLENGE_SLOT_LIMIT = 3;

const SLA_CONTRACT_TITLES = {
  cloud: "Global Cloud Uptime Mandate",
  coding: "Autonomous Coding SLA",
  genai: "Realtime GenAI Enterprise SLA",
  robotics: "Factory Robotics Command SLA",
  biotech: "Clinical Research Inference SLA",
};

const state = {
  mode: "menu",
  speed: 1,
  day: 1,
  year: 2032,
  totalDays: 0,
  money: 4_800_000,
  cashflowPerDay: 0,
  valuation: 26_000_000,
  dataUnits: 220,
  talent: 42,
  patents: 1,
  influence: 8,
  reputation: 38,
  emissionsKilotons: 116,
  riskScore: 0.21,
  focus: "cloud",
  selectedLocationId: "virginia",
  locations: MAP_LOCATIONS.map((loc) => ({
    ...loc,
    owned: loc.id === "virginia",
    dcLevel: loc.id === "virginia" ? 1 : 0,
    servers: loc.id === "virginia" ? 24 : 0,
    labs: loc.id === "virginia" ? 1 : 0,
    contracts: loc.id === "virginia" ? 2 : 0,
    resilience: 0,
  })),
  sectors: MARKET_SECTORS.map((sector) => ({
    id: sector.id,
    demand: 1,
    playerShare: sector.id === "cloud" ? 0.26 : 0.12,
  })),
  modifiers: {
    serverEff: 1,
    energyEff: 1,
    legalEff: 1,
    aiEff: 0,
    marketReach: 0,
    agentBoost: 0,
    dataHarvest: 1,
    researchMul: 1,
    talentMul: 1,
    patentMul: 1,
    reputationBoost: 0,
    riskControl: 0,
    chipAdv: 0,
    cloudLatency: 0,
    complianceShield: 0,
    salesBoost: 0,
  },
  researchDone: new Set(),
  strategyDone: new Set(),
  researching: null,
  modelsOwned: new Set(["baseline"]),
  activeModelId: "baseline",
  competitors: createCompetitors(),
  effects: [],
  feed: [],
  renderClock: 0,
  networkPhase: 0,
  mapView: {
    zoom: 1,
    panX: 0,
    panY: 0,
  },
  mapDrag: {
    active: false,
    moved: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  },
  uiRefreshAccumulator: 0,
  eventAccumulator: 0,
  challengeOfferAccumulator: 0,
  challengeOffer: null,
  slaContracts: [],
  challengeRevenuePerDay: 0,
  challengePenaltyPerDay: 0,
  challengeStats: {
    won: 0,
    failed: 0,
  },
  agi: {
    progress: 0,
    achieved: false,
    achievedYear: null,
    achievedDay: null,
  },
  clouds: createClouds(22),
};

function createCompetitors() {
  const first = ["Atlas", "Quanta", "Helix", "Axiom", "Vector", "Zenith", "Titan", "Nimbus"];
  const second = ["Cloud", "Forge", "Systems", "Labs", "Compute", "Dynamics", "Circuit", "Matrix"];
  const result = [];
  for (let i = 0; i < 5; i += 1) {
    const name = `${pick(first)} ${pick(second)}`;
    const specialty = pick(MARKET_SECTORS.map((sector) => sector.id));
    const power = {};
    for (const sector of MARKET_SECTORS) {
      power[sector.id] = 60 + Math.random() * 70 + (sector.id === specialty ? 45 : 0);
    }
    result.push({
      id: `corp-${i}`,
      name,
      specialty,
      capital: 12_000_000 + Math.random() * 9_000_000,
      momentum: 0.9 + Math.random() * 0.4,
      modelTier: 1 + Math.floor(Math.random() * 2),
      power,
    });
  }
  return result;
}

function createClouds(count) {
  const clouds = [];
  for (let i = 0; i < count; i += 1) {
    clouds.push({
      lon: -180 + Math.random() * 360,
      lat: -55 + Math.random() * 125,
      rx: 8 + Math.random() * 18,
      ry: 4 + Math.random() * 11,
      drift: 0.8 + Math.random() * 2,
      opacity: 0.05 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
    });
  }
  return clouds;
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatMoney(num) {
  const abs = Math.abs(num);
  if (abs >= 1_000_000_000) return `${num < 0 ? "-" : ""}$${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${num < 0 ? "-" : ""}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${num < 0 ? "-" : ""}$${(abs / 1_000).toFixed(1)}K`;
  return `${num < 0 ? "-" : ""}$${abs.toFixed(0)}`;
}

function ownedLocations() {
  return state.locations.filter((loc) => loc.owned);
}

function selectedLocation() {
  return state.locations.find((loc) => loc.id === state.selectedLocationId) ?? state.locations[0];
}

function totalLabs() {
  return ownedLocations().reduce((sum, loc) => sum + loc.labs, 0);
}

function totalServers() {
  return ownedLocations().reduce((sum, loc) => sum + loc.servers, 0);
}

function totalDcLevels() {
  return ownedLocations().reduce((sum, loc) => sum + loc.dcLevel, 0);
}

function averageLocationStat(key, fallback = 1) {
  const owned = ownedLocations();
  if (!owned.length) return fallback;
  return owned.reduce((sum, loc) => sum + loc[key], 0) / owned.length;
}

function maxModelTier() {
  return AI_MODELS[AI_MODELS.length - 1]?.tier ?? 1;
}

function getSectorLabel(sectorId) {
  return MARKET_SECTORS.find((sector) => sector.id === sectorId)?.label ?? sectorId;
}

function costHardenSite(location) {
  return Math.round(260_000 * Math.pow(1.58, location.resilience || 0));
}

function mandateDemandForLocationFrom(simState, locationId) {
  return (simState.slaContracts || [])
    .filter((contract) => contract.locationId === locationId)
    .reduce((sum, contract) => sum + contract.demandUnits, 0);
}

function computeLocationReliabilityFrom(simState, location) {
  if (!location?.owned) return 0;

  const energyEvent = locationEventMultiplierFrom(simState, "energy", location.id);
  const legalEvent = locationEventMultiplierFrom(simState, "legal", location.id);
  const mandateDemand = mandateDemandForLocationFrom(simState, location.id);

  const capacity =
    location.servers * 2.05 +
    location.dcLevel * 18 +
    location.labs * 6 +
    (location.resilience || 0) * 28 +
    simState.modifiers.serverEff * 7 +
    simState.modifiers.riskControl * 32;

  const baselineLoad = (location.contracts || 0) * 11 + location.dcLevel * 4 + location.labs * 4;
  const regionalStress = location.energy * 8 + location.legal * 7 + location.climate * 7;
  const eventStress = Math.max(0, energyEvent - 1) * 26 + Math.max(0, legalEvent - 1) * 22;
  const globalStress = simState.riskScore * 28;
  const balance = capacity - (baselineLoad + mandateDemand + regionalStress + eventStress + globalStress);

  return clamp(0.73 + balance / 210, 0.45, 0.995);
}

function computeLocationReliability(location) {
  return computeLocationReliabilityFrom(state, location);
}

function averageReliabilityFrom(simState) {
  const owned = ownedLocationsFrom(simState);
  if (!owned.length) return 0.75;
  return owned.reduce((sum, loc) => sum + computeLocationReliabilityFrom(simState, loc), 0) / owned.length;
}

function computeChallengeEconomicsFrom(simState) {
  let revenue = 0;
  let penalty = 0;
  for (const contract of simState.slaContracts || []) {
    const location = simState.locations.find((loc) => loc.id === contract.locationId);
    const reliability = location ? computeLocationReliabilityFrom(simState, location) : 0;
    if (reliability >= contract.requiredReliability) revenue += contract.rewardPerDay;
    else penalty += contract.penaltyPerDay;
  }
  return {
    revenue,
    penalty,
    net: revenue - penalty,
  };
}

function createSlaOffer() {
  const owned = ownedLocations();
  if (!owned.length) return null;

  const sector = pick(MARKET_SECTORS);
  const anchor = owned
    .slice()
    .sort((a, b) => computeLocationReliability(b) - computeLocationReliability(a))[0];
  const growthStage = clamp(1 + (state.year - 2032) * 0.08 + owned.length * 0.11, 1, 2.9);
  const anchorReliability = computeLocationReliability(anchor);
  const demandUnits = clamp(Math.round((4 + Math.random() * 5) * growthStage), 5, 18);
  const requiredMax = clamp(anchorReliability - 0.006, 0.78, 0.972);
  const requiredMin = clamp(requiredMax - (0.04 + Math.random() * 0.02), 0.72, requiredMax);
  const requiredReliability = clamp(
    requiredMin + Math.random() * Math.max(0.005, requiredMax - requiredMin),
    0.72,
    requiredMax,
  );
  const durationDays = Math.round(42 + Math.random() * 50);
  const rewardPerDay = Math.round(
    (demandUnits * 13_000 + anchor.market * 76_000) * (0.92 + requiredReliability * 0.62),
  );
  const penaltyPerDay = Math.round(rewardPerDay * (1.16 + (requiredReliability - 0.86) * 2.3));

  return {
    id: `offer-${Math.floor(state.totalDays)}-${Math.floor(Math.random() * 100_000)}`,
    title: SLA_CONTRACT_TITLES[sector.id] ?? "Enterprise Reliability Mandate",
    sectorId: sector.id,
    requiredReliability,
    durationDays,
    rewardPerDay,
    penaltyPerDay,
    demandUnits,
    expiresDays: 26,
    recommendedLocationId: anchor.id,
  };
}

function acceptChallengeOffer() {
  const offer = state.challengeOffer;
  const loc = selectedLocation();
  if (!offer || !loc.owned || state.slaContracts.length >= CHALLENGE_SLOT_LIMIT) return;

  state.slaContracts.push({
    id: `sla-${Math.floor(state.totalDays)}-${Math.floor(Math.random() * 100_000)}`,
    title: offer.title,
    sectorId: offer.sectorId,
    locationId: loc.id,
    requiredReliability: offer.requiredReliability,
    durationDays: offer.durationDays,
    remainingDays: offer.durationDays,
    rewardPerDay: offer.rewardPerDay,
    penaltyPerDay: offer.penaltyPerDay,
    demandUnits: offer.demandUnits,
    breachStreak: 0,
    breachedDays: 0,
    uptimeDays: 0,
    maxBreachDays: 12,
    lastReliability: computeLocationReliability(loc),
  });

  state.challengeOffer = null;
  addFeed(
    `Accepted SLA mandate in ${loc.name}: target ${(offer.requiredReliability * 100).toFixed(1)}% uptime for ${offer.durationDays} days.`,
  );
  refreshUI();
}

function updateChallenges(days) {
  state.challengeRevenuePerDay = 0;
  state.challengePenaltyPerDay = 0;

  if (state.slaContracts.length < CHALLENGE_SLOT_LIMIT) {
    state.challengeOfferAccumulator += days;
    if (!state.challengeOffer && state.challengeOfferAccumulator >= 36) {
      state.challengeOfferAccumulator = 0;
      state.challengeOffer = createSlaOffer();
      if (state.challengeOffer) {
        addFeed(
          `New SLA bid: ${state.challengeOffer.title} (${state.challengeOffer.durationDays}d, ${(state.challengeOffer.requiredReliability * 100).toFixed(1)}% uptime).`,
        );
      }
    }
  }

  if (state.challengeOffer) {
    state.challengeOffer.expiresDays -= days;
    if (state.challengeOffer.expiresDays <= 0) {
      addFeed(`SLA bid expired: ${state.challengeOffer.title}.`);
      state.challengeOffer = null;
    }
  }

  for (let i = state.slaContracts.length - 1; i >= 0; i -= 1) {
    const contract = state.slaContracts[i];
    const location = state.locations.find((loc) => loc.id === contract.locationId);
    const reliability = location ? computeLocationReliability(location) : 0;
    contract.lastReliability = reliability;
    contract.remainingDays -= days;

    const meetsSla = reliability >= contract.requiredReliability;
    if (meetsSla) {
      state.challengeRevenuePerDay += contract.rewardPerDay;
      contract.uptimeDays += days;
      contract.breachStreak = Math.max(0, contract.breachStreak - days * 0.45);
    } else {
      state.challengePenaltyPerDay += contract.penaltyPerDay;
      contract.breachStreak += days;
      contract.breachedDays += days;
    }

    if (contract.breachStreak >= contract.maxBreachDays) {
      const failureFine = contract.penaltyPerDay * 2.4;
      state.money -= failureFine;
      state.reputation = clamp(state.reputation - 2.8, 5, 100);
      state.challengeStats.failed += 1;
      addFeed(`SLA breach in ${location?.name ?? "Unknown region"}: ${contract.title} canceled (${formatMoney(failureFine)} fine).`);
      state.slaContracts.splice(i, 1);
      continue;
    }

    if (contract.remainingDays <= 0) {
      const uptimeRatio = contract.uptimeDays / Math.max(1, contract.durationDays);
      if (uptimeRatio >= 0.92) {
        const completionBonus = contract.rewardPerDay * 3.5;
        state.money += completionBonus;
        state.influence += 1.5 + contract.requiredReliability * 2;
        state.reputation = clamp(state.reputation + 1.4, 5, 100);
        state.challengeStats.won += 1;
        addFeed(`SLA fulfilled at ${location?.name ?? "site"}: ${contract.title} (+${formatMoney(completionBonus)} bonus).`);
      } else {
        const clawback = contract.penaltyPerDay * 1.4;
        state.money -= clawback;
        state.reputation = clamp(state.reputation - 1.6, 5, 100);
        state.challengeStats.failed += 1;
        addFeed(`SLA under-delivery at ${location?.name ?? "site"}: ${contract.title} (${formatMoney(clawback)} clawback).`);
      }
      state.slaContracts.splice(i, 1);
    }
  }
}

function computeAgiProgressFrom(simState) {
  const modelLinear = clamp((currentModelFrom(simState).tier - 1) / Math.max(1, maxModelTier() - 1), 0, 1);
  const researchLinear = clamp(simState.researchDone.size / Math.max(1, RESEARCH_NODES.length), 0, 1);
  const strategyLinear = clamp(simState.strategyDone.size / Math.max(1, STRATEGY_NODES.length), 0, 1);
  const computeLinear = clamp(
    (totalServersFrom(simState) * 0.62 + totalLabsFrom(simState) * 11 + totalDcFrom(simState) * 8) / 880,
    0,
    1,
  );
  const talentLinear = clamp((simState.talent / 320 + simState.patents / 34 + simState.dataUnits / 2100) / 3, 0, 1);
  const reliabilityLinear = clamp((averageReliabilityFrom(simState) - 0.8) / 0.18, 0, 1);
  const contractLinear = clamp((simState.challengeStats?.won || 0) / 8, 0, 1);
  const frontierLinear =
    (simState.researchDone.has("frontier-labs") ? 0.5 : 0) +
    (simState.strategyDone.has("planetary-exchange") ? 0.5 : 0);

  // Nonlinear curves make early progress much slower and reserve meaningful gains for late-game depth.
  const modelProgress = Math.pow(modelLinear, 1.9);
  const researchProgress = Math.pow(researchLinear, 1.6);
  const strategyProgress = Math.pow(strategyLinear, 1.7);
  const computeProgress = Math.pow(computeLinear, 1.5);
  const talentProgress = Math.pow(talentLinear, 1.55);
  const reliabilityProgress = Math.pow(reliabilityLinear, 1.4);
  const contractMasteryProgress = Math.pow(contractLinear, 1.35);

  const coreScore =
    modelProgress * 26 +
    researchProgress * 22 +
    strategyProgress * 14 +
    computeProgress * 14 +
    talentProgress * 10 +
    reliabilityProgress * 8 +
    contractMasteryProgress * 4 +
    frontierLinear * 2;

  const milestoneGate = simState.researchDone.has("frontier-labs")
    ? 1
    : simState.researchDone.has("autonomous-agents")
      ? 0.76
      : simState.researchDone.has("multimodal-fusion")
        ? 0.58
        : simState.researchDone.has("distillation-plant")
          ? 0.44
          : simState.researchDone.has("synthetic-labeling")
            ? 0.32
            : simState.researchDone.has("virtualization")
              ? 0.24
              : 0.16;
  const modelGate = clamp(0.2 + modelLinear * 0.8, 0.2, 1);
  const readinessGate = clamp(0.12 + milestoneGate * 0.56 + modelGate * 0.32, 0.12, 1);

  return clamp(coreScore * readinessGate, 0, 100);
}

function agiRequirementsMet(simState) {
  return (
    currentModelFrom(simState).tier >= maxModelTier() &&
    simState.researchDone.has("frontier-labs") &&
    simState.strategyDone.has("planetary-exchange") &&
    averageReliabilityFrom(simState) >= 0.9 &&
    simState.talent >= 170 &&
    simState.patents >= 8
  );
}

function updateAgiProgram() {
  state.agi.progress = computeAgiProgressFrom(state);
  if (state.agi.achieved || !agiRequirementsMet(state)) return;

  state.agi.achieved = true;
  state.agi.achievedYear = state.year;
  state.agi.achievedDay = state.day;
  state.money += 18_000_000;
  state.influence += 12;
  state.reputation = clamp(state.reputation + 8, 5, 100);
  addFeed(`AGI breakthrough achieved in Year ${state.year}, Day ${state.day}. Civilization-scale contracts unlocked.`);
}

function getMapFrame(width, height) {
  const frameWidth = Math.min(width, height * MAP_ASPECT_RATIO);
  const frameHeight = frameWidth / MAP_ASPECT_RATIO;
  return {
    x: (width - frameWidth) / 2,
    y: (height - frameHeight) / 2,
    w: frameWidth,
    h: frameHeight,
    cx: width / 2,
    cy: height / 2,
  };
}

function projectLonLatRaw(lon, lat, width, height) {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

function projectLonLatView(lon, lat, width, height) {
  const frame = getMapFrame(width, height);
  const zoom = state.mapView.zoom;
  const raw = projectLonLatRaw(lon, lat, frame.w, frame.h);
  return {
    x: frame.x + frame.w / 2 + (raw.x - frame.w / 2 + state.mapView.panX) * zoom,
    y: frame.y + frame.h / 2 + (raw.y - frame.h / 2 + state.mapView.panY) * zoom,
  };
}

function unprojectPointToLonLat(x, y, width, height) {
  const frame = getMapFrame(width, height);
  const zoom = state.mapView.zoom;
  const mapX = (x - frame.x - frame.w / 2) / zoom + frame.w / 2 - state.mapView.panX;
  const mapY = (y - frame.y - frame.h / 2) / zoom + frame.h / 2 - state.mapView.panY;
  return {
    lon: (mapX / frame.w) * 360 - 180,
    lat: 90 - (mapY / frame.h) * 180,
  };
}

function isPointInsideMapFrame(x, y, width, height) {
  const frame = getMapFrame(width, height);
  return x >= frame.x && x <= frame.x + frame.w && y >= frame.y && y <= frame.y + frame.h;
}

function clampMapPan(width, height) {
  if (width <= 0 || height <= 0) return;
  const frame = getMapFrame(width, height);
  const zoom = state.mapView.zoom;
  const maxPanX = (frame.w * (zoom - 1)) / (2 * zoom);
  const maxPanY = (frame.h * (zoom - 1)) / (2 * zoom);
  state.mapView.panX = clamp(state.mapView.panX, -maxPanX, maxPanX);
  state.mapView.panY = clamp(state.mapView.panY, -maxPanY, maxPanY);
}

function setMapZoom(nextZoom) {
  state.mapView.zoom = clamp(nextZoom, MAP_ZOOM_MIN, MAP_ZOOM_MAX);
  clampMapPan(canvas.width, canvas.height);
}

function resetMapView() {
  state.mapView.zoom = 1;
  state.mapView.panX = 0;
  state.mapView.panY = 0;
  clampMapPan(canvas.width, canvas.height);
}

function geometryToPolygons(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  return [];
}

function polygonLatMean(polygon) {
  if (!polygon || !polygon[0] || !polygon[0].length) return 0;
  let sum = 0;
  let count = 0;
  for (const coord of polygon[0]) {
    if (!Array.isArray(coord) || coord.length < 2) continue;
    sum += coord[1];
    count += 1;
  }
  if (!count) return 0;
  return sum / count;
}

function createMapCanvas(width, height) {
  if (typeof OffscreenCanvas !== "undefined") {
    return new OffscreenCanvas(width, height);
  }
  const element = document.createElement("canvas");
  element.width = width;
  element.height = height;
  return element;
}

function appendPolygonPath(targetCtx, polygon, width, height) {
  for (const ring of polygon) {
    if (!Array.isArray(ring) || ring.length < 2) continue;
    for (let i = 0; i < ring.length; i += 1) {
      const [lon, lat] = ring[i];
      const { x, y } = projectLonLatRaw(lon, lat, width, height);
      if (i === 0) targetCtx.moveTo(x, y);
      else targetCtx.lineTo(x, y);
    }
    targetCtx.closePath();
  }
}

function drawMapFallback(width, height) {
  const oceanGradient = ctx.createLinearGradient(0, 0, width, height);
  oceanGradient.addColorStop(0, "#0f355d");
  oceanGradient.addColorStop(0.55, "#0a4365");
  oceanGradient.addColorStop(1, "#07243f");
  ctx.fillStyle = oceanGradient;
  ctx.fillRect(0, 0, width, height);
}

function rebuildWorldMapLayer() {
  if (!worldMap.ready || !worldMap.features.length || canvas.width <= 0 || canvas.height <= 0) return;

  const frame = getMapFrame(canvas.width, canvas.height);
  const width = Math.max(2, Math.floor(frame.w));
  const height = Math.max(2, Math.floor(frame.h));
  const layer = createMapCanvas(width, height);
  const mapCtx = layer.getContext("2d");
  if (!mapCtx) return;

  const oceanGradient = mapCtx.createLinearGradient(0, 0, width, height);
  oceanGradient.addColorStop(0, "#0f355d");
  oceanGradient.addColorStop(0.52, "#0a4568");
  oceanGradient.addColorStop(1, "#07243f");
  mapCtx.fillStyle = oceanGradient;
  mapCtx.fillRect(0, 0, width, height);

  mapCtx.strokeStyle = "rgba(169, 220, 255, 0.11)";
  mapCtx.lineWidth = 1;
  for (let lon = -150; lon <= 150; lon += 30) {
    const { x } = projectLonLatRaw(lon, 0, width, height);
    mapCtx.beginPath();
    mapCtx.moveTo(x, 0);
    mapCtx.lineTo(x, height);
    mapCtx.stroke();
  }
  for (let lat = -60; lat <= 60; lat += 20) {
    const { y } = projectLonLatRaw(0, lat, width, height);
    mapCtx.beginPath();
    mapCtx.moveTo(0, y);
    mapCtx.lineTo(width, y);
    mapCtx.stroke();
  }

  mapCtx.strokeStyle = "rgba(154, 214, 255, 0.18)";
  mapCtx.lineWidth = 1;
  for (let i = 0; i < 8; i += 1) {
    const y = (i + 1) * (height / 9);
    mapCtx.beginPath();
    mapCtx.moveTo(0, y);
    mapCtx.bezierCurveTo(width * 0.18, y - 6, width * 0.7, y + 8, width, y - 4);
    mapCtx.stroke();
  }

  mapCtx.strokeStyle = "rgba(180, 249, 224, 0.24)";
  mapCtx.lineWidth = 1.1;
  for (const feature of worldMap.features) {
    mapCtx.beginPath();
    for (const polygon of feature.polygons) {
      appendPolygonPath(mapCtx, polygon, width, height);
    }
    const latBias = clamp((feature.latMean + 50) / 150, 0, 1);
    const landGradient = mapCtx.createLinearGradient(0, 0, 0, height);
    landGradient.addColorStop(0, `rgba(${Math.round(90 + latBias * 18)}, ${Math.round(145 + latBias * 14)}, ${Math.round(112 + latBias * 8)}, 0.96)`);
    landGradient.addColorStop(1, `rgba(${Math.round(56 + latBias * 10)}, ${Math.round(103 + latBias * 14)}, ${Math.round(78 + latBias * 6)}, 0.96)`);
    mapCtx.fillStyle = landGradient;
    mapCtx.fill("evenodd");
    mapCtx.stroke();
  }

  mapCtx.save();
  mapCtx.globalCompositeOperation = "soft-light";
  mapCtx.fillStyle = "rgba(245, 255, 245, 0.12)";
  for (let i = 0; i < 5; i += 1) {
    mapCtx.beginPath();
    mapCtx.ellipse(width * (0.16 + i * 0.18), height * (0.18 + (i % 2) * 0.22), width * 0.2, height * 0.08, 0, 0, Math.PI * 2);
    mapCtx.fill();
  }
  mapCtx.restore();

  worldMap.layerCanvas = layer;
  worldMap.layerWidth = width;
  worldMap.layerHeight = height;
}

function drawWorldMapBase(width, height) {
  const frame = getMapFrame(width, height);
  if (
    !worldMap.layerCanvas ||
    worldMap.layerWidth !== Math.floor(frame.w) ||
    worldMap.layerHeight !== Math.floor(frame.h)
  ) {
    rebuildWorldMapLayer();
  }

  drawMapFallback(width, height);

  if (!worldMap.layerCanvas) {
    return;
  }

  const zoom = state.mapView.zoom;
  const drawWidth = frame.w * zoom;
  const drawHeight = frame.h * zoom;
  const drawX = frame.x + (frame.w - drawWidth) / 2 + state.mapView.panX * zoom;
  const drawY = frame.y + (frame.h - drawHeight) / 2 + state.mapView.panY * zoom;

  ctx.save();
  ctx.beginPath();
  ctx.rect(frame.x, frame.y, frame.w, frame.h);
  ctx.clip();
  ctx.drawImage(worldMap.layerCanvas, drawX, drawY, drawWidth, drawHeight);
  ctx.restore();

  ctx.strokeStyle = "rgba(145, 211, 255, 0.35)";
  ctx.lineWidth = 1.4;
  ctx.strokeRect(frame.x, frame.y, frame.w, frame.h);
}

async function loadWorldMapData() {
  try {
    const response = await fetch(MAP_DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to load map data: ${response.status}`);
    }
    const geojson = await response.json();
    const features = Array.isArray(geojson.features) ? geojson.features : [];
    worldMap.features = features
      .filter((feature) => feature?.geometry)
      .filter((feature) => feature?.properties?.name !== "Antarctica")
      .map((feature) => {
        const polygons = geometryToPolygons(feature.geometry);
        const latMean = polygons.length ? polygonLatMean(polygons[0]) : 0;
        return { name: feature.properties?.name ?? "Unknown", polygons, latMean };
      })
      .filter((feature) => feature.polygons.length > 0);

    worldMap.ready = true;
    worldMap.loadingError = null;
    rebuildWorldMapLayer();
    render();
  } catch (error) {
    worldMap.loadingError = String(error);
    console.error("World map load failed", error);
  }
}

function addFeed(message) {
  const stamp = `Y${state.year} D${state.day}`;
  state.feed.unshift(`${stamp}: ${message}`);
  if (state.feed.length > FEED_LIMIT) {
    state.feed.length = FEED_LIMIT;
  }
}

function applyModifierBundle(bundle) {
  for (const [key, value] of Object.entries(bundle)) {
    if (key.endsWith("Mul")) {
      const prop = key.slice(0, -3);
      if (prop in state.modifiers) {
        state.modifiers[prop] *= value;
      }
    } else if (key.endsWith("Add")) {
      const prop = key.slice(0, -3);
      if (prop in state.modifiers) {
        state.modifiers[prop] += value;
      }
    }
  }
}

function currentModel() {
  return AI_MODELS.find((model) => model.id === state.activeModelId) ?? AI_MODELS[0];
}

function getModelBonus(sectorId) {
  const model = currentModel();
  const base = model.bonus[sectorId] ?? 0;
  return base + state.modifiers.aiEff * 0.06;
}

function researchRatePerDay() {
  const labs = totalLabs();
  const base = 14 + labs * 8 + state.talent * 0.18 + state.patents * 0.8;
  const eventBoost = state.effects
    .filter((effect) => effect.type === "research")
    .reduce((mult, effect) => mult * effect.multiplier, 1);
  const quality = 1 + state.modifiers.agentBoost * 0.2;
  return base * state.modifiers.researchMul * eventBoost * quality;
}

function talentGrowthPerDay() {
  const labs = totalLabs();
  const globalTalent = averageLocationStat("talent", 1);
  const eventBoost = state.effects
    .filter((effect) => effect.type === "talent")
    .reduce((mult, effect) => mult * effect.multiplier, 1);
  return (0.25 + labs * 0.18 + globalTalent * 0.45) * state.modifiers.talentMul * eventBoost;
}

function reputationDriftPerDay() {
  const shareAverage =
    state.sectors.reduce((sum, sector) => sum + sector.playerShare, 0) / Math.max(1, state.sectors.length);
  const highEmissionPenalty = Math.max(0, state.emissionsKilotons - 240) * 0.0024;
  const riskPenalty = state.riskScore * 0.22;
  return 0.035 + shareAverage * 0.13 + state.modifiers.reputationBoost * 0.1 - highEmissionPenalty - riskPenalty;
}

function passiveInfluencePerDay() {
  return 0.03 * ownedLocations().length + state.reputation * 0.006 + state.modifiers.complianceShield * 0.15;
}

function passivePatentPerDay() {
  return (0.01 + totalLabs() * 0.012 + state.modifiers.agentBoost * 0.04) * state.modifiers.patentMul;
}

function locationEventMultiplier(type, locationId) {
  return state.effects
    .filter((effect) => effect.type === type && effect.locationId === locationId)
    .reduce((mult, effect) => mult * effect.multiplier, 1);
}

function globalEventMultiplier(type) {
  return state.effects
    .filter((effect) => effect.type === type && !effect.locationId)
    .reduce((mult, effect) => mult * effect.multiplier, 1);
}

function locationContractRevenuePerDay(simState, location) {
  const contractBase = 135_000 * (location.contracts || 0);
  const infraComponent = location.dcLevel * 92_000 + location.servers * 4_700 + location.labs * 34_000;
  const marketMultiplier =
    location.market *
    (1 + simState.modifiers.marketReach * 0.32 + simState.modifiers.salesBoost * 0.45);
  const reputationMultiplier = 1 + Math.max(0, simState.reputation - 30) * 0.003;
  return (contractBase + infraComponent) * marketMultiplier * reputationMultiplier;
}

function computeLocationEconomicsFrom(simState, location) {
  const energyEvent = locationEventMultiplierFrom(simState, "energy", location.id);
  const legalEvent = locationEventMultiplierFrom(simState, "legal", location.id);
  const revenueEvent = globalEventMultiplierFrom(simState, "revenue");

  const contractRevenue = locationContractRevenuePerDay(simState, location) * revenueEvent;
  const energyCost =
    location.servers *
    1_250 *
    location.energy *
    simState.modifiers.energyEff *
    energyEvent *
    (1 + Math.max(0, location.climate - 1) * 0.22);

  const legalCost =
    (location.dcLevel * 11_000 + location.servers * 150) *
    location.legal *
    simState.modifiers.legalEff *
    legalEvent *
    (1 - simState.modifiers.complianceShield * 0.55);

  const operationsCost =
    location.labs * 8_600 + location.servers * 220 + location.dcLevel * 4_900 + (location.resilience || 0) * 12_500;
  return {
    revenue: contractRevenue,
    energyCost,
    legalCost,
    operationsCost,
    net: contractRevenue - energyCost - legalCost - operationsCost,
  };
}

function computeLocationEconomics(location) {
  return computeLocationEconomicsFrom(state, location);
}

function getPlayerPower(sectorId) {
  const servers = totalServers();
  const labs = totalLabs();
  const dcs = totalDcLevels();
  let base = 0;

  if (sectorId === "cloud") {
    base = servers * 2.55 * state.modifiers.serverEff * (1 + state.modifiers.cloudLatency + state.modifiers.chipAdv * 0.42);
    base += dcs * 16;
  } else if (sectorId === "coding") {
    base = labs * 15 + state.talent * 1.15 + state.modifiers.agentBoost * 45;
    base += servers * 0.45;
  } else if (sectorId === "genai") {
    base = labs * 13.5 + state.dataUnits * 0.28 + state.modifiers.aiEff * 68;
  } else if (sectorId === "robotics") {
    base = state.patents * 12 + labs * 7 + state.modifiers.chipAdv * 58 + state.modifiers.agentBoost * 24;
  } else {
    base = labs * 11 + state.patents * 9 + state.talent * 0.52 + state.modifiers.aiEff * 40;
  }

  const modelBonus = getModelBonus(sectorId);
  const focusBonus = state.focus === sectorId ? 0.2 : 0;
  const expansionBonus = (ownedLocations().length - 1) * 0.027;
  const marketBonus = state.modifiers.marketReach + state.modifiers.salesBoost * 0.5;
  const reputationBonus = (state.reputation - 30) * 0.004;
  return base * (1 + modelBonus + focusBonus + expansionBonus + marketBonus + reputationBonus);
}

function updateCompetitors(days) {
  for (const corp of state.competitors) {
    for (const sector of MARKET_SECTORS) {
      const specialtyBoost = corp.specialty === sector.id ? 0.02 : 0;
      const drift = (Math.random() - 0.5) * 0.018 * days;
      const growth = (0.0008 + specialtyBoost * 0.0012 + corp.momentum * 0.0015 + corp.modelTier * 0.0002) * days;
      corp.power[sector.id] = Math.max(18, corp.power[sector.id] * (1 + drift + growth));
    }

    corp.capital += (95_000 + Object.values(corp.power).reduce((a, b) => a + b, 0) * 75) * days;

    if (Math.random() < 0.0007 * days) {
      corp.modelTier = Math.min(8, corp.modelTier + 1);
      addFeed(`${corp.name} released a stronger model tier and tightened competition.`);
    }

    if (Math.random() < 0.002 * days) {
      corp.momentum = 0.8 + Math.random() * 0.65;
    }
  }
}

function applyEffects(days) {
  for (let i = state.effects.length - 1; i >= 0; i -= 1) {
    state.effects[i].remaining -= days;
    if (state.effects[i].remaining <= 0) {
      addFeed(`${state.effects[i].label} ended.`);
      state.effects.splice(i, 1);
    }
  }
}

function maybeTriggerEvent(days) {
  state.eventAccumulator += days;
  if (state.eventAccumulator < 8) return;
  state.eventAccumulator = 0;

  if (Math.random() > 0.36) return;

  const target = pick(ownedLocations());
  const roll = Math.random();

  if (roll < 0.2) {
    state.effects.push({
      type: "energy",
      locationId: target.id,
      multiplier: 1.28,
      remaining: 10,
      label: `Grid volatility at ${target.name}`,
    });
    addFeed(`Grid volatility at ${target.name}: energy cost +28% for 10 days.`);
    return;
  }

  if (roll < 0.4) {
    state.effects.push({
      type: "legal",
      locationId: target.id,
      multiplier: 1.32,
      remaining: 9,
      label: `Regulatory pressure in ${target.country}`,
    });
    addFeed(`Regulatory pressure in ${target.country}: legal overhead +32% for 9 days.`);
    return;
  }

  if (roll < 0.58) {
    state.effects.push({
      type: "research",
      multiplier: 1.24,
      remaining: 10,
      label: "Research talent wave",
    });
    state.effects.push({
      type: "talent",
      multiplier: 1.3,
      remaining: 10,
      label: "Research talent wave",
    });
    addFeed("Talent migration wave: research speed and hiring efficiency boosted for 10 days.");
    return;
  }

  if (roll < 0.76) {
    const grant = 600_000 + Math.random() * 400_000;
    state.money += grant;
    state.influence += 3;
    addFeed(`Public innovation grant awarded: ${formatMoney(grant)} and +3 influence.`);
    return;
  }

  if (roll < 0.9) {
    state.effects.push({
      type: "revenue",
      multiplier: 1.18,
      remaining: 8,
      label: "Demand surge",
    });
    addFeed("Demand surge across enterprise contracts: revenue +18% for 8 days.");
    return;
  }

  state.effects.push({
    type: "revenue",
    multiplier: 0.86,
    remaining: 8,
    label: "Price war",
  });
  addFeed("Rival megacorps triggered a price war: revenue -14% for 8 days.");
}

function updateResearch(days) {
  if (!state.researching) return;

  state.researching.progress += researchRatePerDay() * days;
  if (state.researching.progress < state.researching.rpCost) return;

  const node = RESEARCH_NODES.find((item) => item.id === state.researching.id);
  if (node) {
    state.researchDone.add(node.id);
    applyModifierBundle(node.effects);
    state.patents += 1;
    addFeed(`Research complete: ${node.name}. Patent portfolio +1.`);
  }
  state.researching = null;
}

function updateEconomy(days) {
  let grossRevenue = 0;
  const baseShareFloor = clamp(
    0.045 +
      ownedLocations().length * 0.009 +
      Math.max(0, state.reputation - 30) * 0.0012 +
      state.modifiers.salesBoost * 0.02,
    0.045,
    0.22,
  );

  for (const sector of MARKET_SECTORS) {
    const playerPower = getPlayerPower(sector.id);
    const rivalPower = state.competitors.reduce((sum, corp) => sum + corp.power[sector.id], 0);
    const share = clamp(playerPower / (playerPower + rivalPower), baseShareFloor, 0.92);
    const phase = sector.volatility * 90;
    const wave = 1 + Math.sin((state.totalDays + phase) * 0.034 + phase * 0.07) * sector.volatility;
    const demand = Math.max(0.7, wave);
    const revenueMultiplier = globalEventMultiplier("revenue");

    const revenue =
      sector.valuePerDay *
      share *
      demand *
      (1 + state.modifiers.salesBoost + state.modifiers.marketReach * 0.6) *
      revenueMultiplier;

    const entry = state.sectors.find((item) => item.id === sector.id);
    if (entry) {
      entry.playerShare = share;
      entry.demand = demand;
    }

    grossRevenue += revenue;
  }

  let fixedExpenses = 0;
  let emissionsRaw = 0;
  let contractRevenue = 0;

  for (const loc of ownedLocations()) {
    const local = computeLocationEconomics(loc);
    contractRevenue += local.revenue;
    fixedExpenses += local.energyCost + local.legalCost + local.operationsCost;

    emissionsRaw += loc.servers * loc.energy * state.modifiers.energyEff * 0.52;
  }

  grossRevenue += contractRevenue;
  grossRevenue += state.challengeRevenuePerDay;

  const talentPayroll = state.talent * 190;
  const taxRate = averageLocationStat("tax", 0.95) * 0.065;
  const taxBill = grossRevenue * taxRate;
  const carbonPenalty = Math.max(0, emissionsRaw - 170) * 430 * (1 - state.modifiers.riskControl * 0.6);

  const totalExpensesPerDay = fixedExpenses + talentPayroll + taxBill + carbonPenalty + state.challengePenaltyPerDay;
  const netPerDay = grossRevenue - totalExpensesPerDay;

  state.cashflowPerDay = netPerDay;
  state.money += netPerDay * days;

  const dataIncome = (totalServers() * 0.22 + totalLabs() * 0.6) * state.modifiers.dataHarvest;
  const modelLoad = currentModel().tier * 0.52;
  state.dataUnits = Math.max(0, state.dataUnits + (dataIncome - modelLoad) * days);

  state.talent = Math.max(8, state.talent + talentGrowthPerDay() * days);
  state.influence = Math.max(0, state.influence + passiveInfluencePerDay() * days);
  state.patents = Math.max(0, state.patents + passivePatentPerDay() * days);

  state.reputation = clamp(state.reputation + reputationDriftPerDay() * days, 5, 100);
  state.emissionsKilotons = emissionsRaw;

  const legalExposure = averageLocationStat("legal", 1) - 1;
  const climateExposure = Math.max(0, averageLocationStat("climate", 1) - 1);
  const reliabilityGap = Math.max(0, 0.9 - averageReliabilityFrom(state));
  const balancePressure = state.money < 0 ? 0.14 : 0;
  state.riskScore = clamp(
    0.14 +
      legalExposure * 0.28 +
      climateExposure * 0.22 +
      reliabilityGap * 0.42 +
      Math.max(0, state.emissionsKilotons - 220) * 0.0018 +
      balancePressure -
      state.modifiers.riskControl * 0.32,
    0.02,
    0.96,
  );

  if (state.money < -2_500_000) {
    state.mode = "menu";
    ui.menuOverlay.classList.add("visible");
    addFeed("Board intervention: insolvency hit. Restart and rebalance your expansion strategy.");
  }
}

function recalcValuation() {
  const infra = ownedLocations().length * 12_000_000 + totalServers() * 72_000 + totalLabs() * 1_650_000;
  const intellectual = state.patents * 1_100_000 + state.talent * 42_000 + currentModel().tier * 18_000_000;
  const market = Math.max(0, state.cashflowPerDay) * 110;
  const reputationPremium = Math.max(0, state.reputation - 30) * 250_000;
  state.valuation = Math.max(9_000_000, state.money + infra + intellectual + market + reputationPremium);
}

function simulateGameDays(days) {
  if (state.mode !== "play" || state.speed <= 0) return;

  state.totalDays += days;
  while (state.totalDays >= state.day) {
    state.day += 1;
    if (state.day > 360) {
      state.day = 1;
      state.year += 1;
    }
  }

  updateCompetitors(days);
  applyEffects(days);
  maybeTriggerEvent(days);
  updateChallenges(days);
  updateResearch(days);
  updateEconomy(days);
  updateAgiProgram();
  recalcValuation();
}

function costAcquire(location) {
  return location.acquireCost;
}

function costUpgradeDc(location) {
  return Math.round(380_000 * Math.pow(1.62, location.dcLevel));
}

function costBuyServer(location) {
  return Math.round(130_000 * Math.pow(1 + location.servers / 40, 1.18));
}

function costBuildLab(location) {
  return Math.round(320_000 * Math.pow(1.5, location.labs));
}

function canResearch(node) {
  if (state.researchDone.has(node.id) || state.researching) return false;
  if (node.prereqs.some((item) => !state.researchDone.has(item))) return false;
  return state.money >= node.fundingCost;
}

function canUnlockStrategy(node) {
  if (state.strategyDone.has(node.id)) return false;
  if (node.prereqs.some((item) => !state.strategyDone.has(item))) return false;
  if (node.researchReq && !state.researchDone.has(node.researchReq)) return false;
  return state.money >= node.moneyCost && state.influence >= node.influenceCost && state.patents >= node.patentCost;
}

function startResearch(nodeId) {
  const node = RESEARCH_NODES.find((item) => item.id === nodeId);
  if (!node || !canResearch(node)) return;

  state.money -= node.fundingCost;
  state.researching = { id: node.id, progress: 0, rpCost: node.rpCost };
  addFeed(`Research started: ${node.name}.`);
  refreshUI();
}

function unlockStrategy(nodeId) {
  const node = STRATEGY_NODES.find((item) => item.id === nodeId);
  if (!node || !canUnlockStrategy(node)) return;

  state.money -= node.moneyCost;
  state.influence -= node.influenceCost;
  state.patents -= node.patentCost;
  state.strategyDone.add(node.id);
  applyModifierBundle(node.effects);
  addFeed(`Strategy adopted: ${node.name}.`);
  refreshUI();
}

function buyOrActivateModel(modelId) {
  const model = AI_MODELS.find((item) => item.id === modelId);
  if (!model) return;

  const reqResearchOk = !model.researchReq || state.researchDone.has(model.researchReq);
  const reqStrategyOk = !model.strategyReq || state.strategyDone.has(model.strategyReq);
  if (!reqResearchOk || !reqStrategyOk) return;

  const owned = state.modelsOwned.has(model.id);
  if (!owned) {
    if (
      state.money < model.moneyCost ||
      state.dataUnits < model.dataCost ||
      state.talent < model.talentReq ||
      state.patents < model.patentReq
    ) {
      return;
    }
    state.money -= model.moneyCost;
    state.dataUnits -= model.dataCost;
    state.patents -= model.patentReq;
    state.modelsOwned.add(model.id);
    addFeed(`Model developed: ${model.name}.`);
  }

  state.activeModelId = model.id;
  addFeed(`Active model switched to ${model.name}.`);
  refreshUI();
}

function acquireSelectedLocation() {
  const loc = selectedLocation();
  if (loc.owned) return;
  const cost = costAcquire(loc);
  if (state.money < cost) return;

  state.money -= cost;
  loc.owned = true;
  loc.dcLevel = 1;
  loc.servers = Math.round(10 + loc.market * 4);
  loc.labs = loc.talent > 1.1 ? 1 : 0;
  loc.contracts = 1;
  addFeed(`Acquired ${loc.name}. Regional cloud operations are now live.`);
  refreshUI();
}

function upgradeDc() {
  const loc = selectedLocation();
  if (!loc.owned) return;

  const cost = costUpgradeDc(loc);
  if (state.money < cost) return;

  state.money -= cost;
  loc.dcLevel += 1;
  loc.servers += 8;
  state.reputation = clamp(state.reputation + 0.2, 0, 100);
  addFeed(`Upgraded ${loc.name} to data center Tier ${loc.dcLevel}.`);
  refreshUI();
}

function buyServerCluster() {
  const loc = selectedLocation();
  if (!loc.owned) return;

  const cost = costBuyServer(loc);
  if (state.money < cost) return;

  state.money -= cost;
  loc.servers += 6;
  addFeed(`Installed a server cluster at ${loc.name}.`);
  refreshUI();
}

function buildResearchLab() {
  const loc = selectedLocation();
  if (!loc.owned) return;

  const cost = costBuildLab(loc);
  if (state.money < cost) return;

  state.money -= cost;
  loc.labs += 1;
  addFeed(`Opened a research lab at ${loc.name}.`);
  refreshUI();
}

function gatherTrainingData() {
  const cost = 320_000;
  if (state.money < cost) return;

  const gain = 42 + Math.random() * 34 + totalLabs() * 3.4;
  state.money -= cost;
  state.dataUnits += gain;
  addFeed(`Secured and cleaned ${gain.toFixed(0)} PB of training data.`);
  refreshUI();
}

function recruitTalent() {
  const cost = 280_000;
  if (state.money < cost) return;

  const loc = selectedLocation();
  const gain = (6 + Math.random() * 6) * (loc.talent || 1);
  state.money -= cost;
  state.talent += gain;
  state.reputation = clamp(state.reputation + 0.3, 0, 100);
  addFeed(`Recruited ${gain.toFixed(1)} senior specialists in ${loc.name}.`);
  refreshUI();
}

function filePatent() {
  const costMoney = 210_000;
  const costData = 15;
  if (state.money < costMoney || state.dataUnits < costData) return;

  const gain = 1 + Math.random() * 0.8 + state.modifiers.patentMul * 0.25;
  state.money -= costMoney;
  state.dataUnits -= costData;
  state.patents += gain;
  state.influence += 0.8;
  addFeed(`Filed ${gain.toFixed(1)} patent-equivalent IP units.`);
  refreshUI();
}

function signEnterpriseContract() {
  const loc = selectedLocation();
  const moneyCost = 140_000;
  const influenceCost = 2;
  if (!loc.owned || state.money < moneyCost || state.influence < influenceCost) return;

  loc.contracts = (loc.contracts || 0) + 1;
  state.money -= moneyCost;
  state.influence -= influenceCost;
  addFeed(`Signed enterprise contract bundle at ${loc.name}. +1 recurring contract.`);
  refreshUI();
}

function hardenSite() {
  const loc = selectedLocation();
  if (!loc.owned) return;

  const cost = costHardenSite(loc);
  if (state.money < cost) return;

  state.money -= cost;
  loc.resilience = (loc.resilience || 0) + 1;
  state.reputation = clamp(state.reputation + 0.18, 5, 100);
  addFeed(`Reliability hardening deployed at ${loc.name}. Resilience tier is now ${loc.resilience}.`);
  refreshUI();
}

function runPolicyCampaign() {
  const cost = 360_000;
  if (state.money < cost) return;

  const gain = 3 + Math.random() * 3;
  state.money -= cost;
  state.influence += gain;
  state.reputation = clamp(state.reputation + 0.4, 0, 100);
  addFeed(`Policy campaign succeeded: +${gain.toFixed(1)} influence.`);
  refreshUI();
}

function cycleSelectedLocation(step) {
  const index = state.locations.findIndex((loc) => loc.id === state.selectedLocationId);
  const next = (index + step + state.locations.length) % state.locations.length;
  state.selectedLocationId = state.locations[next].id;
  refreshUI();
}

function cycleFocus(step) {
  const index = MARKET_SECTORS.findIndex((sector) => sector.id === state.focus);
  const next = (index + step + MARKET_SECTORS.length) % MARKET_SECTORS.length;
  state.focus = MARKET_SECTORS[next].id;
  refreshUI();
}

function startNextResearch() {
  if (state.researching) return;
  const node = RESEARCH_NODES.find((item) => canResearch(item));
  if (node) startResearch(node.id);
}

function startNextStrategy() {
  const node = STRATEGY_NODES.find((item) => canUnlockStrategy(item));
  if (node) unlockStrategy(node.id);
}

function computeRiskLabel() {
  if (state.riskScore < 0.25) return "Low";
  if (state.riskScore < 0.47) return "Moderate";
  if (state.riskScore < 0.72) return "High";
  return "Critical";
}

function describeModifierKey(key, value) {
  const labelMap = {
    serverEffMul: "server throughput",
    energyEffMul: "energy costs",
    legalEffMul: "legal overhead",
    aiEffAdd: "AI quality",
    marketReachAdd: "market reach",
    agentBoostAdd: "agent automation",
    dataHarvestMul: "data intake",
    researchMul: "research speed",
    talentMul: "talent growth",
    patentMul: "patent output",
    reputationBoostAdd: "reputation growth",
    riskControlAdd: "risk control",
    chipAdvAdd: "chip advantage",
    cloudLatencyAdd: "cloud performance",
    complianceShieldAdd: "compliance shield",
    salesBoostAdd: "sales conversion",
  };

  const label = labelMap[key];
  if (!label) return null;

  if (key.endsWith("Mul")) {
    const pct = Math.round((value - 1) * 100);
    const signed = pct >= 0 ? `+${pct}%` : `${pct}%`;
    return `${label} ${signed}`;
  }

  const pct = Math.round(value * 100);
  const signed = pct >= 0 ? `+${pct}%` : `${pct}%`;
  return `${label} ${signed}`;
}

function summarizeModifierEffects(bundle) {
  const parts = [];
  for (const [key, value] of Object.entries(bundle)) {
    const text = describeModifierKey(key, value);
    if (text) parts.push(text);
  }
  return parts.join(" | ");
}

function summarizeModelBonuses(model) {
  const parts = [];
  for (const sector of MARKET_SECTORS) {
    const value = model.bonus[sector.id];
    if (!value) continue;
    parts.push(`${sector.label} +${Math.round(value * 100)}%`);
  }
  return parts.join(" | ");
}

function ownedLocationsFrom(simState) {
  return simState.locations.filter((loc) => loc.owned);
}

function totalServersFrom(simState) {
  return ownedLocationsFrom(simState).reduce((sum, loc) => sum + loc.servers, 0);
}

function totalLabsFrom(simState) {
  return ownedLocationsFrom(simState).reduce((sum, loc) => sum + loc.labs, 0);
}

function totalDcFrom(simState) {
  return ownedLocationsFrom(simState).reduce((sum, loc) => sum + loc.dcLevel, 0);
}

function averageLocationStatFrom(simState, key, fallback = 1) {
  const owned = ownedLocationsFrom(simState);
  if (!owned.length) return fallback;
  return owned.reduce((sum, loc) => sum + loc[key], 0) / owned.length;
}

function currentModelFrom(simState) {
  return AI_MODELS.find((model) => model.id === simState.activeModelId) ?? AI_MODELS[0];
}

function globalEventMultiplierFrom(simState, type) {
  return simState.effects
    .filter((effect) => effect.type === type && !effect.locationId)
    .reduce((mult, effect) => mult * effect.multiplier, 1);
}

function locationEventMultiplierFrom(simState, type, locationId) {
  return simState.effects
    .filter((effect) => effect.type === type && effect.locationId === locationId)
    .reduce((mult, effect) => mult * effect.multiplier, 1);
}

function getModelBonusFrom(simState, sectorId) {
  const model = currentModelFrom(simState);
  return (model.bonus[sectorId] ?? 0) + simState.modifiers.aiEff * 0.06;
}

function getPlayerPowerFrom(simState, sectorId) {
  const servers = totalServersFrom(simState);
  const labs = totalLabsFrom(simState);
  const dcs = totalDcFrom(simState);

  let base = 0;
  if (sectorId === "cloud") {
    base = servers * 2.55 * simState.modifiers.serverEff * (1 + simState.modifiers.cloudLatency + simState.modifiers.chipAdv * 0.42);
    base += dcs * 16;
  } else if (sectorId === "coding") {
    base = labs * 15 + simState.talent * 1.15 + simState.modifiers.agentBoost * 45 + servers * 0.45;
  } else if (sectorId === "genai") {
    base = labs * 13.5 + simState.dataUnits * 0.28 + simState.modifiers.aiEff * 68;
  } else if (sectorId === "robotics") {
    base = simState.patents * 12 + labs * 7 + simState.modifiers.chipAdv * 58 + simState.modifiers.agentBoost * 24;
  } else {
    base = labs * 11 + simState.patents * 9 + simState.talent * 0.52 + simState.modifiers.aiEff * 40;
  }

  const modelBonus = getModelBonusFrom(simState, sectorId);
  const focusBonus = simState.focus === sectorId ? 0.2 : 0;
  const expansionBonus = (ownedLocationsFrom(simState).length - 1) * 0.027;
  const marketBonus = simState.modifiers.marketReach + simState.modifiers.salesBoost * 0.5;
  const reputationBonus = (simState.reputation - 30) * 0.004;
  return base * (1 + modelBonus + focusBonus + expansionBonus + marketBonus + reputationBonus);
}

function computeNetPerDayFor(simState) {
  let grossRevenue = 0;
  const baseShareFloor = clamp(
    0.045 +
      ownedLocationsFrom(simState).length * 0.009 +
      Math.max(0, simState.reputation - 30) * 0.0012 +
      simState.modifiers.salesBoost * 0.02,
    0.045,
    0.22,
  );

  for (const sector of MARKET_SECTORS) {
    const playerPower = getPlayerPowerFrom(simState, sector.id);
    const rivalPower = simState.competitors.reduce((sum, corp) => sum + corp.power[sector.id], 0);
    const share = clamp(playerPower / (playerPower + rivalPower), baseShareFloor, 0.92);
    const phase = sector.volatility * 90;
    const wave = 1 + Math.sin((simState.totalDays + phase) * 0.034 + phase * 0.07) * sector.volatility;
    const demand = Math.max(0.7, wave);
    const revenueMultiplier = globalEventMultiplierFrom(simState, "revenue");

    const revenue =
      sector.valuePerDay *
      share *
      demand *
      (1 + simState.modifiers.salesBoost + simState.modifiers.marketReach * 0.6) *
      revenueMultiplier;
    grossRevenue += revenue;
  }

  let fixedExpenses = 0;
  let emissionsRaw = 0;
  let contractRevenue = 0;
  for (const loc of ownedLocationsFrom(simState)) {
    const local = computeLocationEconomicsFrom(simState, loc);
    contractRevenue += local.revenue;
    fixedExpenses += local.energyCost + local.legalCost + local.operationsCost;
    emissionsRaw += loc.servers * loc.energy * simState.modifiers.energyEff * 0.52;
  }
  grossRevenue += contractRevenue;
  const challenge = computeChallengeEconomicsFrom(simState);
  grossRevenue += challenge.revenue;

  const talentPayroll = simState.talent * 190;
  const taxRate = averageLocationStatFrom(simState, "tax", 0.95) * 0.065;
  const taxBill = grossRevenue * taxRate;
  const carbonPenalty = Math.max(0, emissionsRaw - 170) * 430 * (1 - simState.modifiers.riskControl * 0.6);
  return grossRevenue - (fixedExpenses + talentPayroll + taxBill + carbonPenalty + challenge.penalty);
}

function getSelectedLocationFrom(simState) {
  return simState.locations.find((loc) => loc.id === simState.selectedLocationId) ?? simState.locations[0];
}

function estimateCashflowDelta(actionId) {
  const baseNet = computeNetPerDayFor(state);
  const sim = structuredClone(state);
  const loc = getSelectedLocationFrom(sim);

  if (actionId === "acquire") {
    if (loc.owned) return null;
    loc.owned = true;
    loc.dcLevel = 1;
    loc.servers = Math.round(10 + loc.market * 4);
    loc.labs = loc.talent > 1.1 ? 1 : 0;
    loc.contracts = 1;
  } else if (actionId === "upgrade-dc") {
    if (!loc.owned) return null;
    loc.dcLevel += 1;
    loc.servers += 8;
  } else if (actionId === "buy-server") {
    if (!loc.owned) return null;
    loc.servers += 6;
  } else if (actionId === "build-lab") {
    if (!loc.owned) return null;
    loc.labs += 1;
  } else if (actionId === "gather-data") {
    sim.dataUnits += 59 + totalLabsFrom(sim) * 3.4;
  } else if (actionId === "recruit") {
    sim.talent += 9 * (loc.talent || 1);
    sim.reputation += 0.3;
  } else if (actionId === "patent") {
    sim.patents += 1.4 + sim.modifiers.patentMul * 0.25;
    sim.influence += 0.8;
  } else if (actionId === "contract") {
    if (!loc.owned) return null;
    loc.contracts = (loc.contracts || 0) + 1;
    sim.influence = Math.max(0, sim.influence - 2);
  } else if (actionId === "harden") {
    if (!loc.owned) return null;
    loc.resilience = (loc.resilience || 0) + 1;
  } else if (actionId === "lobby") {
    sim.influence += 4.5;
    sim.reputation += 0.4;
  } else {
    return null;
  }

  const nextNet = computeNetPerDayFor(sim);
  return nextNet - baseNet;
}

function formatDeltaPerDay(delta) {
  if (delta === null || Number.isNaN(delta)) return "est. cashflow delta/day: unavailable";
  if (Math.abs(delta) < 1200) return "est. cashflow delta/day: no major recurring change";
  const sign = delta >= 0 ? "+" : "-";
  return `est. cashflow delta/day: ${sign}${formatMoney(Math.abs(delta))}`;
}

function renderActionIntel(loc) {
  const acquireServers = Math.round(10 + loc.market * 4);
  const acquireLabs = loc.talent > 1.1 ? 1 : 0;
  const rows = [
    {
      id: "acquire",
      title: "Acquire Location",
      cost: loc.owned ? "Owned" : formatMoney(costAcquire(loc)),
      effect: `opens ${loc.name} with +${acquireServers} servers${acquireLabs ? `, +${acquireLabs} lab` : ""}, +1 contract`,
    },
    {
      id: "upgrade-dc",
      title: "Upgrade Data Center",
      cost: loc.owned ? formatMoney(costUpgradeDc(loc)) : "Requires ownership",
      effect: "+1 data center tier, +8 servers",
    },
    {
      id: "buy-server",
      title: "Buy App Server Cluster",
      cost: loc.owned ? formatMoney(costBuyServer(loc)) : "Requires ownership",
      effect: "+6 servers, higher throughput",
    },
    {
      id: "build-lab",
      title: "Build Research Lab",
      cost: loc.owned ? formatMoney(costBuildLab(loc)) : "Requires ownership",
      effect: "+1 lab, better research and talent growth",
    },
    {
      id: "gather-data",
      title: "Gather Training Data",
      cost: `${formatMoney(320_000)} + ops time`,
      effect: `+~${Math.round(59 + totalLabs() * 3.4)} PB data (one-time)`,
    },
    {
      id: "recruit",
      title: "Recruit Talent",
      cost: formatMoney(280_000),
      effect: `+~${(9 * (loc.talent || 1)).toFixed(1)} talent, small reputation bump`,
    },
    {
      id: "patent",
      title: "File Patent",
      cost: `${formatMoney(210_000)} + 15 PB data`,
      effect: "+~1.6 patents, +0.8 influence",
    },
    {
      id: "contract",
      title: "Sign Enterprise Contract",
      cost: `${formatMoney(140_000)} + 2 influence`,
      effect: "+1 recurring regional contract",
    },
    {
      id: "harden",
      title: "Harden Reliability Stack",
      cost: loc.owned ? formatMoney(costHardenSite(loc)) : "Requires ownership",
      effect: "+1 resilience tier, better SLA uptime under stress",
    },
    {
      id: "lobby",
      title: "Policy Campaign",
      cost: formatMoney(360_000),
      effect: "+~4.5 influence, +0.4 reputation",
    },
  ];

  ui.actionIntel.innerHTML = "";
  for (const row of rows) {
    const delta = estimateCashflowDelta(row.id);
    const deltaText = formatDeltaPerDay(delta);
    const deltaClass = delta === null || Math.abs(delta) < 1200 ? "" : delta >= 0 ? "positive" : "negative";

    const element = document.createElement("div");
    element.className = "intel-row";
    element.innerHTML = `
      <div class="intel-title"><span>${row.title}</span><span class="intel-cost">${row.cost}</span></div>
      <div class="intel-effect">effect: ${row.effect}</div>
      <div class="intel-delta ${deltaClass}">${deltaText}</div>
    `;
    ui.actionIntel.appendChild(element);
  }
}

function renderLocationBreakdown(loc) {
  const projected = !loc.owned;
  const simulatedLoc = projected
    ? {
        ...loc,
        owned: true,
        dcLevel: 1,
        servers: Math.round(10 + loc.market * 4),
        labs: loc.talent > 1.1 ? 1 : 0,
        contracts: 1,
        resilience: 0,
      }
    : loc;
  const econ = computeLocationEconomics(simulatedLoc);
  const reliability = computeLocationReliability(simulatedLoc);
  const mandateLoad = mandateDemandForLocationFrom(state, loc.id);

  const localEffects = state.effects
    .filter((effect) => effect.locationId === loc.id)
    .map((effect) => `${effect.label} (${effect.remaining.toFixed(1)}d)`);
  const effectLine = localEffects.length ? localEffects.join(" | ") : "No temporary regional events.";

  ui.locationBreakdown.innerHTML = `
    <div class="title">${projected ? "Projected Location Economics (if acquired)" : "Current Location Economics (per day)"}</div>
    <div class="line">Revenue contribution: ${formatMoney(econ.revenue)}</div>
    <div class="line">Energy: ${formatMoney(econ.energyCost)} | Legal: ${formatMoney(econ.legalCost)} | Ops: ${formatMoney(econ.operationsCost)}</div>
    <div class="line">Reliability: ${(reliability * 100).toFixed(1)}% | SLA demand units: ${mandateLoad.toFixed(1)}</div>
    <div class="line">Regional net contribution: ${econ.net >= 0 ? "+" : "-"}${formatMoney(Math.abs(econ.net))}</div>
    <div class="line">Regional effects: ${effectLine}</div>
  `;
}

function renderChallengePanel() {
  const challengeEconomics = computeChallengeEconomicsFrom(state);
  const avgReliability = averageReliabilityFrom(state);
  ui.challengeStatus.textContent =
    `Active mandates: ${state.slaContracts.length}/${CHALLENGE_SLOT_LIMIT} | ` +
    `SLA flow: +${formatMoney(challengeEconomics.revenue)}/day -${formatMoney(challengeEconomics.penalty)}/day | ` +
    `Avg uptime: ${(avgReliability * 100).toFixed(1)}% | Won ${state.challengeStats.won} / Failed ${state.challengeStats.failed}`;

  if (state.challengeOffer) {
    const offer = state.challengeOffer;
    const recommended = state.locations.find((loc) => loc.id === offer.recommendedLocationId)?.name ?? "Any";
    ui.challengeOffer.innerHTML =
      `<strong>${offer.title}</strong><br>` +
      `Sector: ${getSectorLabel(offer.sectorId)} | Target: ${(offer.requiredReliability * 100).toFixed(1)}% uptime | ` +
      `${offer.durationDays} days<br>` +
      `Reward/day: ${formatMoney(offer.rewardPerDay)} | Penalty/day: ${formatMoney(offer.penaltyPerDay)} | ` +
      `Demand units: ${offer.demandUnits}<br>` +
      `Recommended site: ${recommended} | Expires in ${offer.expiresDays.toFixed(1)} days`;
  } else {
    ui.challengeOffer.textContent = "No pending SLA bids. New offers appear as your global footprint grows.";
  }

  const selected = selectedLocation();
  ui.acceptOfferBtn.disabled =
    !state.challengeOffer || !selected.owned || state.slaContracts.length >= CHALLENGE_SLOT_LIMIT;
  ui.acceptOfferBtn.textContent =
    state.challengeOffer && selected.owned
      ? `Accept SLA in ${selected.name} (O)`
      : "Accept SLA Offer (O)";

  ui.challengeContracts.innerHTML = "";
  if (!state.slaContracts.length) {
    const empty = document.createElement("div");
    empty.className = "challenge-contract";
    empty.textContent = "No active SLA mandates. Accept offers to unlock high-risk, high-reward contracts.";
    ui.challengeContracts.appendChild(empty);
    return;
  }

  for (const contract of state.slaContracts) {
    const loc = state.locations.find((item) => item.id === contract.locationId);
    const reliability = loc ? computeLocationReliability(loc) : 0;
    const meets = reliability >= contract.requiredReliability;

    const card = document.createElement("div");
    card.className = "challenge-contract";
    card.innerHTML = `
      <div class="name"><span>${contract.title}</span><span>${contract.remainingDays.toFixed(1)}d</span></div>
      <div>${loc?.name ?? "Unknown site"} | ${getSectorLabel(contract.sectorId)} | demand ${contract.demandUnits}</div>
      <div>Target ${(contract.requiredReliability * 100).toFixed(1)}% | Current ${(reliability * 100).toFixed(1)}%</div>
      <div class="${meets ? "ok" : "warn"}">${meets ? "SLA healthy" : "SLA at risk"} | +${formatMoney(contract.rewardPerDay)}/day / -${formatMoney(contract.penaltyPerDay)}/day</div>
    `;
    ui.challengeContracts.appendChild(card);
  }
}

function initializeStaticUi() {
  ui.speedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const speed = Number(button.dataset.speed);
      state.speed = Number.isFinite(speed) ? speed : 1;
      ui.speedButtons.forEach((node) => node.classList.toggle("active", node === button));
    });
  });

  for (const sector of MARKET_SECTORS) {
    const button = document.createElement("button");
    button.textContent = sector.label;
    button.dataset.focusId = sector.id;
    button.addEventListener("click", () => {
      state.focus = sector.id;
      refreshUI();
    });
    ui.focusButtonsWrap.appendChild(button);

    const row = document.createElement("div");
    row.className = "market-row";
    row.dataset.marketId = sector.id;
    row.innerHTML = `<span>${sector.label}</span><div class="bar"><div></div></div><strong>0%</strong>`;
    ui.marketBars.appendChild(row);
  }

  for (const model of AI_MODELS) {
    const card = document.createElement("article");
    card.className = "model-card";
    card.dataset.modelId = model.id;
    card.innerHTML = `
      <h3>${model.name}</h3>
      <p>${model.desc}</p>
      <p>Tier ${model.tier} | Cost ${formatMoney(model.moneyCost)} + ${model.dataCost} PB + ${model.patentReq} patents</p>
      <p>Impact: ${summarizeModelBonuses(model)}</p>
      <button>Deploy Model</button>
    `;
    card.querySelector("button")?.addEventListener("click", () => buyOrActivateModel(model.id));
    ui.modelsList.appendChild(card);
  }

  for (const node of RESEARCH_NODES) {
    const card = document.createElement("article");
    card.className = "research-node locked";
    card.dataset.researchId = node.id;
    card.innerHTML = `
      <div class="card-meta"><span class="badge ${node.branch}">${node.branch}</span></div>
      <h3>${node.name}</h3>
      <p>${node.desc}</p>
      <p>${formatMoney(node.fundingCost)} | ${node.rpCost} RP</p>
      <p>Impact: ${summarizeModifierEffects(node.effects)}</p>
      <button>Start Research</button>
    `;
    card.querySelector("button")?.addEventListener("click", () => startResearch(node.id));
    ui.researchTree.appendChild(card);
  }

  for (const node of STRATEGY_NODES) {
    const card = document.createElement("article");
    card.className = "strategy-node locked";
    card.dataset.strategyId = node.id;
    card.innerHTML = `
      <div class="card-meta"><span class="badge ${node.branch}">${node.branch}</span></div>
      <h3>${node.name}</h3>
      <p>${node.desc}</p>
      <p>${formatMoney(node.moneyCost)} | ${node.influenceCost} influence | ${node.patentCost} patents</p>
      <p>Impact: ${summarizeModifierEffects(node.effects)}</p>
      <button>Adopt Strategy</button>
    `;
    card.querySelector("button")?.addEventListener("click", () => unlockStrategy(node.id));
    ui.strategyTree.appendChild(card);
  }

  ui.zoomOutBtn?.addEventListener("click", () => {
    setMapZoom(state.mapView.zoom / 1.2);
    refreshUI();
    render();
  });
  ui.zoomResetBtn?.addEventListener("click", () => {
    resetMapView();
    refreshUI();
    render();
  });
  ui.zoomInBtn?.addEventListener("click", () => {
    setMapZoom(state.mapView.zoom * 1.2);
    refreshUI();
    render();
  });
}

function refreshUI() {
  updateAgiProgram();

  ui.funds.textContent = formatMoney(state.money);
  ui.cashflow.textContent = `${formatMoney(state.cashflowPerDay)}/day`;
  ui.researchRate.textContent = `${researchRatePerDay().toFixed(1)} RP/day`;
  ui.dataUnits.textContent = `${state.dataUnits.toFixed(0)} PB`;
  ui.talent.textContent = `${state.talent.toFixed(1)}`;
  ui.patents.textContent = `${state.patents.toFixed(1)}`;
  ui.influence.textContent = `${state.influence.toFixed(1)}`;
  ui.reputation.textContent = `${state.reputation.toFixed(1)}`;
  ui.emissions.textContent = `${state.emissionsKilotons.toFixed(1)} kt`;
  ui.modelTier.textContent = currentModel().name;
  ui.valuation.textContent = formatMoney(state.valuation);
  ui.riskLevel.textContent = computeRiskLabel();
  ui.date.textContent = `Year ${state.year}, Day ${state.day}`;
  ui.agiProgressText.textContent = `AGI Program: ${state.agi.progress.toFixed(1)}%`;
  ui.agiProgressBar.style.width = `${clamp(state.agi.progress, 0, 100).toFixed(1)}%`;
  ui.agiAchieved.textContent = state.agi.achieved
    ? `Achieved: Year ${state.agi.achievedYear}, Day ${state.agi.achievedDay}`
    : "Not achieved";
  ui.agiAchieved.style.color = state.agi.achieved ? "#9df9c5" : "#9ec8ea";
  ui.zoomLabel.textContent = `Zoom ${state.mapView.zoom.toFixed(2)}x${state.mapView.zoom > 1.01 ? " (drag map to pan)" : ""}`;
  ui.zoomInBtn.disabled = state.mapView.zoom >= MAP_ZOOM_MAX - 0.001;
  ui.zoomOutBtn.disabled = state.mapView.zoom <= MAP_ZOOM_MIN + 0.001;
  ui.zoomResetBtn.disabled =
    Math.abs(state.mapView.zoom - 1) < 0.001 &&
    Math.abs(state.mapView.panX) < 0.05 &&
    Math.abs(state.mapView.panY) < 0.05;

  const loc = selectedLocation();
  const owned = loc.owned;
  const acquireCost = costAcquire(loc);
  const upCost = owned ? costUpgradeDc(loc) : 0;
  const srvCost = owned ? costBuyServer(loc) : 0;
  const labCost = owned ? costBuildLab(loc) : 0;

  const energyMod = locationEventMultiplier("energy", loc.id);
  const legalMod = locationEventMultiplier("legal", loc.id);
  const reliability = computeLocationReliability(loc);
  const reliabilityText = owned ? `${(reliability * 100).toFixed(1)}%` : "n/a";

  ui.locationSummary.textContent = `${loc.name}, ${loc.country} | Energy ${loc.energy.toFixed(2)}x${energyMod > 1 ? ` (${energyMod.toFixed(2)}x event)` : ""} | Legal ${loc.legal.toFixed(2)}x${legalMod > 1 ? ` (${legalMod.toFixed(2)}x event)` : ""} | Tax ${loc.tax.toFixed(2)}x | Climate ${loc.climate.toFixed(2)}x | Talent ${loc.talent.toFixed(2)}x | Contracts ${loc.contracts || 0} | Reliability ${reliabilityText} | Resilience ${loc.resilience || 0}`;

  ui.acquireBtn.textContent = owned ? "Location Owned" : `Acquire (${formatMoney(acquireCost)})`;
  ui.acquireBtn.disabled = owned || state.money < acquireCost;

  ui.upgradeDcBtn.textContent = owned ? `Upgrade DC (${formatMoney(upCost)})` : "Upgrade Data Center";
  ui.upgradeDcBtn.disabled = !owned || state.money < upCost;

  ui.buyServerBtn.textContent = owned ? `Buy Server (${formatMoney(srvCost)})` : "Buy Server Cluster";
  ui.buyServerBtn.disabled = !owned || state.money < srvCost;

  ui.buildLabBtn.textContent = owned ? `Build Lab (${formatMoney(labCost)})` : "Build Research Lab";
  ui.buildLabBtn.disabled = !owned || state.money < labCost;

  ui.gatherDataBtn.textContent = `Gather Data (${formatMoney(320_000)})`;
  ui.gatherDataBtn.disabled = state.money < 320_000;

  ui.recruitBtn.textContent = `Recruit Talent (${formatMoney(280_000)})`;
  ui.recruitBtn.disabled = state.money < 280_000;

  ui.patentBtn.textContent = `File Patent (${formatMoney(210_000)} + 15PB)`;
  ui.patentBtn.disabled = state.money < 210_000 || state.dataUnits < 15;

  ui.contractBtn.textContent = owned ? `Sign Contract (${formatMoney(140_000)} + 2 inf)` : "Sign Enterprise Contract";
  ui.contractBtn.disabled = !owned || state.money < 140_000 || state.influence < 2;

  const hardenCost = owned ? costHardenSite(loc) : 0;
  ui.hardenBtn.textContent = owned ? `Harden Site (${formatMoney(hardenCost)})` : "Harden Site";
  ui.hardenBtn.disabled = !owned || state.money < hardenCost;

  ui.lobbyBtn.textContent = `Policy Campaign (${formatMoney(360_000)})`;
  ui.lobbyBtn.disabled = state.money < 360_000;

  renderLocationBreakdown(loc);
  renderActionIntel(loc);
  renderChallengePanel();

  for (const button of ui.focusButtonsWrap.querySelectorAll("button")) {
    button.classList.toggle("active", button.dataset.focusId === state.focus);
  }

  for (const row of ui.marketBars.querySelectorAll(".market-row")) {
    const id = row.dataset.marketId;
    const info = state.sectors.find((entry) => entry.id === id);
    if (!info) continue;
    const fill = row.querySelector(".bar > div");
    const label = row.querySelector("strong");
    if (fill) fill.style.transform = `scaleX(${info.playerShare.toFixed(3)})`;
    if (label) label.textContent = `${Math.round(info.playerShare * 100)}%`;
  }

  for (const card of ui.modelsList.querySelectorAll(".model-card")) {
    const model = AI_MODELS.find((entry) => entry.id === card.dataset.modelId);
    if (!model) continue;

    const button = card.querySelector("button");
    const ownedModel = state.modelsOwned.has(model.id);
    const reqResearchOk = !model.researchReq || state.researchDone.has(model.researchReq);
    const reqStrategyOk = !model.strategyReq || state.strategyDone.has(model.strategyReq);
    const affordable =
      state.money >= model.moneyCost &&
      state.dataUnits >= model.dataCost &&
      state.talent >= model.talentReq &&
      state.patents >= model.patentReq;

    card.style.borderColor = state.activeModelId === model.id ? "#ffcf89" : "rgba(97,156,219,0.46)";

    if (!button) continue;
    if (state.activeModelId === model.id) {
      button.textContent = "Active";
      button.disabled = false;
    } else if (ownedModel) {
      button.textContent = "Activate";
      button.disabled = false;
    } else if (!reqResearchOk || !reqStrategyOk) {
      button.textContent = "Locked by Tree";
      button.disabled = true;
    } else {
      button.textContent = "Develop Model";
      button.disabled = !affordable;
    }
  }

  for (const card of ui.researchTree.querySelectorAll(".research-node")) {
    const node = RESEARCH_NODES.find((entry) => entry.id === card.dataset.researchId);
    if (!node) continue;

    card.classList.remove("locked", "available", "done", "active");
    const button = card.querySelector("button");

    const done = state.researchDone.has(node.id);
    const active = state.researching && state.researching.id === node.id;
    const prereqsOk = node.prereqs.every((req) => state.researchDone.has(req));

    if (done) {
      card.classList.add("done");
      if (button) {
        button.textContent = "Completed";
        button.disabled = true;
      }
      continue;
    }

    if (active) {
      card.classList.add("active");
      if (button) {
        button.textContent = "Researching";
        button.disabled = true;
      }
      continue;
    }

    if (prereqsOk) {
      card.classList.add("available");
      if (button) {
        button.textContent = "Start Research";
        button.disabled = !!state.researching || state.money < node.fundingCost;
      }
      continue;
    }

    card.classList.add("locked");
    if (button) {
      button.textContent = "Prerequisites Needed";
      button.disabled = true;
    }
  }

  for (const card of ui.strategyTree.querySelectorAll(".strategy-node")) {
    const node = STRATEGY_NODES.find((entry) => entry.id === card.dataset.strategyId);
    if (!node) continue;

    card.classList.remove("locked", "available", "done");
    const button = card.querySelector("button");
    const done = state.strategyDone.has(node.id);

    if (done) {
      card.classList.add("done");
      if (button) {
        button.textContent = "Adopted";
        button.disabled = true;
      }
      continue;
    }

    if (canUnlockStrategy(node)) {
      card.classList.add("available");
      if (button) {
        button.textContent = "Adopt Strategy";
        button.disabled = false;
      }
      continue;
    }

    card.classList.add("locked");
    if (button) {
      button.textContent = "Locked";
      button.disabled = true;
    }
  }

  if (state.researching) {
    const node = RESEARCH_NODES.find((entry) => entry.id === state.researching.id);
    ui.researchProgressWrap.classList.remove("hidden");
    ui.researchingName.textContent = node ? node.name : "Research";

    const remain = Math.max(0, state.researching.rpCost - state.researching.progress);
    const days = remain / Math.max(0.1, researchRatePerDay());
    ui.researchingTime.textContent = `${days.toFixed(1)} days left`;

    const progressPct = clamp(state.researching.progress / state.researching.rpCost, 0, 1);
    ui.researchProgressBar.style.width = `${(progressPct * 100).toFixed(1)}%`;
  } else {
    ui.researchProgressWrap.classList.add("hidden");
    ui.researchProgressBar.style.width = "0%";
  }

  ui.eventFeed.innerHTML = "";
  for (const line of state.feed) {
    const item = document.createElement("li");
    item.textContent = line;
    ui.eventFeed.appendChild(item);
  }
}

function drawClouds(width, height) {
  for (const cloud of state.clouds) {
    const driftLon = ((cloud.lon + state.renderClock * cloud.drift) % 360) - 180;
    const point = projectLonLatView(driftLon, cloud.lat, width, height);
    const pulse = 1 + Math.sin(state.renderClock * 0.6 + cloud.phase) * 0.18;
    ctx.fillStyle = `rgba(214, 237, 252, ${(cloud.opacity * pulse).toFixed(3)})`;
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, cloud.rx * pulse, cloud.ry * pulse, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawNightLights(width, height) {
  ctx.fillStyle = "rgba(255, 235, 183, 0.26)";
  for (const loc of MAP_LOCATIONS) {
    const point = projectLonLatView(loc.lon, loc.lat, width, height);
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2.1 + (loc.market - 0.9) * 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawNetwork(width, height) {
  const owned = ownedLocations();
  if (owned.length < 2) return;

  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(92, 242, 233, 0.45)";

  for (let i = 0; i < owned.length; i += 1) {
    const from = owned[i];
    const to = owned[(i + 1) % owned.length];
    const p0 = projectLonLatView(from.lon, from.lat, width, height);
    const p1 = projectLonLatView(to.lon, to.lat, width, height);

    const arcHeight = Math.max(22, Math.abs(p1.x - p0.x) * 0.08 + 16);

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.quadraticCurveTo((p0.x + p1.x) / 2, Math.min(p0.y, p1.y) - arcHeight, p1.x, p1.y);
    ctx.stroke();

    const t = (state.networkPhase + i * 0.17) % 1;
    const px = p0.x + (p1.x - p0.x) * t;
    const py = p0.y + (p1.y - p0.y) * t - Math.sin(t * Math.PI) * arcHeight * 0.72;

    ctx.fillStyle = "rgba(147, 255, 244, 0.95)";
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLocations(width, height) {
  const selectedId = state.selectedLocationId;

  for (const loc of state.locations) {
    const point = projectLonLatView(loc.lon, loc.lat, width, height);
    const pulse = 1 + Math.sin(state.renderClock * 2.8 + point.x * 0.01) * 0.18;

    if (loc.owned) {
      ctx.fillStyle = "rgba(108, 255, 231, 0.2)";
      ctx.beginPath();
      ctx.arc(point.x, point.y, 15 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = loc.owned ? "#5bf6d5" : "#5b7fa8";
    ctx.beginPath();
    ctx.arc(point.x, point.y, loc.owned ? 7.5 : 5.4, 0, Math.PI * 2);
    ctx.fill();

    if (selectedId === loc.id) {
      ctx.strokeStyle = "rgba(255, 210, 124, 0.95)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 12, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.font = "600 11px Manrope";
    ctx.fillStyle = "rgba(228, 242, 255, 0.95)";
    ctx.fillText(loc.name, point.x + 9, point.y - 7);

    if (loc.owned) {
      ctx.fillStyle = "rgba(162, 217, 255, 0.92)";
      ctx.font = "500 10px Manrope";
      ctx.fillText(`S:${loc.servers} L:${loc.labs} C:${loc.contracts || 0} R:${loc.resilience || 0}`, point.x + 9, point.y + 7);
    }
  }
}

function drawHud(width) {
  const leftW = 364;
  const rightW = 292;

  ctx.fillStyle = "rgba(4, 14, 34, 0.78)";
  ctx.fillRect(14, 14, leftW, 146);
  ctx.strokeStyle = "rgba(123, 197, 255, 0.45)";
  ctx.strokeRect(14, 14, leftW, 146);

  ctx.fillStyle = "#ddf0ff";
  ctx.font = "700 17px Oxanium";
  ctx.fillText("Global Operations", 26, 38);

  ctx.font = "500 12px Manrope";
  ctx.fillStyle = "#a6cde9";
  ctx.fillText(`Data centers: ${ownedLocations().length}   Servers: ${totalServers()}   Labs: ${totalLabs()}`, 26, 60);
  ctx.fillText(`Talent: ${state.talent.toFixed(1)}   Patents: ${state.patents.toFixed(1)}   Influence: ${state.influence.toFixed(1)}`, 26, 80);
  ctx.fillText(`Cashflow: ${formatMoney(state.cashflowPerDay)}/day   Risk: ${computeRiskLabel()}`, 26, 100);
  ctx.fillText(
    `Focus: ${MARKET_SECTORS.find((item) => item.id === state.focus)?.label ?? "Cloud"}   Model: ${currentModel().tier}   AGI: ${state.agi.progress.toFixed(1)}%`,
    26,
    120,
  );
  ctx.fillText(`Active SLA mandates: ${state.slaContracts.length}   Reliability: ${(averageReliabilityFrom(state) * 100).toFixed(1)}%`, 26, 138);

  const rank = [...state.competitors.map((corp) => ({ name: corp.name, score: corp.capital })), { name: "You", score: state.valuation }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  ctx.fillStyle = "rgba(4, 14, 34, 0.78)";
  ctx.fillRect(width - rightW - 14, 14, rightW, 152);
  ctx.strokeStyle = "rgba(123, 197, 255, 0.45)";
  ctx.strokeRect(width - rightW - 14, 14, rightW, 152);

  ctx.fillStyle = "#ddf0ff";
  ctx.font = "700 15px Oxanium";
  ctx.fillText("Megacorp Leaderboard", width - rightW, 36);

  ctx.font = "500 12px Manrope";
  for (let i = 0; i < rank.length; i += 1) {
    const item = rank[i];
    ctx.fillStyle = item.name === "You" ? "#ffd38d" : "#bbd8ef";
    ctx.fillText(`${i + 1}. ${item.name}`, width - rightW, 58 + i * 19);
    ctx.fillText(formatMoney(item.score), width - 106, 58 + i * 19);
  }
}

function render() {
  const width = canvas.width;
  const height = canvas.height;
  const frame = getMapFrame(width, height);
  drawWorldMapBase(width, height);

  ctx.save();
  ctx.beginPath();
  ctx.rect(frame.x, frame.y, frame.w, frame.h);
  ctx.clip();
  drawClouds(width, height);
  drawNightLights(width, height);
  drawNetwork(width, height);
  drawLocations(width, height);
  ctx.restore();

  drawHud(width);
}

function update(deltaSeconds) {
  state.renderClock += deltaSeconds;
  state.networkPhase = (state.networkPhase + deltaSeconds * 0.17) % 1;

  if (state.mode === "play" && state.speed > 0) {
    const days = (deltaSeconds * state.speed) / SECONDS_PER_DAY;
    simulateGameDays(days);
  }

  state.uiRefreshAccumulator += deltaSeconds;
  if (state.uiRefreshAccumulator >= 0.15) {
    state.uiRefreshAccumulator = 0;
    refreshUI();
  }
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, Math.floor(rect.width));
  canvas.height = Math.max(1, Math.floor(rect.height));
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  clampMapPan(canvas.width, canvas.height);
  rebuildWorldMapLayer();
}

function toCanvasPosition(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function findLocationAt(x, y) {
  if (!isPointInsideMapFrame(x, y, canvas.width, canvas.height)) {
    return null;
  }

  for (const loc of state.locations) {
    const point = projectLonLatView(loc.lon, loc.lat, canvas.width, canvas.height);
    const dx = x - point.x;
    const dy = y - point.y;
    if (dx * dx + dy * dy <= 14 * 14) {
      return loc;
    }
  }
  return null;
}

function setupInteractions() {
  const startGame = () => {
    state.mode = "play";
    ui.menuOverlay.classList.remove("visible");
    addFeed("Company founded in Ashburn. Initial cloud contracts are online.");
    addFeed("Primary objective: achieve AGI and record the year of the breakthrough.");
    refreshUI();
  };

  ui.startBtn.addEventListener("click", () => {
    startGame();
  });

  ui.acquireBtn.addEventListener("click", acquireSelectedLocation);
  ui.upgradeDcBtn.addEventListener("click", upgradeDc);
  ui.buyServerBtn.addEventListener("click", buyServerCluster);
  ui.buildLabBtn.addEventListener("click", buildResearchLab);
  ui.gatherDataBtn.addEventListener("click", gatherTrainingData);
  ui.recruitBtn.addEventListener("click", recruitTalent);
  ui.patentBtn.addEventListener("click", filePatent);
  ui.contractBtn.addEventListener("click", signEnterpriseContract);
  ui.hardenBtn.addEventListener("click", hardenSite);
  ui.lobbyBtn.addEventListener("click", runPolicyCampaign);
  ui.acceptOfferBtn.addEventListener("click", acceptChallengeOffer);

  canvas.addEventListener("pointerdown", (event) => {
    if (state.mode !== "play") return;
    const point = toCanvasPosition(event.clientX, event.clientY);
    if (!isPointInsideMapFrame(point.x, point.y, canvas.width, canvas.height)) return;

    state.mapDrag.active = true;
    state.mapDrag.moved = false;
    state.mapDrag.pointerId = event.pointerId;
    state.mapDrag.startX = point.x;
    state.mapDrag.startY = point.y;
    state.mapDrag.lastX = point.x;
    state.mapDrag.lastY = point.y;
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!state.mapDrag.active || state.mapDrag.pointerId !== event.pointerId) return;

    const point = toCanvasPosition(event.clientX, event.clientY);
    const dx = point.x - state.mapDrag.lastX;
    const dy = point.y - state.mapDrag.lastY;
    const dragDistance = Math.hypot(point.x - state.mapDrag.startX, point.y - state.mapDrag.startY);

    if (dragDistance > 4) {
      state.mapDrag.moved = true;
    }

    if (state.mapDrag.moved && state.mapView.zoom > 1.001) {
      state.mapView.panX += dx / state.mapView.zoom;
      state.mapView.panY += dy / state.mapView.zoom;
      clampMapPan(canvas.width, canvas.height);
      refreshUI();
      render();
    }

    state.mapDrag.lastX = point.x;
    state.mapDrag.lastY = point.y;
  });

  canvas.addEventListener("pointerup", (event) => {
    if (!state.mapDrag.active || state.mapDrag.pointerId !== event.pointerId) return;

    const point = toCanvasPosition(event.clientX, event.clientY);
    if (!state.mapDrag.moved) {
      const loc = findLocationAt(point.x, point.y);
      if (loc) {
        state.selectedLocationId = loc.id;
      }
    }

    state.mapDrag.active = false;
    state.mapDrag.pointerId = null;
    state.mapDrag.moved = false;
    canvas.releasePointerCapture(event.pointerId);
    refreshUI();
  });

  canvas.addEventListener("pointercancel", () => {
    state.mapDrag.active = false;
    state.mapDrag.pointerId = null;
    state.mapDrag.moved = false;
  });

  canvas.addEventListener(
    "wheel",
    (event) => {
      const frame = getMapFrame(canvas.width, canvas.height);
      const point = toCanvasPosition(event.clientX, event.clientY);
      if (point.x < frame.x || point.x > frame.x + frame.w || point.y < frame.y || point.y > frame.y + frame.h) {
        return;
      }
      event.preventDefault();
      const factor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
      setMapZoom(state.mapView.zoom * factor);
      refreshUI();
      render();
    },
    { passive: false },
  );

  window.addEventListener("keydown", (event) => {
    if (state.mode === "menu" && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      startGame();
      return;
    }

    if (state.mode === "play") {
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setMapZoom(state.mapView.zoom * 1.2);
        refreshUI();
        render();
        return;
      }
      if (event.key === "-") {
        event.preventDefault();
        setMapZoom(state.mapView.zoom / 1.2);
        refreshUI();
        render();
        return;
      }
      if (event.key === "0") {
        event.preventDefault();
        resetMapView();
        refreshUI();
        render();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        cycleSelectedLocation(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        cycleSelectedLocation(1);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        cycleFocus(-1);
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        cycleFocus(1);
        return;
      }
      if (event.key.toLowerCase() === "a") {
        event.preventDefault();
        const loc = selectedLocation();
        if (!loc.owned) acquireSelectedLocation();
        else upgradeDc();
        return;
      }
      if (event.key.toLowerCase() === "b") {
        event.preventDefault();
        buildResearchLab();
        return;
      }
      if (event.key.toLowerCase() === "c") {
        event.preventDefault();
        buyServerCluster();
        return;
      }
      if (event.key.toLowerCase() === "d") {
        event.preventDefault();
        recruitTalent();
        return;
      }
      if (event.key.toLowerCase() === "e") {
        event.preventDefault();
        filePatent();
        return;
      }
      if (event.key.toLowerCase() === "h") {
        event.preventDefault();
        hardenSite();
        return;
      }
      if (event.key.toLowerCase() === "k") {
        event.preventDefault();
        signEnterpriseContract();
        return;
      }
      if (event.key.toLowerCase() === "l") {
        event.preventDefault();
        runPolicyCampaign();
        return;
      }
      if (event.key === " ") {
        event.preventDefault();
        gatherTrainingData();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        startNextResearch();
        return;
      }
      if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        startNextStrategy();
        return;
      }
      if (event.key.toLowerCase() === "o") {
        event.preventDefault();
        acceptChallengeOffer();
      }
    }

    if (event.key.toLowerCase() === "f") {
      toggleFullscreen();
    }
    if (event.key === "Escape" && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  });

  window.addEventListener("resize", () => {
    resizeCanvas();
    render();
  });
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

let rafId = 0;
let lastTimestamp = 0;

function frame(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const deltaSeconds = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
  lastTimestamp = timestamp;

  update(deltaSeconds);
  render();
  rafId = window.requestAnimationFrame(frame);
}

window.advanceTime = (ms) => {
  const steps = Math.max(1, Math.round(ms / (1000 / 60)));
  const deltaSeconds = 1 / 60;
  for (let i = 0; i < steps; i += 1) {
    update(deltaSeconds);
  }
  render();
};

window.render_game_to_text = () => {
  const frame = getMapFrame(canvas.width, canvas.height);
  const locationState = state.locations.map((loc) => ({
    id: loc.id,
    name: loc.name,
    country: loc.country,
    lon: Number(loc.lon.toFixed(2)),
    lat: Number(loc.lat.toFixed(2)),
    owned: loc.owned,
    selected: loc.id === state.selectedLocationId,
    data_center_level: loc.dcLevel,
    servers: loc.servers,
    labs: loc.labs,
    contracts: loc.contracts || 0,
    resilience: loc.resilience || 0,
    reliability: Number(computeLocationReliability(loc).toFixed(4)),
    energy_multiplier: Number(loc.energy.toFixed(2)),
    legal_multiplier: Number(loc.legal.toFixed(2)),
    tax_multiplier: Number(loc.tax.toFixed(2)),
    climate_multiplier: Number(loc.climate.toFixed(2)),
  }));

  const sectorState = state.sectors.map((sector) => ({
    id: sector.id,
    share: Number(sector.playerShare.toFixed(3)),
    demand: Number(sector.demand.toFixed(3)),
    focused: state.focus === sector.id,
  }));

  const payload = {
    coordinate_system: "Map is equirectangular projection with lon/lat, origin at top-left in render space.",
    mode: state.mode,
    time: { year: state.year, day: state.day, speed: state.speed },
    company: {
      money: Number(state.money.toFixed(2)),
      cashflow_per_day: Number(state.cashflowPerDay.toFixed(2)),
      valuation: Number(state.valuation.toFixed(2)),
      data_units_pb: Number(state.dataUnits.toFixed(2)),
      talent: Number(state.talent.toFixed(2)),
      patents: Number(state.patents.toFixed(2)),
      influence: Number(state.influence.toFixed(2)),
      reputation: Number(state.reputation.toFixed(2)),
      emissions_kt: Number(state.emissionsKilotons.toFixed(2)),
      risk_score: Number(state.riskScore.toFixed(3)),
      active_model: currentModel().name,
      research_rate_per_day: Number(researchRatePerDay().toFixed(2)),
      agi_progress_pct: Number(state.agi.progress.toFixed(2)),
    },
    world: {
      map_ready: worldMap.ready,
      map_features: worldMap.features.length,
      map_zoom: Number(state.mapView.zoom.toFixed(3)),
      map_pan: {
        x: Number(state.mapView.panX.toFixed(2)),
        y: Number(state.mapView.panY.toFixed(2)),
      },
      map_frame: {
        x: Number(frame.x.toFixed(2)),
        y: Number(frame.y.toFixed(2)),
        width: Number(frame.w.toFixed(2)),
        height: Number(frame.h.toFixed(2)),
      },
      locations: locationState,
      sectors: sectorState,
      competitors: state.competitors.map((corp) => ({
        name: corp.name,
        specialty: corp.specialty,
        capital: Number(corp.capital.toFixed(2)),
      })),
      global_effects: state.effects.map((effect) => ({
        type: effect.type,
        locationId: effect.locationId ?? null,
        remaining_days: Number(effect.remaining.toFixed(2)),
      })),
    },
    challenges: {
      offer: state.challengeOffer
        ? {
            title: state.challengeOffer.title,
            sector: state.challengeOffer.sectorId,
            required_reliability: Number(state.challengeOffer.requiredReliability.toFixed(4)),
            demand_units: state.challengeOffer.demandUnits,
            reward_per_day: state.challengeOffer.rewardPerDay,
            penalty_per_day: state.challengeOffer.penaltyPerDay,
            expires_days: Number(state.challengeOffer.expiresDays.toFixed(2)),
          }
        : null,
      active_contracts: state.slaContracts.map((contract) => ({
        id: contract.id,
        title: contract.title,
        location_id: contract.locationId,
        sector: contract.sectorId,
        required_reliability: Number(contract.requiredReliability.toFixed(4)),
        current_reliability: Number((contract.lastReliability ?? 0).toFixed(4)),
        remaining_days: Number(contract.remainingDays.toFixed(2)),
        reward_per_day: contract.rewardPerDay,
        penalty_per_day: contract.penaltyPerDay,
      })),
      revenue_per_day: Number(state.challengeRevenuePerDay.toFixed(2)),
      penalty_per_day: Number(state.challengePenaltyPerDay.toFixed(2)),
      won: state.challengeStats.won,
      failed: state.challengeStats.failed,
    },
    research: {
      active: state.researching
        ? {
            id: state.researching.id,
            progress_rp: Number(state.researching.progress.toFixed(2)),
            total_rp: state.researching.rpCost,
          }
        : null,
      completed: [...state.researchDone],
    },
    strategy: {
      adopted: [...state.strategyDone],
    },
    models: {
      owned: [...state.modelsOwned],
      active: state.activeModelId,
    },
    agi_goal: {
      progress_pct: Number(state.agi.progress.toFixed(2)),
      achieved: state.agi.achieved,
      achieved_year: state.agi.achievedYear,
      achieved_day: state.agi.achievedDay,
    },
    events: state.feed.slice(0, 6),
  };

  return JSON.stringify(payload);
};

function boot() {
  initializeStaticUi();
  setupInteractions();
  resizeCanvas();
  loadWorldMapData();
  addFeed("Board mandate: scale from one data center into a planetary AI megacorp.");
  addFeed("Executive challenge: take high-value SLA mandates without sacrificing reliability.");
  refreshUI();
  render();
  rafId = window.requestAnimationFrame(frame);
}

boot();

window.addEventListener("beforeunload", () => {
  if (rafId) window.cancelAnimationFrame(rafId);
});
