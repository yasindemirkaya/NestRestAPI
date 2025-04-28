import * as bcrypt from 'bcryptjs';
import { UserDocument } from '../../users/schemas/user.schema';

// Validate User
export async function validateUser(
  user: UserDocument,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, user.password);
}
