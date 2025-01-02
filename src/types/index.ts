export interface User {
  id: string;
  role: 'student' | 'teacher';
  name: string;
  email: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  timestamp: Date;
  status: 'present' | 'absent';
  location: {
    latitude: number;
    longitude: number;
  };
  isMockLocation: boolean;
}

export interface Class {
  id: string;
  name: string;
  teacherId: string;
  geofence: {
    latitude: number;
    longitude: number;
    radius: number; // in meters
  };
}