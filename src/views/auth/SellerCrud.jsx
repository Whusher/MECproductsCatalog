import { useState, useEffect } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import { UserServices } from "../../components/Endpoints";

const initialUserForm = {
  email: '',
  rol: '',
  password: '',
  enterpriseName: '',
  whatsappNumber: '',
};

const UserCRUD = () => {
  const [userForm, setUserForm] = useState(initialUserForm);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${UserServices}/getAllUsers`);
      const data = await response.json();

      // Accede a data.data, que es donde se encuentran los usuarios
    if (data.success) {
      setUsers(data.data); // Usar data.data
    } else {
      console.error("Error al obtener los usuarios:", data.message);
    }
  } catch (error) {
    console.error("Hubo un problema con la solicitud Fetch:", error);
  }
};

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handlePresubmit = async () => {
    console.log(userForm);
    try {
      const response = await fetch(`${UserServices}/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userForm),
      });
      if (response.ok) {
        const newUser = await response.json();
        alert('Usuario Agregado Correctamente');
        setUsers([...users, newUser]);
        setUserForm(initialUserForm);
        setShowForm(false);
      } else {
        console.log('Algo salió mal');
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('Solicitud finalizada');
    }
  };

  const handleDeleteUser = async (index) => {
    try {
      const response = await fetch(`${UserServices}/deleteUser/${users[index].id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Administrar Usuarios</h2>
      <button
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow mb-6"
        onClick={toggleForm}
      >
        {showForm ? 'Ocultar Formulario' : 'Nuevo Usuario'}
      </button>
  
      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Correo</label>
              <input
                type="email"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Correo Electrónico"
                name="email"
                value={userForm.email}
                onChange={handleChange}
              />
            </div>
  
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Rol</label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Rol"
                name="rol"
                value={userForm.rol}
                onChange={handleChange}
              />
            </div>
  
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Contraseña</label>
              <input
                type="password"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Contraseña"
                name="password"
                value={userForm.password}
                onChange={handleChange}
              />
            </div>
  
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Nombre de Empresa</label>
              <input
                type="text"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Nombre de Empresa"
                name="enterpriseName"
                value={userForm.enterpriseName}
                onChange={handleChange}
              />
            </div>
  
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold">Número de WhatsApp</label>
              <input
                type="tel"
                className="border rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Número de WhatsApp"
                name="whatsappNumber"
                value={userForm.whatsappNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow mt-6"
            onClick={handlePresubmit}
          >
            Guardar Usuario
          </button>
        </div>
      )}
  
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Correo</th>
            <th className="py-3 px-4 text-left">Rol</th>
            <th className="py-3 px-4 text-left">Nombre de Empresa</th>
            <th className="py-3 px-4 text-left">Número de WhatsApp</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.rol}</td>
              <td className="py-3 px-4">{user.enterpriseName}</td>
              <td className="py-3 px-4">{user.whatsappNumber}</td>
              <td className="py-3 px-4 text-center">
                <button
                  className="text-red-600 hover:text-red-500"
                  onClick={() => handleDeleteUser(index)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserCRUD;
