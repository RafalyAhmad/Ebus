import productData from "../data/test-data.json";
import { addSubscriptionToUser } from "./auth";

const simulateNetworkDelay = (ms = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

export const getAllProducts = async () => {
  await simulateNetworkDelay();
  return productData;
};

export const getProductById = async (productId) => {
  await simulateNetworkDelay();
  return productData.find((product) => product.id === productId) || null;
};

export const initiatePurchase = async (productId, priceTier, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!userId) {
        resolve({ success: false, message: "User not authenticated." });
        return;
      }
      if (!productId || !priceTier) {
        resolve({ success: false, message: "Invalid product or price tier." });
        return;
      }

      const orderId = `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      resolve({
        success: true,
        orderId: orderId,
        message:
          "Purchase initiated successfully. Awaiting payment confirmation.",
      });
    }, 1000);
  });
};

export const hasActiveSubscription = async (userId, productId) => {
  const userProfile = await (await import("./auth")).fetchUserProfile();
  if (userProfile.success && userProfile.data) {
    return userProfile.data.subscriptions.includes(productId);
  }
  return false;
};

export const processPayment = async (cartItems, userId, totalAmount) => {
  await simulateNetworkDelay(2000);

  if (!userId) {
    return {
      success: false,
      message: "Autentikasi pengguna diperlukan untuk pembayaran.",
    };
  }
  if (cartItems.length === 0) {
    return {
      success: false,
      message: "Keranjang kosong. Tidak ada yang perlu dibayar.",
    };
  }
  if (totalAmount <= 0) {
    return { success: false, message: "Jumlah pembayaran tidak valid." };
  }

  const isPaymentSuccessful = Math.random() > 0.1;

  if (isPaymentSuccessful) {
    const transactionId = `TRX-${Date.now()}-${Math.floor(
      Math.random() * 9999
    )}`;

    for (const item of cartItems) {
      await addSubscriptionToUser(userId, item.id);
    }

    return {
      success: true,
      transactionId,
      message: "Pembayaran berhasil diproses!",
    };
  } else {
    return {
      success: false,
      message: "Pembayaran gagal. Silakan coba lagi atau gunakan metode lain.",
    };
  }
};

export const formatRupiah = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};
