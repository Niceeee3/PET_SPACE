// src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
// ✨ เพิ่ม deleteDoc เข้ามาในบรรทัดนี้
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, where, serverTimestamp, deleteDoc } from "firebase/firestore";
// เพิ่มการนำเข้าระบบ Authentication
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
// สร้างตัวแปร auth สำหรับใช้งานระบบสมาชิก
export const auth = getAuth(app);

// ==========================================
// 🔐 ฟังก์ชันสำหรับ Authentication (ระบบสมาชิก)
// ==========================================

// สมัครสมาชิกใหม่
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// เข้าสู่ระบบ
export const logIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// ออกจากระบบ
export const logOut = () => {
  return signOut(auth);
};

// ==========================================
// 🐾 ฟังก์ชันจัดการข้อมูลสัตว์เลี้ยง (อัปเกรดให้ผูกกับ User)
// ==========================================

export const addPetProfile = async (petData) => {
  try {
    // ดึง UID ของคนที่ Login อยู่มาใช้เป็น ownerId
    const currentUser = auth.currentUser;
    
    const docRef = await addDoc(collection(db, "pets"), {
      ...petData,
      ownerId: currentUser ? currentUser.uid : "guest", // ถ้า Login แล้วจะใช้ UID จริง
      currentStatus: "รอตรวจสอบการชำระเงิน", // เปลี่ยนสถานะเริ่มต้นให้สอดคล้องกับระบบใหม่
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding pet: ", error);
    return { success: false, error };
  }
};

export const getPetsByOwner = async (ownerId) => {
  try {
    // ถ้าไม่ส่ง id มา ให้เช็คจากคนที่ Login อยู่ปัจจุบัน
    const currentUid = auth.currentUser ? auth.currentUser.uid : null;
    const finalOwnerId = ownerId || currentUid;

    if (!finalOwnerId) return [];

    const q = query(collection(db, "pets"), where("ownerId", "==", finalOwnerId));
    const querySnapshot = await getDocs(q);
    const pets = [];
    querySnapshot.forEach((doc) => {
      pets.push({ id: doc.id, ...doc.data() });
    });
    return pets;
  } catch (error) {
    console.error("Error getting pets: ", error);
    return [];
  }
};

// ==========================================
// 🛡️ ฟังก์ชันสำหรับฝั่ง Admin
// ==========================================

// 1. ดึงข้อมูลสัตว์เลี้ยงทั้งหมดในระบบ
export const getAllPets = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "pets"));
    const pets = [];
    querySnapshot.forEach((doc) => {
      pets.push({ id: doc.id, ...doc.data() });
    });
    // เรียงลำดับจากอัปเดตล่าสุดไปเก่าสุด
    return pets.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
  } catch (error) {
    console.error("Error getting all pets: ", error);
    return [];
  }
};

// 2. อัปเดตสถานะของสัตว์เลี้ยง (สำหรับ Admin)
export const updatePetInfoAdmin = async (petId, field, value) => {
  try {
    const petRef = doc(db, "pets", petId);
    // อัปเดตฟิลด์ที่ส่งมา พร้อมกับประทับเวลาที่อัปเดต
    await updateDoc(petRef, {
      [field]: value,
      lastUpdatedAt: serverTimestamp() 
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating pet info: ", error);
    return { success: false, error };
  }
};

// ✨ 3. ลบข้อมูลสัตว์เลี้ยงออกจากระบบ (เพิ่มใหม่)
export const deletePetProfileAdmin = async (petId) => {
  try {
    const petRef = doc(db, "pets", petId);
    await deleteDoc(petRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting pet: ", error);
    return { success: false, error };
  }
};