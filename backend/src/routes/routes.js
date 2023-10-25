import {userController} from '../controllers/userController.js';

const userRoutes = (app) => {
    app.post('/user', userController.addUser);
    app.get('/users', userController.listUsers);
    app.delete('/user/:username', userController.removeUser);
    app.patch('/user/favorite', userController.addUserToFavorites);
    app.get('/user/favorite', userController.listFavoriteUser);
}

export default userRoutes;