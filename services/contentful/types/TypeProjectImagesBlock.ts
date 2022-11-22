import * as Contentful from "contentful";

export interface TypeProjectImagesBlockFields {
    images: Contentful.Asset[];
    headline?: Contentful.EntryFields.Symbol;
    body?: Contentful.EntryFields.Text;
    textOnLeft?: Contentful.EntryFields.Boolean;
}

export type TypeProjectImagesBlock = Contentful.Entry<TypeProjectImagesBlockFields>;
