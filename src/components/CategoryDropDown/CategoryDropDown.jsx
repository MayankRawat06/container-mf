import React, {useState, useEffect} from "react";
import api from "../../api";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
const CategoryDropDown = ({category, setCategory}) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const fetchCategories = async () => {
    try {
      const response = await api.get("http://localhost:8090/categories/all");
      setCategories(response.data);
    } catch (error) {
      // Handle error or redirect to login
      console.log(error);
      if (error.code == "ERR_NETWORK") {
        navigate("/error", { replace: true });
      }
    }
  };
  useEffect(() => {
    

    fetchCategories();
  }, []);

  if (!categories) {
    return (
      <Container className="min-vh-100 d-flex justify-content-center">
        <Spinner className="position-fixed top-50" animation="grow" />
      </Container>
    );
  }
    return (
      <div className="category-wrapper mb-4">
        <p>Category</p>
        <Form.Select required onClick={(e) => setCategory(e.target.value)}>
          <option value="Select">Select</option>
          {categories &&
            categories.map((item) => {
              return (
                <option value={item.title} key={item.categoryId}>
                  {item.title}
                </option>
              );
            })}
        </Form.Select>
      </div>
    );
};

export default CategoryDropDown;
