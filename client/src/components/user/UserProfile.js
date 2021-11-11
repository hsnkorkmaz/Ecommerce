import React, {useEffect} from 'react'
import axios from 'axios'
import { authApi } from '../../api/ApiConfig'

const UserProfile = () => {

    const [user, setUser] = React.useState({})

    useEffect(() => {
        axios.get(authApi + 'user',
        { withCredentials: true })
            .then(function (response) {
                setUser(response.data)
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <div>
           <h1>User Profile</h1>
           <h3>Name: {user?.name}</h3>
           <h3>Email: {user?.email}</h3>
           <h3>Orders etc</h3>
        </div>
    )
}

export default UserProfile
