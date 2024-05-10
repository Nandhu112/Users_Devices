import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';
const ADMIN_URL = '/api/admin';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query:()=>({
        url:`${USERS_URL}/logout`,
        method:'POST',
      })
    }),
    Register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    UpdateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile-updateImage`,
        method: "PUT",
        body: data,
      }),
    }),
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `admin/auth`,
        method: "POST",
        body: data,
      }),
    }),
    listUsers: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/list-users`,
        method: "GET",
        body: data,
      }),
    }),
    searchUsers: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/search-users`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/delete-user`,
        method: "POST",
        body: data,
      }),
    }),
    getUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/get-user`,
        method: "POST",
        body: data,
      }),
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/edit-user`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useUpdateProfileImageMutation,
  useAdminLoginMutation,
  useListUsersMutation,
  useDeleteUserMutation,
  useSearchUsersMutation,
  useEditUserMutation,
  useGetUserMutation,
  useAdminLogoutMutation
  
} = userApiSlice;