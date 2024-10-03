const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "HMS",
});

// JWT Secret
const JWT_SECRET = "secret_key";

// Signup Route
app.post("/signup", (req, res) => {
  const { name, email, password, number, address } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query =
    "INSERT INTO user (name, email, password, number,address) VALUES (?, ?, ?, ?,?)";
  db.query(
    query,
    [name, email, hashedPassword, number, address],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Signup failed" });
      }
      res.json({ message: "Signup successful" });
    }
  );
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Queries for users, admins, and doctors tables
  const userQuery = "SELECT * FROM user WHERE email = ?";
  const adminQuery = "SELECT * FROM admins WHERE email = ?";
  const doctorQuery = "SELECT * FROM doctor WHERE email = ?";

  // Check 'users' table first
  db.query(userQuery, [email], (err, userResults) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    console.log("user run", userQuery);
    
    // If user found in 'users' table
    if (userResults.length > 0) {
      const user = userResults[0];

      // Compare the hashed password
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate token and return user information
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        user: { id: user.id, name: user.name, email: user.email },
        role: user.role,
        token,
      });
    }

    // If not found in 'users', check 'admins' table
    db.query(adminQuery, [email], (err, adminResults) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      console.log("admin run", adminQuery);

      // If user found in 'admins' table
      if (adminResults.length > 0) {
        const admin = adminResults[0];

        // Directly compare the password
        if (password !== admin.password) {
          return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate token and return admin information
        const token = jwt.sign({ id: admin.id, role: "admin" }, JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.json({
          user: { id: admin.id, name: admin.name, email: admin.email },
          role: "admin",
          token,
        });
      }

      // If not found in 'admins', check 'doctor' table
      db.query(doctorQuery, [email], (err, doctorResults) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        console.log("doc run", doctorQuery);

        // If user found in 'doctor' table
        if (doctorResults.length > 0) {
          const doctor = doctorResults[0];

          // Compare the hashed password
          if (!bcrypt.compareSync(password, doctor.password)) {
            return res.status(400).json({ error: "Invalid credentials" });
          }

          // Generate token and return doctor information
          const token = jwt.sign(
            { id: doctor.id, role: "doctor" },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          return res.json({
            user: { id: doctor.id, name: doctor.docname, email: doctor.email },
            role: "doctor",
            token,
          });
        }

        // If not found in any of the tables
        return res.status(400).json({ error: "Invalid credentials" });
      });
    });
  });
});


// Add Admin Details
app.post("/admin", (req, res) => {
  const { name, email, password } = req.body;

  const query = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
  console.log(query);
  console.log(name, email, password);
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Adding Admin Details Failed Try Again!" });
    }
    res.json({ message: "Adding Admin Details Successful" });
  });
});

// Get all doctors
app.get("/doctor", (req, res) => {
  db.query("SELECT * FROM doctor", (err, doctors) => {
    if (err) {
      console.log(err);
      console.error("Error fetching doctors:", err);
      return res.status(500).json({ message: "Error fetching doctors" });
    }
    res.json(doctors);
  });
});

// Add Doctor Details
app.post("/adddoctordetails", (req, res) => {
  const { docname, email, password, specialties, nic, telephone } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query =
    "INSERT INTO doctor (docname, email, password,specialties,nic,telephone) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [docname, email, hashedPassword, specialties, nic, telephone],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Adding Doctor Details Failed Try Again!" });
      }
      res.json({ message: "Adding Doctor Details Successful" });
    }
  );
});

// Get Specific Doctor Detail
app.get("/doctor/:id", (req, res) => {
  const id = req.params.id;
  console.log("i am running",id)
  db.query("SELECT * FROM doctor where id = ?",[id], (err, doctors) => {
    if (err) {
      console.log(err);
      console.error("Error fetching doctors:", err);
      return res.status(500).json({ message: "Error fetching doctors" });
    }
    res.json(doctors);
  });
});

// Modify doctor by id
app.put("/doctordetails/:id", (req, res) => {
  const id = req.params.id;
  const { docname, email, password, specialties, nic, telephone } = req.body;
  // SQL query to update doctor details
  const updateQuery = `UPDATE doctor SET 
                        docname = ?, 
                        email = ?, 
                        password = ?, 
                        specialties = ?, 
                        nic = ?, 
                        telephone = ? 
                      WHERE id = ?`;
  console.log(updateQuery);
  // Update doctor details in the database
  db.query(
    updateQuery,
    [docname, email, password, specialties, nic, telephone, id],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating doctor details" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      res.status(200).json({ message: "Doctor details updated successfully" });
    }
  );
});

