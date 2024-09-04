import React, { useEffect, useRef, useMemo } from "react";
import Map, { Source, Layer, MapRef } from "react-map-gl";
import { MapboxGeoJSONFeature } from "mapbox-gl";
import { FeatureCollection, Geometry, Feature } from "geojson";

import DrawControl from "../DrawControl";
import { StyledMapContainer } from "./Map.styles";

// The access token is passed here just for testing purposes for the people who are testing the app
// Just not to have to write the access token in an .env file
const MAPBOX_ACCESS_TOKEN =
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ??
  "pk.eyJ1Ijoibmlrb2xhcGFuZXYiLCJhIjoiY20wbWR5a2R0MDFqbzJrc2FnNDg1N2FqNiJ9.t0fXdEIh3pGUB0saY8m1tw";

interface MapComponentProps {
  features: { [key: string]: MapboxGeoJSONFeature };
  onCreate: (e: { features: MapboxGeoJSONFeature[] }) => void;
  onUpdate: (e: { features: MapboxGeoJSONFeature[] }) => void;
  onDelete: (e: { features: MapboxGeoJSONFeature[] }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  features,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const mapRef = useRef<MapRef>(null);
  const drawRef = useRef<MapboxDraw>(null);

  const geoJsonData: FeatureCollection<Geometry> = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: Object.values(features) as Feature<Geometry>[],
    };
  }, [features]);

  useEffect(() => {
    if (drawRef.current && mapRef.current) {
      drawRef.current.add(geoJsonData);
    }
  }, [geoJsonData]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      map.on("load", () => {
        if (drawRef.current) {
          drawRef.current.add(geoJsonData);
        }
      });
    }
  }, [geoJsonData]);

  return (
    <StyledMapContainer>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 13.404954,
          latitude: 52.520008,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        attributionControl={false}
      >
        <Source id="features" type="geojson" data={geoJsonData}>
          <Layer
            id="polygon-layer"
            type="fill"
            paint={{
              "fill-color": "#088",
              "fill-opacity": 0.5,
            }}
          />
        </Source>
        <DrawControl
          ref={drawRef}
          position="bottom-left"
          controls={{
            polygon: true,
            trash: true,
            combine_features: false,
            uncombine_features: false,
          }}
          defaultMode="draw_polygon"
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
    </StyledMapContainer>
  );
};

export default MapComponent;
