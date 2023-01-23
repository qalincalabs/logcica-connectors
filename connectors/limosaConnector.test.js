import { LimosaConnector } from "./limosaConnector.js";

test("Limosa", async () => {
  const connector = new LimosaConnector();
  const enrichedPlace = await connector.enrichPlace(place);
  console.log(JSON.stringify(enrichedPlace, null, 2));
});

const place = {
  address: {
    house: "14",
    street: "Quai des Saulx",
    locality: "Bouillon",
    postalCode: "6830",
    country: "Belgium",
  },
};
