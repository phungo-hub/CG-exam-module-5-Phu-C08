import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button, Table, Nav } from "react-bootstrap";
import axios from "axios";

export default function Products() {
  const BASE_URL = "http://localhost:3001/products";
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products) {
      axios
        .get(`${BASE_URL}`)
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [products]);

  const handleCreate = () => {
    navigate("/product/add");
  };

  return (
    <>
      <div>
        <h1>Danh sách sản phẩm</h1>
        <Button
          className="mb-3"
          variant="primary"
          type="button"
          onClick={handleCreate}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Giá(đ)</th>
            <th>Tồn kho</th>
            <th colSpan={2}>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>
                <Nav.Link href={`product/${product.id}`}>
                  {product.name}
                </Nav.Link>
              </td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Button variant="success">
                  <Nav.Link href={`/product/edit/${product.id}`}>
                    Cập nhật
                  </Nav.Link>
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    navigate(`/product/delete/${product.id}`);
                  }}
                >
                  Xoá
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
