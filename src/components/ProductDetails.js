import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";

const ProductDetails = () => {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3001/products";
  const { productId } = useParams();
  const isCreated = !productId;
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (productId) {
      axios
        .get(`${BASE_URL}/${ productId }`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          throw err;
        })
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (isCreated) {
      axios
        .post(`${BASE_URL}`, product)
        .then((res) => {
          alert(`
                    Create product ${JSON.stringify(res.data)} successfully
                `);
          navigate("/");
        })
        .catch((err) => {
          throw err;
        });
    } else {
      axios
        .put(`${BASE_URL}/${productId}`, product)
        .then((res) => {
          alert(`Cập nhật sản phẩm ${JSON.stringify(res.data)} thành công`);
          navigate("/");
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <>
    <h1> {isCreated ? "Thêm sản phẩm" : "Cập nhật sản phẩm"} </h1>
    <div className="mb-3">
        <Form.Label>Tên sản phẩm</Form.Label>
        <Form.Control
          type="text"
          value={product.name || ""}
          name="name"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <Form.Label>Giá(đ)</Form.Label>
        <Form.Control
          type="text"
          value={product.price || ""}
          name="price"
          onChange={handleChange}
        />
        <Form.Label>Tồn kho</Form.Label>
        <Form.Control
          type="text"
          value={product.stock || ""}
          name="stock"
          onChange={handleChange}
        />
      </div>
      <div>
        <Form.Label>Mô tả</Form.Label>
        <Form.Control
          type="text"
          value={product.description || ""}
          name="description"
          onChange={handleChange}
        />
      </div>
      <div className="mt-3">
      <Button variant="primary" type="button" onClick={handleSubmit}>{isCreated ? "Thêm mới" : "Cập nhật"}</Button>
      <Button variant="secondary" type="button" onClick={() => navigate("/")}>Huỷ</Button>  
      </div>
    </>
  );
};

export default ProductDetails;
