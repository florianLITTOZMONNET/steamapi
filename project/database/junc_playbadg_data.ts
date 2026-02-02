import Database from 'better-sqlite3';
import {Basedatabase} from './base_data';

export class Junc_P_B extends Basedatabase
{
    constructor(filename:string)
    {super(filename)}

    protected init():void
    {
        this.db.prepare(`
            CREATE TABLE IF NOT EXISTS player_badges (
                player_id TEXT NOT NULL,
                badge_id TEXT NOT NULL,
                earned_at INTEGER DEFAULT (unixepoch()),
                
                PRIMARY KEY (player_id, badge_id),
                FOREIGN KEY (player_id) REFERENCES PlayersIds(id) ON DELETE CASCADE,
                FOREIGN KEY (badge_id) REFERENCES Badge(id) ON DELETE CASCADE
            )
        `).run();
    }

    addBadgeToPlayer(playerId: string, badgeId: string): boolean
    {
        try {
            this.db.prepare("INSERT INTO player_badges (player_id, badge_id) VALUES (?, ?)").run(playerId, badgeId);
            return true;
        } catch {
            return false;
        }
    }

    addMultipleBadgesToPlayer(playerId: string, badgeIds: string[]): number
    {
        const insert = this.db.prepare("INSERT OR IGNORE INTO player_badges (player_id, badge_id) VALUES (?, ?)");
        const insertMany = this.db.transaction((pId: string, bIds: string[]) => {
            let count = 0;
            for (const badgeId of bIds) {
                count += insert.run(pId, badgeId).changes;
            }
            return count;
        });
        return insertMany(playerId, badgeIds);
    }

    getPlayerBadges(playerId: string): string[]
    {
        const results = this.db.prepare("SELECT badge_id FROM player_badges WHERE player_id = ?").all(playerId) as { badge_id: string }[];
        return results.map(r => r.badge_id);
    }

    getBadgePlayers(badgeId: string): string[]
    {
        const results = this.db.prepare("SELECT player_id FROM player_badges WHERE badge_id = ?").all(badgeId) as { player_id: string }[];
        return results.map(r => r.player_id);
    }

    getPlayerBadgeEarnedAt(playerId: string, badgeId: string): number | null
    {
        const result = this.db.prepare("SELECT earned_at FROM player_badges WHERE player_id = ? AND badge_id = ?").get(playerId, badgeId) as { earned_at: number } | undefined;
        return result ? result.earned_at : null;
    }

    removeBadgeFromPlayer(playerId: string, badgeId: string): boolean
    {
        const result = this.db.prepare("DELETE FROM player_badges WHERE player_id = ? AND badge_id = ?").run(playerId, badgeId);
        return result.changes > 0;
    }

    removeAllBadgesFromPlayer(playerId: string): boolean
    {
        const result = this.db.prepare("DELETE FROM player_badges WHERE player_id = ?").run(playerId);
        return result.changes > 0;
    }

    playerHasBadge(playerId: string, badgeId: string): boolean
    {
        const result = this.db.prepare("SELECT 1 FROM player_badges WHERE player_id = ? AND badge_id = ?").get(playerId, badgeId);
        return result !== undefined;
    }

    clear(): void
    {
        this.db.prepare("DELETE FROM player_badges").run();
    }
}