document.addEventListener("DOMContentLoaded", () => {

    let currentUser = null;
    let cart = [];

    const loginBtn = document.getElementById("loginBtn");
    const cartCount = document.querySelector(".cart-count");
    const studentName = document.getElementById("studentName");
    const logoutBtn = document.getElementById("logoutBtn");
    const orderButtons = document.querySelectorAll(".add-to-cart");

    // LOGIN
    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "admin" && password === "admin123") {
            window.location.href = "admin.html";
            return;
        }

        if (username && password === "1234") {
            currentUser = username;
            studentName.textContent = "Hi, " + username;

            document.getElementById("Login").style.display = "none";
            document.getElementById("Home").style.display = "block";
            document.getElementById("Menu").style.display = "block";

            cart = JSON.parse(localStorage.getItem(username)) || [];
            cartCount.textContent = cart.length;
        } else {
            alert("Invalid login");
        }
    });

    // ADD TO CART
  function addToCart(item, price) {
    cart.push({ item, price });
    total += price;

    cartCount.textContent = cart.length;
    totalSpan.textContent = total;
}

    // OPEN CART
    document.querySelector(".cart").addEventListener("click", () => {
        const list = document.getElementById("orderList");
        list.innerHTML = "";

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });

        document.getElementById("orderModal").style.display = "flex";
    });

    // LOGOUT
    logoutBtn.addEventListener("click", () => {
        location.reload();
    });
});

function closeModal() {
    document.getElementById("orderModal").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {

    let currentUser = null;
    let cart = [];
    let total = 0;

    const cartCount = document.querySelector(".cart-count");
    const totalSpan = document.getElementById("total");

    // LOGIN
    loginBtn.addEventListener("click", () => {
        const u = username.value.trim();
        const p = password.value.trim();

        if (u === "admin" && p === "admin123") {
            location.href = "admin.html";
            return;
        }

        if (u && p === "1234") {
            currentUser = u;
            studentName.textContent = "Hi, " + u;
            Login.style.display = "none";
            Home.style.display = Menu.style.display = "block";
        }
    });

    // ADD TO CART
    document.querySelectorAll(".add-to-cart").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            const qty = btn.previousElementSibling.value;
            const price = btn.dataset.price;

            cart.push({
                item: btn.dataset.item,
                qty,
                price
            });

            total += qty * price;
            totalSpan.textContent = total;
            cartCount.textContent = cart.length;
        });
    });

    // PLACE ORDER
    function placeOrder() {
    if (!cart.length) {
        alert("Your cart is empty");
        return;
    }

    const orderNumber = Math.floor(1000 + Math.random() * 9000);

    const order = {
        orderNumber,
        student: currentUser,
        cart,
        total,
        status: "PENDING"
    };

    localStorage.setItem("order_" + orderNumber, JSON.stringify(order));

    alert(`Order placed successfully! Order #${orderNumber}`);
    clearCart();
}


