import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddVille() {
    let navigate = useNavigate();

    const [ville, setVille] = useState({
      nom: "",
      
   
    });
  
    const { nom } = ville;
  
    const onInputChange = (e) => {
      setVille({ ...ville, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8080/villes/save", ville);
      navigate("/villes");
    };
  
    return (
      <div className="container py-5 ">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Add Ville</h2>
  
            <form onSubmit={(e) => onSubmit(e)}>
             
              
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">
                  Nom Ville
                </label>
                <input
                  type={"text"}
                  className="form-control"
                 
                  name="nom"
                  value={nom}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Save
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
