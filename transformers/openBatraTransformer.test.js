import * as transformer from "./openBatraTransformer.js";


// todo add published date
test("OpenBatra clean up", () => {
  const product = openBatraProduct;
  const context = transformer.extractFromProduct(product);
  console.log(JSON.stringify(context, null, 2));
});

const openBatraProduct =  {
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
      "@value": "Jus de Pomme - Fraise",
      "@language": "fr"
    }
  ],
  "regulatedProductName": [
    {
      "@value": "Jus de Pomme - Fraise",
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
      "@value": "En ouvrant la bouteille, on a l'impression de tomber dans un pot de confiture... Ce jus vous donne la sensation en bouche d'un bonbon acidulé au goût de fraise bien prononcé.   À déguster idéalement à toute heure du jour et de la nuit !",
      "@language": "fr"
    }
  ],
  "s:image": {
    "s:url": {
      "@id": "https://jus-fruitcollect.odoo.com/web/image/product.product/43/image_1024/Pack%20Jus%20de%20Pomme%20-%20Fraise%20-%2012%20x%201L?unique=9c60536"
    },
    "@type": [
      "gs1:ReferencedFileDetails",
      "s:MediaObject"
    ]
  },
  "functionalName": [
    {
      "@value": "Jus de Pomme - Fraise",
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
  "consumerStorageInstructions": [
    {
      "@value": "À conserver au frais après ouverture.  Les jus FruitCollect se conservent au sec minimum 1 an après livraison.",
      "@language": "fr"
    }
  ],
  "consumerUsageInstructions": [
    {
      "@value": "Bien agiter avant ouverture, servir frais et à consommer dans les 5 jours après ouverture.",
      "@language": "fr"
    }
  ],
  "ingredientStatement": [
    {
      "@value": "Pomme (80%), fraise (20%) 100% Pur jus - Sans sucre ajouté - Sans conservateur - Sans colorants - Non dilué - Naturellement trouble - Jus pasteurisé.",
      "@language": "fr"
    }
  ],
  "nutrientBasisQuantity": {
    "s:value": "100",
    "s:unitCode": "GRM",
    "@type": [
      "gs1:QuantitativeValue",
      "s:QuantitativeValue"
    ]
  },
  "fatPerNutrientBasis": {
    "s:value": {
      "@value": "0.10",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "saturatedFatPerNutrientBasis": {
    "s:value": {
      "@value": "0",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "carbohydratesPerNutrientBasis": {
    "s:value": {
      "@value": "12.30",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "sugarsPerNutrientBasis": {
    "s:value": {
      "@value": "10.90",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "saltPerNutrientBasis": {
    "s:value": {
      "@value": "0",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "fibrePerNutrientBasis": {
    "s:value": {
      "@value": "0.10",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "proteinPerNutrientBasis": {
    "s:value": {
      "@value": "0.5",
      "@type": "xsd:float"
    },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType"
  },
  "energyPerNutrientBasis": [
    {
      "s:value": {
        "@value": "175",
        "@type": "xsd:float"
      },
      "s:unitCode": "KJO",
      "@type": "gs1:NutritionMeasurementType"
    },
    {
      "s:value": {
        "@value": "42",
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
        "@value": "80",
        "@type": "xsd:float"
      }
    },
    {
      "@type": "gs1:FoodBeverageTobaccoIngredientDetails",
      "ingredientSequence": {
        "@type": "xsd:integer",
        "@value": 2
      },
      "ingredientName": [
        {
          "@value": "fraise  100% Pur jus - Sans sucre ajouté - Sans conservateur - Sans colorants - Non dilué - Naturellement trouble - Jus pasteurisé.",
          "@language": "fr"
        }
      ]
    }
  ],
  "referencedFile": [
    {
      "s:url": {
        "@id": "https://jus-fruitcollect.odoo.com/web/image/4281/logo-prix-juste-producteur-356x364-1.png?access_token=8c5a1c5c-b655-4e42-86b7-3766bdf8addd"
      },
      "referencedFileType": {
        "@id": "gs1:ReferencedFileTypeCode-PRODUCT_IMAGE"
      },
      "@type": [
        "gs1:ReferencedFileDetails",
        "s:MediaObject"
      ]
    },
    {
      "s:url": {
        "@id": "https://jus-fruitcollect.odoo.com/web/image/3993/Picto_Anti-Gaspi.jpg?access_token=93109c5e-a3a3-4372-ab75-9f7a1d1d0b72"
      },
      "referencedFileType": {
        "@id": "gs1:ReferencedFileTypeCode-PRODUCT_IMAGE"
      },
      "@type": [
        "gs1:ReferencedFileDetails",
        "s:MediaObject"
      ]
    }
  ],
  "packaging": {
    "packagingFunction": [
      {
        "@id": "gs1:PackagingFunctionCode-MODIFIED_ATMOSPHERE"
      }
    ],
    "@type": "gs1:PackagingDetails"
  },
  "gtin": "05430001830040"
}
