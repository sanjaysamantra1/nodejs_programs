db.users.insertMany([
{
  firstName: "John",
  lastName: "Doe",
  email: "john.doe1@example.com",
  gender: "Male",
  phone: "9876543210",
  dateOfBirth: ISODate("1990-05-15"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zipCode: "400001"
  }
},
{
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@example.com",
  gender: "Female",
  phone: "9876543211",
  dateOfBirth: ISODate("1992-08-20"),
  role: "ADMIN",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "45 MG Road",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    zipCode: "110001"
  }
},
{
  firstName: "Michael",
  lastName: "Johnson",
  email: "michael.johnson@example.com",
  gender: "Male",
  phone: "9876543212",
  dateOfBirth: ISODate("1988-02-10"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "78 Brigade Road",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    zipCode: "560001"
  }
},
{
  firstName: "Emily",
  lastName: "Davis",
  email: "emily.davis@example.com",
  gender: "Female",
  phone: "9876543213",
  dateOfBirth: ISODate("1995-11-05"),
  role: "USER",
  isActive: false,
  createdAt: new Date(),
  address: {
    street: "22 Park Street",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    zipCode: "700016"
  }
},
{
  firstName: "David",
  lastName: "Wilson",
  email: "david.wilson@example.com",
  gender: "Male",
  phone: "9876543214",
  dateOfBirth: ISODate("1985-07-18"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "90 Anna Salai",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    zipCode: "600002"
  }
},
{
  firstName: "Sophia",
  lastName: "Brown",
  email: "sophia.brown@example.com",
  gender: "Female",
  phone: "9876543215",
  dateOfBirth: ISODate("1993-03-12"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "101 FC Road",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    zipCode: "411004"
  }
},
{
  firstName: "James",
  lastName: "Taylor",
  email: "james.taylor@example.com",
  gender: "Male",
  phone: "9876543216",
  dateOfBirth: ISODate("1991-09-25"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "33 Banjara Hills",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    zipCode: "500034"
  }
},
{
  firstName: "Olivia",
  lastName: "Anderson",
  email: "olivia.anderson@example.com",
  gender: "Female",
  phone: "9876543217",
  dateOfBirth: ISODate("1996-01-30"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "88 Civil Lines",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    zipCode: "302006"
  }
},
{
  firstName: "Daniel",
  lastName: "Thomas",
  email: "daniel.thomas@example.com",
  gender: "Male",
  phone: "9876543218",
  dateOfBirth: ISODate("1987-06-14"),
  role: "USER",
  isActive: false,
  createdAt: new Date(),
  address: {
    street: "55 Hazratganj",
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    zipCode: "226001"
  }
},
{
  firstName: "Ava",
  lastName: "Martinez",
  email: "ava.martinez@example.com",
  gender: "Female",
  phone: "9876543219",
  dateOfBirth: ISODate("1994-12-08"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "12 Marine Drive",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zipCode: "400002"
  }
},
{
  firstName: "William",
  lastName: "Garcia",
  email: "william.garcia@example.com",
  gender: "Male",
  phone: "9876543220",
  dateOfBirth: ISODate("1989-04-22"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "17 Sector 17",
    city: "Chandigarh",
    state: "Chandigarh",
    country: "India",
    zipCode: "160017"
  }
},
{
  firstName: "Isabella",
  lastName: "Rodriguez",
  email: "isabella.rodriguez@example.com",
  gender: "Female",
  phone: "9876543221",
  dateOfBirth: ISODate("1997-10-11"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "44 Law Garden",
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    zipCode: "380009"
  }
},
{
  firstName: "Ethan",
  lastName: "Martins",
  email: "ethan.martins@example.com",
  gender: "Male",
  phone: "9876543222",
  dateOfBirth: ISODate("1990-03-19"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "77 MG Road",
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    zipCode: "452001"
  }
},
{
  firstName: "Mia",
  lastName: "Hernandez",
  email: "mia.hernandez@example.com",
  gender: "Female",
  phone: "9876543223",
  dateOfBirth: ISODate("1992-06-27"),
  role: "USER",
  isActive: false,
  createdAt: new Date(),
  address: {
    street: "19 Fraser Road",
    city: "Patna",
    state: "Bihar",
    country: "India",
    zipCode: "800001"
  }
},
{
  firstName: "Alexander",
  lastName: "Clark",
  email: "alexander.clark@example.com",
  gender: "Male",
  phone: "9876543224",
  dateOfBirth: ISODate("1986-09-09"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "101 Residency Road",
    city: "Jammu",
    state: "Jammu & Kashmir",
    country: "India",
    zipCode: "180001"
  }
},
{
  firstName: "Charlotte",
  lastName: "Lewis",
  email: "charlotte.lewis@example.com",
  gender: "Female",
  phone: "9876543225",
  dateOfBirth: ISODate("1993-05-05"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "88 MG Marg",
    city: "Gangtok",
    state: "Sikkim",
    country: "India",
    zipCode: "737101"
  }
},
{
  firstName: "Benjamin",
  lastName: "Walker",
  email: "benjamin.walker@example.com",
  gender: "Male",
  phone: "9876543226",
  dateOfBirth: ISODate("1984-12-12"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "21 MG Road",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    zipCode: "395003"
  }
},
{
  firstName: "Amelia",
  lastName: "Hall",
  email: "amelia.hall@example.com",
  gender: "Female",
  phone: "9876543227",
  dateOfBirth: ISODate("1998-07-07"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "32 Station Road",
    city: "Nagpur",
    state: "Maharashtra",
    country: "India",
    zipCode: "440001"
  }
},
{
  firstName: "Henry",
  lastName: "Allen",
  email: "henry.allen@example.com",
  gender: "Male",
  phone: "9876543228",
  dateOfBirth: ISODate("1991-02-14"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "9 Mall Road",
    city: "Shimla",
    state: "Himachal Pradesh",
    country: "India",
    zipCode: "171001"
  }
},
{
  firstName: "Ella",
  lastName: "Young",
  email: "ella.young@example.com",
  gender: "Female",
  phone: "9876543229",
  dateOfBirth: ISODate("1996-08-18"),
  role: "USER",
  isActive: true,
  createdAt: new Date(),
  address: {
    street: "65 Residency Road",
    city: "Ranchi",
    state: "Jharkhand",
    country: "India",
    zipCode: "834001"
  }
}
])
