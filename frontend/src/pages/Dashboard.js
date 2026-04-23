import React, { useEffect, useState } from "react";
import API from "../api";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  if (!token) window.location = "/";

  const user = JSON.parse(localStorage.getItem("user"));

  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({});
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // FETCH DATA
  const fetchData = async () => {
    const res = await API.get("/grievances", {
      headers: { Authorization: token }
    });
    setGrievances(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD OR UPDATE
  const addGrievance = async () => {
    if (editId) {
      await API.put(`/grievances/${editId}`, form, {
        headers: { Authorization: token }
      });
      setEditId(null);
    } else {
      await API.post("/grievances", form, {
        headers: { Authorization: token }
      });
    }

    setForm({});
    fetchData();
  };

  // DELETE
  const deleteGrievance = async (id) => {
    await API.delete(`/grievances/${id}`, {
      headers: { Authorization: token }
    });
    fetchData();
  };

  // SEARCH
  const searchGrievance = async () => {
    const res = await API.get(`/grievances/search?title=${search}`, {
      headers: { Authorization: token }
    });
    setGrievances(res.data);
  };

  // RESOLVE
  const resolveGrievance = async (id) => {
    await API.put(`/grievances/${id}`,
      { status: "Resolved" },
      { headers: { Authorization: token } }
    );
    fetchData();
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="bg-dark text-white min-vh-100 p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Grievance Dashboard</h2>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      <h5>Welcome, {user?.name}</h5>

      {/* FORM */}
      <div className="card bg-secondary p-3 mt-4">
        <h5>{editId ? "Update Grievance" : "Submit Grievance"}</h5>

        <input className="form-control my-2"
          placeholder="Title"
          value={form.title || ""}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input className="form-control my-2"
          placeholder="Description"
          value={form.description || ""}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <select className="form-control my-2"
          value={form.category || ""}
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option>Academic</option>
          <option>Hostel</option>
          <option>Transport</option>
          <option>Other</option>
        </select>

        <div className="d-flex">
          <button className="btn btn-primary" onClick={addGrievance}>
            {editId ? "Update" : "Submit"}
          </button>

          {editId && (
            <button className="btn btn-secondary ms-2"
              onClick={() => {
                setEditId(null);
                setForm({});
              }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className="mt-4 d-flex">
        <input className="form-control"
          placeholder="Search grievance..."
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-warning ms-2" onClick={searchGrievance}>
          Search
        </button>
      </div>

      {/* LIST */}
      <div className="row mt-4">
        {grievances.map(g => (
          <div className="col-md-4 mb-3" key={g._id}>
            <div className="card bg-secondary p-3">

              <h5>{g.title}</h5>
              <p>{g.description}</p>

              <p>
                <strong>Category:</strong> {g.category} <br/>
                <strong>Status:</strong>{" "}
                <span className={
                  g.status === "Resolved" ? "text-success" : "text-danger"
                }>
                  {g.status}
                </span>
              </p>

              <div className="d-flex justify-content-between">

                {/* DELETE */}
                <button className="btn btn-danger"
                  onClick={() => deleteGrievance(g._id)}>
                  <FaTrash />
                </button>

                {/* EDIT */}
                <button className="btn btn-info"
                  onClick={() => {
                    setForm({
                      title: g.title,
                      description: g.description,
                      category: g.category
                    });
                    setEditId(g._id);
                  }}>
                  <FaEdit />
                </button>

                {/* RESOLVE */}
                <button className="btn btn-success"
                  onClick={() => resolveGrievance(g._id)}>
                  Resolve
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}