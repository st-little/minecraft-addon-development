import {
  world,
  system,
  EntityDieAfterEvent,
  EntityEventOptions,
  Player,
} from "@minecraft/server";
import {
  MinecraftDimensionTypes,
  MinecraftEntityTypes,
} from "@minecraft/vanilla-data";

function getDimensionName(dimension: MinecraftDimensionTypes): string {
  switch (dimension) {
    case MinecraftDimensionTypes.Nether:
      return "Nether";
    case MinecraftDimensionTypes.Overworld:
      return "Overworld";
    case MinecraftDimensionTypes.TheEnd:
      return "The End";
    default:
      return "Unknown";
  }
}

function entityDieAfterEventHandler(e: EntityDieAfterEvent) {
  system.run(() => {
    const player = e.deadEntity as Player;
    const location = player.location;
    const dimension = getDimensionName(
      player.dimension.id as MinecraftDimensionTypes
    );
    const message = `${player.name} died at ${dimension} ${Math.floor(
      location.x
    )}, ${Math.floor(location.y)}, ${Math.floor(location.z)}`;
    world.sendMessage(message);
  });
}

const options: EntityEventOptions = {
  entityTypes: [MinecraftEntityTypes.Player],
};

world.afterEvents.entityDie.subscribe(entityDieAfterEventHandler, options);
