import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import addressApi from "../../../../../../apis/addressApi";

function ProvinceSelect(props) {
	const { selectProvince, refInput, isError } = props;

	let css = "form__select";

	if (isError["province"]?.message) css += " form__select--error";

	const [dataProvince, setDataProvince] = useState({
		loading: true,
		data: null,
		status: undefined,
	});

	useEffect(() => {
		(async () => {
			const dataRes = await addressApi.getProvince();

			setDataProvince({
				loading: false,
				data: dataRes.data,
				status: dataRes.status,
			});
		})();
	}, []);

	let contentProvince = null;

	if (dataProvince.loading) {
		contentProvince = (
			<Fragment>
				<div className="form__group">
					<select
						name="province"
						id="province"
						className="form__select"
					>
						<option value="">Select Province/City...</option>
					</select>

					<label htmlFor="province" className="form__label">
						Province/City
					</label>
				</div>
			</Fragment>
		);
	} else if (dataProvince.data) {
		const listProvince = dataProvince.data;

		const handleSelectProvince = (e) => {
			if (!selectProvince) return;
			selectProvince(e.target.value);
		};

		contentProvince = (
			<Fragment>
				<div className="form__group">
					<select
						name="province"
						id="province"
						className={css}
						{...refInput}
						onChange={handleSelectProvince}
					>
						<option value="">Select Province/City...</option>
						{listProvince.map((item) => (
							<option
								key={item.idProvince}
								value={item.idProvince + " " + item.name}
							>
								{item.name}
							</option>
						))}
					</select>
					<label htmlFor="province" className="form__label">
						Province/City
					</label>
				</div>

				{isError["province"]?.message && (
					<span className="form__error-msg">
						{isError["province"]?.message}
					</span>
				)}
			</Fragment>
		);
	}

	return <Fragment>{contentProvince}</Fragment>;
}

ProvinceSelect.propTypes = {
	selectProvince: PropTypes.func,
	refInput: PropTypes.any,
	isError: PropTypes.any,
};

export default ProvinceSelect;
