import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { toast } from "react-toastify";
import UserAvatar from "../../../../assets/images/woman.png";
import StorageKey from "../../../../constants/storage-keys";

function User(props) {
	const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

	const [userData, setUserData] = useState(
		JSON.parse(localStorage.getItem(StorageKey.USER)) || null
	);

	const onLoginSuccess = (response) => {
		console.log(response);
		const { accessToken, email, userID, name, picture } = response;

		setUserData({ email, userID, name, picture });

		localStorage.setItem(StorageKey.USER_TOKEN, accessToken);
		localStorage.setItem(
			StorageKey.USER,
			JSON.stringify({ email, userID, name, picture })
		);
	};

	const onLoginFailure = (response) => {
		console.log(response);

		toast.error(
			<div className="toast-content">
				<p>
					<i className="fad fa-exclamation toast-icon toast-icon--warn"></i>
					<span className="toast-text">
						Có lỗi xảy ra! Hãy kiểm tra lại thông tin
					</span>
				</p>
			</div>
		);
	};

	const doLogOut = () => {
		if (userData) {
			setUserData();

			window.FB.logout();

			localStorage.removeItem(StorageKey.USER);
			localStorage.removeItem(StorageKey.USER_TOKEN);
		}
	};

	return (
		<div className="user">
			<div className="user-box">
				<div className="user__icon-box">
					<img
						src={userData ? userData.picture.data.url : UserAvatar}
						alt="User Icon"
						title="User Icon"
						className="user__icon"
					/>
				</div>

				<div className="user__info">
					<span className="user__name">
						{userData ? userData.name : "User"}
					</span>

					{userData ? (
						<span className="btn-logInOut" onClick={doLogOut}>
							Logout
						</span>
					) : (
						<FacebookLogin
							appId={facebookAppId}
							autoLoad
							callback={onLoginSuccess}
							onFailure={onLoginFailure}
							cssClass="btn-logInOut"
							fields="name,email,picture"
							scope="user_hometown"
							textButton="Login with facebook"
						/>
					)}
				</div>
			</div>
		</div>
	);
}

User.propTypes = {};

export default User;
