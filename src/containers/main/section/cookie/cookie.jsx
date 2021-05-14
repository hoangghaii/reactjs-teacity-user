import PropTypes from "prop-types";
import React from "react";
import Carosel from "../common/carosel/carosel";
import Product from "./../common/product/product";
import Banner10 from "../../../../assets/images/banner10.jpg";
// import Banner10 from "../../../../assets/images/banner10.jpg";
// import Banner10 from "../../../../assets/images/banner10.jpg";

function Cookie(props) {
	const { productList, productInCart } = props;

	const listCookie = productList.filter(
		(product) => product.popular === "Debit"
	);

	const bannerList = [Banner10, Banner10, Banner10];

	return (
		<section>
			<Carosel bannerList={bannerList} />

			<h2 className="heading-2">Cookie Blended</h2>

			<Product productList={listCookie} productInCart={productInCart} />
		</section>
	);
}

Cookie.propTypes = {
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default Cookie;
