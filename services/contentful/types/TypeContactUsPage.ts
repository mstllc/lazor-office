import * as Contentful from "contentful";

export interface TypeContactUsPageFields {
    introCopy: Contentful.EntryFields.Symbol;
    address: Contentful.EntryFields.Text;
    phoneNumber: Contentful.EntryFields.Symbol;
    emailAddress: Contentful.EntryFields.Symbol;
    production: "No" | "Yes";
    mapImage: Contentful.Asset;
}

export type TypeContactUsPage = Contentful.Entry<TypeContactUsPageFields>;
