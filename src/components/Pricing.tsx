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
    <section id="pricing" className="pricing">
      <div className="section-inner">
        <div className="section-title">
          <h2>{data.title}</h2>
          <p>Choisissez le plan qui vous convient</p>
        </div>
        
        <div className="pricing-grid">
          {data.plans.map((plan, index) => (
            <div key={index} className={`price-card ${plan.popular ? 'popular' : 'standard'}`}>
              <h3>{plan.name}</h3>
              <div>
                <span className="price-amount">{plan.price}</span>
                <span className="price-currency"> {plan.currency}</span>
              </div>
              <div className="price-duration">{plan.duration}</div>
              
              <ul className="price-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              
              <a href="#contact" className={`price-btn ${plan.popular ? 'primary' : 'secondary'}`}>
                Choisir ce plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
