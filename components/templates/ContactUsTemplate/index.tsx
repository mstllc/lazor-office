import FooterNav from '@components/shared/FooterNav'
import styles from './ContactUsTemplate.module.scss'
import Icon from '@components/shared/Icon'
import Image from 'next/image'
import { TypeContactUsPageFields } from '@services/contentful/types'
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from 'contentful'

type TProps = {
  pageData: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeContactUsPageFields>
}

const ContactUsTemplate = ({ pageData }: TProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>Contact Us –</h1>
            <p>{pageData.fields.introCopy}</p>
            <button>Start Your Project <Icon name="RightCaret" /></button>
          </div>
          <div className={styles.address}>
            <p>Lazor/Office</p>
            <p dangerouslySetInnerHTML={{ __html: pageData.fields.address.replace(/\n/g, '<br>') }} />
            <p>
              <a href={`tel:${pageData.fields.phoneNumber}`}>{pageData.fields.phoneNumber}</a>
              <br />
              <a href={`mailto:${pageData.fields.emailAddress}`}>{pageData.fields.emailAddress}</a>
            </p>
          </div>
        </div>
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            <Image
              src={`https:${pageData.fields.mapImage!.fields.file!.url}`}
              alt={pageData.fields.mapImage!.fields.title}
              width={pageData.fields.mapImage!.fields.file!.details.image!.width}
              height={pageData.fields.mapImage!.fields.file!.details.image!.height}
              layout='fill'
              objectFit='cover'
              objectPosition='center center'
            />
          </div>
        </div>
      </div>

      <FooterNav />
    </div>
  )
}

export default ContactUsTemplate
