import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from './services/Api'

import './App.css';

function App() {
  const [userNameInput, setUserNameInput] = useState('');
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState([]);
  const [url, setUrl] = useState('');
  const [userFound, setUserFound] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [isAlphabeticOrder, setIsAlphaticOrder] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])

  const handleChangeAlphabetic = () => {
    setIsAlphaticOrder(current => !current);
    
    if(isAlphabeticOrder) {
      usersList.sort(function(a,b){
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
  }

  const searchUserName = () => {
    axios.get(`https://api.github.com/users/${userNameInput}`)
    .then(res => {
      
      setUserName(res.data.login);
      setName(res.data.name);
      setAvatar(res.data.avatar_url);
      setUrl(res.data.html_url);

      toast(`Usuário ${userName} encontrado.`, { autoClose: 4000 })

      setUserFound(true);

      setUserNameInput('')

    }).catch(err => {
      if (err.response.status == 404) {
        toast(`Usuário ${userNameInput} não encontrado.`, { autoClose: 4000 })

        setUserFound(false);
      }
    })
  }

  const addUser = () => {
    const existingUser = usersList.findIndex((user) => user.userName === userName);
    if(existingUser == -1){
      api.post(`user/`, {userName: userName, name: name, avatar: avatar, url: url})
      .then(res => {
        toast(`Usuário ${userName} adicionado a lista.`, { autoClose: 4000 })
  
        setUserFound(false);
  
        setUserName('');
        setName('');
        setAvatar([]);
        setUrl('');
  
        getUsers();
      })
      .catch(err => {
        toast(`Falha em adicionar o usuário a lista.`, { autoClose: 4000 })
      })
    } else {
      toast(`Usuário já adicionado a lista.`, { autoClose: 4000 })
    }
  }

  const getUsers = () => {
    api.get(`users/`)
    .then(res => {
      setUsersList(res.data)
      getUsers();
    })
    .catch(err => {
      toast(`Falha em buscar os usuários.`, { autoClose: 4000 })
    })
  }

  const removeUser = (userName) => {
    api.delete(`user/${userName}`)
    .then(toast(`Usuário ${userName} removido com sucesso da lista.`, { autoClose: 4000 }))
    .catch(err => {
      toast("Erro ao remover usuário ${username}")
    })

  }

  return (
    <div className="App">
      <div className="app-container py-5 gap-y-5">
        <h1 className="text-5xl">Desafio Puma</h1>
        <div className="flex flex-col justify-center items-center w-2/3 gap-y-5">
          <input value={userNameInput} onChange={e => setUserNameInput(e.target.value)} className="w-2/5 px-4 py-1 rounded-2xl text-black placeholder-gray-500 text-2xl" placeholder='Digite o username do Github' />
          <button onClick={searchUserName} className="mt-2 px-4 py-1 rounded-2xl text-2xl">Adicionar</button>
        </div>
        <div className='flex flex-col justify-center items-center w-1/6'>
          {userFound && (
            <div className="w-full flex flex-col items-center gap-y-5">
              <h2 className="text-2xl">Usuário Encontrado:</h2>
              <div className='flex flex-col justify-center items-center bg-white w-3/4 h-full rounded-2xl'>
                <img src={avatar} className='w-full rounded-2xl'/>
                <h3 className="text-xl">Username: {userName}</h3>
                <h3 className="text-xl">Nome: {name}</h3>
                <button onClick={addUser} className="text-xl my-2 px-4 py-1 rounded-2xl">Adicionar a lista</button>
              </div>
            </div>
          )}
        </div>
        {
          usersList.length > 0 && (
            <div className='w-11/12 '>
              <h2 className="text-2xl mb-2">Lista de usuários adicionados:</h2>
              <input value={isAlphabeticOrder} type='checkbox' onChange={handleChangeAlphabetic} /><label className='ml-1 text-xl'>Deseja ordenar os usuários alfabeticamente?</label>
              <div className='flex items-center gap-x-4 mt-2'>
                {usersList.map((user) => (
                  <div key={user.userName} className='flex flex-col justify-center items-center bg-white rounded-2xl w-56'>
                    <img src={user.avatar} className='w-full rounded-2xl'/>
                    <h3 className="text-xl">Username: {user.userName}</h3>
                    <h3 className="text-xl">Nome: {user.name}</h3>
                    <button onClick={() => window.location.href = `https://github.com/${user.userName}`} className="text-xl my-2 px-4 py-1 rounded-2xl">Github</button>
                    <button onClick={() => removeUser(user.userName)} className="text-xl my-2 px-4 py-1 rounded-2xl remove">Remover da lista</button>
                  </div>
                ))}
              </div>
            </div>
          )
        }
      </div>
      <ToastContainer autoClose={8000} pauseOnFocusLoss={false}/>
    </div>
  );
}

export default App;
