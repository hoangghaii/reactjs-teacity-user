import React from "react";
import PropTypes from "prop-types";
import User from "./user/user";
import Buy2get1 from "./buy2get1/buy2get1";
import CartDetail from "./cart-detail/cart-detail";

function SidebarRight(props) {
	const { productInCart } = props;

	return (
		<div className="sidebar-right">
			<User />

			<Buy2get1 />

			<CartDetail productInCart={productInCart} />
		</div>
	);
}

SidebarRight.propTypes = {
	productInCart: PropTypes.array,
};

export default SidebarRight;
