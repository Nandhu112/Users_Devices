import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderAdmin from './components/Admin/HeaderAdmin';
import { useSelector } from "react-redux";

function App({ admin }) {
  const { adminInfo } = useSelector((state) => state.adminAuth)
  return (
    <div>
 {adminInfo? <HeaderAdmin/>:null}
    <ToastContainer />
    <div className={adminInfo ? 'ml-80 mt-24 mr-6' : null}>
    <Container className="my-2">
      <div>
      <Outlet />
      </div>
     
    </Container>
    </div>
    </div>
  );
}

export default App;