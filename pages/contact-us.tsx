import ContactUsTemplate from '@components/templates/ContactUsTemplate'
import { GetStaticProps, NextPage } from 'next'
import * as contentful from '@services/contentful'
import { TypeContactUsPageFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'

type TProps = {
  contactUsPage: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeContactUsPageFields>
}

const ContactUsPage: NextPage<TProps> = ({ contactUsPage }) => {
  return (
    <ContactUsTemplate pageData={contactUsPage} />
  )
}

export default ContactUsPage

export const getStaticProps: GetStaticProps = async (context) => {
  const contactUsPage = await contentful.getContactUsPage(context.preview)

  return {
    props: {
      contactUsPage
    }
  }
}
