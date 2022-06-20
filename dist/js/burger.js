var ok_btn = document.getElementById('ok')
var cancel_btn = document.getElementById('cancel')

ok_btn.addEventListener('click', (event) => {
    event.preventDefault();
    const order = localStorage.getItem('order');
    alert(order)
    // window.location.href = '../index.html'
})


cancel_btn.addEventListener('click', () => {
    window.location.href = '../index.html'
})