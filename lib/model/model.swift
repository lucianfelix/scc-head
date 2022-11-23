//
//  Page.swift
//  hlx.rna
//
//  Created by Ghita Lucian on 27.09.22.
//

import Foundation
import SwiftUI

struct Page: Equatable {
    let metadata: Metadata
    var title: String
    var sections: [Section]
}

struct Metadata: Equatable {}

struct Section: Identifiable, Equatable {
    var blocks: [Block]
    
    let id = UUID()
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}

enum Block: Identifiable, Equatable, Hashable {
    
    case hero(text: String, picture: Picture)
    case header(text: String)
    case columnsContainer(columns: [Section])
    case cardsContainer(cards: [Card])
    
    var id: Self { self }
    
    func hash(into hasher: inout Hasher) {
        switch self {
        case let .hero(text, _):
            hasher.combine(text)
        case let .header(text):
            hasher.combine(text)
        case let .columnsContainer(columns):
            hasher.combine(columns[0].id)
        case let .cardsContainer(cards):
            hasher.combine(cards)
        }
    }
}

struct Card: Identifiable, Hashable {
    let picture: Picture
    let block: Block
    
    let id = UUID()
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}

struct Picture: Equatable, Hashable {
    let source: AssetSource
    
    enum AssetSource: Equatable, Hashable {
        case url(url: URL)
        case bundledAsset(name: String)
        
        func hash(into hasher: inout Hasher) {
            switch self {
            case let .url(url):
                hasher.combine(url)
            case let .bundledAsset(name):
                hasher.combine(name)
            }
        }
    }
    
    let id = UUID()
    func hash(into hasher: inout Hasher) {
        //hasher.combine(source)
        hasher.combine(id)
    }
}



