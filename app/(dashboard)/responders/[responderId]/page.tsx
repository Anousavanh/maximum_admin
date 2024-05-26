"use client"

import Loader from '@/components/custom ui/Loader'
import ResponderForm from '@/components/responders/ResponderForm'
import React, { useEffect, useState } from 'react'

const ResponderDetails = ({ params }: { params: { responderId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [ResponderDetails, setResponderDetails] = useState<ResponderType | null>(null)

  const getResponderDetails = async () => {
    try { 
      const res = await fetch(`/api/responders/${params.responderId}`, {
        method: "GET"
      })
      const data = await res.json()
      setResponderDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[responderId_GET]", err)
    }
  }

  useEffect(() => {
    getResponderDetails()
  }, [])

  return loading ? <Loader /> : (
    <ResponderForm initialData={ResponderDetails} />
  )
}

export default ResponderDetails