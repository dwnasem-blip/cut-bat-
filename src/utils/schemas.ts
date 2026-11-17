import { z } from 'zod';
import { AppConstants } from './constants';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(AppConstants.VALIDATION.EMAIL_REGEX, 'Invalid email format'),
  password: z
    .string()
    .min(AppConstants.VALIDATION.PASSWORD_MIN_LENGTH, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
});

export const RegisterSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .regex(AppConstants.VALIDATION.EMAIL_REGEX, 'Invalid email format'),
    password: z
      .string()
      .min(AppConstants.VALIDATION.PASSWORD_MIN_COMPLEXITY, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must include uppercase letter')
      .regex(/[0-9]/, 'Password must include number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(AppConstants.VALIDATION.EMAIL_REGEX, 'Invalid email format'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;
