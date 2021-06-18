import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStateSidebarLeft } from "../../../store/slices/sidebarSlice";
import Cart from "./cart/cart";
import FullScreen from "./full-screen/full-screen";
import Logo from "./logo/logo";
import Navigation from "./navigation/navigation";

function SidebarLeft(props) {
	const { productInCart } = props;

	const dispatch = useDispatch();

	const sidebar = useSelector((state) => state.sidebar);
	const sidebarLeftStatus = sidebar.sidebarLeftStatus;

	const onCloseSideBarLeft = () => {
		const action = changeStateSidebarLeft(false);
		dispatch(action);
	};

	return (
		<div
			className={`sidebar-left ${sidebarLeftStatus ? "active" : null}`}
			onClick={onCloseSideBarLeft}
		>
			<Logo />

			<Navigation />

			<FullScreen />

			<Cart productInCart={productInCart} />
		</div>
	);
}

SidebarLeft.propTypes = {
	productInCart: PropTypes.array,
};

export default SidebarLeft;
