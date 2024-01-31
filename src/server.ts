import express from "express";
import payload from "payload";

require("dotenv").config();
const app = express();

/* CLOUDINARY
import { mediaManagement } from "payload-cloudinary-plugin";
import { v2 as cloudinary } from "cloudinary";


const cloudinaryConfig = cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(mediaManagement(cloudinaryConfig));
*/

// Redirect root to Admin panel
app.get("/", (_, res) => {
	res.redirect("/admin");
});

const start = async () => {
	// Initialize Payload
	await payload.init({
		secret: process.env.PAYLOAD_SECRET,
		express: app,
		onInit: async () => {
			payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
		},
	});

	// Add your own express routes here

	app.listen(3000);
};

start();
