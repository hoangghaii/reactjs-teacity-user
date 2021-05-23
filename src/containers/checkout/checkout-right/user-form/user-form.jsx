import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { formatCurrency } from "../../../../common/common";
import InputField from "../input-field/input-field";

// RegExp phone
const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const schema = yup.object().shape({
	userMail: yup
		.string()
		.email("Email is not valid")
		.required("Please enter email")
		.min(12, "Email is to short"),
	userName: yup
		.string()
		.required("Please enter your full name")
		.min(2, "Name is to short"),
	userPhone: yup
		.string()
		.matches(phoneRegExp, "Phone number is not valid")
		.required("Please enter your phone number")
		.min(5, "Phone number is to short"),
	userAddress: yup
		.string()
		.required("Please enter address")
		.min(5, "Address is to short"),
});

function UserForm(props) {
	const { userInfo, subTotal, onSubmitForm } = props;

	const [vat, setVat] = useState(0);

	useEffect(() => {
		setVat(subTotal * 0.2);
	}, [subTotal]);

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm({
		reValidateMode: "onChange",
		defaultValues: {
			userMail: userInfo.email || "",
			userName: userInfo.name || "",
			userPhone: "",
			userAddress: "",
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		if (!onSubmitForm) return;
		await onSubmitForm(data);
	};

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<InputField
				label="Full Name"
				name="userName"
				type="text"
				refInput={register("userName")}
				isError={errors}
				defaultValues={userInfo.name || ""}
			/>

			<InputField
				label="Email"
				name="userMail"
				type="text"
				refInput={register("userMail")}
				isError={errors}
				defaultValues={userInfo.email || ""}
			/>

			<InputField
				label="Telephone Number"
				name="userPhone"
				type="text"
				refInput={register("userPhone")}
				isError={errors}
				defaultValues=""
			/>

			<InputField
				label="Address"
				name="userAddress"
				type="text"
				refInput={register("userAddress")}
				isError={errors}
				defaultValues=""
			/>

			<div className="payment__detail mt-medium">
				<span className="payment__detail--heading">Subtotal</span>
				<span className="payment__detail--text">
					{formatCurrency(subTotal)}
				</span>
			</div>

			<div className="payment__detail">
				<span className="payment__detail--heading">VAT (20%)</span>
				<span className="payment__detail--text">
					{formatCurrency(vat)}
				</span>
			</div>

			<div className="payment__detail">
				<span className="payment__detail--heading text-bold">
					Total
				</span>
				<span className="payment__detail--text payment__detail--text-bold">
					{formatCurrency(subTotal + vat)}
				</span>
			</div>

			<div className="text-center">
				<span className="payment-note">
					<b className="text-warn">(*)</b>
					Free shipping on all orders
				</span>
			</div>

			<button
				className="btn form__submit"
				type="submit"
				disabled={isDirty || isValid}
			>
				Pay {formatCurrency(subTotal + vat)}
			</button>
		</form>
	);
}

UserForm.propTypes = {
	userInfo: PropTypes.object,
	subTotal: PropTypes.number,
	onSubmitForm: PropTypes.func,
};

export default UserForm;
