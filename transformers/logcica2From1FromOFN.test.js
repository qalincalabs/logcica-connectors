test("logcica 2 - order", async () => {
  const oldOrder = logCiCa1Output.orders[0]

  const order = {
    createdAt: oldOrder.createdAt,
    number: oldOrder.number,
    // seller
    // customer
    // broker
    lines: {
        
    }
  }

  console.log(JSON.stringify(logCiCa1Output.orders, null, 2));
});

const logCiCa1Output = {
  codes: [
    {
      ids: ["ofn_be/country/29"],
      name: "Belgium",
      list: {
        ids: ["iso/country"],
      },
    },
  ],
  places: [
    {
      ids: ["ofn_be/address/93146"],
      name: "Olivier Wouters",
      services: ["shipping"],
      private: true,
      address: {
        street: "Grand rue 40",
        postalCode: "6850",
        locality: "Carlsbourg",
        country: "Belgium",
      },
    },
    {
      ids: ["ofn_be/address/93145"],
      name: "Olivier Wouters",
      services: ["billing"],
      private: true,
      address: {
        street: "Grand rue 40",
        postalCode: "6850",
        locality: "Carlsbourg",
        country: "Belgium",
      },
    },
  ],
  workspaces: [
    {
      ids: ["ofn_be/user/3497"],
    },
    {
      ids: ["ofn_be/enterprise/591"],
    },
    {
      ids: ["logcica/workspace/ofn_be"],
    },
  ],
  customers: [
    {
      ids: ["ofn_be/customer/2997"],
      owner: {
        workspace: {
          ids: ["ofn_be/enterprise/591"],
        },
      },
      places: [
        {
          ids: ["ofn_be/address/93146"],
        },
        {
          ids: ["ofn_be/address/93145"],
        },
      ],
    },
  ],
  suppliers: [
    {
      ids: ["ofn_be/user/3497/enterprise/591"],
      name: "Comptoir Demo OFN",
      owner: {
        workspace: {
          ids: ["ofn_be/user/3497"],
        },
      },
    },
  ],
  shippingMethods: [
    {
      ids: [
        "ofn_be/shipping_method/112",
        "https://openfoodnetwork.be/shippingmethods/112",
      ],
      type: "delivery",
      name: "Livraison par Bpost",
      description:
        "La commande vous sera livrée dans les 2 jours ouvrables après la date choisie lors de votre commande - vu les circonstances ce délai peut-être plus long. Exemple : si commande prête pour le lundi 20/04, elle vous sera livrée vers le 22/04.",
      owner: {
        workspace: {
          ids: ["ofn_be/enterprise/591"],
        },
      },
    },
  ],
  salesSessions: [
    {
      ids: ["ofn_be/order_cycle/2880"],
      owner: {
        workspace: {
          ids: ["ofn_be/enterprise/591"],
        },
      },
    },
  ],
  catalogs: [
    {
      ids: ["ofn_be/order_cycle/2880"],
      owner: {
        workspace: {
          ids: ["ofn_be/enterprise/591"],
        },
      },
    },
  ],
  productClassifications: [
    {
      ids: ["logcica/product_classification/ofn_be"],
      owner: {
        workspace: {
          ids: ["logcica/workspace/ofn_be"],
        },
      },
    },
  ],
  productCategories: [
    {
      ids: ["ofn_be/taxon/109"],
      classification: {
        ids: ["logcica/product_classification/ofn_be"],
      },
    },
  ],
  productGroups: [
    {
      ids: ["ofn_be/product/9694"],
      name: "Salade",
      producer: {
        workspace: {
          ids: ["ofn_be/enterprise/591"],
        },
      },
    },
  ],
  products: [
    {
      ids: ["ofn_be/variant/23699", "ofn_be/variant/id/23699"],
      name: "Salade",
      group: {
        ids: ["ofn_be/product/9694"],
      },
      categories: [
        {
          ids: ["ofn_be/taxon/109"],
        },
      ],
      producer: {
        workspace: {
          ids: ["ofn_be/enterprise/591"],
        },
      },
      quantity: {
        value: "1",
        unit: {
          text: "unité",
        },
      },
    },
  ],
  offers: [
    {
      ids: ["ofn_be/enterprise/591/variant/23699/price/0.0"],
      product: {
        ids: ["ofn_be/variant/23699"],
      },
      price: {
        value: "0.0",
      },
      owner: {
        workspace: {
          ids: ["ofn_be/enterprise/591"],
        },
      },
    },
  ],
  catalogItems: [
    {
      ids: ["ofn_be/order_cycle/2880/variant/23699"],
      name: "Salade",
      product: {
        ids: ["ofn_be/variant/23699"],
      },
      catalog: {
        ids: ["ofn_be/order_cycle/2880"],
      },
      offers: [
        {
          ids: ["ofn_be/enterprise/591/variant/23699/price/0.0"],
        },
      ],
    },
  ],
  orders: [
    {
      number: "R054751772",
      link: "https://openfoodnetwork.be/admin/orders/R054751772/edit",
      ids: ["ofn_be/orders/R054751772"],
      createdAt: "2023-10-13T00:00:00.000Z",
      status: "complete",
      shipmentStatus: "ready",
      paymentStatus: "credit_owed",
      buyer: {
        customer: {
          ids: ["ofn_be/customer/2997"],
        },
        workspace: {
          ids: ["ofn_be/user/3497"],
        },
      },
      seller: {
        supplier: {
          ids: ["ofn_be/user/3497/enterprise/591"],
        },
        workspace: {
          ids: ["ofn_be/enterprise/591"],
        },
      },
      broker: {
        workspace: {
          ids: ["logcica/workspace/ofn_be"],
        },
      },
      channel: {
        ids: ["logcica/transaction_channel/ofn_be"],
        name: "Open Food Network Belgium",
      },
      shippingAddress: {
        place: {
          ids: ["ofn_be/address/93146"],
        },
      },
      shippingMethod: {
        ids: ["ofn_be/shipping_method/112"],
      },
      salesSession: {
        ids: ["ofn_be/order_cycle/2880"],
      },
      totalPrice: {
        value: "-8.5",
      },
      lines: [
        {
          name: "Salade",
          item: {
            ids: ["ofn_be/order_cycle/2880/variant/23699"],
          },
          product: {
            ids: ["ofn_be/variant/23699"],
          },
          offer: {
            ids: ["ofn_be/enterprise/591/variant/23699/price/0.0"],
          },
          quantity: {
            value: 1,
          },
        },
      ],
    },
  ],
};
