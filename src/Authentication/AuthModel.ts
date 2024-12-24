export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  deliveryAddress: string;
}

export interface User {
  exp: number;
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  isAdmin: boolean;
}
