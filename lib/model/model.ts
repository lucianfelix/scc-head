export {}


class Page {
     metadata: Metadata
     title: String
     sections: [Section] | []

    constructor() {
        this.metadata = new Metadata();
        this.title = '';
        this.sections = [];
    }
}

class Metadata {
    //array of key value pairs
    [key: string]:string
}

class Section {
    metadata: Metadata
    blocks: [Block] | []

    constructor() {
        this.metadata = new Metadata();
        this.blocks = [];
    }
}

class Block  {
    class: [String]
    blockName: String
}

class Hero extends Block {
     title: String
     subtitle: String
     image: Image
}

class Header extends Block {
    id: String
     title: String
     subtitle: String
}

class ColumnsContainer extends Block {
     columns: [Column]
}

class CardsContainer extends Block {
    cards: [Column]
}

class Card {
     picture: Picture
     block: Block
}

class Picture {
    source: AssetSource
    
    enum AssetSource: , Hashable {
        case url(url: URL)
        case bundledAsset(name: String)
    }
    
}



