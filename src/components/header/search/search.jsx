import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../common/addToCart";
import { formatCurrency } from "../../../common/common";

function Search(props) {
	const { productList, productInCart } = props;

	const dispatch = useDispatch();

	const [keywork, setKeywork] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	const getSearchList = (dataList, searchText) => {
		const dataKeys = dataList[0] && Object.keys(dataList[0]);

		return dataList.filter((item) =>
			dataKeys.some(
				(dataKey) =>
					item[dataKey]
						.toString()
						.toLowerCase()
						.indexOf(searchText.toLowerCase()) > -1
			)
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		setSearchResult(getSearchList(productList, keywork));
	};

	const handleAddCart = (product) => {
		addToCart(dispatch, productInCart, product);
	};

	return (
		<div className="search">
			<form className="search__form" onChange={handleSubmit}>
				<input
					type="text"
					className="search__input"
					placeholder="Search"
					onChange={(event) => {
						setKeywork(event.target.value);
					}}
					value={keywork}
				/>
				<button type="button" className="search__btn">
					<i className="fal fa-search" />
				</button>
			</form>

			{keywork !== "" && searchResult.length > 0 && (
				<div className="search__result">
					{searchResult.map((product, index) => (
						<div key={index} className="search__result--item">
							<div className="search__result--img">
								<img src={product.image} alt="product" />
							</div>
							<div className="search__result--product-detail">
								<span className="search__result--product-name">
									{product.name}
								</span>
								<span className="search__result--product-price">
									{formatCurrency(product.price)}
								</span>
							</div>

							<span
								className="search__add"
								onClick={() => handleAddCart(product)}
							>
								<i className="far fa-cart-plus icon-add" />
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

Search.propTypes = {
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default Search;
