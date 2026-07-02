export default function TermsPage() {
  const sections = [
    { title: '1. Acceptance of Terms', body: 'By accessing or using Social Sync, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use the service.' },
    { title: '2. Description of Service', body: 'Social Sync provides a cloud-based social media management platform including content scheduling, publishing, analytics, AI assistance, and team collaboration tools.' },
    { title: '3. Account Registration', body: 'You must provide accurate and complete registration information. You are responsible for maintaining the security of your account credentials and for all activity under your account.' },
    { title: '4. Acceptable Use', body: 'You agree not to use Social Sync to post illegal content, infringe intellectual property, spam, harass, or violate the terms of service of any connected social media platform.' },
    { title: '5. Subscription and Billing', body: 'Paid plans are billed monthly or annually in advance. All fees are non-refundable except where required by law. We reserve the right to change pricing with 30 days\' notice.' },
    { title: '6. Intellectual Property', body: 'Social Sync retains all rights to the platform, software, and associated intellectual property. You retain ownership of all content you create and publish through the platform.' },
    { title: '7. Service Availability', body: 'We aim for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance. We are not liable for downtime caused by third-party platforms.' },
    { title: '8. Termination', body: 'You may cancel your account at any time. We may terminate accounts that violate these terms. Upon termination, your data will be retained for 30 days before permanent deletion.' },
    { title: '9. Limitation of Liability', body: 'To the fullest extent permitted by law, Social Sync shall not be liable for indirect, incidental, special, or consequential damages arising out of your use of the service.' },
    { title: '10. Governing Law', body: 'These terms are governed by the laws of the State of New York, USA, without regard to conflict of law principles.' },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-primary mb-2">Terms &amp; Conditions</h1>
      <p className="text-muted text-sm mb-10">Last updated: January 1, 2026</p>
      <p className="text-secondary mb-10 leading-relaxed">Please read these Terms of Service carefully before using Social Sync. These terms govern your access to and use of our platform.</p>
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="text-lg font-semibold text-primary mb-3">{s.title}</h2>
            <p className="text-secondary text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
