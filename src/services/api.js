const API_URL = 'http://localhost:5000/api';

export const fetchVehicles = async (type) => {
    const response = await fetch(`${API_URL}/vehicles/${type}`);
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    return response.json();
};

export const fetchNews = async () => {
    const response = await fetch(`${API_URL}/news`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
};

export const submitInquiry = async (inquiry) => {
    const response = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiry),
    });
    if (!response.ok) throw new Error('Failed to submit inquiry');
    return response.json();
}; 