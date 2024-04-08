"use client";
import { useEffect, useState } from "react";
import HomeBanner from "./components/HomeBanner";
import HomeHeader from "./components/HomeHeader";
import { Auth } from "./components/auth";
import { db } from "@/firebase.config";
import { getDocs, collection } from "firebase/firestore";

export default function Home() {
  const [userList, setUserList] = useState<any>([]);

  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUserList = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserList(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserList();
  }, [usersCollectionRef]);
  return (
    <div>
      <div>
        <HomeHeader />
      </div>
      <div>
        <HomeBanner />
      </div>
      <div>
        <Auth />
      </div>
      <div>
        {userList.map((user: any) => (
          <div key={user.name}>
            <div>{user.name}</div>
            <div>{user.age}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
