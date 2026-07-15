// ==========================
// TOTAL AMOUNT
// ==========================

const total = Number(localStorage.getItem("totalAmount")) || 0;

document.getElementById("totalAmount").innerHTML = "₹" + total;

// ==========================
// PAY NOW
// ==========================

async function payNow() {

    const paymentOption = document.querySelector('input[name="payment"]:checked');

    if (!paymentOption) {
        alert("Please select a payment method.");
        return;
    }

    const method = paymentOption.value;

    const button = document.querySelector("button");

    button.innerHTML = "⏳ Processing Payment...";
    button.disabled = true;

    setTimeout(async() => {

        const customerName = localStorage.getItem("customerName");
        const phone = localStorage.getItem("customerPhone");
        const address = localStorage.getItem("customerAddress");

        const items = JSON.parse(localStorage.getItem("cartData")) || [];

        const user = JSON.parse(localStorage.getItem("user"));

        const orderData = {

            userId: user._id,

            customerName,

            phone,

            address,

            items,

            totalAmount: total

        };

        try {

            const res = await fetch("https://food-ordering-system.up.railway.app/api/orders", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(orderData)

            });

            const data = await res.json();

            if (data.success) {

                alert("✅ Payment Successful\n\nMethod : " + method);

                localStorage.removeItem("cart");
                localStorage.removeItem("cartData");
                localStorage.removeItem("customerName");
                localStorage.removeItem("customerPhone");
                localStorage.removeItem("customerAddress");
                localStorage.removeItem("totalAmount");

                window.location.href = "myOrders.html";

            } else {

                alert(data.message);

                button.innerHTML = "💳 Pay Now";
                button.disabled = false;

            }

        } catch (error) {

            console.log(error);

            alert("Server Error");

            button.innerHTML = "💳 Pay Now";
            button.disabled = false;

        }

    }, 2000);

}