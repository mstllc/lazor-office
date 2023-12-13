import Icon from '@components/shared/Icon'
import { TypeRecognitionFields } from '@services/contentful/types'
import { Entry } from 'contentful'
import Image from 'next/image'
import styles from './RecognitionItems.module.scss'
import Link from 'next/link'

type TProps = {
  title: string
  items: Entry<TypeRecognitionFields>[]
}

const RecognitionItems = ({ title, items }: TProps) => {
  return (
    <div className={styles.root}>
      <h2>{title}</h2>
      <div className={styles.items}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            {item.fields.link
              ? <a href={item.fields.link} target="_blank" rel="noreferrer"><div className={styles.image}>
                <Image
                  src={`https:${item.fields.image.fields.file!.url}`}
                  alt={item.fields.image.fields.title}
                  width={item.fields.image.fields.file!.details.image?.width}
                  height={item.fields.image.fields.file!.details.image?.height}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div></a>
              : <div className={styles.image}>
                <Image
                  src={`https:${item.fields.image.fields.file!.url}`}
                  alt={item.fields.image.fields.title}
                  width={item.fields.image.fields.file!.details.image?.width}
                  height={item.fields.image.fields.file!.details.image?.height}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            }
            <div className={styles.name}>
              {item.fields.link
                ? <a href={item.fields.link} target="_blank" rel="noreferrer"><h3>{item.fields.name}<Icon name="Link" /></h3></a>
                : <h3>{item.fields.name}</h3>
              }
            </div>
            <h3>{item.fields.year}</h3>
            <p>{item.fields.body}</p>
            {item.fields.project &&
              <Link href={`/projects/${item.fields.project.fields.slug}`}>
                <a>View Project</a>
              </Link>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecognitionItems
