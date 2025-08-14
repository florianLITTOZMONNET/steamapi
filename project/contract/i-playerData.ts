export interface GetPlayerSummariesResponse {
  response: {
    players: SteamPlayer[];
  };
}

// Single player object
export interface SteamPlayer {
  steamid: string; // 64-bit Steam ID as string
  communityvisibilitystate: number; // 1 = Private, 3 = Public
  profilestate?: number; // 1 if profile setup
  personaname: string;
  profileurl: string;
  avatar: string; // 32x32 avatar URL
  avatarmedium: string; // 64x64 avatar URL
  avatarfull: string; // 184x184 avatar URL
  avatarhash?: string;
  lastlogoff?: number; // Unix timestamp
  personastate: number; // 0 = Offline, 1 = Online, etc.
  realname?: string;
  primaryclanid?: string;
  timecreated?: number; // Unix timestamp
  personastateflags?: number;
  loccountrycode?: string;
  locstatecode?: string;
  loccityid?: number;
}