"use client";
import React, { useState, useEffect } from "react";

function SignInComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("api/data", { method: "GET" })
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div key={item._id}>
          이름:{item.name} <div>닉네임: {item.nickName}</div>{" "}
        </div>
      ))}
    </div>
  );
}

export default SignInComponent;
