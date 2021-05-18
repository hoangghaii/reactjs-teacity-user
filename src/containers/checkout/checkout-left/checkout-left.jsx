import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import CheckoutBanner from "../../../assets/images/banner7.jpg";
import { formatCurrency } from "../../../common/common";
import CartDetailItem from "./../../sidebar/sidebar-right/cart-detail/cart-detail-item/cart-detail-item";

function CheckoutLeft(props) {
	const { productInCart, subTotal } = props;

	return (
		<div className="checkout__container--left">
			<Link to="/" title="Home">
				<div className="logo-box checkout-logo" title="Logo">
					<img src={Logo} alt="Logo" className="logo " />
				</div>
			</Link>

			<div className="checkout__conntent">
				<div className="checkout__heading-1">
					<h3 className="heading-3" style={{ fontSize: "1.8rem" }}>
						Your Cart
					</h3>
					<span className="checkout__total">
						{formatCurrency(subTotal)} +
					</span>
				</div>

				<div className="checkout__banner-box">
					<img
						src={CheckoutBanner}
						className="checkout__banner"
						alt="checkout__banner"
					/>
				</div>

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
					) : null}
				</div>
			</div>
		</div>
	);
}

CheckoutLeft.propTypes = {
	productInCart: PropTypes.array,
	subTotal: PropTypes.number,
};

export default CheckoutLeft;
