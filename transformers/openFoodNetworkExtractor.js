import * as contextExtract from "../core/extract.js"
import * as main from "../core/main.js"

export function cleanUpOrder(order) {

  order.completed_at = main.normalizeDate(order.completed_at)
  order.created_at = main.normalizeDate(order.created_at)
  
  order.user = {
    id: order.user_id,
    full_name: order.full_name,
    email: order.email,
    phone: order.phone,
  };

  delete order.user_id;
  delete order.full_name;
  delete order.email;
  delete order.phone;

  order.distributor.name = order.distributor_name;
  delete order.distributor_name;

  if (order.customer_id != null) {
    order.customer = {
      id: order.customer_id,
    };
    delete order.customer_id;
  }

  ["bill_address", "ship_address"].forEach((a) => {
    delete order[a].id;

    order[a].country = {
      id: order[a].country_id,
      name: order[a].country_name,
    };

    delete order[a].country_id;
    delete order[a].country_name;

    order[a].state = {
      id: order[a].state_id,
      name: order[a].state_name,
    };

    delete order[a].state_id;
    delete order[a].state_name;
  });

  for (const line of order.line_items) {
    delete line.order_id;
    delete line.tax_category_id;
    line.variant = {
      id: line.variant.id,
    };
  }

  // TODO not supported
  delete order.payments;
  delete order.adjustments;

  return order;
}

export function cleanUpProduct(product) {

  product.import_date = main.normalizeDate(product.import_date)
  product.available_on = main.normalizeDate(product.available_on)

  delete product.master;
  delete product.sku;
  delete product.inherits_properties;
  delete product.on_hand;
  delete product.price;

  product.producer = {
    id: product.producer_id,
    name: product.variants[0].producer_name,
  };

  delete product.producer_id;

  product.tax_category = {
    id: product.tax_category_id,
  };

  delete product.tax_category_id;

  product.category = {
    id: product.category_id,
  };

  delete product.category_id;

  for (const variant of product.variants) {
    variant.import_date = main.normalizeDate(variant.import_date)

    delete variant.stock_location_id;
    delete variant.stock_location_name;
    delete variant.variant_overrides_count;
    delete variant.image;
    delete variant.producer_name;
  }

  return product;
}

// clean up before extracting
export function extract(context) {
    const config = getConfig();
    const extraction = contextExtract.applyExtraction(context, config);
    return extraction;
}

export function getConfig() {

  const extractFromOrder = (destinationName, orderProperty, destinationIdKey) => {
    return {
      destination: { key: destinationName, idKey: destinationIdKey },
      extractAll: (ctx) => ctx.orders.map((o) => o[orderProperty]),
    };
  };

  const config = {
    target: { key: "ofn_be" },
    destination: { key: "logCiCa" },
    extractions: [
      {
        destination: { key: "enterprises", idKey: "enterprise" },
        extractAll: (ctx) => ctx.products.map((p) => p.producer),
      },
      {
        destination: { key: "product_categories", idKey: "product_category" },
        extractAll: (ctx) => ctx.products.map((p) => p.category),
      },
      {
        destination: { key: "tax_categories", idKey: "tax_category" },
        extractAll: (ctx) => ctx.products.map((p) => p.tax_category),
      },
      {
        destination: { key: "variants", idKey: "variant" },
        extractAll: (ctx) => ctx.products.map((p) => p.variants).flat(),
      },
      {
        destination: { key: "products", idKey: "product" },
        extractAll: (ctx) => ctx.products,
      },
      {
        destination: { key: "countries", idKey: "country" },
        extractAll: (ctx) =>
          ctx.orders
            .map((o) => [o.bill_address.country, o.ship_address.country])
            .flat(),
      },
      {
        destination: { key: "states", idKey: "state" },
        extractAll: (ctx) =>
          ctx.orders
            .map((o) => [o.bill_address.state, o.ship_address.state])
            .flat(),
      },
      extractFromOrder("enterprises", "distributor", "enterprise"),
      extractFromOrder("users", "user", "user"),
      extractFromOrder("customers", "customer", "customer"),
      extractFromOrder("order_cycles", "order_cycle",  "order_cycle"),
      extractFromOrder("shipping_methods", "shipping_method", "shipping_method"),
      {
        destination: { key: "orders", idKey: "order" },
        extractAll: (ctx) => ctx.orders,
        distributeRelationships: (el, newCtx) => {
          newCtx.customers
            .filter((c) => c.ids[0] == el.customer.ids[0])
            .forEach((c) => (c.enterprise = el.distributor));
          newCtx.order_cycles
            .filter((c) => c.ids[0] == el.order_cycle.ids[0])
            .forEach((c) => (c.enterprise = el.distributor));
          newCtx.shipping_methods
            .filter((c) => c.ids[0] == el.shipping_method.ids[0])
            .forEach((c) => (c.enterprise = el.distributor));
        },
      },
    ],
  };

  return config;
}

const OfnApiV0Extractor = () => {};
export default OfnApiV0Extractor;
