import PropTypes from "prop-types";
import React from "react";
import FullScreen from "../full-screen/full-screen";
import Cart from "./cart/cart";
import Logo from "./logo/logo";
import Navigation from "./navigation/navigation";

function SidebarLeft(props) {
	const { productInCart } = props;

	return (
		<div className="sidebar-left">
			<Logo />

			<Navigation />

			<FullScreen />

			<Cart productInCart={productInCart} />
		</div>
	);
}

SidebarLeft.propTypes = {
	productInCart: PropTypes.array,
};

export default SidebarLeft;
