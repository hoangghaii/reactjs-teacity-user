import React from "react";
import { Link } from "react-router-dom";

function Logo(props) {
	return (
		<Link to="/home" title="Home">
			<div className="logo-box" title="Logo">
				<img
					src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
					alt="Logo"
					className="logo"
				/>
			</div>
		</Link>
	);
}

Logo.propTypes = {};

export default Logo;
