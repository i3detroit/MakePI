import { CardElement, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions, Stripe } from '@stripe/stripe-js';

export const CheckoutForm = ({ stripe }: { stripe: Promise<Stripe> }) => {
  const elements = useElements();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (elements == null) {
      return;
    }

    console.log(e);
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
          onReady={() => {
            console.log('CardElement [ready]');
          }}
          onChange={(e) => {
            console.log('CardElement [change]', e);
          }}
          onBlur={() => {
            console.log('CardElement [blur]');
          }}
          onFocus={() => {
            console.log('CardElement [focus]');
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!stripe || !elements}
      >
        Pay
      </button>
    </form>
  );
};
