"use client"

export function StatsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#264653] text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Making a Difference Together
            </h2>
            <p className="max-w-[900px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of donors who are saving lives across Bangladesh
              every day.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <StatCard value="10,000+" label="Registered Donors" />
          <StatCard value="5,000+" label="Lives Saved" />
          <StatCard value="15,000+" label="Blood Requests" />
          <StatCard value="64" label="Districts Covered" />
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-white/20 p-6">
      <div className="text-4xl font-bold text-[#B83227]">{value}</div>
      <p className="text-white/80">{label}</p>
    </div>
  )
}
