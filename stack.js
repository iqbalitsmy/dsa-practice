// https://gist.github.com/bradtraversy/6386eac2ab15842d1e8e0424a727a81d

class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }

    push(element) {
        this.items[this.count] = element;
        this.count += 1;
        return console.log(`${element} added to ${this.count}`);
    }
    pop() {
        if (this.isEmpty()) return undefined;

        const deleteItem = this.items[this.count - 1];
        delete this.items[this.count - 1];
        this.count -= 1;
        return deleteItem;
    }

    peek() {
        if (this.isEmpty()) return undefined;

        const peekItem = this.items[this.count - 1];
        return peekItem;
    }

    print() {
        if (this.isEmpty()) return undefined;

        for (let i = 0; i < this.count; i++) {
            console.log(this.items[i])
        }
    }

    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.count
    }
    clear() {
        this.count = 0;
        this.items = [];
        console.log("Stack is cleared...");
        return this.items;
    }
}

const stack = new Stack();

stack.push(10);
stack.push(30);
console.log(stack.pop())

stack.push(40);
console.log(stack.size())
console.log(stack.clear())
console.log(stack.pop())
