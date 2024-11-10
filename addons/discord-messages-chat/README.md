# Discord Messages Chat

Relay in-game chats to Discord.

## Installing Add-On

1. Build and create `./dist/main.js`.

   ```bash
   npx tsc
   ```

1. Overwrite the WEBHOOK_URL in `./dist/main.js` with the discord's Webhook URL.

1. Copy the add-on to the `worlds\Bedrock level\behavior_packs` folder on the server.

   - worlds\Bedrock level\behavior_packs
     - discord-messages-chat
       - scripts
         - main.js
       - manifest.json
       - pack_icon.png

### Add-On Settings

#### Permissions

1. Add “@minecraft/server-net” to the server's `data\config\default\permissions.json`.
