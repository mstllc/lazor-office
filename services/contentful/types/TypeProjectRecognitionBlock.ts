import * as Contentful from "contentful";
import { TypeRecognitionFields } from "./TypeRecognition";

export interface TypeProjectRecognitionBlockFields {
    title?: Contentful.EntryFields.Symbol;
    recognitions: Contentful.Entry<TypeRecognitionFields>[];
}

export type TypeProjectRecognitionBlock = Contentful.Entry<TypeProjectRecognitionBlockFields>;
