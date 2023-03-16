import * as Contentful from "contentful";
import { TypeProjectFields } from "./TypeProject";

export interface TypeRecognitionFields {
    name: Contentful.EntryFields.Symbol;
    type: "award" | "exhibition" | "publication";
    image: Contentful.Asset;
    projectPageImage?: Contentful.Asset;
    body: Contentful.EntryFields.Text;
    year: Contentful.EntryFields.Integer;
    link?: Contentful.EntryFields.Symbol;
    project?: Contentful.Entry<TypeProjectFields>;
}

export type TypeRecognition = Contentful.Entry<TypeRecognitionFields>;
