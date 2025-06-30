export default function HospitalSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">
          Hospitals Can Request Blood Easily
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Partnered hospitals can quickly request the blood they need through
          our system—ensuring timely access and better patient outcomes.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-6 bg-card shadow rounded-xl border">
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Real-time Dashboard
            </h3>
            <p className="text-muted-foreground">
              Monitor availability, track requests, and manage inventory
              seamlessly.
            </p>
          </div>
          <div className="p-6 bg-card shadow rounded-xl border">
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Verified Donors
            </h3>
            <p className="text-muted-foreground">
              Access a list of verified donors filtered by blood group and
              location.
            </p>
          </div>
          <div className="p-6 bg-card shadow rounded-xl border">
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Priority Support
            </h3>
            <p className="text-muted-foreground">
              Hospitals receive round-the-clock support for urgent blood needs.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <a
            href="/hospital/request"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium shadow hover:opacity-90 transition"
          >
            Request Blood Now
          </a>
        </div>
      </div>
    </section>
  )
}
