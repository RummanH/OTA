import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

export async function comparePassword(rawPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(rawPassword, hashedPassword);
}