//get a user detail
app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  console.log("i am running",id)
  db.query("SELECT * FROM user where id = ?",[id], (err, user) => {
    if (err) {
      console.log(err);
      console.error("Error fetching User:", err);
      return res.status(500).json({ message: "Error fetching user" });
    }
    res.json(user);
  });
});

// Get all user
app.get("/user", (req, res) => {
  db.query("SELECT * FROM user", (err, user) => {
    if (err) {
      console.log(err);
      console.error("Error fetching Users:", err);
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.json(user);
  });
});

//Add a User Details
app.post("/userDetail", (req, res) => {
  const { name, email, password, number, address } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query =
    "INSERT INTO user (name, email, password, number,address) VALUES (?, ?, ?, ?,?)";
  db.query(
    query,
    [name, email, hashedPassword, number, address],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "User Details Saved failed" });
      }
      res.json({ message: "User Details Saved Successful" });
    }
  );
});

//update user detail
app.put("/updateUserDetail/:id", (req, res) => {
  const { name, email, password, number, address } = req.body;
  const { id } = req.params;

  // Hash the password before saving
  const hashedPassword = bcrypt.hashSync(password, 10);

  // MySQL update query to modify user details
  const query =
    "UPDATE user SET name = ?, email = ?, password = ?, number = ?, address = ? WHERE id = ?";
  
  // Execute the query
  db.query(
    query,
    [name, email, hashedPassword, number, address, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "User details update failed" });
      }
      // Check if the user was found and updated
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User details updated successfully" });
    }
  );
});
// API route to book an appointment
app.post('/bookappointment', (req, res) => {
  const { id, doctorId, appointmentDate, appointmentTime } = req.body;
  const sql = 'INSERT INTO appointments (user_id, doctor_id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)';
  console.log(id, doctorId, appointmentDate, appointmentTime );
  
  db.query(sql, [id, doctorId, appointmentDate, appointmentTime], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error booking appointment' });
    }
    res.status(200).json({ message: 'Appointment booked successfully' });
  });
});
// Modify data of appointment table
app.put('/updateAppointment/:id', (req, res) => {
  const appointmentId = req.params.id;
  const { appointmentDate, appointmentTime } = req.body;
  const updateQuery = `UPDATE appointments SET appointment_date = ?, appointment_time = ? WHERE appointment_id = ?`;

  db.query(updateQuery, [appointmentDate, appointmentTime, appointmentId], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Error updating appointment' });
    }
    res.status(200).json({ message: 'Appointment updated successfully' });
  });
});

// get all appointment details with filter
app.get("/appointments", (req, res) => {
  const { page = 1, status, month, id } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      a.appointment_id, 
      u.name AS patient_name, 
      d.docname AS doctor_name, 
      a.appointment_date, 
      a.appointment_time, 
      a.status
    FROM 
      appointments a
    JOIN 
      user u ON a.user_id = u.id
    JOIN 
      doctor d ON a.doctor_id = d.id
    WHERE 1=1
  `;
  let queryParams = [];

  // Filter by status
  if (status) {
    query += ` AND a.status = ?`;
    queryParams.push(status);
  }

  // Filter by month
  if (month) {
    query += ` AND MONTH(a.appointment_date) = ?`;
    queryParams.push(month);
  }

  // Filter by doctor_id (id)
  if (id) {
    query += ` AND a.doctor_id = ?`;
    queryParams.push(id);
  }

  // Add pagination
  query += ` LIMIT ?, ?`;
  queryParams.push(offset, limit);
  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching appointments" });
    }
    res.status(200).json(results);
  });
});
// Update appointment status
app.put("/appointment/status/:id", (req, res) => {
  const appointmentId = req.params.id;
  const { status } = req.body;

  const updateQuery = `UPDATE appointments SET status = ? WHERE appointment_id = ?`;

  db.query(updateQuery, [status, appointmentId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating status" });
    }
    res.status(200).json({ message: "Status updated successfully" });
  });
});
// Start server
app.listen(5500, () => {
  console.log("Server running on port 5500");
});
