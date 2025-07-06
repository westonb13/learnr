import { BaseComponent,Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { HttpService, PhysicsService, Players } from "@rbxts/services";
import { Leaderstats } from "server/services/Leaderstats";

interface RebirthGateInstance extends Part {}

interface Attributes {
  Rebirths: number
}

@Component({
  tag: "RebirthGate",
})
export class RebirthGate extends BaseComponent<Attributes, RebirthGateInstance> implements OnStart {
  private groupID = HttpService.GenerateGUID()
  constructor(private leaderstats: Leaderstats){
    super()
  }

  onStart() {
    PhysicsService.RegisterCollisionGroup(this.groupID)
    this.instance.CollisionGroup = this.groupID
    this.instance.Touched.Connect((otherPart) => {
      const player = Players.GetPlayerFromCharacter(otherPart.Parent)
      if (!player) return
      const rebirths = this.leaderstats.getRebirths(player)
      if (rebirths >= this.attributes.Rebirths) {
        this.allowPlayer(player)
      }
    })
  }

  private allowPlayer(player: Player){
    PhysicsService.RegisterCollisionGroup(player.Name)
    PhysicsService.CollisionGroupSetCollidable(this.groupID, player.Name, false)
    if (!player.Character) return
    for (const thing of player.Character.GetChildren()) {
      if (!thing.IsA("BasePart")) continue
      thing.CollisionGroup = player.Name
    }
  }
}