import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { TaskCreate, TaskDelete, TaskFetch, TaskList } from './endpoints';

export const router = OpenAPIRouter({
	schema: {
		info: {
			title: 'Tiny AI Worker Todo Example',
			description: 'This is an example worker for the Tiny AI. It is a simple todo list API.',
			version: 'v0.0.1',
		},
	},
	docs_url: "/",
	aiPlugin: {
		name_for_human: 'Tiny AI',
		name_for_model: 'tiny',
		description_for_human: "Todo list worker for TinyAI",
		description_for_model: "Todo list worker for TinyAI",
		contact_email: 'help@tinyai.id',
		legal_info_url: 'https://plugin.tinyai.id/legal',
		logo_url: 'https://tinyai.id/tiny.png',
	},
});

router.get("/api/tasks/", TaskList);
router.post("/api/tasks/", TaskCreate);
router.get("/api/tasks/:taskSlug/", TaskFetch);
router.delete("/api/tasks/:taskSlug/", TaskDelete);

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

// @ts-ignore
export default {
	fetch: router.handle,
};
