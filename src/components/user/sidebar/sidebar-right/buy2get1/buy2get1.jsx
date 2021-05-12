import React from "react";

function Buy2get1(props) {
	return (
		<div className="buy2get1-box">
			<img
				src={process.env.PUBLIC_URL + "/assets/images/buy2get1.png"}
				alt="Buy 2 Get 1"
				className="buy2get1"
			/>
		</div>
	);
}

Buy2get1.propTypes = {};

export default Buy2get1;
