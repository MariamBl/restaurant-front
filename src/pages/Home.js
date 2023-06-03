import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './HomeStyle.css';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    const result = await axios.get("http://localhost:8080/restaurants/api/restaurants");
    setRestaurants(result.data);
  };

  return (
    <div>
      <div className="bg">
        <h1 className="display-4 text-center my-5 text-white font-weight-bold">Welcome To the Restaurant EateryNet</h1>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-5">Our Featured Restaurants</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {restaurants.map((restaurant) => (
            <div className="col mb-4" key={restaurant.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.nom}</h5>
                  <p className="card-text">{restaurant.adresse}</p>
                  <p className="ard-text">Rank: {restaurant.rank}</p>
                  <p className="card-text">Open on Weekends: {restaurant.weekend? 'Yes' : 'No'}</p>
                </div>
                <div className="card-footer">
                  <Link to={`/restaurantDetail/${restaurant.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p>Looking for more options? Check out our <Link to="/restaurant" className="text-primary">full list of restaurants</Link>.</p>
        </div>
      </div>
    </div>
  );
}