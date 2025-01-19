# WIMM

##   The structure of the MCV

<details>
<Summary> The structure of the MCV </Summary>

```
medicine-dashboard/
├── server/                      <-- Root of your server folder
│   ├── .env                     <-- .env file should be here
│   ├── server.js                <-- Main server file
│   ├── config/
│   │   └── db.js                <-- Database connection file
│   ├── controllers/
│   │   ├── medicineController.js
│   │   ├── categoryController.js
│   │   ├── pharmacyController.js
│   │   ├── inventoryController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── Medicine.js
│   │   ├── Category.js
│   │   ├── Pharmacy.js
│   │   ├── Inventory.js
│   │   └── User.js
│   ├── routes/
│   │   ├── medicineRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── pharmacyRoutes.js
│   │   ├── inventoryRoutes.js
│   │   └── userRoutes.js
│   └── package.json             <-- Backend dependencies
├── src/                         <-- Frontend React code
│   ├── api/
│   │   └── api.js
│   ├── components/
│   │   ├── Medicines.js
│   │   ├── Categories.js
│   │   ├── Pharmacies.js
│   │   ├── Inventory.js
│   │   └── Users.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json                 <-- Frontend dependencies

```
</details>

## Mongo DB

[Setting up the db credintials](https://cloud.mongodb.com/v2/677758246188cd21cd163f3b#/security/database/users)
