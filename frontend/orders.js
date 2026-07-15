const container = document.getElementById("ordersContainer");

async function loadOrders() {

    try {

        const res = await fetch("https://food-ordering-system.up.railway.app/api/orders/all");

        const data = await res.json();

        if (!data.success) {

            alert("No Orders Found");
            return;

        }

        container.innerHTML = "";

        data.orders.forEach(order => {

                    let foods = "";

                    order.items.forEach(item => {

                                foods += `
                    <div class="orderItem">

                        ${item.image ? `
                        <img src="${item.image}">
                        ` : ""}

                        <div>

                            <h3>${item.name}</h3>

                            <p>₹${item.price}</p>

                            <p>Quantity : ${item.quantity}</p>

                        </div>

                    </div>
                `;

            });

            container.innerHTML += `

                <div class="orderCard">

                    <h2>👤 ${order.customerName}</h2>

                    <p><b>📞 Phone :</b> ${order.phone}</p>

                    <p><b>📍 Address :</b> ${order.address}</p>

                    <hr><br>

                    ${foods}

                    <h3>Total : ₹${order.totalAmount}</h3>

                    <p class="status">${order.status}</p>

                    <br>

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

// ======================
// UPDATE STATUS
// ======================
async function updateStatus(orderId, status) {

    try {

        const res = await fetch(
            `https://food-ordering-system.up.railway.app/api/orders/status/${orderId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: status
                })
            }
        );

        const data = await res.json();

        if (data.success) {

            alert("✅ Status Updated Successfully");

            loadOrders();

        } else {

            alert(data.message);

        }

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

loadOrders();