import PropTypes from "prop-types";
import React from "react";
import Carosel from "../common/carosel/carosel";
import Product from "./../common/product/product";

function FruitTea(props) {
	const { productList, productInCart } = props;

	const listFruitTea = productList.filter(
		(product) => product.popular === "Invoice"
	);

	const bannerList = [
		"/assets/images/banner7.jpg",
		"/assets/images/banner8.jpg",
		"/assets/images/banner9.jpg",
	];

	return (
		<section>
			<Carosel bannerList={bannerList} />

			<h2 className="heading-2">Fruit Tea</h2>

			<Product productList={listFruitTea} productInCart={productInCart} />
		</section>
	);
}

FruitTea.propTypes = {
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default FruitTea;
