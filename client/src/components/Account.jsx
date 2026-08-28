import React, { useEffect, useRef, useState } from "react";
import { userAuth } from "../lib/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/account.css";
import default_avatar from "../assets/default_avatar.png";
import loading_avatar from "../assets/loading_avatar.png";

export default function Account() {
  const { session, signOut, username, getUserData,uploadImage,reqImageURL,} = userAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const userId = session?.user?.id;
  const [error, setError] = useState("");
  const [img, setImg] = useState(default_avatar);
  const [userData, setUserData] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

        setUserData(userInfo);
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

  return (
    <main id="account">
      <h1>Account Info</h1>
      {error && <p role="alert">{error}</p>}
      <div className="pfp-holder">
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" capture="environment" hidden onChange={onFileChange}/>
        <img className="pfp-image" src={img} alt={`Profile picture of ${username || "user"}`} onError={() => setImg(default_avatar)} fetchPriority="high"/>
        <button type="button" className="pfp-btn" onClick={openSelector} disabled={isUploading}>
          +
        </button>
      </div>
      <p>Hello {userData?.username}</p>
      <p>
        <Link to="/password-reset">Change password?</Link>
      </p>
      <p>
        <Link to="/privacy">Privacy notice</Link>
      </p>
      <button
        type="button"
        onClick={handleSignOut}
        className="signout-btn">
        Sign out
      </button>
      <p>
        To delete your account, please email admin@puplanta.com or{" "}
        <a href="mailto:admin@puplanta.com?subject=delete">
          click here to open an email
        </a>
      </p>
      <p className="warning">
        Please keep in mind this is a portfolio project and not a real
        website. Accounts will be deleted every three months to save space.
      </p>
    </main>
  );
}