import * as limosa from "@qalincalabs/limosa";
import * as fromPhoton from "../transformers/fromPhoton.js";
import * as fromNominatim from "../transformers/fromNominatim.js";
import { Consolidator } from "@qalincalabs/consolidator";

export class LimosaConnector {
  constructor() {}

  async enrichPlace(inputData) {

    // lazy copy
    const data = Object.assign({}, inputData)
    data.address = Object.assign({}, inputData.address)

    const addressSecondTry = Object.assign({},data.address)

    let photonResult = await limosa.photonLocate(data.address);

    // HACK retry with upperfeature city as locality (more a hack, should be in limosa)

    if(photonResult.exactFeature == null 
      && photonResult.upperFeatures?.length > 0 && photonResult.upperFeatures[0].properties?.city != null){
      addressSecondTry.locality = photonResult.upperFeatures[0].properties.city
      const secondPhotonResult = await limosa.photonLocate(addressSecondTry);

      if(secondPhotonResult.exactFeature != null)
        photonResult = secondPhotonResult

    }

    const uuids = limosa.extractOsmUuids(photonResult);
    const nominatimResult = await limosa.nominatimLookup(
      { osm_ids: uuids },
      { format: "jsonv2", addressdetails: 1, namedetails: 1, extratags: 1 }
    );

    const okFeature = photonResult.exactFeature 
      ?? photonResult.upperFeatures.find(f => f.properties.type == "street")

    if(okFeature == null)
      return

    const exactPhotonPlace = fromPhoton.mapPlaceFeature(okFeature);

    const exactNominatimPlaces = nominatimResult.map((r) =>
      fromNominatim.mapLookupResult(r)
    );

    const conso = new Consolidator(
      exactPhotonPlace.places[0],
      exactNominatimPlaces[0]
    );

    const consolidated = conso.aggressiveConsolidation;
    return consolidated;
  }
}
