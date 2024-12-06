import * as React from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {fromLonLat, transform} from 'ol/proj';
import {Style, Circle, Fill, Stroke} from 'ol/style';
import 'ol/ol.css';

interface MapSelectorProps {
    points: Record<string, [number, number]>;
    value: string;
    center: [number, number];
    zoom: number;
    onChange: (value: string) => void;
    onLocationClick: (coords: [number, number]) => void;
}

export function MapSelector({ points = {}, value, center = [0, 0], zoom, onChange, onLocationClick }: MapSelectorProps) {
    const mapRef = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<Map | null>(null);
    const [vectorLayer, setVectorLayer] = React.useState<VectorLayer<VectorSource> | null>(null);
    const [selectedFeature, setSelectedFeature] = React.useState<Feature | null>(null);

    // Add points to map when they change
    React.useEffect(() => {
        if (!map || !vectorLayer || !points) return;
        
        const vectorSource = vectorLayer.getSource();
        if (!vectorSource) return;

        vectorSource.clear();  // Clear existing points
        
        // Ensure points is an object before trying to iterate
        if (typeof points === 'object') {
            Object.entries(points).forEach(([id, point]) => {
                if (Array.isArray(point) && point.length === 2) {
                    const feature = new Feature({
                        geometry: new Point(fromLonLat([point[0], point[1]]))
                    });
                    feature.set('id', id);
                    vectorSource.addFeature(feature);
                }
            });

            // Only try to zoom if we have points and a valid extent
            const extent = vectorSource.getExtent();
            if (Object.keys(points).length > 0 && extent) {
                map.getView().fit(extent, {
                    padding: [50, 50, 50, 50],
                    maxZoom: 15
                });
            }
        }
    }, [map, vectorLayer, points]);

    // Update view when center or zoom changes
    React.useEffect(() => {
        if (!map) return;
        
        map.getView().setCenter(fromLonLat(center));
        map.getView().setZoom(zoom);
    }, [map, center, zoom]);

    // Update map initialization with initial center and zoom
    React.useEffect(() => {
        if (!mapRef.current) return;

        const vectorSource = new VectorSource();
        const vector = new VectorLayer({
            source: vectorSource
        });

        const mapInstance = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                    })
                }),
                vector
            ],
            view: new View({
                center: fromLonLat(center),
                zoom: zoom
            })
        });

        const pointerMoveHandler = (evt: any) => {
            const pixel = mapInstance.getEventPixel(evt.originalEvent);
            const hit = mapInstance.hasFeatureAtPixel(pixel);
            mapInstance.getTarget().style.cursor = hit ? 'pointer' : '';
        };

        const clickHandler = (evt: any) => {
            // Convert clicked coordinates from Web Mercator to WGS84 (lat/lon)
            const coords = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            // Always update clicked location
            onLocationClick([coords[0], coords[1]]);

            // Handle point selection separately
            const feature = mapInstance.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
            if (feature) {
                onChange(feature.get('id'));
            } else {
                onChange('');  // Clear selection if no point was clicked
            }
        };

        mapInstance.on('click', clickHandler);
        mapInstance.on('touchend', clickHandler);  // Add touch support
        mapInstance.on('pointermove', pointerMoveHandler);  // Add pointer move handler

        setMap(mapInstance);
        setVectorLayer(vector);

        return () => {
            mapInstance.dispose();
            mapInstance.un('click', clickHandler);
            mapInstance.un('touchend', clickHandler);
            mapInstance.un('pointermove', pointerMoveHandler);  // Clean up pointer move handler
        };
    }, []);

    return (
        <div ref={mapRef} style={{ width: '100%', height: '50vh' }} />
    );
}
