import * as main from "../core/main.js";

Object.prototype.renameProperty = function (oldName, newName) {
  // Do nothing if the names are the same
  if (oldName === newName) {
    return this;
  }
  // Check for the old property name to avoid a ReferenceError in strict mode.
  if (this.hasOwnProperty(oldName)) {
    this[newName] = this[oldName];
    delete this[oldName];
  }
  return this;
};

function propertyUnused(product) {
  delete product["@context"];
  delete product["@type"];
  delete product.manufacturer;
  delete product.image;
}

function propertyRenaming(product) {
  product.renameProperty("s:name", "name");
  product.renameProperty("s:description", "description");
  product.renameProperty("s:image", "image");
  product.renameProperty("s:manufacturer", "producer");
  product.renameProperty("regulatedProductName", "regulatedName");
  product.renameProperty("productMarketingMessage", "marketingMessage");
}

const assignTranslationToProperties = [
  "name",
  "regulatedName",
  "functionalName",
  "description",
  //"gpcCategoryDescription",
  "ingredientStatement",
  "consumerSafetyInformation",
  "consumerStorageInstructions",
  "consumerUsageInstructions",
  "marketingMessage",
  "countryOfOriginStatement",
];

function assignTranslation(product, propertyName, languageOptions) {
  if (product[propertyName] == null) return;

  product[propertyName] = extractMainTranslation(
    product[propertyName],
    languageOptions
  );
}

function extractMainTranslation(p, languageOptions) {
  if (p == null) return;

  let prop = p.find((n) => n["@language"] == languageOptions.main);
  if (prop == null) prop = p[0];
  return prop["@value"];
}

function isolateNutritionMeasurementType(product) {
  const suffix = "PerNutrientBasis";

  let nutrientList = [];

  // TODO real nutrient sequence

  let sequence = 1;

  const nutrientTranslations = {
    fr: {
      energy: "Énergie",
      fat: "Graisses",
      saturatedFat: "Acides gras saturés",
      carbohydrates: "Glucides",
      sugars: "Sucres",
      protein: "Protéines",
      salt: "Sel",
    },
  };

  const nutrientOrder = [
    "energy",
    "fat",
    "saturatedFat",
    "carbohydrates",
    "sugars",
    "protein",
    "salt",
  ];

  const jsonldNutrients = Object.entries(product).filter((me) =>
    me[0].endsWith(suffix)
  );

  for (const e of jsonldNutrients) {
    const nutrient =
      Array.isArray(e[1]) == false
        ? e[1]
        : e[1].find((i) => i["s:unitCode"] == "KJO");

    const newNutrient = {
      nutrient: {
        code: e[0].replace(suffix, ""),
        translations: {
          fr: {
            name: nutrientTranslations.fr[e[0].replace(suffix, "")],
          },
        },
      },
      sequence: sequence.toString(),
      quantity: {
        value:  parseFloat(nutrient["s:value"]["@value"]),
        unit: {
          code: nutrient["s:unitCode"],
        },
      },
    };

    if (nutrient.dailyValueIntakePercent)
      newNutrient.dailyValueIntakePercent = parseFloat(
        nutrient.dailyValueIntakePercent["@value"]
      );

    nutrientList.push(newNutrient);
    sequence++;
    delete product[e[0]];
  }

  nutrientList.forEach((n) => enrichUnit(n.quantity.unit));

  nutrientList = nutrientList.sort(
    (a, b) =>
      nutrientOrder.indexOf(a.nutrient.code) -
      nutrientOrder.indexOf(b.nutrient.code)
  );

  product.nutrientList = nutrientList;
}

function enrichUnit(unit) {
  if (unit.code == "GRM") unit.symbol = "gr";

  if (unit.code == "KJO") unit.symbol = "KJ";

  if (unit.code == "MLT") unit.symbol = "ml";
}

