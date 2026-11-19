import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  message?: string
  source?: string
  page?: string
  details?: Array<{ label: string; value: string }>
}

const NewLeadEmail = ({ name, email, phone, message, source, page, details = [] }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`New inquiry from ${name || 'a website visitor'}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>ECHELON PROPERTY GROUP</Text>
        <Heading style={h1}>New inquiry</Heading>
        {source ? <Text style={body}><span style={label}>Form / CTA: </span>{source}</Text> : null}
        <Hr style={rule} />
        <Section>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} href={email ? `mailto:${email}` : undefined} />
          <Row label="Phone" value={phone} href={phone ? `tel:${phone}` : undefined} />
          {details.map((d) => <Row key={d.label} label={d.label} value={d.value} />)}
        </Section>
        {message ? (<><Text style={label}>Message</Text><Text style={body}>{message}</Text></>) : null}
        {page ? (<><Text style={label}>Page</Text><Text style={small}>{page}</Text></>) : null}
      </Container>
    </Body>
  </Html>
)

const Row = ({ label: l, value, href }: { label: string; value?: string; href?: string }) =>
  value ? (
    <Text style={body}><span style={label}>{l}: </span>{href ? <Link href={href} style={link}>{value}</Link> : value}</Text>
  ) : null

export const template = {
  component: NewLeadEmail,
  subject: (d: Record<string, any>) => `New lead: ${d.name || 'Website visitor'}${d.source ? ` (${d.source})` : ''}`,
  displayName: 'New lead notification',
  to: 'taylor@echelonpropertygroup.com',
  previewData: { name: 'Jane Smith', email: 'jane@example.com', phone: '(512) 555-0142', message: 'Interested in off-market homes in Westlake.', source: 'Off-Market Landing Page', page: 'https://www.echelonpropertygroup.com/off-market-real-estate-austin', details: [{ label: 'Budget', value: '$3M-$5M' }] },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Jost, Helvetica, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const eyebrow = { color: '#b9a06c', fontSize: '11px', letterSpacing: '3px', margin: '0 0 8px' }
const h1 = { color: '#0C0F24', fontSize: '22px', fontWeight: 400, margin: '0 0 16px' }
const rule = { borderColor: '#b9a06c', margin: '0 0 20px' }
const label = { color: '#0C0F24', fontWeight: 600, fontSize: '13px', margin: '16px 0 4px' }
const body = { color: '#0C0F24', fontSize: '15px', lineHeight: '1.6', margin: '0 0 6px', whiteSpace: 'pre-wrap' as const }
const small = { color: '#55575d', fontSize: '12px', wordBreak: 'break-all' as const, margin: 0 }
const link = { color: '#0C0F24' }
