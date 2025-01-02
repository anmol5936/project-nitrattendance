import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { showToast } from "../utils/toast";

export function TeacherDashboard({ navigation }) {
    const [activeClass, setActiveClass] = React.useState(null);
    const [verificationCode, setVerificationCode] = React.useState("");
    const [attendanceMode, setAttendanceMode] = React.useState<'auto' | 'manual'>('auto');

    const classes = [
        {
            id: 1,
            name: "Data Structures",
            room: "LT-1",
            time: "9:00 AM",
            totalStudents: 60,
            presentCount: 45
        },
        {
            id: 2,
            name: "Computer Networks",
            room: "LT-2",
            time: "11:00 AM",
            totalStudents: 55,
            presentCount: 50
        }
    ];

    const generateVerificationCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);
        showToast("New verification code generated");
    };

    return (
        <flexboxLayout style={styles.container}>
            <stackLayout style={styles.header}>
                <label className="text-2xl font-bold text-blue-600 mb-4">
                    Today's Classes
                </label>
            </stackLayout>

            <scrollView style={styles.classList}>
                {classes.map(classItem => (
                    <stackLayout 
                        key={classItem.id}
                        style={styles.classCard}
                        className={`${activeClass?.id === classItem.id ? 'bg-blue-50' : 'bg-white'}`}
                        onTap={() => setActiveClass(classItem)}
                    >
                        <label className="text-lg font-semibold">{classItem.name}</label>
                        <label className="text-sm text-gray-600">Room: {classItem.room}</label>
                        <label className="text-sm text-gray-600">Time: {classItem.time}</label>
                        <stackLayout orientation="horizontal" className="mt-2">
                            <label className="text-sm text-green-600">
                                Present: {classItem.presentCount}/{classItem.totalStudents}
                            </label>
                            <progress 
                                value={classItem.presentCount} 
                                maxValue={classItem.totalStudents}
                                className="ml-2"
                            />
                        </stackLayout>
                    </stackLayout>
                ))}
            </scrollView>

            {activeClass && (
                <stackLayout style={styles.controls}>
                    <segmentedBar
                        selectedIndex={attendanceMode === 'auto' ? 0 : 1}
                        style={styles.modeSelector}
                        onSelectedIndexChange={(args: any) => {
                            setAttendanceMode(args.object.selectedIndex === 0 ? 'auto' : 'manual');
                        }}
                    >
                        <segmentedBarItem title="Auto (Biometric)" />
                        <segmentedBarItem title="Manual" />
                    </segmentedBar>

                    {attendanceMode === 'manual' && (
                        <stackLayout style={styles.verificationSection}>
                            <label className="text-lg font-semibold mb-2">
                                Verification Code
                            </label>
                            <label className="text-3xl font-bold text-blue-600 mb-4">
                                {verificationCode || '------'}
                            </label>
                            <button
                                className="p-3 rounded-lg bg-blue-600 text-white"
                                onTap={generateVerificationCode}
                            >
                                Generate New Code
                            </button>
                        </stackLayout>
                    )}

                    <gridLayout columns="*, *" className="mt-4" style={styles.actionButtons}>
                        <button
                            col="0"
                            className="p-4 rounded-lg bg-green-600 text-white m-1"
                            onTap={() => navigation.navigate("LiveAttendance", { classId: activeClass.id })}
                        >
                            Live View
                        </button>
                        <button
                            col="1"
                            className="p-4 rounded-lg bg-blue-600 text-white m-1"
                            onTap={() => navigation.navigate("AttendanceHistory", { classId: activeClass.id })}
                        >
                            History
                        </button>
                    </gridLayout>
                </stackLayout>
            )}
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        backgroundColor: "#f8fafc"
    },
    header: {
        padding: 16,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0"
    },
    classList: {
        flex: 1
    },
    classCard: {
        margin: 8,
        padding: 16,
        borderRadius: 12,
        backgroundColor: "white",
        elevation: 2
    },
    controls: {
        padding: 16,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0"
    },
    modeSelector: {
        marginBottom: 16
    },
    verificationSection: {
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f8fafc",
        borderRadius: 12
    },
    actionButtons: {
        marginTop: 16
    }
});