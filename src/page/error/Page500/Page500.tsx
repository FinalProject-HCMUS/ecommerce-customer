import React from 'react'
import { Result } from 'antd'

import { BackToHomeButton, LogoutButton } from '../../../components/shared/Button'

const Page500: React.FC = () => {
  return (
    <Result
      className="app-result-page mt-10"
      status="500"
      title="500"
      extra={
        <>
          <BackToHomeButton className="mr-half" />
          <LogoutButton />
        </>
      }
    />
  )
}

export default Page500
