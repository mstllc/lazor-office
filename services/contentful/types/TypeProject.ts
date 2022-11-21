import * as Contentful from "contentful";
import { TypeHeroImageWithCropsFields } from "./TypeHeroImageWithCrops";

export interface TypeProjectFields {
    projectName: Contentful.EntryFields.Symbol;
    heroImage: Contentful.Entry<TypeHeroImageWithCropsFields>;
    projectCategory: "cabin" | "commercial" | "home";
    year: Contentful.EntryFields.Integer;
    location: Contentful.EntryFields.Symbol;
    showOnHome?: Contentful.EntryFields.Boolean;
}

export type TypeProject = Contentful.Entry<TypeProjectFields>;
