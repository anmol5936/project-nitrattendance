export type MainStackParamList = {
  Login: undefined;
  StudentDashboard: undefined;
  TeacherDashboard: undefined;
  AttendanceHistory: { classId?: string };
  ClassSetup: undefined;
  LiveAttendance: { classId: string };
  ManualAttendance: { classId: string };
};