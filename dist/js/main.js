import { Order } from "./Order.js";

var burger_btn = document.getElementById("burger_btn")
var close_order = document.getElementById("close_order")

var order_active;

window.onload = () => {
    order_active = new Order();
}

burger_btn.addEventListener('click', () => {
    window.location.href = 'pages/burger.html'
})

close_order.addEventListener('click', (event) => {
    event.preventDefault();
    order_active.saveInDatabase();
})