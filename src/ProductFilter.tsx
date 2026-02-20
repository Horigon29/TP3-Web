import {useState} from "react";

function ProductFilter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [maxPrice, setMaxPrice] = useState(1000);

    const reinisialiser = () => {
        setSearchTerm('');
        setCategory('all');
        setMaxPrice(1000);
    }

    const products = [
        { id: 1, name: 'Laptop', category: 'Electronics', price: 1000 },
        { id: 2, name: 'Phone', category: 'Electronics', price: 500 },
        { id: 3, name: 'Desk', category: 'Furniture', price: 300 },
        { id: 4, name: 'Chair', category: 'Furniture', price: 150 },
        { id: 5, name: 'Lamp', category: 'Furniture', price: 50 }
    ];

    const filteredProducts = products.filter(product => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesCategory = category === 'all' ||
                product.category === category;

            const matchesPrice = product.price <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
    });

    return (
        <div>
            <input type={"text"} onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
            <br/>
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All</option>
                <option value={"Electronics"}>Electronics</option>
                <option value={"Furniture"}>Furniture</option>
            </select>
            <br/>
            <input type={"range"} id={"maxPrice"} max={1000} step={1} onChange={e=> {setMaxPrice(e.target.value)}} value={maxPrice}/>
            <label htmlFor={"maxPrice"}>Max Price : {maxPrice}</label>

            <p>{filteredProducts.length} produits trouvées</p>

            {filteredProducts.map(product =>
            <ul>
                <li key={product.id}>{product.name}-{product.category}-{product.price}€</li>
            </ul>
            )}

            <button onClick={reinisialiser}>réinisialiser</button>
        </div>
    );
}

export default ProductFilter;