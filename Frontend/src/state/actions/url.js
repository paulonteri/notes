var SERVER_URL = "https://notes-cuea.herokuapp.com";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  SERVER_URL = "http://localhost:8000";
}

export default SERVER_URL;
