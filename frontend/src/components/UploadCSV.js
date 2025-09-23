import { useState } from "react";
import API from "../api";

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [distribution, setDistribution] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDistribution(res.data.distribution);
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-bold">Upload CSV</h2>
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Upload
        </button>
      </form>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Distribution Result</h3>
        {distribution.map((dist) => (
          <div key={dist._id} className="border rounded p-3 my-2">
            <h4 className="font-bold">Agent: {dist.agent}</h4>
            <ul className="list-disc ml-5">
              {dist.items.map((item, i) => (
                <li key={i}>
                  {item.firstName} - {item.phone} ({item.notes})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
