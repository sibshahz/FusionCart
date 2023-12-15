import React from 'react'
import Link from 'next/link'

type Props = {}

function NotFound({}: Props) {
  return (
    <div>
      <p>Looks like you are lost kid! hehehe</p>
      <p>
        <Link href="/">Return to home</Link>
      </p>
    </div>
  )
}

export default NotFound