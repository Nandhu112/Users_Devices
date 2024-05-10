import React, { useState } from 'react';
import { useAddDeviceMutation } from '../../slices/adminApiSlice';
import { toast } from "react-toastify";

function AddDevice({ setopernAddDevice, refetch }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState({});
  const [addDevice, { isLoading }] = useAddDeviceMutation();

  const handleValidation = () => {
    const errors = {};

    // Name Validation (AlphaNumeric Only) - Required
    if (!name.trim()) {
      errors.name = 'Name is required.';
    } else if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      errors.name = 'Name must contain only alphanumeric characters.';
    }

    // Type Validation - Required
    if (!type.trim()) {
      errors.type = 'Type is required.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const res = await addDevice({ name, type }).unwrap();
        console.log(res, 'chkkk response');
        toast.success(res.success);
        refetch();
        setopernAddDevice(false);
      } catch (error) {
        console.error('API call failed:', error);
        toast.error(error.data.message);
      }
    } else {
      console.log('Form validation failed.');
    }
  };

  const handleCloseModal = () => {
    setopernAddDevice(false);
  };

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
                  <select
                    className={`w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500 ${errors.type && 'border-red-500'}`}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="Web">Web</option>
                    <option value="Android">Android</option>
                    <option value="iOS">iOS</option>
                  </select>
                  {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
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

export default AddDevice;
