const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable]
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable
  }
}

const config = {
  CONTENTFUL_SPACE_ID: getEnvironmentVariable('CONTENTFUL_SPACE_ID'),
  CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN: getEnvironmentVariable('CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN'),
  CONTENTFUL_CONTENT_PREVIEW_API_ACCESS_TOKEN: getEnvironmentVariable('CONTENTFUL_CONTENT_PREVIEW_API_ACCESS_TOKEN'),
  CONTENT_PREVIEW_SECRET: getEnvironmentVariable('CONTENT_PREVIEW_SECRET')
}

export default config
