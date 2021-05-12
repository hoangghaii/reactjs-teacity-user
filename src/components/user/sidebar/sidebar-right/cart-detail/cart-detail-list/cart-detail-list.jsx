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
					<h5 className="cart-detail__empty-title">
						Có vẻ bạn chưa tìm được đồ uống mình muốn
					</h5>
					<span className="cart-detail__empty-text">
						Đừng lo, còn rất nhiều loại đồ uống đang chờ bạn khám
						phá 💪💪💪
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
