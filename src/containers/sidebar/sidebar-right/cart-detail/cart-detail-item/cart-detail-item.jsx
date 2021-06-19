import { useSpring } from "@react-spring/core";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import {
	removeFromCart,
	updateCart,
} from "../../../../../store/slices/productSlice";
import { formatCurrency } from "../../../../../common/common";

function CartDetailItem(props) {
	const { detailProduct, productInCart } = props;
	console.log(detailProduct);
	const dispatch = useDispatch();

	const existingProductIndex = productInCart.findIndex(
		(product) => product.id === detailProduct.id
	);

	const handlePlusQuantity = () => {
		const existingProduct = productInCart[existingProductIndex];

		const updateQuantityProduct = {
			...existingProduct,
			quantity: existingProduct.quantity + 1,
		};

		const actionUpdateCart = updateCart(updateQuantityProduct);

		dispatch(actionUpdateCart);
	};

	const handleMinusQuantity = () => {
		const existingProduct = productInCart[existingProductIndex];

		const updateQuantityProduct = {
			...existingProduct,
			quantity: existingProduct.quantity - 1,
		};

		const actionUpdateCart = updateCart(updateQuantityProduct);

		dispatch(actionUpdateCart);
	};

	const handleRemoveFromCart = () => {
		const actionRemoveFromCart = removeFromCart(detailProduct);

		dispatch(actionRemoveFromCart);
	};

	const [{ x }, api] = useSpring(() => ({ x: 0 }));
	const bind = useDrag(
		({ down, offset: [ox] }) => api.start({ x: ox, immediate: down }),
		{
			bounds: { left: -55, right: 0, top: 0, bottom: 0 },
		}
	);

	return (
		<div className="cart-detail__wrapper">
			<animated.li
				{...bind()}
				style={{ x }}
				className="cart-detail__item"
			>
				<div className="cart-detail__img-box">
					<img
						src={detailProduct.image}
						alt="Juice Fruit"
						className="cart-detail__img"
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className="cart-detail__content">
					<h5 className="heading-5">{detailProduct.name}</h5>
					<div className="cart-detail__data">
						<span className="cart-detail__size">
							{detailProduct.size}
						</span>
						<span className="cart-detail__quantity-box">
							<span className="cart-detail__small-bold"> x </span>
							<span className="cart-detail__quantity">
								{detailProduct.quantity}
							</span>
						</span>
					</div>
				</div>
				<div className="cart-detail__total-box">
					<div className="cart-detail__total">
						<span className="cart-detail__total">
							{formatCurrency(detailProduct.price)}
						</span>
					</div>
					<div className="quantity">
						{detailProduct.quantity > 1 ? (
							<span
								className="btn-minus"
								title="Minus"
								onClick={handleMinusQuantity}
							></span>
						) : (
							<span
								className="btn-remove"
								title="Remove From Cart"
								onClick={handleRemoveFromCart}
							>
								<i className="fal fa-trash btn-remove__icon"></i>
							</span>
						)}

						<span
							className="btn-plus"
							title="Plus"
							onClick={handlePlusQuantity}
						></span>
					</div>
				</div>
			</animated.li>

			<div
				className="cart-detail__delete"
				title="Delete All"
				onClick={handleRemoveFromCart}
			>
				<i className="fal fa-trash btn-delete__icon"></i>
			</div>
		</div>
	);
}

CartDetailItem.propTypes = {
	detailProduct: PropTypes.object,
};

export default CartDetailItem;
