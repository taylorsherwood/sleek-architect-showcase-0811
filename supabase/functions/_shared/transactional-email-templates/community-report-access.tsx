import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { firstName?: string; communityName?: string; link?: string }

const Email = ({ firstName, communityName, link }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {communityName || 'neighborhood'} briefing from Echelon Property Group</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>ECHELON PROPERTY GROUP</Text>
        <Heading style={h1}>Your {communityName || 'neighborhood'} briefing</Heading>
        <Text style={text}>{firstName ? `${firstName}, thank you` : 'Thank you'} for your request. Your private briefing is ready.</Text>
        {link ? <Button href={link} style={button}>Open the briefing</Button> : null}
        <Text style={small}>This link is personal to you and stays active for 30 days.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, unknown>) => `Your ${d.communityName || 'neighborhood'} briefing`,
  displayName: 'Neighborhood report access',
  previewData: { firstName: 'Jane', communityName: 'Tarrytown', link: 'https://www.echelonpropertygroup.com' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const eyebrow = { color: '#b9a06c', fontSize: '11px', letterSpacing: '3px', margin: '0 0 16px' }
const h1 = { color: '#0C0F24', fontSize: '26px', fontWeight: 'normal', margin: '0 0 18px' }
const text = { color: '#0C0F24', fontSize: '15px', lineHeight: '1.6', margin: '0 0 24px' }
const button = { backgroundColor: '#0C0F24', color: '#F5F3EF', padding: '14px 28px', fontSize: '12px', letterSpacing: '2px', textDecoration: 'none' }
const small = { color: '#555555', fontSize: '12px', margin: '24px 0 0' }
