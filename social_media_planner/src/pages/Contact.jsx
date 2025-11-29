import Navbar from "../components/Navbar"; // ✅ Add Navbar import
import { Mail, Phone, MapPin, Send } from "lucide-react";
import img2 from "../images/Contact.png";
import img8 from "../images/Contact2.png";
import img9 from "../images/Contact3.png";

export default function Contact() {
  return (
    <>
      {/* ✅ Global Navbar */}
      <Navbar />

      <section className="py-24 bg-gradient-to-b from-purple-50 to-purple-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* 🌄 Left Side — Floating Images */}
          <div className="relative w-full h-[420px] flex justify-center items-center">
            {/* Decorative Gradient Blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-40"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 rounded-full blur-3xl opacity-50"></div>

            {/* First Image */}
            <div className="absolute w-64 h-64 border-8 border-purple-300 rounded-xl overflow-hidden transform -translate-x-12 translate-y-6 rotate-[-8deg] shadow-lg hover:scale-105 transition-transform duration-500">
              <img
                src={img2}
                alt="contact pattern 1"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Second Image */}
            <div className="absolute w-64 h-64 border-8 border-purple-500 rounded-xl overflow-hidden transform translate-x-12 -translate-y-8 rotate-[8deg] shadow-lg hover:scale-105 transition-transform duration-500">
              <img
                src={img8}
                alt="contact pattern 2"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Third Image */}
            <div className="absolute w-60 h-60 border-8 border-purple-200 rounded-xl overflow-hidden transform -translate-y-20 rotate-[3deg] shadow-md hover:scale-105 transition-transform duration-500">
              <img
                src={img9}
                alt="contact pattern 3"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* ✉️ Right Side — Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-2xl border border-purple-100 relative">
            {/* Decorative accent */}
            <div className="absolute -top-4 left-6 bg-[#287379] text-white px-3 py-1 text-sm rounded-full">
              Get in Touch
            </div>

            <h2 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
              Contact Us
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Have a question or want to collaborate? Fill out the form and our
              team will get back to you soon.
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-700 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-purple-800 hover:to-purple-600 hover:scale-[1.03] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send size={18} /> Send Message
              </button>
            </form>

            {/* 📞 Contact Info */}
            <div className="mt-8 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="text-purple-600" size={18} />{" "}
                support@postplanner.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-purple-600" size={18} /> +92 300 1234567
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-purple-600" size={18} /> Lahore, Pakistan
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
