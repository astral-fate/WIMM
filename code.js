import React, { useState, useEffect } from 'react';
import api from './api'; // Import the api module
import './App.css';


// General structure for other parts will be almost the same

// Medicines component
function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
    const [newMedicine, setNewMedicine] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        manufacturer: ''
     });

    const [categories, setCategories] = useState([]);
    const [error,setError] = useState('')

  useEffect(() => {
      fetchData();
  }, []);

    const fetchData = async ()=>{
        try{
          const medicinesData =  await api.getMedicines();
          const categoriesData =  await api.getCategories();
          setMedicines(medicinesData);
          setCategories(categoriesData);
        }
        catch(error){
            setError('Error fetching the data')
        }
    }


    const handleAddMedicine = async ()=>{
       try{
             await api.addMedicine(newMedicine);
              setShowAddMedicineModal(false)
               setNewMedicine({ name: '', category: '', description: '', price: '', manufacturer: '' });
               fetchData();
         }
         catch(error){
             setError('Error Adding medicine.');
         }
    }

    const handleDeleteMedicine = async (id) => {
         try{
             await api.deleteMedicine(id);
            fetchData();
        }catch(error){
            setError('Error Deleting medicine.')
        }
  };

  const handleInputChange =(event)=>{
      const {name,value} = event.target;
      setNewMedicine({...newMedicine,[name]:value});
  }

  return (
    <div className="dashboard-content">
      <h2>Medicines</h2>
      <div className="action-buttons">
        <button onClick={() => setShowAddMedicineModal(true)} className="add-button">
            Add Medicine
        </button>
      </div>
         {error && <div className="error-message">{error}</div>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Manufacturer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine._id}>
              <td>{medicine.name}</td>
              <td>{medicine.category}</td>
              <td>${medicine.price}</td>
              <td>{medicine.manufacturer}</td>
              <td className="action-buttons">
                <button className="edit-button">Edit</button>
                <button onClick={()=>handleDeleteMedicine(medicine._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {showAddMedicineModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddMedicineModal(false)}>&times;</span>
            <h3>Add New Medicine</h3>
            <form>
                <label>Medicine Name</label>
                <input type="text" name="name" value={newMedicine.name} onChange={handleInputChange} />

                <label>Select Category</label>
              <select name="category" value={newMedicine.category} onChange={handleInputChange}>
                <option value="">Select Category</option>
                {categories.map((category)=>(
                  <option key={category._id} value={category.name}>{category.name}</option>
                ))}
              </select>
               <label>Description</label>
                <input type="text" name="description" value={newMedicine.description} onChange={handleInputChange} />

                <label>Price</label>
                <input type="text" name="price" value={newMedicine.price} onChange={handleInputChange} />

                <label>Manufacturer</label>
               <input type="text" name="manufacturer" value={newMedicine.manufacturer} onChange={handleInputChange} />

             <button  onClick={handleAddMedicine} className="add-button">Add Medicine</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// Categories component
function Categories() {
    const [categories, setCategories] = useState([]);
      const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
     const [newCategory, setNewCategory] = useState({ name: '', description: '' });
      const [error,setError] = useState('')

     useEffect(() => {
       fetchData()
    }, []);

     const fetchData = async ()=>{
       try{
            const categoriesData =  await api.getCategories();
           setCategories(categoriesData);
        }catch(error){
            setError('Error fetching the data')
        }
    }

    const handleAddCategory = async ()=>{
        try{
            await api.addCategory(newCategory);
            setShowAddCategoryModal(false)
            setNewCategory({ name: '', description: '' });
           fetchData();
         }catch(error){
             setError('Error Adding category.')
         }
    }

      const handleDeleteCategory = async (id) => {
         try{
             await api.deleteCategory(id);
             fetchData();
        }catch(error){
            setError('Error Deleting category.')
        }
  };

   const handleInputChange =(event)=>{
       const {name,value} = event.target;
      setNewCategory({...newCategory,[name]:value});
   }
    return (
      <div className="dashboard-content">
        <h2>Categories</h2>
        <div className="action-buttons">
        <button onClick={() => setShowAddCategoryModal(true)} className="add-button">
            Add Category
        </button>
      </div>
         {error && <div className="error-message">{error}</div>}
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                  <td>{new Date(category.created_at.$date).toLocaleDateString()}</td>
                 <td className="action-buttons">
                <button className="edit-button">Edit</button>
                <button onClick={()=>handleDeleteCategory(category._id)} className="delete-button">Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
         {showAddCategoryModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddCategoryModal(false)}>&times;</span>
            <h3>Add New Category</h3>
            <form>
                <label>Category Name</label>
                <input type="text" name="name" value={newCategory.name} onChange={handleInputChange} />

                 <label>Description</label>
                <input type="text" name="description" value={newCategory.description} onChange={handleInputChange} />

             <button  onClick={handleAddCategory} className="add-button">Add Category</button>
            </form>
          </div>
        </div>
      )}
      </div>
    );
  }

// Pharmacies component
function Pharmacies() {
    const [pharmacies, setPharmacies] = useState([]);
     const [showAddPharmacyModal, setShowAddPharmacyModal] = useState(false);
     const [newPharmacy, setNewPharmacy] = useState({
          name:'',
          location:'',
          phone:'',
         email:'',
        address:'',
        city:'',
         status:'active'
    });
    const [error,setError] = useState('')
     useEffect(() => {
       fetchData()
    }, []);

     const fetchData = async ()=>{
       try{
            const pharmaciesData =  await api.getPharmacies();
            setPharmacies(pharmaciesData);
        }catch(error){
            setError('Error fetching the data')
        }
    }

    const handleAddPharmacy = async ()=>{
        try{
            await api.addPharmacy(newPharmacy);
            setShowAddPharmacyModal(false)
             setNewPharmacy({
                  name:'',
                    location:'',
                    phone:'',
                    email:'',
                   address:'',
                   city:'',
                     status:'active'
              });
             fetchData();
         }catch(error){
              setError('Error Adding pharmacy.')
         }
    }

     const handleDeletePharmacy = async (id) => {
         try{
            await api.deletePharmacy(id);
            fetchData();
         }catch(error){
            setError('Error Deleting pharmacy.')
        }
  };
   const handleInputChange =(event)=>{
       const {name,value} = event.target;
      setNewPharmacy({...newPharmacy,[name]:value});
   }
    return (
      <div className="dashboard-content">
        <h2>Pharmacies</h2>
      <div className="action-buttons">
        <button onClick={() => setShowAddPharmacyModal(true)} className="add-button">
           Add Pharmacy
        </button>
      </div>
         {error && <div className="error-message">{error}</div>}
        <table className="data-table">
          <thead>
            <tr>
                <th>Name</th>
                <th>Location</th>
              <th>Phone</th>
              <th>Email</th>
                <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pharmacies.map((pharmacy) => (
              <tr key={pharmacy._id}>
                <td>{pharmacy.name}</td>
                <td>{pharmacy.location}</td>
                 <td>{pharmacy.phone}</td>
                 <td>{pharmacy.email}</td>
                  <td>{pharmacy.status}</td>
                 <td className="action-buttons">
                  <button className="edit-button">Edit</button>
                <button  onClick={()=>handleDeletePharmacy(pharmacy._id)} className="delete-button">Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>

         {showAddPharmacyModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddPharmacyModal(false)}>&times;</span>
            <h3>Add New Pharmacy</h3>
            <form>
                <label>Pharmacy Name</label>
              <input type="text" name="name" value={newPharmacy.name} onChange={handleInputChange} />

                 <label>Address</label>
                <input type="text" name="address" value={newPharmacy.address} onChange={handleInputChange} />

                <label>City</label>
                <input type="text" name="city" value={newPharmacy.city} onChange={handleInputChange} />
               <label>Phone</label>
                <input type="text" name="phone" value={newPharmacy.phone} onChange={handleInputChange} />

                 <label>Email</label>
                <input type="text" name="email" value={newPharmacy.email} onChange={handleInputChange} />

                <label>Status</label>
                   <select  name="status" value={newPharmacy.status} onChange={handleInputChange}>
                          <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                       </select>

                <button  onClick={handleAddPharmacy} className="add-button">Add Pharmacy</button>
            </form>
          </div>
        </div>
      )}
      </div>
    );
  }

// Inventory component
function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [showUpdateInventoryModal, setShowUpdateInventoryModal] = useState(false);
    const [medicines, setMedicines] = useState([]);
     const [pharmacies, setPharmacies] = useState([]);
    const [updateInventory, setUpdateInventory] = useState({
      medicine_id: '',
        pharmacy_id:'',
        quantity:'',
         minimum_quantity:''
  });
    const [error,setError] = useState('')


     useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async ()=>{
       try{
           const inventoryData =  await api.getInventory();
         const medicinesData =  await api.getMedicines();
           const pharmaciesData =  await api.getPharmacies();
           setInventory(inventoryData);
            setMedicines(medicinesData);
           setPharmacies(pharmaciesData)
       }catch(error){
            setError('Error fetching the data')
       }
    }

    const handleUpdateInventory = async (id)=>{
      try{
         await api.updateInventory(id,updateInventory);
          setShowUpdateInventoryModal(false)
            setUpdateInventory({
                medicine_id: '',
                   pharmacy_id:'',
                  quantity:'',
                 minimum_quantity:''
              });
          fetchData();
         }catch(error){
             setError('Error Updating the inventory.')
         }
    }

    const handleInputChange =(event)=>{
          const {name,value} = event.target;
      setUpdateInventory({...updateInventory,[name]:value});
    }
  return (
    <div className="dashboard-content">
      <h2>Inventory</h2>
       {error && <div className="error-message">{error}</div>}
      <table className="data-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Pharmacy</th>
            <th>Quantity</th>
             <th>Status</th>
              <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
            {inventory.map((item) => {
                 const medicineName = medicines.find(medicine=>medicine._id === item.medicine_id)?
                                 medicines.find(medicine=>medicine._id === item.medicine_id).name:"Unknown"
                  const pharmacyName = pharmacies.find(pharmacy=>pharmacy._id === item.pharmacy_id)?
                                     pharmacies.find(pharmacy=>pharmacy._id === item.pharmacy_id).name:"Unknown"

          return(
              <tr key={item._id}>
               <td>{medicineName}</td>
                 <td>{pharmacyName}</td>
              <td>{item.quantity}</td>
             <td>{item.status}</td>
               <td>{new Date(item.last_updated.$date).toLocaleDateString()}</td>
           </tr>
            )
          })}
        </tbody>
      </table>
         <div className="action-buttons">
        <button onClick={() => setShowUpdateInventoryModal(true)} className="add-button">
           Update Inventory
        </button>
      </div>
     {showUpdateInventoryModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateInventoryModal(false)}>&times;</span>
            <h3>Update Inventory</h3>
             <form>
                <label>Select Medicine</label>
              <select name="medicine_id" value={updateInventory.medicine_id} onChange={handleInputChange}>
                <option value="">Select Medicine</option>
                {medicines.map((medicine)=>(
                  <option key={medicine._id} value={medicine._id}>{medicine.name}</option>
                ))}
              </select>
              <label>Select Pharmacy</label>
              <select  name="pharmacy_id" value={updateInventory.pharmacy_id} onChange={handleInputChange}>
                <option value="">Select Pharmacy</option>
                {pharmacies.map((pharmacy)=>(
                  <option key={pharmacy._id} value={pharmacy._id}>{pharmacy.name}</option>
                ))}
              </select>

                 <label>Quantity</label>
              <input type="text" name="quantity" value={updateInventory.quantity} onChange={handleInputChange} />
                <label>Minimum Quantity</label>
                 <input type="text" name="minimum_quantity" value={updateInventory.minimum_quantity} onChange={handleInputChange} />


             <button  onClick={()=>handleUpdateInventory()} className="add-button">Update Inventory</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


// Users component
function Users() {
    const [users, setUsers] = useState([]);
      const [showAddUserModal, setShowAddUserModal] = useState(false);
     const [newUser, setNewUser] = useState({
        username:'',
        password:'',
         phone:'',
         role:'staff',
        status:'active'
    });
     const [error,setError] = useState('')


    useEffect(() => {
       fetchData()
    }, []);


     const fetchData = async ()=>{
      try{
            const usersData =  await api.getUsers();
            setUsers(usersData);
        }catch(error){
          setError('Error fetching the data')
       }
    }
      const handleAddUser = async ()=>{
        try{
           await api.addUser(newUser);
          setShowAddUserModal(false)
            setNewUser({
                 username:'',
                password:'',
                phone:'',
                role:'staff',
               status:'active'
            });
          fetchData();
       }catch(error){
          setError('Error Adding user.')
       }
    }
     const handleDeleteUser = async (id) => {
         try{
              await api.deleteUser(id);
             fetchData();
          }catch(error){
             setError('Error Deleting user.')
        }
  };
   const handleInputChange =(event)=>{
         const {name,value} = event.target;
       setNewUser({...newUser,[name]:value});
   }


    return (
      <div className="dashboard-content">
        <h2>Users</h2>
      <div className="action-buttons">
        <button onClick={() => setShowAddUserModal(true)} className="add-button">
           Add User
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
        <table className="data-table">
          <thead>
            <tr>
              <th>Username</th>
                <th>Phone</th>
                <th>Role</th>
              <th>Status</th>
                 <th>Created At</th>
               <th>Last Login</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                 <td>{user.phone}</td>
                 <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>{new Date(user.created_at.$date).toLocaleDateString()}</td>
                   <td>{user.last_login}</td>
                 <td className="action-buttons">
                   <button className="edit-button">Edit</button>
                  <button onClick={()=>handleDeleteUser(user._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

          {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowAddUserModal(false)}>&times;</span>
            <h3>Add New User</h3>
            <form>
               <label>Email</label>
              <input type="email" name="username"  value={newUser.username} onChange={handleInputChange} />

               <label>Password</label>
               <input type="password" name="password" value={newUser.password} onChange={handleInputChange}/>

                <label>Phone Number</label>
                <input type="text"  name="phone" value={newUser.phone} onChange={handleInputChange} />

                <label>Role</label>
                  <select name="role" value={newUser.role} onChange={handleInputChange}>
                         <option value="admin">Admin</option>
                          <option value="staff">Staff</option>
                    </select>

                <label>Status</label>
                   <select name="status" value={newUser.status} onChange={handleInputChange}>
                          <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                       </select>

               <button  onClick={handleAddUser} className="add-button">Add User</button>
            </form>
          </div>
        </div>
      )}
      </div>
    );
  }



function App() {
    const [activeTab, setActiveTab] = useState('medicines');

    const renderContent = () => {
    switch (activeTab) {
      case 'medicines':
        return <Medicines />;
      case 'categories':
        return <Categories />;
       case 'pharmacies':
        return <Pharmacies />;
        case 'inventory':
        return <Inventory />;
      case 'users':
        return <Users />;
      default:
        return <Medicines />; // Default view
    }
  };
    return (
    <div className="app-container">
         <div className="sidebar">
           <button onClick={()=>setActiveTab('medicines')}  className={activeTab === 'medicines' ? 'active':''}>Medicines</button>
           <button onClick={()=>setActiveTab('categories')} className={activeTab === 'categories' ? 'active':''}>Categories</button>
          <button onClick={()=>setActiveTab('pharmacies')}  className={activeTab === 'pharmacies' ? 'active':''}>Pharmacies</button>
           <button  onClick={()=>setActiveTab('inventory')} className={activeTab === 'inventory' ? 'active':''}>Inventory</button>
            <button onClick={()=>setActiveTab('users')}  className={activeTab === 'users' ? 'active':''}>Users</button>
      </div>

      {renderContent()}

    </div>
  );
}

export default App;