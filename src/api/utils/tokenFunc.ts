import Cookies from 'js-cookie';

const getToken = () => {
    const token = Cookies.get("token");
    return token;
}

export default getToken;