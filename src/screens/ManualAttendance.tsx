import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { showToast } from "../utils/toast";

interface Student {
    id: number;
    name: string;
    rollNumber: string;
    isPresent: boolean;
}

export function ManualAttendance({ route, navigation }) {
    const { classId } = route.params;
    const [students, setStudents] = React.useState<Student[]>([
        {
            id: 1,
            name: "John Doe",
            rollNumber: "CS21B1001",
            isPresent: false
        },
        {
            id: 2,
            name: "Jane Smith",
            rollNumber: "CS21B1002",
            isPresent: false
        }
    ]);

    const toggleAttendance = (studentId: number) => {
        setStudents(students.map(student =>
            student.id === studentId 
                ? { ...student, isPresent: !student.isPresent }
                : student
        ));
    };

    const submitAttendance = () => {
        const presentCount = students.filter(s => s.isPresent).length;
        showToast(`Marked ${presentCount} students present`);
        navigation.goBack();
    };

    return (
        <flexboxLayout style={styles.container}>
            <scrollView>
                <stackLayout style={styles.content}>
                    <label className="text-2xl font-bold text-blue-600 mb-4">
                        Mark Attendance
                    </label>

                    {students.map(student => (
                        <stackLayout 
                            key={student.id}
                            style={styles.studentCard}
                            onTap={() => toggleAttendance(student.id)}
                        >
                            <gridLayout columns="*, auto">
                                <stackLayout col="0">
                                    <label className="text-lg font-semibold">
                                        {student.name}
                                    </label>
                                    <label className="text-sm text-gray-600">
                                        {student.rollNumber}
                                    </label>
                                </stackLayout>
                                
                                <label 
                                    col="1"
                                    className={`text-lg ${
                                        student.isPresent 
                                            ? "text-green-600" 
                                            : "text-gray-400"
                                    }`}
                                >
                                    ✓
                                </label>
                            </gridLayout>
                        </stackLayout>
                    ))}

                    <button
                        className="mt-4 p-4 rounded-lg bg-blue-600 text-white"
                        onTap={submitAttendance}
                    >
                        Submit Attendance
                    </button>
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
    studentCard: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2
    }
});