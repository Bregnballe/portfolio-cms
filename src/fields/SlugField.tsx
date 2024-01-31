import React, { useEffect } from "react";
import { useField, useFormFields, TextInput } from "payload/components/forms";

type Props = { path: string };

export const SlugField: React.FC<Props> = ({ path }) => {
	const { value, setValue } = useField<string>({ path });
	// path is "slug" ie. the name of the field in the collection
	// value is the value of the field

	const title = useFormFields(([fields]) => fields.title);
	// title is the value of the title field

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value);
	};

	useEffect(() => {
		setValue(title?.value?.replace(/ /g, "-").toLowerCase() ?? value);
	}, [title, setValue]);
	/* set the value of the field to the title field in lowercase and replace spaces with dashes.
	 */

	return (
		<TextInput
			path={path}
			name="id"
			value={value}
			label="slug"
			onChange={handleChange}
		/>
	);
};
