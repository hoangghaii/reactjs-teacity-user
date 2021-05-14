import React from "react";
import { NavLink } from "react-router-dom";

function Navigation(props) {
	return (
		<nav className="navigation">
			<ul className="navigation__list">
				<div className="tooltip">
					<NavLink
						exact
						to="/home"
						activeClassName="active"
						className="navigation__item"
						title="Home"
					>
						<i className="fal fa-home"></i>
					</NavLink>
					<span className="tooltip__text tooltip--right">Home</span>
				</div>

				<div className="tooltip">
					<NavLink
						exact
						to="/milk-tea"
						activeClassName="active"
						className="navigation__item"
						title="Milk Tea"
					>
						<i className="fal fa-mug-tea" />
					</NavLink>
					<span className="tooltip__text tooltip--right">
						Milk Tea
					</span>
				</div>

				<div className="tooltip">
					<NavLink
						exact
						to="/fruit-tea"
						activeClassName="active"
						className="navigation__item "
						title="Fruit Tea"
					>
						<i className="fal fa-apple-alt" />
					</NavLink>
					<span className="tooltip__text tooltip--right">
						Fruit Tea
					</span>
				</div>

				<div className="tooltip">
					<NavLink
						exact
						to="/cookie-blended"
						activeClassName="active"
						className="navigation__item"
						title="Cookie Blended"
					>
						<i className="fal fa-cookie-bite" />
					</NavLink>
					<span className="tooltip__text tooltip--right">
						Cookie Blended
					</span>
				</div>

				<div className="tooltip">
					<NavLink
						exact
						to="/location"
						activeClassName="active"
						className="navigation__item"
						title="Location"
					>
						<i className="fal fa-map-marker-alt" />
					</NavLink>
					<span className="tooltip__text tooltip--right">
						Location
					</span>
				</div>
			</ul>
		</nav>
	);
}

Navigation.propTypes = {};

export default Navigation;
