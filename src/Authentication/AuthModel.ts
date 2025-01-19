import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

export const singupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Must be at least 8 characters")
      .min(8, "Must be at least 8 characters long") // Enforces minimum length
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/\d/, "Must include at least one number")
      .regex(
        /[@$!%*?&]/,
        "Must include at least one special character (@$!%*?&)"
      ),
    confirmPassword: z.string().min(8, "Password confirmation is required"),
    deliveryAddress: z.string().nonempty("Delivery address is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type LoginCredentials = z.infer<typeof loginSchema>;
export type SignupCredentials = z.infer<typeof singupSchema>;

// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface SignupCredentials {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   deliveryAddress: string;
// }

export interface User {
  exp: number;
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  isAdmin: boolean;
}
