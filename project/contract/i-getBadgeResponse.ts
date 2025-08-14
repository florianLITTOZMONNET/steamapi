import {BadgeInfo} from "./i-badge";

export interface GetBadgesResponse {
    badges: BadgeInfo[];
    player_xp: number;
    player_level: number;
    player_xp_needed_to_level_up: number;
    player_xp_needed_current_level: number;
}