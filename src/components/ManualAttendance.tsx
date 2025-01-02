import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { showToast } from "../utils/toast";

export function ManualAttendance({ route, navigation }) {
    const [verificationCode, setVerificationCode] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleManualAttendance = async () => {
        try {
            setIsLoading(true);
            // Verify code with backend
            // Mock verification for testing
            if (verificationCode === "123456") {
                await submitManualAttendance();
                navigation.goBack();
                showToast("Attendance marked successfully!");
            } else {
                showToast("Invalid verification code");
            }
        } catch (error) {
            showToast("Failed to mark attendance");
        } finally {
            setIsLoading(false);
        }
    };

    const submitManualAttendance = async () => {
        // API call to submit manual attendance
    };

    return (
        <flexboxLayout style={styles.container}>
            <stackLayout style={styles.card}>
                <label className="text-xl font-bold mb-4">
                    Manual Attendance
                </label>
                
                <label className="text-sm text-gray-600 mb-2">
                    Enter the verification code provided by your teacher
                </label>

                <textField
                    hint="Enter 6-digit code"
                    keyboardType="number"
                    maxLength={6}
                    style={styles.input}
                    text={verificationCode}
                    onTextChange={(args: any) => setVerificationCode(args.object.text)}
                />

                <button
                    className={`p-4 rounded-lg mt-4 ${isLoading ? 'opacity-70' : ''}`}
                    style={styles.submitButton}
                    onTap={handleManualAttendance}
                    isEnabled={!isLoading && verificationCode.length === 6}
                >
                    {isLoading ? "Verifying..." : "Submit"}
                </button>
            </stackLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        padding: 20
    },
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 24,
        width: "100%",
        elevation: 4
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight: 16,
        fontSize: 18,
        letterSpacing: 8,
        textAlignment: "center"
    },
    submitButton: {
        backgroundColor: "#3b82f6",
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
});