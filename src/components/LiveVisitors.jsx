import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { Table } from "reactstrap";
const LiveVisitors = (props) => {
  const [visitors, setVisitors] = useState([]);
  const socket = useContext(SocketContext);
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
  }, [socket]);

  const renderTableBody = () => {
    return visitors.map((visitor, idx) => (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{visitor.ip}</td>
        <td>
          <img
            src={`https://www.countryflags.io/${visitor.flag}/shiny/32.png`}
            alt={visitor.flag}
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
