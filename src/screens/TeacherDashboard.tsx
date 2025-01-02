import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { showToast } from "../utils/toast";

interface Class {
    id: number;
    name: string;
    time: string;
    room: string;
    studentsPresent: number;
    totalStudents: number;
}

export function TeacherDashboard({ navigation }) {
    const [classes, setClasses] = React.useState<Class[]>([
        {
            id: 1,
            name: "Data Structures",
            time: "9:00 AM - 10:00 AM",
            room: "LT-1",
            studentsPresent: 45,
            totalStudents: 60
        },
        {
            id: 2,
            name: "Computer Networks",
            time: "11:00 AM - 12:00 PM",
            room: "LT-2",
            studentsPresent: 0,
            totalStudents: 55
        }
    ]);

    const startAttendance = (classId: number) => {
        navigation.navigate("ManualAttendance", { classId });
    };

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
                                    className="text-sm text-gray-600"
                                >
                                    {classItem.studentsPresent} / {classItem.totalStudents} Present
                                </label>
                                
                                <button
                                    col="1"
                                    className="p-2 rounded-lg bg-blue-600 text-white"
                                    onTap={() => startAttendance(classItem.id)}
                                >
                                    Take Attendance
                                </button>
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