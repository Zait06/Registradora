import Order from "./Order.js";

const invoke = window.__TAURI__.invoke

var burger_btn = document.getElementById("burger_btn")
var close_order = document.getElementById("close_order")

var unaOrden;

function createOrder() {
    const date = new Date()
    return `{"timestamp": ${date.getTime()}, "order":[], "end": false}`
}

function isFinishOrder() {
    const orderStr = localStorage.getItem('order');
    const order = JSON.parse(orderStr);
    return order.end;
}

function createAndClean() {
    console.log("End:", isFinishOrder());
    if (!isFinishOrder() && isFinishOrder() !== undefined) return;
    
    localStorage.clear();
    localStorage.setItem('order', createOrder());
}

window.onload = () => {
    unaOrden = new Order();
    createAndClean();
    console.log(unaOrden.timestamp)
}

burger_btn.addEventListener('click', () => {
    window.location.href = 'pages/burger.html'
})

close_order.addEventListener('click', () => {
    let order = localStorage.getItem('order');
    const orderJSON = JSON.parse(order);
    orderJSON.end = true;
    order = JSON.stringify(orderJSON)
    localStorage.setItem('order', order);
    invoke('save_order',{order})
    createAndClean();
})