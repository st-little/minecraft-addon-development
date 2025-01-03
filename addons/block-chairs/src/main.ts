import { world, ChatSendBeforeEvent, Player } from "@minecraft/server";

/**
 * sit : Sit with your hands down and your legs open to the left or right.
 * sit2: Sit with your hands down and legs closed.
 */
type SitType = "sit" | "sit2";

function isSlabBlock(blockTypeId: string): boolean {
  const regex = /^minecraft:.*_slab$/;
  return regex.test(blockTypeId);
}

function isStairsBlock(blockTypeId: string): boolean {
  const regex = /^minecraft:.*_stairs$/;
  return regex.test(blockTypeId);
}

function isSupportedBlock(blockTypeId: string): boolean {
  if (isSlabBlock(blockTypeId) || isStairsBlock(blockTypeId)) {
    return true;
  }

  return false;
}

function sitPlayer(player: Player, sitType: SitType = "sit") {
  const blockRaycastHit = player.getBlockFromViewDirection({
    maxDistance: 4,
  });
  if (!blockRaycastHit) {
    player.sendMessage("No block in view direction.");
    return;
  }

  if (!isSupportedBlock(blockRaycastHit.block.typeId)) {
    player.sendMessage("Block is not supported.");
    return;
  }

  player.sendMessage("!stand command to stand up.");

  player.runCommandAsync(
    `inputpermission set ${player.name} movement disabled`
  );

  player.runCommandAsync(`tp ${player.name} ~ ~ ~ ~180`);

  player.runCommandAsync(
    `tp ${player.name} ${blockRaycastHit.block.x} ${
      blockRaycastHit.block.y + 0.5
    } ${blockRaycastHit.block.z}`
  );

  player.runCommandAsync(
    `playanimation ${player.name} animation.blockchairs.${sitType} animation.blockchairs.${sitType} 0`
  );
}

function standPlayer(player: Player) {
  player.runCommandAsync(
    `playanimation ${player.name} animation.player.sneaking e 0`
  );

  player.runCommandAsync(`inputpermission set ${player.name} movement enabled`);
}

function chatSendBeforeEventHandler(e: ChatSendBeforeEvent) {
  const player = e.sender;

  switch (e.message) {
    case "!sit":
      e.cancel = true;

      sitPlayer(player);

      break;
    case "!sit2":
      e.cancel = true;

      sitPlayer(player, "sit2");

      break;
    case "!stand":
      e.cancel = true;

      standPlayer(player);

      break;
    default:
      break;
  }
}

world.beforeEvents.chatSend.subscribe(chatSendBeforeEventHandler);
