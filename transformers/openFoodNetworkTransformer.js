export function mapProduct(product) {
  const ofnId = product.ids
    .find((i) => i.startsWith("ofn_be/product/"))
    .replace("ofn_be/product/", "");

  const outputProduct = {
    id: ofnId,
    name: product.name,
    description: productDescriptionTemplate(product),
  };

  return outputProduct;
}

// 5 types d'usages
// Nos bouteilles sont récupérées et réinjectées dans le circuit d'embouteillement de nos jus.
// Comment représenté acidité et sucrosité ?? (dans une des description)
// support markdown in marketing message and other long text
// dans contact ajouter twitter, facebook, ... Rue de Liedekerke 71, 1210 Bruxelles, Belgique
// permettre la traduction de origne par exemple

function applyTemplate(template, data) {
  return data == null ? "" : template(data);
}

function ifNoneEmpty(strings, ...args) {
  if (args == null) return "";
  // TODO : why is args[0] == null required when args.includes(null)
  if (args.includes(null) || args.includes("") || args[0] == null) return "";
  return strings.reduce(
    (acc, currentString, index) => acc + currentString + (args[index] || ""),
    ""
  );
}

// TODO alcohol should be at the base of the product or in nutriment ??
// product.alcohol?.quantity.percentage

/*
const contactPoint = product.producer.workspace.contactPoints[0];

<p><strong><u>Point de contact</u></strong></p>
<p>
${contactPoint.title ? contactPoint.title : ""}${
contactPoint.telephone ? ", " + contactPoint.telephone : ""
}${contactPoint.email ? ", " + contactPoint.email : ""}
*/

/* Supported properties
gtin
imageUrl
netContent
description
marketingMessage
countryOfOriginStatement
alcoholQuantityPercentage
ingredientStatement
nutrients (KJ, dailyValueIntakePercent)
consumerUsageInstructions
consumerStorageInstructions
*/

// TODO : nutrients should take less space (comment from a producer)
function productDescriptionTemplate(product) {
  const firstNetContent = product.netContents?.[0];
  const offUrl = product.gtin.startsWith("054")
    ? `https://fr.openfoodfacts.org/produit/${product.gtin}`
    : null; // using fr instead of be (in dutch) or be-fr (strange website display ...)
  const batraUrl = `https://www.batra.link/batra2.0/productFull.html?gtin=${product.gtin}`;

  console.log(product.countryOfOriginStatement);

  return `
  ${ifNoneEmpty`<p><i>${product.description}</i></p>`}
  ${ifNoneEmpty`<p>${product.marketingMessage}</p>`}
  
  ${ifNoneEmpty`<p><i>Origine:</i> ${product.countryOfOriginStatement}</p>`}
  ${ifNoneEmpty`<p><i>Contenu net:</i> ${firstNetContent?.value}${
    firstNetContent?.unit.symbol ?? firstNetContent?.unit.code
  }</p>`} 
  ${ifNoneEmpty`<p><strong>Pourcentage d'alcool: </strong>${
    product.alcoholPercentage ?? ""
  }%</p>`}
  
  ${ifNoneEmpty`<p><strong>Ingrédients: </strong>${product.ingredientStatement}</p>`}
  
  ${ifNoneEmpty`<p><i>Instructions d'utilisation:</i> ${product.consumerUsageInstructions}</p>`}
  
  ${ifNoneEmpty`<p><i>Instructions de stockage:</i> ${product.consumerStorageInstructions}`}

  ${applyTemplate(productDescriptionAllergenTemplate, product.allergenList)}
  
  ${applyTemplate(productDescriptionNutritionTemplate, product.nutrientList)}

  <p> Fiche produit de *${product.gtin}* sur 
    <a href="${batraUrl}">Batra</a>
    ${ifNoneEmpty`| <a href="${offUrl}">Open Food Facts</a>`}
  </p>
  `;
}

function productDescriptionNutritionTemplate(nutrientList) {
  if (nutrientList == null || nutrientList.length == 0) return "";

  return `
    <p>
      <strong><u>Valeurs nutritionnelles</u><strong> (% des apports calculés sur base de 100g)
    </p> 

    ${nutrientList
      .filter((i) =>
        [
          "energy",
          "fat",
          "saturatedFat",
          "carbohydrates",
          "sugars",
          "protein",
          "salt",
        ].includes(i.nutrient.code)
      )
      .map((i) => {
        return `<p>${
          ["saturatedFat", "sugars"].includes(i.nutrient.code)
            ? "&nbsp;&nbsp;&nbsp;&nbsp;- dont "
            : ""
        }${
          i.nutrient.translations?.fr?.name ??
          i.nutrient.name ??
          i.nutrient.code
        }: ${i.quantity.value} ${
          i.quantity.unit.symbol ?? i.quantity.unit.code
        }${
          i.dailyValueIntakePercent
            ? " (" + i.dailyValueIntakePercent + "% AR INCO)"
            : ""
        }
        </p>`;
      })
      .join("")}
    `;
}

function productDescriptionAllergenTemplate(allergenList) {
  if (allergenList == null || allergenList.length == 0) return "";

  return `
    <p>
      <strong><u>Allergènes</u><strong>
    </p> 

    ${allergenList
      .filter((i) =>
        [
          "fish",
          "eggs",
          "celery",
          "milk",
          "lupine",
          "mustard",
          "crustaceans",
          "tree_nuts",
          "sesame_seeds",
          "sulphur_dioxide",
          "cereals_containing_gluten",
          "soybeans",
          "peanuts",
          "molluscs",
        ].includes(i.allergen.key)
      )
      .map((i) => {
        return `<p>${
          i.levelOfContainment.translations?.fr?.name ??
          i.levelOfContainment.name ?? // should this be code ?
          i.levelOfContainment.key 
        } ${
          (
            i.allergen.translations?.fr?.name ??
            i.allergen.name ??
            i.allergen.key // should this be code ?
          ).toLowerCase() 
        }
        </p>`;
      })
      .join("")}
    `;
}