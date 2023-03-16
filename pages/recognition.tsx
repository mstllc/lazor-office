import RecognitionTemplate, { TFilteredRecognitionsList } from "@components/templates/RecognitionTemplate"
import { GetStaticProps, NextPage } from "next"
import * as contentful from '@services/contentful'
import { TypeRecognitionListFields } from "@services/contentful/types"
import { EntryWithLinkResolutionAndWithoutUnresolvableLinks } from "contentful"
import { useMemo } from "react"
import { useRouter } from "next/router"

type TProps = {
  recognitionsList: EntryWithLinkResolutionAndWithoutUnresolvableLinks<TypeRecognitionListFields>
}

const RecognitionPage: NextPage<TProps> = ({ recognitionsList }: TProps) => {
  const router = useRouter()
  const params = Object.fromEntries(new URLSearchParams(router.asPath.includes('?') ? router.asPath.split('?').pop() : ''))
  const category = params.category

  const filteredRecognitionsList = useMemo(() => {
    const categories: TFilteredRecognitionsList = {}

    switch (category) {
      case 'publication':
        categories.publications = recognitionsList.fields.publications || []
        break
      case 'award':
        categories.awards = recognitionsList.fields.awards || []
        break
      case 'exhibition':
        categories.exhibitions = recognitionsList.fields.exhibitions || []
        break
      default:
        categories.publications = recognitionsList.fields.publications || []
        categories.awards = recognitionsList.fields.awards || []
        categories.exhibitions = recognitionsList.fields.exhibitions || []
    }

    return categories
  }, [category, recognitionsList])

  const categoryCounts = useMemo(() => {
    const counts = {
      all: 0,
      publication: 0,
      award: 0,
      exhibition: 0
    }

    counts.publication = (recognitionsList.fields.publications || []).length
    counts.award = (recognitionsList.fields.awards || []).length
    counts.exhibition = (recognitionsList.fields.exhibitions || []).length
    counts.all = counts.publication + counts.award + counts.exhibition

    return counts
  }, [recognitionsList])

  return <RecognitionTemplate filteredRecognitionsList={filteredRecognitionsList} categoryCounts={categoryCounts} />
}

export default RecognitionPage

export const getStaticProps: GetStaticProps = async (context) => {
  const recognitionsList = await contentful.getRecognitionsList(context.preview)

  return {
    props: {
      recognitionsList
    }
  }
}
