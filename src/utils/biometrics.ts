import { FingerprintAuth } from "@nativescript/fingerprint-auth";

export async function checkBiometricAvailability(): Promise<boolean> {
    try {
        const auth = new FingerprintAuth();
        return await auth.available();
    } catch (error) {
        console.error('Error checking biometric availability:', error);
        return false;
    }
}

export async function authenticateWithBiometrics(message: string = "Verify your identity"): Promise<boolean> {
    try {
        const auth = new FingerprintAuth();
        const available = await auth.available();
        
        if (!available) {
            return false;
        }

        const result = await auth.verifyFingerprint(message);
        return result.code === "Success";
    } catch (error) {
        console.error('Biometric authentication error:', error);
        return false;
    }
}