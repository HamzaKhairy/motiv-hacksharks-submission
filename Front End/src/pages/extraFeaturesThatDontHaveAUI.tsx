import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useReadData } from '../hooks/useCrudOperations';
import { UserType } from '../types/userTypes';
import { useSelector } from 'react-redux';
import { getCurrentLocation } from '../services/locationService';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import { callbackUri } from "../auth.config";

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

interface Location {
    latitude: number;
    longitude: number;
}


L.Marker.prototype.options.icon = defaultIcon;

const destination: [number, number] = [39.1315953, -84.5155862]; // Example coordinates
const circleRadius = 200;

export const LogoutButton: React.FC = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
        // Specifying the URL to redirect to after logout
        logout({ logoutParams: { returnTo: `${callbackUri}/login` } });
    };

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
};

const extraFeaturesThatDontHaveAUI: React.FC = () => {
    const user_id = useSelector((state: { user: UserType }) => state.user.id);
    const { data, loading, error } = useReadData<UserType>(`/api/users/${user_id}`);

    const [location, setLocation] = useState<Location>({longitude: 0, latitude: 0});
    const [distanceInMeters, setDistanceInMeters] = useState<number>(0)

    useEffect(() => {
        getCurrentLocation().then(setLocation);
    }, []);

    useEffect(() => {
        const latLng1 = L.latLng(...destination);
        const latLng2 = L.latLng(location?.latitude, location?.longitude);
    
        setDistanceInMeters(latLng1.distanceTo(latLng2));
    }, [location])



    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1>Extra Features That Don't Have A UI</h1>
                <h2>Log Out Button</h2>
                <LogoutButton />
                <h2>Student Connection Code</h2>
                <p>{data?.studentCode}</p>
                <h2>Add Team to School</h2>
                <p>Not implemented yet</p>
                <h2>Remove Team from School</h2>
                <p>Not implemented yet</p>
                <h2>Add studnents to team</h2>
                <p>Not implemented yet</p>
                <h2>Maps</h2>
                <MapContainer center={[location.latitude,location.longitude]} zoom={13} style={{ height: "100vh", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={destination}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <Marker position={[location.latitude,location.longitude]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <Circle
                        center={destination}
                        radius={circleRadius}
                        fillColor="blue"
                        color="red"
                        weight={1}
                        opacity={0.6}
                        fillOpacity={0.4}
                    />
                          <Polyline positions={[destination, [location.latitude,location.longitude]]} color={distanceInMeters > circleRadius ? "red" : "green"} />
                </MapContainer>
                <div>
                    {location ? (
                        <p>Location: Latitude {location.latitude}, Longitude {location.longitude}, Distance {distanceInMeters / 1000} km</p>
                    ) : (
                        <p>Getting location...</p>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
}

export default extraFeaturesThatDontHaveAUI;