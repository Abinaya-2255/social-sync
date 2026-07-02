export default function PrivacyPolicyPage() {
  const sections = [
    { title: '1. Information We Collect', body: 'We collect information you provide directly (name, email, billing info), information generated through your use of the platform (posts, analytics, workspace configurations), and technical data (IP address, browser type, usage logs) for security and performance purposes.' },
    { title: '2. How We Use Your Information', body: 'We use your data to deliver, improve, and personalize the Social Sync platform; process payments; send transactional and product communications; provide customer support; analyze usage trends; and comply with legal obligations.' },
    { title: '3. Social Platform Connections', body: 'When you connect a social media account, we access only the permissions required to schedule and publish on your behalf via OAuth 2.0. We never store your social media username or password. You can revoke access at any time from your settings or directly from the platform.' },
    { title: '4. Data Sharing', body: 'We do not sell your personal data. We share data only with: service providers who help us operate (hosting, payments, analytics); legal authorities when required by law; and business partners only with your explicit consent.' },
    { title: '5. Data Retention', body: 'Your data is retained while your account is active and for 30 days after cancellation. You may request permanent deletion of your account and all associated data by contacting hello@socialsync.app.' },
    { title: '6. Security', body: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We conduct regular security audits and penetration tests. Access to production systems is restricted to authorized personnel only.' },
    { title: '7. Your Rights', body: 'Depending on your location, you may have rights to access, correct, delete, or export your personal data. Submit requests to hello@socialsync.app. We respond within 30 days.' },
    { title: '8. Cookies', body: 'We use strictly necessary cookies for authentication and session management, and optional analytics cookies to understand platform usage. You can manage cookie preferences in your browser settings.' },
    { title: '9. Changes to This Policy', body: 'We may update this policy periodically. Significant changes will be communicated via email or an in-app notification at least 14 days before they take effect.' },
    { title: '10. Contact', body: 'Privacy questions? Contact our Data Protection Officer at privacy@socialsync.app or write to Social Sync, Inc., 123 Tech Avenue, New York, NY 10001.' },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-primary mb-2">Privacy Policy</h1>
      <p className="text-muted text-sm mb-10">Last updated: January 1, 2026</p>
      <p className="text-secondary mb-10 leading-relaxed">This Privacy Policy explains how Social Sync, Inc. ("Social Sync", "we", "us", or "our") collects, uses, and protects your information when you use our platform and services.</p>
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-primary mb-3">{section.title}</h2>
            <p className="text-secondary text-sm leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
