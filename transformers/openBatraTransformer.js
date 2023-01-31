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
];

function assignTranslation(product, propertyName, languageOptions) {

  if(product[propertyName] == null)
    return

  product[propertyName] = extractMainTranslation(
    product[propertyName],
    languageOptions
  );
}

function extractMainTranslation(p, languageOptions) {

  if(p == null)
    return

  let prop = p.find((n) => n["@language"] == languageOptions.main);
  if (prop == null) prop = p[0];
  return prop["@value"];
}

function isolateNutritionMeasurementType(product) {
  const suffix = "PerNutrientBasis";

  const nutrientList = [];

  for (const e of Object.entries(product).filter((me) =>
    me[0].endsWith(suffix)
  )) {
    const nutrient =
      Array.isArray(e[1]) == false
        ? e[1]
        : e[1].find((i) => i["s:unitCode"] == "KJO");
    nutrientList.push({
      nutrient: {
        code: e[0].replace(suffix, ""),
      },
      quantity: {
        value: nutrient["s:value"]["@value"],
        unit: {
          code: nutrient["s:unitCode"],
        },
      },
    });
    delete product[e[0]];
  }

  product.nutrientList = nutrientList;
}

export function extractFromProduct(product) {
    const options = {
        language: {
            main: "fr",
            all: ["fr"]
        }
    };

    mapProduct(product, options);

    const { productCategory, productClassification } = extractProductCategory(
        product,
        options
    );

    const workspace = product.producer;

    mapOrganizationToWorkspace(
        workspace,
        options
    );

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

    // skip netContent
    // skip nutrient
    delete product.nutrientList;
    delete product.netContent;

    const context = {
        products: [product],
        workspaces: [workspace],
        productCategories: [productCategory],
        productClassifications: [productClassification],
    };
    return context;
}

function extractProductCategory(
  product,
  options
) {
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

  product.publishedAt = new Date(product.publishedAt)

  product.netContent = {
    value: product.netContent["s:value"]["@value"],
    unit: {
      code: product.netContent["s:unitCode"],
    },
  };

  if(product.supplierSpecifiedMinimumConsumerStorageDays != null)
  product.supplierSpecifiedMinimumConsumerStorageDays =
    product.supplierSpecifiedMinimumConsumerStorageDays["@value"];

  if(product.image != null)
  product.image = {
    url: product.image["s:url"]["@id"],
  };

  product.ingredientList = product.ingredient.map((i) => ({
    ingredient: {
      name: extractMainTranslation(i.ingredientName, options.language)
    },
    sequence: i.ingredientSequence["@value"].toString(),
  }));

  delete product.ingredient;

  product.ids = ["batra/products/" + product.gtin, "gtin/" + product.gtin];
}

function mapOrganizationToWorkspace(
  workspace,
  options
) {
  workspace.renameProperty("contactPoint", "contactPoints");
  workspace.renameProperty("vatID", "vatId");
  workspace.renameProperty("taxID", "taxId");
  delete workspace.globalLocationNumber;

  workspace.address = workspace.address.map((a) => ({
    street: a.streetAddress,
    postalCode: a.postalCode,
    locality: a.addressLocality,
    country: {
      name: a.addressCountry == "056" ? "Belgium" : "Unknown",
    },
  }))[0];

  /*
  producer.contactPoints.forEach(c => {
    c.title = c.contactTitle,
    c.type = c.contactType
    delete c.contactTitle
    delete c.contactType
  })
  */

  delete workspace.contactPoints;

  workspace.ids = [
    "batra/organizations/" + workspace["@id"],
    "be/enterprises/" +
      workspace.taxId.replace("BE", "").replace(new RegExp("\\.", "g"), ""),
    "tax_id/" +
      main.sluggify(workspace.taxId.replace(new RegExp("\\.", "g"), "")),
  ];
  delete workspace["@id"];

  assignTranslation(
    workspace,
    "name",
    options.language
  );
}