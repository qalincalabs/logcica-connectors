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
  "s:name": [
    { "@value": "RILLETTE DE THON GERMON ECHALOTES 100G", "@language": "fr" },
    { "@value": "Tonijnrillettes met sjalotten i", "@language": "nl" }
  ],
  "gtin": "01454000000055",
  "regulatedProductName": [
    { "@value": "RILLETTE DE THON GERMON ECHALOTES 100G", "@language": "fr" },
    { "@value": "Tonijnrillettes met sjalotten i", "@language": "nl" }
  ],
  "gpcCategoryCode": "10000016",
  "targetMarket": [
    {
      "targetMarketCountries": [
        { "@type": ["gs1:Country", "s:Country"], "countryCode": "BE" }
      ],
      "@type": "gs1:TargetMarketDetails"
    }
  ],
  "s:image": {
    "referencedFileType": { "@id": "gs1:ReferencedFileTypeCode-PRODUCT_IMAGE" },
    "@type": ["gs1:ReferencedFileDetails", "s:MediaObject"],
    "s:url": {
      "@id": "https://archive.org/download/0208_0881170962/020/1454000000000/01/01454000000055/01454000000055.png"
    }
  },
  "s:description": [
    { "@value": "RILLETTE DE THON GERMON ECHALOTES 100G", "@language": "fr" },
    { "@value": "Tonijnrillettes met sjalotten i", "@language": "nl" }
  ],
  "ingredientStatement": [
    {
      "@value": "THON germon (37,5%), CREME st\u00e9rilis\u00e9e (CREME, stabilisant: carragh\u00e9nanes), COLIN d'Alaska, eau,\u00e9chalotes (2,5%), jus de citron, vin blanc (1,3%), huile d'olive, dextrose, prot\u00e9ines de LAIT, farine de BLE,persil, ar\u00f4me naturel (contient POISSON), ail, MOUTARDE (eau, graines de MOUTARDE, vinaigre, sel), sel,zeste de citron, poivre, coriandre, Contient : POISSON, LAIT, CEREALES CONTENANT DU GLUTEN, MOUTARDE, Traces \u00e9ventuelles de : c\u00e9leri, crustac\u00e9s, fruits \u00e0 coque, lupin, mollusques, oeuf, graines de s\u00e9same, soja, sulfites",
      "@language": "fr"
    }
  ],
  "@type": ["gs1:FoodBeverageTobaccoProduct", "s:Product"],
  "netContent": {
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
    "s:value": { "@value": 100, "@type": "xsd:float" },
    "s:unitCode": "GRM"
  },
  "@contex": {
    "s": "https://schema.org/",
    "@vocab": "http://gs1.org/voc/",
    "gs1": "http://gs1.org/voc/",
    "xsd": "http://www.w3.org/2001/XMLSchema#"
  },
  "hasAllergen": [
    {
      "allergenType": {
        "@id": "gs1:AllergenTypeCode-CEREALS_CONTAINING_GLUTEN"
      },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-CONTAINS"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-MILK" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-CONTAINS"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-EGGS" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-PEANUTS" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-TREE_NUTS" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-SOYBEANS" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-MUSTARD" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-CONTAINS"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-LUPINE" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-CELERY" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-SESAME_SEEDS" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-FISH" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-CONTAINS"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-MOLLUSCS" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-CRUSTACEANS" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    },
    {
      "allergenType": { "@id": "gs1:AllergenTypeCode-SULPHUR_DIOXIDE" },
      "@type": "gs1:AllergenDetails",
      "allergenLevelOfContainmentCode": {
        "@id": "gs1:LevelOfContainmentCode-MAY_CONTAIN"
      }
    }
  ],
  "s:manufacturer": {
    "iso6523Code": {
      "SchemeID": "BE:EN",
      "StructureOfCode": "The identification number can be displayed in the following ways: For enterprise numbers: - a group of four digits, then two groups of three digits, each group separated by a dot. Example: 1234.456.789 - one digit, then three groups of three digits, each separated by a dot. Example: 1.234.456.789 For establishment unit numbers: - one digit, then three groups of three digits, each separated by a dot. Example: 2.123.456.789",
      "IssuingOrganisation": "Banque-Carrefour des Entreprises (BCE) / Kruispuntbank van Ondernemingen (KBO) / Zentrale Datenbank der Unternehmen (ZOU) Service public f\u00e9d\u00e9ral Economie, P.M.E. Classes moyennes et Energie",
      "Deprecatedsince": "10 numeric characters. 1. Enterprise identification number: the first digit has to be \"0\" or \"1\"",
      "ICDValue": "0208",
      "UsageNotes": "",
      "PeppolExamples": "",
      "DisplayRequirements": "",
      "@value": "0208 0881.170.962",
      "ValidationRules": "RegEx: 0[0-9]{9} Check digit: mod97 See https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/be/vat.py",
      "Deprecated": "false",
      "Since": "7",
      "SchemeName": "Numero d'entreprise / ondernemingsnummer / Unternehmensnummer",
      "CountryCode": "BE"
    },
    "legalName": [
      { "@value": "AKTINA - Association sans but lucratif", "@language": "fr" }
    ],
    "isicV4": [
      {
        "name": [
          {
            "@value": "94993 - Associations pour la pr\u00e9vention de la sant\u00e9",
            "@language": "fr"
          },
          {
            "@value": "94993 - Verenigingen op het vlak van ziektepreventie en gezondheidsbevordering",
            "@language": "nl"
          }
        ],
        "@code": "94993",
        "activityGroup": "006",
        "classification": "MAIN"
      },
      {
        "name": [
          { "@value": "62010 - Programmation informatique", "@language": "fr" },
          {
            "@value": "62010 - Ontwerpen en programmeren van computerprogramma's",
            "@language": "nl"
          }
        ],
        "@code": "62010",
        "activityGroup": "001",
        "classification": "MAIN"
      },
      {
        "name": [
          {
            "@value": "47410 - Commerce de d\u00e9tail d'ordinateurs, d'unit\u00e9s p\u00e9riph\u00e9riques et de logiciels en magasin sp\u00e9cialis\u00e9",
            "@language": "fr"
          },
          {
            "@value": "47410 - Detailhandel in computers, randapparatuur en software in gespecialiseerde winkels",
            "@language": "nl"
          }
        ],
        "@code": "47410",
        "activityGroup": "001",
        "classification": "SECO"
      }
    ],
    "address": {
      "addressCountry": "BE",
      "streetAddress": [
        { "@value": "Rue des Cueilleurs, 7", "@language": "fr" },
        { "@value": "Rue des Cueilleurs, 7", "@language": "nl" }
      ],
      "@type": "PostalAddress",
      "postalCode": "6060",
      "addressLocality": [
        { "@value": "Charleroi", "@language": "fr" },
        { "@value": "Charleroi", "@language": "nl" }
      ]
    },
    "subOrganization": [
      {
        "iso6523Code": {
          "SchemeID": "BE:EN",
          "StructureOfCode": "The identification number can be displayed in the following ways: For enterprise numbers: - a group of four digits, then two groups of three digits, each group separated by a dot. Example: 1234.456.789 - one digit, then three groups of three digits, each separated by a dot. Example: 1.234.456.789 For establishment unit numbers: - one digit, then three groups of three digits, each separated by a dot. Example: 2.123.456.789",
          "IssuingOrganisation": "Banque-Carrefour des Entreprises (BCE) / Kruispuntbank van Ondernemingen (KBO) / Zentrale Datenbank der Unternehmen (ZOU) Service public f\u00e9d\u00e9ral Economie, P.M.E. Classes moyennes et Energie",
          "Deprecatedsince": "10 numeric characters. 1. Enterprise identification number: the first digit has to be \"0\" or \"1\"",
          "ICDValue": "0208",
          "UsageNotes": "",
          "PeppolExamples": "",
          "DisplayRequirements": "",
          "@value": "0208 2.311.765.762",
          "ValidationRules": "RegEx: 0[0-9]{9} Check digit: mod97 See https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/be/vat.py",
          "Deprecated": "false",
          "Since": "7",
          "SchemeName": "Numero d'entreprise / ondernemingsnummer / Unternehmensnummer",
          "CountryCode": "BE"
        },
        "isicV4": [
          {
            "name": [
              {
                "@value": "94993 - Associations pour la pr\u00e9vention de la sant\u00e9",
                "@language": "fr"
              },
              {
                "@value": "94993 - Verenigingen op het vlak van ziektepreventie en gezondheidsbevordering",
                "@language": "nl"
              }
            ],
            "@code": "94993",
            "activityGroup": "006",
            "classification": "MAIN"
          }
        ],
        "address": {
          "addressCountry": "BE",
          "streetAddress": [
            { "@value": "Rue des Cueilleurs, 7", "@language": "fr" },
            { "@value": "Rue des Cueilleurs, 7", "@language": "nl" }
          ],
          "@type": "PostalAddress",
          "postalCode": "6060",
          "addressLocality": [
            { "@value": "Charleroi", "@language": "fr" },
            { "@value": "Charleroi", "@language": "nl" }
          ]
        },
        "@type": "Organization",
        "name": [{ "@value": "AKTINA", "@language": "fr" }],
        "@context": "https://schema.org",
        "email": ["daniel@aktina.be", "hello@aktina.be"],
        "url": "aktina.be"
      }
    ],
    "@type": "Organization",
    "taxID": "BE 0881.170.962",
    "gln": "1454000000000",
    "name": [{ "@value": "AKTINA", "@language": "fr" }],
    "@context": "https://schema.org",
    "email": ["daniel@aktina.be", "hello@aktina.be"],
    "url": "www.aktina.be",
    "@id": "1454000000000"
  }
}


