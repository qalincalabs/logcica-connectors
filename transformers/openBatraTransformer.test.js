import * as openBatraTransformer from "./openBatraTransformer.js";
import * as openFoodNetworkTransformer from "./openFoodNetworkTransformer";

test("OpenBatra template", async () => {
  //openBatraProduct["s:manufacturer"] = manufacturer;

  const product = openBatraProduct;
  const context = openBatraTransformer.extractFromProduct(product);

  const logCiCaProduct = context.products[0];
  logCiCaProduct.ids.push("ofn_be/product/11408");

  const ofnProduct = openFoodNetworkTransformer.mapProduct(logCiCaProduct);

  console.log(JSON.stringify(ofnProduct, null, 2));
});

const openBatraProduct = {
  "@context": {
    "gs1": "http://gs1.org/voc/",
    "s": "https://schema.org/",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "@vocab": "http://gs1.org/voc/"
  },
  "@type": ["gs1:Beverage", "s:Product"],
  "s:name": [
    { "@value": "Jus de Pomme - Carotte - Rhubarbe 1L", "@language": "fr" }
  ],
  "s:brand": {
    "s:name": [{ "@value": "Fruit Collect", "@language": "fr" }],
    "@type": ["gs1:Brand", "s:Brand"]
  },
  "productMarketingMessage": [
    {
      "@value": "Ce m\u00e9lange original est bien \u00e9quilibr\u00e9, doux et peu sucr\u00e9.  A d\u00e9guster id\u00e9alement bien frais, pour l'ap\u00e9ro ou le brunch!    Ce jus a \u00e9t\u00e9 r\u00e9alis\u00e9 \u00e0 partir de fruits et l\u00e9gumes r\u00e9colt\u00e9s avec amour par nos b\u00e9n\u00e9voles dans des jardins priv\u00e9s belges. Certains surplus ou invendus ont \u00e9galement \u00e9t\u00e9 rachet\u00e9s \u00e0 des agriculteurs belges afin d'\u00e9viter le gaspillage alimentaire. FruitCollect et ses b\u00e9n\u00e9voles r\u00e9coltent les fruits et l\u00e9gumes au gr\u00e9 des saisons. La production traditionnelle des jus en bouteille consign\u00e9e a quant \u00e0 elle \u00e9t\u00e9 r\u00e9alis\u00e9e par une petite entreprise familiale dans le Hainaut. Nos jus sont donc 100% anti-gaspillage et issus de l'\u00e9conomie circulaire.",
      "@language": "fr"
    }
  ],
  "s:image": {
    "s:url": {
      "@id": "https://jus-fruitcollect.odoo.com/web/image/product.product/1/image_1024/%5BPmCaRh1L%5D%20Jus%20de%20Pomme%20-%20Carotte%20-%20Rhubarbe%201L?unique=6f6bc0a"
    },
    "@type": ["gs1:ReferencedFileDetails", "s:MediaObject"]
  },
  "gpcCategoryCode": "9999999",
  "s:manufacturer": {
    "taxID": "BE0642.831.371",
    "vatID": "BE0642.831.371",
    "globalLocationNumber": "5430001830002",
    "name": [
      { "@language": "fr", "@value": "FruitCollect" },
      { "@language": "nl", "@value": "FruitCollect" }
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
        "contactType": "Support \u00e0 la client\u00e8le",
        "availableLanguage": "fr",
        "telephone": "+32 479 06 84 48 ",
        "faxNumber": "",
        "email": "fruitcollect@gmail.com",
        "url": "https://jus-fruitcollect.odoo.com/shop/"
      }
    ],
    "@id": "5430001830002"
  },
  "gtin": "05430001830003"
}


