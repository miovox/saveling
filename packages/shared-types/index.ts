export interface FamilyRegistrationRequest {
  handle: string;
  displayName: string;
  password: string;
}

export interface FamilyLoginRequest {
  handle: string;
  password: string;
}

export interface FamilyResponse {
  id: string;
  handle: string;
  displayName: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  family?: FamilyResponse;
  error?: string;
}