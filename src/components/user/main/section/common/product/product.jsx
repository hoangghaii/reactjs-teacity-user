import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Pagination from "../pagination/pagination";
import ProductItems from "./product-item/product-item";

function Product(props) {
	const { productList, productInCart } = props;

	const [allRecord, setAllRecord] = useState([]);
	useEffect(() => {
		setAllRecord(productList);
	}, [productList]);

	const [currentRecord, setCurrentRecord] = useState([]);

	const onPageChanged = (data) => {
		const { currentPage, pageLimit } = data;

		const offset = (currentPage - 1) * pageLimit;
		const currentRecord = allRecord.slice(offset, offset + pageLimit);

		setCurrentRecord(currentRecord);
	};

	const totalRecords = allRecord.length;

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

			{totalRecords === 0 ? null : (
				<Pagination
					totalRecords={totalRecords}
					pageLimit={6}
					pageNeighbours={1}
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
