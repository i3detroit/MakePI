export interface StripeWebhookRequest {
  headers: { STRIPE_SIGNATURE: string };
}
