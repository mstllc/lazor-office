import * as Contentful from 'contentful'
import config from '@config'
import { unset } from 'lodash'

import { TypeProjectRecognitionBlockFields, TypeProjectsListFields, TypeRecognitionListFields, TypeWhoWeArePageFields } from './types'

const client = Contentful.createClient({
  space: config.CONTENTFUL_SPACE_ID,
  accessToken: config.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN
})

const previewClient = Contentful.createClient({
  space: config.CONTENTFUL_SPACE_ID,
  accessToken: config.CONTENTFUL_CONTENT_PREVIEW_API_ACCESS_TOKEN,
  host: 'preview.contentful.com'
})

const getClient = (preview: boolean = false) => {
  return preview ? previewClient : client
}

export const getProjectsList = async (preview: boolean = false) => {
  const res = await getClient(preview).withoutUnresolvableLinks.getEntries<TypeProjectsListFields>({ content_type: 'projectsList', include: 10 })

  const list = res.items[0]

  for (const project of list.fields.projects || []) {
    for (const block of (project.fields.blocks || []) as Contentful.Entry<TypeProjectRecognitionBlockFields>[]) {
      if (block.sys.contentType.sys.id === 'projectRecognitionBlock') {
        for (const recognition of block.fields.recognitions) {
          unset(recognition, 'fields.project')
        }
      }
    }
  }

  return list
}

export const getProjectBySlug = async (slug: any, preview: boolean = false) => {
  const res = await getClient(preview).getEntries({
    content_type: 'project',
    limit: 1,
    'fields.slug[in]': slug
  })

  return res.items.length > 0 && res.items[0]
}

export const getRecognitionsList = async (preview: boolean = false) => {
  const res = await getClient(preview).withoutUnresolvableLinks.getEntries<TypeRecognitionListFields>({ content_type: 'recognitionList', include: 2 })

  return res.items[0]
}

export const getWhoWeArePage = async (preview: boolean = false) => {
  const res = await getClient(preview).withoutUnresolvableLinks.getEntries<TypeWhoWeArePageFields>({ content_type: 'whoWeArePage', include: 10 })

  return res.items[0]
}
