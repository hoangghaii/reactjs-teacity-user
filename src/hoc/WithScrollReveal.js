import React, { useEffect, useRef } from "react";
import ScrollReveal from "scrollreveal";
import PropTypes from "prop-types";

function WithScrollReveal(props) {
	const { children, className } = props;

	const sectionRef = useRef(null);

	const options = {
		origin: "top",
		distance: "30px",
		duration: 1000,
		reset: true,
	};

	const interval = {
		interval: 200,
	};

	useEffect(() => {
		if (sectionRef.current)
			ScrollReveal().reveal(sectionRef.current, options, interval);
		return () => ScrollReveal().destroy();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={className} ref={sectionRef}>
			{children}
		</div>
	);
}

WithScrollReveal.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
};

export default WithScrollReveal;
