import React from "react";
import { Route } from "react-router";
import { toast } from "react-toastify";
import StorageKey from "../../constants/storage-keys";

function PrivateRoute({ component: Component, ...rest }) {
	const userStorageToken =
		localStorage.getItem(StorageKey.USER_TOKEN) || null;

	const isLoggedIn = !!userStorageToken;

	return (
		<Route
			exact={true}
			{...rest}
			render={(props) =>
				isLoggedIn ? (
					<Component {...props} />
				) : (
					toast.error(
						<div className="toast-content">
							<p>
								<i className="fad fa-do-not-enter toast-icon toast-icon--error"></i>
								<span className="toast-text">
									Bạn cần đăng nhập để vào trang này
								</span>
							</p>
						</div>
					)
				)
			}
		/>
	);
}

PrivateRoute.propTypes = {};

export default PrivateRoute;
