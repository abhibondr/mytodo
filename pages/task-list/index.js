import React, { useState } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { createTask, updateTask } from "@/lib/task";
import { useRouter } from "next/router";
import ItemList from "@/components/items/ItemList";

const TaskList = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({ title: "", status: "pending" });

  const handleClose = () => {
    setOpen(false);
  };

  const addTask = () => {
    setOpen(true);
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleTask = () => {
    //post
    createTask(task)
      .then((response) => {
        handleClose();
        refreshData();
        alert("created...");
      })
      .catch((err) => {
        console.error(err);
        alert("Could not created...");
      });
  };

  //update the status

  const handleStatusUpdate = (status) => (task) => {
    console.log("handleStatusUpdate...");
    updateTask(task.id, { ...task, status }).then((response) => {
      console.log("Updated...");
      refreshData();
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            label="Title"
            onChange={(e) =>
              setTask((state) => ({ ...state, title: e.target.value }))
            }
          />
          <Button variant="contained" onClick={handleTask}>
            Add
          </Button>
        </DialogContent>
      </Dialog>

      <h3>Task List</h3>
      <Button variant="contained" onClick={addTask}>
        New +
      </Button>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ItemList
              title="Pending Tasks"
              bgColor="cyan"
              btnLabel="Start"
              onClick={handleStatusUpdate("ongoing")}
              refreshData={refreshData}
              items={data?.filter((t) => t.status == "pending")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ItemList
              title="Ongoing Tasks"
              bgColor="palegreen"
              btnLabel="Finish"
              refreshData={refreshData}
              onClick={handleStatusUpdate("completed")}
              items={data?.filter((t) => t.status == "ongoing")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ItemList
              title="Completed Tasks"
              bgColor="pink"
              btnLabel="ReStart"
              refreshData={refreshData}
              onClick={handleStatusUpdate("pending")}
              items={data?.filter((t) => t.status == "completed")}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TaskList;

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:8080/tasks");
  return {
    props: {
      data: response?.data,
    },
  };
}
