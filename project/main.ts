import {config} from '../config/configEnv';
import { SteamDatabaseManager } from './database/database_manager';
import { LibraryStats,gameOwnedStats } from './contract';
import { GetLibrayUser } from './service/getLibrary.service';
import {web} from './web_handler/ok';
import { populateGameData } from './database/external_data_func';
import { Player } from './contract/i-BDD';



const temp = async(numbGame:number) => { 
    const steamDB = new SteamDatabaseManager('my_steam_data.db');
    const test =steamDB.getAllPlayers();
    console.log(test);
    steamDB.close();
    return;


}

temp(10).catch(console.error);

//Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//npx ts-node ./project/main.ts


    // const steamDB = new SteamDatabaseManager('my_steam_data.db');
    /*steamDB.addGame("3165690","Fences 6");
    while(numbGame>0){
        const randomGame = steamDB.getRandomUnsearchedGame();
        if (randomGame) {
            console.log(`Random game: ${randomGame.name} (ID: ${randomGame.id})`);
            web(randomGame.id.toString());
        } else {
            console.log('No games in database');
            break;
        }
        numbGame--;
        steamDB.markGameSearched(randomGame.id.toString());
    }*/
    // steamDB.close();





    /*
    const steamDB = new SteamDatabaseManager('my_steam_data.db');
    let player: Player[]|null = steamDB.getUnsearchedPlayers();
    if(player==null){return;}
    player= player as Player[];
    for(let i=0; i<player.length;i++)
    {
        console.log(player[i].id)
        const game = await GetLibrayUser(player[i].id);
        if(Object.keys(game).length == 0)
        {continue;}
        const games = game.games
        games.forEach(info => {
            steamDB.addGame(info.appid.toString(), info.name) 
        });
        steamDB.markPlayerSearched(player[i].id);
    }



    const test =steamDB.getAllGame();
    console.log(test);
    steamDB.close();
    return;



    */