import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { LoginScreen } from "../screens/LoginScreen";
import { StudentDashboard } from "../screens/StudentDashboard";
import { TeacherDashboard } from "../screens/TeacherDashboard";
import { AttendanceHistory } from "../screens/AttendanceHistory";
import { ManualAttendance } from "../screens/ManualAttendance";
import { LiveAttendance } from "../screens/LiveAttendance";
import { ClassSetup } from "../screens/ClassSetup";

const Stack = stackNavigatorFactory();

export const MainStack = () => (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: true,
            headerStyle: {
                backgroundColor: '#3b82f6'
            },
            headerTintColor: '#fff'
        }}
    >
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="StudentDashboard"
            component={StudentDashboard}
            options={{ title: "Student Dashboard" }}
        />
        <Stack.Screen
            name="TeacherDashboard"
            component={TeacherDashboard}
            options={{ title: "Teacher Dashboard" }}
        />
        <Stack.Screen
            name="AttendanceHistory"
            component={AttendanceHistory}
            options={{ title: "Attendance History" }}
        />
        <Stack.Screen
            name="ManualAttendance"
            component={ManualAttendance}
            options={{ title: "Manual Attendance" }}
        />
        <Stack.Screen
            name="LiveAttendance"
            component={LiveAttendance}
            options={{ title: "Live Attendance" }}
        />
        <Stack.Screen
            name="ClassSetup"
            component={ClassSetup}
            options={{ title: "Class Setup" }}
        />
    </Stack.Navigator>
);