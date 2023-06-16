import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";
import { TypeBioFields } from "./TypeBio";
import { TypeCaptionedImageFields } from "./TypeCaptionedImage";

export interface TypeWhoWeArePageFields {
    headline: Contentful.EntryFields.Symbol;
    body: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    slides?: Contentful.Entry<TypeCaptionedImageFields>[];
    bios?: Contentful.Entry<TypeBioFields>[];
    production: "Yes";
}

export type TypeWhoWeArePage = Contentful.Entry<TypeWhoWeArePageFields>;
