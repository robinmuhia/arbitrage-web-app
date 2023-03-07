export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return `${user.token_type} ${user.access_token}`
    } else {
        return {};
    }
    }