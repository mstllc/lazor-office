import * as Contentful from "contentful";

export interface TypeHeroImageWithCropsFields {
    title: Contentful.EntryFields.Symbol;
    image: Contentful.Asset;
    projectListCrop: Contentful.EntryFields.Object;
}

export type TypeHeroImageWithCrops = Contentful.Entry<TypeHeroImageWithCropsFields>;
