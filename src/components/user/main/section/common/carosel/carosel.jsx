import clamp from "lodash.clamp";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { animated, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import useMeasure from "react-use-measure";

function Carosel({ bannerList }) {
	const index = useRef(0);

	const [ref, { width }] = useMeasure();

	const [props, api] = useSprings(bannerList.length, (i) => ({
		x: i * width,
		scale: 1,
		display: "block",
	}));

	const bind = useDrag(
		({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
			if (active && distance > width / 2) {
				index.current = clamp(
					index.current + (xDir > 0 ? -1 : 1),
					0,
					bannerList.length - 1
				);
				cancel();
			}
			api.start((i) => {
				if (i < index.current - 1 || i > index.current + 1)
					return { display: "none" };
				const x = (i - index.current) * width + (active ? mx : 0);
				const scale = active ? 1 - distance / width / 2 : 1;
				return { x, scale, display: "block" };
			});
		}
	);

	return (
		<div ref={ref} className="carosel">
			{props.map(({ x, display, scale }, i) => (
				<animated.div
					className="carosel__img-box"
					{...bind()}
					key={i}
					style={{ display, x }}
				>
					<animated.div
						className="carosel__img"
						style={{
							scale,
							backgroundImage: `url(${process.env.PUBLIC_URL} ${bannerList[i]})`,
						}}
					/>
				</animated.div>
			))}
		</div>
	);
}

Carosel.propTypes = {
	bannerList: PropTypes.array,
};

export default Carosel;
