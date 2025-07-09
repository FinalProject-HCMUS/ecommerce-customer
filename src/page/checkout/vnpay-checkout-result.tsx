import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Result, Button } from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';
import Breadcrumb from '../../components/shared/Breadcrumb';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ResultContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

const VNPayCheckoutResult: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const statusCode = useParams<{ statusCode: string }>().statusCode;

  // Render different content based on payment status
  const renderStatusContent = () => {
    switch (statusCode) {
      case 'success':
        return (
          <Result
            icon={<CheckCircleFilled style={{ color: '#52c41a' }} />}
            status="success"
            title={t('checkout.paymentSuccess')}
            subTitle={t('checkout.paymentSuccessDescription')}
            extra={[
              <Button
                type="primary"
                key="orders"
                onClick={() => navigate('/orders')}
              >
                {t('checkout.viewOrders')}
              </Button>,
              <Button key="home" onClick={() => navigate('/')}>
                {t('checkout.continueShopping')}
              </Button>,
            ]}
          />
        );

      case 'failure':
        return (
          <Result
            icon={<CloseCircleFilled style={{ color: '#ff4d4f' }} />}
            status="error"
            title={t('checkout.paymentFailed')}
            subTitle={t('checkout.paymentFailedDescription')}
            extra={[
              <Button key="cart" onClick={() => navigate('/cart')}>
                {t('btn.backToCart')}
              </Button>,
            ]}
          />
        );

      case 'error':
      default:
        return (
          <Result
            icon={<ExclamationCircleFilled style={{ color: '#faad14' }} />}
            status="warning"
            title={t('checkout.paymentError')}
            subTitle={t('checkout.paymentErrorDescription')}
            extra={[
              <Button
                type="primary"
                key="contact"
                onClick={() => navigate('/chat')}
              >
                {t('checkout.contactSupport')}
              </Button>,
              <Button key="cart" onClick={() => navigate('/cart')}>
                {t('btn.backToCart')}
              </Button>,
            ]}
          />
        );
    }
  };

  return (
    <Container>
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.checkout'), path: '/checkout' },
          { label: t('breadcrumb.paymentResult'), path: '' },
        ]}
      />

      <ResultContainer>{renderStatusContent()}</ResultContainer>
    </Container>
  );
};

export default VNPayCheckoutResult;
