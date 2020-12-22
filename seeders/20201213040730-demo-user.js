const { User } = require("../models");

module.exports = function () {
  return User.bulkCreate([
    {
      fullName: "kang rodi",
      email: "rodi@gmail.com",
      avatar:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607998511/photo-1531427186611-ecfd6d936c79_eptha1.jpg",
      greating: "mencoba adalah awal dari kesuksesan",
      password: "$2b$10$kgS25ZJyV2GMSH72U4upCethQGg/rdRfBNLJAbZ4DVbaA6/ZfjxrC",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullName: "ardian",
      email: "ardian@gmail.com",
      avatar:
        "https://res.cloudinary.com/dd7szxfnl/image/upload/v1607998547/photo-1535713875002-d1d0cf377fde_gvbepa.jpg",
      greating: "angkat kepala lihat dunia",
      password: "$2b$10$kgS25ZJyV2GMSH72U4upCethQGg/rdRfBNLJAbZ4DVbaA6/ZfjxrC",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};
