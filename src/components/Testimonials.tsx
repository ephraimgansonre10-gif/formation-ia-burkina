interface TestimonialData {
  name: string
  role: string
  content: string
}

export default function Testimonials({ data }: { data: TestimonialData[] }) {
  return (
    <section className="testimonials">
      <div className="section-inner">
        <div className="section-title">
          <h2>Ce que disent nos diplômés</h2>
          <p>Des témoignages authentiques de nos anciens étudiants</p>
        </div>
        
        <div className="testimonials-grid">
          {data.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <div className="testimonial-stars">
                {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
              </div>
              <p>"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
