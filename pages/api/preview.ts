import { NextApiHandler } from 'next'
import config from '@config'
import { getProjectBySlug } from '@services/contentful'

const handler: NextApiHandler = async (req, res) => {
  const { secret, type, slug } = req.query

  if (secret !== config.CONTENT_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid content preview secret' })
  }

  const project = await getProjectBySlug(slug, true)
  if (!project) {
    return res.status(401).json({ message: 'Invalid project slug' })
  }

  res.setPreviewData({})

  const url = `/projects/${slug}`
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`
  )
  res.end()
}

export default handler
