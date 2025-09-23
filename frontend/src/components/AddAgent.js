import { useState } from "react";
import API from "../api";

export default function AddAgent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/agents", form);
      alert("Agent added!");
    } catch (err) {
      alert("Failed to add agent");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg space-y-3 mb-6"
    >
      <h2 className="text-xl font-bold">Add Agent</h2>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="mobile"
        placeholder="Mobile"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Add Agent
      </button>
    </form>
  );
}
