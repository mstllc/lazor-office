import * as Contentful from "contentful";

export interface TypeProjectFields {
    projectName: Contentful.EntryFields.Symbol;
    projectCategory: "cabin" | "commercial" | "home";
    mainImage: Contentful.Asset;
    year: Contentful.EntryFields.Integer;
    location: Contentful.EntryFields.Symbol;
}

export type TypeProject = Contentful.Entry<TypeProjectFields>;
