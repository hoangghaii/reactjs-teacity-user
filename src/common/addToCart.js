import { toast } from "react-toastify";
import { addCart } from "../redux/productSlice";

export const addToCart = (dispatch, productList, productToAdd) => {
	const action = addCart({
		id: productToAdd.id,
		image: productToAdd.image,
		name: productToAdd.name,
		quantity: 1,
		price: productToAdd.price,
	});

	if (productList.length === 0) {
		dispatch(action);

		toast.success(
			<div className="toast-content">
				<p>
					<i className="fad fa-unicorn toast-icon toast-icon--success" />
					<span className="toast-text">
						Sản phẩm đã được cho vào giỏ hàng ♥
					</span>
				</p>
			</div>
		);
	} else if (productList.length > 0) {
		let flagIsHaved = false;

		productList.map((product) => {
			const detailProductRedux = product;
			if (detailProductRedux.id === productToAdd.id) flagIsHaved = true;
			return flagIsHaved;
		});

		if (flagIsHaved === true) {
			toast.warn(
				<div className="toast-content">
					<p>
						<i className="fad fa-exclamation toast-icon toast-icon--warn"></i>
						<span className="toast-text">
							Sản phẩm đã có trong giỏ hàng
						</span>
					</p>
				</div>
			);
		} else {
			dispatch(action);

			toast.success(
				<div className="toast-content">
					<p>
						<i className="fad fa-unicorn toast-icon toast-icon--success" />
						<span className="toast-text">
							Sản phẩm đã được cho vào giỏ hàng ♥
						</span>
					</p>
				</div>
			);
		}
	}
};
