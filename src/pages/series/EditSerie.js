import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditSerie() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [serie, setSerie] = useState({
    nom: "",
  });

  const { nom } = serie;

  const onInputChange = (e) => {
    setSerie({ ...serie, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadSerie();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/series/update/${id}`, serie);
    navigate("/serie");
  };

  const loadSerie = async () => {
    const result = await axios.get(`http://localhost:8080/series/findById/${id}`);
    setSerie(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Serie</h2>

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
            <Link className="btn btn-outline-danger mx-2" to="/serie">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}