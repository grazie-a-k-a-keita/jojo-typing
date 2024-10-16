'use server';

import { RankInfo } from '@/types/firebase';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * sample function
 */
export const getCities = async () => {
  const snapshot = await getDocs(collection(db, 'cities'));
  return snapshot.docs.map((doc) => doc.data());
};

/**
 * rankInfo コレクションから全てのドキュメントを取得する
 */
export const getRankInfos = async (): Promise<RankInfo[]> => {
  const snapshot = await getDocs(collection(db, 'rankInfo'));
  return snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...(doc.data() as Omit<RankInfo, 'docId'>),
  }));
};

/**
 * rankInfo コレクションのドキュメントを更新する
 * 複数件の更新可
 */
export const updateRankInfo = async ({ rankInfos }: { rankInfos: RankInfo[] }) => {
  const promises = rankInfos.map((rankInfo) => {
    return updateDoc(doc(db, 'rankInfo', rankInfo.docId), {
      minimumPoint: rankInfo.minimumPoint,
      rank: rankInfo.rank,
    });
  });

  await Promise.all(promises).catch((error) => {
    throw error;
  });

  return true;
};
