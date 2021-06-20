import PropTypes from "prop-types";
import React, { Fragment } from "react";

function InputField(props) {
	const { label, name, type, refInput, isError, submit } = props;

	let css = `form__input`;

	if (isError[name]?.message) css += " form__input--unvalid";
	else if (submit && !isError[name]?.message) css += " form__input--valid";

	return (
		<Fragment>
			<div className="form__group">
				<div className="form__input-wrapper">
					<input
						autoComplete="off"
						type={type}
						name={name}
						id={name}
						className={css}
						placeholder={label}
						{...refInput}
					/>

					{submit && !isError[name] && (
						<i className="form__icon form__icon--valid fal fa-check-circle" />
					)}
					{isError[name] && (
						<i className="form__icon form__icon--unvalid fal fa-exclamation-circle" />
					)}
				</div>

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
	submit: PropTypes.bool,
};

export default InputField;
