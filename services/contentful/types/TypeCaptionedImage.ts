import * as Contentful from "contentful";

export interface TypeCaptionedImageFields {
    image: Contentful.Asset;
    caption?: Contentful.EntryFields.Symbol;
}

export type TypeCaptionedImage = Contentful.Entry<TypeCaptionedImageFields>;
