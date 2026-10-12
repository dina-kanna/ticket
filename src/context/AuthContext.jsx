
import {createContext,useContext,useState,} from "react";

const AuthContext = createContext(null);

const USERS_KEY = "cinebook_users";
const SESSION_KEY = "cinebook_session";

const DEMO_USER = {
  id: "demo-user",
  name: "Demo User",
  email: "demo@example.com",
  password: "123456",
};

function getUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    const users = stored ? JSON.parse(stored) : [];

    if (!Array.isArray(users)) {
      return [{ ...DEMO_USER }];
    }

    const hasDemo = users.some(
      (user) => user.email?.toLowerCase() === DEMO_USER.email
    );

    if (!hasDemo) {
      users.push({ ...DEMO_USER });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    return users;
  } catch {
    return [{ ...DEMO_USER }];
  }
}

function getSavedUser() {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;

    const saved = JSON.parse(session);

    return getUsers().find((user) => user.id === saved.id) || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getSavedUser());

  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();

    const foundUser = users.find(
      (item) =>
        item.email?.toLowerCase() === normalizedEmail &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const safeUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    setUser(safeUser);

    return { success: true, user: safeUser };
  }

  function signup(name, email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();

    if (users.some((item) => item.email?.toLowerCase() === normalizedEmail)) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    setUser(safeUser);

    return { success: true, user: safeUser };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser: user,
        isAuthenticated: Boolean(user),
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
