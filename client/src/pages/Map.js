import React, { useRef, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './Map.css'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGNvbnRyYXR0aSIsImEiOiJjbGF6cnNlMW8wbTNyM3FuNTE4dzVjbHpqIn0.Oh351ybpdpLDcSE17rDcCQ';


function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-84.390165106);
    const [lat, setLat] = useState(33.772163578);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div className="events-container">
            <div className="nav-bar"><Sidebar /></div>
            <div ref={mapContainer} className="map-container"  />
        </div>
    );
}

export default Map;