//TODO: This model is not used yet
// The parsers should produce this model
// The Components should use this model


export {}


type Page = {
     metadata: Metadata
     title: String
     sections: [Section] | []
}

type Metadata = {
    //array of key value pairs
    [key: string]:string
}

type Section = {
    metadata: Metadata
    blocks: [Block] | []
}

type Block = {
    class: [String]
    blockName: String
}

// type Hero extends Block {
//      title: String
//      subtitle: String
//      image: Image
// }
//
// type Header extends Block {
//     id: String
//      title: String
//      subtitle: String
// }

type ColumnsContainer = Block & {
     columns: [Column]
}

type CardsContainer = Block & {
    cards: [Card]
}

type Card = {
     picture: Picture
     block: Block
}

type Column = {
    picture: Picture
    block: Block
}

type Picture = {
    //source: AssetSource

    // enum AssetSource: , Hashable {
    //     case url(url: URL)
    //     case bundledAsset(name: String)
    // }
}



