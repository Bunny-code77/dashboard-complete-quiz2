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
} from "lucide-react";
import img3 from "../images/Dashboard.png";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
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

    axios
      .get("http://localhost:5000/api/auth/me", { headers })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

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

  const totalPosts = posts.length;
  const scheduledCount = posts.filter((p) => p.status === "Scheduled").length;
  const draftCount = posts.filter((p) => p.status === "Draft").length;
  const publishedCount = posts.filter((p) => p.status === "Published").length;

  const cards = [
    {
      title: "Total Posts",
      value: totalPosts,
      icon: BarChart3,
      description: "All posts you have created.",
    },
    {
      title: "Scheduled",
      value: scheduledCount,
      icon: CalendarDays,
      description: "Posts scheduled for future publishing.",
    },
    {
      title: "Drafts",
      value: draftCount,
      icon: Clock,
      description: "Posts you are still working on.",
    },
    {
      title: "Published",
      value: publishedCount,
      icon: TrendingUp,
      description: "Posts already published.",
    },
  ];

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
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  {cards.map((card) => {
    const Icon = card.icon;
    return (
      <div
        key={card.title}
        className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-purple-100 px-4 py-5 flex flex-col gap-2"
      >
        {/* soft background accent like About values cards */}
        <div className="absolute inset-0 opacity-70 pointer-events-none bg-gradient-to-br from-purple-100  to-purple-200" />
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
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white hover:bg-purple-700"
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
                    className="mt-1 block w-full h-11 rounded-md border-gray-300 px-3 text-sm shadow-sm focus:ring-purple-500 focus:border-purple-500"
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
                      className="block w-full h-11 pl-9 pr-3 rounded-md border-gray-300 text-sm shadow-sm focus:ring-purple-500 focus:border-purple-500"
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
                  className="mt-1 block w-full rounded-md border-gray-300 px-3 text-sm shadow-sm focus:ring-purple-500 focus:border-purple-500"
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
                      className="block w-full h-11 pl-9 pr-3 rounded-md border-gray-300 text-sm shadow-sm focus:ring-purple-500 focus:border-purple-500"
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
                    className="mt-1 block w-full h-11 rounded-md border-gray-300 px-3 text-sm shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full"
                  >
                    {editingId ? "Update Post" : "Create Post"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Quick insights */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                Quick Insights
              </h2>
              <Settings className="w-4 h-4 text-gray-400" />
            </div>
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
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Schedule posts when your audience is most active.
              </li>
              <li className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-purple-500" />
                Use a mix of trending and niche hashtags.
              </li>
            </ul>
          </div>
        </section>

        {/* Posts table */}
        <section className="bg-[#287379] border border-green-100 rounded-xl shadow-sm p-6">
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
          ) : posts.length === 0 ? (
            <p className="text-sm text-white">
              No posts yet. Use the form above to create your first post.
            </p>
          ) : (
            <div className="overflow-x-auto bg-[#287379] rounded-lg">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b bg-[#287379]">
                    <th className="px-3 py-2 text-left text-xs font-medium text-white">
                      Title
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-white">
                      Platform
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-white">
                      Scheduled At
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-white">
                      Status
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id} className="border-b last:border-0">
                      <td className="px-3 py-2 text-white">
                        {post.title || "-"}
                      </td>
                      <td className="px-3 py-2 text-white">
                        {post.platform || "-"}
                      </td>
                      <td className="px-3 py-2 text-white">
                        {post.scheduledAt
                          ? new Date(post.scheduledAt).toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
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
