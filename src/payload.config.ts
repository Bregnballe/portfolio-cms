import path from "path";

// Payload
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
//import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

// S3
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";

// Collections
import Users from "./collections/Users";
import Projects from "./collections/Projects";
import Media from "./collections/Media";

// Lexical
import {
	BlocksFeature,
	LinkFeature,
	UploadFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { GalleryImage } from "./blocks/GalleryImage";

/*CLOUDINARY
import { payloadCloud } from "@payloadcms/plugin-cloud";
import cloudinaryPlugin from "payload-cloudinary-plugin/dist/plugins";
*/

const storageAdapter = s3Adapter({
	config: {
		endpoint: process.env.S3_ENDPOINT,
		region: process.env.S3_REGION,
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY,
			secretAccessKey: process.env.S3_SECRET_KEY,
		},
	},
	bucket: process.env.S3_BUCKET_NAME,
});

export default buildConfig({
	admin: {
		user: Users.slug,
		bundler: webpackBundler(),
	},
	editor: lexicalEditor({
		features: ({ defaultFeatures }) => [
			...defaultFeatures,
			LinkFeature({
				// Example showing how to customize the built-in fields
				// of the Link feature
				fields: [
					{
						name: "rel",
						label: "Rel Attribute",
						type: "select",
						hasMany: true,
						options: ["noopener", "noreferrer", "nofollow"],
						admin: {
							description:
								"The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.",
						},
					},
				],
			}),
			UploadFeature({
				collections: {
					uploads: {
						// Example showing how to customize the built-in fields
						// of the Upload feature
						fields: [
							{
								name: "caption",
								type: "richText",
								editor: lexicalEditor(),
							},
						],
					},
				},
			}),
			// This is incredibly powerful. You can re-use your Payload blocks
			// directly in the Lexical editor as follows:
			BlocksFeature({
				blocks: [GalleryImage],
			}),
		],
	}),
	collections: [Users, Projects, Media],
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
	graphQL: {
		schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
	},
	plugins: [
		cloudStorage({
			collections: {
				// Create an object for every upload collection, in this case it's only "media"
				media: {
					adapter: storageAdapter,
				},
			},
		}),
	],
	/*plugins: [cloudinaryPlugin()],*/
	db: mongooseAdapter({
		url: process.env.DATABASE_URI,
	}),
});
