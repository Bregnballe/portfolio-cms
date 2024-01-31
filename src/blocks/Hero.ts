import { Block } from "payload/types";

export const HeroBlock: Block = {
	slug: "Hero", // required
	imageURL: "https://cdn-icons-png.flaticon.com/128/6997/6997740.png",
	imageAltText: "A nice thumbnail image to show what this block looks like",
	interfaceName: "HeroBlock", // optional
	fields: [
		// required
		{
			name: "heading",
			label: "Heading",
			type: "text",
		},
		{
			name: "HeroImage",
			label: "Hero Image",
			type: "upload",
			relationTo: "media",
		},
	],
};
