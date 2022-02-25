module.exports = {
  SCHEMAS: {
    USERS: "users",
    PRODUCTS: "products",
    CART : "cart",
    ORDER : "order"
  },
  STATUS_CODES: {
    NOT_FOUND: 404,
    SUCCESS: 200,
    SERVER_ERROR: 500,
    FILE_NOT_FOUND: 404,
  },
  ROUTES: {
    ROOT: "/",
    USER: {
      LOGIN: "/login",
      REGISTER: "/register",
      PROFILE: "/show",
      UPDATE: "/update"
    },
    ORDER: {
      ADD : "/add",
      HISTORY : "/history",
      SEARCH : "/search",
      FILTER : "/filter"
    },
    PRODUCT:{ 
      ADD: "/add",
      DISPLAY : "/display",
      BESTSELLER : "/bestseller",
      SEARCHBYID : "/searchbyid",
      SEARCH : "/search",
      UPDATE : "/updatestocks"
    },
    CART:{
      ADD: "/add",
      DISPLAY: "/display",
      REMOVE : "/remove",
      UPDATE : "/update",
      REMOVEALL : "/removeall"
    },
  },
};
