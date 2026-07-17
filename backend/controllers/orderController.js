const Order = require("../models/Order");

// ==========================
// PLACE ORDER
// ==========================
exports.placeOrder = async(req, res) => {

    try {

        const {

            userId,

            customerName,

            phone,

            address,

            items,

            totalAmount

        } = req.body;

        const order = await Order.create({

            userId,

            customerName,

            phone,

            address,

            items,

            totalAmount,

            status: "Paid"

        });

        res.status(201).json({

            success: true,

            message: "Order Placed Successfully",

            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// GET ALL ORDERS
// ==========================
exports.getAllOrders = async(req, res) => {

    try {

        const { userId } = req.params;

        const orders = await Order.find({

            userId: userId

        }).sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            count: orders.length,
            orders

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
// ==========================
// GET USER ORDERS
// ==========================
exports.getUserOrders = async(req, res) => {

    try {

        const { userId } = req.params;

        const orders = await Order.find({
            userId: userId
        }).sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            count: orders.length,
            orders

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ==========================
// UPDATE STATUS
// ==========================
exports.updateOrderStatus = async(req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        const status = req.body.status;

        const validStatus = [
            "Pending",
            "Confirmed",
            "Preparing",
            "Out For Delivery",
            "Delivered"
        ];

        if (!validStatus.includes(status)) {

            return res.status(400).json({
                success: false,
                message: "Invalid Status"
            });

        }

        order.status = status;

        await order.save();

        res.status(200).json({

            success: true,
            message: "Status Updated",

            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
// ==========================
// CANCEL ORDER
// ==========================
exports.cancelOrder = async(req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({

                success: false,
                message: "Order Not Found"

            });

        }

        order.status = "Cancelled";

        await order.save();

        res.status(200).json({

            success: true,
            message: "Order Cancelled",
            order

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
// ==========================
// GET ADMIN ORDERS
// ==========================
exports.getAdminOrders = async(req, res) => {

    try {

        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({

            success: true,
            count: orders.length,
            orders

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
