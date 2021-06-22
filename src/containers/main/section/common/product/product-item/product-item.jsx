import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../../common/addToCart";
import { formatCurrency } from "../../../../../../common/common";
import WithScrollReveal from "./../../../../../../hoc/WithScrollReveal";

function ProductItem(props) {
	const { detailProduct, productInCart } = props;

	const dispatch = useDispatch();

	const sizeList = detailProduct.size
		.slice(0, -1)
		.split(",")
		.sort()
		.reverse();

	let productSize = sizeList[0];

	const [productPrice, setProductPrice] = useState(detailProduct.price);

	const handleChooseSize = (size) => {
		productSize = size;
		if (size === "S") setProductPrice(detailProduct.price);
		else if (size === "M")
			setProductPrice(
				Math.round(detailProduct.price + detailProduct.price * 0.25)
			);
		else if (size === "L")
			setProductPrice(
				Math.round(detailProduct.price + detailProduct.price * 0.5)
			);
	};

	const handleAddCart = () => {
		const product = {
			...detailProduct,
			size: productSize,
			price: productPrice,
		};
		addToCart(dispatch, productInCart, product);
	};

	return (
		<WithScrollReveal className="product__item product__card">
			<div className="product__card--front">
				<div className="product__img-box">
					<img
						src={detailProduct.image}
						alt="Product"
						className="product__img"
					/>
				</div>
				<span className="product__card--heading">
					{detailProduct.name}
				</span>
			</div>
			<div className="product__card--back">
				<span className="product__heading"> {detailProduct.name} </span>
				<p className="product__desc">{detailProduct.description}</p>
				<div className="product__detail">
					<span className="product__price">
						Price: <b>{formatCurrency(productPrice)}</b>
					</span>

					<div className="product__cta">
						<div className="product__size">
							{sizeList.map((size, index) => (
								<label
									key={index}
									htmlFor={detailProduct.id + size}
									className="product__size-item"
									onClick={() => {
										handleChooseSize(size);
									}}
								>
									<input
										type="radio"
										id={detailProduct.id + size}
										name={detailProduct.id + "size"}
										defaultValue={size}
										defaultChecked={size === productSize}
									/>
									<span>{size}</span>
								</label>
							))}
						</div>

						<span className="btn-add" onClick={handleAddCart}>
							<i className="far fa-cart-plus" />
						</span>
					</div>
				</div>
			</div>
		</WithScrollReveal>
	);
}

ProductItem.propTypes = {
	detailProduct: PropTypes.object,
	productList: PropTypes.array,
};

export default ProductItem;
