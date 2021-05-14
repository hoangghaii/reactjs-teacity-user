import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import addressApi from "../../../../../../apis/addressApi";

function WardSelect(props) {
	const { idDistrict, refInput, isError } = props;

	let css = "form__select";

	if (isError["wards"]?.message) css += " form__select--error";

	const [dataCommune, setDataCommune] = useState({
		loading: true,
		data: null,
		status: undefined,
	});

	useEffect(() => {
		(async () => {
			const dataRes = await addressApi.getCommune(idDistrict);

			setDataCommune({
				loading: false,
				data: dataRes.data,
				status: dataRes.status,
			});
		})();
	}, [idDistrict]);

	let contentCommune = null;

	if (dataCommune.loading) {
		contentCommune = (
			<Fragment>
				<div className="form__group">
					<select
						name="wards"
						id="wards"
						className={css}
						{...refInput}
					>
						<option value="">Select Wards...</option>
					</select>

					<label htmlFor="wards" className="form__label">
						Wards
					</label>
				</div>

				{isError["wards"]?.message && (
					<span className="form__error-msg">
						{isError["wards"]?.message}
					</span>
				)}
			</Fragment>
		);
	} else if (dataCommune.data) {
		const listCommune = dataCommune.data;

		contentCommune = (
			<Fragment>
				<div className="form__group">
					<select
						name="wards"
						id="wards"
						className={css}
						{...refInput}
					>
						<option value="">Select Wards...</option>
						{listCommune.map((item) => (
							<option
								key={item.idCoummune}
								value={item.idCoummune + " " + item.name}
							>
								{item.name}
							</option>
						))}
					</select>
					<label htmlFor="wards" className="form__label">
						Wards
					</label>
				</div>

				{isError["wards"]?.message && (
					<span className="form__error-msg">
						{isError["wards"]?.message}
					</span>
				)}
			</Fragment>
		);
	}

	return <Fragment>{contentCommune}</Fragment>;
}

WardSelect.propTypes = {
	idDistrict: PropTypes.string,
	refInput: PropTypes.any,
	isError: PropTypes.any,
};

export default WardSelect;
