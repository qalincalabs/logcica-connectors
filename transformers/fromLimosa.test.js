import * as fromPhoton from "./fromPhoton.js"
import * as fromNominatim from "./fromNominatim.js";
import {Consolidator} from "@qalincalabs/consolidator"

// Should geo coordinates be decimal (doesn't matter if it's off a bit ??), geojson seems to be string
// Nominatim and Photon geo coordinates are in float
// center or centroid
// relId not in photon
// add be-wlx to nominatim mapping

test("Photon place feature mapping", () => {

  const exactPhotonPlace =  fromPhoton.mapPlaceFeature(photonResult.exactFeature);
  console.log(JSON.stringify(exactPhotonPlace, null, 2));

  /*
  const upperPhotonPlaces = photonResult.upperFeatures.map(u => photonMapper.mapPlaceFeatureToContext(u))
  console.log(JSON.stringify(upperPhotonPlaces, null, 2));
  */

  // add osmid to those ...                                                                                     

  // don't care about upperPhotonPlaces since there isn't much extra info appart from osmid

  const exactNominatimPlaces = nominatimResult.map(r => fromNominatim.mapLookupResult(r))
  console.log(JSON.stringify(exactNominatimPlaces, null, 2));

  
  const conso = new Consolidator(exactPhotonPlace.places[0], exactNominatimPlaces[0])
  const consolidated = conso.aggressiveConsolidation
  console.log(JSON.stringify(consolidated, null, 2));
  

  //consolidate photonPlace with nominatimPlace

  

  // merge all data (should I do the same for osm), HOW TO MERGE

  // how does the neighbourhood appears ??

  // should I do some intra consolidation (two same places in places)
  // should I have an identifier and an enricher ?
  // just a connector ?
  
  // open data, vers du open compute ça serait cool

  // mapper could recognise schema ? (like for languages)

  // translate
  // enrich : contexte de départ et on y ajoute des choses

});

const photonResult = {
  match: {
    countrycode: "BE",
    state: "Luxembourg",
    county: "Neufchâteau",
    city: "Bouillon",
    district: "Bouillon",
    postcode: "6830",
    street: "Quai des Saulx",
    housenumber: "14",
  },
  exactFeature: {
    geometry: {
      coordinates: [5.069359068004883, 49.7938062],
      type: "Point",
    },
    type: "Feature",
    properties: {
      osm_id: 422861107,
      extent: [5.069283, 49.7938544, 5.0694352, 49.7937584],
      country: "België / Belgique / Belgien",
      city: "Bouillon",
      countrycode: "BE",
      postcode: "6830",
      county: "Neufchâteau",
      type: "house",
      osm_type: "W",
      osm_key: "tourism",
      housenumber: "14",
      street: "Quai des Saulx",
      district: "Bouillon",
      osm_value: "attraction",
      name: "Archéoscope Godefroid de Bouillon",
      state: "Luxembourg",
    },
  },
  upperFeatures: [
    {
      geometry: {
        coordinates: [5.0698411, 49.7941925],
        type: "Point",
      },
      type: "Feature",
      properties: {
        osm_id: 1072788797,
        extent: [5.0695555, 49.7946133, 5.0705073, 49.7940328],
        country: "België / Belgique / Belgien",
        city: "Bouillon",
        countrycode: "BE",
        postcode: "6830",
        county: "Neufchâteau",
        type: "street",
        osm_type: "W",
        osm_key: "highway",
        district: "Bouillon",
        osm_value: "service",
        name: "Quai des Saulx",
        state: "Luxembourg",
      },
    },
    {
      geometry: {
        coordinates: [5.127521513222733, 49.7589284],
        type: "Point",
      },
      type: "Feature",
      properties: {
        osm_type: "R",
        osm_id: 12616339,
        extent: [5.0380267, 49.8088076, 5.1896101, 49.7091976],
        country: "België / Belgique / Belgien",
        osm_key: "boundary",
        city: "Bouillon",
        countrycode: "BE",
        osm_value: "administrative",
        name: "Bouillon",
        county: "Neufchâteau",
        state: "Luxembourg",
        type: "district",
      },
    },
    {
      geometry: {
        coordinates: [5.0672528, 49.7949836],
        type: "Point",
      },
      type: "Feature",
      properties: {
        osm_type: "R",
        osm_id: 2440951,
        extent: [4.9685529, 49.8836831, 5.1896101, 49.7091976],
        country: "België / Belgique / Belgien",
        osm_key: "place",
        countrycode: "BE",
        osm_value: "town",
        name: "Bouillon",
        county: "Neufchâteau",
        state: "Luxembourg",
        type: "city",
      },
    },
    {
      geometry: {
        coordinates: [4.6667145, 50.6402809],
        type: "Point",
      },
      type: "Feature",
      properties: {
        osm_type: "R",
        osm_id: 52411,
        extent: [2.3889137, 51.550781, 6.408097, 49.4969821],
        osm_key: "place",
        countrycode: "BE",
        osm_value: "country",
        name: "België - Belgique - Belgien",
        type: "country",
      },
    },
  ],
};

