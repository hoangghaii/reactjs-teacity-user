import PropTypes from "prop-types";
import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import productApi from "../../apis/productApi";
import Header from "../../components/header/header";
import Loading from "../../components/loading/loading";
import routes from "../../routes";
import categoryApi from "./../../apis/categoryApi";
import ProductLayout from "./section/product-layout/ProductLayout";

const PageNotFound = lazy(() =>
	import("../../components/pagenotfound/pagenotfound")
);

function Main(props) {
	const { productInCart } = props;

	const [dataRespond, setDataRespond] = useState({
		loading: true,
		data: null,
		status: undefined,
	});

	const [categories, setCategories] = useState({
		loading: true,
		data: null,
		status: undefined,
	});

	const getAllCategories = async () => {
		return await categoryApi
			.getAll()
			.then((res) => {
				setCategories({
					loading: false,
					data: res.data.data,
					status: res.status,
				});
			})
			.catch((err) => console.log(err));
	};

	const getProductList = async () => {
		return await productApi
			.getAll()
			.then((dataRes) => {
				setDataRespond({
					loading: false,
					data: dataRes.data,
					status: dataRes.status,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getAllCategories();
		getProductList();
	}, []);

	let content = null;

	if (dataRespond.loading) {
		content = <Loading />;
	} else if (dataRespond.status !== 200) {
		content = <p className="fetch-status">An error has occurred!</p>;
	} else if (dataRespond.data) {
		const productList = dataRespond.data;

		content = (
			<main className="main">
				<Header
					productList={productList}
					productInCart={productInCart}
				/>

				<Suspense fallback={<Loading />}>
					<Switch>
						{routes.map((route, index) => {
							return (
								route.component && (
									<Route
										exact={true}
										path={route.path}
										key={index}
									>
										<route.component
											productList={productList}
											productInCart={productInCart}
										/>
									</Route>
								)
							);
						})}

						{categories.data &&
							categories.data.map((category, index) => {
								return (
									<Route
										key={index}
										exact={true}
										path={`/${category.name
											.toLowerCase()
											.split(" ")
											.join("-")}`}
									>
										<ProductLayout
											categoriesList={categories.data}
											productList={productList}
											productInCart={productInCart}
										/>
									</Route>
								);
							})}

						<Route component={PageNotFound} />
					</Switch>
				</Suspense>
			</main>
		);
	}

	return <Fragment>{content}</Fragment>;
}

Main.propTypes = {
	productInCart: PropTypes.array,
};

export default Main;
