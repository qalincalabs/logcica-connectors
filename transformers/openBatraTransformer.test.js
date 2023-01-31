import * as transformer from "./openBatraTransformer.js";


// todo add published date
test("OpenBatra clean up", () => {
  const product = openBatraProduct;
  const context = transformer.extractFromProduct(product);
  console.log(JSON.stringify(context, null, 2));
});

const openBatraProduct = {
  "@context": {
    gs1: "http://gs1.org/voc/",
    s: "https://schema.org/",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    "@vocab": "http://gs1.org/voc/",
  },
  "@type": ["gs1:Beverage", "s:Product"],
  "s:name": [
    {
      "@value": "Jus de Pomme",
      "@language": "fr",
    },
  ],
  regulatedProductName: [
    {
      "@value": "Jus de Pomme",
      "@language": "fr",
    },
  ],
  "s:description": [
    {
      "@value":
        "Ce jus a été réalisé à partir de fruits récoltés avec amour par nos bénévoles dans des jardins privés belges. Certains surplus ou invendus ont également été rachetés à des agriculteurs belges afin d'éviter le gaspillage alimentaire. FruitCollect et ses bénévoles récoltent au gré des saisons. La production traditionnelle des jus en bouteille consignée a quant à elle été réalisée par une petite entreprise familiale dans le Hainaut. Nos jus sont donc 100% anti-gaspillage et issus de l'économie circulaire.",
      "@language": "fr",
    },
  ],
  productMarketingMessage: [
    {
      "@value":
        "Diverses variétés de pommes apportent chacune leurs qualités gustatives à ce jus d'exception.  A déguster idéalement à tout moment de la journée!",
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
  functionalName: [
    {
      "@value": "Jus de pomme, pur jus",
      "@language": "fr",
    },
  ],
  gpcCategoryDescription: [
    {
      "@value": "Fruit Juice Drinks - Ready to Drink (Shelf Stable)",
      "@language": "en",
    },
  ],
  gpcCategoryCode: "10000223",
  "s:manufacturer": {
    taxID: "BE0642.831.371",
    vatID: "BE0642.831.371",
    globalLocationNumber: "5430001830002",
    name: [
      {
        "@language": "fr",
        "@value": "FruitCollect",
      },
      {
        "@language": "nl",
        "@value": "FruitCollect",
      },
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
        contactType: "Support à la clientèle",
        availableLanguage: "fr",
        telephone: "+32 479 06 84 48 ",
        faxNumber: "",
        email: "fruitcollect@gmail.com",
        url: "https://jus-fruitcollect.odoo.com/shop/",
      },
    ],
    "@id": "5430001830002",
  },
  netContent: {
    "s:value": {
      "@value": "1000",
      "@type": "xsd:float",
    },
    "s:unitCode": "MLT",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  consumerSafetyInformation: [
    {
      "@value":
        "Les jus FruitCollect se conservent au sec minimum 1 an après livraison.",
      "@language": "fr",
    },
  ],
  consumerStorageInstructions: [
    {
      "@value": "  À conserver au frigo 5 jours après ouverture.",
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
        "Bien agiter avant ouverture, servir frais et à consommer dans les 5 jours après ouverture.",
      "@language": "fr",
    },
  ],
  ingredientStatement: [
    {
      "@value":
        "Pomme (100%) 100% Pur jus - Sans sucre ajouté - Sans conservateur - Sans colorants - Non dilué - Naturellement trouble - Jus pasteurisé.",
      "@language": "fr",
    },
  ],
  fatPerNutrientBasis: {
    "s:value": {
      "@value": "0.14",
      "@type": "xsd:float",
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  saturatedFatPerNutrientBasis: {
    "s:value": {
      "@value": "0.046",
      "@type": "xsd:float",
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  carbohydratesPerNutrientBasis: {
    "s:value": {
      "@value": "11.4",
      "@type": "xsd:float",
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  sugarsPerNutrientBasis: {
    "s:value": {
      "@value": "10.9",
      "@type": "xsd:float",
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  saltPerNutrientBasis: {
    "s:value": {
      "@value": "0.022",
      "@type": "xsd:float",
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  proteinPerNutrientBasis: {
    "s:value": {
      "@value": "0.17",
      "@type": "xsd:float",
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  energyPerNutrientBasis: [
    {
      "s:value": {
        "@value": "208",
        "@type": "xsd:float",
      },
      "s:unitCode": "KJO",
      "@type": "gs1:NutritionMeasurementType",
    },
    {
      "s:value": {
        "@value": "48.9",
        "@type": "xsd:float",
      },
      "s:unitCode": "E14",
      "@type": "gs1:NutritionMeasurementType",
    },
  ],
  ingredient: [
    {
      "@type": "gs1:FoodBeverageTobaccoIngredientDetails",
      ingredientSequence: {
        "@type": "xsd:integer",
        "@value": 1,
      },
      ingredientName: [
        {
          "@value":
            "Pomme  100% Pur jus - Sans sucre ajouté - Sans conservateur - Sans colorants - Non dilué - Naturellement trouble - Jus pasteurisé.",
          "@language": "fr",
        },
      ],
    },
  ],
  gtin: "05430001830002",
  manufacturer: {
    address: {
      addressCountry: "BE",
      streetAddress: [
        {
          "@value": "Rue des Cueilleurs, 7",
          "@language": "fr",
        },
        {
          "@value": "Rue des Cueilleurs, 7",
          "@language": "nl",
        },
      ],
      "@type": "PostalAddress",
      postalCode: "6060",
      addressLocality: [
        {
          "@value": "Charleroi",
          "@language": "fr",
        },
        {
          "@value": "Charleroi",
          "@language": "nl",
        },
      ],
    },
    "@type": "Organization",
    description: {
      "@value":
        "L’ASBL Aktina est active au niveau Ecologie, Santé et Technologies de l’information par diverses actions de sensibilisation, de formation et de création.  A travers ses 3 pôles d’activités, AKTINA agit pour conscientiser la population à la gestion des déchets, à l’alimentation durable et à l’usage intelligent des outils numériques.",
      "@language": "fr",
    },
    image: {
      url: {
        "@id":
          "https://mlvrcugzhxko.i.optimole.com/w:512/h:512/q:mauto/https://aktina.be/wp-content/uploads/2022/12/cropped-Aktina-Logo-2022-1.jpg",
      },
    },
    "@context": "https://schema.org",
    url: "www.aktina.be",
    iso6523Code: "0208 0881.170.962",
    legalName: {
      "@value": "AKTINA - Association sans but lucratif",
      "@language": "fr",
    },
    isicV4: [
      {
        "@value": "94993 - Associations pour la prévention de la santé",
        "@language": "fr",
      },
      {
        "@value":
          "94993 - Verenigingen op het vlak van ziektepreventie en gezondheidsbevordering",
        "@language": "nl",
      },
      {
        "@value": "62010 - Programmation informatique",
        "@language": "fr",
      },
      {
        "@value": "62010 - Ontwerpen en programmeren van computerprogramma's",
        "@language": "nl",
      },
      {
        "@value":
          "47410 - Commerce de détail d'ordinateurs, d'unités périphériques et de logiciels en magasin spécialisé",
        "@language": "fr",
      },
      {
        "@value":
          "47410 - Detailhandel in computers, randapparatuur en software in gespecialiseerde winkels",
        "@language": "nl",
      },
    ],
    subOrganization: [
      {
        iso6523Code: "0208 2.311.765.762",
        isicV4: [
          {
            "@value": "94993 - Associations pour la prévention de la santé",
            "@language": "fr",
          },
          {
            "@value":
              "94993 - Verenigingen op het vlak van ziektepreventie en gezondheidsbevordering",
            "@language": "nl",
          },
        ],
        address: {
          addressCountry: "BE",
          streetAddress: [
            {
              "@value": "Rue des Cueilleurs, 7",
              "@language": "fr",
            },
            {
              "@value": "Rue des Cueilleurs, 7",
              "@language": "nl",
            },
          ],
          "@type": "PostalAddress",
          postalCode: "6060",
          addressLocality: [
            {
              "@value": "Charleroi",
              "@language": "fr",
            },
            {
              "@value": "Charleroi",
              "@language": "nl",
            },
          ],
        },
        "@type": "Organization",
        name: {
          "@value": "AKTINA",
          "@language": "fr",
        },
        "@context": "https://schema.org",
        email: ["daniel@aktina.be", "hello@aktina.be"],
        url: "aktina.be",
      },
    ],
    taxID: "BE 0881.170.962",
    name: [
      {
        "@value": "AKTINA",
        "@language": "fr",
      },
    ],
    email: ["daniel@aktina.be", "hello@aktina.be"],
  },
};
