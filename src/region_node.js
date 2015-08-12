class RegionNode extends Node {
    constructor(x, y, width, height, depth, max_depth, max_objects) {
        super(x, y, width, height, depth, max_depth, max_objects);
        this.misfits = [];
    }

    insert(key) {
        if(this.children.length)  {
            var child = this.children[this.index(key)];
            if(child.fits(key)) {
                child.insert(key);
            } else {
                this.misfits.push(key);
            }
        } else {
            this.objects.push(key);

            if(this.objects.length > this.MAX_OBJECTS && this.depth < this.MAX_DEPTH) {
                this.split();
                while(this.objects.length > 0) {
                    var key   = this.objects.pop();
                    var index = this.index(key);
                    var child = this.children[index];
                    child.insert(key);
                }
                while(this.misfits.length > 0) {
                    this.insert(this.misfits.pop());
                }
            }
        }
    }

    retrieve(key) {
        var out = [];
        if(this.children.length) {
            out.push.apply(out, this.children[this.index(key)].retrieve(key));
        }
        out.push.apply(out, this.misfits);
        out.push.apply(out, this.objects);
        return out;
    }

    fits(key) {
        var widthOk = key.x >= this.x && key.x + key.width <= this.x + this.width;
        var heightOk = key.y >= this.y && key.y + key.height <= this.y + this.height;
        return widthOk && heightOk;
    }

    clear() {
        this.misfits.length = 0;
        if(this.children.length) for(var child of this.children) child.clear();
        this.children.length = 0;
        this.objects.length = 0;
    }
}
