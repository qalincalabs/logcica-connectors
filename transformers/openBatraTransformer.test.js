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
  "@type": ["gs1:FoodBeverageTobaccoProduct", "s:Product"],
  "s:name": [
    {
      "@value":
        "saumon atlantique \u00e9lev\u00e9 en Norv\u00e8ge ,fum\u00e9 au bois de ch\u00eane",
      "@language": "fr",
    },
    {
      "@value": "atlantische zalm gekweekt in Noorwegen gerrokt op eikenhout",
      "@language": "nl",
    },
  ],
  regulatedProductName: [
    {
      "@value":
        "saumon atlantique \u00e9lev\u00e9 en Norv\u00e8ge ,fum\u00e9 au bois de ch\u00eane",
      "@language": "fr",
    },
    {
      "@value": "atlantische zalm gekweekt in Noorwegen gerrokt op eikenhout",
      "@language": "nl",
    },
  ],
  "s:description": [
    {
      "@value":
        "saumon fum\u00e9 cercle polaire Norv\u00e8gien 4 tranches 130 g",
      "@language": "fr",
    },
    {
      "@value": "gerrokte zalm arctic circle Noorwegen 4 sneden 130 g",
      "@language": "nl",
    },
    {
      "@value": "Norwegen Polarkreis R\u00e4ucherlachs 4 Scheiben 130g",
      "@language": "de",
    },
    {
      "@value": "Norway polar circle smoked salmon 4 slices 130g",
      "@language": "en",
    },
  ],
  "s:image": {
    "s:url": {
      "@id":
        "https://archive.org/download/0208_0881170962/020/1454000000000/01/01454000000000/01454000000000.png",
    },
    "@type": ["gs1:ReferencedFileDetails", "s:MediaObject"],
  },
  functionalName: [
    { "@value": "SF NOR 4TR 130G GDES ORIG", "@language": "fr" },
    { "@value": "GEROOKTE ZALM NOORWEGEN", "@language": "nl" },
    { "@value": "RAUCHERLACHS NORWEGEN", "@language": "de" },
    { "@value": "SMOKED SALMON NORWAY", "@language": "en" },
  ],
  gpcCategoryCode: "10000016",
  netWeight: {
    "s:value": { "@value": "130", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  grossWeight: {
    "s:value": { "@value": "195.7", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  netContent: {
    "s:value": { "@value": "130", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  outOfPackageHeight: {
    "s:value": { "@value": "220", "@type": "xsd:float" },
    "s:unitCode": "MMT",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  outOfPackageWidth: {
    "s:value": { "@value": "245", "@type": "xsd:float" },
    "s:unitCode": "MMT",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  outOfPackageDepth: {
    "s:value": { "@value": "18", "@type": "xsd:float" },
    "s:unitCode": "MMT",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  consumerStorageInstructions: [
    { "@value": "\u00e0 conserver entre 0 et +4\u00b0C", "@language": "fr" },
    { "@value": "te bewaren tussen 0/+4\u00b0C", "@language": "nl" },
  ],
  ingredientStatement: [
    { "@value": "SAUMON atlantique (salmo salar ), sel", "@language": "fr" },
    { "@value": "atlantische ZALM (salmo salar ),zout", "@language": "nl" },
  ],
  countryOfOrigin: [
    { "@type": ["gs1:Country", "s:Country"], countryCode: "NO" },
  ],
  nutrientBasisQuantity: {
    "s:value": "100",
    "s:unitCode": "GRM",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  fatPerNutrientBasis: {
    "s:value": { "@value": "12", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  saturatedFatPerNutrientBasis: {
    "s:value": { "@value": "2.5", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  carbohydratesPerNutrientBasis: {
    "s:value": { "@value": "0.6", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  sugarsPerNutrientBasis: {
    "s:value": { "@value": "0.6", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  saltPerNutrientBasis: {
    "s:value": { "@value": "2.9", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  proteinPerNutrientBasis: {
    "s:value": { "@value": "22", "@type": "xsd:float" },
    "s:unitCode": "GRM",
    "@type": "gs1:NutritionMeasurementType",
  },
  energyPerNutrientBasis: [
    {
      "s:value": { "@value": "828", "@type": "xsd:float" },
      "s:unitCode": "KJO",
      "@type": "gs1:NutritionMeasurementType",
    },
    {
      "s:value": { "@value": "198", "@type": "xsd:float" },
      "s:unitCode": "E14",
      "@type": "gs1:NutritionMeasurementType",
    },
  ],
  ingredient: [
    {
      "@type": "gs1:FoodBeverageTobaccoIngredientDetails",
      ingredientSequence: { "@type": "xsd:integer", "@value": 1 },
      ingredientName: [
        { "@value": "SAUMON atlantique (salmo salar )", "@language": "fr" },
        { "@value": "atlantische ZALM (salmo salar )", "@language": "nl" },
      ],
    },
    {
      "@type": "gs1:FoodBeverageTobaccoIngredientDetails",
      ingredientSequence: { "@type": "xsd:integer", "@value": 2 },
      ingredientName: [
        { "@value": "sel", "@language": "fr" },
        { "@value": "zout", "@language": "nl" },
      ],
    },
  ],
  targetMarket: [
    {
      targetMarketCountries: [
        { "@type": ["gs1:Country", "s:Country"], countryCode: "BE" },
      ],
      "@type": "gs1:TargetMarketDetails",
    },
  ],
  referencedFile: [
    {
      "s:url": {
        "@id":
          "https://dam.gs1belu.org/originals/3700780000012%2F1c98e0c2ecf741419c6ccc3064ccda45%2F%40%207293%20GRANDE%20ORIGINE%20NORVEGE05-08-20%20%282%29jpg.jpg",
      },
      referencedFileType: { "@id": "gs1:ReferencedFileTypeCode-PRODUCT_IMAGE" },
      "s:inLanguage": "fr",
      "@type": ["gs1:ReferencedFileDetails", "s:MediaObject"],
    },
  ],
  hasAllergen: [
    {
      allergenLevelOfContainmentCode: {
        "@id": "gs1:LevelOfContainmentCode-CONTAINS",
      },
      allergenType: { "@id": "gs1:AllergenTypeCode-FISH" },
      "@type": "gs1:AllergenDetails",
    },
  ],
  packaging: { packagingType: "BPG", "@type": "gs1:PackagingDetails" },
  gtin: "01454000000000",
  "s:manufacturer": {
    iso6523Code: {
      SchemeID: "BE:EN",
      StructureOfCode:
        "The identification number can be displayed in the following ways: For enterprise numbers: - a group of four digits, then two groups of three digits, each group separated by a dot. Example: 1234.456.789 - one digit, then three groups of three digits, each separated by a dot. Example: 1.234.456.789 For establishment unit numbers: - one digit, then three groups of three digits, each separated by a dot. Example: 2.123.456.789",
      IssuingOrganisation:
        "Banque-Carrefour des Entreprises (BCE) / Kruispuntbank van Ondernemingen (KBO) / Zentrale Datenbank der Unternehmen (ZOU) Service public f\u00e9d\u00e9ral Economie, P.M.E. Classes moyennes et Energie",
      Deprecatedsince:
        '10 numeric characters. 1. Enterprise identification number: the first digit has to be "0" or "1"',
      ICDValue: "0208",
      UsageNotes: "",
      PeppolExamples: "",
      DisplayRequirements: "",
      "@value": "0208 0881.170.962",
      ValidationRules:
        "RegEx: 0[0-9]{9} Check digit: mod97 See https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/be/vat.py",
      Deprecated: "false",
      Since: "7",
      SchemeName:
        "Numero d'entreprise / ondernemingsnummer / Unternehmensnummer",
      CountryCode: "BE",
    },
    legalName: [
      { "@value": "AKTINA - Association sans but lucratif", "@language": "fr" },
    ],
    isicV4: [
      {
        name: [
          {
            "@value":
              "94993 - Associations pour la pr\u00e9vention de la sant\u00e9",
            "@language": "fr",
          },
          {
            "@value":
              "94993 - Verenigingen op het vlak van ziektepreventie en gezondheidsbevordering",
            "@language": "nl",
          },
        ],
        "@code": "94993",
        activityGroup: "006",
        classification: "MAIN",
      },
      {
        name: [
          { "@value": "62010 - Programmation informatique", "@language": "fr" },
          {
            "@value":
              "62010 - Ontwerpen en programmeren van computerprogramma's",
            "@language": "nl",
          },
        ],
        "@code": "62010",
        activityGroup: "001",
        classification: "MAIN",
      },
      {
        name: [
          {
            "@value":
              "47410 - Commerce de d\u00e9tail d'ordinateurs, d'unit\u00e9s p\u00e9riph\u00e9riques et de logiciels en magasin sp\u00e9cialis\u00e9",
            "@language": "fr",
          },
          {
            "@value":
              "47410 - Detailhandel in computers, randapparatuur en software in gespecialiseerde winkels",
            "@language": "nl",
          },
        ],
        "@code": "47410",
        activityGroup: "001",
        classification: "SECO",
      },
    ],
    address: {
      addressCountry: "BE",
      streetAddress: [
        { "@value": "Rue des Cueilleurs, 7", "@language": "fr" },
        { "@value": "Rue des Cueilleurs, 7", "@language": "nl" },
      ],
      "@type": "PostalAddress",
      postalCode: "6060",
      addressLocality: [
        { "@value": "Charleroi", "@language": "fr" },
        { "@value": "Charleroi", "@language": "nl" },
      ],
    },
    subOrganization: [
      {
        iso6523Code: {
          SchemeID: "BE:EN",
          StructureOfCode:
            "The identification number can be displayed in the following ways: For enterprise numbers: - a group of four digits, then two groups of three digits, each group separated by a dot. Example: 1234.456.789 - one digit, then three groups of three digits, each separated by a dot. Example: 1.234.456.789 For establishment unit numbers: - one digit, then three groups of three digits, each separated by a dot. Example: 2.123.456.789",
          IssuingOrganisation:
            "Banque-Carrefour des Entreprises (BCE) / Kruispuntbank van Ondernemingen (KBO) / Zentrale Datenbank der Unternehmen (ZOU) Service public f\u00e9d\u00e9ral Economie, P.M.E. Classes moyennes et Energie",
          Deprecatedsince:
            '10 numeric characters. 1. Enterprise identification number: the first digit has to be "0" or "1"',
          ICDValue: "0208",
          UsageNotes: "",
          PeppolExamples: "",
          DisplayRequirements: "",
          "@value": "0208 2.311.765.762",
          ValidationRules:
            "RegEx: 0[0-9]{9} Check digit: mod97 See https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/be/vat.py",
          Deprecated: "false",
          Since: "7",
          SchemeName:
            "Numero d'entreprise / ondernemingsnummer / Unternehmensnummer",
          CountryCode: "BE",
        },
        isicV4: [
          {
            name: [
              {
                "@value":
                  "94993 - Associations pour la pr\u00e9vention de la sant\u00e9",
                "@language": "fr",
              },
              {
                "@value":
                  "94993 - Verenigingen op het vlak van ziektepreventie en gezondheidsbevordering",
                "@language": "nl",
              },
            ],
            "@code": "94993",
            activityGroup: "006",
            classification: "MAIN",
          },
        ],
        address: {
          addressCountry: "BE",
          streetAddress: [
            { "@value": "Rue des Cueilleurs, 7", "@language": "fr" },
            { "@value": "Rue des Cueilleurs, 7", "@language": "nl" },
          ],
          "@type": "PostalAddress",
          postalCode: "6060",
          addressLocality: [
            { "@value": "Charleroi", "@language": "fr" },
            { "@value": "Charleroi", "@language": "nl" },
          ],
        },
        "@type": "Organization",
        name: [{ "@value": "AKTINA", "@language": "fr" }],
        "@context": "https://schema.org",
        email: ["daniel@aktina.be", "hello@aktina.be"],
        url: "aktina.be",
      },
    ],
    "@type": "Organization",
    taxID: "BE 0881.170.962",
    gln: "1454000000000",
    name: [{ "@value": "AKTINA", "@language": "fr" }],
    "@context": "https://schema.org",
    email: ["daniel@aktina.be", "hello@aktina.be"],
    url: "www.aktina.be",
    "@id": "1454000000000",
  },
};
