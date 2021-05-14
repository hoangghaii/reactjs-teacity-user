import React, { useState } from "react";

function FullScreen(props) {
	const [iconFullScreen, setIconFullScreen] = useState("fal fa-expand-wide");
	const [classFullScreen, setClassFullScreen] = useState("full-screen");

	const handleToogleFullScreen = () => {
		const bodyEle = document.documentElement;

		if (document.fullscreenElement) {
			document.exitFullscreen();
			setIconFullScreen("fal fa-expand-wide");
			setClassFullScreen("full-screen");
		} else {
			bodyEle.requestFullscreen();
			setIconFullScreen("fal fa-compress-wide");
			setClassFullScreen("full-screen active");
		}
	};

	return (
		<div
			className={classFullScreen}
			onClick={handleToogleFullScreen}
			title="Full Screen"
		>
			<i className={iconFullScreen} />
		</div>
	);
}

FullScreen.propTypes = {};

export default FullScreen;
