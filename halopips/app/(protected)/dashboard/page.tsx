import { db } from "@/lib/db";
import { getSession } from "@/lib/getSession";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import DashboardProfile from "./DashboardProfile";
import newsDetail from "@/app/assets/news";

const Dashboard = async () => {
  const session = await getSession();
  const id = session?.user.id;
  if (!id) {
    return null;
  }
  const docRef = doc(db, "user", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    const { fullName, nickName, nim, image } = user;

    return (
      <div className="bg-pips-200 min-h-screen p-6">
        <h1 className="text-pips-800 font-bold text-4xl mb-6">
          Selamat Datang,
        </h1>
        <div className="flex flex-row space-x-6">
          <div className="flex flex-col space-y-6 w-1/3">
            <DashboardProfile
              fullName={fullName}
              nickName={nickName}
              nim={nim}
              image={image}
            />
            <div className="flex flex-col space-y-2">
              <h2 className="text-pips-800 font-bold text-xl">
                Quick Messages
              </h2>
              <div className="flex space-x-2">
                <button className="bg-pips-600 text-white p-4 rounded-lg flex-1">
                  Mahasiswa TPB
                </button>
                <button className="bg-pips-600 text-white p-4 rounded-lg flex-1">
                  Mahasiswa Non TPB
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-2/3">
            <div className="flex items-center mb-4">
              <div className="bg-pips-400 w-4 h-10 mr-2"></div>
              <h2 className="bg-pips-600 h-10 text-pips-100 text-xl font-bold py-1 px-2 flex-grow">
                Berita Terkini
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {newsDetail.map((news, index) => (
                <div key={index} className="bg-pips-500 rounded-xl p-4">
                  <h3 className="font-bold text-lg text-pips-100 mb-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-white mb-2">
                    {news.description}
                  </p>
                  <p className="text-xs text-pips-200">
                    Published on {news.date}
                  </p>
                  <a href={news.link} className="text-xs text-green-500 font-semibold">Read more</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Dashboard;