export function extractFromProduct(product) {
  const options = {
    language: {
      main: "fr",
      all: ["fr"],
    },
  };

  mapProduct(product, options);

  const { productCategory, productClassification } = extractProductCategory(
    product,
    options
  );

  const workspace = product.producer;

  mapOrganizationToWorkspace(workspace, options);

  // relations
  product.producer = {
    workspace: {
      ids: workspace.ids,
    },
  };

  product.categories = [
    {
      ids: productCategory.ids,
    },
  ];

  const context = {
    products: [product],
    workspaces: [workspace],
    productCategories: [productCategory],
    productClassifications: [productClassification],
  };
  return context;
}

function extractProductCategory(product, options) {
  const productClassification = {
    ids: ["gpc"],
  };

  const productCategory = {
    ids: ["gpc/" + product.gpcCategoryCode],
    code: product.gpcCategoryCode,
    name: extractMainTranslation(
      product.gpcCategoryDescription,
      options.language
    ),
    classification: {
      ids: productClassification.ids,
    },
  };

  delete product.gpcCategoryDescription;
  delete product.gpcCategoryCode;
  return { productCategory, productClassification };
}

function mapProduct(product, options) {
  propertyUnused(product);
  propertyRenaming(product);
  isolateNutritionMeasurementType(product);

  assignTranslationToProperties.forEach((p) => {
    assignTranslation(product, p, options.language);
  });

  product.publishedAt = new Date(product.publishedAt);

  // TODO factorise to quantity function
  if (product.netContent != null) {
    product.netContents = [
      {
        value: parseFloat(product.netContent["s:value"]["@value"]),
        unit: {
          code: product.netContent["s:unitCode"],
        },
      },
    ];

    product.netContents.forEach((n) => enrichUnit(n.unit));

    delete product.netContent
  }

  if (product.grossWeight != null) {
    product.grossWeight = {
      value: parseFloat(product.grossWeight["s:value"]["@value"]),
      unit: {
        code: product.grossWeight["s:unitCode"],
      },
    };
  }

  if (product.supplierSpecifiedMinimumConsumerStorageDays != null)
    product.supplierSpecifiedMinimumConsumerStorageDays = parseInt(
      product.supplierSpecifiedMinimumConsumerStorageDays["@value"]
    );

  if (product.image != null)
    product.image = {
      url: product.image["s:url"]["@id"],
    };

  product.ingredientList = product.ingredient?.map((i) => {
    const ing = {
      ingredient: {
        name: extractMainTranslation(i.ingredientName, options.language),
      },
      sequence: i.ingredientSequence["@value"].toString(),
    };

    if (i.ingredientContentPercentage != null)
      ing.contentPercentage = parseFloat(
        i.ingredientContentPercentage["@value"]
      );

    return ing;
  });

  delete product.ingredient;

  product.ids = ["batra/products/" + product.gtin, "gtin/" + product.gtin];
}

function mapOrganizationToWorkspace(workspace, options) {
  workspace.renameProperty("contactPoint", "contactPoints");
  workspace.renameProperty("vatID", "vatId");
  workspace.renameProperty("taxID", "taxId");
  delete workspace.globalLocationNumber;

  if(Array.isArray(workspace.address) == false){
    workspace.address = [workspace.address]
  }

  workspace.address = workspace.address.map((a) => ({
    street: a.streetAddress,
    postalCode: a.postalCode,
    locality: a.addressLocality,
    country: {
      name: a.addressCountry == "056" ? "Belgium" : "Unknown",
    },
  }))[0];

  workspace.contactPoints?.forEach((c) => {
    (c.title = c.contactTitle), (c.type = c.contactType);
    delete c.contactTitle;
    delete c.contactType;
  });

  workspace.ids = [
    "batra/organizations/" + workspace["@id"],
    "be/enterprises/" +
      workspace.taxId.replace("BE", "").replace(new RegExp("\\.", "g"), ""),
    "tax_id/" +
      main.sluggify(workspace.taxId.replace(new RegExp("\\.", "g"), "")),
  ];
  delete workspace["@id"];

  assignTranslation(workspace, "name", options.language);
}
