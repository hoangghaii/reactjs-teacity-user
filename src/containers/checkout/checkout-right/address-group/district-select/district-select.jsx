import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import addressApi from "../../../../../../apis/addressApi";

function DistrictSelect(props) {
	const { idProvince, selectDistrict, refInput, isError } = props;

	let css = "form__select";

	if (isError["district"]?.message) css += " form__select--error";

	const [dataDistrict, setDataDistrict] = useState({
		loading: true,
		data: null,
		status: undefined,
	});

	useEffect(() => {
		(async () => {
			const dataRes = await addressApi.getDistrict(idProvince);

			setDataDistrict({
				loading: false,
				data: dataRes.data,
				status: dataRes.status,
			});
		})();
	}, [idProvince]);

	let contentDistrict = null;

	if (dataDistrict.loading) {
		contentDistrict = (
			<Fragment>
				<div className="form__group">
					<select
						name="district"
						id="district"
						className="form__select"
					>
						<option value="">Select District...</option>
					</select>

					<label htmlFor="district" className="form__label">
						District
					</label>
				</div>
			</Fragment>
		);
	} else if (dataDistrict.data) {
		const listDistrict = dataDistrict.data;

		const handleSelectDistrict = (e) => {
			if (!selectDistrict) return;
			selectDistrict(e.target.value);
		};

		contentDistrict = (
			<Fragment>
				<div className="form__group">
					<select
						name="district"
						id="district"
						className={css}
						{...refInput}
						onChange={handleSelectDistrict}
					>
						<option value="">Select District...</option>
						{listDistrict.map((item) => (
							<option
								key={item.idDistrict}
								value={item.idDistrict + " " + item.name}
							>
								{item.name}
							</option>
						))}
					</select>
					<label htmlFor="district" className="form__label">
						District
					</label>
				</div>

				{isError["district"]?.message && (
					<span className="form__error-msg">
						{isError["district"]?.message}
					</span>
				)}
			</Fragment>
		);
	}

	return <Fragment>{contentDistrict}</Fragment>;
}

DistrictSelect.propTypes = {
	idProvince: PropTypes.string,
	selectDistrict: PropTypes.func,
	refInput: PropTypes.any,
	isError: PropTypes.any,
};

export default DistrictSelect;