const nominatimResult = [
  {
    place_id: 205424919,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 422861107,
    boundingbox: ["49.7937584", "49.7938544", "5.069283", "5.0694352"],
    lat: "49.7938062",
    lon: "5.069359068004883",
    display_name:
      "Archéoscope Godefroid de Bouillon, 14, Quai des Saulx, Bouillon, Neufchâteau, Luxembourg, Wallonie, 6830, België / Belgique / Belgien",
    place_rank: 30,
    category: "tourism",
    type: "attraction",
    importance: 0.00000999999999995449,
    address: {
      tourism: "Archéoscope Godefroid de Bouillon",
      house_number: "14",
      road: "Quai des Saulx",
      city_district: "Bouillon",
      town: "Bouillon",
      county: "Neufchâteau",
      state: "Luxembourg",
      "ISO3166-2-lvl6": "BE-WLX",
      region: "Wallonie",
      "ISO3166-2-lvl4": "BE-WAL",
      postcode: "6830",
      country: "België / Belgique / Belgien",
      country_code: "be",
    },
    extratags: {
      website: "https://www.archeoscopebouillon.be/",
      attraction: "projection",
    },
    namedetails: {
      name: "Archéoscope Godefroid de Bouillon",
    },
  },
  {
    place_id: 301915255,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "way",
    osm_id: 1072788797,
    boundingbox: ["49.7940328", "49.7946133", "5.0695555", "5.0705073"],
    lat: "49.7941925",
    lon: "5.0698411",
    display_name:
      "Quai des Saulx, Bouillon, Neufchâteau, Luxembourg, Wallonie, 6830, België / Belgique / Belgien",
    place_rank: 27,
    category: "highway",
    type: "service",
    importance: 0.07500999999999991,
    address: {
      road: "Quai des Saulx",
      city_district: "Bouillon",
      town: "Bouillon",
      county: "Neufchâteau",
      state: "Luxembourg",
      "ISO3166-2-lvl6": "BE-WLX",
      region: "Wallonie",
      "ISO3166-2-lvl4": "BE-WAL",
      postcode: "6830",
      country: "België / Belgique / Belgien",
      country_code: "be",
    },
    extratags: {
      surface: "sett",
    },
    namedetails: {
      name: "Quai des Saulx",
    },
  },
  {
    place_id: 309128840,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "relation",
    osm_id: 12616339,
    boundingbox: ["49.7091976", "49.8088076", "5.0380267", "5.1896101"],
    lat: "49.7589284",
    lon: "5.127521513222733",
    display_name:
      "Bouillon, Neufchâteau, Luxembourg, Wallonie, België / Belgique / Belgien",
    place_rank: 16,
    category: "boundary",
    type: "administrative",
    importance: 0.35000999999999993,
    address: {
      city_district: "Bouillon",
      town: "Bouillon",
      county: "Neufchâteau",
      state: "Luxembourg",
      "ISO3166-2-lvl6": "BE-WLX",
      region: "Wallonie",
      "ISO3166-2-lvl4": "BE-WAL",
      country: "België / Belgique / Belgien",
      country_code: "be",
    },
    extratags: {
      "ref:INS": "84010A",
    },
    namedetails: {
      name: "Bouillon",
    },
  },
  {
    place_id: 308134100,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "relation",
    osm_id: 2440951,
    boundingbox: ["49.7091976", "49.8836831", "4.9685529", "5.1896101"],
    lat: "49.7949836",
    lon: "5.0672528",
    display_name:
      "Bouillon, Neufchâteau, Luxembourg, Wallonie, België / Belgique / Belgien",
    place_rank: 14,
    category: "boundary",
    type: "administrative",
    importance: 0.4632558191819374,
    address: {
      town: "Bouillon",
      county: "Neufchâteau",
      state: "Luxembourg",
      "ISO3166-2-lvl6": "BE-WLX",
      region: "Wallonie",
      "ISO3166-2-lvl4": "BE-WAL",
      country: "België / Belgique / Belgien",
      country_code: "be",
    },
    extratags: {
      "ref:INS": "84010",
      website: "http://www.bouillon.be/",
      wikidata: "Q217216",
      wikipedia: "fr:Bouillon (Belgique)",
      population: "5426",
      linked_place: "town",
      "population:date": "2012",
    },
    namedetails: {
      name: "Bouillon",
      "name:fr": "Bouillon",
      "name:la": "Bullionium",
      "name:wa": "Bouyon",
    },
  },
  {
    place_id: 307842104,
    licence:
      "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    osm_type: "relation",
    osm_id: 52411,
    boundingbox: ["49.4969821", "51.550781", "2.3889137", "6.408097"],
    lat: "50.6402809",
    lon: "4.6667145",
    display_name: "België / Belgique / Belgien",
    place_rank: 4,
    category: "boundary",
    type: "administrative",
    importance: 0.8190605523573009,
    address: {
      country: "België / Belgique / Belgien",
      country_code: "be",
    },
    extratags: {
      flag: "http://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg",
      sqkm: "30528",
      currency: "EUR",
      timezone: "Europe/Brussels",
      wikidata: "Q31",
      wikipedia: "nl:België",
      population: "11035948",
      "geonames:id": "2802361",
      capital_city: "Brussels",
      linked_place: "country",
      "ISO3166-1:alpha2": "BE",
      "ISO3166-1:alpha3": "BEL",
      "ISO3166-1:numeric": "056",
      country_code_fips: "BE",
      "TMC:cid_58:tabcd_1:Class": "Area",
      "TMC:cid_58:tabcd_1:LCLversion": "8.00",
      "TMC:cid_58:tabcd_1:LocationCode": "3",
    },
    namedetails: {
      "name:fr": "Belgique",
    },
  },
];
