import React from "react";
import TextInput from "../ui/Input";
import Input from "../ui/Input";

type Props = {
	prefix: "senderAddress" | "clientAddress";
};

function AddressFields({ prefix }: Props) {
	return (
		<div className="grid gap-6">
			<Input label="Street Address" name={`${prefix}.street`} type={"text"} />
			<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
				<Input label="City" name={`${prefix}.city`} type={"text"} />
				<Input label="Post Code" name={`${prefix}.postCode`} type={"text"} />
				<Input label="Country" name={`${prefix}.country`} type={"text"} />
			</div>
		</div>
	);
}

export default AddressFields;
