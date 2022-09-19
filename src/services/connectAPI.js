import axios from 'axios';

require('dotenv').config();

const API_PORT = process.env.API_PORT || 3001;

class ApiServices {
  constructor({ url = `http://localhost:${API_PORT}`}) {
    this.http = axios.create({
      baseURL: url,
    });
  }

  async getEmails() {
    return this.http.get('/emails');
  }
}

export default ApiServices;
