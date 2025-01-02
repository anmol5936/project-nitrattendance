import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { MapView, Marker } from "@nativescript/google-maps";
import { showToast } from "../utils/toast";

export function LiveAttendance({ route }) {
  const { classId } = route.params;
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    // Mock data - replace with actual API call
    setStudents([
      { id: 1, name: "John Doe", status: "present", location: { lat: 20.2513, lng: 85.8025 } },
      { id: 2, name: "Jane Smith", status: "absent", location: null },
    ]);
  }, []);

  return (
    <flexboxLayout style={styles.container}>
      <MapView
        style={styles.map}
        latitude={20.2513}
        longitude={85.8025}
        zoom={17}
        bearing={0}
      >
        {students.map(student => student.location && (
          <Marker
            key={student.id}
            latitude={student.location.lat}
            longitude={student.location.lng}
            title={student.name}
            snippet={`Status: ${student.status}`}
          />
        ))}
      </MapView>

      <scrollView style={styles.studentList}>
        {students.map(student => (
          <stackLayout 
            key={student.id} 
            style={styles.studentCard}
            className={`${student.status === 'present' ? 'bg-green-50' : 'bg-red-50'}`}
          >
            <label className="font-semibold">{student.name}</label>
            <label className={`text-sm ${student.status === 'present' ? 'text-green-600' : 'text-red-600'}`}>
              {student.status.toUpperCase()}
            </label>
          </stackLayout>
        ))}
      </scrollView>
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column"
  },
  map: {
    height: "50%",
    width: "100%"
  },
  studentList: {
    height: "50%",
    backgroundColor: "#f8fafc"
  },
  studentCard: {
    margin: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2
  }
});