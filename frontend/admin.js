async function loadDashboard() {

    try {

        const res = await fetch("https://food-ordering-system.up.railway.app/api/foods/dashboard");

        const data = await res.json();

        if (!data.success) {
            alert("Dashboard Data Not Found");
            return;
        }

        document.getElementById("foods").innerHTML = data.totalFoods;
        document.getElementById("orders").innerHTML = data.totalOrders;
        document.getElementById("users").innerHTML = data.totalUsers;
        document.getElementById("revenue").innerHTML = "₹" + data.revenue;

    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

}

async function loadLatestOrders() {

    try {

        const res = await fetch("https://food-ordering-system.up.railway.app/api/orders/all");

        const data = await res.json();

        if (!data.success) return;

        const table = document.getElementById("ordersTable");

        table.innerHTML = "";

        data.orders.forEach(order => {

            const date = new Date(order.createdAt).toLocaleDateString();

            table.innerHTML += `
                <tr>
                    <td>${order.customerName || "N/A"}</td>
                    <td>₹${order.totalAmount}</td>
                    <td>${order.status}</td>
                    <td>${date}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

// Load Data
loadDashboard();
loadLatestOrders();