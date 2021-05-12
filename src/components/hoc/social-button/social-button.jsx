import React from "react";
import SocialLogin from "react-social-login";

function SocialButton({ children, triggerLogin, ...props }) {
	return (
		<span className="btn-logInOut" onClick={triggerLogin} {...props}>
			{children}
		</span>
	);
}

SocialButton.propTypes = {};

export default SocialLogin(SocialButton);
