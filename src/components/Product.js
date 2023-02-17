import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Product = () => {
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

  return (
    <>
      <Form>
        {" "}
        <div>
          <h1>Chi tiết sản phẩm</h1>
          <Button className="mb-3" variant="primary" type="button" onClick={() => navigate("/")}>
            Danh sách
          </Button>
        </div>
        <div>
          <Form.Control
            type="text"
            value={product.name || ""}
            name="name"
            readOnly
          />
          <div className="">
            <Form.Label>Giá(đ)</Form.Label>
            <Form.Control
              type="text"
              value={product.price || ""}
              name="price"
              readOnly
            />
            <Form.Label>Tồn kho</Form.Label>
            <Form.Control
              type="text"
              value={product.stock || ""}
              name="stock"
              readOnly
            />
          </div>
          <div>
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              type="text"
              value={product.description || ""}
              name="description"
              readOnly
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default Product;
