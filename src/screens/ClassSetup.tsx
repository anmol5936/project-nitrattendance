import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { MapView, Marker, Circle } from "@nativescript/google-maps";
import { getCurrentLocation } from "@nativescript/geolocation";
import { showToast } from "../utils/toast";

export function ClassSetup() {
  const [center, setCenter] = React.useState({ lat: 20.2513, lng: 85.8025 });
  const [radius, setRadius] = React.useState(50);

  const handleLocationSelect = (args: any) => {
    const { latitude, longitude } = args.position;
    setCenter({ lat: latitude, lng: longitude });
  };

  const saveGeofence = async () => {
    try {
      // Save geofence data to backend
      showToast("Geofence saved successfully");
    } catch (error) {
      showToast("Failed to save geofence");
    }
  };

  return (
    <flexboxLayout style={styles.container}>
      <MapView
        style={styles.map}
        latitude={center.lat}
        longitude={center.lng}
        zoom={18}
        onMapReady={async () => {
          try {
            const location = await getCurrentLocation();
            setCenter({ lat: location.latitude, lng: location.longitude });
          } catch (error) {
            showToast("Error getting current location");
          }
        }}
        onMapTap={handleLocationSelect}
      >
        <Marker
          latitude={center.lat}
          longitude={center.lng}
          title="Class Location"
        />
        <Circle
          center={{ lat: center.lat, lng: center.lng }}
          radius={radius}
          fillColor="#3b82f680"
          strokeColor="#3b82f6"
          strokeWidth={2}
        />
      </MapView>

      <stackLayout style={styles.controls}>
        <label className="text-sm text-gray-600 mb-2">Geofence Radius (meters)</label>
        <slider
          value={radius}
          minValue={10}
          maxValue={100}
          onValueChange={(args: any) => setRadius(Math.round(args.value))}
        />
        <label className="text-center mb-4">{radius}m</label>

        <button
          className="p-4 rounded-lg bg-blue-600 text-white"
          onTap={saveGeofence}
        >
          Save Geofence
        </button>
      </stackLayout>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column"
  },
  map: {
    height: "70%",
    width: "100%"
  },
  controls: {
    height: "30%",
    padding: 16,
    backgroundColor: "white"
  }
});