import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import "../App.css";
import logo from "../static/logo.png";
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarSubMenu,
    CDBSidebarFooter,
  } from 'cdbreact';

import {NavLink} from 'react-router-dom';
const Navigation = () => {
    return (
        <div>
        {/* <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand className="app-logo" href="/">
                <img
                    alt=""
                    src={logo}
                    width="100"
                    height="50"
                    className="d-inline-block align-center"
                />{' '}
                
            </Navbar.Brand>
        
        </Navbar> */}
        
        <div className="sidebar" style={{ fontFamily: 'Times New Roman'}}>
        <CDBSidebar textColor="white" bg="dark" variant="dark" expand="lg">
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Navigation</CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Tableau de bord</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/chauffeurs" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Chauffeur Liste</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/taxis" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="taxi">Taxi Liste</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/carte_grises" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Carte grise List</CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink exact to="/visites" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Visite liste</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/assurances" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Assurance liste</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/agences" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Agence liste</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/capacites" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Capacite list</CDBSidebarMenuItem>
            </NavLink> */}
            {/* <NavLink exact to="/permis" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Permis list</CDBSidebarMenuItem>
            </NavLink> */}
            {/* <NavLink exact to="/categories" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Categories list</CDBSidebarMenuItem>
            </NavLink> */}
            <NavLink exact to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Utilisateur liste</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/course" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Course liste</CDBSidebarMenuItem>
            </NavLink>
            
           
          </CDBSidebarMenu>
        </CDBSidebarContent>

       
      </CDBSidebar>
        </div>
        </div>

    );
};

export default Navigation; 