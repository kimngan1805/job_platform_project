import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",

    "Companies",
    "BannedCompanies",
  ],
  // refetchOnMountOrArgChange: true,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),

    getCompanies: build.query({ // *** ĐỔI TÊN HOOK NỘI BỘ ***
      query: () => "management/companies", // *** ĐỔI TÊN ENDPOINT ***
      providesTags: ["Companies"],
    }),
    // 1. THÊM CÔNG TY MỚI
    createCompany: build.mutation({
      query: (newCompany) => ({
        url: 'management/companies',
        method: 'POST',
        body: newCompany,
      }),
      invalidatesTags: ['Companies'], // Làm mới danh sách chính
    }),
//  CẬP NHẬT SỬA -CẤM - XÁC THỰC
    updateCompany: build.mutation({
      query: ({ id, ...updates }) => ({
        url: `management/companies/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['Companies', 'BannedCompanies'], // Làm mới danh sách chính
    }),
//  XÓA CT
    deleteCompany: build.mutation({
      query: (id) => ({
        url: `management/companies/${id}`,
        method: 'DELETE',
        // Vì ta dùng soft delete (cập nhật status), nên dùng DELETE method là hợp lý với ngữ nghĩa RESTful
      }),
      invalidatesTags: ['Companies', 'BannedCompanies'], // Làm mới danh sách chính
    }),


    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
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
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,

  useGetBannedCompaniesQuery, // Thêm dòng này
  useUnbanCompanyMutation,    // Thêm dòng này

  //  các hook export 
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = api;
