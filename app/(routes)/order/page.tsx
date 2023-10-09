import Container from '@/components/ui/container';
import getOrders from '@/actions/get-order';
import { OrderClient } from './component/client';

const OrderPage = async () => {

    const orderList = await getOrders()
    console.log(orderList);

    return (
        <div className="custom-container">
            <Container>
                <OrderClient />
            </Container>
        </div>
    )
}

export default OrderPage;
