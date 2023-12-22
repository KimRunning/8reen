"use client";
function PostTest() {
  const addData = async () => {
    const newData = {
      _id: 123,
      name: "minsuk",
      nickName: "blue",
    };

    const response = await fetch("/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      console.log("Data added successfully");
    } else {
      console.error("Failed to add data");
    }
  };

  return <button onClick={addData}>Add Data</button>;
}

export default PostTest;
