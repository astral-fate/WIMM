import axios from 'axios';

const API_BASE_URL = '/api'; // Adjust as needed

const api = {

  // Medicines
  getMedicines: async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/medicines`);
        return response.data;
    }catch(error){
        throw error;
    }
   
  },
  addMedicine: async (medicineData) => {
       try{
        const response = await axios.post(`${API_BASE_URL}/medicines`,medicineData);
        return response.data;
    }catch(error){
       throw error;
    }
  },
  updateMedicine: async (id, medicineData) => {
    try{
        const response = await axios.put(`${API_BASE_URL}/medicines/${id}`,medicineData);
        return response.data;
    }catch(error){
       throw error;
    }
  },
  deleteMedicine: async (id) => {
    try{
         const response = await axios.delete(`${API_BASE_URL}/medicines/${id}`);
        return response.data;
    }catch(error){
       throw error;
    }
  },

    // Categories
  getCategories: async () => {
   try{
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
    }catch(error){
       throw error;
    }
  },
  addCategory: async (categoryData) => {
    try{
         const response = await axios.post(`${API_BASE_URL}/categories`,categoryData);
        return response.data;
    }catch(error){
       throw error;
    }
  },
  updateCategory: async (id, categoryData) => {
    try{
        const response = await axios.put(`${API_BASE_URL}/categories/${id}`,categoryData);
         return response.data;
    }catch(error){
       throw error;
    }
  },
  deleteCategory: async (id) => {
    try{
          const response = await axios.delete(`${API_BASE_URL}/categories/${id}`);
          return response.data;
    }catch(error){
       throw error;
    }
  },

  // Pharmacies
    getPharmacies: async () => {
         try{
             const response = await axios.get(`${API_BASE_URL}/pharmacies`);
             return response.data;
         }catch(error){
           throw error;
        }
  },
  addPharmacy: async (pharmacyData) => {
     try{
         const response = await axios.post(`${API_BASE_URL}/pharmacies`,pharmacyData);
         return response.data;
     }catch(error){
         throw error;
      }
  },
    updatePharmacy: async (id, pharmacyData) => {
      try{
          const response = await axios.put(`${API_BASE_URL}/pharmacies/${id}`,pharmacyData);
          return response.data;
      }catch(error){
        throw error;
       }
  },
  deletePharmacy: async (id) => {
     try{
        const response = await axios.delete(`${API_BASE_URL}/pharmacies/${id}`);
        return response.data;
     }catch(error){
        throw error;
      }
  },
   // Inventory
  getInventory: async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/inventory`);
       return response.data;
    }catch(error){
       throw error;
    }
  },
  updateInventory: async (id, inventoryData) => {
    try{
         const response = await axios.put(`${API_BASE_URL}/inventory/${id}`,inventoryData);
          return response.data;
     }catch(error){
        throw error;
      }
  },
  // Users
    getUsers: async () => {
       try{
             const response = await axios.get(`${API_BASE_URL}/users`);
             return response.data;
         }catch(error){
           throw error;
        }
    },
  addUser: async (userData) => {
        try{
             const response = await axios.post(`${API_BASE_URL}/users`,userData);
             return response.data;
         }catch(error){
           throw error;
        }
  },
  updateUser: async (id, userData) => {
        try{
             const response = await axios.put(`${API_BASE_URL}/users/${id}`,userData);
             return response.data;
         }catch(error){
           throw error;
        }
  },
  deleteUser: async (id) => {
         try{
             const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
             return response.data;
         }catch(error){
           throw error;
        }
  },
};


export default api;