export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-3">PostPlanner</h3>
          <p className="text-sm">All-in-one social media planning & scheduling tool.</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Product</h4>
          <ul className="text-sm space-y-1">
            <li>Features</li>
            <li>Pricing</li>
            <li>Integrations</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Company</h4>
          <ul className="text-sm space-y-1">
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
  <h4 className="font-medium mb-2">Contact</h4>
  <a
    href="mailto:zimbunny@gmail.com"
    className="text-sm text-white-700 hover:underline hover:text-purple-900 transition"
  >
    zimbunny@gmail.com
  </a>
  <p className="text-sm mt-2">
    © {new Date().getFullYear()} PostPlanner
  </p>
</div>

      </div>
    </footer>
  );
}
