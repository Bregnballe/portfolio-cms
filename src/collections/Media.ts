import { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
	slug: "media",
	labels: {
		singular: "Media",
		plural: "Media",
	},
	access: {
		read: () => true,
		create: () => true,
		update: () => true,
		delete: () => true,
	},
	upload: {
		staticURL: "https://bregnballe-portfolio.s3.eu-central-1.amazonaws.com",
		//staticDir: "media",
		disableLocalStorage: true,
		resizeOptions: {},
		imageSizes: [
			{
				name: "Thumbnail",
				width: 200,
				// By specifying `undefined` or leaving a height undefined,
				// the image will be sized to a certain width,
				// but it will retain its original aspect ratio
				// and calculate a height automatically.
				height: undefined,
				position: "centre",
				formatOptions: {
					format: "webp",
					options: {
						quality: 5,
					},
				},
			},
		],

		adminThumbnail: "thumbnail",
		mimeTypes: ["image/*"], // Accept image file types only
	},
	fields: [
		{
			name: "alt",
			type: "text",
		},
	],
};

export default Media;
