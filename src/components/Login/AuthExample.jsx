import React, {useEffect, useState} from 'react';
import axios from 'axios';

function AuthExample() {
  const [data, setData ] = useState({})
  const token = 'Bearer ' + localStorage.getItem('user_token')

  const fetchData = async () => {
    const results = await axios.get('http://localhost:8000/api/v1/users/auth', {
        headers: {
            'Authorization': token 
        }
    })
    console.log("results: ", results)
    setData(results)
  }
  console.log("data state: ", data)

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <div className='auth-example'>
      <h3>authorised</h3>
      <h3>account email: {data.data && (data.data.data.email)}</h3>
      <h3>account username: {data.data && (data.data.data.username)}</h3>
    </div>
  )
}

export default AuthExample