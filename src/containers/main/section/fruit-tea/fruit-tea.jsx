import PropTypes from "prop-types";
import React from "react";
import Banner7 from "../../../../assets/images/banner7.jpg";
import Banner8 from "../../../../assets/images/banner8.jpg";
import Banner9 from "../../../../assets/images/banner9.jpg";
import Carosel from "../common/carosel/carosel";
import Product from "./../common/product/product";

function FruitTea(props) {
	const { productList, productInCart } = props;

	const listFruitTea = productList.filter(
		(product) => product.popular === "Invoice"
	);

	const bannerList = [Banner7, Banner8, Banner9, Banner9];

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
