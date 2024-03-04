import { Block } from "payload/types";

export const GalleryImage: Block = {
	slug: "Gallery Image", // required
	interfaceName: "GalleryImage", // optional
	fields: [
		{
			name: "primaryImagePosition",
			label: "Primary Image Position",
			type: "select",
			defaultValue: "top",
			options: [
				{
					label: "Top",
					value: "top",
				},
				{
					label: "Right",
					value: "right",
				},
				{
					label: "Bottom",
					value: "bottom",
				},
				{
					label: "Left",
					value: "left",
				},
			],
		},
		{
			name: "aspectRatio",
			label: "Aspect Ratio",
			type: "select",
			defaultValue: "1/1",
			options: [
				{
					label: "1/1",
					value: "1/1",
				},
				{
					label: "3/4",
					value: "3/4",
				},
			],
		},
		{
			name: "primaryImage",
			label: "Primary Image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "secondaryImage",
			label: "Secondary Image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "tertiaryImage",
			label: "Tertiary Image",
			type: "upload",
			relationTo: "media",
		},
	],
};
