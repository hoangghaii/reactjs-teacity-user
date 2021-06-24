import emailjs from "emailjs-com";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { formatCurrency } from "../../../helper/formatCurrency";
import { clearCart } from "../../../store/slices/productSlice";
import orderApi from "./../../../apis/orderApi";
import StorageKey from "./../../../constants/storage-keys";
import UserForm from "./user-form/user-form";

function CheckoutRight(props) {
	const { userInfo, productInCart, subTotal } = props;

	const dispatch = useDispatch();
	const history = useHistory();

	const [vat, setVat] = useState(0);

	useEffect(() => {
		setVat(subTotal * 0.2);
	}, [subTotal]);

	const handleSubmit = async (dataUser) => {
		const mailData = {
			...dataUser,
			detailOrder: productInCart.length,
			subTotal: formatCurrency(subTotal),
			vat: formatCurrency(vat),
			total: formatCurrency(subTotal + vat),
		};

		const listProduct = [];
		productInCart.forEach((product) =>
			listProduct.push({ id: product.id, count: product.quantity })
		);

		const orderDetail = {
			...dataUser,
			userId: JSON.parse(localStorage.getItem(StorageKey.USER)).userID,
			totalPrice: Math.ceil(subTotal + vat),
			listProduct: listProduct,
		};

		try {
			const resOrder = await orderApi
				.create(orderDetail)
				.then((dataRes) => dataRes.status)
				.catch((error) => error);

			const resMail = await emailjs
				.send(
					process.env.REACT_APP_MAIL_SERVICE_ID,
					"template_mbfd65d",
					mailData,
					process.env.REACT_APP_MAIL_USER_ID
				)
				.then((response) => response.status)
				.catch((error) => error);

			if (resOrder === 200 && resMail === 200) {
				const action = clearCart([]);
				dispatch(action);

				history.push("/");

				toast.success(
					<div className="toast-content">
						<p>
							<span className="toast-text">
								🎉 Mua hàng thành công, đơn hàng sẽ được gửi vào
								Mail của bạn
							</span>
						</p>
					</div>
				);
			}
		} catch (error) {
			toast.error(
				<div className="toast-content">
					<p>
						<i className="fad fa-do-not-enter toast-icon toast-icon--error"></i>
						<span className="toast-text">
							Có lỗi xảy ra, hãy kiểm tra lại thông tin
						</span>
					</p>
				</div>
			);
		}
	};

	return (
		<div className="checkout__container--right">
			<h3 className="checkout__heading">Payment Detail</h3>
			<span className="payment__text">
				Complete your purchase by providing your payment details
			</span>

			<UserForm
				userInfo={userInfo}
				subTotal={subTotal}
				onSubmitForm={handleSubmit}
			/>

			<div className="text-center">
				<span className="payment-note">
					<i className="fad fa-lock-alt" />
					Payments are secure and encryted
				</span>
			</div>
		</div>
	);
}

CheckoutRight.propTypes = {
	userInfo: PropTypes.object,
	subTotal: PropTypes.number,
	productInCart: PropTypes.array,
};

export default CheckoutRight;
