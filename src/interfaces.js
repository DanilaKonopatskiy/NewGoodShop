// Common Ints

class Category {
    /** @type {string} */
    id;
    /** @type {string} */
    type;
    /** @type {string} */
    label;
}

class Good {
    /** @type {string} */
    categoryTypeId;
    /** @type {string} */
    description;
    /** @type {string} */
    id;
    /** @type {string} */
    img;
    /** @type {string} */
    label;
    /** @type {string} */
    price;
}

class GoodInCart {
    /** @type {string} */
    good;
    /** @type {string} */
    count;
    /** @type {string} */
    id;
}

class GoodsSearch {
    /** @type {string} */
    ids;
    /** @type {string} */
    categoryTypeIds;
    /** @type {number} */
    minPrice;
    /** @type {number} */
    maxPrice;
    /** @type {string} */
    text;
    /** @type {number} */
    limit;
    /** @type {number} */
    offset;
    /** @type {keyof Good} */
    sortBy;
    /** @type {'asc' | 'desc'} */
    sortDirection;
}

// ApiInts Bodies

class ApiAuthBody {
    /** @type {string} */
    login;
    /** @type {string} */
    password;
}

class ApiCartBody extends GoodInCart { }

// ApiInts Responses

class ApiCategoriesResp {
    /** @type {Category[]} */
    categories;
}

class ApiPopularCategoriesResp {
    /** @type {Category} */
    category;
    /** @type {Good[]} */
    items;
}

class ApiGoodsResp {
    /** @type {Good[]} */
    items;
    /** @type {number} */
    total;
}

class ApiLoginResp {
    /** @type {string} */
    login;
    /** @type {string} */
    token;
}

class ApiRegistrationResp {
    /** @type {{
     *    login: string;
     *    password: string;
     *    id: string;
     * }} */
    user;
}

class ApiCartResp extends GoodInCart { }
