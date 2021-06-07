import PropTypes from "prop-types";
import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import productApi from "../../apis/productApi";
import Header from "../../components/header/header";
import Loading from "../../components/loading/loading";
import routes from "../../routes";

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

	const getProductList = async () => {
		return await productApi
			.getAll()
			.then((dataRes) =>
				setDataRespond({
					loading: false,
					data: dataRes.data,
					status: dataRes.status,
				})
			)
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getProductList();
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
						{routes.map((route, index) => {
							return (
								route.component && (
									<Route
										path={route.path}
										key={index}
										name={route.name}
									>
										<route.component
											productList={productList}
											productInCart={productInCart}
										/>
									</Route>
								)
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
