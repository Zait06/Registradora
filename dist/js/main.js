var btnPizza = document.getElementById("burger_btn")

window.onload = () => {
    const date = new Date()
    const newOrder = `{id: '${date.getTime()}', end: false, order:[]}`
    let order = localStorage.getItem('order');
    if (!order) {
        localStorage.setItem('order', newOrder);
        order = newOrder;
    }

    console.log(order);

}

btnPizza.addEventListener('click', () => {
    window.location.href = 'pages/burger.html'
})