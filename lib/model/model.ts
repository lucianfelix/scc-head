export {}


class Page {
     metadata: Metadata
     title: String
     sections: [Section]
}

class Metadata {}

class Section {
     blocks: [Block]
}

class Block  {
     blockName: String
}

class Hero extends Block {
     title: String
     subtitle: String
     image: Image
}

class Header extends Block {
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



