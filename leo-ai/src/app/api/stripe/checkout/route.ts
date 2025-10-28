import { stripe } from '@/lib/stripeClient';
import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { plan, userId } = await request.json();
  const { data: user, error } = await supabase.from('users').select('*').eq('id', userId).single();

  if (error || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  const priceId = getPriceIdForPlan(plan);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: priceId,
      quantity: 1,
    }],
    mode: 'subscription',
    success_url: `${request.headers.get('origin')}/dashboard`,
    cancel_url: `${request.headers.get('origin')}/pricing`,
    customer_email: user.email,
  });

  return NextResponse.json({ sessionId: session.id });
}

const getPriceIdForPlan = (plan: string) => {
  switch (plan) {
    case 'pro':
      return process.env.STRIPE_PRO_PRICE_ID!;
    case 'enterprise':
      return process.env.STRIPE_ENTERPRISE_PRICE_ID!;
    default:
      return '';
  }
};
