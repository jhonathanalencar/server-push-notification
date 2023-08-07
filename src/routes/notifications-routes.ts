import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const appUrl = process.env.APP_URL!;
const publicKey = process.env.PUBLIC_VAPID_KEY!;
const privateKey = process.env.PRIVATE_VAPID_KEY!;

WebPush.setVapidDetails(appUrl, publicKey, privateKey);

export async function notificationsRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", (request, reply) => {
    // register subscription to user
    // console.log(request.body);

    return reply.status(201).send();
  });

  app.post("/push/send", async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        expirationTime: z.number().optional(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const data = JSON.parse(request.body as string) as {
      subscription: WebPush.PushSubscription;
    };

    WebPush.sendNotification(data.subscription, "Hello from backend");

    return reply.status(201).send();
  });
}

// frontend usage

// navigator.serviceWorker
//   .register('service-worker.js')
//   .then(async (serviceWorker) => {
//     let subscription = await serviceWorker.pushManager.getSubscription();

//     if (!subscription) {
//       const publicKeyResponse = await fetch(
//         'http://localhost:3333/push/public_key'
//       );
//       const publicKeyData = await publicKeyResponse.json();

//       subscription = await serviceWorker.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: publicKeyData.publicKey,
//       });
//     }

//     await fetch('http://localhost:3333/push/register', {
//       method: 'POST',
//       body: JSON.stringify({
//         subscription,
//       }),
//     });

//     await fetch('http://localhost:3333/push/send', {
//       method: 'POST',
//       body: JSON.stringify({
//         subscription,
//       }),
//     });
//   });
