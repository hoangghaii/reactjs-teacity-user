import React from "react";
import { useSelector } from "react-redux";
import StorageKey from "../../constants/storage-keys";
import CheckoutLeft from "./checkout-left/checkout-left";
import CheckoutRight from "./checkout-right/checkout-right";

function Checkout(props) {
	const userInfo = JSON.parse(localStorage.getItem(StorageKey.USER));

	const productInCart = useSelector((state) => state.product);

	let total = 0;

	const getTotal = () => {
		productInCart.forEach((product) => {
			total += product.price * product.quantity;
		});
	};

	if (productInCart.length > 0) getTotal();

	return (
		<div className="checkout__container">
			<CheckoutLeft productInCart={productInCart} subTotal={total} />
			<CheckoutRight
				userInfo={userInfo}
				productInCart={productInCart}
				subTotal={total}
			/>
		</div>
	);
}

Checkout.propTypes = {};

export default Checkout;
