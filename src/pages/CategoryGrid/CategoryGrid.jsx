import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import DataTable, { memoize } from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import api from "../../api";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
function pivot(arr) {
  var mp = new Map();

  function setValue(a, path, val) {
    if (Object(val) !== val) {
      // primitive value
      var pathStr = path.join(".");
      var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
      a[i] = val;
    } else {
      for (var key in val) {
        setValue(a, key == "0" ? path : path.concat(key), val[key]);
      }
    }
    return a;
  }

  var result = arr.map((obj) => setValue([], [], obj));
  return [[...mp.keys()], ...result];
}

function toCsv(arr) {
  return arr
    .map((row) =>
      row.map((val) => (isNaN(val) ? JSON.stringify(val) : +val)).join(",")
    )
    .join("\n");
}

function downloadCSV(array) {
  const link = document.createElement("a");
  let csv = toCsv(pivot(array));
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Search"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);
const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CategoryGrid = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState("");
  const [modalAddCategoryShow, setModalAddCategoryShow] = useState(false);
  const handleDelete = async () => {
    if (categoryIdToDelete == "") {
      return;
    }
    try {
      const response = await api.delete(
        `http://localhost:8090/categories/delete/${categoryIdToDelete}`
      );
      if (response.status == 200) {
        const newTableData = tableData.filter(
          (item) => item.categoryId !== categoryIdToDelete
        );
        setTableData(newTableData);
        toast.success("Category Deleted Successfully.", { autoClose: 1000 });
      }
    } catch (error) {
      if (error.code == "ERR_NETWORK") {
        navigate("/error", { replace: true });
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(
          "http://localhost:8090/categories/all"
        );
        setTableData(response.data);
      } catch (error) {
        // Handle error or redirect to login
        console.log(error);
      }
    };

    fetchCategories();
  }, []);
  const columns = [
    {
      name: "Category ID",
      selector: (row) => row.categoryId,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    // {
    //   name: "Actions",
    //   button: true,
    //   cell: (row) => {
    //     var url = "/products/" + row.productId;
    //     return (
    //       <Link className="link" to={url} target="_blank">
    //         View
    //       </Link>
    //     );
    //   },
    // },
  ];
  if (!tableData) {
    return <Container>Loading...</Container>;
  }

  const addCategory = (category) => {
    setTableData([...tableData, category]);
  };
  return (
    <Container className="mt-5 min-vh-100">
      <ToastContainer theme="dark" />
      <h3>Manage Categories</h3>
      <div className="icon-row d-flex gap-3 justify-content-end mt-4 mb-4">
        <Button
          className="btn-light btn-outline-dark btn-sm h-100"
          onClick={() => setModalAddCategoryShow(true)}
        >
          <AddIcon />
        </Button>
        <AddCategoryModal
          show={modalAddCategoryShow}
          onHide={() => setModalAddCategoryShow(false)}
          addCategory={addCategory}
        />
        <Button
          className="btn-light btn-outline-dark btn-sm h-100"
          onClick={() => setModalShow(true)}
        >
          <DeleteIcon />
        </Button>
        <ConfirmationModal
          text="Do you want to delete catgegory?"
          show={modalShow}
          onHide={() => setModalShow(false)}
          handleDelete={handleDelete}
        />
        <Button onClick={() => downloadCSV(tableData)}>Export</Button>
      </div>
      <DataTable
        className="mt-5"
        columns={columns}
        data={tableData}
        selectableRows
        selectableRowsSingle
        pagination
        dense
        highlightOnHover
        pointerOnHover
        striped
        responsive
        keyField="categoryId"
        onSelectedRowsChange={(e) =>
          setCategoryIdToDelete(
            e.selectedCount > 0 ? e.selectedRows[0].categoryId : ""
          )
        }
        persistTableHead
        selectableRowsHighlight
      />
    </Container>
  );
};

export default CategoryGrid;
