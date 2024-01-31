import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

// S3
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";

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

import Users from "./collections/Users";
import Projects from "./collections/Projects";
import Media from "./collections/Media";

export default buildConfig({
	admin: {
		user: Users.slug,
		bundler: webpackBundler(),
	},
	editor: slateEditor({}),
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
