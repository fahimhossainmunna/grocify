import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const grocifyApi = createApi({
  reducerPath: "grocifyApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://your-api.com/api/",   // 👈 তোমার API URL দাও
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Products", "Orders", "User"],

  endpoints: (builder) => ({

    // ── Products ──────────────────────────────
    getProducts: builder.query({
      query: ({ category, search, sort, page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams();
        if (category && category !== "All") params.append("category", category);
        if (search)   params.append("search", search);
        if (sort)     params.append("sort", sort);
        params.append("page",  page);
        params.append("limit", limit);
        return `products?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // ── Auth ──────────────────────────────────
    login: builder.mutation({
      query: (credentials) => ({
        url:    "auth/login",
        method: "POST",
        body:   credentials,   // { email, password }
      }),
    }),

    register: builder.mutation({
      query: (userData) => ({
        url:    "auth/register",
        method: "POST",
        body:   userData,      // { name, email, password }
      }),
    }),

    // ── Orders ───────────────────────────────
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url:    "orders",
        method: "POST",
        body:   orderData,
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrders: builder.query({
      query: () => "orders/my",
      providesTags: ["Orders"],
    }),

  }),
});

// ── Export hooks ──────────────────────────────────────────────
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useLoginMutation,
  useRegisterMutation,
  usePlaceOrderMutation,
  useGetOrdersQuery,
} = grocifyApi;