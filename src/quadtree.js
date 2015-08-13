class QuadTree {
    constructor(width, height, max_depth, max_objects) {
        this.root = new Node(0, 0, width, height, 0, max_depth, max_objects);
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
        return this.root.retrieve(item).slice(0);
    }

    clear() {
        this.root.clear();
    }

    draw() {
        if(window.p5) this.root.draw();
    }
}
