import * as logcica from "./index.js";

test("Connector entry", async () => {
  const limosaConnector = new logcica.connectors.LimosaConnector();

  const enrichedPlace = await limosaConnector.enrichPlace({
    address: {
      house: "14",
      street: "Quai des Saulx",
      locality: "Bouillon",
      postalCode: "6830",
      country: "Belgium",
    },
  });

  console.log(enrichedPlace)
});
