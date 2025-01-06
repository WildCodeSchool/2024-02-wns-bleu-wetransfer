import {FC} from "react";
import {Form, Modal} from "antd";
import {Plan} from "../../types/plan";
import {CardTitle} from "../../pages/PricingPage.tsx";

interface SubscribeModalProps {
	onCancel: () => void,
	plan: Plan
}

const SubscribeModal: FC<SubscribeModalProps> = ({onCancel, plan}) => {
	const [form] = Form.useForm()

	return (
		<Modal title="Upgrade plan to" open={!!plan} onCancel={onCancel} okText="Subscribe to plan">
			<CardTitle>{plan?.name.toUpperCase()}</CardTitle>
			<Form form={form}>
				<Form.Item>

				</Form.Item>
			</Form>
		</Modal>
	)
}

export default SubscribeModal