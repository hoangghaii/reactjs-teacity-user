import React from "react";
import { Route } from "react-router";

function MainRoute({ component: Component, ...rest }) {
	return (
		<Route
			exact={true}
			{...rest}
			render={(matchProps) => <Component {...matchProps} />}
		/>
	);
}

MainRoute.propTypes = {};

export default MainRoute;
