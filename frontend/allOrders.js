const container = document.getElementById("ordersContainer");

async function loadOrders() {

    try {

        const res = await fetch("https://food-ordering-system.up.railway.app/api/orders/all");

        const data = await res.json();

        container.innerHTML = "";

        data.orders.forEach(order => {

            container.innerHTML += `

            <div class="orderCard">

                <h2 class="customerName">${order.customerName}</h2>

                <p class="info">📞 ${order.phone}</p>

                <p class="info">📍 ${order.address}</p>

                <p class="total">💰 ₹${order.totalAmount}</p>

                <p class="status ${
                    order.status === "Pending" ? "pending" :
                    order.status === "Confirmed" ? "confirmed" :
                    order.status === "Preparing" ? "preparing" :
                    order.status === "Out For Delivery" ? "delivery" :
                    "delivered"
                }">

                    ${order.status}

                </p>

                <select onchange="updateStatus('${order._id}', this.value)">

                    <option value="">Update Status</option>

                    <option value="Pending">Pending</option>

                    <option value="Confirmed">Confirmed</option>

                    <option value="Preparing">Preparing</option>

                    <option value="Out For Delivery">Out For Delivery</option>

                    <option value="Delivered">Delivered</option>

                </select>

            </div>

            `;

        });

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

async function updateStatus(orderId, status) {

    try {

        const res = await fetch(
            `https://food-ordering-system.up.railway.app/api/orders/status/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            }
        );

        const data = await res.json();

        if (data.success) {

            alert("✅ Status Updated");

            loadOrders();

        }

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

loadOrders();