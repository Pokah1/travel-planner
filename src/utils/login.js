// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   fetchSignInMethodsForEmail,
//   linkWithCredential
// } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// export const loginWithEmail = async (email, password) => {
//   try {
//     return await signInWithEmailAndPassword(auth, email.trim(), password);
//   } catch (err) {
//     if (err.code === "auth/account-exists-with-different-credential") {
//       const methods = await fetchSignInMethodsForEmail(auth, email);
//       if (methods.includes("google.com")) {
//         throw new Error("This email is linked to Google. Please sign in with Google instead.");
//       }
//     }
//     throw err;
//   }
// };

// export const loginWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   try {
//     return await signInWithPopup(auth, provider);
//   } catch (err) {
//     if (err.code === "auth/account-exists-with-different-credential") {
//       const pendingCred = GoogleAuthProvider.credentialFromError(err);
//       const email = err.customData?.email;
//       const methods = await fetchSignInMethodsForEmail(auth, email);

//       if (methods.includes("password")) {
//         const password = prompt(`We found an account for ${email} with a password. Enter it to link Google login:`);
//         if (!password) throw new Error("Password is required to link accounts.");

//         const userCred = await signInWithEmailAndPassword(auth, email, password);
//         await linkWithCredential(userCred.user, pendingCred);
//         return userCred;
//       }
//     }
//     throw err;
//   }
// };
