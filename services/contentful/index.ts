import * as Contentful from 'contentful'
import config from '@config'

import { TypeProjectsListFields, TypeProjectFields } from './types'

const client = Contentful.createClient({
  space: config.CONTENTFUL_SPACE_ID,
  accessToken: config.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN
})

export const getProjectsList = async () => {
  const res = await client.withoutUnresolvableLinks.getEntries<TypeProjectsListFields>({ content_type: 'projectsList' })

  return res.items[0]
}
