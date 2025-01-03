# Block Chairs

This add-on allows the player to sit on the block.

Supported Blocks

- Slab
- Stairs

## Installing Add-On

1. Build and create `./dist/main.js`.

   ```bash
   npx tsc
   ```

1. Copy the add-on to the `worlds/Bedrock level/behavior_packs` folder on the server.

   - worlds/Bedrock level/behavior_packs
     - block-chairs
       - scripts
         - main.js
       - manifest.json
       - pack_icon.png

1. Add the add-on's UUID to `worlds/Bedrock level/world_behavior_packs.json`.

   ```json
   [
     {
       "pack_id": "82bb4786-7e32-4e74-acde-d963b721ff83",
       "version": [0, 1, 0]
     }
   ]
   ```

1. Copy the add-on to the `worlds/Bedrock level/resource_packs` folder on the server.

   - worlds/Bedrock level/resource_packs
     - block-chairs
       - animations
         - sit.animation.json
       - manifest.json
       - pack_icon.png

1. Add the add-on's UUID to `worlds/Bedrock level/world_resource_packs.json`.

   ```json
   [
     {
       "pack_id": "9890323f-c6a6-408a-8887-f88c272694ac",
       "version": [0, 1, 0]
     }
   ]
   ```

## Chat Commands

- !sit
  - Sit on the block with your hands down and legs open to the left or right.
- !sit2
  - Sit on the block with your hands down and legs closed.
- !stand
  - Stand up.

## Using Add-On

1. Stand in front of the block where you want to sit and look at the block.

1. Type the following command into the chat and sit on the block.

   ```
   !sit
   ```

1. Type the following command into chat and stand up.

   ```
   !stand
   ```
