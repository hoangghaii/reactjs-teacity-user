import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../../../../common/addToCart";
import { formatCurrency } from "./../../../../../../../common/common";

function ProductItem(props) {
	const { detailProduct, productInCart } = props;
	const dispatch = useDispatch();

	const handleAddCart = () => {
		addToCart(dispatch, productInCart, detailProduct);
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
				<div className="product__cta">
					<span className="product__price">
						Price: <b>{formatCurrency(detailProduct.price)}</b>
					</span>
					<span className="btn-add" onClick={handleAddCart} />
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
