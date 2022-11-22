import * as Contentful from "contentful";
import { TypeHeroImageWithCropsFields } from "./TypeHeroImageWithCrops";
import { TypeProjectDetailsFields } from "./TypeProjectDetails";
import { TypeProjectHotspotsBlockFields } from "./TypeProjectHotspotsBlock";
import { TypeProjectImagesBlockFields } from "./TypeProjectImagesBlock";
import { TypeProjectQuoteBlockFields } from "./TypeProjectQuoteBlock";
import { TypeProjectRecognitionBlockFields } from "./TypeProjectRecognitionBlock";

export interface TypeProjectFields {
    projectName: Contentful.EntryFields.Symbol;
    slug: Contentful.EntryFields.Symbol;
    projectCategory: "cabin" | "commercial" | "home";
    showOnHome?: Contentful.EntryFields.Boolean;
    heroImage: Contentful.Entry<TypeHeroImageWithCropsFields>;
    year: Contentful.EntryFields.Integer;
    location: Contentful.EntryFields.Symbol;
    headline: Contentful.EntryFields.Symbol;
    intro: Contentful.EntryFields.Text;
    blocks: Contentful.Entry<TypeProjectDetailsFields | TypeProjectHotspotsBlockFields | TypeProjectImagesBlockFields | TypeProjectQuoteBlockFields | TypeProjectRecognitionBlockFields>[];
}

export type TypeProject = Contentful.Entry<TypeProjectFields>;
