import dotenv from 'dotenv';

dotenv.config();

export const config = {
  SteamApi: process.env.Steamapi || '',
  SteamId: process.env.SteamId || '',
};