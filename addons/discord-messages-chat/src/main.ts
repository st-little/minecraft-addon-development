import { world, system, ChatSendBeforeEvent } from "@minecraft/server";
import {
  http,
  HttpHeader,
  HttpRequest,
  HttpRequestMethod,
} from "@minecraft/server-net";

const WEBHOOK_URL = "my_webhook_url"; // Replace with your webhook URL

function chatSendBeforeEventHandler(e: ChatSendBeforeEvent) {
  system.run(() => {
    const req = new HttpRequest(WEBHOOK_URL);
    req.body = JSON.stringify({
      content: e.message,
      username: e.sender.name,
    });

    req.method = HttpRequestMethod.Post;
    req.headers = [new HttpHeader("Content-Type", "application/json")];
    http.request(req).then((res) => {
      if (res.status !== 204) {
        console.warn(`[status ${res.status}] Failed to relay to Discord.`);
      }
    });
  });
}

world.beforeEvents.chatSend.subscribe(chatSendBeforeEventHandler);
