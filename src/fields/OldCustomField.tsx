import React, { useEffect } from "react";
import { useDocumentInfo } from "payload/components/utilities";
import { useField, useFormFields, TextInput } from "payload/components/forms";

type Props = { path: string };

export const SlugField: React.FC<Props> = ({ path }) => {
	const { id } = useDocumentInfo();
	// id of the document

	const { value, setValue } = useField<string>({ path });
	// path is "id" ie. the name of the field in the collection
	// value is the value of the field

	const title = useFormFields(([fields]) => fields.title);
	// title is the value of the title field

	useEffect(() => {
		if (!id) {
			setValue(title?.value?.replace(/ /g, "-").toLowerCase() ?? value);
		}
	}, [title, setValue]);
	/* If there is not already an id, set the value of the field to the title field in lowercase and replace spaces with dashes.
	 */

	return <TextInput path={path} name="id" value={value} label="ID & URL" />;
};
