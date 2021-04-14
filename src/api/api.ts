import { db } from "../plugins/firebase";
import { DATE, TASK } from "../types/type";

export const getAllTasks = async (uid: string) => {
  const allTasks: TASK[] = [];
  await db
    .collection("users")
    .doc(uid)
    .collection("tasks")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const taskData = { ...doc.data(), id: doc.id } as TASK;
        allTasks.push(taskData);
      });
    });
  return allTasks;
};

export const onAdd = async (
  uid: string,
  title: string,
  memo: string,
  date: DATE,
  hour: number
) => {
  let newId: string | undefined;
  await db
    .collection("users")
    .doc(uid)
    .collection("tasks")
    .add({
      title,
      memo,
      date,
      hour,
    })
    .then((docRef) => {
      if (docRef.id) {
        newId = docRef.id;
      }
    });
  return newId;
};

export const onDelete = (uid: string, id: string) => {
  db.collection("users")
    .doc(uid)
    .collection("tasks")
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};

export const onUpdate = (
  uid: string,
  id: string,
  title: string,
  memo: string
) => {
  db.collection("users")
    .doc(uid)
    .collection("tasks")
    .doc(id)
    .update({
      title,
      memo,
    })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
};
