import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewsRestaurant() {
  const [restaurant, setRestaurant] = useState({
    nom: "",
    adresse: "",
    rank: "",
    lattitude: "",
    longtitude: "",
    close: "",
    open: "",
    weekend: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadRestaurant();
  }, []);

  const loadRestaurant = async () => {
    const result = await axios.get(`http://localhost:8080/restaurants/findById/${id}`);
    setRestaurant(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Restaurant Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Restaurant id : {restaurant.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Nom:</b>
                  {restaurant.nom}
                </li>
                <li className="list-group-item">
                  <b>Adresse:</b>
                  {restaurant.adresse}
                </li>
                <li className="list-group-item">
                  <b>Rank:</b>
                  {restaurant.rank}
                </li>
                <li className="list-group-item">
                  <b>Lattitude:</b>
                  {restaurant.lattitude}
                </li>
                <li className="list-group-item">
                  <b>Longtitude:</b>
                  {restaurant.longtitude}
                </li>
                <li className="list-group-item">
                  <b>Close:</b>
                  {restaurant.close}
                </li>
                <li className="list-group-item">
                  <b>Open:</b>
                  {restaurant.open}
                </li>
                <li className="list-group-item">
                  <b>Weekend:</b>
                  {restaurant.weekend}
                </li>
              
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}