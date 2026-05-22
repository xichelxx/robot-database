/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import {
  auth,
  db,
  signInWithGoogle,
  logout as firebaseLogout,
  handleFirestoreError,
  OperationType,
} from "../firebase";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  role: "user" | "admin";
  createdAt: any;
  updatedAt: any;
}

export interface FavoriteCompany {
  companyId: string;
  companyName: string;
  favoritedAt: any;
}

export interface UserNote {
  companyId: string;
  content: string;
  updatedAt: any;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  favorites: Record<string, FavoriteCompany>;
  notes: Record<string, UserNote>;
  loading: boolean;
  authReady: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  toggleFavorite: (companyId: string, companyName: string) => Promise<void>;
  saveNote: (companyId: string, content: string) => Promise<void>;
  deleteNote: (companyId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [favorites, setFavorites] = useState<Record<string, FavoriteCompany>>({});
  const [notes, setNotes] = useState<Record<string, UserNote>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [authReady, setAuthReady] = useState<boolean>(false);

  // Monitor auth state changes on mount
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthReady(true);

      if (user) {
        // Logged in: Sync/provision user profile in firestore
        const profileRef = doc(db, "users", user.uid);
        try {
          const profileSnap = await getDoc(profileRef);
          const isUserAdmin = user.email === "644094779@qq.com";
          const expectedRole = isUserAdmin ? ("admin" as const) : ("user" as const);

          if (!profileSnap.exists()) {
            // Provision first-time user profile
            const newProfileData = {
              uid: user.uid,
              displayName: user.displayName || "Gamer Robot",
              email: user.email || "",
              photoURL: user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
              role: expectedRole,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            await setDoc(profileRef, newProfileData);
            setUserProfile({
              ...newProfileData,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          } else {
            const existingData = profileSnap.data() as UserProfile;
            // Upgrading role if user is designated admin but role in db is user
            if (existingData.role !== expectedRole) {
              const updatedData = {
                role: expectedRole,
                updatedAt: serverTimestamp(),
              };
              await setDoc(profileRef, updatedData, { merge: true });
              setUserProfile({
                ...existingData,
                role: expectedRole,
                updatedAt: new Date(),
              });
            } else {
              setUserProfile(existingData);
            }
          }
        } catch (error) {
          console.error("Failed to fetch or create user profile in Firestore: ", error);
        }
      } else {
        // Logged out
        setUserProfile(null);
        setFavorites({});
        setNotes({});
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore changes (favorites & notes) only when authenticated
  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);

    const favesPath = `users/${currentUser.uid}/favorites`;
    const favesRef = collection(db, "users", currentUser.uid, "favorites");
    const unsubscribeFaves = onSnapshot(
      favesRef,
      (snapshot) => {
        const tempFaves: Record<string, FavoriteCompany> = {};
        snapshot.forEach((doc) => {
          tempFaves[doc.id] = doc.data() as FavoriteCompany;
        });
        setFavorites(tempFaves);
      },
      (error) => {
        // Required specific error wrapper (Pillar 3 Error Handlers)
        handleFirestoreError(error, OperationType.GET, favesPath);
      }
    );

    const notesPath = `users/${currentUser.uid}/notes`;
    const notesRef = collection(db, "users", currentUser.uid, "notes");
    const unsubscribeNotes = onSnapshot(
      notesRef,
      (snapshot) => {
        const tempNotes: Record<string, UserNote> = {};
        snapshot.forEach((doc) => {
          tempNotes[doc.id] = doc.data() as UserNote;
        });
        setNotes(tempNotes);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, notesPath);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeFaves();
      unsubscribeNotes();
    };
  }, [currentUser]);

  // Auth operations
  const login = async () => {
    await signInWithGoogle();
  };

  const logout = async () => {
    await firebaseLogout();
  };

  // Firestore DB operations
  const toggleFavorite = async (companyId: string, companyName: string) => {
    if (!currentUser) {
      alert("请先登录系统！");
      return;
    }

    // Sanitize path ID to prevent ID poisoning (Pillar 3 Boundary Matches)
    const cleanId = companyId.replace(/[^a-zA-Z0-9_\-]/g, "");
    if (!cleanId) return;

    const favoriteDocPath = `users/${currentUser.uid}/favorites/${cleanId}`;
    const favoriteDocRef = doc(db, "users", currentUser.uid, "favorites", cleanId);

    try {
      if (favorites[cleanId]) {
        // Delete favorite
        await deleteDoc(favoriteDocRef);
      } else {
        // Add favorite
        const payload: FavoriteCompany = {
          companyId: cleanId,
          companyName,
          favoritedAt: serverTimestamp(),
        };
        await setDoc(favoriteDocRef, payload);
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, favoriteDocPath);
    }
  };

  const saveNote = async (companyId: string, content: string) => {
    if (!currentUser) {
      alert("请先登录系统以保存笔记！");
      return;
    }

    const cleanId = companyId.replace(/[^a-zA-Z0-9_\-]/g, "");
    if (!cleanId) return;

    const noteDocPath = `users/${currentUser.uid}/notes/${cleanId}`;
    const noteDocRef = doc(db, "users", currentUser.uid, "notes", cleanId);

    try {
      const payload: UserNote = {
        companyId: cleanId,
        content: content.trim(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(noteDocRef, payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, noteDocPath);
    }
  };

  const deleteNote = async (companyId: string) => {
    if (!currentUser) return;

    const cleanId = companyId.replace(/[^a-zA-Z0-9_\-]/g, "");
    if (!cleanId) return;

    const noteDocPath = `users/${currentUser.uid}/notes/${cleanId}`;
    const noteDocRef = doc(db, "users", currentUser.uid, "notes", cleanId);

    try {
      await deleteDoc(noteDocRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, noteDocPath);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        favorites,
        notes,
        loading: currentUser ? loading : false,
        authReady,
        login,
        logout,
        toggleFavorite,
        saveNote,
        deleteNote,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
