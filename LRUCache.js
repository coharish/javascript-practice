class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }

    put(key, value) {

        if (this.map.size >= this.capacity) {
            this.remove();            
        }
        this.map.set(key, value);
    }

    get(key) {
        if(this.map.has(key)) {
            const value = this.map.get(key);
            this.map.delete(key);
            this.put(key, value);
            return value;
        }
    }

    remove() {
        const mapIterator = this.map.keys();
        const key = mapIterator.next().value;
        this.map.delete(key);
    }
}

const lruCache = new LRUCache(4);
lruCache.put('red', 'red');
lruCache.put('green', 'green');
lruCache.put('blue', 'blue');
lruCache.put('white', 'white');
console.log(lruCache);
console.log(lruCache.get('red'));
console.log(lruCache);
lruCache.put('yellow', 'yellow');
console.log(lruCache);
lruCache.put('orange', 'orange');
console.log(lruCache);
console.log(lruCache.get('white'));
console.log(lruCache);