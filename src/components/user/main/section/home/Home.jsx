import PropTypes from "prop-types";
import React from "react";
import Carosel from "../common/carosel/carosel";
import HomeContent from "./content/home-content";

function Home(props) {
	const { productList, productInCart } = props;

	const bannerList = [
		"/assets/images/banner1.jpg",
		"/assets/images/banner2.jpg",
		"/assets/images/banner3.jpg",
	];

	return (
		<section className="section-home">
			<Carosel bannerList={bannerList} />

			<HomeContent
				productList={productList}
				productInCart={productInCart}
			/>
		</section>
	);
}

Home.propTypes = {
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default Home;
