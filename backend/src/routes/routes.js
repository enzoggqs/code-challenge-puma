import {userController} from '../controllers/userController.js';

const userRoutes = (app) => {
    app.post('/user', userController.addUser);
    app.get('/users', userController.listUsers);
    app.delete('/user/:username', userController.removeUser);
    app.put('/user/:username/toggle-star', userController.removeUser);
}

export default userRoutes;