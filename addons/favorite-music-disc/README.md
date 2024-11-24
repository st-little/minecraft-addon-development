# Favorite music disc

Change the music disc to music of your choice.

## Installing Add-On

1. Copy the add-on to the `worlds/Bedrock level/resource_packs` folder on the server.

   - worlds/Bedrock level/resource_packs/favorite-music-disc
     - manifest.json
     - pack_icon.png
     - sounds/music/game/records

1. Copy the music files(.ogg) to the `favorite-music-disc/sounds/music/game/records`. The file name must match the Music Disc.

1. Add the add-on's UUID to `worlds/Bedrock level/world_resource_packs.json`.

   ```json
   [
     {
       "pack_id": "2fb8af94-b8d3-4f6b-a69f-3f6e1f5ab18f",
       "version": [1, 0, 0]
     }
   ]
   ```
