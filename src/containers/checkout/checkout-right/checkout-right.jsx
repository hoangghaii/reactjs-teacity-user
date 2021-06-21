import emailjs from "emailjs-com";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { formatCurrency } from "../../../common/common";
import { clearCart } from "../../../store/slices/productSlice";
import orderApi from "./../../../apis/orderApi";
import StorageKey from "./../../../constants/storage-keys";
import UserForm from "./user-form/user-form";

function CheckoutRight(props) {
	const { userInfo, productInCart, subTotal } = props;

	const dispatch = useDispatch();

	const [checkCallDone, setCheckCallDone] = useState(false);
	const [isCreateSuccess, setIsCreateSuccess] = useState(false);
	const [isSendMailSuccess, setIsSendMailSuccess] = useState(false);

	const [vat, setVat] = useState(0);

	useEffect(() => {
		setVat(subTotal * 0.2);
	}, [subTotal]);

	const handleSubmit = async (dataUser) => {
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

		await orderApi
			.create(orderDetail)
			.then((dataRes) => {
				if (dataRes.status === 200) {
					setCheckCallDone(true);
					setIsCreateSuccess(true);
				}
			})
			.catch((error) => {
				setCheckCallDone(true);
				setIsCreateSuccess(false);
				console.log(error);
			});

		const mailData = {
			...dataUser,
			detailOrder: productInCart.length,
			subTotal: formatCurrency(subTotal),
			vat: formatCurrency(vat),
			total: formatCurrency(subTotal + vat),
		};

		emailjs
			.send(
				process.env.REACT_APP_MAIL_SERVICE_ID,
				"template_mbfd65d",
				mailData,
				process.env.REACT_APP_MAIL_USER_ID
			)
			.then(
				(response) => {
					if (response.status === 200) {
						setCheckCallDone(true);
						setIsSendMailSuccess(true);
					}
				},
				(error) => {
					setCheckCallDone(true);
					setIsSendMailSuccess(false);
					console.log(error);
				}
			);

		if (checkCallDone) {
			if (isCreateSuccess && isSendMailSuccess) {
				const action = clearCart();
				dispatch(action);

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
			} else if (!isCreateSuccess || !isSendMailSuccess) {
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
