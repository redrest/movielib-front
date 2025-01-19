import axios from 'axios';

export const checkAdminRole = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    try {
        const response = await axios.get('http://localhost:5000/admin', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            return true;
        } else {
            console.log('Нет доступа');
            return false;
        }
    } catch (error) {
        console.log('Произошла ошибка');
        return false;
    }
};

export default checkAdminRole;