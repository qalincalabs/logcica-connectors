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

export function mapToWorkspace(context) {
  const item = context.generalSettings;
  const order = context.orders[0];

  const shopUrl = order._links.self[0].href.split("/wp-json")[0]
  const shopKey = getDomain(shopUrl);

  const workspace = {
    ids: [shopKey],
    key: shopKey,
    url: shopUrl,
    name: shopKey, // TODO can't get the name ...
    address: {
      street: [
        item.find((i) => i.id == "woocommerce_store_address").value,
        item.find((i) => i.id == "woocommerce_store_address_2").value,
      ]
        .filter((i) => i)
        .join(", "),
      postalCode: item.find((i) => i.id == "woocommerce_store_postcode").value,
      locality: item.find((i) => i.id == "woocommerce_store_city").value,
      country: {
        code: item.find((i) => i.id == "woocommerce_default_country").value,
      },
    },
  };

  return workspace;
}
