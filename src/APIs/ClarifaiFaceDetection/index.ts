export interface IData {
    topRow: string;
    leftCol: string;
    bottomRow: string;
    rightCol: string;
}
export const fetchFaceDetectionAPI = async (imageUrl: string): Promise<IData[]> => {
    try {
        const response = await fetch("https://face-recoginition-brain-backend.onrender.com/api/face-detection", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = response.json()
        console.log(await data);
        return await data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};
