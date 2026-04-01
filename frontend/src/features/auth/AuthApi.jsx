import { axiosi } from '../../config/axios';

// ================= SIGNUP =================
export const signup = async (cred) => {
    try {
        const res = await axiosi.post("/auth/signup", cred);
        return res.data;
    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        throw error?.response?.data || error.message;
    }
};

// ================= LOGIN =================
export const login = async (cred) => {
    try {
        const res = await axiosi.post("/auth/login", cred);
        return res.data;
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        throw error?.response?.data || error.message;
    }
};

// ================= VERIFY OTP =================
export const verifyOtp = async (cred) => {
    try {
        const res = await axiosi.post("/auth/verify-otp", cred);
        return res.data;
    } catch (error) {
        console.error("VERIFY OTP ERROR:", error);
        throw error?.response?.data || error.message;
    }
};

// ================= RESEND OTP =================
export const resendOtp = async (cred) => {
    try {
        const res = await axiosi.post("/auth/resend-otp", cred);
        return res.data;
    } catch (error) {
        console.error("RESEND OTP ERROR:", error);
        throw error?.response?.data || error.message;
    }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (cred) => {
    try {
        const res = await axiosi.post("/auth/forgot-password", cred);
        return res.data;
    } catch (error) {
        console.error("FORGOT PASSWORD ERROR:", error);
        throw error?.response?.data || error.message;
    }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (cred) => {
    try {
        const res = await axiosi.post("/auth/reset-password", cred);
        return res.data;
    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);
        throw error?.response?.data || error.message;
    }
};

// ================= CHECK AUTH =================
export const checkAuth = async () => {
    try {
        const res = await axiosi.get("/auth/check-auth");
        return res.data;
    } catch (error) {
        console.error("CHECK AUTH ERROR:", error);
        throw error?.response?.data || error.message;
    }
};

// ================= LOGOUT =================
export const logout = async () => {
    try {
        const res = await axiosi.get("/auth/logout");
        return res.data;
    } catch (error) {
        console.error("LOGOUT ERROR:", error);
        throw error?.response?.data || error.message;
    }
};