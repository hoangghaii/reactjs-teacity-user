import React from "react";
import { useSelector } from "react-redux";
import Main from "./main/Main";
import SidebarLeft from "./sidebar/sidebar-left/sidebar-left";
import SidebarRight from "./sidebar/sidebar-right/sidebar-right";

function Dashboard(props) {
	const productInCart = useSelector((state) => state.product);

	return (
		<div className="container">
			<SidebarLeft productInCart={productInCart} />

			<Main productInCart={productInCart} />

			<SidebarRight productInCart={productInCart} />
		</div>
	);
}

Dashboard.propTypes = {};

export default Dashboard;
