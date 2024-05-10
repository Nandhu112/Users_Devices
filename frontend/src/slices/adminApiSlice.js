import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';
const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
        query: () => ({
          url: `${ADMIN_URL}/logout`,
          method: "POST",
        }),
      }),
      AdminListUser: builder.query({
        query: () => ({
          url: `${ADMIN_URL}/adminListUsers`,
          method: 'GET',      
        }),
      }),
      AdminListDevice: builder.query({
        query: () => ({
          url: `${ADMIN_URL}/listDevices`,
          method: 'GET',      
        }),
      }),
      AddUser: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/registerUser`,
          method: 'POST',
          body: data,
        }),
      }),
      AddDevice: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/addDevice`,
          method: 'POST',
          body: data,
        }),
      }),
      EditDevice: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/editDevice`,
          method: 'PUT',
          body: data,
        }),
      }),
      DeleteDevice: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/deleteDevice`,
          method: 'DELETE',
          body: data,
        }),
      }),
      
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAdminListUserQuery,
  useAddUserMutation,
  useAdminListDeviceQuery,
  useAddDeviceMutation,
  useEditDeviceMutation,
  useDeleteDeviceMutation

} = adminApiSlice;