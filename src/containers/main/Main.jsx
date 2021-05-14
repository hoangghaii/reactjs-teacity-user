import PropTypes from "prop-types";
import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import productApi from "../../apis/productApi";
import Loading from "../../components/loading/loading";
import PageNotFound from "../../components/pagenotfound/pagenotfound";
import Header from "../../components/header/header";

const Home = lazy(() => import("./section/home/Home"));
const Cookie = lazy(() => import("./section/cookie/cookie"));
const FruitTea = lazy(() => import("./section/fruit-tea/fruit-tea"));
const Location = lazy(() => import("./section/location/location"));
const MilkTea = lazy(() => import("./section/milk-tea/milk-tea"));

function Main(props) {
	const { productInCart } = props;

	const [dataRespond, setDataRespond] = useState({
		loading: true,
		data: null,
		status: undefined,
	});

	useEffect(() => {
		(async () => {
			const dataRes = await productApi.getAll();

			setDataRespond({
				loading: false,
				data: dataRes.data,
				status: dataRes.status,
			});
		})();
	}, []);

	let content = null;

	if (dataRespond.loading) {
		content = <Loading />;
	} else if (!dataRespond.status) {
		content = <Route component={PageNotFound} />;
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
						<Route path="home">
							<Home
								productList={productList}
								productInCart={productInCart}
							/>
						</Route>

						<Route path="/milk-tea">
							<MilkTea
								productList={productList}
								productInCart={productInCart}
							/>
						</Route>

						<Route path="/fruit-tea">
							<FruitTea
								productList={productList}
								productInCart={productInCart}
							/>
						</Route>

						<Route path="/cookie-blended">
							<Cookie
								productList={productList}
								productInCart={productInCart}
							/>
						</Route>

						<Route path="/location" component={Location} />

						<Route path="/">
							<Home
								productList={productList}
								productInCart={productInCart}
							/>
						</Route>

						<Redirect from="/" to="/home" />

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
