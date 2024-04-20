import { Str } from "@cloudflare/itty-router-openapi";

export const Task = {
	task: new Str({ required: true, example: "Lorem Ipsum" }),
	slug: new Str({ required: true, example: "lorem-ipsum" }),
};
