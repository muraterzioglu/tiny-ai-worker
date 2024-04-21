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
			"400": {
				description: "List can't be found.",
				schema: {
					success: false,
				},
			}
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
		// Retrieve the validated request body
		const taskToCreate: typeof Task = data.body;

		// Implement your own object insertion here
		const listValue = await env.MY_LIST.get(taskToCreate.list)
		if (!listValue) {
			return Response.json({ success: false }, { status: 400 })
		}
		const taskValue = await env.MY_TODO.get(`${taskToCreate.list}:${taskToCreate.slug}`)
		if (taskValue) {
			return Response.json({ success: false }, { status: 400 })
		}
		await env.MY_TODO.put(`${taskToCreate.list}:${taskToCreate.slug}`, taskToCreate.task, {
			metadata: { slug: taskToCreate.slug, task: taskToCreate.task }
		})

		// return the new task
		return {
			success: true,
			task: {
				task: taskToCreate.task,
				list: taskToCreate.list,
				slug: taskToCreate.slug
			},
		};
	}
}
