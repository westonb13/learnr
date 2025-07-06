import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";

interface KillPartInstance extends Part {}

interface Attributes {}

@Component({
	tag: "KillPart",
})
export class KillPart extends BaseComponent<Attributes, KillPartInstance> implements OnStart {
	onStart() {
		this.instance.Touched.Connect((otherPart) => {
			const player = Players.GetPlayerFromCharacter(otherPart.Parent);
			if (!player) return;
			const head = otherPart.Parent?.FindFirstChild("Head");
			if (!head) return;
			head.Destroy();
		});
	}
}
