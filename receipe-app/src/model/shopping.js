import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ing) {
     const item = {
         id: uniqid(),
         count,
         unit,
         ing,
     }
        this.items.push(item);
     return item;
     };

deleteItem(id) {
    const index = this.items.findIndex(e => e.id === id);
    this.items.splice(index,1);
};

updateCount(id,newCount) {
    this.items.find(e => el.id === id).count = newCount;
  };
};