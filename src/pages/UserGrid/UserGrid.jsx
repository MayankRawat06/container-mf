import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import api from "../../api";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const newArray = array.map(({ password, ...keepAttrs }) => keepAttrs);
  let csv = toCsv(pivot(newArray));
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
const UserGrid = () => {
  const [tableData, setTableData] = useState([]);
  const [userEmailToDelete, setUserEmailToDelete] = useState("");
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = tableData.filter(
    (item) =>
      (item.name &&
        item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(filterText.toLowerCase()))
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
    if (userEmailToDelete == "") {
      return;
    }
    try {
      const response = await api.delete(
        `http://localhost:8080/users/delete/${userEmailToDelete}`
      );
      if (response.status == 200) {
        const newTableData = tableData.filter(
          (item) => item.email !== userEmailToDelete
        );
        setTableData(newTableData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("http://localhost:8080/users/all");
        setTableData(response.data);
      } catch (error) {
        // Handle error or redirect to login
        console.log(error);
      }
    };

    fetchUsers();
  }, []);
  console.log(tableData);
  const columns = [
    {
      name: "User ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
  ];
  if (!tableData) {
    return <div>Loading...</div>;
  }
  return (
    <Container className="admin-products mt-5 min-vh-100">
      <h3>Manage Users</h3>
      <div className="icon-row d-flex gap-3 justify-content-end mt-4 mb-4">
        <Button
          className="btn-light btn-outline-dark btn-sm"
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
        keyField="userID"
        onSelectedRowsChange={(e) =>
          setUserEmailToDelete(
            e.selectedCount > 0 ? e.selectedRows[0].email : ""
          )
        }
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
      />
    </Container>
  );
};

export default UserGrid;
