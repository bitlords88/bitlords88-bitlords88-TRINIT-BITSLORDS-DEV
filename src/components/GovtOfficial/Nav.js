import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/sentAlert">Sent Alert</Link>
        </li>
        <li>
          {" "}
          <Link to="/userActivity">UserActivity</Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;