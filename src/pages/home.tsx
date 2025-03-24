'use client'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.jsx'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Ambassador {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  points: number;
}


function HomeTest() {
    const [name, setName] = useState("");
    const [points, setPoints] = useState("");
    const [email, setEmail] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    // For Form Data Display
    const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]); 
    const [loading, setLoading] = useState(true);

    const fetchAmbassadors = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "selectedAmbassadors"));
        const ambassadorList: Ambassador[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Ambassador, "id">;
          return { id: doc.id, ...data };
        });
        setAmbassadors(ambassadorList);
        setLoading(true)
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchAmbassadors();
    }, []);
    // Define DataGrid columns with proper typing
    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "phoneNo", headerName: "Phone No", width: 150 },
      { field: "joinDate", headerName: "Join Date", width: 150 },
      { field: "points", headerName: "Points", width: 120 },
    ];
  
    // For Form Data Entry
    async function generateUniqueID() {
      let uniqueID;
      let exists = true;

      while (exists) {
          const randomNum = String(Math.floor(1000 + Math.random() * 9000)); // 4-digit number
          uniqueID = `NW${randomNum}`;
          
          const docRef = doc(db, "selectedAmbassadors", uniqueID);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
              exists = false;
          }
          
      }
      
      return uniqueID;
  }

  function formReset() {
    setName("")
    setPoints("")
    setEmail("")
    setJoinDate("")
    setphoneNo("")
  }

  async function buttonClick() {
      const id = await generateUniqueID() 
      if (id && name && points && email && joinDate && phoneNo) {
        await setDoc(doc(db, "selectedAmbassadors", id), {
          name: name,
          points: points,
          email: email,
          joinDate: joinDate,
          phoneNo: phoneNo,
          id: id
        }).then(()=> {
          formReset()
          fetchAmbassadors()
        });
      }
    }
  return (
    < > 
      <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width:'100%',
        // height: "100vh", // Centers vertically within viewport
      }}
      className='bg-amber-100 gap-2 p-4'
      noValidate
      autoComplete="off"
    >
      <h4>Add Entry</h4>
      <TextField
        id="name"
        label="Name"
        variant="standard"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="points"
        label="Points"
        variant="standard"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />
      <TextField
        id="email"
        label="Email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="joinDate"
        label="Join Date"
        type="date"
        variant="standard"
        className='w-50'
        InputLabelProps={{ shrink: true }} // Ensures label stays above input
        value={joinDate}
        onChange={(e) => setJoinDate(e.target.value)}
      />
      <TextField
        id="phoneNo"
        label="Phone No"
        variant="standard"
        value={phoneNo}
        onChange={(e) => setphoneNo(e.target.value)}
      />

      <Button variant="contained" className='mt-6' onClick={buttonClick}>Submit</Button>
    </Box>

    <div style={{ height: 500, width: "80%", margin: "auto", marginTop: "20px" }}>
      <h2 style={{ textAlign: "center" }} className='font-bold text-xl mb-2'>Selected Ambassadors</h2>
      <DataGrid
        rows={ambassadors}
        columns={columns}
        pageSize={5}
        loading={loading}
        checkboxSelection
      />
    </div>
  </>
  )
}

export default HomeTest
