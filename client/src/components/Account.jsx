import React, { useEffect, useRef, useState } from "react";
import { userAuth } from "../lib/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/account.css";
import default_avatar from "../assets/default_avatar.png";
import loading_avatar from "../assets/loading_avatar.png";

export default function Account() {
  const { session, signOut, username, getUserData, userData, uploadImage, reqImageURL, deleteUser} = userAuth()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const userId = session?.user?.id
  const [error, setError] = useState("")
  const [img, setImg] = useState(default_avatar)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    let cancelled = false;

    const loadAccountData = async () => {
      if (!userId) return;

      setImg(loading_avatar);

      try {
        const [userInfo, imageUrl] = await Promise.all([
          getUserData(userId),
          reqImageURL(userId),
        ]);

        if (cancelled) return;

        setImg(imageUrl || default_avatar);
      } catch (error) {
        if (cancelled) return;

        console.error("Error loading account data:", error);
        setImg(default_avatar);
      }
    };

    loadAccountData();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const openSelector = () => {
    inputRef.current?.click();
  };

  const onFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file || !userId) return;

    setError("");
    setIsUploading(true);
    setImg(loading_avatar);

    try {
      // Wait for the upload to finish
      const uploadResult = await uploadImage(userId, file);

      // If your uploadImage function returns an error object
      if (uploadResult?.error) {
        throw uploadResult.error;
      }

      // Get a new signed URL after the upload completes
      const newImageUrl = await reqImageURL(userId);

      if (!newImageUrl) {
        throw new Error("No image URL was returned.");
      }

      // Force the browser to load the newly uploaded image
      setImg(`${newImageUrl}&cacheBust=${Date.now()}`);
    } catch (error) {
      //console.error("Error uploading profile image:", error);
      setError("Unable to upload profile image.");
      setImg(default_avatar);
    } finally {
      setIsUploading(false);

      // Allows the user to choose the same file again
      event.target.value = "";
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      //console.error("Sign-out error:", error);
    }
  };

  const handleDelete = async (e) => {
    setError("")
    const confirmed = window.confirm("Are you sure you want to delete your accout? This cannot be undone")

    if(!confirmed){
      return
    }

    try{
      const res = deleteUser(userId);

      if(res.success = false){
        setError(res.data)
        return
      }
      //open modal window
      navigate("/")
      signOut()
      return

    }catch(err){
      if(err){
        setError("err")
        return
      }
    }
    
  }

  return (
    <main id="account">
      <h1>Account Info</h1>
      {error && <p role="alert">{error}</p>}
      <div id="bg">
      <div className="pfp-holder">
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" capture="environment" hidden onChange={onFileChange}/>
        <img className="pfp-image" src={img} alt={`Profile picture of ${username || "user"}`} onError={() => setImg(default_avatar)} fetchPriority="high"/>
        <button type="button" className="pfp-btn" onClick={openSelector} disabled={isUploading}>
          +
        </button>
      </div>
      <div id="bottom">
      <h2>Welcome <span className="leckerli" id="username">{username}</span></h2>
      <p id="user">
        <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Email address">
          <path fill="#800080" d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.5l8 5.3 8-5.3V7H4Zm16 10V9.9l-7.4 4.9a1 1 0 0 1-1.1 0L4 9.9V17h16Z"/>
        </svg>
        {userData?.email}</p>
      </div>
      </div>

      <div>
        <h3>You have voted on:</h3>
        <div>
        <span>{ userData?.parks === null ? 0 : Array(userData?.parks).length} parks </span>
        <span> and </span>
        <span>{userData?.stores === null ? 0 : Array(userData?.stores).length} stores </span>
        </div>
      </div>


      <div>
        <h3>Would you like to?</h3>
        <ul id="account-list">
          <li> 
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Lock">
              <path fill="#800080" d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2ZM10 6a2 2 0 0 1 4 0v2h-4V6Zm7 13H7v-9h10v9Z"/>
              <path fill="#800080" d="M12 12a2 2 0 0 0-1 3.73V17h2v-1.27A2 2 0 0 0 12 12Z"/>
            </svg>
            <Link to="/password-reset"> Change Password</Link>
          </li>

          <li>
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Privacy policy">
              <path fill="#800080" d="M12 2 3.5 5v6.2c0 5.1 3.5 9.8 8.5 11.3 5-1.5 8.5-6.2 8.5-11.3V5L12 2Z"/>
              <path fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.2 2.3 2.3 4.8-5"/>
            </svg> <Link to="/privacy">Privacy Policy</Link>
          </li>

          <li>
            <button onClick={handleSignOut} className="account-function">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Sign out">
              <path fill="#800080" d="M10 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7v-2h7V5h-7V3Z"/>
              <path fill="#800080" d="m11 7 5 5-5 5v-3H3v-4h8V7Z"/>
            </svg> Sign out
            </button>
          </li>

          <li>
            <button onClick={(e) => handleDelete(e)} className="account-function">
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Trash can">
              <path fill="#800080" d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-3 6h12l-1 12H7L6 9Zm3 2v8h2v-8H9Zm4 0v8h2v-8h-2Z"/>
            </svg>
              Delete Account
              </button>
          </li>
  
        </ul>
        </div>
      <p className="warning">
        Please keep in mind this is a portfolio project and not a real
        website. Accounts will be deleted every three months to save space.
      </p>
    </main>
  );
}