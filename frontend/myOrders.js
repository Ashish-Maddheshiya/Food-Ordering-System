const container = document.getElementById("ordersContainer");

const user = JSON.parse(localStorage.getItem("user"));

async function loadMyOrders() {

    if (!user) {

        alert("Please Login First");
        window.location.href = "index.html";
        return;

    }

    try {

        const res = await fetch(
            `https://food-ordering-system-production-abb0.up.railway.app/api/orders/${user._id}`
        );

        const data = await res.json();

        if (!data.success || data.count === 0) {

            container.innerHTML = `
                <h2 style="text-align:center;margin-top:40px;">
                    📦 No Orders Found
                </h2>
            `;
            return;

        }

        container.innerHTML = "";

        data.orders.forEach(order => {

                    let foods = "";

                    order.items.forEach(item => {

                                foods += `
                    <div class="orderItem" style="display:flex;gap:15px;margin-bottom:15px;align-items:center;">

                        ${item.image ? `
                        <img src="${item.image}"
                             style="width:80px;height:80px;border-radius:10px;object-fit:cover;">
                        ` : ""}

                        <div>

                            <h3>${item.name}</h3>

                            <p>₹${item.price}</p>

                            <p>Quantity : ${item.quantity}</p>

                        </div>

                    </div>
                `;

            });

            const orderDate = new Date(order.createdAt).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

            let statusColor = "orange";

            if (order.status === "Paid") statusColor = "green";
            if (order.status === "Delivered") statusColor = "blue";
            if (order.status === "Cancelled") statusColor = "red";

            container.innerHTML += `

                <div class="orderCard" style="padding:20px;border-radius:10px;background:#fff;box-shadow:0 0 10px rgba(0,0,0,.1);margin-bottom:20px;">

                    <h2>📦 Order #${order._id.slice(-6)}</h2>

                    <p>
                        <b>Status :</b>
                        <span style="color:${statusColor};font-weight:bold;">
                            ${order.status}
                        </span>
                    </p>

                    <p><b>Date :</b> ${orderDate}</p>

                    <p><b>Total :</b> ₹${order.totalAmount}</p>

                    <hr><br>

                    ${foods}

                </div>

            `;

        });

    } catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

loadMyOrders();