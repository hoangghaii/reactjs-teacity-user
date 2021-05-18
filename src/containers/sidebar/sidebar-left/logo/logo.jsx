import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";

function Logo(props) {
	return (
		<Link to="/" title="Home">
			<div className="logo-box" title="Logo">
				<img src={logo} alt="Logo" className="logo" />
			</div>
		</Link>
	);
}

Logo.propTypes = {};

export default Logo;
