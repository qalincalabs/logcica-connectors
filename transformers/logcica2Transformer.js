import { camelToSnakeCase } from "./../core/main";

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

const descriptionsList = [
  "description",
  "ingredientStatement",
  "consumerUsageInstructions",
  "consumerStorageInstructions",
];

// TODO : netContents, dimensions, category, owner, producer (manufacturer)

export function extractFromProduct(logcica1Product) {
  const product = {
    name: logcica1Product.name,
    alcoholPercentage: logcica1Product.alcoholPercentage,
    allergenList: logcica1Product.allergenList
      ?.filter((a) => allergensFilter.includes(a.allergen.key))
      .map((i) => ({
        allergenKey:
          "gs1/voc/allergen_type_code/" + camelToSnakeCase(i.allergen.key),
        containmentLevelKey:
          "gs1/voc/level_of_containment_code/" +
          camelToSnakeCase(i.levelOfContainment.key),
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

  for (const netContent of logcica1Product.netContents) {
    if (["ml"].includes(netContent.unit?.symbol)) {
      product.netVolume = {
        value: netContent.value,
        unit: netContent.unit.symbol,
      };
    }
    if (["g"].includes(netContent.unit?.symbol)) {
      product.netVolume = {
        value: netContent.value,
        unit: netContent.unit.symbol,
      };
    }
  }

  for (const k of descriptionsList) {
    if (logcica1Product[k] != null)
      product[k] = { short: { markdown: logcica1Product[k] } };
  }

  /* TODO handle uploaded images
  if (logcica1Product.image) {
    product.mainImage = logcica1Product.image;
    product.images = [logcica1Product.image];
  }
  */

  return product
}
