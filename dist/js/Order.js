export default class Order {
    constructor() {
        this.timestamp = new Date().getTime();
        this.order = [];
        this.end = false;
    }
}