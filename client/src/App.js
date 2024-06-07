import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import ProtectedRoute from "./pages/Protected"; // Import the ProtectedRoute component
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import EventsList from "./pages/Events/EventsList";
import EventSpeakers from "./pages/event-speakers/EventSpeakers";
import BlogList from "./pages/Blogs/BlogList";
import VendorList from "./pages/Vendor/VendorList";
import VenueList from "./pages/Venue/VenueList";
import UserList from "./pages/User/UserList";
import SubscriptionList from "./pages/Subscription/Subscription";
import Transaction from "./pages/Transactions/Transactions";
import SponsorComponent from "./pages/sponsors/SponserComponent";
import Hotel from "./pages/Hotels/Hotel";
import ForgotPassword from "./components/layout/ForgotPassword";
import ChangePassword from "./pages/change-password/ChangePassword";
import ResetPassword from "./components/layout/ResetPassword";
import Dashboard from "./pages/Dashboard.js/Dashboard";
import TicketList from "./pages/Ticket/Ticket";
import Booking from "./pages/Event-Booking/Booking";


function App() {

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
        <ProtectedRoute exact path="/" component={ProtectedRoute} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/eventschedule" component={EventsList} />
          <ProtectedRoute exact path="/eventspeaker" component={EventSpeakers} />
          <ProtectedRoute exact path="/blog" component={BlogList} />
          <ProtectedRoute exact path="/vendors" component={VendorList} />
          <ProtectedRoute exact path="/venue" component={VenueList} />
          <ProtectedRoute exact path="/users" component={UserList} />
          <ProtectedRoute exact path="/sponsors" component={SponsorComponent} />
          <ProtectedRoute exact path="/subscription" component={SubscriptionList} />
          <ProtectedRoute exact path="/hotel" component={Hotel} />
          <ProtectedRoute exact path="/ticket" component={TicketList} />
          <ProtectedRoute exact path="/transactions" component={Transaction} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password/:id/:token" component={ResetPassword} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/change-password" component={ChangePassword} />
          <ProtectedRoute exact path="/booking" component={Booking} />
       
        </Main>
      </Switch>
    </div>
  );
}

export default App;
