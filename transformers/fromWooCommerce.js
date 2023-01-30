import * as extractor from "./wooCommerceExtractor.js";
import * as core from "../core/main.js";

function getDomain(url, subdomain) {
  subdomain = subdomain || false;

  url = url.replace(/(https?:\/\/)?(www.)?/i, "");

  if (!subdomain) {
    url = url.split(".");
    url = url.slice(url.length - 2).join(".");
  }

  if (url.indexOf("/") !== -1) {
    return url.split("/")[0];
  }

  return url;
}

function extractCountry(countryCode) {
  return "BE" ? "Belgium" : countryCode;
}

function extractAddressFromGeneralSettings(item) {
  return {
    street: [
      item.find((i) => i.id == "woocommerce_store_address").value,
      item.find((i) => i.id == "woocommerce_store_address_2").value,
    ]
      .filter((i) => i)
      .join(", "),
    postalCode: item.find((i) => i.id == "woocommerce_store_postcode").value,
    locality: item.find((i) => i.id == "woocommerce_store_city").value,
    country: extractCountry(
      item.find((i) => i.id == "woocommerce_default_country").value
    ),
  };
}

export function extractWorkspaceFromOrder(context) {
  const order = context.orders[0];

  const shopUrl = order._links.self[0].href.split("/wp-json")[0];
  const shopKey = getDomain(shopUrl);

  const workspace = {
    ids: [shopKey],
    key: shopKey.replaceAll(".", "-"),
    link: shopUrl,
    name: shopKey, // TODO can't get the name ...
  };

  return workspace;
}

function extractAddressName(address) {
  return [address.first_name, address.last_name, address.company]
    .filter((n) => n)
    .join(" ");
}

function extractAddress(address) {
  const street = [address.address_1, address.address_2]
    .filter((n) => n)
    .join(" ");

  return {
    street: street,
    postalCode: address.postcode,
    locality: address.city,
    country: extractCountry(address.country),
  };
}

function buildPlaceId(place) {
  const address = place.address;

  const array = [
    place.name,
    address.street,
    address.postalCode,
    address.locality,
    address.country,
  ];
  return "logcica/places/" + core.sluggify(array.join("_"));
}

// TODO add notion of salesChannel (online, the tool, ... ???)
// or is it a workspace
export function map(context) {
  const platform = {
    key: "woocommerce",
    name: "WooCommerce",
  };

  const externalOrder = context.orders[0];
  const sellerWorkspace = extractWorkspaceFromOrder(context);
  const externalProducts = context.products;
  const externalVariants = context.variations;

  const sellerWorkspaceKey = sellerWorkspace.key;

  const sellerShippingAddress = extractAddressFromGeneralSettings(
    context.generalSettings
  );
  const sellerShippingPlace = {
    name: sellerWorkspace.name,
    services: ["shipping"],
    address: sellerShippingAddress,
  };
  sellerShippingPlace.ids = [buildPlaceId(sellerShippingPlace)];

  sellerWorkspace.place = {
    ids: sellerShippingPlace.ids,
  };

  const buyerShippingAddress = extractAddress(externalOrder.shipping);

  const buyerShippingPlace = {
    name: extractAddressName(externalOrder.shipping),
    services: ["shipping"],
    address: buyerShippingAddress,
  };

  buyerShippingPlace.ids = [buildPlaceId(buyerShippingPlace)];

  const buyerWorkspace = {
    ids: [externalOrder.billing.email],
    name: extractAddressName(externalOrder.billing),
  };

  const noShippingMethod = {
    ids: ["logcica/no_shipping_method"],
    name: "No shipping method",
    owner: {
      workspace: {
        ids: sellerWorkspace.ids
      }
    }
  }

  const newContext = {
    workspaces: [sellerWorkspace, buyerWorkspace],
    places: [sellerShippingPlace, buyerShippingPlace],
    shippingMethods: [noShippingMethod]
  };

  const order = {
    ids: [sellerWorkspace.key + "/orders/" + externalOrder.id],
    number: externalOrder.id.toString(),
    createdAt: externalOrder.date_created_gmt + "Z",
    link:
      sellerWorkspace.link +
      "/wp-admin/post.php?post=" +
      externalOrder.id +
      "&action=edit",
    status: externalOrder.status, // TODO create standard for this
    buyer: {
      workspace: {
        ids: buyerWorkspace.ids,
      },
    },
    seller: {
      workspace: {
        ids: sellerWorkspace.ids,
      },
    },
    broker: {
      workspace: {
        ids: sellerWorkspace.ids,
      },
    },
    // TODO kind of a stub, to remove
    shippingAddress: {
      place: {
        ids: buyerShippingPlace.ids,
      },
    },
    shippingMethod: {
      ids: noShippingMethod.ids
    }
  };

  const productClassification = {
    ids: [sellerWorkspace.key + "-" + platform.key],
    name: sellerWorkspace.key + " - " + platform.name,
    owner: {
      workspace: {
        ids: sellerWorkspace.ids,
      },
    },
  };

  const getProductCategoryId = (c) =>
    sellerWorkspaceKey + "/product_categories/" + c.id;

  const productCategories = extractor
    .extractCategoriesFromProducts(externalProducts)
    .map((c) => ({
      ids: [getProductCategoryId(c)],
      name: c.name,
      classification: {
        ids: productClassification.ids,
      },
    }));

  newContext.productClassifications = [productClassification];
  newContext.productCategories = productCategories;

  const externalReferencedProducts = externalOrder.line_items.map((i) => {
    const externalProduct = externalProducts.find((p) => p.id == i.product_id);
    const externalVariant =
      externalVariants.find((v) => v.id == i.variation_id) ?? externalProduct;
    externalVariant.categories = externalProduct.categories;
    return externalVariant;
  });

  const getProductId = (p) => sellerWorkspaceKey + "/products/" + p.id;

  const products = externalReferencedProducts.map((p) => ({
    ids: [getProductId(p)], // TODO : better ids
    name: p.name,
    createdAt: p.date_created_gmt + "Z",
    categories: p.categories.map((c) => ({
      ids: [getProductCategoryId(c)],
    })),
    producer: {
      workspace: {
        ids: sellerWorkspace.ids,
      },
    },
  }));

  newContext.products = products;

  // TODO product groups

  /*
  if (externalProduct.id != externalVariant.id)
      line.product.group = {
        ids: [sellerWorkspace.url + "/products/" + externalProduct.id],
        name: externalProduct.name,
        createdAt: externalProduct.date_created_gmt + "Z",
      };
  */

  order.lines = externalOrder.line_items.map((p) => ({
    name: p.name,
    product: {
      ids: [sellerWorkspaceKey + "/products/" + (p.variation_id != 0 ? p.variation_id : p.product_id)],
    },
    quantity: {
      value: p.quantity,
    },
  }));

  /*
shippingMethod: {
  ids: ["https://openfoodnetwork.be/shippingmethods/"+externalOrder.shipping_method.id],
  name: externalOrder.shipping_method.name,
  description: externalOrder.shipping_method.description
}
*/

  newContext.orders = [order];

  /*
  newContext.shippingMethods = [];
  newContext.catalogs = [];
  newContext.catalogItems = [];
  newContext.offers = [];
  newContext.salesSessions = [];
  newContext.suppliers = [];
  newContext.customers = [];
  */

  return newContext;
}
