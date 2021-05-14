import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../../common/common";
import CartDetailList from "./cart-detail-list/cart-detail-list";

function CartDetail(props) {
	const { productInCart } = props;

	let total = 0;

	const getTotal = () => {
		productInCart.forEach((product) => {
			total += product.price * product.quantity;
		});
	};

	if (productInCart.length > 0) getTotal();

	return (
		<div className="cart-detail">
			<div className="cart-detail__title">
				<h4 className="heading-4">Order Detail</h4>
			</div>

			<CartDetailList productInCart={productInCart} />

			{productInCart.length > 0 && (
				<div className="cart__total">
					<div className="cart-total">
						<h5 className="heading-5 cart-total__title">Total: </h5>{" "}
						<span className="cart-total__price">
							{formatCurrency(total)}
						</span>
					</div>

					<Link
						to="/checkout"
						className="btn btn-cta"
						title="Checkout"
					>
						Checkout
					</Link>
				</div>
			)}
		</div>
	);
}

CartDetail.propTypes = {
	productInCart: PropTypes.array,
};

export default CartDetail;
