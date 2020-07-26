import React from 'react';
import Swal from 'sweetalert2';
import TodoList from "./Todo/TodoList";
import SideBar from './sidebar';
import Footer from './footer';

const logout = () => {
  Swal.fire({
    title: 'Ready to Leave?',
    text: "Select 'Logout' below if you are ready to end your current session.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, Logout!'
  }).then((result) => {
    if (result.value) {
      this.setState({login:false});
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    }
  })
}

const Main = (props) => {
    return(
      <div id="wrapper">
        {/* Sidebar */}
        <SideBar></SideBar>
        {/* End of Sidebar */}
        {/* Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* Sidebar Toggle (Topbar) */}
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars" />
              </button>
              {/* Topbar Search */}
              <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                  <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </form>
              {/* Topbar Navbar */}
              <ul className="navbar-nav ml-auto">
                {/* Nav Item - Search Dropdown (Visible Only XS) */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                  <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-search fa-fw" />
                  </a>
                  {/* Dropdown - Messages */}
                  <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                    <form className="form-inline mr-auto w-100 navbar-search">
                      <div className="input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="button">
                            <i className="fas fa-search fa-sm" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                {/* Nav Item - Alerts */}
                <li className="nav-item dropdown no-arrow mx-1">
                  <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-bell fa-fw" />
                    {/* Counter - Alerts */}
                    <span className="badge badge-danger badge-counter">3+</span>
                  </a>
                  {/* Dropdown - Alerts */}
                  <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">
                      Alerts Center
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <div className="mr-3">
                        <div className="icon-circle bg-primary">
                          <i className="fas fa-file-alt text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">December 12, 2019</div>
                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                      </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <div className="mr-3">
                        <div className="icon-circle bg-success">
                          <i className="fas fa-donate text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">December 7, 2019</div>
                        $290.29 has been deposited into your account!
                      </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <div className="mr-3">
                        <div className="icon-circle bg-warning">
                          <i className="fas fa-exclamation-triangle text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">December 2, 2019</div>
                        Spending Alert: We've noticed unusually high spending for your account.
                      </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                  </div>
                </li>
                {/* Nav Item - Messages */}
                <li className="nav-item dropdown no-arrow mx-1">
                  <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-envelope fa-fw" />
                    {/* Counter - Messages */}
                    <span className="badge badge-danger badge-counter">7</span>
                  </a>
                  {/* Dropdown - Messages */}
                  <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                    <h6 className="dropdown-header">
                      Message Center
                    </h6>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                        <div className="status-indicator bg-success" />
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                      </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                        <div className="status-indicator" />
                      </div>
                      <div>
                        <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                        <div className="small text-gray-500">Jae Chun · 1d</div>
                      </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                        <div className="status-indicator bg-warning" />
                      </div>
                      <div>
                        <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                      </div>
                    </a>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="" />
                        <div className="status-indicator bg-success" />
                      </div>
                      <div>
                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                      </div>
                    </a>
                    <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                  </div>
                </li>
                <div className="topbar-divider d-none d-sm-block" />
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="mr-2 d-none d-lg-inline text-gray-600 small">{(props.user)?props.user.firstname:"Guest User"}</span>
                    <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
                  </a>
                  {/* Dropdown - User Information */}
                  <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                      Profile
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                      Settings
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                      Activity Log
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            {/* End of Topbar */}
            {/* Begin Page Content */}
            <div className="container-fluid">
              {/* Page Heading */}
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a>
              </div>
              {/* Content Row */}
              <div className="row">
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Earnings (Monthly)</div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-calendar fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Earnings (Annual)</div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Earnings (Monthly) Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks</div>
                          <div className="row no-gutters align-items-center">
                            <div className="col-auto">
                              <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                            </div>
                            <div className="col">
                              <div className="progress progress-sm mr-2">
                                <div className="progress-bar bg-info" role="progressbar" style={{width: '50%'}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Pending Requests Card Example */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Pending Requests</div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content Row */}
              <div className="row">
                {/* Area Chart */}
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    {/* Card Header - Dropdown */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                      <div className="dropdown no-arrow">
                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                          <div className="dropdown-header">Dropdown Header:</div>
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </div>
                    {/* Card Body */}
                    <div className="card-body">
                      <div className="chart-area"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className /></div><div className="chartjs-size-monitor-shrink"><div className /></div></div>
                        <canvas id="myAreaChart" style={{display: 'block', width: '668px', height: '320px'}} width={668} height={320} className="chartjs-render-monitor" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Pie Chart */}
                <div className="col-xl-4 col-lg-5">
                  <div className="card shadow mb-4">
                    {/* Card Header - Dropdown */}
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                      <div className="dropdown no-arrow">
                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                          <div className="dropdown-header">Dropdown Header:</div>
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <div className="dropdown-divider" />
                          <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                      </div>
                    </div>
                    {/* Card Body */}
                    <div className="card-body">
                      <div className="todo-div">
                        <TodoList 
                          todo={props.todo}
                          user={props.user}
                        />
                      </div>
                      <div className="mt-4 text-center small">
                        <span className="mr-2">
                          <i className="fas fa-circle text-info" /> Low
                        </span>
                        <span className="mr-2">
                          <i className="fas fa-circle text-warning" /> Medium
                        </span>
                        <span className="mr-2">
                          <i className="fas fa-circle text-danger" /> High
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content Row */}
              <div className="row">
                {/* Content Column */}
                <div className="col-lg-6 mb-4">
                  {/* Project Card Example */}
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
                    </div>
                    <div className="card-body">
                      <h4 className="small font-weight-bold">Server Migration <span className="float-right">20%</span></h4>
                      <div className="progress mb-4">
                        <div className="progress-bar bg-danger" role="progressbar" style={{width: '20%'}} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <h4 className="small font-weight-bold">Sales Tracking <span className="float-right">40%</span></h4>
                      <div className="progress mb-4">
                        <div className="progress-bar bg-warning" role="progressbar" style={{width: '40%'}} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <h4 className="small font-weight-bold">Customer Database <span className="float-right">60%</span></h4>
                      <div className="progress mb-4">
                        <div className="progress-bar" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <h4 className="small font-weight-bold">Payout Details <span className="float-right">80%</span></h4>
                      <div className="progress mb-4">
                        <div className="progress-bar bg-info" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <h4 className="small font-weight-bold">Account Setup <span className="float-right">Complete!</span></h4>
                      <div className="progress">
                        <div className="progress-bar bg-success" role="progressbar" style={{width: '100%'}} aria-valuenow={100} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                  </div>
                  {/* Color System */}
                  <div className="row">
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-primary text-white shadow">
                        <div className="card-body">
                          Primary
                          <div className="text-white-50 small">#4e73df</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-success text-white shadow">
                        <div className="card-body">
                          Success
                          <div className="text-white-50 small">#1cc88a</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-info text-white shadow">
                        <div className="card-body">
                          Info
                          <div className="text-white-50 small">#36b9cc</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-warning text-white shadow">
                        <div className="card-body">
                          Warning
                          <div className="text-white-50 small">#f6c23e</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-danger text-white shadow">
                        <div className="card-body">
                          Danger
                          <div className="text-white-50 small">#e74a3b</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 mb-4">
                      <div className="card bg-secondary text-white shadow">
                        <div className="card-body">
                          Secondary
                          <div className="text-white-50 small">#858796</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4">
                  {/* Illustrations */}
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: '25rem'}} src="img/undraw_posting_photo.svg" alt="" />
                      </div>
                      <p>Add some quality, svg illustrations to your project courtesy of <a target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a constantly updated collection of beautiful svg images that you can use completely free and without attribution!</p>
                      <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on unDraw →</a>
                    </div>
                  </div>
                  {/* Approach */}
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
                    </div>
                    <div className="card-body">
                      <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce CSS bloat and poor page performance. Custom CSS classes are used to create custom components and custom utility classes.</p>
                      <p className="mb-0">Before working with this theme, you should become familiar with the Bootstrap framework, especially the utility classes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
          {/* Footer */}
          <Footer></Footer>
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
    );
}

export default Main;