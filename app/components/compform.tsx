"use client";
import axios from "axios";
  import { ToastContainer, toast } from 'react-toastify';
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { subjects } from "../libs/actions";

export default  function CompanionForm() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "Math",
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
        toast.success("Companian Created Successfully")
        redirect(`/companian/${res.data.companion._id}`)
      }else{
        toast.error("There was a problem")
      }
    }
  };

  return (
    <>
   
      <ToastContainer/>
<div className="min-h-screen w-full flex items-center justify-center px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full sm:max-w-md bg-white sm:shadow-sm rounded-2xl p-6 space-y-6"
  >
    <h1 className="text-xl font-semibold text-gray-900">
      Companion Builder
    </h1>

    {/* Image Upload */}
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-lg">
        📷
      </div>
      <span className="text-sm text-gray-700 font-medium">
        Upload image
      </span>
      <input
        type="file"
        name="image"
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />
    </label>

    {/* Text Inputs */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Companion Name
      </label>
      <input
        type="text"
        name="name"
        placeholder="e.g. Calculus King"
        value={formData.name}
        onChange={handleChange}
        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>

    {/* Subject */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Subject
      </label>
      <div className="relative mt-1">
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
        >
          <option value="Maths">Maths</option>
          <option value="Language">Language</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Coding">Coding</option>
          <option value="Economics">Economics</option>
        </select>
        {/* Custom Arrow */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          ▼
        </span>
      </div>
    </div>

    {/* Topic */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Topic to Teach
      </label>
      <textarea
        name="topic"
        placeholder="e.g. Derivatives"
        value={formData.topic}
        onChange={(e)=>{setFormData({ ...formData, topic: e.target.value });}}
        rows={4}
        className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 h-20"
      />
    </div>

    {/* Voice & Style */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Voice
        </label>
        <div className="relative mt-1">
          <select
            name="voice"
            value={formData.voice}
            onChange={handleChange}
            className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          >
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            ▼
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Style
        </label>
        <div className="relative mt-1">
          <select
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          >
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            ▼
          </span>
        </div>
      </div>
    </div>

    {/* Language */}
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Language
      </label>
      <div className="relative mt-1">
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
        >
          <option value="English">English</option>
          <option value="Urdu">Urdu</option>
          <option value="Spanish">Spanish</option>
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          ▼
        </span>
      </div>
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-medium transition-colors"
    >
      Build Companion
    </button>
  </form>
</div>


     </>
  );
}
