export const invoke = window.__TAURI__.invoke

export class Order {
    constructor() {
        if (localStorage.getItem('order'))
            this.initFromStorage();
        else
            this.init();
    }

    init(){
        this.timestamp = new Date().getTime();
        this.order = [];
        this.end = false;
        localStorage.setItem('order', this.toString())
    }

    isFinishOrder() {
        const orderStr = localStorage.getItem('order');
        const order = JSON.parse(orderStr);
        return order.end;
    }

    initFromStorage() {
        if (this.isFinishOrder() && this.isFinishOrder() === undefined) {
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
            end: this.end
        }
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
        this.end = orderData.end
    }

    createOrder() {
        this.timestamp = new Date().getTime();
        return this.toString();
    }

    saveInDatabase() {
        this.end = true;
        const order = this.toString()
        localStorage.setItem('order', order);
        invoke('save_order', { order });
        this.init()
    }
}