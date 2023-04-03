import { Link } from 'react-router-dom';

import './styles.css';
import { useEffect, useState } from "react";
import { CategoriesServiceApi } from "../../api/CategoiesService.api";
import { ca } from "date-fns/locale";

const menuItems = [
    { id: 1, text: 'Books', link: '/#' },
    { id: 2, text: 'Make-Up', link: '/#' },
    { id: 3, text: 'For children', link: '/#' },
    { id: 4, text: 'For mummies', link: '/#' },
    { id: 5, text: 'Big daddies', link: '/#' },
];

export const ItemsMenu = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
       new CategoriesServiceApi()
         .getCategories()
         .then(setCategories);
    }, []);

    return (
        <div className='menu-items'>
            {
                categories.map(({ type, label, categoryTypeId }) => (
                    <div className='menu-item' key={categoryTypeId}>
                        <Link
                          to={`/categories/${type}?n=${label}&id=${categoryTypeId}`}
                          className="link"
                        >{label}</Link>
                    </div>
                ))
            }
        </div>
    );
};