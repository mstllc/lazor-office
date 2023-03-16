import * as Contentful from "contentful";
import { TypeRecognitionFields } from "./TypeRecognition";

export interface TypeRecognitionListFields {
    title: Contentful.EntryFields.Symbol;
    publications?: Contentful.Entry<TypeRecognitionFields>[];
    awards?: Contentful.Entry<TypeRecognitionFields>[];
    exhibitions?: Contentful.Entry<TypeRecognitionFields>[];
    production: "Yes";
}

export type TypeRecognitionList = Contentful.Entry<TypeRecognitionListFields>;
