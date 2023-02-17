import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Delete = () => {
  const BASE_URL = "http://localhost:3001/products";
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      axios
        .get(`${BASE_URL}/${productId}`)
        .then((res) => {
          setProduct(res.data);
          console.log(product);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [productId]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/products/${id}`)
      .then((res) => {
        alert(res.status);
        navigate("/");
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <Form>
        <div>
          <h1>Chi tiết sản phẩm</h1>
          <Button
            variant="primary"
            className="mb-3"
            type="button"
            onClick={() => navigate("/")}
          >
            Danh sách
          </Button>
        </div>
        <div>
          <Form.Control
            type="text"
            value={product.name || ""}
            name="name"
            disabled
          />
          <div>
            <Form.Label>Giá(đ)</Form.Label>
            <Form.Control
            className="mb-3"
              type="text"
              value={product.price || ""}
              name="price"
              disabled
            />
            <Form.Label>Tồn kho</Form.Label>
            <Form.Control
              type="text"
              value={product.stock || ""}
              name="stock"
              disabled
            />
          </div>
          <div>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              type="text"
              value={product.description || ""}
              name="description"
              disabled
            />
          </div>
        </div>
        <Button
          className="mt-3"
          variant="danger"
          type="button"
          onClick={() => handleDelete(product.id)}
        >
          Xoá
        </Button>
        <Button
          className="mt-3"
          variant="secondary"
          type="button"
          onClick={() => () => navigate("/")}
        >
          Huỷ
        </Button>
      </Form>
    </>
  );
};

export default Delete;
