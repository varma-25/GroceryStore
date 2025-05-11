const API_BASE_URL = "http://localhost:5000/api";

export const fetchWithAuth = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ No token found, user not authenticated");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // ✅ Sending JWT Token
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ API Error:", data.error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("❌ Server Error:", error);
    return null;
  }
};
