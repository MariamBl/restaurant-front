import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './cssB.css';

export default function Villes() {
  const [villes, setville] = useState([]);

  const { id } = useParams()
  useEffect(() => {
    loadViles();

  }, []);

  const loadViles = async () => {
    const result = await axios.get("http://localhost:8080/villes/api/villes");
    setville(result.data);
  };

  const deletVille = async (id) => {
    await axios.delete(`http://localhost:8080/villes/delete/${id}`)
    loadViles()
  }
  return (
    <div className='container-bg'>
      <div className='container'>
        

        <div className='py-4'>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">nom</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>  
              {
                  villes.map((ville,index)=>(
                      <tr>
                        <th scope="row" key={index}>{index+1}</th>
                        <td>{ville.nom}</td>
                        <td>
                          <Link className='btn btn-primary mx-2' to={`/editville/${ville.id}`}>Edit</Link>
                          <button className='btn btn-danger mx-2' onClick={()=>deletVille(ville.id)}>Delete</button>
                        </td>
                      </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
        <div className='py-4'>
          <Link className='btn btn-success mx-2' to="/addVille">Add ville</Link>
        </div>
      </div>
    </div>
  )
}