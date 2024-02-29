import { Block } from "payload/types";

export const GalleryImage: Block = {
	slug: "Gallery Image", // required
	interfaceName: "GalleryImage", // optional
	fields: [
		{
			name: "PrimaryImage",
			label: "Primary Image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "SecondaryImage",
			label: "Secondary Image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "TertiaryImage",
			label: "Tertiary Image",
			type: "upload",
			relationTo: "media",
		},
	],
};
