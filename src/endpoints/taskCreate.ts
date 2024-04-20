import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Task } from "../types";

export class TaskCreate extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Tasks"],
		summary: "Create a new Task",
		requestBody: Task,
		responses: {
			"200": {
				description: "Returns the created task",
				schema: {
					success: Boolean,
					result: {
						task: Task,
					},
				},
			},
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
		// Retrieve the validated request body
		const taskToCreate = data.body;

		// Implement your own object insertion here

		// return the new task
		return {
			success: true,
			task: {
				task: taskToCreate.task,
				slug: taskToCreate.slug
			},
		};
	}
}
