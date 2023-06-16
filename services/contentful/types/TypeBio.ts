import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";

export interface TypeBioFields {
    name: Contentful.EntryFields.Symbol;
    title: Contentful.EntryFields.Symbol;
    image: Contentful.Asset;
    quote?: Contentful.EntryFields.Text;
    body: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    details?: Contentful.EntryFields.Object;
}

export type TypeBio = Contentful.Entry<TypeBioFields>;
