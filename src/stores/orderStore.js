import { action, computed, decorate, observable, runInAction } from 'mobx';
import { useToast } from '../halpers/useToast';
import { agent } from '../api/agents';

export default class OrderStore {

    restaurentOfferList = []
    newOrderList = []
    orderHistoryList = []
    paymentOrderList = []

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
                this.newOrderList = res?.data ?? []
                return res?.data;
            } else {
                const message = res?.message ? res?.message : res?.data?.message;
                useToast(message, 0);
                this.newOrderList = []
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
                handleLoading(false)
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

    getRestaurantOffers = async (restaurant, handleLoading) => {
        // handleLoading(true);
        let requestData = {
            restaurant_id: restaurant?._id,
        };
        console.log('requestData----restaurantOffers', requestData);
        try {
            const res = await agent.getAllOffers(requestData);
            console.log('restaurantOffers Res : ', res);
            if (res?.statusCode == 200) {
                // useToast(res?.message, 1);
                handleLoading(false);
                this.restaurentOfferList = res?.data;
                return res?.data;
            } else {
                const message = res?.message ? res?.message : res?.data?.message;
                // useToast(message, 0);
                handleLoading(false);
                this.restaurentOfferList = [];
                return [];
            }
        } catch (error) {
            console.log('error restaurantOffers:', error);
            handleLoading(false);
            const m = error?.data?.message
                ? error?.data?.message
                : 'Something went wrong';
            // useToast(m, 0);
            return [];
        }
    };

    setAcceptDeclineOffer = async (data, handleSuccess, onError) => {
        let requestData = {
            offer_id: data?._id,
            is_vendor_accepted: !data?.is_vendor_accepted ?? true
        };
        console.log('requestData----setAcceptDeclineOffer', requestData);
        try {
            const res = await agent.acceptDeclineOffer(requestData);
            console.log('setAcceptDeclineOffer Res : ', res);
            if (res?.statusCode == 200) {
                handleSuccess()
                useToast(res?.message, 1);
            } else {
                onError()
                const message = res?.message ? res?.message : res?.data?.message;
                useToast(message, 0);

            }
        } catch (error) {
            console.log('error setAcceptDeclineOffer:', error);
            onError()
            const m = error?.data?.message
                ? error?.data?.message
                : 'Something went wrong';
            useToast(m, 0);

        }
    };


    getOrderHistory = async (appUser, status, perPage, search, handleLoading) => {
        // handleLoading(true)
        let requestData = {
            restaurant_id: appUser?.restaurant?._id,
            status: status === "All Orders" ? "all" : status?.toLowerCase(),
            limit: perPage,
        };

        if (search?.length > 0) {
            requestData.search = search
        }
        console.log('requestData--getOrderHistory', requestData);
        try {
            const res = await agent.getOrderHistory(requestData);
            console.log('getOrderHistory API Res:', res);
            if (res?.statusCode == 200) {
                handleLoading(false)
                // useToast(res.message, 1);
                this.orderHistoryList = res?.data ?? []
                return res?.data;
            } else {
                handleLoading(false)
                const message = res?.message ? res?.message : res?.data?.message;
                useToast(message, 0);
                this.orderHistoryList = []
                return []
            }

        } catch (error) {
            console.log('error:getOrderHistory', error);
            handleLoading(false)
            const m = error?.data?.message
                ? error?.data?.message
                : 'Something went wrong';
            useToast(m, 0);
            return []
        }
    };

    getHistorybyFilters = async type => {
        const his = this.orderHistoryList;

        if (type == 'All Orders') {
            return his;
        } else if (type == 'Completed') {
            const filterList = his?.filter(element =>
                element?.status?.includes(type.toLowerCase()),
            );
            return filterList;
        }
        else if (type == 'Declined') {
            const filterList = his?.filter(element =>
                element?.status?.includes(type.toLowerCase()),
            );
            return filterList;
        }
        else {
            const filterList = his.filter(element =>
                element?.status?.includes(type.toLowerCase()),
            );
            return filterList;
        }
    };


    getVendorOrderReport = async (appUser, range, handleLoading) => {
        // handleLoading(true)
        let requestData = {
            restaurant_id: appUser?.restaurant?._id,
            range: range?.toLowerCase() ///  all , day  ,week , year
        };

        console.log('requestData--getVendorOrderReport', requestData);
        try {
            const res = await agent.getVendorOrderReport(requestData);
            console.log('getVendorOrderReport API Res:', res);
            if (res?.statusCode == 200) {
                handleLoading(false)
                // useToast(res.message, 1);
                return res?.data;
            } else {
                handleLoading(false)
                const message = res?.message ? res?.message : res?.data?.message;
                useToast(message, 0);
                return []
            }

        } catch (error) {
            console.log('error:getVendorOrderReport', error);
            handleLoading(false)
            const m = error?.data?.message
                ? error?.data?.message
                : 'Something went wrong';
            useToast(m, 0);
            return []
        }
    };


    getRestaurantFoodPayment = async (appUser, status, search, handleLoading) => {
        // handleLoading(true)
        let requestData = {
            restaurant_id: appUser?.restaurant?._id,
            status: status?.toLowerCase(), // Options: "all", "captured", "refund", withdraw .
        };
        if (search?.length > 0) {
            requestData.search = search
        }
        console.log('requestData--getRestaurantFoodPayment', requestData);
        try {
            const res = await agent.getRestaurantFoodPayment(requestData);
            console.log('getRestaurantFoodPayment API Res:', res);
            if (res?.statusCode == 200) {
                handleLoading(false)
                // useToast(res.message, 1);
                this.paymentOrderList = res?.data ?? []
                return res?.data;
            } else {
                handleLoading(false)
                const message = res?.message ? res?.message : res?.data?.message;
                useToast(message, 0);
                this.paymentOrderList = []
                return []
            }

        } catch (error) {
            console.log('error:getRestaurantFoodPayment', error);
            handleLoading(false)
            const m = error?.data?.message
                ? error?.data?.message
                : 'Something went wrong';
            useToast(m, 0);
            return []
        }
    };



}

