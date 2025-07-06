import { Service } from "@flamework/core";
import { DataStoreService } from "@rbxts/services";

type PlayerData = {
	Money: number;
	Rebirths: number;
};

@Service({})
export class DataManager {
	public loadData(player: Player): PlayerData {
		const store = DataStoreService.GetDataStore("Leaderboard");
		const [data] = store.GetAsync(tostring(player.UserId));
		if (!data) {
			return {
				Money: 0,
				Rebirths: 0,
			};
		}

		return data as PlayerData;
	}

	public saveData(player: Player, data: PlayerData) {
		const store = DataStoreService.GetDataStore("Leaderboard");
		store.SetAsync(tostring(player.UserId), data);
	}
}
