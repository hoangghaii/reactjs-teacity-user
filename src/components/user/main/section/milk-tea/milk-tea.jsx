import PropTypes from "prop-types";
import React from "react";
import Carosel from "../common/carosel/carosel";
import Product from "./../common/product/product";

function MilkTea(props) {
	const { productList, productInCart } = props;

	const listMilkTea = productList.filter(
		(product) => product.popular === "Credit"
	);

	const bannerList = [
		"/assets/images/banner4.jpg",
		"/assets/images/banner5.jpg",
		"/assets/images/banner6.jpg",
	];

	return (
		<section>
			<Carosel bannerList={bannerList} />

			<h2 className="heading-2">Milk Tea</h2>

			<Product productList={listMilkTea} productInCart={productInCart} />
		</section>
	);
}

MilkTea.propTypes = {
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default MilkTea;
