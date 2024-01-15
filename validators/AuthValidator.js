import { z } from 'zod';

const Register = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(1, { message: "Name should not be empty" })
        .trim(),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .min(1, { message: "Email should not be empty" })
        .email({ message: "Invalid email address" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be atleast 8 characters long!" })
        .refine((value) => /[a-z]/.test(value), { message: 'Password must contain atleast one lowercase alphabet.' })
        .refine((value) => /[A-Z]/.test(value), { message: 'Password must contain atleast one uppercase alphabet.' })
        .refine((value) => /[0-9]/.test(value), { message: 'Password must contain atleast one digit.' })
        .refine((value) => /[^a-zA-Z0-9]/.test(value), { message: 'Password must contain atleast one special character.' }),

    profile: z
        .string({ required_error: "Profile is required" })
        .min(1, { message: 'Profile pictue must be uploaded' })
});

const Login = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .min(1, { message: "Email should not be empty" })
        .email({ message: "Invalid email address" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "Password must be not be empty!" })
});

const SendOtp = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email should not be empty" })
});

const PasswordChange = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .min(1, { message: "Email should not be empty" })
        .email({ message: "Invalid email address" }),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be atleast 8 characters long!" })
        .refine((value) => /[a-z]/.test(value), { message: 'Password must contain atleast one lowercase alphabet.' })
        .refine((value) => /[A-Z]/.test(value), { message: 'Password must contain atleast one uppercase alphabet.' })
        .refine((value) => /[0-9]/.test(value), { message: 'Password must contain atleast one digit.' })
        .refine((value) => /[^a-zA-Z0-9]/.test(value), { message: 'Password must contain atleast one special character.' }),

    otp: z
        .string({ required_error: "OTP is required" })
        .min(1, { message: "OTP should not be empty" })
});

export { Register, Login, SendOtp, PasswordChange };