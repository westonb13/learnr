import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "client/network";

interface FireBallInstance extends Tool {
  Handle: Part
}

interface Attributes {}

@Component({
	tag: "FireBall",
})
export class FireBall extends BaseComponent<Attributes, FireBallInstance> implements OnStart {
	onStart() {
		this.instance.Activated.Connect(() => {
      const fireballCF = this.instance.Handle.CFrame
      Events.FireballActivated.fire(fireballCF)
		});
	}
}
