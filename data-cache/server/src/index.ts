// server/src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use(
	"*",
	cors({
		origin: "http://localhost:3000",
		allowMethods: ["GET"],
	})
);

app.get("/time", (c) => {
	const currentTime = new Date().toLocaleTimeString();
	console.log(
		`[External Hono API - server/] Request for /time. Sending: ${currentTime}`
	);
	return c.json({ time: currentTime });
});

app.get("/", (c) => {
	console.log("[External Hono API - server/] Request for /. Responding...");
	return c.text("External Hono Time API is running!");
});

const port = 8080;

console.log(`[External Hono API - server/] Starting server...`);

serve(
	{
		fetch: app.fetch,
		port: port,
	},
	(info) => {
		console.log(
			`[External Hono API - server/] Listening on http://${info.address}:${info.port}`
		);
	}
);
