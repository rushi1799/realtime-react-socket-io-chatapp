import Axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import openSocket from "socket.io-client";
import axios from "axios";
import { Table } from "reactstrap";
const socket = openSocket("http://192.168.43.73:3000/");
const LiveVisitors = (props) => {
  const [visitors, setVisitors] = useState([]);
  useEffect(() => {
    axios.get("http://www.geoplugin.net/json.gp").then((res) => {
      const {
        geoplugin_request,
        geoplugin_countryCode,
        geoplugin_city,
        geoplugin_regionName,
        geoplugin_countryName,
      } = res.data;

      const newVisitor = {
        ip: geoplugin_request,
        flag: geoplugin_countryCode,
        city: geoplugin_city,
        state: geoplugin_regionName,
        country: geoplugin_countryName,
      };

      socket.emit("new_visitor", newVisitor);

      socket.on("visitors", (visitors) => {
        setVisitors(visitors);
      });
    });
  }, []);

  const renderTableBody = () => {
    return visitors.map((visitor, idx) => (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{visitor.ip}</td>
        <td>
          <img
            src={`https://www.countryflags.io/${visitor.flag}/shiny/32.png`}
          />
        </td>
        <td>{visitor.city}</td>
        <td>{visitor.state}</td>
        <td>{visitor.country}</td>
      </tr>
    ));
  };

  return (
    <Fragment>
      <h1>Current Users</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>IP</th>
            <th>Flag</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </Table>
    </Fragment>
  );
};

export default LiveVisitors;