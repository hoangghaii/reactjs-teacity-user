import { Fragment, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoute from "./components/hoc/main-route/main-route";
import PrivateRoute from "./components/hoc/private-route/private-route";
import Loading from "./components/loading/loading";
import "./sass/main.scss";

const Dashboard = lazy(() => import("./components/user/dashboard"));
const Checkout = lazy(() => import("./components/user/checkout/checkout"));

function App() {
	return (
		<Fragment>
			<Router>
				<Suspense fallback={<Loading />}>
					<Switch>
						<PrivateRoute path="/checkout" component={Checkout} />
						<MainRoute path="/" component={Dashboard} />
					</Switch>
				</Suspense>
			</Router>

			<ToastContainer
				limit={3}
				position="bottom-right"
				autoClose={2000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover
			/>
		</Fragment>
	);
}

export default App;
