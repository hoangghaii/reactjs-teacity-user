import PropTypes from "prop-types";
import React, { Fragment } from "react";

function InputField(props) {
	const { label, name, type, refInput, isError } = props;

	let css = `form__input`;

	if (isError[name]?.message) css += " form__input--error";

	return (
		<Fragment>
			<div className="form__group">
				<input
					autoComplete="off"
					type={type}
					name={name}
					id={name}
					className={css}
					placeholder={label}
					{...refInput}
				/>
				<label htmlFor={name} className="form__label">
					{label}
				</label>
			</div>

			{isError[name]?.message && (
				<span className="form__error-msg">
					{isError[name]?.message}
				</span>
			)}
		</Fragment>
	);
}

InputField.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	refInput: PropTypes.any,
	isError: PropTypes.any,
};

export default InputField;
