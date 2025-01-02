import * as React from "react";
import { StyleSheet } from "react-nativescript";

export function AttendanceHistory({ route }) {
    const { classId } = route.params;
    const [records, setRecords] = React.useState([
        {
            id: 1,
            date: "2024-01-15",
            status: "present",
            verificationMethod: "biometric"
        },
        {
            id: 2,
            date: "2024-01-16",
            status: "absent",
            verificationMethod: null
        }
    ]);

    return (
        <scrollView style={styles.container}>
            {records.map(record => (
                <stackLayout 
                    key={record.id}
                    style={styles.recordCard}
                    className={record.status === "present" ? "bg-green-50" : "bg-red-50"}
                >
                    <label className="text-lg font-semibold">
                        {new Date(record.date).toLocaleDateString()}
                    </label>
                    <label className={`text-sm ${
                        record.status === "present" ? "text-green-600" : "text-red-600"
                    }`}>
                        {record.status.toUpperCase()}
                    </label>
                    {record.verificationMethod && (
                        <label className="text-xs text-gray-600">
                            Verified via: {record.verificationMethod}
                        </label>
                    )}
                </stackLayout>
            ))}
        </scrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#f8fafc",
        padding: 16
    },
    recordCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2
    }
});