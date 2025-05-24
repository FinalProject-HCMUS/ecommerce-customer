import React from 'react';
import { Result } from 'antd';

import {
  BackToHomeButton,
  LogoutButton,
} from '../../../components/shared/Button';

const Page403: React.FC = () => {
  return (
    <Result
      className="app-result-page mt-10"
      status="403"
      title="403"
      extra={
        <>
          <BackToHomeButton className="mr-half" />
          <LogoutButton />
        </>
      }
    />
  );
};

export default Page403;
