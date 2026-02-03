import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, market_interest, business_type } = body

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, market_interest, business_type }])
      .select()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already on waitlist' }, { status: 200 })
      }
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data, message: 'Added to waitlist' })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ data })
}
