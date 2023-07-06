import path from 'path';
import { config } from 'dotenv';

export const activedMode = process.env.NODE_ENV;
export const isDevelopmentMode = process.env.NODE_ENV === 'development';

const loadEnvFile = filePath => { 
  try {
    config({ path: filePath });
  } catch (ignored) {}
};

loadEnvFile(path.resolve(process.cwd(), '.env').toString());
loadEnvFile(path.resolve(process.cwd(), '.env.local').toString());
loadEnvFile(path.resolve(process.cwd(), `.env.${activedMode}`).toString());
loadEnvFile(path.resolve(process.cwd(), `.env.${activedMode}.local`).toString());