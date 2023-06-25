import React from "react";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { deleteTask } from "@/lib/task";
import Swal from "sweetalert2";

const Item = ({ id, title, btnLabel, onClick, refreshData }) => {
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id).then((response) => {
          refreshData();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  };

  return (
    <Card variant="elevation" sx={{ padding: 2, marginBottom: 2 }}>
      <Typography>{title}</Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Button onClick={() => onClick({ id, title })} variant="contained">
          {btnLabel}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </Box>
    </Card>
  );
};

const ItemList = ({
  items,
  btnLabel,
  onClick,
  bgColor,
  title,
  refreshData,
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        backgroundColor: bgColor,
        padding: 2,
        maxHeight: "100vh",
        overflow: "scroll",
      }}
    >
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      {Array.isArray(items) ? (
        items.map((task) => (
          <Item
            key={task.id}
            {...task}
            btnLabel={btnLabel}
            onClick={onClick}
            refreshData={refreshData}
          />
        ))
      ) : (
        <h3>Tasks not available</h3>
      )}
    </Paper>
  );
};
export default ItemList;
