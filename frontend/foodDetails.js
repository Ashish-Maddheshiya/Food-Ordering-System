const foodId = localStorage.getItem("foodId");

async function loadFood() {

    try {

        const res = await fetch("https://food-ordering-system.up.railway.app/api/foods");

        const data = await res.json();

        const food = data.foods.find(item => item._id === foodId);

        if (!food) {

            alert("Food Not Found");
            return;

        }

        document.getElementById("foodImage").src = food.image;
        document.getElementById("foodName").innerHTML = food.name;
        document.getElementById("foodPrice").innerHTML = "₹" + food.price;
        document.getElementById("foodCategory").innerHTML = "🍽 Category : " + food.category;
        document.getElementById("foodDescription").innerHTML = food.description;

        document.getElementById("cartBtn").onclick = function() {

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.id === food._id);

            if (existing) {

                existing.quantity++;

            } else {

                cart.push({
                    id: food._id,
                    name: food.name,
                    price: food.price,
                    image: food.image,
                    quantity: 1
                });

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("🛒 Added To Cart Successfully");

        };
        document.getElementById("wishBtn").onclick = function() {

            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            const existing = wishlist.find(item => item.id === food._id);

            if (existing) {

                alert("❤️ Already in Wishlist");
                return;

            }

            wishlist.push({

                id: food._id,
                name: food.name,
                price: food.price,
                image: food.image,
                description: food.description,
                category: food.category

            });

            localStorage.setItem("wishlist", JSON.stringify(wishlist));

            alert("❤️ Added To Wishlist");

        };


    } catch (error) {

        console.log(error);
        alert("Server Error");

    }

}
async function submitReview() {

    const rating = document.getElementById("rating").value;

    const review = document.getElementById("reviewText").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        alert("Please Login First");

        return;

    }

    if (review.trim() === "") {

        alert("Please Write Review");

        return;

    }

    const res = await fetch("https://food-ordering-system.up.railway.app/api/reviews", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            foodId: foodId,

            userName: user.name,

            rating: Number(rating),

            review: review

        })

    });

    const data = await res.json();

    if (data.success) {

        alert("⭐⭐⭐⭐⭐ Review Submitted");

        document.getElementById("reviewText").value = "";

        loadReviews();

    } else {

        alert(data.message);

    }

}
async function loadRelatedFoods() {

    try {

        const res = await fetch(`https://food-ordering-system.up.railway.app/api/foods/related/${foodId}`);

        const data = await res.json();

        if (!data.success) return;

        const container = document.getElementById("relatedFoods");

        container.innerHTML = "";

        data.foods.forEach(food => {

            container.innerHTML += `
                <div class="card" onclick="openFood('${food._id}')">

                    <img src="${food.image}"
                         style="width:100%;height:150px;object-fit:cover;border-radius:10px;">

                    <h3>${food.name}</h3>

                    <p>₹${food.price}</p>

                </div>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

async function loadReviews() {

    const res = await fetch(`https://food-ordering-system.up.railway.app/api/reviews/${foodId}`);

    const data = await res.json();

    const container = document.getElementById("reviewsContainer");
    document.getElementById("ratingBox").innerHTML =
        `⭐ ${data.averageRating} (${data.totalReviews} Reviews)`;

    container.innerHTML = "";

    if (data.reviews.length === 0) {

        container.innerHTML = "<h3>No Reviews Yet</h3>";

        return;

    }

    data.reviews.forEach(item => {

        let stars = "⭐".repeat(item.rating);

        container.innerHTML += `

            <div class="review">

                <h3>${item.userName}</h3>

                <p>${stars}</p>

                <p>${item.review}</p>

                <hr>

            </div>

        `;

    });

}

function openFood(id) {

    localStorage.setItem("foodId", id);

    window.location.href = "foodDetails.html";

}
loadFood();
loadReviews();
loadRelatedFoods();