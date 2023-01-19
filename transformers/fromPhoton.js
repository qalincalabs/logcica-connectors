import * as osmMapper from "./fromOpenStreetMap.js";
import * as core from "../core/main.js";

const photonAreaLayersAfterCountryForBelgium = {
  state: {
    keyOther: "states",
    equivalentOther: "provinces",
    equivalentOne: "province",
  },
  county: {
    keyOther: "counties",
    equivalentOther: "subdivisions",
    equivalentOne: "subdivision",
  },
  city: {
    keyOther: "cities",
    equivalentOther: "municipalities",
    equivalentOne: "municipality",
  },
  postcode: {
    keyOther: "postcodes",
  },
  district: {
    keyOther: "districts",
  },
};

const osmElementsAbreviations = {
  n: "nodes",
  w: "ways",
  r: "relationships",
};

export function mapPlaceFeature(input) {
  const featureProperties = input.properties;

  const place = {
    ids: [
      "osm/" +
        osmElementsAbreviations[featureProperties.osm_type.toLowerCase()] +
        "/" +
        featureProperties.osm_id,
    ],
    name: featureProperties.name,
    center: input.geometry,
    photon: {
      layer: featureProperties.type
    }
  };

  const areas = [
    {
      ids: ["iso/countries/" + featureProperties.countrycode.toLowerCase()],
      types: ["country"],
      name: featureProperties.country,
      photon: {
        layer: "country"
      }
    },
  ];

  const appKey = "photon";
  const countryCode = "be";

  const mappings = osmMapper.countryConfig[countryCode]?.mappings
    .filter((m) => m.filters.photon != null)

  for (const mapping of mappings) {

    const key = mapping.filters.photon.key

    if(featureProperties[key] == null)
      continue

    const name = featureProperties[key];
    const nameKey = core.sluggify(name)
    
    const area = {
      ids: [
        `${countryCode}/${mapping.typeOther}/${nameKey}`,
        `${appKey}/${countryCode}/${mapping.photonTypeOther}/${nameKey}`
      ], // TODO sluggify
      name: name,
      types: [
        `${countryCode}/${mapping.typeOne}`,
        `${appKey}/${key}`
      ],
      photon: {
        layer: `${key}`
      }
    };

    areas.push(area);
  }

  if(featureProperties["district"] != null){
    const districtKey = core.sluggify(featureProperties["district"]);
    const cityKey = core.sluggify(featureProperties["city"]);
    areas.push({
      ids: [
        `${appKey}/${countryCode}/${cityKey}/districts/${districtKey}`,
      ],
      name: districtKey,
      types: [appKey + "/district"],
      photon: {
        layer: "district"
      }
    });
  }

  if(featureProperties["postcode"] != null){
  const postalCode = featureProperties["postcode"]
  const postalCodeKey = core.sluggify(postalCode)
  areas.push({
    ids: [`${countryCode}/postal_codes/${postalCodeKey}`],
    name: postalCode,
    types: ["postal_code"]
  })
  }

  core.populateAreaWithins(areas);

  place.within = areas.map((a) => ({
    relId: a.relId,
  }));

  areas.unshift(place)

  // osm type mappings
  const context = {
    places: areas
  };

  return context;
}

const PhotonLogcicaMapper = () => {};
export default PhotonLogcicaMapper;
