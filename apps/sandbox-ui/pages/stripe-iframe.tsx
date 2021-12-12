import { Card, Container } from 'react-bootstrap';
import React from 'react';
import { CheckoutForm } from '../elements/stripe-checkout-form';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export function Index() {
  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return (
    <Container>
      <Card className="mx-auto mb-2" style={{ width: '50rem' }}>
        <Card.Header>Stripe Iframe</Card.Header>
        <Card.Body>
          <Elements stripe={stripe}>
            <CheckoutForm stripe={stripe} />
          </Elements>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Index;
