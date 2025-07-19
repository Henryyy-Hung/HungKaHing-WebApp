import {Enumify} from "enumify";

class BlogCategory extends Enumify {

    static ALL = new BlogCategory(
        'all'
    )

    static FRONTEND = new BlogCategory(
        'frontend'
    )

    static BACKEND = new BlogCategory(
        'backend'
    )

    static AI = new BlogCategory(
        'ai'
    )

    static PRODUCTIVITY = new BlogCategory(
        'productivity'
    )

    static LIFE = new BlogCategory(
        'life'
    )

    static PROJECT = new BlogCategory(
        'project'
    )

    static {
        this.closeEnum()
    }

    constructor(id, visible = true) {
        super()
        this.id = id;
        this.visible = visible;
    }
}

export {
    BlogCategory
}
