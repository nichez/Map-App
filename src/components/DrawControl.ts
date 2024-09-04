import { forwardRef, useImperativeHandle } from "react";
import MapboxDraw, { MapboxDrawOptions } from "@mapbox/mapbox-gl-draw";
import { useControl, ControlPosition } from "react-map-gl";
import { MapboxGeoJSONFeature } from "mapbox-gl";

type DrawControlProps = Omit<MapboxDrawOptions, "displayControlsDefault"> & {
  position?: ControlPosition;

  onCreate?: (evt: { features: MapboxGeoJSONFeature[] }) => void;
  onUpdate?: (evt: {
    features: MapboxGeoJSONFeature[];
    action: string;
  }) => void;
  onDelete?: (evt: { features: MapboxGeoJSONFeature[] }) => void;
};

const DrawControl = forwardRef<MapboxDraw, DrawControlProps>(
  (
    {
      position,
      onCreate = () => {},
      onUpdate = () => {},
      onDelete = () => {},
      ...props
    },
    ref
  ) => {
    const draw = useControl<MapboxDraw>(
      () =>
        new MapboxDraw({
          ...props,
          displayControlsDefault: true,
        }),
      (context) => {
        const map = context.map.getMap();

        map.on("draw.create", (e: { features: MapboxGeoJSONFeature[] }) => {
          onCreate({ features: e.features });
        });

        map.on(
          "draw.update",
          (e: { features: MapboxGeoJSONFeature[]; action: string }) => {
            onUpdate({ features: e.features, action: e.action });
          }
        );

        map.on("draw.delete", (e: { features: MapboxGeoJSONFeature[] }) => {
          onDelete({ features: e.features });
        });
      },
      (context) => {
        const map = context.map.getMap();

        map.off("draw.create", onCreate);
        map.off("draw.update", onUpdate);
        map.off("draw.delete", onDelete);
      },
      {
        position,
      }
    );

    useImperativeHandle(ref, () => draw, [draw]);

    return null;
  }
);

export default DrawControl;
