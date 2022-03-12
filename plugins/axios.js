export default ({ $axios, redirect, app }, inject) => {
  $axios.onError((error) => {
    console.log(error);
    if (error.response === undefined) {
      // Display a flash notification
      

      throw error;
    }
    
    // Handle other types of errors (e.g., redirect to login on 401 errors)

    throw error;
  });
};
