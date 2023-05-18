class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }

    prepend(value) {
        const node = new Node(value);
        if (this.head === null) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node; 
        }
        this.size++;
    }

    append(value) {
        const node = new Node(value);

        if (this.isEmpty()) {
            this.head = node;
        } else {
            let prev = this.head;
            while(prev.next) {
                prev = prev.next;
            }
            prev.next = node;
        }
        this.size++;
    }

    insert(value, index) {
        const node = new Node(value);

        if (index < 0 || index > this.size) {
            return;
        }

        if(index === 0) {
            this.prepend(value);
            return;
        }

        if (index === this.size) {
            this.append(value);
        }

        let prev = this.head;

        for(let i=0; i<index-1; i++ ) {
            prev = prev.next;
        }

        const temp = prev.next;
        prev.next = node;
        node.next = temp;
    }

    remove(index) {

        if (this.isEmpty()) {
            return;
        }

        if (index < 0 || index > this.size) {
            return;
        }
        
        let removedNode;
        if (index === 0) {
            this.head = null;
        } else {
            let prev = this.head;
            for(let i=0; i<index-1; i++) {
                prev = prev.next;
            }
            removedNode = prev.next;
            prev.next = removedNode.next;
        }

        this.size--;
        return removedNode.value;
    }

    print() {
        if (this.isEmpty()) {
            return null;
        }
        let current = this.head;
        let listValues = "";
        while(current) {
            listValues += `${current.value} `;
            current = current.next;
        }
        console.log(listValues);
    }

    
}

const linkedList = new LinkedList();
console.log("List is empty? ", linkedList.isEmpty());
console.log("List size is", linkedList.getSize());
linkedList.prepend(0);
linkedList.append(20);
linkedList.append(30);
linkedList.append(40);
linkedList.append(50);
linkedList.print();
linkedList.insert(10, 1);
linkedList.print();
linkedList.insert(25, 3);
linkedList.print();
console.log(linkedList.remove(3));
linkedList.print();
