import {
	OpenAPIRoute,
	OpenAPIRouteSchema, Path,
} from "@cloudflare/itty-router-openapi";
import { List, Task } from "../types";

export class ListFetch extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Lists"],
		summary: "List Tasks",
		parameters: {
			listSlug: Path(String, {
				description: "List slug",
			}),
		},
		responses: {
			"200": {
				description: "Returns a list of tasks",
				schema: {
					success: Boolean,
					result: {
						list: List,
						tasks: [{
							name: String,
							metadata: {
								slug: String,
								task: String
							}
						}],
					},
				},
			},
			"400": {
				description: "The list with that slug is not found",
				schema: {
					success: false,
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
		// Implement your own object list here
		const { listSlug } = data.params;

		// Implement your own object insertion here
		const listValue = await env.MY_LIST.get(listSlug)
		if (!listValue) {
			return Response.json({ success: false }, { status: 400 })
		}

		const taskValue = await env.MY_TODO.list({ prefix: `${listSlug}:` });
		return {
			success: true,
			list: {
				slug: listSlug,
				list: listValue
			},
			tasks: taskValue.keys
		};
	}
}
