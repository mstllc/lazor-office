import * as Contentful from "contentful";

export interface TypeProjectQuoteBlockFields {
    quote: Contentful.EntryFields.Symbol;
    attribution?: Contentful.EntryFields.Symbol;
}

export type TypeProjectQuoteBlock = Contentful.Entry<TypeProjectQuoteBlockFields>;
