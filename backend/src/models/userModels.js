export const userModels = {
    Users: [],

    getUserIndex(username) {
        return this.Users.findIndex(item => item.username == username);
    },

    addUser(user) {
        try {
            if (this.Users.length >= 5){
                throw new Error("Limite de usuários atingido");
            }
            const userIndex = this.getUserIndex(user.userName);
            
            if (userIndex != -1) throw new Error('Usuário já adicionado');

            this.Users.push(user);
        }catch(err){
            throw new Error(`${err}`);
        }
    },

    removeUser(username) {
        try {
            const userIndex = this.getUserIndex(username);
            
            this.Users.splice(userIndex, 1);
        }catch(err){
            throw new Error(`${err}`);
        }
    }
}