import * as Contentful from "contentful";

export interface TypeProjectDetailsFields {
    name: Contentful.EntryFields.Symbol;
    fields: Contentful.EntryFields.Object;
}

export type TypeProjectDetails = Contentful.Entry<TypeProjectDetailsFields>;
