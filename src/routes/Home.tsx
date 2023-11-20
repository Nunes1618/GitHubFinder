import Search from "../components/Search";
import { UserProps } from "../types.ts/user";
import User from "../components/user";
import Error from "../components/Error"; 

import { useState } from "react";

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);

    const loadUser = async (userName: string) => {
        setError(false);
        setUser(null);

        const res = await fetch (`https://api.github.com/users/${userName}`);

        const data = await res.json();

        if (res.status === 404) {
            setError(true);
            return; 
        }
        
        const userData: UserProps = {
            avatar_url: data.avatar_url,
            login: data.login,
            locations: data.location,
            followers: data.followers,
            following: data.following,
        };
        setUser(userData);
    };

    return (
        <div>
            <Search loadUser={loadUser}/>
            {user && <User {...user}/>}
            {error && <Error/>}
        </div>
    );
};

export default Home;