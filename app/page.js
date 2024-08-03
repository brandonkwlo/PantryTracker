"use client";

import {
  AppBar,
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  Toolbar,
  Card,
  Grid,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import SearchBar from "@/components/searchbar";
import SortButton from "@/components/sortbutton";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.posthogApiKey, {
    api_host: process.env.posthogHost,
  });
}
export function CSPostHogProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [allPantryItems, setAllPantryItems] = useState([]);
  const [filteredPantry, setFilteredPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState("");
  const [sortType, setSortType] = useState("");

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setAllPantryItems(pantryList);
    setFilteredPantry(pantryList);
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    // Check if it exists
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
      await updatePantry();
    }
  };

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredPantry(allPantryItems);
    } else {
      const filtered = allPantryItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPantry(filtered);
    }

    if (sortType) handleSort(sortType);
  };

  const handleSort = (type) => {
    setSortType(type);
    let sorted;
    switch (type) {
      case "a-z":
        sorted = [...filteredPantry].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "z-a":
        sorted = [...filteredPantry].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      case "most":
        sorted = [...filteredPantry].sort((a, b) => b.count - a.count);
        break;
      default:
        sorted = filteredPantry;
    }
    setFilteredPantry(sorted);
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ borderRadius: 16, background: "#3fabda" }}
      >
        <Toolbar>
          <Typography
            variant="h3"
            className="tmpfont"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Pantry Tracker AI
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, p: 1 }}>
        {/* Gap between AppBar and card grid */}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Card sx={{ bgcolor: "#3fabda", borderRadius: 8 }}>
            <Box sx={{ flexGrow: 1, p: 1 }}>
              {/* Gap between AppBar and card grid */}
            </Box>
            <Box
              id="cardtitle"
              width="90%"
              height="60px"
              bgcolor={"#ADD8E6"}
              display={"flex"}
              position={"static"}
              justifyContent={"flex-end"}
              // flexDirection={"column"}
              alignItems={"center"}
              sx={{ borderRadius: 8 }}
            >
              <CardHeader
                title="Pantry Items"
                titleTypographyProps={{
                  fontSize: "50px",
                  className: "uniquereg",
                }}
                sx={{ flexBasis: "50%" }}
              />
              <SortButton onSort={handleSort} />
            </Box>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Item
                </Typography>
                <Stack width="100%" direction={"row"} spacing={2}>
                  <TextField
                    id="outlined-basic"
                    label="Item"
                    variant="outlined"
                    fullWidth
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    className="card-button"
                    onClick={() => {
                      addItem(itemName);
                      setItemName("");
                      handleClose();
                    }}
                  >
                    {" "}
                    Add{" "}
                  </Button>
                </Stack>
              </Box>
            </Modal>
            <CardContent>
              <Box
                width="100%"
                height="40vh"
                display={"flex"}
                justifyContent={"center"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={2}
              >
                <Box sx={{ bgcolor: "#d5dce6", borderRadius: 3 }}>
                  <Stack
                    width="750px"
                    height="300px"
                    spacing={2}
                    overflow={"auto"}
                  >
                    {filteredPantry.map(({ name, count }) => (
                      <Box
                        key={name}
                        width="630px"
                        minHeight="90px"
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bgcolor={"#f0f0f0"}
                        paddingX={6}
                        sx={{ borderRadius: 2 }}
                      >
                        <Typography
                          variant={"h4"}
                          color={"#333"}
                          sx={{ flexBasis: "30%" }}
                        >
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Typography>
                        <Typography
                          variant={"h4"}
                          color={"#333"}
                          sx={{ flexBasis: "40%" }}
                        >
                          {" "}
                          Quantity: {count}
                        </Typography>

                        <Button
                          variant="contained"
                          onClick={() => removeItem(name)}
                          sx={{ flexBasis: "15%" }}
                        >
                          {" "}
                          Remove{" "}
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </Box>
                <Box sx={{ width: "100%", maxWidth: 400, margin: "auto" }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                      <SearchBar
                        placeholder="Search here..."
                        onSearch={handleSearch}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        id="addbutton"
                        variant="contained"
                        onClick={handleOpen}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card sx={{ bgcolor: "#3fabda", borderRadius: 8 }}>
            <CardContent>Coming soon: AI Chat Bot!</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
