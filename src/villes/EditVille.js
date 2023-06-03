import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditVille() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ville, setVille] = useState({
    nom: "",
  });

  const { nom } = ville;

  const onInputChange = (e) => {
    setVille({ ...ville, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadVille();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/villes/update/${id}`, ville);
    navigate("/villes");
  };

  const loadVille = async () => {
    const result = await axios.get(`http://localhost:8080/villes/findById/${id}`);
    setVille(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Ville</h2>

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
            <Link className="btn btn-outline-danger mx-2" to="/villes">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}