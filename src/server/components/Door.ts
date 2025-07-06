import { BaseComponent,Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

interface DoorInstance extends Model {
  Door: Part & {
    Open: Sound
    HingeConstraint: HingeConstraint
    ProximityPrompt: ProximityPrompt
  }
}

interface Attributes {}

@Component({
  tag: "Door",
})
export class Door extends BaseComponent<Attributes, DoorInstance> implements OnStart {
  onStart() {
    this.instance.Door.ProximityPrompt.Triggered.Connect(() => {
      this.instance.Door.HingeConstraint.TargetAngle = -90
      this.instance.Door.Open.Play()
      task.delay(2, () => {
        this.instance.Door.HingeConstraint.TargetAngle = 0
      })
    })
  }
}