import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function verifyAuth(token: string) {
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    return verified;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function getTokenFromHeaders(headers: Headers) {
  const authHeader = headers.get('authorization');
  if (!authHeader) return null;
  
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) return null;
  
  return token;
} 