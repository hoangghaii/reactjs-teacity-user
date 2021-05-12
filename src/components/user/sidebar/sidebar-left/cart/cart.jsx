import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

function Cart(props) {
	const { productInCart } = props;

	const [cartDotCss, setCartDotCss] = useState("cart__dot");

	useEffect(() => {
		setCartDotCss("cart__dot add-cart-animation");
	}, [productInCart]);

	return (
		<div className="cart" title="Your cart">
			<i className="fal fa-shopping-cart cart__icon" />
			{productInCart.length > 0 ? <span className={cartDotCss} /> : null}
		</div>
	);
}

Cart.propTypes = {
	productInCart: PropTypes.array,
};

export default Cart;
