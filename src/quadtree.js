const MAX_OBJECTS = 4;
const MAX_DEPTH = 25;

class QuadTree {
    constructor(width, height) {
        this.root = new Node(0, 0, width, height, 0);
    }

    insert(key) {
        if(key instanceof Array) {
            for(var k of key) {
                this.root.insert(k);
            }
        } else {
            this.root.insert(key);
        }
    }

    retrieve(item) {
        return this.root.retrieve(item);
    }

    clear() {
        this.root.clear();
    }

    draw() {
        if(window.p5) this.root.draw();
    }
}
