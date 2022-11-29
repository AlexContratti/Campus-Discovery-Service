import React, { useRef, useEffect, useState, useCallback} from 'react';
import Sidebar from '../components/Sidebar';
import './Map.css'
import mapboxgl from 'mapbox-gl'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGNvbnRyYXR0aSIsImEiOiJjbGF6cnNlMW8wbTNyM3FuNTE4dzVjbHpqIn0.Oh351ybpdpLDcSE17rDcCQ';


function Map() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/events")
            .then(res => res.json())
            .then(data => setData(data))
    }, []);

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-84.3963);
    const [lat, setLat] = useState(33.7756);
    const [zoom, setZoom] = useState(14);

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

    const fetchData = useCallback((data) => {
        
        const geocodingClient = mbxGeocoding({
            accessToken: mapboxgl.accessToken,
        });

        // geocoding with countries
        return geocodingClient
            .forwardGeocode({
                query: data.location,
                countries: ['us'],
                limit: 1,
            })
            .send()
            .then((response) => {
                const match = response.body;
                const coordinates = match.features[0].geometry.coordinates;
                const center = match.features[0].center;

                return {
                    type: 'Feature',
                    center: center,
                    geometry: {
                        type: 'Point',
                        coordinates: coordinates,
                    },
                    properties: {
                        description: data.eventName + '\n' + data.location,
                    },
                };
            });
    }, []);

    useEffect(() => {
        if (!map.current) return; // Waits for the map to initialise

            console.log(data);
            
            const results = fetchData(data[1]);

            results.then((marker) => {
                // create a HTML element for each feature
                var el = document.createElement('div');
                el.className = 'marker';

                // make a marker for each feature and add it to the map
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML('<p>' + marker.properties.description + '</p>')
                    )
                    .addTo(map.current);

                map.current.on('load', async () => {
                    map.current.flyTo({
                        center: marker.center,
                    });
                });
            }); 
    }, [fetchData]);



    return (
        <div className="events-container">
            <div className="nav-bar"><Sidebar /></div>
            <div className="pageheader"> Map </div>
            <div ref={mapContainer} className="map-container"  />
            <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet"></link>
        </div>
    );
}

export default Map;