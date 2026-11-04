import Lenis from 'lenis'
import { useEffect } from 'react'
import { Diagnostic } from './components/Diagnostic'
import { Footer, MobileBar, WhatsAppFloat } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Cases, Compare, Faq, HowItWorks, Logos, Modules, Testimonials } from './components/Sections'
import { FAQ } from './lib/content'

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      name: 'Unect Jr.',
      url: 'https://unect.com.br',
      logo: 'https://unect.com.br/icon-512.png',
      email: 'unect@unect.com.br',
      telephone: '+55-43-8869-6363',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua dos Expedicionários, 568, Sala Q 103-B, Vila Daher',
        addressLocality: 'Cornélio Procópio',
        addressRegion: 'PR',
        addressCountry: 'BR',
      },
      areaServed: ['Cornélio Procópio', 'Norte do Paraná'],
      sameAs: ['https://instagram.com/unectjr', 'https://facebook.com/unectjr', 'https://linkedin.com/company/unectjr'],
    },
    {
      '@type': 'Service',
      name: 'Sistema de gestão sob medida',
      provider: { '@type': 'Organization', name: 'Unect Jr.' },
      areaServed: 'Norte do Paraná',
      description: 'Sistema web de gestão com financeiro, DRE, estoque, ordens de serviço, dashboards e automações.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export default function App() {
  // Rolagem suave (Lenis), desligada com prefers-reduced-motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -88 } })
    let raf = 0
    const loop = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-ink px-4 py-3 font-semibold text-bg focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <div id="top" />
      <Header />
      <main id="conteudo">
        <Hero />
        <Logos />
        <Compare />
        <Modules />
        <HowItWorks />
        <Cases />
        <Testimonials />
        <Faq />
        <Diagnostic />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
    </>
  )
}
