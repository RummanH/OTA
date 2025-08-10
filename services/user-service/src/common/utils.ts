import * as bcrypt from 'bcrypt';

export async function comparePassword(rawPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(rawPassword, hashedPassword);
}

export async function hashValue(value: string, saltRounds = 12): Promise<string> {
  return bcrypt.hash(value, saltRounds);
}

export function parseExpirySeconds(exp: string): number {
  const unit = exp.slice(-1);
  const value = parseInt(exp.slice(0, -1), 10);
  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 3600;
    case 'd':
      return value * 86400;
    default:
      return parseInt(exp, 10) || 0;
  }
}
