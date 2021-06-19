import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../../common/addToCart";
import { formatCurrency } from "../../../../../../common/common";

function ProductItem(props) {
	const { detailProduct, productInCart } = props;

	const dispatch = useDispatch();

	const sizeList = detailProduct.size
		.slice(0, -1)
		.split(",")
		.sort()
		.reverse();

	let sizeProduct = sizeList[0];

	const handleChooseSize = (size) => {
		sizeProduct = size;
	};

	const handleAddCart = () => {
		const product = { ...detailProduct, size: sizeProduct };
		addToCart(dispatch, productInCart, product);
	};

	return (
		<div className="product__item product__card">
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
						Price: <b>{formatCurrency(detailProduct.price)}</b>
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
										defaultChecked={size === sizeProduct}
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
		</div>
	);
}

ProductItem.propTypes = {
	detailProduct: PropTypes.object,
	productList: PropTypes.array,
};

export default ProductItem;
