import PropTypes from "prop-types";
import React from "react";
import Search from "./search/search";

function Header(props) {
	const { productList, productInCart } = props;

	return (
		<header className="header">
			<h1 className="heading-1">Tea City</h1>
			<Search productList={productList} productInCart={productInCart} />
		</header>
	);
}

Header.propTypes = {
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default Header;
