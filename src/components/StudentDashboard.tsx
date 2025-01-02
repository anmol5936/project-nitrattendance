import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { MapView, Marker } from "@nativescript/google-maps";
import { getCurrentLocation } from "@nativescript/geolocation"; // Fixed import
import { FingerprintAuth } from "@nativescript/fingerprint-auth";
import { showToast } from "../utils/toast";
import { calculateDistance } from "../utils/location";

// Rest of the file remains the same, just update the getCurrentLocation call
const getCurrentLocation = async () => {
    try {
        const location = await getCurrentLocation({
            desiredAccuracy: 3,
            updateDistance: 10,
            maximumAge: 20000,
            timeout: 20000
        });
        setCurrentLocation(location);
        checkGeofence(location);
    } catch (error) {
        showToast("Error getting location. Please check permissions.");
    }
};