import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  CalendarDays,
  Clock,
  Hash,
  TrendingUp,
  Bell,
  Settings,
  BarChart3,
  PlusCircle,
  Filter,
} from "lucide-react";
import img3 from "../images/Dashboard.png";

// Small hook for animated counters
const useCountUp = (target, duration = 600) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.round(start + (target - start) * progress);
      setValue(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration]);

  return value;
};

export default function Dashboard() {
  const [showTips, setShowTips] = useState(true);
const [showHashtagTip, setShowHashtagTip] = useState(true);
const [showTimingTip, setShowTimingTip] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    content: "",
    platform: "",
    scheduledAt: "",
    status: "Draft",
  });
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const headers = getAuthHeaders();

    // current user
    axios
      .get("http://localhost:5000/api/auth/me", { headers })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

    // posts
    axios
      .get("http://localhost:5000/api/posts", { headers })
      .then((res) => setPosts(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load posts")
      )
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      platform: "",
      scheduledAt: "",
      status: "Draft",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = getAuthHeaders();

    try {
      if (editingId) {
        const res = await axios.put(
          `http://localhost:5000/api/posts/${editingId}`,
          form,
          { headers }
        );
        setPosts((prev) =>
          prev.map((p) => (p._id === editingId ? res.data : p))
        );
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/posts",
          form,
          { headers }
        );
        setPosts((prev) => [...prev, res.data]);
      }
      resetForm();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  };

  const handleEdit = (post) => {
    setEditingId(post._id);
    setForm({
      title: post.title || "",
      content: post.content || "",
      platform: post.platform || "",
      scheduledAt: post.scheduledAt
        ? post.scheduledAt.slice(0, 16)
        : "",
      status: post.status || "Draft",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    const headers = getAuthHeaders();

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, { headers });
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  // stats
  const totalPosts = posts.length;
  const scheduledCount = posts.filter((p) => p.status === "Scheduled").length;
  const draftCount = posts.filter((p) => p.status === "Draft").length;
  const publishedCount = posts.filter((p) => p.status === "Published").length;

  const totalAnimated = useCountUp(totalPosts);
  const scheduledAnimated = useCountUp(scheduledCount);
  const draftsAnimated = useCountUp(draftCount);
  const publishedAnimated = useCountUp(publishedCount);

  const cards = [
    {
      title: "Total Posts",
      value: totalAnimated,
      icon: BarChart3,
      description: "All posts you have created.",
    },
    {
      title: "Scheduled",
      value: scheduledAnimated,
      icon: CalendarDays,
      description: "Posts scheduled for future publishing.",
    },
    {
      title: "Drafts",
      value: draftsAnimated,
      icon: Clock,
      description: "Posts you are still working on.",
    },
    {
      title: "Published",
      value: publishedAnimated,
      icon: TrendingUp,
      description: "Posts already published.",
    },
  ];

  // simple filters
  const uniquePlatforms = Array.from(
    new Set(posts.map((p) => p.platform).filter(Boolean))
  );

  const filteredPosts = posts.filter((post) => {
    const statusOk =
      statusFilter === "All" ? true : post.status === statusFilter;
    const platformOk =
      platformFilter === "All" ? true : post.platform === platformFilter;
    return statusOk && platformOk;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 mb-2">
              Welcome{user ? `, ${user.name}` : ""}! Plan, schedule and manage
              your social media posts from one place.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Stay consistent on every platform with scheduled content.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={img3}
              alt="Dashboard overview"
              className="w-full max-w-sm rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Stat cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-purple-100 px-4 py-5 flex flex-col gap-2
                           transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 opacity-70 pointer-events-none bg-gradient-to-br from-purple-100 to-purple-500" />
                <div className="relative flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">
                    {card.title}
                  </h2>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700">
                    <Icon className="w-4 h-4" />
                  </span>
                </div>
                <p className="relative text-2xl font-bold text-gray-900">
                  {card.value}
                </p>
                <p className="relative text-xs text-gray-600">
                  {card.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Filters summary bar */}
        <section className="bg-green-100 rounded-xl shadow mb-8 px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Filter className="w-4 h-4 text-purple-600" />
            <span className="font-medium">Quick filters</span>
            <span className="text-xs text-gray-500">
              Narrow down posts by status or platform.
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-md border-gray-300 px-3 text-sm shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="All">All statuses</option>
              <option value="Draft">Draft</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Published">Published</option>
            </select>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="h-9 rounded-md border-gray-300 px-3 text-sm shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="All">All platforms</option>
              {uniquePlatforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Form + Quick Insights */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Form card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? "Edit Post" : "Create New Post"}
              </h2>
              <button
                type="submit"
                form="post-form"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-700 text-white
                           hover:bg-blue-600 transform transition-transform duration-150 hover:-translate-y-0.5"
                title="Create post"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-1 mb-3">{error}</p>
            )}
            <form id="post-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full h-11 rounded-md border-gray-300 px-3 text-sm shadow-sm
                               focus:ring-purple-500 focus:border-purple-500"
                    placeholder="New product launch post"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Platform
                  </label>
                  <div className="relative mt-1">
                    <Hash className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="platform"
                      value={form.platform}
                      onChange={handleChange}
                      className="block w-full h-11 pl-9 pr-3 rounded-md border-gray-300 text-sm shadow-sm
                                 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Instagram, Facebook..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 text-sm shadow-sm
                             focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Write the caption or details of your post..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Schedule
                  </label>
                  <div className="relative mt-1">
                    <CalendarDays className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="datetime-local"
                      name="scheduledAt"
                      value={form.scheduledAt}
                      onChange={handleChange}
                      className="block w-full h-11 pl-9 pr-3 rounded-md border-gray-300 text-sm shadow-sm
                                 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="mt-1 block w-full h-11 rounded-md border-gray-300 px-3 text-sm shadow-sm
                               focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-purple-700 text-white text-sm font-medium
                               hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                               transform transition-transform duration-150 active:scale-95 w-full"
                  >
                    {editingId ? "Update Post" : "Create Post"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 text-sm font-medium
                                 text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Quick insights */}
          <div className="bg-purple-100 rounded-xl shadow p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                Quick Insights
              </h2>
              <button
                type="button"
                onClick={() => setShowTips((prev) => !prev)}
                className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-100 text-gray-500"
                title={showTips ? "Hide insights" : "Show insights"}
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {showTips ? (
              <>
                <p className="text-xs text-gray-600">
                  Your posts perform better when you stay consistent and use
                  relevant hashtags. Plan at least 3 posts per week for each
                  platform.
                </p>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Analyze engagement trends regularly.
                  </li>

                  {showTimingTip && (
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>Schedule posts when your audience is most active.</span>
                      <button
                        type="button"
                        onClick={() => setShowTimingTip(false)}
                        className="ml-auto text-[10px] text-gray-400 hover:text-gray-600"
                      >
                        hide
                      </button>
                    </li>
                  )}

                  {showHashtagTip && (
                    <li className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-purple-500" />
                      <span>Use a mix of trending and niche hashtags.</span>
                      <button
                        type="button"
                        onClick={() => setShowHashtagTip(false)}
                        className="ml-auto text-[10px] text-gray-400 hover:text-gray-600"
                      >
                        hide
                      </button>
                    </li>
                  )}
                </ul>
              </>
            ) : (
              <p className="text-xs text-gray-500 italic">
                Insights hidden. Click the settings icon to show again.
              </p>
            )}
          </div>
        </section>
        {/* Posts table */}
        <section className="bg-[#287378] border border-green-100 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Your Scheduled Posts
            </h2>
            <div className="flex items-center gap-2 text-xs text-white">
              <BarChart3 className="w-4 h-4" />
              <span>Overview of all your planned content</span>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading posts...</p>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-green-100 rounded-lg border border-line border-purple-200 p-6 text-center">
              <p className="text-sm font-medium text-black mb-1">
                No posts match your filters
              </p>
              <p className="text-xs text-black mb-3">
                Try adjusting the filters above or create a new post.
              </p>
              
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Title
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Platform
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Scheduled At
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                      Status
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr
                      key={post._id}
                      className="border-b last:border-0 transition-colors duration-200 hover:bg-purple-50/40"
                    >
                      <td className="px-3 py-2 text-gray-900">
                        {post.title || "-"}
                      </td>
                      <td className="px-3 py-2 text-gray-700">
                        {post.platform || "-"}
                      </td>
                      <td className="px-3 py-2 text-gray-700">
                        {post.scheduledAt
                          ? new Date(post.scheduledAt).toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                            transition-transform duration-150 hover:scale-105 ${
                              post.status === "Published"
                                ? "bg-green-100 text-green-700"
                                : post.status === "Scheduled"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {post.status || "Draft"}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-blue-600 border border-gray-300 text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="inline-flex items-center px-2 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
