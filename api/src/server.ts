import { fastify } from "fastify";

import {
	serializerCompiler,
	validatorCompiler,
	jsonSchemaTransform,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifyCors } from "@fastify/cors";
import ScalarApiReference from "@scalar/fastify-api-reference";
import { listWebhooksRoute } from "./routes/list-webhooks";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	//credentials: true,
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Webhook Inspector API",
			description: "API for capturing and inspecting webhooks requestsusing AI",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
	routePrefix: "/docs",
});

app.register(listWebhooksRoute);

app
	.listen({ port: 3333, host: "0.0.0.0" })
	.then(() => {
		console.log("Server is running on http://localhost:3333");
		console.log("API documentation available at http://localhost:3333/docs");
	})
	.catch((err) => {
		console.error("Error starting server:", err);
		process.exit(1);
	});
