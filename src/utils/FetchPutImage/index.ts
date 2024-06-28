import {UserType} from "../../types";

export const fetchPutImage = async (id: UserType['id']) => {
    return await fetch('https://face-recoginition-brain-backend.onrender.com/image', {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id:id
        })
    }).then(async response => {
        return response.json()
    })
        .then(data => {
            return data;
        });
}