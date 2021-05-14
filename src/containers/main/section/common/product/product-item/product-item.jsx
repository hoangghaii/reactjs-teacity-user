import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../../common/addToCart";
import { formatCurrency } from "../../../../../../common/common";

function ProductItem(props) {
	const { detailProduct, productInCart } = props;

	const dispatch = useDispatch();

	let sizeProduct = "S";

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
						style={{ objectFit: "contain" }}
					/>
				</div>
				<span className="product__card--heading">
					{detailProduct.name}
				</span>
			</div>
			<div className="product__card--back">
				<span className="product__heading"> {detailProduct.name} </span>
				<p className="product__desc">{detailProduct.desc}</p>
				<div className="product__detail">
					<span className="product__price">
						Price: <b>{formatCurrency(detailProduct.price)}</b>
					</span>

					<div className="product__cta">
						<div className="product__size">
							<label
								htmlFor={detailProduct.id + "sizeS"}
								className="product__size-item"
								onClick={() => {
									handleChooseSize("S");
								}}
							>
								<input
									type="radio"
									id={detailProduct.id + "sizeS"}
									name={detailProduct.id + "size"}
									defaultValue="S"
									defaultChecked
								/>
								<span>S</span>
							</label>

							<label
								htmlFor={detailProduct.id + "sizeM"}
								className="product__size-item"
								onClick={() => {
									handleChooseSize("M");
								}}
							>
								<input
									type="radio"
									id={detailProduct.id + "sizeM"}
									name={detailProduct.id + "size"}
									defaultValue="M"
								/>
								<span>M</span>
							</label>

							<label
								htmlFor={detailProduct.id + "sizeL"}
								className="product__size-item"
								onClick={() => {
									handleChooseSize("L");
								}}
							>
								<input
									type="radio"
									id={detailProduct.id + "sizeL"}
									name={detailProduct.id + "size"}
									defaultValue="L"
								/>
								<span>L</span>
							</label>
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
