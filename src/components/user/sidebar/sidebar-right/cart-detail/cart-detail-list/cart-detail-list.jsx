import PropTypes from "prop-types";
import React from "react";
import CartDetailItem from "../cart-detail-item/cart-detail-item";

function CartDetailList(props) {
	const { productInCart } = props;

	return (
		<div className="cart-detail__list-box">
			{productInCart.length > 0 ? (
				<ul className="cart-detail__list">
					{productInCart.map((product, index) => (
						<CartDetailItem
							detailProduct={product}
							productInCart={productInCart}
							key={index}
						/>
					))}
				</ul>
			) : (
				<div className="cart-detail__empty">
					<span className="cart-detail__empty-text">
						Nothing to show
					</span>
				</div>
			)}
		</div>
	);
}

CartDetailList.propTypes = {
	productInCart: PropTypes.array,
};

export default CartDetailList;
