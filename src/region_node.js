class RegionNode extends Node {
    constructor(x, y, width, height, depth) {
        super(x, y, width, height, depth);
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

            if(this.objects.length > MAX_OBJECTS && this.depth < MAX_DEPTH) {
                this.split();
                while(this.objects.length > 0) {
                    var key   = this.objects.pop();
                    var index = this.index(key);
                    var child = this.children[index];
                    child.insert(key);
                }
            }
        }
    }

    retrieve(key) {
        if(this.children.length) {
            return this.children[this.index(key)].retrieve(key)
                .concat(this.misfts).concat(this.objects);
        } else return this.objects.concat(this.misfits);
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
