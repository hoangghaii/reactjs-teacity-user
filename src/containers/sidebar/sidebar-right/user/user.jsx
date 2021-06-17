import React, { useState } from "react";
import { toast } from "react-toastify";
import SocialButton from "../../../../hoc/social-button/social-button";
import StorageKey from "../../../../constants/storage-keys";
import UserAvatar from "../../../../assets/images/woman.png";

function User(props) {
	const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

	const [userData, setUserData] = useState(
		JSON.parse(localStorage.getItem(StorageKey.USER)) || null
	);

	const handleLoginSuccess = (res) => {
		console.log(res);
		setUserData(res._profile);

		localStorage.removeItem("fblst_889966328526270");
		localStorage.setItem(StorageKey.USER_TOKEN, res._token.accessToken);
		localStorage.setItem(StorageKey.USER, JSON.stringify(res._profile));
	};

	const handleLoginFailure = (err) => {
		console.log(err);
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

	const handleLogoutSuccess = () => {
		setUserData();
	};

	const handleLogoutFailure = (error) => {
		console.log(error);
	};

	const doLogOut = () => {
		if (userData) {
			setUserData();

			localStorage.removeItem(StorageKey.USER);
			localStorage.removeItem(StorageKey.USER_TOKEN);
		}
	};

	return (
		<div className="user">
			<div className="user-box">
				<div className="user__icon-box">
					<img
						src={userData ? userData.profilePicURL : UserAvatar}
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
						<SocialButton
							provider="facebook"
							appId={facebookAppId}
							key={"facebook"}
							scope="user_hometown"
							onLoginSuccess={handleLoginSuccess}
							onLoginFailure={handleLoginFailure}
							onLogoutSuccess={handleLogoutSuccess}
							onLogoutFailure={handleLogoutFailure}
						>
							Login
						</SocialButton>
					)}
				</div>
			</div>
		</div>
	);
}

User.propTypes = {};

export default User;
