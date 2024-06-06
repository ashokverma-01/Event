import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear user authentication data from local storage
    localStorage.removeItem('userEmail');
    // Redirect to the login page
    history.push('/sign-in');
  };

  // Call handleLogout function immediately when the component renders
  React.useEffect(() => {
    handleLogout();
  }, []); // Empty dependency array to ensure it only runs once on mount

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
