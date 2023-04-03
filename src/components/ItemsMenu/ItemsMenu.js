import { Link } from 'react-router-dom';

import './styles.css';
import { useEffect, useState } from "react";
import { CategoriesServiceApi } from "../../api/CategoiesService.api";

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
                categories.map(({ type, label }) => (
                    <div className='menu-item'>
                        <Link
                          key={type}
                          to={`/categories/${type}?n=${label}`}
                          className="link"
                        >{label}</Link>
                    </div>
                ))
            }
        </div>
    );
};