
export default (cookie) => {
    if(cookie){
        const cobj = cookie.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');
            prev[name] = value;
            return prev
        }, {});

        return cobj.token;
    }
    return null
}