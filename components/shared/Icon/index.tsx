import React from 'react'

import { TIconName, Icons } from './icons'

type TIconProps = {
  name: TIconName
}

function Icon({ name }: TIconProps) {
  const IconComponent = Icons[name]

  return <IconComponent />
}

export default Icon
