import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStateSidebarRight } from "../../../store/slices/sidebarSlice";
import Buy2get1 from "./buy2get1/buy2get1";
import CartDetail from "./cart-detail/cart-detail";
import User from "./user/user";

function SidebarRight(props) {
	const { productInCart } = props;

	const dispatch = useDispatch();

	const sidebar = useSelector((state) => state.sidebar);
	const sidebarRightStatus = sidebar.sidebarRightStatus;

	const onCloseSideBarRight = () => {
		const action = changeStateSidebarRight(false);
		dispatch(action);
	};

	return (
		<div
			className={`sidebar-right ${sidebarRightStatus ? "active" : null}`}
			onClick={onCloseSideBarRight}
		>
			<User />

			<Buy2get1 />

			<CartDetail productInCart={productInCart} />
		</div>
	);
}

SidebarRight.propTypes = {
	productInCart: PropTypes.array,
};

export default SidebarRight;
