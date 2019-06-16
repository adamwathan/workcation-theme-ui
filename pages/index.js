/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import PropertyCard from '../components/PropertyCard'

export default function Home() {
  const property = {
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beds: 3,
    baths: 2,
    title: "Modern home in city center",
    price: 190000,
    reviewCount: 34,
    rating: 4,
  }

  return (
    <div css={{
      padding: 6
    }}>
      <PropertyCard property={property}/>
    </div>
  )
}
