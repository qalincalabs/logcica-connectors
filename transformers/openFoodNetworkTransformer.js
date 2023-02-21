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
  if (args.includes(null) || args.includes("")) return "";
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

function productDescriptionTemplate(product) {
  const firstNetContent = product.netContents?.[0];
  const offUrl = product.gtin.startsWith("054")
    ? `https://fr.openfoodfacts.org/produit/${product.gtin}`
    : null; // using fr instead of be (in dutch) or be-fr (strange website display ...)
  const batraUrl = `https://www.batra.link/batra2.0/productFull.html?gtin=${product.gtin}`;

  return `
  <p><i>${product.description}</i></p>
  <p>${product.marketingMessage}</p>
  <p> Fiche produit sur 
    <a href="${batraUrl}">Batra</a>
    ${ifNoneEmpty`| <a href="${offUrl}">Open Food Facts</a>`}
  </p>
  
  <p><i>GTIN:</i> ${product.gtin}</p>
  
  ${ifNoneEmpty`<p><i>Origine:</i> ${product.countryOfOriginStatement}</p>`}
  ${ifNoneEmpty`<p><i>Contenu net:</i> ${firstNetContent.value}${
    firstNetContent.unit.symbol ?? firstNetContent.unit.code
  }</p>`} 
  ${ifNoneEmpty`<p><strong>Pourcentage d'alcool: </strong>${product.alcohol?.quantity?.percentage ?? ""}%</p>`}
  
  <p>
  <strong>Ingrédients: </strong>${product.ingredientStatement}
  </p>
  
  ${ifNoneEmpty`<p><i>Instructions d'utilisation:</i> ${product.consumerUsageInstructions}</p>`}
  
  ${ifNoneEmpty`<p><i>Instructions de stockage:</i> ${product.consumerStorageInstructions}`}
  
  ${applyTemplate(productDescriptionNutritionTemplate, product.nutrientList)}
  `;
}

function productDescriptionNutritionTemplate(nutrientList) {
  return `
    <p>
      <strong><u>Valeurs nutritionnelles</u><strong> (% des apports calculés sur base de 100g)
    </p> 
    
    ${nutrientList
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
