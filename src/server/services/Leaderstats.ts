import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";

import { DataManager } from "./DataManager";

@Service({})
export class Leaderstats implements OnStart {
	constructor(private dataManager: DataManager) {}

	onStart() {
		Players.PlayerAdded.Connect((player) => {
			const leaderstats = new Instance("Folder");
			leaderstats.Name = "leaderstats";
			leaderstats.Parent = player;

			const playerData = this.dataManager.loadData(player);

			const money = new Instance("IntValue");
			money.Name = "Money";
			money.Value = playerData.Money;
			money.Parent = leaderstats;

			const rebirths = new Instance("IntValue");
			rebirths.Name = "Rebirths";
			rebirths.Value = playerData.Rebirths;
			rebirths.Parent = leaderstats;
		});
		Players.PlayerRemoving.Connect((player) => {
			print(player.Name + " hasleftthegame");
			const leaderstats = player.FindFirstChild("leaderstats");
			if (!leaderstats) return;
			const money = leaderstats.FindFirstChild("Money") as IntValue | undefined;
			if (!money) return;

			const rebirths = leaderstats.FindFirstChild("Rebirths") as IntValue | undefined;
			if (!rebirths) return;
			print("savingdata");
			this.dataManager.saveData(player, {
				Money: money.Value,
				Rebirths: rebirths.Value,
			});
		});
	}

	public addMoney(player: Player, amount: number) {
		const leaderstats = player.FindFirstChild("leaderstats");
		if (!leaderstats) return;
		const money = leaderstats.FindFirstChild("Money") as IntValue | undefined;
		if (!money) return;
		money.Value += amount
	}
	
	public getRebirths(player: Player){
		const leaderstats = player.FindFirstChild("leaderstats");
		if (!leaderstats) return 0;
		const rebirths = leaderstats.FindFirstChild("Rebirths") as IntValue | undefined;
		if (!rebirths) return 0;
		return rebirths.Value
	} 
}
