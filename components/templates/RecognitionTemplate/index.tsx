import FilterBar from '@components/shared/FilterBar'
import FooterNav from '@components/shared/FooterNav'
import { TypeRecognitionFields } from '@services/contentful/types'
import { Entry } from 'contentful'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import RecognitionItems from './RecognitionItems'
import styles from './RecognitionTemplate.module.scss'

export type TFilteredRecognitionsList = {
  publications?: Entry<TypeRecognitionFields>[]
  awards?: Entry<TypeRecognitionFields>[]
  exhibitions?: Entry<TypeRecognitionFields>[]
}

type TProps = {
  filteredRecognitionsList: TFilteredRecognitionsList
  categoryCounts: {
    all: number
    publication: number
    award: number
    exhibition: number
  }
}

const RecognitionTemplate = ({ filteredRecognitionsList, categoryCounts }: TProps) => {
  const router = useRouter()

  const onFilterChange = useCallback((category: string) => {
    if (router.query.category !== category) {
      router.replace({ query: { ...router.query, category } }, undefined, { shallow: true })
    }
  }, [router])

  return (
    <div className={styles.root}>
      <h1>Awards & <span className="whitespace-nowrap">Recognition –</span></h1>
      <FilterBar
        className={styles['filter-bar']}
        title="Filter Recognition"
        categories={[
          { value: 'all', label: 'All' },
          { value: 'publication', label: 'Publications', count: categoryCounts.publication },
          { value: 'award', label: 'Awards', count: categoryCounts.award },
          { value: 'exhibition', label: 'Exibitions', count: categoryCounts.exhibition },
        ]}
        onFilterChange={onFilterChange}
      />
      <div className={styles.container}>
        {filteredRecognitionsList.publications?.length && <RecognitionItems title="Publications" items={filteredRecognitionsList.publications} />}
        {filteredRecognitionsList.awards?.length && <RecognitionItems title="Awards" items={filteredRecognitionsList.awards} />}
        {filteredRecognitionsList.exhibitions?.length && <RecognitionItems title="Exhibition" items={filteredRecognitionsList.exhibitions} />}
      </div>
      <FooterNav />
    </div>
  )
}

export default RecognitionTemplate
