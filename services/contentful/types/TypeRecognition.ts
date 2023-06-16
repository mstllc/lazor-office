import * as Contentful from "contentful";

export interface TypeRecognitionFields {
    name: Contentful.EntryFields.Symbol;
    type: "award" | "exhibition" | "publication";
    image: Contentful.Asset;
    projectPageImage?: Contentful.Asset;
    body: Contentful.EntryFields.Text;
    year: Contentful.EntryFields.Integer;
    link?: Contentful.EntryFields.Symbol;
}

export type TypeRecognition = Contentful.Entry<TypeRecognitionFields>;
