import { User } from '../types';

interface LoginResponse {
  user: User;
  token: string;
}

export const authenticate = async (
  email: string, 
  password: string, 
  role: 'student' | 'teacher'
): Promise<LoginResponse> => {
  // Mock authentication for testing
  // In production, this would make an API call to your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: '1',
          email,
          role,
          name: role === 'student' ? 'Test Student' : 'Test Teacher'
        },
        token: 'mock-jwt-token'
      });
    }, 1000);
  });
};