import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditSpecialite() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [specialite, setSpecialite] = useState({
    nom: "",
  });

  const { nom } = specialite;

  const onInputChange = (e) => {
    setSpecialite({ ...specialite, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSpecialite();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/specialites/update/${id}`, specialite);
    navigate("/specialite");
  };

  const loadSpecialite = async () => {
    const result = await axios.get(`http://localhost:8080/specialites/findById/${id}`);
    setSpecialite(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit specialite</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">
               Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nom"
                name="nom"
                value={nom}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/specialite">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}