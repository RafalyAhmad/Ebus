import { v4 as uuidv4 } from "uuid";

let users = [
  {
    id: "user_1",
    name: "John Doe",
    email: "user@example.com",
    password: "password123",
    subscriptions: ["app_netflix_premium"],
  },
  {
    id: "user_2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    subscriptions: [],
  },
];

const simulateNetworkDelay = (ms = 500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const loginUser = async (email, password) => {
  await simulateNetworkDelay();

  const user = users.find((u) => u.email === email);

  if (!user) {
    return { success: false, message: "Email tidak terdaftar." };
  }

  if (user.password !== password) {
    return { success: false, message: "Password salah." };
  }

  const token = `mock_jwt_token_${user.id}_${Date.now()}`;
  localStorage.setItem("authToken", token);
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  );

  return {
    success: true,
    data: {
      token,
      user: { id: user.id, name: user.name, email: user.email },
    },
    message: "Login berhasil!",
  };
};

export const registerUser = async (userData) => {
  await simulateNetworkDelay();

  const { name, email, password } = userData;

  if (users.some((u) => u.email === email)) {
    return {
      success: false,
      message: "Email sudah terdaftar. Silakan gunakan email lain.",
    };
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
    subscriptions: [],
  };

  users.push(newUser);

  return {
    success: true,
    data: { id: newUser.id, email: newUser.email },
    message: "Pendaftaran berhasil! Silakan login.",
  };
};

export const logoutUser = async () => {
  await simulateNetworkDelay(200);
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
  return { success: true, message: "Logged out successfully." };
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const getCurrentUser = () => {
  const userString = localStorage.getItem("currentUser");
  return userString ? JSON.parse(userString) : null;
};

export const fetchUserProfile = async () => {
  await simulateNetworkDelay();
  const token = localStorage.getItem("authToken");
  if (!token) {
    return { success: false, message: "No authentication token found." };
  }
  const currentUserData = getCurrentUser();
  if (!currentUserData) {
    return { success: false, message: "User data not found in local storage." };
  }

  const userInDb = users.find((u) => u.id === currentUserData.id);

  if (userInDb) {
    return {
      success: true,
      data: {
        id: userInDb.id,
        email: userInDb.email,
        name: userInDb.name,
        subscriptions: userInDb.subscriptions,
      },
      message: "Profile loaded successfully.",
    };
  } else {
    return { success: false, message: "User not found in mock database." };
  }
};

export const addSubscriptionToUser = async (userId, productId) => {
  await simulateNetworkDelay(100);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    if (!users[userIndex].subscriptions.includes(productId)) {
      users[userIndex].subscriptions.push(productId);
      return true;
    }
    return true;
  }
  return false;
};
