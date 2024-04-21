import { Str } from "@cloudflare/itty-router-openapi";

export const Task = {
	task: new Str({ required: true, example: "Lorem Ipsum", description: "Name of the task" }),
	list: new Str({ required: true, example: "my-list", description: "List slug of the task. Should be all lowercase and use dask instead of space" }),
	slug: new Str({ required: true, example: "lorem-ipsum", description: "Slug of the task. Should be all lowercase and use dask instead of space" }),
};

export const List = {
	list: new Str({ required: true, example: "My List", description: "Name of the list" }),
	slug: new Str({ required: true, example: "my-list", description: "Slug of the list. Should be all lowercase and use dask instead of space" }),
};
