export const stateOptions = [
  { key: 'tripura', value: 'Tripura' },
  { key: 'assam', value: 'Assam' },
  { key: 'delhi', value: 'Delhi' },
  { key: 'west_bengal', value: 'West Bengal' },
];

export const sectorOptions = [
  { key: 'power', value: 'Power & Utilities' },
  { key: 'transport', value: 'Road & Rail Transport' },
  { key: 'industry', value: 'Steel & Cement' },
  { key: 'agri', value: 'Farms & Food Processing' },
  { key: 'buildings', value: 'Buildings & Construction' },
  { key: 'waste', value: 'Waste Management' },
];

export const activityOptions = [
  { key: 'cooking', value: 'LPG & Cooking Fuel' },
  { key: 'commute', value: 'Daily Commute' },
  { key: 'freight', value: 'Freight & Logistics' },
  { key: 'renewables', value: 'Solar Installations' },
  { key: 'forestry', value: 'Forestry & Offsets' },
];

export const companyOptions = [
  { key: 'ntpc', value: 'NTPC' },
  { key: 'ongc', value: 'ONGC' },
  { key: 'ongclpg', value: 'IOCL LPG' },
  { key: 'dmrc', value: 'Delhi Metro' },
  { key: 'gvk', value: 'GVK Power' },
];

export const productOptions = [
  { key: 'ev', value: 'Electric Vehicles' },
  { key: 'metro', value: 'Metro Rail' },
  { key: 'led', value: 'LED Bulbs' },
  { key: 'lpg', value: 'LPG Refills' },
  { key: 'rice', value: 'Low-methane Rice' },
];

export const years = [
  { key: '2025', value: '2025' },
  { key: '2024', value: '2024' },
  { key: '2023', value: '2023' },
  { key: '2022', value: '2022' },
];

export const stateEmissionByYear = {
  Tripura: [
    { year: '2025', value: 4.2 },
    { year: '2024', value: 4.0 },
    { year: '2023', value: 3.8 },
    { year: '2022', value: 3.5 },
  ],
  Assam: [
    { year: '2025', value: 16.5 },
    { year: '2024', value: 16.0 },
    { year: '2023', value: 15.4 },
    { year: '2022', value: 14.8 },
  ],
  Delhi: [
    { year: '2025', value: 32.0 },
    { year: '2024', value: 31.2 },
    { year: '2023', value: 30.0 },
    { year: '2022', value: 28.5 },
  ],
  'West Bengal': [
    { year: '2025', value: 54.0 },
    { year: '2024', value: 53.1 },
    { year: '2023', value: 52.3 },
    { year: '2022', value: 51.2 },
  ],
};

export const sliderSummary = [
  {
    id: 'tripura',
    icon: 'leaf',
    caption: 'State-wide grid & transport emissions for 2025',
    title: 'Tripura',
    amount: '4.2 Mt CO₂e',
    person: '0.95 t per person',
    approx: 'Clean cooking drive keeps growth low.',
    trend: stateEmissionByYear.Tripura,
  },
  {
    id: 'assam',
    icon: 'industry',
    caption: 'Refinery clusters drive most of the footprint',
    title: 'Assam',
    amount: '16.5 Mt CO₂e',
    person: '1.25 t per person',
    approx: 'Gas flare reduction trims 2024 peak.',
    trend: stateEmissionByYear.Assam,
  },
  {
    id: 'delhi',
    icon: 'city',
    caption: 'Urban transport + buildings dominate emissions',
    title: 'Delhi',
    amount: '32.0 Mt CO₂e',
    person: '1.70 t per person',
    approx: 'Metro electrification offsets road fuel.',
    trend: stateEmissionByYear.Delhi,
  },
  {
    id: 'west_bengal',
    icon: 'sun',
    caption: 'Coal-heavy grid meets rising demand',
    title: 'West Bengal',
    amount: '54.0 Mt CO₂e',
    person: '1.45 t per person',
    approx: 'New solar parks cap 2025 trajectory.',
    trend: stateEmissionByYear['West Bengal'],
  },
];

export const calculatorFactors = {
  airKm: 0.00016, // tonnes per passenger-km
  roadKm: 0.00012,
  metroKm: 0.00004,
  homeElectricity: 0.00082, // tonnes per kWh (average Indian grid)
  lpgCylinder: 0.0029, // tonnes per 14.2kg cylinder
  dietMultiplier: {
    veg: 0.8,
    mix: 1,
    meat: 1.2,
  },
  baseLifestyle: {
    Tripura: 0.6,
    Assam: 1.1,
    Delhi: 1.9,
    'West Bengal': 1.4,
  },
};

