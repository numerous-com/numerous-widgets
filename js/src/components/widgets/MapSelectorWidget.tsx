import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { MapSelector } from "../ui/MapSelector";
import '../../css/styles.css';

function MapSelectorWidget() {
    const [points, setPoints] = useModelState<Record<string, [number, number]>>("points");
    const [value, setValue] = useModelState<string>("value");
    const [center, setCenter] = useModelState<[number, number]>("center");
    const [zoom, setZoom] = useModelState<number>("zoom");
    const [locationClicked, setLocationClicked] = useModelState<[number, number]>("location_clicked");

    return (
        <MapSelector
            points={points}
            value={value}
            center={center}
            zoom={zoom}
            onChange={setValue}
            onLocationClick={setLocationClicked}
        />
    );
}

export default {
    render: createRender(MapSelectorWidget)
}
