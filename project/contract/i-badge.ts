export interface BadgeInfo {
  badgeid: number;
  appid?: number;// Present for game badges
  level: number;
  completion_time: number; // Unix timestamp
  xp: number;
  communityitemid?: string; // For community market items
  border_color?: number;
  scarcity: number; // How rare the badge is (higher = rarer)
}