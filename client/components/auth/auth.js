const auth = {
    isAuthenticated() {
        if (typeof window == "undefined")
            return false
        let cookies = document.cookie.split(';')
        for (let i = 0; i <  cookies.length; i++) {
            let name = cookies[i].split('=')[0];
            if (name == 'auth')
                return true
        }
        return false
    }
}

export default auth