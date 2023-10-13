import { EJSON } from "bson";
import { camelToSnakeCase } from "./../core/main";

test("logcica 2 - product", async () => {
  console.log(JSON.stringify(logcica1Product, null, 2));

  const nutrientsFilter = [
    "energy",
    "fat",
    "saturatedFat",
    "carbohydrates",
    "sugars",
    "protein",
    "salt",
    "fibre",
  ];

  const allergensFilter = [
    "celery",
    "cereals_containing_gluten",
    "crustaceans",
    "eggs",
    "fish",
    "lupine",
    "milk",
    "molluscs",
    "mustard",
    "peanuts",
    "sesame_seeds",
    "soybeans",
    "sulphur_dioxide",
    "tree_nuts",
  ];

  // TODO : netContents, dimensions, category, owner, producer (manufacturer)

  const product = {
    name: logcica1Product.name,
    alcoholPercentage: logcica1Product.alcoholPercentage,
    allergenList: logcica1Product.allergenList
      .filter((a) => allergensFilter.includes(a.allergen.key))
      .map((i) => ({
        allergenKey: "gs1/voc/allergen_type_code/" + camelToSnakeCase(i.allergen.key),
        containmentLevelKey: "gs1/voc/level_of_containment_code/" + camelToSnakeCase(i.levelOfContainment.key)
      })),
    nutrientList: logcica1Product.nutrientList
      .filter((n) => nutrientsFilter.includes(n.nutrient.code))
      .map((n) => ({
        nutrientKey:
          "gs1/voc/nutrient_type_code/" + camelToSnakeCase(n.nutrient.code),
        quantity: {
          unit: n.quantity.unit.symbol,
          value: n.quantity.value,
        },
      })),
  };

  for(const netContent of logcica1Product.netContents){
    if(["ml"].includes(netContent.unit?.symbol)){
      product.netVolume = {
        value: netContent.value,
        unit: netContent.unit.symbol
      }
    }
    if(["g"].includes(netContent.unit?.symbol)){
      product.netVolume = {
        value: netContent.value,
        unit: netContent.unit.symbol
      }
    }
  }

  const descriptionsList = [
    "description",
    "ingredientStatement",
    "consumerUsageInstructions",
    "consumerStorageInstructions",
  ];

  for (const k of descriptionsList) {
    if (logcica1Product[k] != null)
      product[k] = { short: { markdown: logcica1Product[k] } };
  }

  if (logcica1Product.image) {
    (product.mainImage = logcica1Product.image),
      (product.images = [logcica1Product.image]);
  }

  function replacer(k, v) {
    if (typeof v === "object" && v["$numberInt"] != null) {
      console.log(v);
      return { $numberDouble: v["$numberInt"] };
    }

    console.log(typeof v);
    console.log(v);

    return v;
  }
  //mapValuesDeep(product, (v, k, obj) => { if(Number.isInteger(v)) obj[k] = Double(v) })

  console.log(EJSON.stringify(product, replacer, 0, { relaxed: false }));
});

