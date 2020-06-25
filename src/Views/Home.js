import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import ProductCard from "../Components/ProductCard";

function Home() {
    //show the first 10 products
    const url = `https://5ef401f8ac6d1e00168c99e4.mockapi.io/api/v1/Products?page=1&limit=10`;

    // loopiung through an array of products
    const [products, setProducts] = useState({
        loading: false,
        data: null,
        error: false,
    });

    // need to catch errors so make it false at the start
    useEffect(() => {
        setProducts({
            loading: true,
            data: null,
            error: false,
        });
        // return a promise so chain a THEN funtion. This function then can give us back the response from the request, we will then fun a function on that response. On that response, we will set a variable

        axios
            .get(url)
            .then((response) => {
                // set product will be th response.data
                setProducts({
                    loading: false,
                    data: response.data,
                    error: false,
                });
                // console.log(response.data);
                // debugger;
            })
            // simple error catch
            .catch(() => {
                setProducts({
                    loading: true,
                    data: null,
                    error: true,
                });
            });
    }, [url]);

    let content = null;

    // if an error on loading on products, jsut show a simple error message
    if (products.error) {
        content = <p>There was error. Please try refreshing</p>;
    }
    // show the loading image if products are being loaded
    if (products.loading) {
        content = <Loader />;
    }

    // show all the 10 products data if we have it.
    if (products.data) {
        // use a map to loop throug an output the products
        content = products.data.map((product, key) => (
            <div key={key}>
                <ProductCard product={product} />
            </div>
        ));
    }

    return (
        <div>
            <h1 className="font-bold text-2xl">Best Sellers</h1>
            {content}
        </div>
    );
}

export default Home;
