import { BeforeDuplicate, CollectionConfig } from "payload/types";

import { GalleryImage } from "../blocks/GalleryImage";
import { SlugField } from "../fields/SlugField";

const Projects: CollectionConfig = {
	slug: "projects",
	versions: {
		drafts: true,
	},
	admin: {
		useAsTitle: "project title",
		description: "projects bitch",
	},
	access: {
		read: () => true,
		//Anytone can read
		create: () => true,
		//Anyone can create
	},
	fields: [
		{
			name: "title",
			type: "text",
			label: "Title",
			unique: true,
		},
		{
			name: "slug",
			type: "text",
			label: "slug",
			admin: {
				components: {
					Field: SlugField,
				},
				description:
					"IDs and URLs are made from the title and are uneditable when first created",
			},
			unique: true,
		},
		{
			name: "image",
			label: "image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "tags", // required
			type: "array", // required
			maxRows: 3,
			fields: [
				// required
				{
					name: "title",
					type: "text",
				},
			],
		},
		{
			name: "description",
			type: "richText",
			label: "Description",
		},
		/*
		{
			name: "layout",
			label: "Layout",
			type: "blocks",
			blocks: [GalleryImage],
		},*/
	],
	timestamps: true,
};

export default Projects;
