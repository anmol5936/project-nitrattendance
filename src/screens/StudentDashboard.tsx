import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { getCurrentLocation } from "@nativescript/geolocation";
import { showToast } from "../utils/toast";
import { authenticateWithBiometrics } from "../utils/biometrics";

export function StudentDashboard({ navigation }) {
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [isInGeofence, setIsInGeofence] = React.useState(false);
    const [classes, setClasses] = React.useState([
        {
            id: 1,
            name: "Data Structures",
            time: "9:00 AM - 10:00 AM",
            room: "LT-1",
            attendance: "Present"
        },
        {
            id: 2,
            name: "Computer Networks",
            time: "11:00 AM - 12:00 PM",
            room: "LT-2",
            attendance: "Not Marked"
        }
    ]);

    const checkLocation = async () => {
        try {
            const location = await getCurrentLocation({
                desiredAccuracy: 3,
                updateDistance: 10,
                maximumAge: 20000,
                timeout: 20000
            });
            setCurrentLocation(location);
            // Mock geofence check
            setIsInGeofence(true);
        } catch (error) {
            showToast("Error getting location");
        }
    };

    const markAttendance = async (classId: number) => {
        try {
            if (!isInGeofence) {
                showToast("You must be within class premises");
                return;
            }

            // const isAuthenticated = await authenticateWithBiometrics("Place your finger to mark attendance");
            
            // if (isAuthenticated) {
            //     showToast("Attendance marked successfully!");
            //     setClasses(classes.map(c => 
            //         c.id === classId ? {...c, attendance: "Present"} : c
            //     ));
            // } else {
            //     navigation.navigate("ManualAttendance", { classId });
            // }
        } catch (error) {
            showToast("Error marking attendance");
            navigation.navigate("ManualAttendance", { classId });
        }
    };

    React.useEffect(() => {
        checkLocation();
    }, []);

    return (
        <flexboxLayout style={styles.container}>
            <scrollView>
                <stackLayout style={styles.content}>
                    <label className="text-2xl font-bold text-blue-600 mb-4">
                        Today's Classes
                    </label>

                    {classes.map(classItem => (
                        <stackLayout 
                            key={classItem.id}
                            style={styles.classCard}
                        >
                            <label className="text-lg font-semibold">
                                {classItem.name}
                            </label>
                            <label className="text-sm text-gray-600">
                                {classItem.time}
                            </label>
                            <label className="text-sm text-gray-600">
                                Room: {classItem.room}
                            </label>
                            
                            <gridLayout columns="*, auto" className="mt-4">
                                <label 
                                    col="0"
                                    className={`text-sm ${
                                        classItem.attendance === "Present" 
                                            ? "text-green-600" 
                                            : "text-gray-600"
                                    }`}
                                >
                                    {classItem.attendance}
                                </label>
                                
                                {classItem.attendance !== "Present" && (
                                    <button
                                        col="1"
                                        className="p-2 rounded-lg bg-blue-600 text-white"
                                        onTap={() => markAttendance(classItem.id)}
                                    >
                                        Mark Attendance
                                    </button>
                                )}
                            </gridLayout>
                        </stackLayout>
                    ))}
                </stackLayout>
            </scrollView>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#f8fafc"
    },
    content: {
        padding: 16
    },
    classCard: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2
    }
});