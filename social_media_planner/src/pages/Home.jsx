import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="bg-gradient-to-r from-purple-700 to-[#287379] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="[font-family:var(--font-libre)] italic text-white">Stress-free</span>{" "}
              social media management
            </h1>

            <p className="mt-4 text-lg md:text-xl opacity-90 max-w-2xl">
              Create and schedule content in minutes, collaborate with your team, and track performance all in one place.
            </p>

            {/* Register & Login Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 bg-white text-purple-800 rounded-lg font-semibold shadow-md hover:bg-purple-800 hover:text-white transition duration-200"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-800 transition duration-200"
              >
                Login
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm opacity-90">
              <div>Trusted by</div>
              <div className="flex gap-3 items-center">
                <img src="https://www.loomly.com/hs-fs/hubfs/pinterest%20icon.png?width=48&height=48&name=pinterest%20icon.png" alt="logo" className="h-6" />
                <img src="https://www.loomly.com/hubfs/images/frontend/social/icons/snapchat.svg" alt="logo" className="h-6" />
                <img src="https://www.loomly.com/hubfs/threads-icon-black.svg" alt="logo" className="h-6" />
                <img src="https://www.loomly.com/hubfs/images/frontend/logos/workflow-logos/microsoft-teams.svg" alt="logo" className="h-6" />
                <img src="https://www.loomly.com/hubfs/images/frontend/logos/workflow-logos/zapier.svg" alt="logo" className="h-6" />
                <img src="https://www.loomly.com/hubfs/images/frontend/logos/content-creators/google-drive.svg" alt="logo" className="h-6" />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-lg">
              <img
                src="https://44815356.fs1.hubspotusercontent-na1.net/hubfs/44815356/images/frontend/features/img-features-hero_v2.png"
                alt="product mockup"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-purple-700 mb-8">
          Everything you need to plan, publish, and measure
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Post Scheduling", desc: "Plan posts and set optimal times for each channel." },
            { title: "Automatic Posting", desc: "Auto-publish to major platforms." },
            { title: "Collaboration & Approvals", desc: "Streamline workflows and approvals." },
            { title: "Analytics & Reporting", desc: "Understand performance and ROI." },
          ].map((f) => (
            <div key={f.title} className="bg-purple-100 p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg text-purple-700">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER QUOTES */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-purple-800">Loved by teams of all sizes</h3>
            <p className="text-sm text-gray-600">
              50,000+ marketers use PostPlanner to simplify their workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "“PostPlanner saved so much time for our social team.”", name: "Jane Doe, Marketing Manager" },
              { text: "“The calendar and approval workflow are lifesavers.”", name: "John Smith, Agency Owner" },
              { text: "“Easy to use and powerful integrations.”", name: "Alex Kim, Content Lead" },
            ].map((q, i) => (
              <blockquote key={i} className="bg-purple-100 p-6 rounded-xl shadow">
                <p className="text-gray-700">{q.text}</p>
                <footer className="mt-4 text-sm text-gray-500">— {q.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold">Ready to simplify your social workflow?</h4>
            <p className="text-sm opacity-90">
              Start today by logging in or registering your free account.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-white text-purple-700 rounded-lg font-semibold"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