const logcica1Product = {
  "s:brand": { "@id": "Qalinca Labs" },
  functionalName: "Biere de table",
  manufacturingPlant: { "@id": "Carlsbourg" },
  consumerStorageInstructions: "Conserver à la cave",
  consumerUsageInstructions: "À consommer avec modération",
  percentageOfAlcoholByVolume: { "@value": "6", "@type": "xsd:float" },
  ingredientStatement: "eau (95%), orge (4%), levure",
  countryOfOriginStatement: "Carlsbourg, Belgique",
  countryOfOrigin: [
    { "@type": ["gs1:Country", "s:Country"], countryCode: "BE" },
  ],
  nutrientBasisQuantity: {
    "s:value": "100",
    "s:unitCode": "GRM",
    "@type": ["gs1:QuantitativeValue", "s:QuantitativeValue"],
  },
  additionalProductClassification: [
    {
      additionalProductClassificationCode: "google_product_category",
      "@type": "gs1:AdditionalProductClassificationDetails",
    },
  ],
  gtin: "01454000020015",
  name: "Bière pour la foire agricole",
  description: "Une très bonne bière",
  image: {
    url: "https://www.brasseriedesfagnes.com/sites/default/files/styles/fiche_produit/public/fiches/fagnes_75_33_verre_fagnes_blonde.jpg",
  },
  producer: {
    workspace: {
      ids: ["batra/organizations/1454000020008", "be/enterprises/", "tax_id/"],
    },
  },
  marketingMessage: "Rafraîchissant",
  nutrientList: [
    {
      nutrient: { code: "monounsaturatedFat", translations: { fr: {} } },
      sequence: "3",
      quantity: { value: 0, unit: { code: "GRM", symbol: "gr" } },
    },
    {
      nutrient: { code: "polyunsaturatedFat", translations: { fr: {} } },
      sequence: "4",
      quantity: { value: 0, unit: { code: "GRM", symbol: "gr" } },
    },
    {
      nutrient: { code: "starch", translations: { fr: {} } },
      sequence: "7",
      quantity: { value: 0, unit: { code: "GRM", symbol: "gr" } },
    },
    {
      nutrient: { code: "fibre", translations: { fr: {} } },
      sequence: "9",
      quantity: { value: 0, unit: { code: "GRM", symbol: "gr" } },
    },
    {
      nutrient: { code: "vitaminA", translations: { fr: {} } },
      sequence: "11",
      quantity: { value: 0, unit: { code: "MC" } },
    },
    {
      nutrient: { code: "vitaminD", translations: { fr: {} } },
      sequence: "12",
      quantity: { value: 0, unit: { code: "MC" } },
    },
    {
      nutrient: { code: "vitaminC", translations: { fr: {} } },
      sequence: "13",
      quantity: { value: 0, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "thiamin", translations: { fr: {} } },
      sequence: "14",
      quantity: { value: 0.01, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "riboflavin", translations: { fr: {} } },
      sequence: "15",
      quantity: { value: 0.02, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "vitaminB12", translations: { fr: {} } },
      sequence: "16",
      quantity: { value: 0, unit: { code: "MC" } },
    },
    {
      nutrient: { code: "potassium", translations: { fr: {} } },
      sequence: "17",
      quantity: { value: 23, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "calcium", translations: { fr: {} } },
      sequence: "18",
      quantity: { value: 1, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "phosphorus", translations: { fr: {} } },
      sequence: "19",
      quantity: { value: 18, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "magnesium", translations: { fr: {} } },
      sequence: "20",
      quantity: { value: 5, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "iron", translations: { fr: {} } },
      sequence: "21",
      quantity: { value: 0.1, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "zinc", translations: { fr: {} } },
      sequence: "22",
      quantity: { value: 0, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "copper", translations: { fr: {} } },
      sequence: "23",
      quantity: { value: 0, unit: { code: "MGM" } },
    },
    {
      nutrient: { code: "selenium", translations: { fr: {} } },
      sequence: "24",
      quantity: { value: 1, unit: { code: "MC" } },
    },
    {
      nutrient: { code: "energy", translations: { fr: { name: "Énergie" } } },
      sequence: "25",
      quantity: { value: 32, unit: { code: "KJO", symbol: "KJ" } },
    },
    {
      nutrient: { code: "fat", translations: { fr: { name: "Graisses" } } },
      sequence: "1",
      quantity: { value: 0, unit: { code: "GRM", symbol: "gr" } },
    },
    {
      nutrient: {
        code: "saturatedFat",
        translations: { fr: { name: "Acides gras saturés" } },
      },
      sequence: "2",
      quantity: { value: 0, unit: { code: "GRM", symbol: "gr" } },
    },
    {
      nutrient: {
        code: "carbohydrates",
        translations: { fr: { name: "Glucides" } },
      },
      sequence: "5",
      quantity: { value: 2.3, unit: { code: "GRM", symbol: "gr" } },
    },
    {
      nutrient: { code: "sugars", translations: { fr: { name: "Sucres" } } },
      sequence: "6",
      quantity: { value: 2.3, unit: { code: "GRM", symbol: "gr" } },
    },
    {
      nutrient: {
        code: "protein",
        translations: { fr: { name: "Protéines" } },
      },
      sequence: "10",
      quantity: { value: 0.4, unit: { code: "GRM", symbol: "gr" } },
    },
    {
      nutrient: { code: "salt", translations: { fr: { name: "Sel" } } },
      sequence: "8",
      quantity: { value: 0, unit: { code: "GRM", symbol: "gr" } },
    },
  ],
  publishedAt: null,
  netContents: [{ value: 330, unit: { code: "MLT", symbol: "mL" } }],
  alcoholPercentage: 6,
  ingredientList: [
    { ingredient: { name: "eau (95%)" }, sequence: "1" },
    { ingredient: { name: "orge (4%)" }, sequence: "2" },
    { ingredient: { name: "levure" }, sequence: "3" },
  ],
  allergenList: [
    {
      allergen: {
        key: "cereals_containing_gluten",
        globalKey: "gs1/voc/allergen_type/cereals_containing_gluten",
        translations: { fr: { name: "Céréales contenant du gluten" } },
      },
      levelOfContainment: {
        key: "contains",
        globalKey: "gs1/voc/level_of_containment/contains",
        translations: { fr: { name: "Contient" } },
      },
    },
    {
      allergen: {
        key: "sulphur_dioxide",
        globalKey: "gs1/voc/allergen_type/sulphur_dioxide",
        translations: { fr: { name: "Dioxyde de soufre et sulfites" } },
      },
      levelOfContainment: {
        key: "contains",
        globalKey: "gs1/voc/level_of_containment/contains",
        translations: { fr: { name: "Contient" } },
      },
    }
  ],
  ids: [
    "batra/products/01454000020015",
    "gtin/01454000020015",
    "ofn_be/product/11408",
  ],
  categories: [{ ids: ["gpc/10000159"] }],
};
