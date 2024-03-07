import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import "./ProductGrid.scss";
import CategoryDropDown from "../../components/CategoryDropDown/CategoryDropDown";
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
const ProductGrid = () => {
  const [tableData, setTableData] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [modalAddProductShow, setModalAddProductShow] = useState(false);
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = tableData.filter(
    (item) =>
      (item.title &&
        item.title.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.categoryTitle &&
        item.categoryTitle.toLowerCase().includes(filterText.toLowerCase()))
  );
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  const handleDelete = async () => {
    if (productIdToDelete == "") {
      return;
    }
    try {
      const response = await api.delete(
        `http://localhost:8090/products/delete/${productIdToDelete}`
      );
      if (response.status == 200) {
        const newTableData = tableData.filter(
          (item) => item.productId !== productIdToDelete
        );
        setTableData(newTableData);
        toast.success("Product Deleted Successfully.", { autoClose: 1000 });
      }
    } catch (error) {
      if (error.code == "ERR_NETWORK") {
        navigate("/error", { replace: true });
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get(
          "http://localhost:8090/products/all?size=999"
        );
        setTableData(response.data.content);
      } catch (error) {
        // Handle error or redirect to login
        console.log(error);
      }
    };

    fetchProducts();
  }, []);
  const columns = [
    {
      name: "Product ID",
      selector: (row) => row.productId,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Quantity Available",
      selector: (row) => row.quantityAvailable,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.categoryTitle,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
  ];
  if (!tableData) {
    return <Container>Loading...</Container>;
  }

  const addProduct = (product) => {
    setTableData([...tableData, product]);
  };
  return (
    <Container className="admin-products mt-5 min-vh-100">
      <ToastContainer theme="dark" />
      <h3>Manage Products</h3>
      <div className="icon-row d-flex gap-3 justify-content-end mt-4 mb-4">
        <Button
          className="btn-light btn-outline-dark btn-sm h-100"
          onClick={() => setModalAddProductShow(true)}
        >
          <AddIcon />
        </Button>
        <AddProductModal
          show={modalAddProductShow}
          onHide={() => setModalAddProductShow(false)}
          addProduct={addProduct}
        />
        <Button
          className="btn-light btn-outline-dark btn-sm h-100"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </Button>
        <Button onClick={() => downloadCSV(tableData)}>Export</Button>
      </div>
      <DataTable
        className="mt-5"
        columns={columns}
        data={filteredItems}
        selectableRows
        selectableRowsSingle
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        dense
        highlightOnHover
        pointerOnHover
        striped
        responsive
        keyField="productId"
        onSelectedRowsChange={(e) =>
          setProductIdToDelete(
            e.selectedCount > 0 ? e.selectedRows[0].productId : ""
          )
        }
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        selectableRowsHighlight
      />
      <CategoryDropDown/>
    </Container>
  );
};

export default ProductGrid;
