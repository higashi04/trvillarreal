import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import DriverBox from "../../components/Driver-box/Driver-Box";

const Drivers = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "#669BC7";
  });
  useEffect(() => {
    const getDrivers = () => {
      let url;
      switch (user.company.toLowerCase()) {
        case "medline":
          url =
            "https://transportes-villarreal.herokuapp.com/drivers/getDrivers/medline";
          break;
        case "oes":
          url =
            "https://transportes-villarreal.herokuapp.com/drivers/getDrivers/oes";
          break;
        case "bpi":
          url =
            "https://transportes-villarreal.herokuapp.com/drivers/getDrivers/bpi";
          break;
        case "aistermi":
          url =
            "https://transportes-villarreal.herokuapp.com/drivers/getDrivers/aistermi";
          break;
        default:
          url = "https://transportes-villarreal.herokuapp.com/drivers/getDrivers";
          break;
      }
      try {
        const options = { method: "GET", url: url };
        axios
          .request(options)
          .then((res) => setData(res.data))
          .catch(function (error) {
            console.error(error);
          });
      } catch (e) {
        console.error(e);
      }
    };
    getDrivers()
  }, [user.company])

  return (
    <main className="pb-5">
      <h1 className="offset-md-5">Choferes</h1>

      {data.map((item) => (
        <DriverBox key={item._id} name={item.name} id={item._id} />
      ))}
    </main>
  );
};

export default Drivers;
