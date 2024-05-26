"use client"

import Loader from '@/components/custom ui/Loader'
import ProductScreenForm from '@/components/productscreens/ProductScreenForm'
import React, { useEffect, useState } from 'react'

const ProductScreenDetails = ({ params }: { params: { productscreenId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [ProductScreenDetails, setProductScreenDetails] = useState<ProductScreenType | null>(null)

  const getProductScreenDetails = async () => {
    try { 
      const res = await fetch(`/api/productscreens/${params.productscreenId}`, {
        method: "GET"
      })
      const data = await res.json()
      setProductScreenDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[productscreenId_GET]", err)
    }
  }

  useEffect(() => {
    getProductScreenDetails()
  }, [])

  return loading ? <Loader /> : (
    <ProductScreenForm initialData={ProductScreenDetails} />
  )
}

export default ProductScreenDetails