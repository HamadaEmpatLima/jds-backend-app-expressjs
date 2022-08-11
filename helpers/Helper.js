const Helper = {
    generatePassword: async ($length = 6, $chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_?,.') => {
        let password = '';
        for (let i = 0; i < $length; i++) {
            password += $chars.charAt(Math.floor(Math.random() * $chars.length));
        }
        return password;
    }
}

module.exports = Helper;