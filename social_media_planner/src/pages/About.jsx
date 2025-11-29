import Navbar from "../components/Navbar"; 
import img1 from "../images/About.png";


export default function About() {
  return (
    <>
      {/* ✅ Navbar at the top */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 tracking-tight">
            About{" "}
            <span className="[font-family:var(--font-libre)] italic text-purple-700">
              PostPlanner
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Empowering creators, brands, and teams to simplify and elevate their
            social media presence — one post at a time.
          </p>
        </header>

        {/* Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-purple-700">
              ✨ Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              At{" "}
              <span className="font-semibold text-purple-600">
                PostPlanner
              </span>
              , we believe managing your social media should be effortless,
              collaborative, and impactful. Our platform helps you plan,
              schedule, and analyze content seamlessly — whether you're a solo
              creator or a full-scale agency.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-purple-600 text-xl">✅</span> Streamlined
                collaboration & approvals
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600 text-xl">✅</span> Smart
                scheduling & publishing tools
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600 text-xl">✅</span> Deep
                analytics for better engagement
              </li>
            </ul>
          </div>

          <div className="relative">
            <img
              src={img1}
              alt="Team working together"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-300 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-40"></div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="text-center space-y-6 bg-[#287379] py-16 px-8 rounded-3xl shadow-inner">
          <h3 className="text-3xl font-semibold text-white">🚀 Our Vision</h3>
          <p className="max-w-3xl mx-auto text-white leading-relaxed">
            To build a community where social media is not just a task — but a
            creative journey. We envision a world where every brand, creator,
            and marketer can express their voice with clarity, creativity, and
            confidence.
          </p>
        </section>

        {/* Values Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Innovation",
              desc: "We continuously evolve to keep you ahead of the social curve.",
            },
            {
              title: "Simplicity",
              desc: "Every feature is designed to make your workflow intuitive.",
            },
            {
              title: "Community",
              desc: "Together, we create a more connected social ecosystem.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="p-8 bg-purple-100 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h4 className="text-xl font-semibold text-purple-700 mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600">{value.desc}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
