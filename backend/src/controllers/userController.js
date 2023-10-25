import {userModels} from '../models/userModels.js'

export const userController = {
    async addUser(req, res){
        try{
            userModels.addUser(req.body);
            return res.status(200).send(req.body);
        }catch(err){
            return res.status(400).send({ msg: err.message});
        }
    },

    async listUsers(req, res){
        try{
            const listUsers = userModels.Users;

            return res.status(200).send(listUsers);
        }catch(err){
            return res.status(400).send({ msg: err.message});
        }
    },

    async removeUser(req, res){
        try{
            userModels.removeUser(req.params.username);

            return res.status(200).send({msg: 'Usuário excluído com sucesso!'});
        }catch(err){
            return res.status(400).send({ msg: err.message});
        }
    },

    async addUserToFavorites(req, res){
        try{
            userModels.addUserToFavorites(req.body);
            return res.status(200).send(req.body);
        }catch(err){
            return res.status(400).send({ msg: err.message});
        }
    },

    async listFavoriteUser(req, res){
        try{
            const favoriteUser = userModels.favoriteUser.userName;

            return res.status(200).send(favoriteUser);
        }catch(err){
            return res.status(400).send({ msg: err.message});
        }
    },
}