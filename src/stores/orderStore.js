import { action, computed, decorate, observable, runInAction } from 'mobx';
import { useToast } from '../halpers/useToast';
import { agent } from '../api/agents';

export default class OrderStore {

    getNewOrder = async (data) => {
        let requestData = {
            restaurant_id: data?.restaurant?._id,
        };
        console.log('requestData--getNewOrder', requestData);
        try {
            const res = await agent.getWaitingOrder(requestData);
            console.log('getNewOrder API Res:', res);
            if (res?.statusCode == 200) {
                // useToast(res.message, 1);
                return res?.data;
            } else {
                const message = res?.message ? res?.message : res?.data?.message;
                useToast(message, 0);
                return []
            }

        } catch (error) {
            console.log('error:getNewOrder', error);
            const m = error?.data?.message
                ? error?.data?.message
                : 'Something went wrong';
            useToast(m, 0);
            return []
        }
    };

    getAccpetdOrderList = async (data, handleLoading) => {
        handleLoading(true)
        let requestData = {
            restaurant_id: data?.restaurant?._id,
            status: "all"// Options:
            // - waiting_for_confirmation
            // - cooking
            // - packing_processing
            // - ready_to_pickup
            // - picked
            // - declined
            // - completed
            // -  cancelled
        };
        console.log('requestData--getAccpetdOrderList', requestData);
        try {
            const res = await agent.getOrderByStatus(requestData);
            console.log('getAccpetdOrderList API Res:', res);
            if (res?.statusCode == 200) {
                handleLoading(true)
                // useToast(res.message, 1);
                return res?.data;
            } else {
                handleLoading(false)
                const message = res?.message ? res?.message : res?.data?.message;
                useToast(message, 0);
                return []
            }

        } catch (error) {
            console.log('error:getAccpetdOrderList', error);
            handleLoading(false)
            const m = error?.data?.message
                ? error?.data?.message
                : 'Something went wrong';
            useToast(m, 0);
            return []
        }
    };

    updateOrderStatus = async (data, status, handleSuccess, handleFailure) => {
        let requestData = {
            food_order_id: data?._id,
            status: status,

            // Options:
            // 'all',
            //  "completed"
            // - waiting_for_confirmation
            // - cooking
            // - packing_processing
            // - ready_to_pickup
            // - picked
            // - declined
            // - completed
        };

        if (data?.status == "cooking") {
            requestData.cooking_time = "15 minutes"  // this will only work when  status is  cooking ;
        }


        console.log('requestData--updateOrderStatus', requestData);
        try {
            const res = await agent.updateOrderStatus(requestData);
            console.log('updateOrderStatus API Res:', res);
            if (res?.statusCode == 200) {
                useToast(res.message, 1);
                handleSuccess()
                return res;
            } else {
                const message = res?.message ? res?.message : res?.data?.message;
                useToast(message, 0);
                handleFailure()
                return res
            }

        } catch (error) {
            console.log('error:updateOrderStatus', error);
            handleFailure();
            const m = error?.data?.message
                ? error?.data?.message
                : 'Something went wrong';
            useToast(m, 0);
            return []
        }
    };


}

