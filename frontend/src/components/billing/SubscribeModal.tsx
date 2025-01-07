import {FC} from "react";
import {Form, message, Modal} from "antd";
import {Plan} from "../../types/plan";
import {CardTitle} from "../../pages/PricingPage.tsx";
import {HANDLE_USER_BILLING} from "../../graphql/mutations.ts";
import {useMutation} from "@apollo/client";

interface SubscribeModalProps {
	onCancel: () => void,
	plan: Plan
}

const SubscribeModal: FC<SubscribeModalProps> = ({onCancel, plan}) => {
	const [form] = Form.useForm()

	const [handleUserBilling, {userBillingLoading}] = useMutation(HANDLE_USER_BILLING, {
		onCompleted: () => {
			message.success("Plan updated")
			onCancel()
			window.location.reload()
		}
	})


	return (
		<Modal title="Upgrade plan to" open={!!plan} onCancel={onCancel} okText="Subscribe to plan" okButtonProps={{
			onClick: () => handleUserBilling({
				variables: {
					planId: plan.id, unsubscribe: false
				}
			}),
			loading: userBillingLoading
		}}>
			<CardTitle>{plan?.name.toUpperCase()}</CardTitle>
			From the subscription date, you'll charged for {plan?.price}€ every month
		</Modal>
	)
}

export default SubscribeModal