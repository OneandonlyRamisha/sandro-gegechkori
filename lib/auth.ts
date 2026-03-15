import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): jwt.JwtPayload | string {
  return jwt.verify(token, JWT_SECRET);
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const auth = req.headers.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return auth.slice(7);
  }
  return null;
}

export function requireAuth(
  req: NextRequest
): { error: string; status: number } | null {
  const token = getTokenFromRequest(req);
  if (!token) return { error: "No token provided", status: 401 };

  try {
    verifyToken(token);
    return null;
  } catch {
    return { error: "Invalid or expired token", status: 401 };
  }
}
