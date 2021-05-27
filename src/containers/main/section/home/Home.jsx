import PropTypes from "prop-types";
import React from "react";
import Banner1 from "../../../../assets/images/banner1.jpg";
import Banner2 from "../../../../assets/images/banner2.jpg";
import Banner3 from "../../../../assets/images/banner11.jpg";
import Carosel from "../common/carosel/carosel";
import HomeContent from "./content/home-content";

function Home(props) {
	const { productList, productInCart } = props;

	const bannerList = [Banner1, Banner2, Banner3, Banner3];

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
