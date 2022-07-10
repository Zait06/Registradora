export const invoke = window.__TAURI__.invoke;

const fifteenMinutes = 15 * 60 * 1000;

export class Order {
  constructor() {
    if (localStorage.getItem('order')) this.initFromStorage();
    else this.init();
  }

  init() {
    this.timestamp = new Date().getTime();
    this.order = {};
    this.end = false;
    localStorage.setItem('order', this.toString());
  }

  limitTime() {
    const orderData = JSON.parse(localStorage.getItem('order'));
    return (
      orderData.timestamp - new Date().getTime() > fifteenMinutes
    );
  }

  isFinishOrder() {
    const orderStr = localStorage.getItem('order');
    const order = JSON.parse(orderStr);
    return order.end;
  }

  initFromStorage() {
    if (this.isFinishOrder() && this.limitTime()) {
      localStorage.clear();
      localStorage.setItem('order', createOrder());
    } else {
      this.fromLocalStorage();
    }
  }

  toObject() {
    return {
      timestamp: this.timestamp,
      order: this.order,
      end: this.end,
    };
  }

  toString() {
    return JSON.stringify(this.toObject());
  }

  toJSON() {
    return JSON.parse(this.toString());
  }

  fromLocalStorage() {
    const orderData = JSON.parse(localStorage.getItem('order'));
    this.timestamp = orderData.timestamp;
    this.order = orderData.order;
    this.end = orderData.end;
  }

  createOrder() {
    this.timestamp = new Date().getTime();
    return this.toString();
  }

  saveInDatabase() {
    this.end = true;
    const order = this.toString();
    localStorage.setItem('order', order);
    this.init();
    invoke('save_order', { order });
  }

  add(data) {
    this.order.push(data);
  }

  remove(key, idx) {
    this.order[key].splice(idx, 1);
  }
}
