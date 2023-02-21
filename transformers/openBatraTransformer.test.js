import * as openBatraTransformer from "./openBatraTransformer.js";
import * as openFoodNetworkTransformer from "./openFoodNetworkTransformer";

test("OpenBatra template", async () => {
  //openBatraProduct["s:manufacturer"] = manufacturer;

  const product = openBatraProduct;
  const context = openBatraTransformer.extractFromProduct(product);

  const logCiCaProduct = context.products[0];
  logCiCaProduct.ids.push("ofn_be/product/11212");

  const ofnProduct = openFoodNetworkTransformer.mapProduct(logCiCaProduct);

  console.log(JSON.stringify(ofnProduct, null, 2));
});

const openBatraProduct = {
  "@context": {
    gs1: "http://gs1.org/voc/",
    s: "https://schema.org/",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    "@vocab": "http://gs1.org/voc/",
  },
  "@type": ["gs1:Beverage", "s:Product"],
  "s:name": [{ "@value": "Jus de Pomme", "@language": "fr" }],
  regulatedProductName: [{ "@value": "Jus de Pomme", "@language": "fr" }],
  "s:description": [
    {
      "@value":
        "Jus de pomme - 100% Pur jus - Sans sucre ajout\u00e9 - Sans conservateur - Sans colorants - Non dilu\u00e9 - Naturellement trouble - Jus pasteuris\u00e9.",
      "@language": "fr",
    },
  ],
  productMarketingMessage: [
    {
      "@value":
        "Ce jus a \u00e9t\u00e9 r\u00e9alis\u00e9 \u00e0 partir de fruits r\u00e9colt\u00e9s avec amour par nos b\u00e9n\u00e9voles dans des jardins priv\u00e9s belges. Certains surplus ou invendus ont \u00e9galement \u00e9t\u00e9 rachet\u00e9s \u00e0 des agriculteurs belges afin d'\u00e9viter le gaspillage alimentaire. FruitCollect et ses b\u00e9n\u00e9voles r\u00e9coltent au gr\u00e9 des saisons. La production traditionnelle des jus en bouteille consign\u00e9e a quant \u00e0 elle \u00e9t\u00e9 r\u00e9alis\u00e9e par une petite entreprise familiale dans le Hainaut. Nos jus sont donc 100% anti-gaspillage et issus de l'\u00e9conomie circulaire. Diverses vari\u00e9t\u00e9s de pommes apportent chacune leurs qualit\u00e9s gustatives \u00e0 ce jus d'exception.  A d\u00e9guster id\u00e9alement \u00e0 tout moment de la journ\u00e9e!",
      "@language": "fr",
    },
  ],
  "s:image": {
    "s:url": {
      "@id":
        "https://jus-fruitcollect.odoo.com/web/image/product.product/42/image_1024/Pack%20Jus%20de%20Pomme%20-%2012%20x%201L?unique=5b5c9d2",
    },
    "@type": ["gs1:ReferencedFileDetails", "s:MediaObject"],
  },
  functionalName: [{ "@value": "Jus de pomme, pur jus", "@language": "fr" }],
  gpcCategoryCode: "10000223",
  "s:manufacturer": {
    taxID: "BE0642.831.371",
    vatID: "BE0642.831.371",
    globalLocationNumber: "5430001830002",
    name: [
      { "@language": "fr", "@value": "FruitCollect" },
      { "@language": "nl", "@value": "FruitCollect" },
    ],
    address: [
      {
        streetAddress: "Rue de Liedekerke 71",
        postalCode: "1210",
        addressLocality: "Saint-Josse-ten-Noode",
        addressCountry: "056",
      },
    ],
    contactPoint: [
      {
        contactTitle: "FruitCollect",
        contactType: "Support \u00e0 la client\u00e8le",
        availableLanguage: "fr",
        telephone: "+32 479 06 84 48 ",
        faxNumber: "",
        email: "fruitcollect@gmail.com",
        url: "https://jus-fruitcollect.odoo.com/shop/",
      },
    ],
    "@id": "5430001830002",
  },
  grossWeight: {
    "s:value": { "@value": "1200", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  netContent: {
    "s:value": { "@value": "1000", "@type": "xsd:float" },
    "s:unitCode": "MLT",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  consumerStorageInstructions: [
    {
      "@value":
        "Les jus FruitCollect se conservent au sec minimum 1 an apr\u00e8s livraison.",
      "@language": "fr",
    },
  ],
  supplierSpecifiedMinimumConsumerStorageDays: {
    "@value": "365",
    "@type": "xsd:integer",
  },
  consumerUsageInstructions: [
    {
      "@value":
        "Bien agiter avant ouverture, servir frais et \u00e0 consommer dans les 5 jours apr\u00e8s ouverture.",
      "@language": "fr",
    },
  ],
  isFromConcentrate: { "@id": "gs1:NonbinaryLogicCode-FALSE" },
  ingredientStatement: [{ "@value": "Pomme (100%)", "@language": "fr" }],
  preservationTechnique: {
    "@id": "gs1:PreservationTechniqueCode-PASTEURISATION",
  },
  countryOfOriginStatement: [
    { "@value": "Produit en Belgique", "@language": "fr" },
  ],
  countryOfOrigin: [
    { "@type": ["gs1:Country", "s:Country"], countryCode: "BE" },
  ],
  nutrientBasisQuantityType: {
    "@id": "gs1:NutrientBasisQuantityCode-BY_MEASURE",
  },
  nutrientBasisQuantity: {
    "s:value": "100",
    "s:unitCode": "GRM",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  fatPerNutrientBasis: {
    "s:value": { "@value": "0.14", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    dailyValueIntakePercent: { "@value": "9", "@type": "xsd:float" },
    "@type": "gs1:NutritionMeasurementType",
  },
  saturatedFatPerNutrientBasis: {
    "s:value": { "@value": "0.046", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    dailyValueIntakePercent: { "@value": "6", "@type": "xsd:float" },
    "@type": "gs1:NutritionMeasurementType",
  },
  carbohydratesPerNutrientBasis: {
    "s:value": { "@value": "11.4", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    dailyValueIntakePercent: { "@value": "11", "@type": "xsd:float" },
    "@type": "gs1:NutritionMeasurementType",
  },
  sugarsPerNutrientBasis: {
    "s:value": { "@value": "10.9", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    dailyValueIntakePercent: { "@value": "11", "@type": "xsd:float" },
    "@type": "gs1:NutritionMeasurementType",
  },
  saltPerNutrientBasis: {
    "s:value": { "@value": "0.022", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  proteinPerNutrientBasis: {
    "s:value": { "@value": "0.17", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  energyPerNutrientBasis: [
    {
      "s:value": { "@value": "208", "@type": "xsd:float" },
      "s:unitCode": "KJO",
      dailyValueIntakePercent: { "@value": "11", "@type": "xsd:float" },
      "@type": "gs1:NutritionMeasurementType",
    },
    {
      "s:value": { "@value": "48.9", "@type": "xsd:float" },
      "s:unitCode": "E14",
      dailyValueIntakePercent: { "@value": "10", "@type": "xsd:float" },
      "@type": "gs1:NutritionMeasurementType",
    },
  ],
  ingredient: [
    {
      "@type": "gs1:FoodBeverageTobaccoIngredientDetails",
      ingredientSequence: { "@type": "xsd:integer", "@value": 1 },
      ingredientName: [{ "@value": "Pomme", "@language": "fr" }],
      ingredientContentPercentage: { "@value": "100", "@type": "xsd:float" },
    },
  ],
  gtin: "05430001830002",
};
