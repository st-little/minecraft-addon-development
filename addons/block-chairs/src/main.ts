import { world, ChatSendBeforeEvent } from "@minecraft/server";

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

function chatSendBeforeEventHandler(e: ChatSendBeforeEvent) {
  const player = e.sender;

  switch (e.message) {
    case "!sit":
      e.cancel = true;

      const blockRaycastHit = player.getBlockFromViewDirection({
        maxDistance: 2,
      });
      if (!blockRaycastHit) {
        player.sendMessage("No block in view direction.");
        break;
      }

      if (!isSupportedBlock(blockRaycastHit.block.typeId)) {
        player.sendMessage("Block is not supported.");
        break;
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
        `playanimation ${player.name} animation.blockchairs.sit animation.blockchairs.sit 0`
      );

      break;
    case "!stand":
      e.cancel = true;

      player.runCommandAsync(
        `playanimation ${player.name} animation.player.sneaking e 0`
      );

      player.runCommandAsync(
        `inputpermission set ${player.name} movement enabled`
      );

      break;
    default:
      break;
  }
}

world.beforeEvents.chatSend.subscribe(chatSendBeforeEventHandler);
