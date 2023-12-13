import * as Contentful from "contentful";
import { TypeProjectFields } from "./TypeProject";

export interface TypeRecognitionFields {
    name: Contentful.EntryFields.Symbol;
    type: "award" | "exhibition" | "publication";
    image: Contentful.Asset;
    project?: Contentful.Entry<TypeProjectFields>;
    projectPageImage?: Contentful.Asset;
    body: Contentful.EntryFields.Text;
    year: Contentful.EntryFields.Integer;
    link?: Contentful.EntryFields.Symbol;
}

export type TypeRecognition = Contentful.Entry<TypeRecognitionFields>;
