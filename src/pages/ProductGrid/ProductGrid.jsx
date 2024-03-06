import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api";
import AddProductModal from "../../components/AddProductModal/AddProductModal";

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
const ProductGrid = () => {
  const [tableData, setTableData] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState("");
  const [modalAddProductShow, setModalAddProductShow] = useState(false);
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch("http://localhost:8090/products/fetchAll")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);
  console.log(tableData);
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
    return <div>Loading...</div>;
  }


  const addProduct = (product) => {

    setTableData([...tableData, product]);
    
  }
  return (
    <Container className="admin-products mt-5 min-vh-100">
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
        data={tableData}
        selectableRows
        selectableRowsSingle
        pagination
        dense
        highlightOnHover
        pointerOnHover
        striped
        responsive
        keyField="productId"
        onSelectedRowsChange={(e) =>
          setProductIdToDelete(e.selectedCount > 0 ? e.selectedRows[0].productId : "")
        }
      />
    </Container>
  );
};

export default ProductGrid;
