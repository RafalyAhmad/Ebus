import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white pt-10 pb-20 text-center rounded-b-3xl relative">
      <h1 class="text-2xl font-bold">SubX</h1>
      <div class="absolute -0 left-1/2 transform -translate-x-1/2 w-3/4">
        <input
          type="text"
          class="w-full p-2 rounded-lg text-black"
          placeholder="Cari..."
        />
      </div>
    </nav>
  );
};

// // styling
// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     backgroundColor: "rgb(0 58 119)",
//     color: "#fff",
//   }

export default Navbar;
