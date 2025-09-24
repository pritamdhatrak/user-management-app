import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const indianUsers = [
  { first: 'Aarav', last: 'Sharma', email: 'aarav.sharma@gmail.com' },
  { first: 'Aditi', last: 'Gupta', email: 'aditi.gupta@yahoo.in' },
  { first: 'Akash', last: 'Singh', email: 'akash.singh@rediffmail.com' },
  { first: 'Amit', last: 'Kumar', email: 'amit.kumar@hotmail.com' },
  { first: 'Ananya', last: 'Agarwal', email: 'ananya.agarwal@gmail.com' },
  { first: 'Arjun', last: 'Verma', email: 'arjun.verma@outlook.com' },
  { first: 'Deepak', last: 'Mishra', email: 'deepak.mishra@yahoo.co.in' },
  { first: 'Divya', last: 'Pandey', email: 'divya.pandey@gmail.com' },
  { first: 'Gaurav', last: 'Yadav', email: 'gaurav.yadav@rediffmail.com' },
  { first: 'Kavya', last: 'Tiwari', email: 'kavya.tiwari@yahoo.in' },
  { first: 'Rohit', last: 'Joshi', email: 'rohit.joshi@gmail.com' },
  { first: 'Priya', last: 'Chopra', email: 'priya.chopra@hotmail.com' },
  { first: 'Vikash', last: 'Malhotra', email: 'vikash.malhotra@yahoo.co.in' },
  { first: 'Neha', last: 'Kapoor', email: 'neha.kapoor@gmail.com' },
  { first: 'Rahul', last: 'Arora', email: 'rahul.arora@rediffmail.com' }
];

const itDepartments = [
  'Software Development',
  'Web Development', 
  'Data Science',
  'DevOps',
  'Quality Assurance',
  'UI/UX Design',
  'Cybersecurity',
  'Cloud Computing',
  'Mobile App Development',
  'Machine Learning'
];

export const userService = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data.map((user, index) => {
      const indianUser = indianUsers[index % indianUsers.length];
      return {
        id: user.id,
        firstName: indianUser.first,
        lastName: indianUser.last,
        email: indianUser.email,
        department: itDepartments[index % itDepartments.length]
      };
    });
  },

  getUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    const user = response.data;
    const userIndex = (id - 1) % indianUsers.length;
    const indianUser = indianUsers[userIndex];
    return {
      id: user.id,
      firstName: indianUser.first,
      lastName: indianUser.last,
      email: indianUser.email,
      department: itDepartments[userIndex % itDepartments.length]
    };
  },

  createUser: async (userData) => {
    const response = await api.post('/users', {
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      company: { name: userData.department }
    });
    return {
      ...userData,
      id: response.data.id
    };
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, {
      id,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      company: { name: userData.department }
    });
    return {
      ...userData,
      id
    };
  },

  deleteUser: async (id) => {
    await api.delete(`/users/${id}`);
    return id;
  }
};
