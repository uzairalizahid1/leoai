import { stripe } from '@/lib/stripeClient';
import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const { data: user } = await supabase.from('users').select('id').eq('email', session.customer_email).single();
      if (user) {
        await supabase.from('subscriptions').insert({
          user_id: user.id,
          plan: 'Pro', // Placeholder
          status: 'active',
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription,
        });
      }
      break;
    // Add other event types as needed
  }

  return NextResponse.json({ received: true });
}
