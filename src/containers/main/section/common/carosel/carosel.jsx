import PropTypes from "prop-types";
import React from "react";

function Carosel({ bannerList }) {
	return (
		<div className="carosel__container">
			{bannerList.map((item, index) => (
				<div className="carosel__box" key={index}>
					<div className="carosel__img-box">
						<img
							src={item}
							alt="carosel"
							className="carosel__img"
						/>
					</div>
				</div>
			))}
		</div>
	);
}

Carosel.propTypes = {
	bannerList: PropTypes.array,
};

export default Carosel;

//16:13
