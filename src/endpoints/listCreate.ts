import {
    OpenAPIRoute,
    OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { List, Task } from "../types";

export class ListCreate extends OpenAPIRoute {
    static schema: OpenAPIRouteSchema = {
        tags: ["Lists"],
        summary: "Create a new List",
        requestBody: List,
        responses: {
            "200": {
                description: "Returns the created list",
                schema: {
                    success: Boolean,
                    result: {
                        list: List,
                    },
                },
            },
            "400": {
                description: "A list already exist with this slug",
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
        // Retrieve the validated request body
        const listToCreate: typeof List = data.body;

        // Implement your own object insertion here
        const checkValue = await env.MY_LIST.get(listToCreate.slug)
        if (checkValue) {
            return Response.json({ success: false }, { status: 400 })
        }
        await env.MY_LIST.put(listToCreate.slug, listToCreate.list)

        // return the new task
        return {
            success: true,
            list: {
                list: listToCreate.list,
                slug: listToCreate.slug
            },
        };
    }
}
