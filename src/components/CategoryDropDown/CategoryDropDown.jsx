import React, {useState, useEffect} from "react";
import api from "../../api";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
const CategoryDropDown = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
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

    fetchCategories();
  }, []);

  if (!categories) {
    return <div>Loading...</div>;
  }
    return (
        <Form.Select>
          {categories &&
            categories.map((item) => {
              const id = item.categoryId;

              return (
                <option value={id} key={id} onClick={console.log(id)}>
                  {item.title}
                </option>
              );
            })}
        </Form.Select>
    );
};

export default CategoryDropDown;
