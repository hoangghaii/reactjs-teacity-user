import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import categoryApi from "./../../../../apis/categoryApi";

function Navigation(props) {
	const [dataRes, setDataRes] = useState({
		loading: true,
		data: null,
		status: null,
	});

	const getAllCategories = async () => {
		return await categoryApi
			.getAll()
			.then((res) => {
				setDataRes({
					loading: false,
					data: res.data.data,
					status: res.status,
				});
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getAllCategories();
	}, []);

	let categoriesLink = null;
	if (dataRes.loading) {
		categoriesLink = null;
	} else if (dataRes.status !== 200) {
		categoriesLink = null;
	} else if (dataRes.data) {
		const categories = dataRes.data;

		categoriesLink = categories.map((category) => (
			<div key={category.id} className="tooltip">
				<NavLink
					exact={true}
					to={`/${category.name.toLowerCase().split(" ").join("-")}`}
					activeClassName="active"
					className="navigation__item"
					title={category.name}
				>
					<i className={`fal ${category.icon}`} />
				</NavLink>
			</div>
		));
	}

	return (
		<nav className="navigation">
			<ul className="navigation__list">
				<div className="tooltip">
					<NavLink
						exact={true}
						to="/"
						activeClassName="active"
						className="navigation__item"
						title="Home"
					>
						<i className="fal fa-home"></i>
					</NavLink>
				</div>

				{categoriesLink}

				<div className="tooltip">
					<NavLink
						exact={true}
						to="/location"
						activeClassName="active"
						className="navigation__item"
						title="Location"
					>
						<i className="fal fa-map-marker-alt" />
					</NavLink>
				</div>
			</ul>
		</nav>
	);
}

Navigation.propTypes = {};

export default Navigation;
