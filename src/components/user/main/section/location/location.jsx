import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
function Location(props) {
	return (
		<section className="map">
			<div className="map-container">
				<MapContainer
					center={[12.248261583701103, 109.18129209691917]}
					zoom={13}
					scrollWheelZoom={false}
					style={{ height: "100vh", width: "100wh" }}
				>
					<TileLayer
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={[12.248261583701103, 109.18129209691917]}>
						<Popup>
							324/10/4 Lê Hông Phong. <br /> Milk Tea Place.
						</Popup>
					</Marker>
				</MapContainer>
			</div>
		</section>
	);
}

Location.propTypes = {};

export default Location;
