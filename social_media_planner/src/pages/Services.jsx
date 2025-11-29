import Navbar from "../components/Navbar"; // ✅ Added Navbar import
import img4 from "../images/ServicesColab.png";
import img5 from "../images/ServicesPost.png";
import img6 from "../images/ServicesContent.png";
import img7 from "../images/ServicesAnalytics.png";

export default function Services() {
  const features = [
    {
      title: "Collaboration & Approvals",
      desc: "Multi-level approvals, comments, and version history to keep your workflow smooth and transparent.",
      img: img4,
    },
    {
      title: "Post Scheduling & Calendar",
      desc: "Visual calendar, flexible scheduling, and real-time previews for each platform.",
      img: img5,
    },
    {
      title: "Content Library + Editor",
      desc: "Store, organize, and edit all your content assets in one place — from captions to visuals.",
      img: img6,
    },
    {
      title: "Analytics & Reporting",
      desc: "Gain insights with exportable reports, post performance tracking, and engagement analytics.",
      img: img7,
    },
  ];

  return (
    <>
      {/* ✅ Global Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-16 bg-gradient-to-br from-purple-50 to-white min-h-screen">
        {/* Header Section */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 tracking-tight">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From content planning to analytics,{" "}
            <span className="font-semibold text-purple-700">PostPlanner</span> empowers your entire social media journey —
            designed for teams, creators, and agencies who aim for impact.
          </p>
        </header>

        {/* Highlight Section */}
        <div className="bg-gradient-to-r from-purple-300 to-purple-50 rounded-2xl p-10 text-center shadow-lg">
          <h2 className="text-2xl font-bold text-purple-800">Why Choose PostPlanner?</h2>
          <p className="text-gray-700 mt-3 max-w-2xl mx-auto">
            Automate your workflow, collaborate effortlessly, and focus on creativity — 
            while PostPlanner handles the rest.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-purple-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col md:flex-row items-center gap-6"
            >
              <img
                src={f.img}
                alt={f.title}
                className="w-full md:w-48 h-40 object-cover rounded-xl"
              />
              <div>
                <h3 className="text-xl font-semibold text-purple-700">{f.title}</h3>
                <p className="text-gray-600 mt-2 leading-relaxed">{f.desc}</p>
                <a
                  href="/"
                  className="inline-block mt-4 text-purple-700 font-medium hover:text-purple-900 transition-all"
                >
                  Learn more →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[#287379] text-white rounded-3xl p-10 shadow-inner">
          <h3 className="text-3xl font-bold mb-3">
            Ready to Simplify Your Social Media Strategy?
          </h3>
          <p className="text-purple-100 mb-6">
            Start creating, scheduling, and analyzing — all in one powerful dashboard.
          </p>
          <a
            href="/dashboard"
            className="bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition-all duration-200"
          >
            Get Started
          </a>
        </div>
      </div>
    </>
  );
}
