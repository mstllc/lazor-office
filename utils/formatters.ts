export const projectCategoryTitle = (category: "cabin" | "commercial" | "home") => {
  switch (category) {
    case 'cabin':
      return 'Cabin'
    case 'commercial':
      return 'Commercial'
    case 'home':
      return 'Residential'
  }
}
