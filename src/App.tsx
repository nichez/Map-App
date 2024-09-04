/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from "react";
import { MapboxGeoJSONFeature } from "mapbox-gl";

import GlobalStyles from "./styles/GlobalStyles";
import Map from "./components/Map/Map";
import { StyledContainer, StyledTitle } from "./App.styles";
import {
  fetchImageObjects,
  saveObject,
  updateObject,
  deleteObject,
} from "./utils/utils";

const IMAGE_ID = 1;

export default function App() {
  const [features, setFeatures] = useState<{
    [key: string]: MapboxGeoJSONFeature;
  }>({});

  useEffect(() => {
    fetchImageObjects(IMAGE_ID).then((objects) => {
      const featureMap = objects.reduce((acc: any, obj: any) => {
        acc[obj.id] = obj;
        return acc;
      }, {});
      setFeatures(featureMap);
    });
  }, []);

  const onCreate = useCallback((e: { features: MapboxGeoJSONFeature[] }) => {
    setFeatures((currFeatures) => {
      const updatedFeatures = { ...currFeatures };
      for (const f of e.features) {
        updatedFeatures[f.id as string] = f;
        saveObject(IMAGE_ID, f);
      }
      return updatedFeatures;
    });
  }, []);

  const onUpdate = useCallback((e: { features: MapboxGeoJSONFeature[] }) => {
    setFeatures((currFeatures) => {
      const updatedFeatures = { ...currFeatures };
      for (const f of e.features) {
        updatedFeatures[f.id as string] = f;
      }
      updateObject(IMAGE_ID, Object.values(updatedFeatures));
      return updatedFeatures;
    });
  }, []);

  const onDelete = useCallback((e: { features: MapboxGeoJSONFeature[] }) => {
    setFeatures((currFeatures) => {
      const updatedFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete updatedFeatures[f.id as string];
        deleteObject(IMAGE_ID, f.id as string);
      }

      return updatedFeatures;
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <StyledContainer>
        <StyledTitle>FlyPix AI Map</StyledTitle>
        <Map
          features={features}
          onCreate={onCreate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </StyledContainer>
    </>
  );
}
