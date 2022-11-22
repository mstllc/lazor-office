import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";

export interface TypeProjectHotspotsBlockFields {
    leftImage: Contentful.Asset;
    leftHotspotContent?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    leftHotspotPositionTop?: Contentful.EntryFields.Number;
    leftHotspotPositionLeft?: Contentful.EntryFields.Number;
    rightImage: Contentful.Asset;
    rightHotspotContent?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    rightHotspotPositionTop?: Contentful.EntryFields.Number;
    rightHotspotPositionLeft?: Contentful.EntryFields.Number;
}

export type TypeProjectHotspotsBlock = Contentful.Entry<TypeProjectHotspotsBlockFields>;
