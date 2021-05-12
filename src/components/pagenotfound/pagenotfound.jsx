import React from "react";
import { Link } from "react-router-dom";

function PageNotFound(props) {
	return (
		<section className="page_404">
			<div className="page_404-container">
				<div className="four_zero_four_bg">
					<h1>404</h1>
				</div>
				<div className="contant_box_404">
					<h3 className="h2">
						OOps!! Có vẻ trang bạn tìm kiếm không tồn tại hoặc đang
						lỗi.
					</h3>
					<p>
						Đây không phải là lỗi của bạn, chúng tôi sẽ cố gắng sửa
						chữa!
					</p>

					<Link exact to="/home" className="btn btn-error">
						Về trang chủ
					</Link>
				</div>
			</div>
		</section>
	);
}

PageNotFound.propTypes = {};

export default PageNotFound;
