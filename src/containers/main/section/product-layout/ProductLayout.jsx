import React from "react";
import PropTypes from "prop-types";
import Carosel from "./../common/carosel/carosel";
import Product from "./../common/product/product";
import { useLocation } from "react-router-dom";

function ProductLayout(props) {
	const { categoriesList, productList, productInCart } = props;

	const location = useLocation().pathname.slice(1);

	const currentCategory = categoriesList.filter(
		(category) =>
			category.name.toLowerCase().split(" ").join("-") === location
	);

	const listProduct = productList.filter(
		(product) => product.category_id === currentCategory[0].id
	);

	const banners = [];

	listProduct.map((product) => banners.push(product.image));

	const bannerRandom =
		process.env.PUBLIC_URL +
		`/assets/images/banner${Math.floor(Math.random() * 12) + 1}.jpg`;

	const bannerList =
		banners.length < 4 ? [...banners, bannerRandom] : banners.slice(0, 4);

	return (
		<section>
			<Carosel bannerList={bannerList} />

			<h2 className="heading-2">{currentCategory[0].name}</h2>

			<Product productList={listProduct} productInCart={productInCart} />
		</section>
	);
}

ProductLayout.propTypes = {
	categoriesList: PropTypes.array,
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default ProductLayout;
