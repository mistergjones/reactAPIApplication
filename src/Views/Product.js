import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";

// ?pages=1&limit=10

function Product() {
    // destructure id from the UseParams() hook
    const { id } = useParams();
    const url = `https://5ef401f8ac6d1e00168c99e4.mockapi.io/api/v1/Products/${id}`;

    const [product, setProduct] = useState({
        loading: false,
        data: null,
        error: false,
    });

    let content = null;

    // need to catch errors so make it false at the start
    useEffect(() => {
        setProduct({
            loading: true,
            data: null,
            error: false,
        });
        // return a promise so chain a THEN funtion. This function then can give us back the response from the request, we will then fun a function on that response. On that response, we will set a variable

        axios
            .get(url)
            .then((response) => {
                // set product will be th response.data
                setProduct({
                    loading: false,
                    data: response.data,
                    error: false,
                });
                // console.log(response.data);
                // debugger;
            })
            // simple error catch
            .catch(() => {
                setProduct({
                    loading: true,
                    data: null,
                    error: true,
                });
            });
    }, [url]);

    // if an error on loading, jsut show a simple error message
    if (product.error) {
        content = <p>There was error. Please try refreshing</p>;
    }
    // show the loading image if products are being loaded
    if (product.loading) {
        content = <Loader />;
    }

    // show the informatoin if we have it.
    if (product.data) {
        content = (
            <div>
                <h1 className="text-2xl font-bold mb-3">{product.data.name}</h1>

                <div>
                    <img
                        src={product.data.images[0].imageURL}
                        alt={product.data.name}
                    />
                </div>
                <div className="font-bold text-xl mb-3">
                    $ {product.data.price}
                </div>
                <div>{product.data.description}</div>
            </div>
        );
    }
    return <div>{content}</div>;
}

export default Product;
