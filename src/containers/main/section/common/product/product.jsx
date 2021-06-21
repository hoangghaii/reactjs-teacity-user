import PropTypes from "prop-types";
import React from "react";
import Pagination from "../pagination/pagination";
import usePagination from "./../../../../../hook/usePagination";
import ProductItems from "./product-item/product-item";

function Product(props) {
	const { productList, productInCart } = props;

	const { currentRecord, onPageChanged } = usePagination();

	return (
		<div className="product">
			<div className="product__list">
				{currentRecord.map((item, index) => (
					<ProductItems
						detailProduct={item}
						productInCart={productInCart}
						key={index}
					/>
				))}
			</div>

			{!productList ? null : (
				<Pagination
					allRecords={productList}
					totalRecords={productList.length}
					pageNeighbours={1}
					pageLimit={9}
					onPageChanged={onPageChanged}
				/>
			)}
		</div>
	);
}

Product.propTypes = {
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default Product;
