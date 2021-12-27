import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import './Admin.css';

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddIcon from "@mui/icons-material/Add";
import AddEvent from "./AddEvent";
import Header from "../Header/Header";
import EventList from "./EventList";

const drawerWidth = 240;

const Admin = () => {

  const [active, setActive] = useState({add :true})

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: "100%" }}
        style={{ background: "white" }}
      >
        <Header />
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          zIndex: '0',
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#a9a9a9c4",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List className="list" onClick={()=>setActive({list :true})}>
          <PeopleAltIcon /> Volunter Regester List
        </List>
        <List className='list' onClick={()=>setActive({add :true})}>
          <AddIcon /> Add Events
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, background: "bisque", height: '100vh', p: 3 }}
      >
         <Toolbar />
         
         {
          active.add && <AddEvent />
         }
        { 
          active.list && <EventList />
        }
        <Toolbar />
      </Box>
    </Box>
  );
};

export default Admin;
