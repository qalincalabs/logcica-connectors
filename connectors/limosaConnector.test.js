import { LimosaConnector } from "./limosaConnector.js";

test("Limosa", async () => {
  const connector = new LimosaConnector();
  const enrichedPlace = await connector.enrichPlace(
    placeInAnotherProvince
  );
  console.log(JSON.stringify(placeInAnotherProvince, null, 2));
  console.log(JSON.stringify(enrichedPlace, null, 2));
});

const placeWhereOnlyTheStreetIsFound = {
  name: "digicirco.org",
  services: ["shipping"],
  address: {
    street: "Rue des cueilleurs, 7",
    postalCode: "6040",
    locality: "Charleroi",
    country: "Belgium",
  },
  ids: ["logcica/places/digicirco-org-rue-des-cueilleurs-7-6060-gilly-belgium"],
};

const placeInAnotherProvince = {
  name: "digicirco.org",
  services: ["shipping"],
  address: {
    street: "5 Rue du Moulin",
    postalCode: "5555",
    locality: "Naomé",
    country: "Belgium",
  },
  ids: ["logcica/places/dummy_somewhere"],
};

const place = {
  address: {
    house: "14",
    street: "Quai des Saulx",
    locality: "Bouillon",
    postalCode: "6830",
    country: "Belgium",
  },
};
