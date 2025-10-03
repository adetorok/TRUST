import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('sponsor');
  const [successEmail, setSuccessEmail] = useState('');

  const beforeData = {
    labels: ['Unqualified Leads', 'Contacted but Lost', 'Enrolled'],
    datasets: [{
      label: 'Lead Outcomes',
      data: [85, 13, 2],
      backgroundColor: ['#fecaca', '#fca5a5', '#dc2626'],
      borderColor: '#f8fafc',
      borderWidth: 4,
    }]
  };

  const afterData = {
    labels: ['Unqualified Leads', 'Contacted but Lost', 'Enrolled'],
    datasets: [{
      label: 'Lead Outcomes',
      data: [30, 20, 50],
      backgroundColor: ['#a7f3d0', '#6ee7b7', '#10b981'],
      borderColor: '#f8fafc',
      borderWidth: 4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  const handleRequestProposalClick = (type) => {
    setFormType(type);
    setShowForm(true);
    setSuccessEmail(''); // Clear previous success message
    // Scroll to the form
    setTimeout(() => {
      const formElement = document.getElementById('contact-form-section');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFormSuccess = (email) => {
    setSuccessEmail(email);
    setShowForm(false);
  };

  // Handle scroll to contact section when URL hash is #contact
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        const contactElement = document.getElementById('contact-form-section');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="text-slate-800">
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Accelerate Your Clinical Trial Recruitment Success
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto mb-10">
            TRACS specializes in high-touch, human-first patient recruitment, delivering <span className="font-semibold text-teal-700">3x higher enrollment rates</span> and a <span className="font-semibold text-teal-700">50% reduction in screen failures</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact-form-section"
              onClick={(e) => {
                e.preventDefault();
                const contactElement = document.getElementById('contact-form-section');
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-teal-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-lg text-lg text-center"
            >
              I'm a Sponsor / CRO
            </a>
            <a
              href="#contact-form-section"
              onClick={(e) => {
                e.preventDefault();
                const contactElement = document.getElementById('contact-form-section');
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-teal-600 border-2 border-teal-600 font-bold px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors shadow-lg text-lg text-center"
            >
              I'm a Site / Vendor
            </a>
          </div>
        </div>
        {/* Background elements for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-64 h-64 bg-teal-200 rounded-full -top-20 -left-20 opacity-20"></div>
          <div className="absolute w-96 h-96 bg-blue-200 rounded-full -bottom-40 -right-40 opacity-20"></div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              We Solve the #1 Challenge in Clinical Trials:
            </h2>
            <p className="text-xl text-teal-700 font-semibold">
              Finding and enrolling the right patients, faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-slate-50 rounded-xl shadow-md border border-slate-200">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Strategic "Boots-on-the-Ground" Outreach</h3>
              <p className="text-slate-600">
                Our teams engage directly with communities, building trust and identifying genuinely interested participants where they are.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl shadow-md border border-slate-200">
              <div className="text-5xl mb-4">🩺</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Rigorous Nurse-Led Pre-Screening</h3>
              <p className="text-slate-600">
                Licensed nurses meticulously pre-screen every lead against protocol criteria, drastically reducing screen failures.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl shadow-md border border-slate-200">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Complete Project Management</h3>
              <p className="text-slate-600">
                From IRB support to scheduling, we manage the entire recruitment process, freeing up your team's valuable time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-slate-600">
              Comprehensive patient recruitment solutions tailored to your study needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Marketing & Materials */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg border border-purple-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📢</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Marketing & Materials</h3>
              </div>
              <p className="text-slate-700 mb-6 text-lg">
                Professional, study-specific marketing materials designed to capture attention and drive engagement.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom promotional materials
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Professional flyers & brochures
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Study-specific folders & handouts
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Branded recruitment materials
                </li>
              </ul>
            </div>

            {/* Digital Presence */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-2xl shadow-lg border border-teal-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Digital Presence</h3>
              </div>
              <p className="text-slate-700 mb-6 text-lg">
                Professional landing pages and digital platforms to capture interest and facilitate referrals.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-teal-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom landing page websites
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-teal-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Interest capture forms
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-teal-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Referral tracking systems
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-teal-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mobile-optimized design
                </li>
              </ul>
            </div>

            {/* Community Outreach */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg border border-orange-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Community Outreach</h3>
              </div>
              <p className="text-slate-700 mb-6 text-lg">
                Boots-on-the-ground approach targeting high-traffic locations and community hubs.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  High-traffic location visits
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Major landmark engagement
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Community event participation
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Direct patient engagement
                </li>
              </ul>
            </div>

            {/* Clinical Support */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg border border-green-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🩺</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Clinical Support</h3>
              </div>
              <p className="text-slate-700 mb-6 text-lg">
                Licensed nurse pre-screening and dedicated project management to ensure study success.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Licensed nurse pre-screening
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Eligibility verification
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dedicated project manager
                </li>
                <li className="flex items-center text-slate-700">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  KPI monitoring & reporting
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to accelerate your study enrollment?
            </h3>
            <p className="text-lg text-slate-600 mb-8">
              Let's discuss how our comprehensive services can meet your specific study requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact-form-section"
                onClick={(e) => {
                  e.preventDefault();
                  const contactElement = document.getElementById('contact-form-section');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-teal-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors shadow-lg text-lg text-center"
              >
                I'm a Sponsor / CRO
              </a>
              <a
                href="#contact-form-section"
                onClick={(e) => {
                  e.preventDefault();
                  const contactElement = document.getElementById('contact-form-section');
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-teal-600 border-2 border-teal-600 font-bold px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors shadow-lg text-lg text-center"
              >
                I'm a Site / Vendor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section id="proven-results" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-slate-600">
              See the difference our approach makes in patient recruitment outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Before TRACS</h3>
              <div className="h-64 flex items-center justify-center">
                <Doughnut data={beforeData} options={chartOptions} />
              </div>
              <p className="text-slate-600 text-center mt-4">
                Traditional recruitment methods yield low enrollment rates
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">With TRACS</h3>
              <div className="h-64 flex items-center justify-center">
                <Doughnut data={afterData} options={chartOptions} />
              </div>
              <p className="text-slate-600 text-center mt-4">
                Our approach delivers 3x higher enrollment rates
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">3x</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Higher Enrollment</div>
              <div className="text-slate-600">Compared to traditional methods</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">50%</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Fewer Screen Failures</div>
              <div className="text-slate-600">Thanks to nurse pre-screening</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Project Management</div>
              <div className="text-slate-600">Dedicated support throughout</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form-section" className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Ready to Accelerate Your Recruitment?
            </h2>
            <p className="text-xl text-slate-600">
              Get a personalized proposal tailored to your specific needs and challenges.
            </p>
          </div>

          {successEmail ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700 text-lg">
                We've sent a verification email to <strong>{successEmail}</strong>
              </p>
              <p className="text-green-600 mt-2">
                Please check your email and click the link to access your personalized proposal.
              </p>
            </div>
          ) : showForm ? (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {formType === 'sponsor' ? 'Sponsor / CRO Proposal Request' : 'Site / Vendor Proposal Request'}
                </h3>
                <p className="text-slate-600">
                  Tell us about your study and we'll create a customized proposal
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Company Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Your company name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="studyDetails" className="block text-sm font-medium text-slate-700 mb-2">
                    Study Details (Optional)
                  </label>
                  <textarea
                    id="studyDetails"
                    name="studyDetails"
                    rows="4"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Tell us about your study, timeline, or specific requirements..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white font-bold py-4 rounded-lg hover:bg-teal-700 transition-colors text-lg"
                >
                  Request My Proposal
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-slate-600 mb-8">
                Choose your role to get started with a personalized proposal
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleRequestProposalClick('sponsor')}
                  className="bg-teal-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-teal-700 transition-colors shadow-lg text-lg"
                >
                  I'm a Sponsor / CRO
                </button>
                <button
                  onClick={() => handleRequestProposalClick('site')}
                  className="bg-white text-teal-600 border-2 border-teal-600 font-bold px-8 py-4 rounded-lg hover:bg-teal-50 transition-colors shadow-lg text-lg"
                >
                  I'm a Site / Vendor
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
