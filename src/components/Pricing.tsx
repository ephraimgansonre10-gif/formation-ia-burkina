interface PlanData {
  name: string
  price: string
  currency: string
  duration: string
  features: string[]
  popular: boolean
}

interface PricingData {
  title: string
  plans: PlanData[]
}

export default function Pricing({ data }: { data: PricingData }) {
  return (
    <section id="pricing" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{data.title}</span>
          </h2>
          <p className="text-lg text-gray-600">
            Choisissez le plan qui vous convient
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className={`card p-8 relative ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="gradient-bg text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-gray-600">{plan.currency}</span>
                </div>
                <p className="text-gray-500 mt-1">{plan.duration}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'btn-primary'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                Choisir ce plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
