import { PlayersBDD } from './players_data';
import { GameBDD } from './game_data';
import { badgeBDD } from './badge_data';
import { Junc_P_G } from './junc_playgam_data';
import { Junc_P_B } from './junc_playbadg_data';

/**
 * Steam Database Manager
 * 
 * This class coordinates all the database operations for managing
 * Steam players, games, badges, and their relationships.
 */
export class SteamDatabaseManager {
    public players: PlayersBDD;
    private games: GameBDD;
    private badges: badgeBDD;
    private playerGames: Junc_P_G;
    private playerBadges: Junc_P_B;
    private dbPath: string;

    constructor(dbPath: string = 'steam.db') {
        this.dbPath = dbPath;
        
        // Initialize all database instances with the same file
        this.players = new PlayersBDD(dbPath);
        this.games = new GameBDD(dbPath);
        this.badges = new badgeBDD(dbPath);
        this.playerGames = new Junc_P_G(dbPath);
        this.playerBadges = new Junc_P_B(dbPath);
    }

    /**
     * Add a new player to the database
     */
    addPlayer(id: string): boolean {
        return this.players.addId(id);
    }

    /**
     * Add multiple players at once
     */
    addPlayers(ids: string[], usernames: string[]): number {
        if (ids.length !== usernames.length) {
            throw new Error('IDs and usernames arrays must have the same length');
        }
        return this.players.addIds(ids);
    }

    /**
     * Add a new game to the database
     */
    addGame(id: string, name: string): boolean {
        return this.games.AddGame(id, name);
    }

    /**
     * Add multiple games at once
     */
    addGames(ids: string[], names: string[]): number {
        if (ids.length !== names.length) {
            throw new Error('IDs and names arrays must have the same length');
        }
        return this.games.InsertManyGames(ids, names);
    }

    /**
     * Add a new badge to the database
     */
    addBadge(id: string, foil: boolean): boolean {
        return this.badges.AddBadge(id, foil);
    }

    /**
     * Assign a game to a player
     */
    assignGameToPlayer(playerId: string, gameId: string): boolean {
        return this.playerGames.addGameToPlayer(playerId, gameId);
    }

    /**
     * Assign multiple games to a player
     */
    assignGamesToPlayer(playerId: string, gameIds: string[]): number {
        return this.playerGames.addMGameToPlayer(playerId, gameIds);
    }

    /**
     * Award a badge to a player
     */
    awardBadgeToPlayer(playerId: string, badgeId: string): boolean {
        return this.playerBadges.addBadgeToPlayer(playerId, badgeId);
    }

    /**
     * Award multiple badges to a player
     */
    awardBadgesToPlayer(playerId: string, badgeIds: string[]): number {
        return this.playerBadges.addMultipleBadgesToPlayer(playerId, badgeIds);
    }

    /**
     * Get all games owned by a player
     */
    getPlayerGames(playerId: string): string[] {
        return this.playerGames.GetPlayerGames(playerId);
    }

    /**
     * Get all badges earned by a player
     */
    getPlayerBadges(playerId: string): string[] {
        return this.playerBadges.getPlayerBadges(playerId);
    }

    /**
     * Get all players who own a specific game
     */
    getGameOwners(gameId: string): string[] {
        return this.playerGames.getGamePlayers(gameId);
    }

    /**
     * Get all players who earned a specific badge
     */
    getBadgeHolders(badgeId: string): string[] {
        return this.playerBadges.getBadgePlayers(badgeId);
    }

    /**
     * Check if a player owns a specific game
     */
    playerOwnsGame(playerId: string, gameId: string): boolean {
        const games = this.playerGames.GetPlayerGames(playerId);
        return games.includes(gameId);
    }

    /**
     * Check if a player has earned a specific badge
     */
    playerHasBadge(playerId: string, badgeId: string): boolean {
        return this.playerBadges.playerHasBadge(playerId, badgeId);
    }

    /**
     * When a player earned a badge (timestamp)
     */
    getBadgeEarnedTime(playerId: string, badgeId: string): number | null {
        return this.playerBadges.getPlayerBadgeEarnedAt(playerId, badgeId);
    }

    /**
     * Remove a player from the database (cascades to relationships)
     */
    removePlayer(playerId: string): boolean {
        return this.players.deleteId(playerId);
    }

    /**
     * Remove a game from a player's library
     */
    removeGameFromPlayer(playerId: string, gameId: string): boolean {
        return this.playerGames.removeGameFromPlayer(playerId, gameId);
    }

    /**
     * Remove a badge from a player
     */
    removeBadgeFromPlayer(playerId: string, badgeId: string): boolean {
        return this.playerBadges.removeBadgeFromPlayer(playerId, badgeId);
    }

    /**
     * Create a backup of the database
     */
    backup(backupPath: string): void {
        this.players.backup(backupPath);
    }

    /**
     * Close all database connections
     */
    close(): void {
        this.players.close();
        this.games.close();
        this.badges.close();
        this.playerGames.close();
        this.playerBadges.close();
    }

    /**
     * Clear all data from all tables (use with caution!)
     */
    clearAll(): void {
        this.playerBadges.clear();
        this.playerGames.clear();
        this.badges.clear();
        this.games.clear();
        this.players.clear();
    }
}
