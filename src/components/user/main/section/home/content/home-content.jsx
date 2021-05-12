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

	const listBestSeller = productList.filter(
		(product) => product.type === "Delivered"
	);

	const listMustTry = productList.filter(
		(product) => product.type === "Shipped"
	);

	const listNew = productList.filter(
		(product) => product.type === "At Warehouse"
	);

	return (
		<Tabs>
			<div className="section-home__content">
				<h2 className="heading-2">All Items</h2>
				<TabList className="section-home__category">
					<Tab
						className="section-home__category--item"
						selectedClassName="active"
					>
						Best Seller
					</Tab>
					<Tab
						className="section-home__category--item"
						selectedClassName="active"
					>
						New
					</Tab>
					<Tab
						className="section-home__category--item"
						selectedClassName="active"
					>
						Must try
					</Tab>
				</TabList>

				<TabPanel>{RenderProductList(listBestSeller)}</TabPanel>
				<TabPanel>{RenderProductList(listMustTry)}</TabPanel>
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
