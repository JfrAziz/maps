import { v4 } from "uuid";
import { GeoJSONExtended } from "@stores/maps/types";
import { DEFAULT_FEATURE_COLOR } from "@config/colors";


/**
 * Simple validation for GeoJSONExtended. It checks the GeoJSON type and
 * the lenght of the features properties.
 * 
 * @param json 
 * @returns 
 */
export const validateFC = (json: GeoJSONExtended): GeoJSONExtended => {
  if (!(json.type === 'FeatureCollection') || !(json.features))
    throw new Error("GeoJSON is not features collection");

  if (!json.features.length) throw new Error("GeoJSON has emtpy value");

  return json
}

/**
 * Configures a validated GeoJSON Feature collection to add a new properties
 * for each feature with add a uuid. Sometimes imported geoJSON file does not 
 * have a properties value, so we added first then we add a uuid to it.
 * 
 * This function also return list key of properties except uuid, it will be used in
 * any component for editing an so on.
 * 
 * @param json 
 * @returns 
 */
export const configureFCProperties = (json: GeoJSONExtended): { json: GeoJSONExtended, propertiesKeys: string[] } => {
  json.features.forEach((item, idx) => {
    if (!json.features[idx].properties) {
      Object.assign(json.features[idx], { properties: {} })
    }

    if (!json.features[idx].properties?.uuid) {
      Object.assign(json.features[idx].properties, { uuid: v4() })
    }

    if (!json.features[idx].properties?.color) {
      Object.assign(json.features[idx].properties, { color: DEFAULT_FEATURE_COLOR })
    }
  });

  const propertiesKeys = Object.keys(json.features[0].properties).filter(key => key !== "uuid")

  return { json, propertiesKeys };
}