import * as Contentful from "contentful";
import { TypeProjectFields } from "./TypeProject";

export interface TypeProjectsListFields {
    name: Contentful.EntryFields.Symbol;
    projects: Contentful.Entry<TypeProjectFields>[];
    production: "Yes";
}

export type TypeProjectsList = Contentful.Entry<TypeProjectsListFields>;
