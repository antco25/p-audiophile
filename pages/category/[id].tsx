import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

const CategoryDetails = () => {
  const router = useRouter()
  const { id } = router.query;

  return (
    <div>
      <p>Category : {id}</p>
      <Link href='/products/1'>Product 1</Link>
    </div>
  )
}

export default CategoryDetails