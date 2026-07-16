// src/pages/FAQ.tsx
import React, { useState } from 'react';
import { Search, ChevronDown, CheckCircle, Send, AlertCircle } from 'lucide-react';
import '../styles/Pages.css';

interface FAQItem {
  id: number;
  category: 'Demos' | 'Careers' | 'Licensing' | 'Royalties' | 'General';
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    category: 'Demos',
    q: 'How do I submit a demo to Sony Music?',
    a: 'Sony Music record labels and staff do not accept unsolicited music demos or pitches. Unsolicited submissions are deleted immediately to protect the creative rights of artists and the company. The best way to get noticed by our A&R scouts is to build your local audience, release your music independently, build your digital footprint on streaming platforms, and perform live.'
  },
  {
    id: 2,
    category: 'Careers',
    q: 'Where can I apply for jobs or internships at Sony Music?',
    a: 'All job vacancies, internship applications, and corporate roles are posted exclusively on the official Sony Music Careers portal at careers.sonymusic.com. We do not accept applications via email or through the general contact form. Beware of recruitment scams: Sony Music representatives will never ask for payment or financial details during the application process.'
  },
  {
    id: 3,
    category: 'Licensing',
    q: 'How can I license a song or video owned by Sony Music?',
    a: 'To request permission to license a Sony Music track, video, or album artwork for commercial use (film, television, advertisements, games), please submit a detailed licensing request through the Sony Music Licensing Portal (sync.sonymusic.com). For non-commercial requests or academic licensing, you can contact the licensing division in your local territory office listed in our Contacts directory.'
  },
  {
    id: 4,
    category: 'Royalties',
    q: 'How do I check my artist royalty statement or update my banking details?',
    a: 'Active Sony Music artists and writers can manage their accounts, review earnings, and check royalty statements through the Sony Music Artist Portal (artisttools.sonymusic.com). For detailed queries regarding banking details, direct deposit updates, tax documents, or portal login issues, please contact your specific royalty team or email royalty.inquiries@sonymusic.com.'
  },
  {
    id: 5,
    category: 'General',
    q: 'Can I use Sony Music recordings on my personal YouTube or social media channels?',
    a: 'Generally, using copyrighted music without a license constitutes copyright infringement. While platforms like YouTube, Instagram, and TikTok have licensing agreements allowing background music, Sony Music reserves all legal rights. If you use copyrighted tracks, your video may be subject to claims, monetization restrictions, or removal requests by the platform\'s automated content systems.'
  }
];

export const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('General');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const toggleAccordion = (id: number) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const filteredFAQs = FAQ_DATA.filter((faq) => {
    return (
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = 'Full Name is required';
    
    if (!email.trim()) {
      tempErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email Address is invalid';
    }
    
    if (!subject.trim()) tempErrors.subject = 'Subject is required';
    if (!message.trim()) tempErrors.message = 'Message content is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccess(true);
      setErrors({});
      // Reset form
      setName('');
      setEmail('');
      setCategory('General');
      setSubject('');
      setMessage('');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="subpage-container animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <header className="page-header">
          <h1 className="page-title">Help Center & FAQ</h1>
          <p className="page-subtitle">
            Find answers to frequently asked questions about demo submissions, licensing, royalties, careers, and general inquiries.
          </p>
          <div className="page-header-underline"></div>
        </header>

        {/* Search Input */}
        <div className="filter-bar-container" style={{ justifyContent: 'center', marginBottom: '3rem' }}>
          <div className="search-input-wrapper" style={{ width: '100%', maxWidth: '600px' }}>
            <Search className="search-icon-pos" size={20} />
            <input
              type="text"
              placeholder="Search FAQ questions, topics, or categories..."
              className="search-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '1rem', padding: '0.85rem 1rem 0.85rem 3rem' }}
            />
          </div>
        </div>

        {/* Accordions */}
        <section aria-label="Frequently Asked Questions Accordion">
          {filteredFAQs.length > 0 ? (
            <div className="faq-accordion-list">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="faq-accordion-item">
                  <button 
                    className="faq-accordion-trigger"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={activeAccordion === faq.id}
                  >
                    <span>[{faq.category.toUpperCase()}] {faq.q}</span>
                    <ChevronDown 
                      size={18} 
                      style={{ 
                        transform: activeAccordion === faq.id ? 'rotate(180deg)' : 'rotate(0)', 
                        transition: 'transform var(--transition-fast)' 
                      }} 
                    />
                  </button>
                  {activeAccordion === faq.id && (
                    <div className="faq-accordion-content">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
              No FAQ items found matching your search.
            </div>
          )}
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="home-section-title" style={{ marginBottom: '1rem' }}>Still Have Questions?</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            If you cannot find the answer to your query in our FAQs, please fill out the contact form below. Our corporate relations team will review your message.
          </p>

          <form onSubmit={handleSubmit} className="contact-form-grid" noValidate>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="form-error-text" style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}><AlertCircle size={12} /> {errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="form-error-text" style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}><AlertCircle size={12} /> {errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="General">General Inquiry</option>
                <option value="Demos">Demo Submissions</option>
                <option value="Licensing">Music Licensing</option>
                <option value="Royalties">Royalty Portal Queries</option>
                <option value="Careers">Careers & Internships</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-input"
                placeholder="Inquiry about..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              {errors.subject && <span className="form-error-text" style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}><AlertCircle size={12} /> {errors.subject}</span>}
            </div>

            <div className="form-group form-full-row">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                placeholder="Describe your question in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {errors.message && <span className="form-error-text" style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}><AlertCircle size={12} /> {errors.message}</span>}
            </div>

            <div className="form-full-row" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
              <button type="submit" className="form-submit-btn">
                <Send size={16} /> Submit Question
              </button>

              {success && (
                <div className="form-success-alert animate-scale-in">
                  <CheckCircle size={20} />
                  <span>Your question has been submitted successfully! We will get back to you shortly.</span>
                </div>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
