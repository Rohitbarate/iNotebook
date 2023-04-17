import messageBox from "./messageBox/MessageBox";
const baseUrl = process.env.REACT_APP_BASEURL;

const registerNewUser = async (user) => {
  console.log(user);
  const newUser = {
    name: user.fName + " " + user.lName,
    email: user.email,
    mobileNo: user.phoneNo,
    password: user.password,
  };
  try {
    let response = await fetch(`${baseUrl}/user/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    console.log(data);
    // alert(JSON.stringify(data.message));
    return data;
  } catch (error) {
    console.log("frontend err", error);
  }
};

const loginUser = async (user) => {
  console.log(user);

  try {
    const res = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("token", data.token);
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.log("frontend err : ", error);
  }
};

const getUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { type: "danger", msg: "login to access this page..!" };
  }
  await fetch(`${baseUrl}/user/`)
};

export { registerNewUser, loginUser };
