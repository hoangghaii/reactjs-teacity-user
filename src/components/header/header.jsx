import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	changeStateSidebarLeft,
	changeStateSidebarRight,
} from "../../store/slices/sidebarSlice";
import Search from "./search/search";

function Header(props) {
	const { productList, productInCart } = props;

	const dispatch = useDispatch();

	const [headerScroll, setHeaderScroll] = useState(false);

	const listenScrollPage = () => {
		if (window.scollY < 50) setHeaderScroll(false);
		else if (window.scrollY > 50) setHeaderScroll(true);
	};

	useEffect(() => {
		window.addEventListener("scroll", listenScrollPage);

		return () => window.removeEventListener("scroll", listenScrollPage);
	}, []);

	const onOpenSideBarLeft = () => {
		const action = changeStateSidebarLeft(true);
		dispatch(action);
	};

	const onOpenSideBarRight = () => {
		const action = changeStateSidebarRight(true);
		dispatch(action);
	};

	return (
		<header className={`header ${headerScroll ? "scroll" : null}`}>
			<div className="sidebar-mobile" onClick={onOpenSideBarLeft}>
				<i className="fal fa-bars" />
			</div>

			<h1 className="heading-1">Tea City</h1>
			<Search productList={productList} productInCart={productInCart} />

			<div className="sidebar-mobile" onClick={onOpenSideBarRight}>
				<i className="fal fa-ellipsis-h" />
			</div>
		</header>
	);
}

Header.propTypes = {
	productList: PropTypes.array,
	productInCart: PropTypes.array,
};

export default Header;
