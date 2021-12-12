import { CardElement, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions, Stripe } from '@stripe/stripe-js';
import { useState } from 'react';

export const CheckoutForm = ({ stripe }: { stripe: Promise<Stripe> }) => {
  const elements = useElements();
  const [id, setId] = useState('');
  const [complete, setComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (elements == null) {
      return;
    }

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await (
      await stripe
    ).createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) return console.error(error);

    setId(paymentMethod?.id);
    card.clear();
  };

  const options: StripeCardElementOptions = {
    classes: {
      base: 'form-control',
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Card details</label>
        <CardElement
          options={options}
          onChange={(e) => setComplete(e.complete)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mb-3"
        disabled={!complete}
      >
        Pay
      </button>
      <input value={id} className="form-control" readOnly />
    </form>
  );
};
