import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

interface MovingPartInstance extends Model {
	TargetLocationPart: Part;
	TweenPart: Part;
}

interface Attributes {}

@Component({
	tag: "MovingPart",
})
export class MovingPart extends BaseComponent<Attributes, MovingPartInstance> implements OnStart {
	onStart() {
    const movingPart = this.instance.TweenPart
		this.instance.TweenPart.BrickColor = new BrickColor("Bright blue");
		const TweenService = game.GetService("TweenService");
		const goal = {
			Position: this.instance.TargetLocationPart.Position,
		};
		const tweenInfo = new TweenInfo(20);
		const tween = TweenService.Create(movingPart, tweenInfo, goal);
		tween.Play();
	}
}
