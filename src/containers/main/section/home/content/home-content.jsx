import PropTypes from "prop-types";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Product from "./../../common/product/product";

function HomeContent(props) {
	const { productList, productInCart } = props;

	const RenderProductList = (productList) => {
		return (
			<Product productList={productList} productInCart={productInCart} />
		);
	};

	const getRandom = () => {
		return Math.floor(Math.random() * productList.length);
	};

	const randomArray = [
		getRandom(),
		getRandom(),
		getRandom(),
		getRandom(),
		getRandom(),
		getRandom(),
		getRandom(),
		getRandom(),
	];

	const listWannaTry = [];

	randomArray.map((randomNumber) =>
		listWannaTry.push(productList[randomNumber])
	);

	const listNew = productList
		.sort((a, b) => {
			return new Date(b.updated_at) - new Date(a.updated_at);
		})
		.slice(0, 8);

	return (
		<Tabs>
			<div className="section-home__content">
				<h2 className="heading-2">All Items</h2>
				<TabList className="section-home__category">
					<Tab
						className="section-home__category--item"
						selectedClassName="active"
					>
						Wanna Try
					</Tab>
					<Tab
						className="section-home__category--item"
						selectedClassName="active"
					>
						New
					</Tab>
				</TabList>

				<TabPanel>{RenderProductList(listWannaTry)}</TabPanel>
				<TabPanel>{RenderProductList(listNew)}</TabPanel>
			</div>
		</Tabs>
	);
}

HomeContent.propTypes = {
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default HomeContent;
