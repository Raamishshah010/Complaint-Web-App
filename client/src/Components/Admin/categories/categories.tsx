import { FunctionComponent, useEffect, useState } from "react";
import Sidebar from "../Sidebar/sidebar";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import { apiUrl } from "../../Utils/utility";
import CategoryTable from "./CategoryTable";
import { Link } from "react-router-dom";

interface CategoriesProps {}

const Categories: FunctionComponent<CategoriesProps> = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const getCategories = () => {
      var config = {
        method: "get",
        url: apiUrl + "category",
      };
      return axios(config);
    };

    getCategories()
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  const deleteHandler = (cid: string) => {
    const confirm = window.confirm("Are you you want tot delete?");

    if (!confirm) return;

    let admin = JSON.parse(sessionStorage.getItem("complaintadmin") || "{}");

    var config = {
      method: "delete",
      url: apiUrl + `category/delete/${cid}`,
      headers: {
        "x-auth-header": admin.token,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        let allcategories = [...categories];
        allcategories = allcategories.filter(
          (item) => item._id !== cid
        );
        setCategories(allcategories);
        alert("successfully deleted!!!");
      })
      .catch(function (error) {
        console.log(error);
        alert(error.message);
      });
  };
  return (
    <Sidebar>
      <Container>
        <h3>Categories</h3>
        <Link to="/admin/categories/add" className="btn primary-button">
          Add Category
        </Link>
        <CategoryTable data={categories} deleteItem={deleteHandler} />
      </Container>
    </Sidebar>
  );
};

export default Categories;
