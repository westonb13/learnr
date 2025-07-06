import { OnStart, Service } from "@flamework/core";
import { ServerStorage, Workspace } from "@rbxts/services";
import { Events } from "server/network";

import { Leaderstats } from "./Leaderstats";

const fireBallInstance = ServerStorage.WaitForChild("FireBall") as Part

@Service({})
export class FireballService implements OnStart {
  constructor(private leaderstats: Leaderstats) {

  }
  onStart() {
    Events.FireballActivated.connect((player, cf) => {
      const clone = fireBallInstance.Clone()
      clone.PivotTo(cf)
      clone.Parent = Workspace
      clone.SetNetworkOwner(player)
      clone.AssemblyLinearVelocity = clone.CFrame.LookVector.mul(150)

      clone.Touched.Connect((otherPart) => {
        this.lightOnFire(otherPart,player)
      })
    })
  }
  
  private lightOnFire(part: BasePart, player: Player) {
    if (part.Name === "Baseplate") return
    const hasFire = part.FindFirstChildOfClass("Fire")
    if (hasFire) return
    const fire = new Instance("Fire")
    fire.Size = part.Size.X * part.Size.Z * part.Size.Y * 5
    fire.Parent = part
    part.BrickColor = new BrickColor("Black")
    task.delay(3, () => {
      const parts = Workspace.GetPartBoundsInBox(part.CFrame, new Vector3(part.Size.X + 1, part.Size.Y + 1, part.Size.Z + 1))
      for (const p of parts) {
        this.lightOnFire(p, player)
      }
      part.Destroy()
      this.leaderstats.addMoney(player, 10)
    })
  }
}