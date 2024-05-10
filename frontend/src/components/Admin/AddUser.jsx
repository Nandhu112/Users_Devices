import React, { useState } from 'react';
import { useAddUserMutation } from '../../slices/adminApiSlice';
import { toast } from "react-toastify";

function AddUser({setOpenAddUser,refetch}) {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleValidation = () => {
    const errors = {};

    // Name Validation (AlphaNumeric Only) - Required
    if (!name.trim()) {
      errors.name = 'Name is required.';
    } else if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      errors.name = 'Name must contain only alphanumeric characters.';
    }

    // UserName Validation (AlphaNumeric and Underscore only) - Required
    if (!userName.trim()) {
      errors.userName = 'Username is required.';
    } else if (!/^[a-zA-Z0-9_]+$/.test(userName)) {
      errors.userName = 'Username must contain only alphanumeric characters and underscores.';
    }

    // Email Validation (Must have unique email address) - Required
    // For unique email validation, you need to implement your own logic
    // This is just a basic format validation
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Email must be valid.';
    }

    // Phone Number Validation (Must have numeric and 10 digit) - Required
    if (!phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Phone number must be numeric and 10 digits.';
    }

    // Password Validation (Minimum 8 characters) - Required
    if (!password.trim()) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (handleValidation()) {
    try {
      const res = await addUser({ name, userName, email, phone, password }).unwrap();
      console.log(res, 'chkkk response');
      toast.success(res.success);
      refetch()
      setOpenAddUser(false)
    } catch (error) {
      console.error('API call failed:', error);
      toast.error(error.data.message);
    }
    
  } else {
    console.log('Form validation failed.');
  }

};

  const handleCloseModal=()=>{
    setOpenAddUser(false)
  }

  return (
    <div className="mt-5 fixed z-10 inset-0 overflow-y-auto">
      {/* Modal Background */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal Overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        {/* Modal Content */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Modal Header */}
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add User</h3>
                {/* Input Fields */}
                <div className="mt-2">
                  <input 
                    type="text" 
                    className={`w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500 ${errors.name && 'border-red-500'}`} 
                    placeholder="Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div className="mt-2">
                  <input 
                    type="text" 
                    className={`w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500 ${errors.userName && 'border-red-500'}`} 
                    placeholder="User Name" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
                </div>
                <div className="mt-2">
                  <input 
                    type="email" 
                    className={`w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500 ${errors.email && 'border-red-500'}`} 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="mt-2">
                  <input 
                    type="tel" 
                    className={`w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500 ${errors.phone && 'border-red-500'}`} 
                    placeholder="Phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="mt-2">
                  <input 
                    type="password" 
                    className={`w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500 ${errors.password && 'border-red-500'}`} 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
              </div>
            </div>
          </div>
          {/* Modal Footer with Submit Button */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button 
              type="button" 
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
