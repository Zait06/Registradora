import Order from "./Order.js";

const invoke = window.__TAURI__.invoke

var burger_btn = document.getElementById("burger_btn")
var close_order = document.getElementById("close_order")

var unaOrden;

window.onload = () => {
    unaOrden = new Order();
}

burger_btn.addEventListener('click', () => {
    window.location.href = 'pages/burger.html'
})

close_order.addEventListener('click', (event) => {
    event.preventDefault();
    unaOrden.saveInDatabase();
    invoke('save_order', { order: unaOrden.toString() });
})