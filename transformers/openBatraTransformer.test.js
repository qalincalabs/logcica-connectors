import * as transformer from "./openBatraTransformer.js";

// todo add published date
test("OpenBatra clean up", () => {
  const product = openBatraProduct;
  const context = transformer.extractFromProduct(product);
  console.log(JSON.stringify(context, null, 2));
});

const openBatraProduct = {
  "@context": {
    "gs1": "http://gs1.org/voc/",
    "s": "https://schema.org/",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "@vocab": "http://gs1.org/voc/"
  },
  "@type": [
    "gs1:Beverage",
    "s:Product"
  ],
  "s:name": [
    {
      "@value": "Jus de Pomme",
      "@language": "fr"
    }
  ],
  "regulatedProductName": [
    {
      "@value": "Jus de Pomme",
      "@language": "fr"
    }
  ],
  "s:description": [
    {
      "@value": "Ce jus a été réalisé à partir de fruits récoltés avec amour par nos bénévoles dans des jardins privés belges. Certains surplus ou invendus ont également été rachetés à des agriculteurs belges afin d'éviter le gaspillage alimentaire. FruitCollect et ses bénévoles récoltent au gré des saisons. La production traditionnelle des jus en bouteille consignée a quant à elle été réalisée par une petite entreprise familiale dans le Hainaut. Nos jus sont donc 100% anti-gaspillage et issus de l'économie circulaire.",
      "@language": "fr"
    }
  ],
  "productMarketingMessage": [
    {
      "@value": "Diverses variétés de pommes apportent chacune leurs qualités gustatives à ce jus d'exception.  A déguster idéalement à tout moment de la journée!",
      "@language": "fr"
    }
  ],
  "s:image": {
    "s:url": {
      "@id": "https://jus-fruitcollect.odoo.com/web/image/product.product/42/image_1024/Pack%20Jus%20de%20Pomme%20-%2012%20x%201L?unique=5b5c9d2"
    },
    "@type": [
      "gs1:ReferencedFileDetails",
      "s:MediaObject"
    ]
  },
  "functionalName": [
    {
      "@value": "Jus de pomme, pur jus",
      "@language": "fr"
    }
  ],
  "gpcCategoryCode": "10000223",
  "s:manufacturer": {
    "taxID": "BE0642.831.371",
    "vatID": "BE0642.831.371",
    "globalLocationNumber": "5430001830002",
    "name": [
      {
        "@language": "fr",
        "@value": "FruitCollect"
      },
      {
        "@language": "nl",
        "@value": "FruitCollect"
      }
    ],
    "address": [
      {
        "streetAddress": "Rue de Liedekerke 71",
        "postalCode": "1210",
        "addressLocality": "Saint-Josse-ten-Noode",
        "addressCountry": "056"
      }
    ],
    "contactPoint": [
      {
        "contactTitle": "FruitCollect",
        "contactType": "Support à la clientèle",
        "availableLanguage": "fr",
        "telephone": "+32 479 06 84 48 ",
        "faxNumber": "",
        "email": "fruitcollect@gmail.com",
        "url": "https://jus-fruitcollect.odoo.com/shop/"
      }
    ],
    "@id": "5430001830002"
  },
  "grossWeight": {
    "s:value": {
      "@value": "1200",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": [
      "gs1:QuantitativeValue",
      "s:QuantitativeValue"
    ]
  },
  "netContent": {
    "s:value": {
      "@value": "1000",
      "@type": "xsd:float"
    },
    "s:unitCode": "MLT",
    "@type": [
      "gs1:QuantitativeValue",
      "s:QuantitativeValue"
    ]
  },
  "consumerSafetyInformation": [
    {
      "@value": "Les jus FruitCollect se conservent au sec minimum 1 an après livraison.",
      "@language": "fr"
    }
  ],
  "consumerStorageInstructions": [
    {
      "@value": "  À conserver au frigo 5 jours après ouverture.",
      "@language": "fr"
    }
  ],
  "supplierSpecifiedMinimumConsumerStorageDays": {
    "@value": "365",
    "@type": "xsd:integer"
  },
  "consumerUsageInstructions": [
    {
      "@value": "Bien agiter avant ouverture, servir frais et à consommer dans les 5 jours après ouverture.",
      "@language": "fr"
    }
  ],
  "ingredientStatement": [
    {
      "@value": "Pomme (100%)",
      "@language": "fr"
    }
  ],
  "fatPerNutrientBasis": {
    "s:value": {
      "@value": "0.14",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "saturatedFatPerNutrientBasis": {
    "s:value": {
      "@value": "0.046",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "carbohydratesPerNutrientBasis": {
    "s:value": {
      "@value": "11.4",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "sugarsPerNutrientBasis": {
    "s:value": {
      "@value": "10.9",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "saltPerNutrientBasis": {
    "s:value": {
      "@value": "0.022",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "proteinPerNutrientBasis": {
    "s:value": {
      "@value": "0.17",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "energyPerNutrientBasis": [
    {
      "s:value": {
        "@value": "208",
        "@type": "xsd:float"
      },
      "s:unitCode": "KJO",
      "@type": "gs1:NutritionMeasurementType"
    },
    {
      "s:value": {
        "@value": "48.9",
        "@type": "xsd:float"
      },
      "s:unitCode": "E14",
      "@type": "gs1:NutritionMeasurementType"
    }
  ],
  "ingredient": [
    {
      "@type": "gs1:FoodBeverageTobaccoIngredientDetails",
      "ingredientSequence": {
        "@type": "xsd:integer",
        "@value": 1
      },
      "ingredientName": [
        {
          "@value": "Pomme",
          "@language": "fr"
        }
      ],
      "ingredientContentPercentage": {
        "@value": "100",
        "@type": "xsd:float"
      }
    }
  ],
  "gtin": "05430001830002"
}
