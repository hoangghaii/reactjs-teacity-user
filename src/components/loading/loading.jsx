import React from "react";

function Loading(props) {
	return (
		<div className="preloader-body">
			<div className="preloader">
				<span className="whirly-loader">Loading&#8230</span>
			</div>
		</div>
	);
}

Loading.propTypes = {};

export default Loading;
