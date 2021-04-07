import React, {useEffect} from "react";

export default function ProfilePage({match}){

    return(
        <>
            <h1>
                ProfilePage
            </h1>
            <pre>
                {match.params.username}
            </pre>
        </>
    )
}

