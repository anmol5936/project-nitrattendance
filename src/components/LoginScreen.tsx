import { EventData } from '@nativescript/core';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { authenticate } from '../services/authService';
import { showToast } from '../utils/toast';

type LoginScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Login">,
};

export function LoginScreen({ navigation }: LoginScreenProps) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState<"student" | "teacher">("student");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const user = await authenticate(email, password, role);
            
            if (user) {
                if (role === "student") {
                    navigation.navigate("StudentDashboard");
                } else {
                    navigation.navigate("TeacherDashboard");
                }
            }
        } catch (error) {
            showToast("Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    const onEmailChange = (args: EventData) => {
        const textField = args.object as any;
        setEmail(textField.text);
    };

    const onPasswordChange = (args: EventData) => {
        const textField = args.object as any;
        setPassword(textField.text);
    };

    return (
        <flexboxLayout style={styles.container}>
            <stackLayout style={styles.loginCard}>
                <image 
                    src="~/assets/logo.png" 
                    style={styles.logo} 
                    stretch="aspectFit"
                />
                
                <label className="text-3xl mb-6 font-bold text-center text-blue-600">
                    NIT Rourkela
                </label>
                
                <label className="text-xl mb-8 text-center text-gray-600">
                    Attendance System
                </label>
                
                <stackLayout style={styles.form}>
                    <stackLayout style={styles.inputContainer}>
                        <label className="text-sm text-gray-600 mb-1">Email</label>
                        <textField
                            hint="Enter your email"
                            keyboardType="email"
                            autocorrect={false}
                            autocapitalizationType="none"
                            style={styles.input}
                            text={email}
                            onTextChange={onEmailChange}
                        />
                    </stackLayout>
                    
                    <stackLayout style={styles.inputContainer}>
                        <label className="text-sm text-gray-600 mb-1">Password</label>
                        <textField
                            hint="Enter your password"
                            secure={true}
                            style={styles.input}
                            text={password}
                            onTextChange={onPasswordChange}
                        />
                    </stackLayout>

                    <stackLayout style={styles.roleSelector}>
                        <label className="text-sm text-gray-600 mb-2">Select Role</label>
                        <segmentedBar
                            selectedIndex={role === "student" ? 0 : 1}
                            style={styles.segmentedBar}
                            onSelectedIndexChange={(args: any) => {
                                setRole(args.object.selectedIndex === 0 ? "student" : "teacher");
                            }}
                        >
                            <segmentedBarItem title="Student" />
                            <segmentedBarItem title="Teacher" />
                        </segmentedBar>
                    </stackLayout>

                    <button
                        className={`p-4 rounded-lg mt-6 ${isLoading ? 'opacity-70' : ''}`}
                        style={styles.loginButton}
                        onTap={handleLogin}
                        isEnabled={!isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </stackLayout>
            </stackLayout>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    loginCard: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 24,
        width: "100%",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        alignSelf: "center",
    },
    form: {
        width: "100%",
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        width: "100%",
        height: 44,
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "#f8fafc",
        color: "#1e293b",
    },
    roleSelector: {
        marginTop: 8,
    },
    segmentedBar: {
        marginTop: 8,
        width: "100%",
    },
    loginButton: {
        backgroundColor: "#3b82f6",
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});