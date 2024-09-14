import { z } from "zod";
import { doc, setDoc } from "firebase/firestore";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";
const formSchema = z.object({
  email: z.string().min(1, {
    message: "This field is required",
  }),
  password: z.string().min(1, {
    message: "This field is required",
  }),
  fullName: z.string().min(1, {
    message: "This field is required",
  }),
  nickName: z.string().min(1, {
    message: "This field is required",
  }),
  nim: z.string().min(1, {
    message: "This field is required",
  }),
  status: z.string().min(1, {
    message: "This field is required",
  }),
  jurusan: z.string().min(1, {
    message: "This field is required",
  }),
  jabatan: z.string().min(1, {
    message: "This field is required",
  }),
});

export const editUserHmif = async (
  values: z.infer<typeof formSchema>,
  id: string
) => {
  if (
    values.email == "" ||
    values.password == "" ||
    values.fullName == "" ||
    values.nim == "" ||
    values.status == "" ||
    values.jurusan == "" ||
    values.jabatan == ""
  ) {
    return null;
  }
  const hashedPassword = await hash(values.password, 12);
  await setDoc(doc(db, "user", id), {
    id,
    role: "hmif",
    email: values.email,
    password: hashedPassword,
    fullName: values.fullName,
    nickName: values.nickName,
    image: "",
    nim: values.nim,
    status: values.status, // or "inactive"
    isActive: false,
    lastOnline: "",
    friend: [], // array of user IDs
    rate: [0, 0, 0, 0, 0],
    review: [],
    jurusan: values.jurusan,
    jabatan: values.jabatan,
    idline: "",
    instagram: "",
    linkedin: "",
  });
};
