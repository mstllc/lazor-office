import FooterNav from '@components/shared/FooterNav'
import styles from './ContactUsTemplate.module.scss'
import Icon from '@components/shared/Icon'
import Image from 'next/image'

const ContactUsTemplate = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>Contact Us –</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed fermentum arcu, </p>
            <button>Start Your Project <Icon name="RightCaret" /></button>
          </div>
          <div className={styles.address}>
            <p>Lazor/Office</p>
            <p>45 University Avenue SE<br />#413<br />Minneapolis, MN 55414</p>
            <p>612.812.3548<br />Info@lazoroffice.com</p>
          </div>
        </div>
        <div className={styles.map}>
          <Image
            src="https://images.ctfassets.net/aux4g6fwhyxo/2MGLa1NXRkRJA96Okr3TFq/d1a81b5bb670b2cfa74a68a7878c02cf/Screen_Shot_2021-02-22_at_9.25.51_PM.png"
            alt="contact us map"
            width={1798}
            height={780}
          />
        </div>
      </div>

      <FooterNav />
    </div>
  )
}

export default ContactUsTemplate
