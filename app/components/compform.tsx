"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";

export default  function CompanionForm() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    topic: "",
    voice: "Female",
    style: "Casual",
    language: "English",
    image: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/companians/new", formData);
    try {
      console.log("this is the api response",res.data.companion)
    } catch (error) {
      console.error("Error creating companion:", error);
    }finally{

      if(res.data.status===201){
        redirect(`/companian/${res.data.companion._id}`)
      }
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center gap-20 px-2 md:px-[26%] ">
      <form onSubmit={handleSubmit} className=" rounded-lg space-y-5">
        <h1 className="text-2xl font-bold text-gray-900">Companion Builder</h1>

        {/* Image Upload */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 border rounded-lg bg-gray-100 flex items-center justify-center text-xl">
            📷
          </div>
          <label className="cursor-pointer bg-gray-100 border px-4 py-3 rounded-lg hover:bg-gray-200 transition">
            Upload image
            <input
              type="file"
              name="image"
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

        {/* Inputs */}
        <span className="font-medium">Companian Name</span>
        <input
          type="text"
          name="name"
          placeholder="Enter the companion name - ex: Calculus King"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-2 border-[.5px] px-3 py-3 rounded-lg focus:outline-none focus:ring-2  focus:ring-orange-500"
        />
        <span className="font-medium">Subject</span>
        <input
          type="text"
          name="subject"
          placeholder="Enter the subject - ex: Math"
          value={formData.subject}
          onChange={handleChange}
          className="w-full mt-2 border-1 px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <span className="font-medium">What should this companion teach?</span>
        <input
          type="text"
          name="topic"
          placeholder="Enter the topic you want to learn - ex: Derivatives"
          value={formData.topic}
          onChange={handleChange}
          className="w-full mt-2 border px-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* Selects */}
        <span className="font-medium">Voice</span>
        <select
          name="voice"
          value={formData.voice}
          onChange={handleChange}
          className="w-full border mt-2 px-3 py-3 rounded-lg focus:outline-none focus:ring-2 font-semibold focus:ring-orange-500"
        >
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <span className="font-medium">Style</span>
        <select
          name="style"
          value={formData.style}
          onChange={handleChange}
          className="w-full border mt-2 px-3 py-3 rounded-lg focus:outline-none font-semibold focus:ring-2 focus:ring-orange-500"
        >
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
        </select>
        <span className="font-medium">Language</span>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full border mt-2 px-3 py-3 rounded-lg focus:outline-none focus:ring-2 font-semibold focus:ring-orange-500"
        >
          <option value="English">English</option>
          <option value="Urdu">Urdu</option>
          <option value="Spanish">Spanish</option>
        </select>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Build Companion
        </button>
      </form>
    </div>
  );
}
