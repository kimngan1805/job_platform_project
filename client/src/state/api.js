import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().global.token;
      if (token) {
        headers.set("Authorization", "Bearer ${token");
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Users",
    "Products",
    "Customers",
    "JobPosts",
    "Admins",
    "Dashboard",
    "Companies",
    "BannedCompanies",
  ],
  endpoints: (build) => ({
    // LOGIN
    loginAdmin: build.mutation({
      query: (Credentials) => ({
        url: "general/auth/login",
        method: "POST",
        body: Credentials,
      }),
    }),
    // job post query
    getJobPosts: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "management/jobposts",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["JobPosts"],
    }),
    updateJobPostStatus: build.mutation({
      query: ({ id, status, reason }) => ({
        url: `management/jobposts/${id}/status`,
        method: "PATCH",
        body: { status, reason },
      }),
      invalidatesTags: ["JobPosts"],
    }),

    deleteJobPost: build.mutation({
      query: (id) => ({
        url: `management/jobposts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["JobPosts"],
    }),
    // lay thong tin nguoi dung
    getUsers: build.query({
      query: (params) => {
        if (!params || Object.keys(params).length === 0) {
          return "management/users";
        }
        const queryString = new URLSearchParams(params).toString(); 
        return `management/users?${queryString}`;
      },
      providesTags: ["Users"],
    }),

    getCompanies: build.query({
      // *** ĐỔI TÊN HOOK NỘI BỘ ***
      query: () => "management/companies", // *** ĐỔI TÊN ENDPOINT ***
      providesTags: ["Companies"],
    }),
    // 1. THÊM CÔNG TY MỚI
    createCompany: build.mutation({
      query: (newCompany) => ({
        url: "management/companies",
        method: "POST",
        body: newCompany,
      }),
      invalidatesTags: ["Companies"], // Làm mới danh sách chính
    }),
    //  CẬP NHẬT SỬA -CẤM - XÁC THỰC
    updateCompany: build.mutation({
      query: ({ id, ...updates }) => ({
        url: `management/companies/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Companies", "BannedCompanies"], // Làm mới danh sách chính
    }),
    //  XÓA CT
    deleteCompany: build.mutation({
      query: (id) => ({
        url: `management/companies/${id}`,
        method: "DELETE",
        // Vì ta dùng soft delete (cập nhật status), nên dùng DELETE method là hợp lý với ngữ nghĩa RESTful
      }),
      invalidatesTags: ["Companies", "BannedCompanies"], // Làm mới danh sách chính
    }),

    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),

    updateUser: build.mutation({
      query: ({ id, ...updates }) => ({
        // Giả định backend có route PATCH /management/users/:id
        url: `management/users/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Admins"], // Tải lại danh sách Admin sau khi cập nhật
    }),

    // getUser: build.query({
    //   query: (id) => `general/user/${id}`,
    //   providesTags: ["User"],
    // }),
    // lay infor nguoi dung

    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),

    /* --- BANNED COMPANY MANAGEMENT (Trang Công ty Bị Cấm) --- */

    // 5. LẤY DANH SÁCH (Trang Bị Cấm)
    getBannedCompanies: build.query({
      query: () => "bannedcompany/bannedcompanies",
      providesTags: ["BannedCompanies"], // Cung cấp tag 'BannedCompanies'
      // invalidatesTags: ["BannedCompanies"],
    }),
    // 6. BỎ CẤM (Từ trang Bị Cấm)
    unbanCompany: build.mutation({
      query: (id) => ({
        url: `bannedcompany/unban/${id}`,
        method: "POST",
      }),
      // *** FIX LỖI TẢI LẠI: LÀM MỚI CẢ HAI DANH SÁCH ***
      invalidatesTags: ["BannedCompanies", "Companies"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  // useGetCustomersQuery,
  // useGetTransactionsQuery,
  // useGetGeographyQuery,
  // useGetSalesQuery,
  useGetAdminsQuery,
  useGetDashboardQuery,

  useGetBannedCompaniesQuery, // Thêm dòng này
  useUnbanCompanyMutation, // Thêm dòng này

  //  các hook export
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,

  useGetJobPostsQuery,
  useUpdateJobPostStatusMutation,
  useDeleteJobPostMutation,

  useUpdateUserMutation, // <--- EXPORT MỚI ĐÃ ĐƯỢC THÊM

  useLoginAdminMutation,
} = api;
